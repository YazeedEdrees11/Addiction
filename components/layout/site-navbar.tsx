"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "./brand-logo";
import { ThemeToggle } from "./theme-toggle";

export function SiteNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="theme-adapt theme-nav mx-auto mt-4 w-[95%] max-w-6xl rounded-2xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <BrandLogo priority />

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium text-white/80 transition hover:text-accent",
                  pathname === item.href && "text-accent"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Button variant="outline" asChild>
              <Link href="/tickets">Get Tickets</Link>
            </Button>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-white/20 p-2 text-white md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="theme-adapt theme-nav mx-auto mt-2 w-[95%] max-w-6xl rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-3">
            <div className="mb-1">
              <ThemeToggle />
            </div>
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn("text-sm text-white/80", pathname === item.href && "text-accent")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
