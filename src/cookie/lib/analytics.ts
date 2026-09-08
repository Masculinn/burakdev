// Kept on window so Strict Mode and component remounts do not configure GA twice.
type Gtag = (...args: unknown[]) => void;
type AnalyticsRuntime = {
  configured: boolean;
  allowed: boolean;
  lastPage: string | null;
};
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: Gtag;
  __siteCookieAnalytics?: Record<string, AnalyticsRuntime>;
};

function runtime(id: string) {
  const target = window as AnalyticsWindow;
  target.__siteCookieAnalytics ??= {};
  // biome-ignore lint/suspicious/noAssignInExpressions: false positive
  const state = (target.__siteCookieAnalytics[id] ??= {
    configured: false,
    allowed: false,
    lastPage: null,
  });
  return { target, state };
}

export function updateAnalyticsConsent(id: string, allowed: boolean): void {
  const { target, state } = runtime(id);
  (target as unknown as Record<string, unknown>)[`ga-disable-${id}`] = !allowed;
  if (!allowed) {
    if (state.allowed) {
      target.gtag?.("consent", "update", { analytics_storage: "denied" });
    }
    state.allowed = false;
    state.lastPage = null;
    return;
  }
  target.dataLayer ??= [];
  target.gtag ??= function () {
    target.dataLayer!.push(arguments);
  };
  if (!state.configured) {
    target.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    target.gtag("js", new Date());
  }
  if (!state.allowed) {
    target.gtag("consent", "update", { analytics_storage: "granted" });
  }
  if (!state.configured) {
    target.gtag("config", id, { send_page_view: false });
    state.configured = true;
  }
  state.allowed = true;
}

export function trackPageView(id: string, url: string): void {
  const { target, state } = runtime(id);
  if (!state.allowed || !target.gtag) return;
  const page = new URL(url, window.location.origin);
  // Hash-only navigation is not a new page; query-string changes are.
  const path = page.pathname + page.search;
  if (state.lastPage === path) return;
  target.gtag("event", "page_view", {
    send_to: id,
    page_path: path,
    page_location: page.origin + path,
    page_title: document.title,
  });
  state.lastPage = path;
}
