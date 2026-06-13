"use client";

import { useEffect, useMemo, useState } from "react";

export function useCountdown(targetDate: string) {
  const parseDate = useMemo(() => new Date(targetDate).getTime(), [targetDate]);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (now === null) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: false, isReady: false };
  }

  const distance = Math.max(parseDate - now, 0);
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return { days, hours, minutes, seconds, completed: distance === 0, isReady: true };
}
