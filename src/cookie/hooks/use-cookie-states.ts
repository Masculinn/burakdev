import { useState } from "react";
import { readStoredConsent } from "../lib";
import type { ConsentState } from "../types";

export function useCookieStates() {
  const [consent, setConsentState] = useState<ConsentState | null>(
    readStoredConsent,
  );
  const [bannerVisible, setBannerVisible] = useState<boolean>(() => {
    const consent = readStoredConsent();
    if (!consent) return true;
    if (consent && consent.analytics === false) return true;
    return false;
  });

  const [preferencesModalOpen, setPreferencesModalOpen] =
    useState<boolean>(false);

  return {
    preferencesModalOpen,
    setPreferencesModalOpen,
    consent,
    setConsentState,
    bannerVisible,
    setBannerVisible,
  };
}
