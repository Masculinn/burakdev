import Link, { LinkProps } from "next/link";
import { FC } from "react";

export const MdLink: FC<LinkProps> = ({ href, ...props }) => (
  <Link
    href={href}
    className="underline underline-offset-2 dark:hover:text-white hover:text-stone-600 text-emerald-400"
    rel="noopener noreferrer"
    target="_blank"
    {...props}
  />
);
