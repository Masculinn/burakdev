import config from "../config/index";
import type { ConsentRecord, ConsentState } from "../types";

const { CONSENT_KEY, HISTORY_KEY } = config;

function readStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return (JSON.parse(raw) as ConsentRecord).consents;
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
