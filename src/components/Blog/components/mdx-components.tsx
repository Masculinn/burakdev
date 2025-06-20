import React from "react";
import { MdHeading } from "../ui/MdHeading";
import { MdParagraph } from "../ui/MdParagraph";
import { MdLink } from "../ui/MdLink";
import { MdCode } from "../ui/MdCode";
import { MdBlockquote } from "../ui/MdBlockquote";
import { MdPre } from "../ui/MdPre";
import { MdImage } from "../ui/MdImage";
import { MdUl } from "../ui/MdUl";
import {
  MdTable,
  MdTbody,
  MdTd,
  MdTh,
  MdThead,
  MdTr,
} from "../ui/MdTableComponents";
import { MdHr } from "../ui/MdHr";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export const MdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <MdHeading as="h1" size="xl" className="my-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <MdHeading as="h2" size="lg" className="my-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <MdHeading as="h3" size="md" className="my-4" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <MdHeading as="h4" size="sm" className="my-4" {...props} />
  ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <MdHeading as="h5" size="xs" className="my-4" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <MdParagraph {...props} />
  ),
  a: (props: AnchorProps) => <MdLink {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <MdCode {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <MdBlockquote {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <MdPre {...props} />,
  img: (
    props: React.HTMLAttributes<HTMLImageElement> & { alt: string; src: string }
  ) => (
    <MdImage
      {...props}
      alt={props.alt}
      src={props.src}
      className="rounded-md"
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <MdUl {...props} />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <MdTable {...props} />
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <MdThead {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <MdTbody {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => <MdTr {...props} />,
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <MdTh {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <MdTd {...props} />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <MdHr className="my-24" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold" {...props} />
  ),
};
