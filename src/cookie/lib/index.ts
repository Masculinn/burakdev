import config from "../config";
import type { ConsentRecord, ConsentState } from "../types";

const { CONSENT_KEY, HISTORY_KEY, CONSENT_VERSION } = config;
export const OPEN_PREFERENCES_EVENT = "site:open-cookie-preferences";

export function parseStoredConsent(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const record: unknown = JSON.parse(raw);
    if (!record || typeof record !== "object") return null;
    const value = record as Partial<ConsentRecord>;
    if (
      value.version !== CONSENT_VERSION ||
      !value.consents || value.consents.necessary !== true ||
      typeof value.consents.analytics !== "boolean" ||
      typeof value.timestamp !== "string" ||
      !Number.isFinite(Date.parse(value.timestamp))
    ) return null;
    return { necessary: true, analytics: value.consents.analytics };
  } catch {
    return null;
  }
}

export function readStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    return parseStoredConsent(window.localStorage.getItem(CONSENT_KEY));
  } catch {
    return null;
  }
}

export function writeStoredConsent(record: ConsentRecord): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  } catch {
    return false;
  }
  // An optional history failure must never invalidate the saved choice.
  try {
    let history: unknown;
    try {
      history = JSON.parse(window.localStorage.getItem(HISTORY_KEY) ?? "[]");
    } catch {
      history = [];
    }
    window.localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify([record, ...(Array.isArray(history) ? history : [])].slice(0, 10)),
    );
  } catch { /* Consent itself was saved successfully. */ }
  return true;
}

/** Can be called from a footer button outside Cookie's internal provider. */
export function openCookiePreferences(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
  }
}
