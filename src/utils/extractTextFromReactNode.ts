import { isArray } from "lodash";
import React from "react";

export default function extractTextFromReactNode(
  node: React.ReactNode
): string {
  if (typeof node === "string" || typeof node === "number")
    return node.toString();

  if (isArray(node)) {
    return node.map(extractTextFromReactNode).join("");
  }

  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    return extractTextFromReactNode(element.props.children);
  }

  return "";
}
