import type { Metadata } from "next";
import { AdminAccessRestricted } from "@/components/admin/admin-access-restricted";
import { AdminShell } from "@/components/admin/admin-shell";
import { VolunteersTable } from "@/components/admin/volunteers-table";
import { getAdminGuard } from "@/lib/admin/guard";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

export const metadata: Metadata = {
  title: "Admin Volunteers",
  description: "Manage volunteer applications."
};

export default async function AdminVolunteersPage() {
  const { user, isAdmin } = await getAdminGuard();
  if (!isAdmin) return <AdminAccessRestricted />;

  const adminClient = createServiceRoleClient();
  const { data } = await adminClient.from("volunteers").select("*").order("created_at", { ascending: false });
  type VolunteerRow = Database["public"]["Tables"]["volunteers"]["Row"];
  const volunteers = (data ?? []) as VolunteerRow[];

  return (
    <AdminShell title="Volunteers" email={user.email ?? "Admin"}>
      <VolunteersTable volunteers={volunteers} />
    </AdminShell>
  );
}

