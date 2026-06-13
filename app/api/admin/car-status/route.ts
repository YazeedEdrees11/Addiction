import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/auth";

type CarStatus = "pending" | "approved" | "rejected";

export async function PATCH(request: Request) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.ok) {
    return NextResponse.json({ error: adminCheck.message }, { status: adminCheck.status });
  }

  try {
    const payload = (await request.json()) as { carId?: string; status?: CarStatus };
    if (!payload.carId || !payload.status) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }
    if (!["pending", "approved", "rejected"].includes(payload.status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    const supabase = createServiceRoleClient();
    const { error } = await supabase
      .from("cars")
      .update({ approval_status: payload.status })
      .eq("id", payload.carId);

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
