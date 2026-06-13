import type { Metadata } from "next";
import { AdminAccessRestricted } from "@/components/admin/admin-access-restricted";
import { CarsGrid } from "@/components/admin/cars-grid";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminGuard } from "@/lib/admin/guard";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

export const metadata: Metadata = {
  title: "Admin Cars",
  description: "Manage car registrations."
};

export default async function AdminCarsPage() {
  const { user, isAdmin } = await getAdminGuard();
  if (!isAdmin) return <AdminAccessRestricted />;

  const adminClient = createServiceRoleClient();
  const { data } = await adminClient.from("cars").select("*").order("created_at", { ascending: false });
  type CarRow = Database["public"]["Tables"]["cars"]["Row"];
  const cars = (data ?? []) as CarRow[];

  return (
    <AdminShell title="Cars" email={user.email ?? "Admin"}>
      <CarsGrid cars={cars} />
    </AdminShell>
  );
}
