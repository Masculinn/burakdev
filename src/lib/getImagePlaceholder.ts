import lqipRaw from "@/generated/lqip-manifest.json" with { type: "json" };
import type { GetPlaiceholderReturn } from "plaiceholder";

type LqipEntry = {
  base64: string;
  css: GetPlaiceholderReturn["css"];
  width: number;
  height: number;
};

const lqip = lqipRaw as Record<string, LqipEntry>;

type Base64Meta = { base64: string; width: number; height: number };
type CssMeta = {
  css: GetPlaiceholderReturn["css"];
  width: number;
  height: number;
};

export function getImagePlaceholder(
  src: string,
  method: "base64",
  metadataIncluded: true,
): Base64Meta | undefined;
export function getImagePlaceholder(
  src: string,
  method: "css",
  metadataIncluded: true,
): CssMeta | undefined;

export function getImagePlaceholder(
  src: string,
  method: "base64",
  metadataIncluded?: false,
): string | undefined;
export function getImagePlaceholder(
  src: string,
  method: "css",
  metadataIncluded?: false,
): GetPlaiceholderReturn["css"] | undefined;

export function getImagePlaceholder(
  src: string,
  method: "base64" | "css",
  metadataIncluded = false,
) {
  const entry = lqip[src];

  if (!entry) return undefined;

  if (metadataIncluded) {
    if (method === "base64") {
      return {
        base64: entry.base64,
        width: entry.width,
        height: entry.height,
      } as Base64Meta;
    }
    return {
      css: entry.css,
      width: entry.width,
      height: entry.height,
    } as CssMeta;
  }

  return entry[method];
}
