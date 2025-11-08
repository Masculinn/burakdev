import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote";
import { MDXComponents } from "./mdx-components";

type HydrateProps = Omit<MDXRemoteProps, "components">;

export default function Hydrate({ ...props }: HydrateProps) {
  return <MDXRemote {...props} components={MDXComponents} />;
}
