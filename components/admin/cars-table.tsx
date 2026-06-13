"use client";

import { useMemo, useState, useTransition } from "react";
import { Download, Loader2, Search } from "lucide-react";
import type { Database } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type CarRow = Database["public"]["Tables"]["cars"]["Row"];
type CarStatus = "pending" | "approved" | "rejected";

interface CarsTableProps {
  cars: CarRow[];
}

export function CarsTable({ cars: initialCars }: CarsTableProps) {
  const [cars, setCars] = useState(initialCars);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CarStatus | "all">("all");
  const [isPending, startTransition] = useTransition();

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const makeModel = `${car.car_brand ?? ""}`.toLowerCase();
      const matchesQuery =
        (car.full_name ?? "").toLowerCase().includes(query.toLowerCase()) ||
        (car.phone_number ?? "").toLowerCase().includes(query.toLowerCase()) ||
        makeModel.includes(query.toLowerCase());
      const matchesStatus = statusFilter === "all" || car.approval_status === statusFilter;
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
    <section id="cars" className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 className="font-heading text-2xl font-bold uppercase">Car Registrations</h3>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              className="w-full pl-9 sm:w-72"
              placeholder="Search by name, phone, car"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as CarStatus | "all")}
            className="h-11 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <Button asChild variant="outline">
            <a href="/api/admin/export?type=cars">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </a>
          </Button>
        </div>
      </div>

      <div className="glass-panel p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Car</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Plate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.full_name}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{car.phone_number ?? "-"}</p>
                  </div>
                </TableCell>
                <TableCell>{car.car_brand ?? "-"}</TableCell>
                <TableCell>{car.car_category ?? "-"}</TableCell>
                <TableCell>{car.plate_number ?? "-"}</TableCell>
                <TableCell>
                  <Badge variant={car.approval_status === "approved" ? "success" : car.approval_status === "rejected" ? "danger" : "secondary"}>
                    {car.approval_status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {car.car_image ? (
                    <a href={car.car_image} target="_blank" rel="noreferrer" className="text-accent underline">
                      View
                    </a>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => updateStatus(car.id, "approved")} disabled={isPending}>
                      Approve
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => updateStatus(car.id, "rejected")} disabled={isPending}>
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {isPending && (
        <p className="flex items-center gap-2 text-sm text-white/70">
          <Loader2 className="h-4 w-4 animate-spin" /> Updating status...
        </p>
      )}
    </section>
  );
}
