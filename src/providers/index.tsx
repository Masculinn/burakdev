import type { ComponentType, ReactNode } from "react";

type AnyProviderEntry = readonly [
  ComponentType<{ value: never; children: ReactNode }>,
  unknown,
  string,
];

export function composeProviders(
  providers: AnyProviderEntry[],
  children: ReactNode,
): ReactNode {
  return providers.reduceRight((acc, [Provider, value, key]) => {
    const P = Provider as ComponentType<{
      value: unknown;
      children: ReactNode;
    }>;
    return (
      <P key={key} value={value}>
        {acc}
      </P>
    );
  }, children);
}
