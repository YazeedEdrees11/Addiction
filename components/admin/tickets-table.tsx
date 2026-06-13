import type { Database } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

type TicketOrderRow = Database["public"]["Tables"]["ticket_orders"]["Row"];

interface TicketsTableProps {
  tickets: TicketOrderRow[];
}

export function TicketsTable({ tickets }: TicketsTableProps) {
  return (
    <section id="tickets" className="space-y-4">
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
