import type { Metadata } from "next";
import { AdminAccessRestricted } from "@/components/admin/admin-access-restricted";
import { GalleryManager } from "@/components/admin/gallery-manager";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminGuard } from "@/lib/admin/guard";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

export const metadata: Metadata = {
  title: "Admin Gallery",
  description: "Manage gallery assets."
};

export default async function AdminGalleryPage() {
  const { user, isAdmin } = await getAdminGuard();
  if (!isAdmin) return <AdminAccessRestricted />;

  const adminClient = createServiceRoleClient();
  const { data } = await adminClient.from("gallery_assets").select("*").order("created_at", { ascending: false });
  type GalleryRow = Database["public"]["Tables"]["gallery_assets"]["Row"];
  const gallery = (data ?? []) as GalleryRow[];

  return (
    <AdminShell title="Gallery" email={user.email ?? "Admin"}>
      <GalleryManager initialItems={gallery} />
    </AdminShell>
  );
}

