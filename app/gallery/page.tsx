import type { Metadata } from "next";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { MotionSection } from "@/components/sections/motion-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { GalleryItem } from "@/types";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore cinematic automotive moments from ADDICTION JO."
};

const fallbackGallery: GalleryItem[] = [
  {
    id: "1",
    image_url:
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80",
    category: "Supercar",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    image_url:
      "https://images.unsplash.com/photo-1611016186353-9af58c69a533?auto=format&fit=crop&w=1200&q=80",
    category: "Drift",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    image_url:
      "https://images.unsplash.com/photo-1566024164372-0281f1133aa6?auto=format&fit=crop&w=1200&q=80",
    category: "JDM",
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    image_url:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    category: "German",
    created_at: new Date().toISOString()
  }
];

export default async function GalleryPage() {
  let items = fallbackGallery;

  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    if (data && data.length > 0) items = data;
  } catch {
    items = fallbackGallery;
  }

  return (
    <div className="container section-padding pt-36">
      <MotionSection>
        <SectionHeading
          badge="Media"
          title="Gallery"
          description="Immersive visuals, neon reflections, and pure automotive energy."
        />
        <GalleryGrid items={items} />
      </MotionSection>
    </div>
  );
}
