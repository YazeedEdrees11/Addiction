"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Trash2, XCircle } from "lucide-react";
import type { Database } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

type TicketOrderRow = Database["public"]["Tables"]["ticket_orders"]["Row"];

interface TicketsTableProps {
  tickets: TicketOrderRow[];
}

export function TicketsTable({ tickets: initialTickets }: TicketsTableProps) {
  const [tickets, setTickets] = useState(initialTickets);
  const [actionId, setActionId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  async function deleteOrder(id: string) {
    setConfirmDeleteId(null);
    setActionId(id);
    const response = await fetch(`/api/admin/tickets/${id}`, { method: "DELETE" });
    setActionId(null);
    if (response.ok) {
      setTickets((prev) => prev.filter((t) => t.id !== id));
    }
  }

  async function confirmPayment(id: string) {
    setActionId(id);
    const response = await fetch(`/api/admin/tickets/${id}/confirm-payment`, { method: "POST" });
    setActionId(null);
    if (response.ok) {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, payment_status: "paid", order_status: "confirmed", qr_used: false }
            : t
        )
      );
    }
  }

  async function markUsed(id: string) {
    setActionId(id);
    const response = await fetch(`/api/admin/tickets/${id}/mark-used`, { method: "POST" });
    setActionId(null);
    if (response.ok) {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, qr_used: true, order_status: "checked_in" } : t
        )
      );
    }
  }

  const statusBadge = (ticket: TicketOrderRow) => {
    if (ticket.payment_status === "paid" && ticket.qr_used) {
      return <Badge variant="secondary">Checked In</Badge>;
    }
    if (ticket.payment_status === "paid") {
      return <Badge variant="success">Paid</Badge>;
    }
    if (ticket.payment_status === "unpaid") {
      return <Badge variant="danger">Unpaid</Badge>;
    }
    return <Badge variant="secondary">{ticket.payment_status}</Badge>;
  };

  return (
    <section id="tickets" className="space-y-4">

      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
            <h4 className="font-heading text-lg font-bold">Delete Order</h4>
            <p className="mt-2 text-sm text-white/70">Are you sure you want to delete this order? This action cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setConfirmDeleteId(null)} disabled={actionId !== null}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => deleteOrder(confirmDeleteId)} disabled={actionId !== null}>
                {actionId !== null ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
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
              <TableHead>Status</TableHead>
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
                    <p className="text-white/60">{ticket.phone_number ?? "-"}</p>
                  </div>
                </TableCell>
                <TableCell>{ticket.quantity}</TableCell>
                <TableCell>{ticket.amount_jod}</TableCell>
                <TableCell>{statusBadge(ticket)}</TableCell>
                <TableCell>{formatDate(ticket.created_at)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {ticket.payment_status === "unpaid" && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => confirmPayment(ticket.id)}
                        disabled={actionId === ticket.id}
                      >
                        {actionId === ticket.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                    {ticket.payment_status === "paid" && !ticket.qr_used && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markUsed(ticket.id)}
                        disabled={actionId === ticket.id}
                      >
                        {actionId === ticket.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => setConfirmDeleteId(ticket.id)}
                      disabled={actionId === ticket.id}
                    >
                      {actionId === ticket.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
