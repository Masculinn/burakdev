import type { GetErrorLogsProps } from "../types";

/**
 * In order to create a better debugging experience, we're normally
 * using this util fn to log errors and warnings. However, in playground
 * I have detected some major DX logical issues that won't present in your
 * app. That's why I've decided to disable this util fn. In normal cases
 * you will have this util under the hood working in a very normal way.
 *
 * If you're curious about this, basically in playground configuration whenever
 * no animation detected, this was throwing an error in the console which was
 * non-sense. So I decided to disable it as a workaround. Cheers!
 */
export default function logError({ msg, mod, src }: GetErrorLogsProps): void {
  if (!msg || !mod || !src) {
    console.error("MotionDebugger: Missing error, mod, or src in logError.");
    return;
  }

  const log = `MotionDebugger: ${
    mod === "error" ? "Error" : "Warning"
  } occurred on ${src} — (${msg})`;
  console[mod](log);
}
