import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin authentication for ADDICTION JO dashboard."
};

export default async function AdminLoginPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/admin");
  }

  return (
    <div className="container section-padding pt-36">
      <AdminLoginForm />
    </div>
  );
}
