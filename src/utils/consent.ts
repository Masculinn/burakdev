import { CONSENT_KEY, HISTORY_KEY } from "@/constants/cookie.config";
import type { ConsentRecord } from "@/interfaces";

function readStoredConsent(): ConsentRecord | null {
  try {
    const raw =
      typeof window !== "undefined" ? localStorage.getItem(CONSENT_KEY) : null;
    if (!raw) return null;
    return JSON.parse(raw) as ConsentRecord;
  } catch {
    return null;
  }
}

function writeStoredConsent(rec: ConsentRecord) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(rec));
    const rawHistory = localStorage.getItem(HISTORY_KEY);
    const history = rawHistory
      ? (JSON.parse(rawHistory) as ConsentRecord[])
      : [];
    history.unshift(rec);
    const trimmed = history.slice(0, 10);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch {}
}

function clearStoredConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {}
}

export { clearStoredConsent, readStoredConsent, writeStoredConsent };
