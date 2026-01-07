import lqipRaw from "@/generated/lqip-manifest.json" with { type: "json" };

type Props = {
  base64: string;
  width: number;
  height: number;
};

const lqip = lqipRaw as Record<string, Props>;

export function getImagePlaceholder(
  src: string,
  metadataIncluded: true,
): Props | undefined;

export function getImagePlaceholder(
  src: string,
  metadataIncluded?: false,
): Props["base64"] | undefined;

export function getImagePlaceholder(src: string, metadataIncluded = false) {
  const entry = lqip[src];

  if (!entry) {
    console.warn(
      "⚠️ Unknown image:",
      src,
      "not found in lqip manifest, returning undefined.",
    );
    return undefined;
  }

  if (!metadataIncluded) return entry.base64;

  return {
    base64: entry.base64,
    width: entry.width,
    height: entry.height,
  } as Props;
}
