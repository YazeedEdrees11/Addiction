"use client";

import { motion } from "framer-motion";
import { Disc3, Gauge, Trophy, UsersRound } from "lucide-react";

const highlights = [
  {
    title: "Curated Premium Lineup",
    text: "Hand-picked builds across supercars, JDM, drift, and heritage icons.",
    icon: Trophy
  },
  {
    title: "Neon Night Atmosphere",
    text: "Cinematic lighting, smoke textures, and Tokyo-inspired paddock energy.",
    icon: Disc3
  },
  {
    title: "Performance Sessions",
    text: "Rolling intros, rev battles, and staged drift moments throughout the night.",
    icon: Gauge
  },
  {
    title: "Community Experience",
    text: "Meet builders, crews, photographers, and car culture leaders in one venue.",
    icon: UsersRound
  }
];

export function EventHighlightsShowcase() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent p-7"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
        <p className="text-xs uppercase tracking-[0.25em] text-accent/90">Main Experience</p>
        <h3 className="mt-3 font-heading text-3xl font-bold uppercase leading-tight text-white md:text-4xl">
          One Night.
          <br />
          Pure Automotive Cinema.
        </h3>
        <p className="mt-4 max-w-xl text-white/75">
          ADDICTION JO blends premium machines, cinematic direction, and community culture into a single high-impact event.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {highlights.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="glass-panel p-5"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg border border-accent/40 bg-accent/15 p-2.5">
                <item.icon className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="font-heading text-lg font-bold uppercase tracking-wide">{item.title}</p>
                <p className="mt-1 text-sm text-white/70">{item.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
