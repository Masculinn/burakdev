import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { getPlaiceholder, type GetPlaiceholderReturn } from "plaiceholder";

type RawAsset =
  | string
  | {
      url?: string;
      path?: string;
      name?: string;
      src?: string;
      [k: string]: unknown;
    }
  | null
  | undefined;

type ImagePhRenderingProps = Pick<GetPlaiceholderReturn, "base64"> & {
  height: number;
  width: number;
};

const p = path.join(process.cwd(), ".env");
if (fs.existsSync(p)) {
  dotenv.config({ path: p, quiet: true });
  console.log(`✅ Loaded env from ${p}`);
}

const ROOT = process.cwd();
const ASSETS = path.join(ROOT, "src", "constants", "timeline.config.ts");
const OUTDIR = path.join(ROOT, "src", "generated");
const OUT_FILE = path.join(OUTDIR, "lqip-manifest.json");

const REGEX =
  /(["'])(\/assets\/[^"']+\.(?:png|jpe?g|webp|gif|avif)|https?:\/\/[^"']+\.(?:png|jpe?g|webp|gif|avif))\1/gi;

const IMG_SIZE = 10;

const yayOrNay = (bool: boolean) => (bool ? "✅" : "❌");

async function safe<T>(
  fn: () => Promise<T>,
): Promise<[T | null, unknown | null]> {
  try {
    return [await fn(), null];
  } catch (error) {
    return [null, error];
  }
}

async function ensureDirExist() {
  await fsPromises.mkdir(OUTDIR, { recursive: true });
}

async function readAssets(): Promise<string> {
  const [text, err] = await safe(() => fsPromises.readFile(ASSETS, "utf8"));
  if (text === null || err) {
    console.error("❌ Error reading timeline config:", ASSETS, err);
    throw err;
  }
  return text;
}

function extToMime(ext: string) {
  const e = ext.toLowerCase();
  if (e === ".png") return "image/png";
  if (e === ".jpg" || e === ".jpeg") return "image/jpeg";
  if (e === ".webp") return "image/webp";
  if (e === ".gif") return "image/gif";
  if (e === ".avif") return "image/avif";
  if (e === ".svg") return "image/svg+xml";
  return "application/octet-stream";
}

async function tryPlaiceholder(buffer: Buffer) {
  const [res, err] = await safe(() =>
    getPlaiceholder(buffer, { size: IMG_SIZE }),
  );
  if (res)
    return {
      base64: res.base64,
      height: res.metadata.height,
      width: res.metadata.width,
    } as ImagePhRenderingProps;
  if (err) {
    console.error("❌ Error during plaiceholder processing: ", err);
    throw err;
  }
  return null;
}

async function encodeFullFileAsBase64(absPath: string, ext: string) {
  const [buf, readErr] = await safe(() => fsPromises.readFile(absPath));
  if (buf === null) throw readErr;
  const mime = extToMime(ext);
  return `data:${mime};base64,${(buf as Buffer).toString("base64")}`;
}

function extractPaths(text: string): string[] {
  const set = new Set<string>();
  for (const m of text.matchAll(REGEX)) {
    if (typeof m[2] === "string") set.add(m[2]);
  }
  return Array.from(set);
}

async function fileExists(abs: string) {
  const [s] = await safe(() => fsPromises.stat(abs));
  return !!s && (s as fs.Stats).isFile();
}

async function bufferFromUrl(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed fetching ${url}: ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  const buf = Buffer.from(arrayBuffer);
  const urlObj = new URL(url);
  return {
    buffer: buf,
    ext: path.extname(urlObj.pathname).toLowerCase(),
    contentType: res.headers.get("content-type") || "",
  };
}

function normalizeRawAsset(a: RawAsset): string | null {
  if (!a) return null;
  if (typeof a === "string") return a;
  if (typeof a.url === "string" && a.url) return a.url;
  if (typeof a.path === "string" && a.path) return a.path;
  if (typeof a.src === "string" && a.src) return a.src;
  if (typeof a.name === "string" && a.name) return a.name;
  return null;
}

async function readServerSideAssets(): Promise<string[] | undefined> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
    !process.env.BUCKET_NAME
  ) {
    console.log("⚠️ Missing database env vars, Returning undefined.");
    return undefined;
  }

  try {
    const dbFile = path.join(ROOT, "src", "utils", "db.ts").replace(/\\/g, "/");
    const mod = await import(`file://${dbFile}`);
    const db = (mod.default ?? mod) as () => SupabaseClient;
    const bucketName = process.env.BUCKET_NAME as string;

    const getBucketURL = async (): Promise<string | null> => {
      if (!bucketName) {
        console.error("❌ Missing env bucket name");
        return null;
      }

      const { data } = (await db()
        .storage.from(bucketName)
        .getPublicUrl("")) as { data: { publicUrl: string } | null };

      if (!data?.publicUrl) {
        console.error("❌ Bucket public URL not found");
        return null;
      }
      return data.publicUrl;
    };

    const getBucketPaths = async (): Promise<string[] | null> => {
      const { data, error } = (await db().storage.from(bucketName).list()) as {
        data: { name: string }[] | null;
        error: PostgrestError | null;
      };

      if (error || !data) {
        console.error("❌ Error getting bucket paths:", error);
        return null;
      }
      return data.map(({ name }) => name);
    };

    const getTableAssets = async (): Promise<RawAsset[] | null> => {
      const { data, error } = (await db()
        .from("blog_posts")
        .select("banner_image")) as {
        data: Array<
          { banner_image?: RawAsset } & Record<string, unknown>
        > | null;
        error: PostgrestError | null;
      };

      if (error) {
        console.error("❌ Error getting table assets:", error);
        return null;
      }

      if (!data || data.length === 0) return null;

      const images: RawAsset[] = data.map(
        (row) => (row && (row.banner_image ?? null)) ?? null,
      );
      return images.filter(Boolean);
    };

    const [bucketURL, bucketPaths, tableAssets] = await Promise.all([
      getBucketURL(),
      getBucketPaths(),
      getTableAssets(),
    ]);

    console.log(`Fetch completed:
${yayOrNay(Boolean(bucketURL))} Bucket URL: ${bucketURL}
${yayOrNay(Boolean(bucketPaths))} Bucket paths: ${bucketPaths}
${yayOrNay(Boolean(tableAssets))} Table assets: ${tableAssets?.length ?? 0}
`);

    const normalizedFromTable = (tableAssets ?? [])
      .map(normalizeRawAsset)
      .filter(Boolean) as string[];

    const fromBucket: string[] = [];
    if (bucketURL && bucketPaths && bucketPaths.length) {
      for (const p of bucketPaths) {
        try {
          const full = new URL(p, bucketURL).toString();
          fromBucket.push(full);
        } catch (err) {
          console.error(
            "❌ Error building full URL:",
            err,
            "from:",
            p,
            bucketURL,
          );
          const full = `${bucketURL.replace(/\/$/, "")}/${p.replace(
            /^\//,
            "",
          )}`;
          fromBucket.push(full);
        }
      }
    }

    const combined = Array.from(
      new Set([...normalizedFromTable, ...fromBucket]),
    );
    console.log("🔹 Server-side assets resolved:", combined.length);
    return combined;
  } catch (err) {
    console.error("❌ Error reading server side assets:", err);
    throw err;
  }
}

async function processOne(relPath: string | unknown) {
  if (typeof relPath !== "string") {
    console.warn("⚠️ Skipping non-string asset entry:", relPath);
    return null;
  }

  const isExternal = /^https?:\/\//i.test(relPath);
  let buffer: Buffer | null = null;
  let ext = "";
  let contentType = "";

  if (isExternal) {
    try {
      const r = await bufferFromUrl(relPath);
      buffer = r.buffer;
      ext = r.ext;
      contentType = r.contentType;
    } catch (err) {
      console.warn("⚠️ Skipping external fetch error for", relPath, err);
      return null;
    }
  } else {
    const normalized = relPath.replace(/^\//, "");
    const abs = path.join(ROOT, "public", normalized);
    if (!(await fileExists(abs))) {
      console.warn("⚠️ Skipping missing file:", relPath, "expected at", abs);
      return null;
    }
    const [buf, readErr] = await safe(() => fsPromises.readFile(abs));
    if (buf === null) {
      console.error("❌ Error reading file for", relPath, readErr);
      return null;
    }
    buffer = buf as Buffer;
    ext = path.extname(abs).toLowerCase();
  }

  if (!buffer) return null;

  try {
    const ph = await tryPlaiceholder(buffer);
    if (ph) return ph;
  } catch (err) {
    console.warn("⚠️ Skipping plaiceholder error for", relPath, err);
  }

  if (isExternal) {
    const mime = contentType || extToMime(ext || "");
    return `data:${mime};base64,${buffer.toString("base64")}`;
  } else {
    return encodeFullFileAsBase64(
      path.join(ROOT, "public", relPath.replace(/^\//, "")),
      ext,
    );
  }
}

async function main() {
  console.log("✅ generate-lqip-plaiceholder: start");

  const manifest: Record<string, ImagePhRenderingProps | string> = {};

  const text = await readAssets();
  const serverSideAssets = await readServerSideAssets();
  const paths = extractPaths(text);

  console.log("✅ Found", paths.length, "local assets to process");
  console.log(
    "✅ Found",
    serverSideAssets?.length ?? 0,
    "server-side assets to process",
  );

  const mergedRaw = [...paths, ...(serverSideAssets ?? [])];
  const filterMergedRaw = mergedRaw.filter(Boolean).map((v) => String(v));
  const merged = Array.from(new Set(filterMergedRaw));

  console.log("✅ Found", merged.length, "in total assets to process");
  await ensureDirExist();

  for (const p of merged) {
    const val = await processOne(p);
    console.log("✅ Now processed:", p);
    if (val) manifest[p] = val as ImagePhRenderingProps;
  }

  const [writeRes, writeErr] = await safe(() =>
    fsPromises.writeFile(OUT_FILE, JSON.stringify(manifest, null, 2), "utf8"),
  );
  if (writeRes === null) {
    console.error("❌ Error writing manifest:", writeErr);
    throw writeErr;
  }

  console.log("Wrote manifest:", OUT_FILE);
  console.log(
    `✅ Created ${Object.keys(manifest).length} entries of ${merged.length}`,
  );
  console.log("generate-lqip-plaiceholder: done");
}

main().catch((err) => {
  console.error("Fatal during lqip generation:", err);
  process.exit(1);
});
