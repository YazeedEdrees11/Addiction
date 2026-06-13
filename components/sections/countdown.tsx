"use client";

import { useCountdown } from "@/hooks/use-countdown";
import { BRAND } from "@/lib/constants";

function TimeBox({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="glass-panel min-w-20 px-4 py-3 text-center">
      <p className="font-heading text-2xl font-bold text-accent md:text-3xl">
        {value === null ? "--" : String(value).padStart(2, "0")}
      </p>
      <p className="text-xs uppercase tracking-wide text-white/60">{label}</p>
    </div>
  );
}

export function Countdown() {
  const { days, hours, minutes, seconds, isReady } = useCountdown(BRAND.eventDate);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <TimeBox label="Days" value={isReady ? days : null} />
      <TimeBox label="Hours" value={isReady ? hours : null} />
      <TimeBox label="Minutes" value={isReady ? minutes : null} />
      <TimeBox label="Seconds" value={isReady ? seconds : null} />
    </div>
  );
}
