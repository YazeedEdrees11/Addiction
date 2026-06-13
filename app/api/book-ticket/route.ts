import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { createTicketId } from "@/lib/utils";
import { TICKET_TYPES } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const ticketType = String(formData.get("ticket_type") ?? "").trim();
    const fullName = String(formData.get("full_name") ?? "").trim();
    const phoneNumber = String(formData.get("phone_number") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const quantity = Number(formData.get("quantity"));

    if (!ticketType || !fullName || !phoneNumber || !email || !quantity) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!(ticketType in TICKET_TYPES)) {
      return NextResponse.json({ error: "Invalid ticket type." }, { status: 400 });
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return NextResponse.json({ error: "Quantity must be between 1 and 10." }, { status: 400 });
    }

    const ticketId = createTicketId();
    const qrPayload = JSON.stringify({
      ticketId,
      ticketType,
      fullName,
      quantity
    });
    const qrCodeDataUrl = await QRCode.toDataURL(qrPayload, {
      width: 360,
      margin: 1,
      color: { dark: "#0A0A0A", light: "#FFD400" }
    });

    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("ticket_orders").insert({
      id: ticketId,
      ticket_type: ticketType,
      full_name: fullName,
      phone_number: phoneNumber,
      email,
      quantity,
      qr_code: qrCodeDataUrl
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: ticketId, qrCodeDataUrl });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      { status: 500 }
    );
  }
}
