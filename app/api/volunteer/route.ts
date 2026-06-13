import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fullName = String(formData.get("full_name") ?? "").trim();
    const age = Number(formData.get("age"));
    const phoneNumber = String(formData.get("phone_number") ?? "").trim();

    if (!fullName || !phoneNumber || !Number.isFinite(age)) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (age < 16 || age > 80) {
      return NextResponse.json({ error: "Age must be between 16 and 80." }, { status: 400 });
    }

    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("volunteers").insert({
      full_name: fullName,
      age,
      phone_number: phoneNumber
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Volunteer application submitted successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      { status: 500 }
    );
  }
}
