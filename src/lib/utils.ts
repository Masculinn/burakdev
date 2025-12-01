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
  const wordsPerMinute = 200,
    imageSeconds = 12;

  const raw = (content ?? "").toString();

  if (!raw.trim()) {
    return 0;
  }

  const stripHtml = (input: string) =>
    input
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const countWords = (text: string) => {
    if (!text) return 0;
    const matches = text.match(/[\p{L}\p{N}]+(?:['’\-\u2019][\p{L}\p{N}]+)*/gu);
    return matches ? matches.length : 0;
  };

  const countImages = (rawInput: string) => {
    const imgHtml = (rawInput.match(/<img\b[^>]*>/gi) || []).length;
    const mdImgs = (rawInput.match(/!\[[^\]]*\]\([^)]+\)/g) || []).length;
    return imgHtml + mdImgs;
  };

  const looksLikeHtml = /<[^>]+>/.test(raw);
  const textForWords = looksLikeHtml ? stripHtml(raw) : raw;
  const words = countWords(textForWords);
  const images = countImages(raw);

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
  getDate,
  getReadingTime,
  normalize,
  getChild,
  ensureChildExist,
  getImgAltName,
};
