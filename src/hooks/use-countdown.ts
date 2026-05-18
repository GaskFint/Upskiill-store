import { useEffect, useState } from "react";

export function useCountdown(durationMs = 48 * 60 * 60 * 1000) {
  const [remaining, setRemaining] = useState(durationMs);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const left = Math.max(0, durationMs - elapsed);
      setRemaining(left);
    }, 1000);
    return () => clearInterval(id);
  }, [durationMs]);

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  return { hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) };
}