import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { isProd } from "@/utils/isProd";
import { useCallback } from "react";
import { createPortal } from "react-dom";
import config from "../config";
import { useCookie } from "../hooks";
import { writeStoredConsent } from "../lib";
import type { ConsentRecord, ConsentState } from "../types";

const { CONSENT_VERSION } = config;

const Banner = () => {
  const {
    setPreferencesModalOpen,
    setBannerVisible,
    setConsentState,
    consent,
  } = useCookie();

  const handleOpenPreferences = () => setPreferencesModalOpen(true);

  const handleCookies = useCallback(
    (c: boolean) => {
      const newConsent: ConsentState = {
        necessary: true,
        analytics: c && Boolean(consent?.analytics),
      };

      const r: ConsentRecord = {
        version: CONSENT_VERSION,
        consents: newConsent,
        timestamp: new Date().toISOString(),
        source: newConsent.analytics ? "accept_all" : "reject_all",
      };

      setConsentState(newConsent);
      writeStoredConsent(r);
      setBannerVisible(false);
    },
    [setBannerVisible, setConsentState, consent],
  );

  return (
    <div className="fixed inset-x-4 bottom-4 md:bottom-8 md:left-8 md:right-auto md:w-96 z-50">
      <Card className="shadow-lg bg-transparent backdrop-blur-2xl">
        <div className="px-4 ">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h3 className="md:text-2xl text-xl font-semibold tracking-tighter">
                We use cookies 🍪
              </h3>
              <p className="text-xs text-muted-foreground mt-1 tracking-tight">
                We use necessary cookies to make the site work. We’d also like
                to use analytics cookies to understand how you use the site.
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Button onClick={() => handleCookies(true)} variant={"default"}>
                Accept all
              </Button>
              <Button variant="outline" onClick={() => handleCookies(false)}>
                Reject
              </Button>
            </div>
            <Button
              variant="secondary"
              onClick={handleOpenPreferences}
              className="self-end justify-end"
            >
              Manage
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export function CookieBanner() {
  const { bannerVisible } = useCookie();
  const prod = isProd();

  if (!bannerVisible || !prod) return null;
  return createPortal(<Banner />, document.body);
}
