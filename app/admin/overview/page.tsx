import type { Metadata } from "next";
import { AdminAccessRestricted } from "@/components/admin/admin-access-restricted";
import { AdminShell } from "@/components/admin/admin-shell";
import { MetricCards } from "@/components/admin/metric-cards";
import { getAdminGuard } from "@/lib/admin/guard";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

export const metadata: Metadata = {
  title: "Admin Overview",
  description: "Overview of registrations, tickets, volunteers, and gallery assets."
};

export default async function AdminOverviewPage() {
  const { user, isAdmin } = await getAdminGuard();
  if (!isAdmin) return <AdminAccessRestricted />;

  const adminClient = createServiceRoleClient();
  const [carsResult, ticketsResult, volunteersResult, galleryResult] = await Promise.all([
    adminClient.from("cars").select("id"),
    adminClient.from("ticket_orders").select("quantity"),
    adminClient.from("volunteers").select("id"),
    adminClient.from("gallery_assets").select("id")
  ]);

  type TicketRow = Pick<Database["public"]["Tables"]["ticket_orders"]["Row"], "quantity">;
  const carsCount = carsResult.data?.length ?? 0;
  const tickets = (ticketsResult.data ?? []) as TicketRow[];
  const volunteersCount = volunteersResult.data?.length ?? 0;
  const galleryCount = galleryResult.data?.length ?? 0;

  return (
    <AdminShell title="Overview" email={user.email ?? "Admin"}>
      <MetricCards
        cars={carsCount}
        tickets={tickets.reduce((sum, ticket) => sum + (ticket.quantity ?? 0), 0)}
        volunteers={volunteersCount}
        gallery={galleryCount}
      />
    </AdminShell>
  );
}

