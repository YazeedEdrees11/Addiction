"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import type { Database } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

type TicketOrderRow = Database["public"]["Tables"]["ticket_orders"]["Row"];

interface TicketsTableProps {
  tickets: TicketOrderRow[];
}

export function TicketsTable({ tickets: initialTickets }: TicketsTableProps) {
  const [tickets, setTickets] = useState(initialTickets);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  async function deleteTicket(id: string) {
    setConfirmId(null);
    setDeletingId(id);
    const response = await fetch(`/api/admin/tickets/${id}`, { method: "DELETE" });
    setDeletingId(null);
    if (response.ok) {
      setTickets((prev) => prev.filter((t) => t.id !== id));
    }
  }

  return (
    <section id="tickets" className="space-y-4">

      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
            <h4 className="font-heading text-lg font-bold">Delete Order</h4>
            <p className="mt-2 text-sm text-white/70">Are you sure you want to delete this order? This action cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setConfirmId(null)} disabled={deletingId !== null}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => deleteTicket(confirmId)} disabled={deletingId !== null}>
                {deletingId !== null ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-heading text-2xl font-bold uppercase">Ticket Orders</h3>
        <Button asChild variant="outline">
          <a href="/api/admin/export?type=ticket_orders">Export CSV</a>
        </Button>
      </div>
      <div className="glass-panel overflow-x-auto p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.full_name}</TableCell>
                <TableCell>{ticket.ticket_type}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{ticket.email}</p>
                    <p className="text-white/60">{ticket.phone_number ?? ticket.phone ?? "-"}</p>
                  </div>
                </TableCell>
                <TableCell>{ticket.quantity}</TableCell>
                <TableCell>{ticket.amount_jod}</TableCell>
                <TableCell>{ticket.payment_status}</TableCell>
                <TableCell>{formatDate(ticket.created_at)}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => setConfirmId(ticket.id)}
                    disabled={deletingId === ticket.id}
                  >
                    {deletingId === ticket.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
