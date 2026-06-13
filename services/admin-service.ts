import { createServiceRoleClient } from "@/lib/supabase/server";
import type { ApprovalStatus } from "@/types";

export async function updateCarApprovalStatus(carId: string, status: ApprovalStatus) {
  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("cars")
    .update({ approval_status: status })
    .eq("id", carId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function addGalleryItem(imageUrl: string, category: string) {
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("gallery").insert({ image_url: imageUrl, category });

  if (error) {
    throw new Error(error.message);
  }
}
