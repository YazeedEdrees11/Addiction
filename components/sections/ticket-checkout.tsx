"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, QrCode } from "lucide-react";
import { TICKET_TYPES } from "@/lib/constants";
import type { TicketType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TicketResponse {
  id: string;
  qrCodeDataUrl: string;
  error?: string;
}

export function TicketCheckout() {
  const [ticketType, setTicketType] = useState<TicketType>("Standard");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TicketResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const options = useMemo(() => Object.entries(TICKET_TYPES) as [TicketType, (typeof TICKET_TYPES)[TicketType]][], []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("ticket_type", ticketType);

    const response = await fetch("/api/book-ticket", {
      method: "POST",
      body: formData
    });

    const data = (await response.json()) as TicketResponse;
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? "Unable to complete ticket checkout.");
      return;
    }

    setResult(data);
    form.reset();
    setTicketType("Standard");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        {options.map(([type, cfg]) => (
          <Card
            key={type}
            className={`transition ${ticketType === type ? "yellow-glow border-accent/60" : "border-white/10"}`}
          >
            <CardHeader>
              <CardTitle>{type}</CardTitle>
              <CardDescription>{cfg.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-heading text-3xl font-bold text-accent">{cfg.price} JD</p>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                {cfg.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <Button variant={ticketType === type ? "default" : "outline"} className="mt-5 w-full" onClick={() => setTicketType(type)}>
                Select {type}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>Secure your ticket with instant QR generation.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Ticket Type</Label>
              <Select value={ticketType} onValueChange={(v) => setTicketType(v as TicketType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ticket type" />
                </SelectTrigger>
                <SelectContent>
                  {options.map(([type]) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name="ticket_type" value={ticketType} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input id="full_name" name="full_name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input id="phone_number" name="phone_number" type="tel" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" name="quantity" type="number" min={1} max={10} required />
            </div>

            <Button className="w-full" type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Booking
            </Button>
          </form>

          {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4"
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                <CheckCircle2 className="h-4 w-4" /> Booking Successful
              </p>
              <p className="mt-2 text-sm text-white">Ticket ID: {result.id}</p>
              <div className="mt-4 inline-flex items-center gap-3 rounded-lg bg-black/40 p-3">
                <QrCode className="h-4 w-4 text-accent" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={result.qrCodeDataUrl} alt={`QR for ${result.id}`} className="h-24 w-24 rounded-lg bg-white p-1" />
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
