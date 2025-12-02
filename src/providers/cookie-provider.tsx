import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CONSENT_VERSION } from "@/constants/cookie.config";
import { CookieContext } from "@/contexts";
import type {
  ConsentRecord,
  ConsentState,
  CookieContextValue,
} from "@/interfaces";
import { isProd } from "@/lib/env";
import {
  clearStoredConsent,
  readStoredConsent,
  writeStoredConsent,
} from "@/utils/consent";
import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { useRouter } from "next/router";
import type React from "react";
import { useEffect, useRef, useState } from "react";

export default function CookieProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const prod = isProd();

  const [consent, setConsentState] = useState<ConsentState | null>(() => {
    const rec = typeof window !== "undefined" ? readStoredConsent() : null;
    return rec ? rec.consents : null;
  });
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(() => {
    const rec = typeof window !== "undefined" ? readStoredConsent() : null;
    return !rec;
  });

  const hasSentInit = useRef(false);

  const resolved = consent !== null;

  const persistConsent = (
    partial: Partial<Omit<ConsentState, "necessary">> & {
      source?: string;
    } = {}
  ) => {
    const newConsent: ConsentState = {
      necessary: true,
      analytics: partial.analytics ?? false,
    };
    const rec: ConsentRecord = {
      version: CONSENT_VERSION,
      consents: newConsent,
      timestamp: new Date().toISOString(),
      source: partial.source ?? "local",
    };
    writeStoredConsent(rec);
    setConsentState(newConsent);
    setBannerVisible(false);
    setPrefsOpen(false);
  };

  const ctxValue: CookieContextValue = {
    consent,
    setConsent: (partial) => persistConsent(partial),
    has: (c) => {
      if (c === "necessary") return true;
      if (!consent) return false;
      return !!(consent as any)[c];
    },
    openPreferences: () => setPrefsOpen(true),
    closePreferences: () => setPrefsOpen(false),
    resolved: Boolean(resolved),
  };

  useEffect(() => {
    if (!prod) return;
    if (!consent || !consent.analytics) return;

    const handleRouteChange = (url: string) => {
      try {
        sendGAEvent("page_view", { page_path: url });
      } catch {
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "page_view", { page_path: url });
        }
      }
    };

    if (!hasSentInit.current) {
      const currentUrl =
        typeof window !== "undefined"
          ? window.location.pathname + window.location.search
          : "/";
      handleRouteChange(currentUrl);
      hasSentInit.current = true;
    }

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [consent, prod, router.events]);

  useEffect(() => {
    if (!consent) return;
    if (!consent.analytics) return;
    if (typeof window !== "undefined" && (window as any).gtag) {
      try {
        (window as any).gtag("consent", "update", {
          analytics_storage: "granted",
        });
      } catch {}
    }
  }, [consent]);

  const acceptAll = () =>
    persistConsent({ analytics: true, source: "accept_all" });
  const rejectAll = () =>
    persistConsent({ analytics: false, source: "reject_all" });
  const savePreferences = (analyticsAllowed: boolean) =>
    persistConsent({ analytics: analyticsAllowed, source: "preferences" });

  const withdrawConsent = () => {
    clearStoredConsent();
    setConsentState(null);
    setBannerVisible(true);
    hasSentInit.current = false;
  };

  // Accessibility: close preferences on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPrefsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <CookieContext.Provider value={ctxValue}>
      {children}

      {/* Mount GA only after explicit analytics consent */}
      {prod &&
        consent &&
        consent.analytics &&
        process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}

      {bannerVisible && (
        <div className="fixed inset-x-4 bottom-4 md:bottom-8 md:left-8 md:right-auto md:w-96 z-50">
          <Card className="shadow-lg bg-transparent backdrop-blur-2xl">
            <div className="px-4 py-1">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h3 className="md:text-2xl text-xl font-semibold tracking-tighter">
                    We use cookies
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 tracking-tight">
                    We use necessary cookies to make the site work. We’d also
                    like to use analytics cookies to understand how you use the
                    site.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <Button onClick={acceptAll} variant={"default"}>
                    Accept all
                  </Button>
                  <Button variant="outline" onClick={rejectAll}>
                    Reject
                  </Button>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setPrefsOpen(true)}
                  className="self-end justify-end"
                >
                  Manage
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Preferences modal (shadcn Dialog) */}
      <Dialog open={prefsOpen} onOpenChange={(open) => setPrefsOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cookie preferences</DialogTitle>
            <DialogDescription>
              Choose which cookies you allow. You can change this later in site
              preferences.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 grid gap-3">
            <div className="flex items-center justify-between border rounded-md p-3">
              <div>
                <div className="font-medium">Necessary</div>
                <div className="text-sm text-slate-500">
                  Required for the site to work.
                </div>
              </div>
              <div className="text-sm text-slate-500">Always on</div>
            </div>

            <div className="flex items-center justify-between border rounded-md p-3">
              <div>
                <div className="font-medium">Analytics</div>
                <div className="text-sm text-slate-500">
                  Helps us improve the site. No personal identifiers are stored.
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="analytics-switch" className="sr-only">
                  Analytics
                </Label>
                <Switch
                  id="analytics-switch"
                  checked={consent?.analytics ?? false}
                  onCheckedChange={(val) =>
                    setConsentState(() => ({
                      necessary: true,
                      analytics: !!val,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <div className="w-full flex justify-between items-center">
              <div className="text-xs text-slate-500">
                You can withdraw consent at any time by clearing site cookies or
                using site preferences.
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => setPrefsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    savePreferences(consent?.analytics ?? false);
                  }}
                >
                  Save preferences
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CookieContext.Provider>
  );
}
