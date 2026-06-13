import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { BrandLogo } from "./brand-logo";

export function SiteFooter() {
  return (
    <footer className="theme-adapt theme-footer border-t border-white/10 bg-black/70">
      <div className="container section-padding">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <BrandLogo />
            <p className="mt-3 max-w-sm text-white/70">
              Premium automotive culture platform in Amman, Jordan. Cinematic gatherings for passionate drivers.
            </p>
          </div>
          <div>
            <p className="font-heading text-lg font-semibold text-white">Quick Links</p>
            <div className="mt-3 flex flex-col gap-2 text-white/70">
              <Link href="/register">Car Registration</Link>
              <Link href="/tickets">Tickets</Link>
              <Link href="/volunteer">Volunteer</Link>
              <Link href="/gallery">Gallery</Link>
            </div>
          </div>
          <div>
            <p className="font-heading text-lg font-semibold text-white">Connect</p>
            <div className="mt-3 space-y-3 text-white/70">
              <p className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-accent" /> @addictionjo
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" /> hello@addictionjo.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" /> +962 79 000 0000
              </p>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
