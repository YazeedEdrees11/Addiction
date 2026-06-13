import type { Metadata } from "next";
import { AdminAccessRestricted } from "@/components/admin/admin-access-restricted";
import { AdminShell } from "@/components/admin/admin-shell";
import { TicketsTable } from "@/components/admin/tickets-table";
import { getAdminGuard } from "@/lib/admin/guard";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

export const metadata: Metadata = {
  title: "Admin Tickets",
  description: "Manage ticket orders."
};

export default async function AdminTicketsPage() {
  const { user, isAdmin } = await getAdminGuard();
  if (!isAdmin) return <AdminAccessRestricted />;

  const adminClient = createServiceRoleClient();
  const { data } = await adminClient.from("ticket_orders").select("*").order("created_at", { ascending: false });
  type TicketRow = Database["public"]["Tables"]["ticket_orders"]["Row"];
  const tickets = (data ?? []) as TicketRow[];

  return (
    <AdminShell title="Tickets" email={user.email ?? "Admin"}>
      <TicketsTable tickets={tickets} />
    </AdminShell>
  );
}

