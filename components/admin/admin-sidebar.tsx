"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CarFront, GalleryHorizontal, Ticket, Users, X } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";

const items = [
  { label: "Overview", icon: BarChart3, href: "/admin/overview" },
  { label: "Cars", icon: CarFront, href: "/admin/cars" },
  { label: "Tickets", icon: Ticket, href: "/admin/tickets" },
  { label: "Volunteers", icon: Users, href: "/admin/volunteers" },
  { label: "Gallery", icon: GalleryHorizontal, href: "/admin/gallery" }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-[280px] border-r border-white/10 bg-black/40 p-5 backdrop-blur-xl lg:fixed lg:inset-y-0 lg:left-0 lg:block">
      <div className="glass-panel h-full p-4">
        <BrandLogo />
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">Admin Panel</p>
        <nav className="mt-6 space-y-2">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-white/10 hover:text-accent ${
              pathname === item.href ? "bg-white/10 text-accent" : "text-white/80"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
        </nav>
      </div>
    </aside>
  );
}

interface AdminSidebarMobileProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebarMobile({ open, onClose }: AdminSidebarMobileProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <button className="absolute inset-0 bg-black/70" onClick={onClose} aria-label="Close menu" />
      <aside className="absolute inset-y-0 left-0 w-[280px] border-r border-white/10 bg-black/95 p-4 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <BrandLogo />
          <button className="rounded-lg border border-white/20 p-2 text-white/80" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50">Admin Panel</p>
        <nav className="mt-6 space-y-2">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-white/10 hover:text-accent ${
                pathname === item.href ? "bg-white/10 text-accent" : "text-white/80"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
