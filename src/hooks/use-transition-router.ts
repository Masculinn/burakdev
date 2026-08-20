// hooks/use-transition-router.ts
import { navigateWithTransition } from "@/lib/view-transition";
import { useRouter } from "next/router";

type RouterPush = ReturnType<typeof useRouter>["push"];
type NavigateOptions = Parameters<RouterPush>[2];
type Url = Parameters<RouterPush>[0];

export interface TransitionRouter {
  push: (href: Url, as?: Url, options?: NavigateOptions) => void;
  replace: (href: Url, as?: Url, options?: NavigateOptions) => void;
}

function toPath(href: Url): string {
  return typeof href === "string" ? href : (href.pathname ?? "/");
}

export function useTransitionRouter(): TransitionRouter {
  const router = useRouter();

  return {
    push: (href, as, options) => {
      void navigateWithTransition(
        () => router.prefetch(toPath(href)),
        () => router.push(href, as, options),
      );
    },
    replace: (href, as, options) => {
      void navigateWithTransition(
        () => router.prefetch(toPath(href)),
        () => router.replace(href, as, options),
      );
    },
  };
}
