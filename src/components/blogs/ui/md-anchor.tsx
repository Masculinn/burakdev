import Link from "next/link";
import type { JSX } from "react";
import { useMemo } from "react";

export type AnchorProps = JSX.IntrinsicElements["a"];

export const MdAnchor = ({ href, ...props }: AnchorProps) => {
  const refSource = "burakdev.com";
  const safeHref = typeof href === "string" ? href.trim() : "";
  const isExternal = /^https?:\/\//i.test(safeHref);

  const finalHref = useMemo(() => {
    if (!isExternal || !safeHref) return safeHref;
    try {
      const url = new URL(safeHref);
      if (!url.searchParams.has("ref")) {
        url.searchParams.append("ref", refSource);
      }
      return url.toString();
    } catch {
      return safeHref;
    }
  }, [safeHref, isExternal]);

  if (!href) return null;

  const defaultExternalAttrs = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={finalHref}
      className="underline underline-offset-2 hover:text-muted-foreground transition-colors duration-200"
      {...defaultExternalAttrs}
      {...props}
    />
  );
};
