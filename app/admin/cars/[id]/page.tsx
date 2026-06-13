import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, CarFront, Phone } from "lucide-react";
import { AdminAccessRestricted } from "@/components/admin/admin-access-restricted";
import { CarEditor } from "@/components/admin/car-editor";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAdminGuard } from "@/lib/admin/guard";
import { formatDate } from "@/lib/utils";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

export const metadata: Metadata = {
  title: "Car Details",
  description: "Detailed car registration info."
};

interface AdminCarDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminCarDetailsPage({ params }: AdminCarDetailsPageProps) {
  const { user, isAdmin } = await getAdminGuard();
  if (!isAdmin) return <AdminAccessRestricted />;

  const { id } = await params;
  const adminClient = createServiceRoleClient();
  const { data } = await adminClient.from("cars").select("*").eq("id", id).maybeSingle();
  type CarRow = Database["public"]["Tables"]["cars"]["Row"];
  const car = data as CarRow | null;

  if (!car) notFound();

  return (
    <AdminShell title="Car Details" email={user.email ?? "Admin"}>
      <div className="space-y-4">
        <Button asChild variant="outline">
          <Link href="/admin/cars">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cars
          </Link>
        </Button>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
          <div className="glass-panel overflow-hidden p-3">
            <div className="h-[360px] overflow-hidden rounded-xl border border-white/10 bg-black/30">
              {car.car_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={car.car_image} alt={car.car_brand ?? "Car image"} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-white/50">
                  <CarFront className="h-10 w-10" />
                </div>
              )}
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.15em] text-white/50">Owner</p>
                <h2 className="font-heading text-3xl font-bold">{car.full_name}</h2>
              </div>
              <Badge variant={car.approval_status === "approved" ? "success" : car.approval_status === "rejected" ? "danger" : "secondary"}>
                {car.approval_status}
              </Badge>
            </div>

            <dl className="mt-6 space-y-4 text-sm">
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <dt className="text-white/60">Car Brand / Type</dt>
                <dd className="mt-1 text-base font-semibold">{car.car_brand}</dd>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <dt className="text-white/60">Car Category</dt>
                <dd className="mt-1 text-base font-semibold">{car.car_category}</dd>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <dt className="text-white/60">Manufacturing Year</dt>
                <dd className="mt-1 text-base font-semibold">{car.manufacturing_year}</dd>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <dt className="text-white/60">License Plate Number</dt>
                <dd className="mt-1 text-base font-semibold">{car.plate_number}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/80">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1">
                <Phone className="h-4 w-4" />
                {car.phone_number}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1">
                <CalendarDays className="h-4 w-4" />
                {formatDate(car.created_at)}
              </span>
            </div>

            <CarEditor
              carId={car.id}
              initialValues={{
                full_name: car.full_name ?? "",
                car_brand: car.car_brand ?? "",
                car_category: car.car_category ?? "",
                manufacturing_year: Number(car.manufacturing_year ?? 0),
                plate_number: car.plate_number ?? "",
                phone_number: car.phone_number ?? "",
                approval_status: (car.approval_status as "pending" | "approved" | "rejected" | undefined) ?? "pending"
              }}
            />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
