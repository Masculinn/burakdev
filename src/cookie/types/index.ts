import type { Dispatch, SetStateAction } from "react";

export type ConsentCategories = "necessary" | "analytics";
export type ConsentState = { necessary: true; analytics: boolean };
export type ConsentSource = "accept_all" | "reject_all" | "preferences";
export type ConsentRecord = {
  version: number;
  consents: ConsentState;
  timestamp: string;
  source?: string;
};

export interface CookieContextValue {
  consent: ConsentState | null;
  ready: boolean;
  bannerVisible: boolean;
  preferencesModalOpen: boolean;
  setPreferencesModalOpen: Dispatch<SetStateAction<boolean>>;
  saveConsent: (analytics: boolean, source: ConsentSource) => boolean;
}
