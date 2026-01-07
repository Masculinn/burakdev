import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { Children, isValidElement } from "react";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
function normalize(arr?: string[]) {
  return (arr || []).map((t) => String(t).trim().toLowerCase());
}
function areSameSet(a: string[], b: string[]) {
  return a.length === b.length && a.every((v) => b.includes(v));
}
function getDate(date: string): Date {
  return new Date(date);
}
function checkIsRecent(date: string, days: number = 3): boolean {
  const now = Date.now();
  const _date = getDate(date).getTime();
  const msperDay = 24 * 60 * 60 * 1000;
  const diff = now - _date;
  return diff >= 0 && diff < days * msperDay;
}
function convertToSlug(t: string) {
  return t
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getReadingTime(content: string): number {
  const wordsPerMinute = 250;
  const imageSeconds = 12;

  const raw = (content ?? "").toString();
  if (!raw.trim()) return 0;

  const countImages = (input: string) => {
    const imgHtml = (input.match(/<img\b[^>]*>/gi) || []).length;
    const mdImgs = (input.match(/!\[[^\]]*\]\([^)]+\)/g) || []).length;
    return imgHtml + mdImgs;
  };

  const images = countImages(raw);

  const stripMarkdownAndHtml = (input: string) => {
    let s = input;

    s = s.replace(/^\s*---[\s\S]*?---\s*/m, "");

    s = s.replace(/```[\s\S]*?```/g, " ");
    s = s.replace(/~~~[\s\S]*?~~~/g, " ");

    s = s.replace(/`[^`]*`/g, " ");

    s = s.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ");
    s = s.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ");
    s = s.replace(/<!--[\s\S]*?-->/g, " ");

    s = s.replace(/!\[([^\]]*)\]\((?:[^)]+)\)/g, (_, alt) =>
      alt ? `${alt} ` : " ",
    );

    s = s.replace(
      /<img\b[^>]*\salt=(?:'([^']*)'|"([^"]*)"|([^\s>]+))[^>]*>/gi,
      (_, a1, a2, a3) => {
        const alt = a1 ?? a2 ?? a3 ?? "";
        return alt ? `${alt} ` : " ";
      },
    );

    s = s.replace(/<img\b[^>]*>/gi, " ");

    s = s.replace(/\[([^\]]+)\]\((?:[^)]+)\)/g, (_, text) =>
      text ? `${text} ` : " ",
    );

    s = s.replace(/\[([^\]]+)\]\s*\[[^\]]*\]/g, (_, text) =>
      text ? `${text} ` : " ",
    );

    s = s.replace(/^[ \t]*\[[^\]]+\]:.*$/gm, " ");

    s = s.replace(/^[ \t]*[#>*+-]+[ \t]*/gm, " ");

    s = s.replace(/[*_~]{1,3}/g, " ");

    s = s.replace(/<[^>]+>/g, " ");

    s = s.replace(/\s+/g, " ").trim();

    return s;
  };

  const countWords = (text: string) => {
    if (!text) return 0;

    const matches = text.match(/[\p{L}\p{N}]+(?:['’\-\u2019][\p{L}\p{N}]+)*/gu);
    return matches ? matches.length : 0;
  };

  const cleaned = stripMarkdownAndHtml(raw);
  const words = countWords(cleaned);
  const secondsFromWords = (words / wordsPerMinute) * 60;
  const totalSeconds = Math.max(
    0,
    Math.round(secondsFromWords + images * imageSeconds),
  );
  const minutes = totalSeconds / 60;
  return Math.ceil(minutes);
}

function getChild(children: React.ReactNode) {
  return Children.toArray(children).find((c) => isValidElement(c));
}
function ensureChildExist(child: React.ReactNode | undefined) {
  if (!child) return "";
  const c = (child as { props: { children?: unknown } }).props?.children;
  if (typeof c === "string") return c.replace(/\n$/, "");
  if (Array.isArray(c)) return c.join("");
  return String(c ?? "");
}
function getImgAltName(img: string) {
  if (!img) return "image";
  return img.split("/")[img.split("/").length - 1].split(".")[0];
}

export {
  areSameSet,
  checkIsRecent,
  cn,
  convertToSlug,
  ensureChildExist,
  getChild,
  getDate,
  getImgAltName,
  getReadingTime,
  normalize,
};
