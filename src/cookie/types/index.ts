import type { SetStateProps } from "@/interfaces";

export type ConsentCategories = "necessary" | "analytics";
export type ConsentState = {
  necessary: true;
  analytics: boolean;
};
export type ConsentRecord = {
  version: number;
  consents: ConsentState;
  timestamp: string;
  source?: string;
};

export interface CookieContextValue {
  consent: ConsentState | null;
  setConsentState: SetStateProps<ConsentState | null>;
  preferencesModalOpen: boolean;
  setPreferencesModalOpen: SetStateProps<boolean>;
  bannerVisible: boolean;
  setBannerVisible: SetStateProps<boolean>;
}
