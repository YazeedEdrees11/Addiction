import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/auth";
import { sendWhatsAppImage, isWhatsAppConfigured } from "@/lib/whatsapp";

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
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    if (order.payment_status === "paid") {
      return NextResponse.json({ error: "Payment already confirmed." }, { status: 400 });
    }

    const qrPayload = JSON.stringify({
      ticketId: order.id,
      ticketType: order.ticket_type,
      fullName: order.full_name,
      quantity: order.quantity
    });

    const qrCodeDataUrl = await QRCode.toDataURL(qrPayload, {
      width: 360,
      margin: 1,
      color: { dark: "#0A0A0A", light: "#FFD400" }
    });

    const qrBuffer = Buffer.from(qrCodeDataUrl.replace(/^data:image\/png;base64,/, ""), "base64");
    const fileName = `tickets/${order.id}.png`;

    const { error: uploadError } = await supabase.storage
      .from("qr-codes")
      .upload(fileName, qrBuffer, {
        contentType: "image/png",
        upsert: true
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage.from("qr-codes").getPublicUrl(fileName);
    const qrPublicUrl = publicUrlData.publicUrl;

    const { error: updateError } = await supabase
      .from("ticket_orders")
      .update({
        qr_code: qrPublicUrl,
        qr_used: false,
        payment_status: "paid",
        order_status: "confirmed"
      })
      .eq("id", order.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    if (isWhatsAppConfigured()) {
      const phone = order.phone_number;
      const caption = `Your ADDICTION JO ticket (${order.ticket_type} x${order.quantity}) is confirmed! Show this QR code at the entrance.`;
      sendWhatsAppImage(phone, qrPublicUrl, caption).catch((err) =>
        console.error("WhatsApp send failed:", err)
      );
    }

    return NextResponse.json({ success: true, qrUrl: qrPublicUrl });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      { status: 500 }
    );
  }
}
