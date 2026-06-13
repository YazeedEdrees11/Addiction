import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.ok) {
    return NextResponse.json({ error: adminCheck.message }, { status: adminCheck.status });
  }

  try {
    const { id } = await context.params;
    const payload = (await request.json()) as {
      full_name?: string;
      car_brand?: string;
      car_category?: string;
      manufacturing_year?: number;
      plate_number?: string;
      phone_number?: string;
      approval_status?: "pending" | "approved" | "rejected";
    };

    const updates: Record<string, unknown> = {};
    if (payload.full_name !== undefined) updates.full_name = String(payload.full_name).trim();
    if (payload.car_brand !== undefined) updates.car_brand = String(payload.car_brand).trim();
    if (payload.car_category !== undefined) updates.car_category = String(payload.car_category).trim();
    if (payload.manufacturing_year !== undefined) updates.manufacturing_year = Number(payload.manufacturing_year);
    if (payload.plate_number !== undefined) updates.plate_number = String(payload.plate_number).trim();
    if (payload.phone_number !== undefined) updates.phone_number = String(payload.phone_number).trim();
    if (payload.approval_status !== undefined) updates.approval_status = payload.approval_status;

    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("cars").update(updates).eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.ok) {
    return NextResponse.json({ error: adminCheck.message }, { status: adminCheck.status });
  }

  try {
    const { id } = await context.params;
    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("cars").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      { status: 500 }
    );
  }
}

