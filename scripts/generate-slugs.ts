import dotenv from "dotenv";
import { existsSync, promises } from "node:fs";
import path from "node:path";

const p = path.join(process.cwd(), ".env");

if (existsSync(p)) {
  dotenv.config({ path: p, quiet: true });
  console.log(`✅ Loaded env from ${p}`);
}

import type { PostgrestError } from "@supabase/supabase-js";
import fsPromises from "node:fs/promises";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "src", "generated");
const OUT_FILE = path.join(OUT_DIR, "slugs.json");

type Item = {
  url: string;
  title: string;
};

async function ensureDirExist() {
  await promises.mkdir(OUT_DIR, { recursive: true });
}

async function readServerSideSlugs(): Promise<Item[] | null> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  ) {
    console.log(
      "⚠️ Missing database env vars: check either, returning 'null' in 'serverSideSlugs()'"
    );
    return null;
  }

  try {
    const dbFile = path.join(ROOT, "src", "utils", "db.ts").replace(/\\/g, "/");
    const utilFile = path
      .join(ROOT, "src", "lib", "utils.ts")
      .replace(/\\/g, "/");

    const dbMod = await import(`file://${dbFile}`);
    const utilMode = await import(`file://${utilFile}`);

    const db = dbMod.default ?? dbMod;
    const { convertToSlug } = utilMode.default ?? utilMode;

    const { data, error } = (await db().from("blog_posts").select("title")) as {
      data: { title: string }[] | null;
      error: PostgrestError | null;
    };

    if (error || !data) {
      console.error("❌ Error getting server side slugs:", error);
      throw error;
    }

    const res = data.map(({ title }) => ({
      url: convertToSlug(title),
      title,
    }));

    return res;
  } catch (err) {
    console.error("❌ Error reading server side assets:", err);
    throw err;
  }
}

async function main() {
  console.log("✅ generate-blog-slugs: start");

  const generatedSlugs: Array<Item> = [];
  const slugs = await readServerSideSlugs();

  if (slugs) {
    console.log("✅ Found", slugs.length, "slugs to process");
    generatedSlugs.push(...slugs);
  }

  await ensureDirExist();

  try {
    await fsPromises.writeFile(
      OUT_FILE,
      JSON.stringify(generatedSlugs, null, 2),
      "utf8"
    );
  } catch (err) {
    console.error("❌ Error writing slugs:", err);
    throw err;
  }

  console.log("✅ Wrote", generatedSlugs.length, "slugs");
  console.log("✅ generate-blog-slugs: done");
}

main().catch((err) => {
  console.error("Fatal during slug generation:", err);
  process.exit(1);
});
