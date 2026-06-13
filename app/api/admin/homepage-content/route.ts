import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/auth";

export async function POST(request: Request) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.ok) {
    return NextResponse.json({ error: adminCheck.message }, { status: adminCheck.status });
  }

  try {
    const formData = await request.formData();
    const subtitle = String(formData.get("subtitle") ?? "").trim();
    const dateLabel = String(formData.get("date_label") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();

    if (!subtitle || !dateLabel || !location) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const rows = [
      { key: "subtitle", value: subtitle },
      { key: "date_label", value: dateLabel },
      { key: "location", value: location }
    ];

    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("homepage_content").upsert(rows);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Homepage content updated." });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      { status: 500 }
    );
  }
}
