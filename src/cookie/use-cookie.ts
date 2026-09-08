import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import config from "./config";
import { CookieContext } from "./contexts";
import {
  OPEN_PREFERENCES_EVENT,
  readStoredConsent,
  writeStoredConsent,
} from "./lib";
import type { ConsentSource, ConsentState, CookieContextValue } from "./types";

export function useCookie(): CookieContextValue {
  const context = useContext(CookieContext);
  if (!context)
    throw new Error("useCookie must be used within <CookieProvider>");
  return context;
}

export function useCookieStates(): CookieContextValue {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [ready, setReady] = useState(false);
  const [preferencesModalOpen, setPreferencesModalOpen] = useState(false);

  useEffect(() => {
    const refresh = () => {
      const stored = readStoredConsent();
      setConsent((previous) =>
        previous?.analytics === stored?.analytics ? previous : stored,
      );
      setReady(true);
    };
    const onStorage = (event: StorageEvent) => {
      try {
        if (event.storageArea && event.storageArea !== window.localStorage)
          return;
      } catch {
        return;
      }
      if (event.key === config.CONSENT_KEY || event.key === null) refresh();
    };
    const onOpen = () => setPreferencesModalOpen(true);
    window.addEventListener("storage", onStorage);
    window.addEventListener(OPEN_PREFERENCES_EVENT, onOpen);
    refresh();
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(OPEN_PREFERENCES_EVENT, onOpen);
    };
  }, []);

  const saveConsent = useCallback(
    (analytics: boolean, source: ConsentSource) => {
      const next: ConsentState = { necessary: true, analytics };
      const persisted = writeStoredConsent({
        version: config.CONSENT_VERSION,
        consents: next,
        timestamp: new Date().toISOString(),
        source,
      });
      setConsent(next);
      setPreferencesModalOpen(false);
      return persisted;
    },
    [],
  );

  return useMemo(
    () => ({
      consent,
      ready,
      bannerVisible: ready && consent === null,
      preferencesModalOpen,
      setPreferencesModalOpen,
      saveConsent,
    }),
    [consent, ready, preferencesModalOpen, saveConsent],
  );
}
