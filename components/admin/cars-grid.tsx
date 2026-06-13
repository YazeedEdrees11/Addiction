"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { CarFront, CheckCircle2, Clock3, Download, Loader2, Search, XCircle } from "lucide-react";
import type { Database } from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type CarRow = Database["public"]["Tables"]["cars"]["Row"];
type CarStatus = "pending" | "approved" | "rejected";

interface CarsGridProps {
  cars: CarRow[];
}

export function CarsGrid({ cars: initialCars }: CarsGridProps) {
  const [cars, setCars] = useState(initialCars);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CarStatus | "all">("all");
  const [isPending, startTransition] = useTransition();

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const haystack = `${car.full_name ?? ""} ${car.car_brand ?? ""} ${car.phone_number ?? ""}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      const currentStatus = (car.approval_status ?? "pending") as CarStatus;
      const matchesStatus = statusFilter === "all" || currentStatus === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [cars, query, statusFilter]);

  async function updateStatus(carId: string, status: CarStatus) {
    startTransition(async () => {
      const response = await fetch("/api/admin/car-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carId, status })
      });
      if (!response.ok) return;
      setCars((previous) => previous.map((car) => (car.id === carId ? { ...car, approval_status: status } : car)));
    });
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 className="font-heading text-2xl font-bold uppercase">Car Registrations</h3>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              className="w-full pl-9 sm:w-72"
              placeholder="Search by name, phone, brand"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as CarStatus | "all")}>
            <SelectTrigger className="h-11 w-full sm:w-48">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild variant="outline">
            <a href="/api/admin/export?type=cars">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredCars.map((car) => (
          <article key={car.id} className="glass-panel overflow-hidden p-3">
            <div className="relative h-44 overflow-hidden rounded-lg border border-white/10 bg-black/30">
              {car.car_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={car.car_image} alt={car.car_brand ?? "Car"} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-white/50">
                  <CarFront className="h-8 w-8" />
                </div>
              )}
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-heading text-lg font-semibold">{car.full_name}</h4>
                <Badge variant={car.approval_status === "approved" ? "success" : car.approval_status === "rejected" ? "danger" : "secondary"}>
                  {car.approval_status ?? "pending"}
                </Badge>
              </div>
              <p className="text-sm text-white/75">{car.car_brand} • {car.car_category}</p>
              <p className="text-sm text-white/60">{car.phone_number}</p>
              <p className="text-xs text-white/50">Plate: {car.plate_number}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => updateStatus(car.id, "approved")} disabled={isPending}>
                <CheckCircle2 className="mr-1 h-4 w-4" />
                Approve
              </Button>
              <Button size="sm" variant="danger" onClick={() => updateStatus(car.id, "rejected")} disabled={isPending}>
                <XCircle className="mr-1 h-4 w-4" />
                Reject
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/admin/cars/${car.id}`}>View Details</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>

      {filteredCars.length === 0 && (
        <div className="glass-panel p-6 text-center text-white/70">No cars found for this filter.</div>
      )}

      {isPending && (
        <p className="flex items-center gap-2 text-sm text-white/70">
          <Clock3 className="h-4 w-4 animate-pulse" />
          Updating status...
        </p>
      )}
    </section>
  );
}
