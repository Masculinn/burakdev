import {
  RATE_LIMIT_ENDLINE,
  RATE_LIMIT_IN_SECONDS,
} from "@/constants/email.config";
import { useCounter, useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useRef } from "react";

export function useEmail() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [attempt, saveAttempt] = useLocalStorage("attempt", 0);
  const [count, { decrement, reset }] = useCounter(RATE_LIMIT_IN_SECONDS, {
    min: RATE_LIMIT_ENDLINE,
    max: RATE_LIMIT_IN_SECONDS,
  });

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      if (attempt <= 0) return;

      if (count > RATE_LIMIT_ENDLINE) {
        decrement();
      }
    }, 1000);

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, [attempt, count, decrement]);

  return { attempt, count, saveAttempt, reset };
}
