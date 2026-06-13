import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { CAR_CATEGORIES } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fullName = String(formData.get("full_name") ?? "").trim();
    const carBrand = String(formData.get("car_brand") ?? "").trim();
    const carCategory = String(formData.get("car_category") ?? "").trim();
    const manufacturingYear = Number(formData.get("manufacturing_year"));
    const plateNumber = String(formData.get("plate_number") ?? "").trim();
    const phoneNumber = String(formData.get("phone_number") ?? "").trim();
    const imageFile = formData.get("car_image");

    if (!fullName || !carBrand || !carCategory || !plateNumber || !phoneNumber || !imageFile) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!CAR_CATEGORIES.includes(carCategory as (typeof CAR_CATEGORIES)[number])) {
      return NextResponse.json({ error: "Invalid car category." }, { status: 400 });
    }
    if (!Number.isFinite(manufacturingYear) || manufacturingYear < 1940 || manufacturingYear > 2030) {
      return NextResponse.json({ error: "Invalid manufacturing year." }, { status: 400 });
    }
    if (!(imageFile instanceof File)) {
      return NextResponse.json({ error: "Image upload is required." }, { status: 400 });
    }

    const supabase = createServiceRoleClient();
    const extension = imageFile.name.split(".").pop() ?? "jpg";
    const storagePath = `cars/${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const arrayBuffer = await imageFile.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from("car-images")
      .upload(storagePath, arrayBuffer, {
        contentType: imageFile.type,
        upsert: false
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage.from("car-images").getPublicUrl(storagePath);

    const { error: insertError } = await supabase.from("cars").insert({
      full_name: fullName,
      car_brand: carBrand,
      car_category: carCategory,
      manufacturing_year: manufacturingYear,
      plate_number: plateNumber,
      phone_number: phoneNumber,
      car_image: publicUrlData.publicUrl,
      approval_status: "pending"
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Registration submitted successfully. Status: pending admin approval."
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      { status: 500 }
    );
  }
}
