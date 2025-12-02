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
  setConsent: (
    c: Partial<Omit<ConsentState, "necessary">> & { source?: string }
  ) => void;
  has: (category: ConsentCategories) => boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  resolved: boolean;
}
