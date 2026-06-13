import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/auth";

function toCsv(rows: Record<string, unknown>[]) {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (value: unknown) =>
    `"${String(value ?? "")
      .replaceAll('"', '""')
      .replaceAll("\n", " ")}"`;

  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((header) => escape(row[header])).join(","));
  }
  return lines.join("\n");
}

export async function GET(request: Request) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.ok) {
    return NextResponse.json({ error: adminCheck.message }, { status: adminCheck.status });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const allowed = ["cars", "ticket_orders", "volunteers", "gallery_assets"] as const;
  if (!type || !allowed.includes(type as (typeof allowed)[number])) {
    return NextResponse.json({ error: "Invalid export type." }, { status: 400 });
  }

  const table = type as (typeof allowed)[number];
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const csv = toCsv((data ?? []) as Record<string, unknown>[]);
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${type}-export.csv"`
    }
  });
}
