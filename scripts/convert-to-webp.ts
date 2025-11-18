#!/usr/bin/env ts-node

import { Command } from "commander";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

interface CliOptions {
  input: string;
  output: string;
  quality: number;
  extensions: string[];
  overwrite: boolean;
  concurrency: number;
}

const program = new Command();

program
  .description(
    "Convert JPG/PNG images to WebP recursively, preserving folder structure"
  )
  .option("-i, --input <path>", "input folder containing images", ".")
  .option(
    "-o, --output <path>",
    "output folder (ignored if --overwrite)",
    "./webp-output"
  )
  .option(
    "-q, --quality <number>",
    "webp quality 1-100",
    (val: string) => Number(val),
    80
  )
  .option(
    "-e, --extensions <list>",
    "comma-separated extensions",
    (val: string) => val.split(",").map((s) => s.trim().toLowerCase()),
    ["jpg", "jpeg", "png"]
  )
  .option(
    "--overwrite",
    "write .webp next to originals (do not use separate output dir)"
  )
  .option(
    "-c, --concurrency <n>",
    "number of concurrent conversions",
    (val: string) => Math.max(1, Number(val)),
    5
  )
  .parse(process.argv);

const opts = program.opts() as unknown as CliOptions;

const INPUT = path.resolve(opts.input);
const OUTPUT = path.resolve(opts.output);
const QUALITY = Math.max(1, Math.min(100, opts.quality || 80));
const EXTENSIONS = new Set(
  opts.extensions.map((e) => e.replace(/^[.]/, "").toLowerCase())
);
const OVERWRITE = !!opts.overwrite;
const CONCURRENCY = Math.max(1, opts.concurrency || 5);

async function ensureDir(dir: string): Promise<void> {
  try {
    await mkdir(dir, { recursive: true });
  } catch (err: any) {
    if (err?.code !== "EEXIST") throw err;
  }
}

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

function isImageFile(filePath: string): boolean {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  return EXTENSIONS.has(ext);
}

async function collectFiles(inputDir: string): Promise<string[]> {
  const files: string[] = [];
  for await (const p of walk(inputDir)) {
    if (isImageFile(p)) files.push(p);
  }
  return files;
}

function toOutputPath(srcPath: string): string {
  if (OVERWRITE) {
    const dir = path.dirname(srcPath);
    const base = path.basename(srcPath, path.extname(srcPath));
    return path.join(dir, `${base}.webp`);
  }
  const rel = path.relative(INPUT, srcPath);
  const outPath = path.join(OUTPUT, rel);
  const dir = path.dirname(outPath);
  const base = path.basename(outPath, path.extname(outPath));
  return path.join(dir, `${base}.webp`);
}

async function convertFile(
  src: string
): Promise<{ src: string; dest: string }> {
  const dest = toOutputPath(src);
  await ensureDir(path.dirname(dest));
  await sharp(src).webp({ quality: QUALITY }).toFile(dest);
  return { src, dest };
}

async function run(): Promise<void> {
  try {
    try {
      const s = await stat(INPUT);
      if (!s.isDirectory()) {
        console.error("Input path is not a directory:", INPUT);
        process.exit(2);
      }
    } catch (_err) {
      console.error("Input folder does not exist:", INPUT);
      process.exit(2);
    }

    const files = await collectFiles(INPUT);
    if (files.length === 0) {
      console.log("No matching image files found in", INPUT);
      return;
    }

    if (!OVERWRITE) await ensureDir(OUTPUT);

    console.log(
      `Found ${files.length} file(s). Converting with quality=${QUALITY}, concurrency=${CONCURRENCY}...`
    );

    let index = 0;
    const results: Array<
      | { status: "fulfilled"; value?: { src: string; dest: string } }
      | { status: "rejected"; reason: any }
    > = [];

    async function worker() {
      while (true) {
        const i = index++;
        if (i >= files.length) return;
        const file = files[i];
        try {
          const r = await convertFile(file);
          process.stdout.write(".");
          results.push({ status: "fulfilled", value: r });
        } catch (err: any) {
          process.stdout.write("x");
          results.push({
            status: "rejected",
            reason: { file, error: err?.message || String(err) },
          });
        }
      }
    }

    const workers = Array.from(
      { length: Math.min(CONCURRENCY, files.length) },
      () => worker()
    );
    await Promise.all(workers);
    console.log("\nDone.");

    const failed = results.filter((r) => r.status === "rejected");
    if (failed.length) {
      console.error(`\n${failed.length} file(s) failed:`);
      for (const f of failed)
        console.error(
          "-",
          (f as any).reason.file,
          ":",
          (f as any).reason.error
        );
      process.exitCode = 1;
    } else {
      console.log(`Converted ${results.length} file(s).`);
    }
  } catch (err) {
    console.error("Fatal error:", err);
    process.exit(1);
  }
}

run();

export default run;
