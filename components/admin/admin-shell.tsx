"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { AdminSidebar, AdminSidebarMobile } from "@/components/admin/admin-sidebar";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { Button } from "@/components/ui/button";

interface AdminShellProps {
  title: string;
  email: string;
  children: React.ReactNode;
}

export function AdminShell({ title, email, children }: AdminShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <AdminSidebar />
      <AdminSidebarMobile open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="px-4 pb-10 pt-6 sm:px-6 md:px-10 lg:ml-[300px] lg:px-12 lg:pt-10">
        <div className="space-y-8">
          <div className="flex items-center justify-between lg:hidden">
            <Button variant="outline" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="mr-2 h-4 w-4" />
              Menu
            </Button>
            <SignOutButton />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-heading text-3xl font-bold uppercase md:text-4xl">{title}</h1>
              <p className="text-white/60">Welcome back, {email}</p>
            </div>
            <div className="hidden lg:block">
              <SignOutButton />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
