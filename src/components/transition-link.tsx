import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { navigateWithTransition } from "@/lib/view-transition";
import NextLink, { type LinkProps } from "next/link";
import { useRouter } from "next/router";
import {
  type AnchorHTMLAttributes,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  type TouchEvent,
  forwardRef,
} from "react";

type TransitionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "href"> & {
    children: ReactNode;
  };

function isBypassClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

function toPath(href: LinkProps["href"]): string {
  return typeof href === "string" ? href : (href.pathname ?? "/");
}

/**
 * Same API as `next/link`. Left-clicks on the same tab route through
 * navigateWithTransition; modifier-clicks, middle clicks, and
 * `target="_blank"` fall through to native anchor behavior.
 *
 * When the user prefers reduced motion, the view-transition path (and its
 * prefetch race) is skipped entirely and navigation happens synchronously
 * through the router.
 *
 * Prefetches on pointerenter/touchstart in addition to next/link's own
 * viewport-based prefetch, so the click-time race in
 * navigateWithTransition almost always finds the route already warm.
 */
export const TransitionLink = forwardRef<
  HTMLAnchorElement,
  TransitionLinkProps
>(function TransitionLink(
  {
    href,
    as,
    replace,
    scroll,
    shallow,
    onClick,
    onPointerEnter,
    onTouchStart,
    target,
    children,
    ...rest
  },
  ref,
) {
  const router = useRouter();
  const prefersReducedMotion = usePrefersReducedMotion();
  const path = toPath(href);

  const warmPrefetch = () => {
    void router.prefetch(path);
  };

  const navigate = () =>
    replace
      ? router.replace(href, as, { scroll, shallow })
      : router.push(href, as, { scroll, shallow });

  const handlePointerEnter = (event: PointerEvent<HTMLAnchorElement>) => {
    onPointerEnter?.(event);
    warmPrefetch();
  };

  const handleTouchStart = (event: TouchEvent<HTMLAnchorElement>) => {
    onTouchStart?.(event);
    warmPrefetch();
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (isBypassClick(event) || (target && target !== "_self")) return;

    event.preventDefault();

    if (prefersReducedMotion) {
      void navigate();
      return;
    }

    void navigateWithTransition(() => router.prefetch(path), navigate);
  };

  return (
    <NextLink
      ref={ref}
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      target={target}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onTouchStart={handleTouchStart}
      {...rest}
    >
      {children}
    </NextLink>
  );
});
