// lib/view-transition.ts
type NavigateFn = () => Promise<boolean> | Promise<void>;
type PrefetchFn = () => Promise<void>;

/**
 * Ceiling on how long we'll wait for `prefetch` before giving up on the
 * transition. The View Transitions spec freezes the renderer for the
 * full duration of the update callback, so anything network-bound has
 * to resolve *before* startViewTransition is called, not inside it.
 * If it can't happen this fast, a plain nav beats a frozen page.
 */
const TRANSITION_READY_BUDGET_MS = 200;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let inFlight: ViewTransition | null = null;

export async function navigateWithTransition(
  prefetch: PrefetchFn,
  navigate: NavigateFn,
): Promise<void> {
  if (
    typeof document === "undefined" ||
    !document.startViewTransition ||
    prefersReducedMotion()
  ) {
    await navigate();
    return;
  }

  let readyInTime = true;
  await Promise.race([
    prefetch().catch(() => undefined),
    new Promise<void>((resolve) => {
      setTimeout(() => {
        readyInTime = false;
        resolve();
      }, TRANSITION_READY_BUDGET_MS);
    }),
  ]);

  if (!readyInTime) {
    // Data isn't cached yet — take the hit as a normal, un-animated nav
    // instead of freezing the page for up to ~4s waiting on the network.
    await navigate();
    return;
  }

  // A second navigation mid-transition should win outright, not fight
  // the first one for the DOM.
  inFlight?.skipTransition();

  const transition = document.startViewTransition(() => navigate());
  inFlight = transition;
  transition.finished.finally(() => {
    if (inFlight === transition) inFlight = null;
  });
}
