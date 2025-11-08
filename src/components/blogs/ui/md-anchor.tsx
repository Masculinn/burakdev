import Link from "next/link";
import type { JSX } from "react";

export type AnchorProps = JSX.IntrinsicElements["a"];

export const MdAnchor = ({ href, ...props }: AnchorProps) => {
  if (!href) {
    console.warn("MdAnchor called without href — skipping render.");
    return null;
  }
  return (
    <Link
      href={href}
      className="underline underline-offset-2 hover:text-muted-foreground transition-colors duration-200"
      {...props}
    />
  );
};
