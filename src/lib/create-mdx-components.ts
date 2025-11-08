import type { MDXComponentsMap } from "@/interfaces";

export function createMDXComponents<T extends MDXComponentsMap>(
  component: T,
): T {
  return component;
}
