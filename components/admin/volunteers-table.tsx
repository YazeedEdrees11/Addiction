import type { Database } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

type VolunteerRow = Database["public"]["Tables"]["volunteers"]["Row"];

interface VolunteersTableProps {
  volunteers: VolunteerRow[];
}

export function VolunteersTable({ volunteers }: VolunteersTableProps) {
  return (
    <section id="volunteers" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-heading text-2xl font-bold uppercase">Volunteers</h3>
        <Button asChild variant="outline">
          <a href="/api/admin/export?type=volunteers">Export CSV</a>
        </Button>
      </div>
      <div className="glass-panel overflow-x-auto p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {volunteers.map((volunteer) => (
              <TableRow key={volunteer.id}>
                <TableCell>{volunteer.full_name}</TableCell>
                <TableCell>{volunteer.age ?? "-"}</TableCell>
                <TableCell>{volunteer.phone_number ?? volunteer.phone ?? "-"}</TableCell>
                <TableCell>{formatDate(volunteer.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
