import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { ticketId } = (await request.json()) as { ticketId: string };

    if (!ticketId) {
      return NextResponse.json({ error: "Ticket ID is required." }, { status: 400 });
    }

    const supabase = createServiceRoleClient();
    const { data: order, error } = await supabase
      .from("ticket_orders")
      .select("id, ticket_type, full_name, quantity, qr_used, payment_status")
      .eq("id", ticketId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Ticket not found." }, { status: 404 });
    }

    if (order.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not confirmed." }, { status: 400 });
    }

    if (order.qr_used) {
      return NextResponse.json({ error: "QR code has already been used." }, { status: 400 });
    }

    return NextResponse.json({
      valid: true,
      ticket: {
        id: order.id,
        ticket_type: order.ticket_type,
        full_name: order.full_name,
        quantity: order.quantity
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      { status: 500 }
    );
  }
}
