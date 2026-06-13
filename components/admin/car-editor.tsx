"use client";

import { useEffect } from "react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Loader2, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CarEditorProps {
  carId: string;
  initialValues: {
    full_name: string;
    car_brand: string;
    car_category: string;
    manufacturing_year: number;
    plate_number: string;
    phone_number: string;
    approval_status?: "pending" | "approved" | "rejected";
  };
}

export function CarEditor({ carId, initialValues }: CarEditorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [fullName, setFullName] = useState(initialValues.full_name);
  const [carBrand, setCarBrand] = useState(initialValues.car_brand);
  const [carCategory, setCarCategory] = useState(initialValues.car_category);
  const [manufacturingYear, setManufacturingYear] = useState(String(initialValues.manufacturing_year));
  const [plateNumber, setPlateNumber] = useState(initialValues.plate_number);
  const [phoneNumber, setPhoneNumber] = useState(initialValues.phone_number);
  const [approvalStatus, setApprovalStatus] = useState<"pending" | "approved" | "rejected">(initialValues.approval_status ?? "pending");

  function onSave() {
    startTransition(async () => {
      setMessage(null);
      const response = await fetch(`/api/admin/cars/${carId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          car_brand: carBrand,
          car_category: carCategory,
          manufacturing_year: Number(manufacturingYear),
          plate_number: plateNumber,
          phone_number: phoneNumber,
          approval_status: approvalStatus
        })
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setMessage(data.error ?? "Failed to update car.");
        return;
      }

      setMessage("Car updated successfully.");
      router.refresh();
    });
  }

  function onDeleteConfirmed() {
    startTransition(async () => {
      setMessage(null);
      const response = await fetch(`/api/admin/cars/${carId}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setMessage(data.error ?? "Failed to delete car.");
        return;
      }
      setDeleteModalOpen(false);
      router.push("/admin/cars");
      router.refresh();
    });
  }

  return (
    <div className="mt-6 space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="font-heading text-lg font-semibold uppercase">Admin Actions</p>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Car Brand / Type</Label>
          <Input value={carBrand} onChange={(e) => setCarBrand(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Car Category</Label>
          <Input value={carCategory} onChange={(e) => setCarCategory(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Manufacturing Year</Label>
          <Input value={manufacturingYear} onChange={(e) => setManufacturingYear(e.target.value)} type="number" />
        </div>
        <div className="space-y-2">
          <Label>License Plate Number</Label>
          <Input value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Phone Number</Label>
          <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Status</Label>
          <Select value={approvalStatus} onValueChange={(value) => setApprovalStatus(value as "pending" | "approved" | "rejected")}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={onSave} disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
        <Button variant="danger" onClick={() => setDeleteModalOpen(true)} disabled={isPending}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Car
        </Button>
      </div>

      {message && <p className="text-sm text-white/75">{message}</p>}

      {mounted &&
        deleteModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm">
            <div className="fixed left-1/2 top-1/2 w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-neutral-900 p-5 shadow-2xl">
              <h3 className="font-heading text-xl font-bold uppercase text-accent">Delete Car</h3>
              <p className="mt-3 text-sm text-white/75">
                Are you sure you want to permanently delete this car registration?
              </p>
              <div className="mt-5 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDeleteModalOpen(false)} disabled={isPending}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={onDeleteConfirmed} disabled={isPending}>
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                  Confirm Delete
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
