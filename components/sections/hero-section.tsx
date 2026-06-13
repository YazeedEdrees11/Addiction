"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CarFront, MapPin, Ticket } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Countdown } from "./countdown";

const heroSlides = [
  "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80"
];

interface HeroSectionProps {
  subtitle: string;
  dateLabel: string;
  locationLabel: string;
}

export function HeroSection({ subtitle, dateLabel, locationLabel }: HeroSectionProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center pt-24">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlides[index]}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image src={heroSlides[index]} alt="ADDICTION JO hero" fill priority className="object-cover object-center" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      <div className="container relative z-10 text-center">
        <Badge className="animate-pulse-glow">Premium Automotive Culture</Badge>
        <h1 className="mt-6 font-heading text-5xl font-bold uppercase tracking-[0.25em] text-white md:text-8xl">
          {BRAND.name}
        </h1>
        <p className="mt-4 text-lg text-white/80 md:text-2xl">{subtitle}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm text-white/75 md:text-base">
          <p className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-accent" /> Date: {dateLabel}
          </p>
          <p className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" /> {locationLabel}
          </p>
        </div>

        <div className="mt-8">
          <Countdown />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/register">
              <CarFront className="mr-2 h-4 w-4" />
              Register Your Car
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/tickets">
              <Ticket className="mr-2 h-4 w-4" />
              Buy Tickets
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
