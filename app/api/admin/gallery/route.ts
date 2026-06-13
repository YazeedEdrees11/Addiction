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
    const imageUrl = String(formData.get("image_url") ?? "").trim();
    const title = String(formData.get("title") ?? "").trim();
    const caption = String(formData.get("caption") ?? "").trim();

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required." }, { status: 400 });
    }

    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("gallery_assets")
      .insert({
        image_url: imageUrl,
        title: title || null,
        caption: caption || null
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ item: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error." },
      { status: 500 }
    );
  }
}
