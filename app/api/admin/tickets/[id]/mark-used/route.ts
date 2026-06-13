import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(_: Request, context: RouteContext) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.ok) {
    return NextResponse.json({ error: adminCheck.message }, { status: adminCheck.status });
  }

  try {
    const { id } = await context.params;
    const supabase = createServiceRoleClient();

    const { data: order, error: fetchError } = await supabase
      .from("ticket_orders")
      .select("id, qr_used")
      .eq("id", id)
      .single();

    if (fetchError || !order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    if (order.qr_used) {
      return NextResponse.json({ error: "QR code has already been used." }, { status: 400 });
    }

    const { error: updateError } = await supabase
      .from("ticket_orders")
      .update({ qr_used: true, order_status: "checked_in" })
      .eq("id", order.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      { status: 500 }
    );
  }
}
