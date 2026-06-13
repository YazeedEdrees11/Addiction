import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getAdminGuard() {
  const supabase = await createServerSupabaseClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    redirect("/admin/login");
  }

  const { data: adminData } = await supabase
    .from("admins")
    .select("id, role")
    .eq("id", userData.user.id)
    .maybeSingle();

  return {
    user: userData.user,
    isAdmin: Boolean(adminData)
  };
}

