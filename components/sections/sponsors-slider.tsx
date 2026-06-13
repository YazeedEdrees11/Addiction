"use client";

import { motion } from "framer-motion";

const sponsors = [
  "TurboHaus",
  "PetroMax",
  "Trackline",
  "Velocity Parts",
  "NightShift Media",
  "Paddock 98"
];

export function SponsorsSlider() {
  const loopItems = [...sponsors, ...sponsors];

  return (
    <div className="theme-adapt relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 py-4">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
        style={{ background: "linear-gradient(to right, var(--bg-mid), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
        style={{ background: "linear-gradient(to left, var(--bg-mid), transparent)" }}
      />

      <motion.div
        className="flex w-max gap-4 px-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {loopItems.map((sponsor, index) => (
          <div
            key={`${sponsor}-${index}`}
            className="glass-panel min-w-[180px] px-8 py-5 text-center font-heading text-xl font-bold uppercase tracking-wider text-[color:var(--text-primary)]"
          >
            {sponsor}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
