import { createServerSupabaseClient } from "./server";

export async function requireAdmin() {
  const supabase = await createServerSupabaseClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    return { ok: false as const, status: 401, message: "Unauthorized" };
  }

  const { data: adminData } = await supabase
    .from("admins")
    .select("*")
    .eq("id", userData.user.id)
    .maybeSingle();

  if (!adminData) {
    return { ok: false as const, status: 403, message: "Forbidden" };
  }

  return { ok: true as const, user: userData.user, supabase };
}
