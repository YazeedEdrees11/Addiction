"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const previewItems = [
  {
    src: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1400&q=80",
    title: "Neon Grid",
    category: "Night Run",
    size: "lg"
  },
  {
    src: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    title: "Street Elegance",
    category: "German",
    size: "md"
  },
  {
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    title: "Turbo Pulse",
    category: "Supercar",
    size: "md"
  },
  {
    src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    title: "Pitline Motion",
    category: "Drift",
    size: "sm"
  },
  {
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    title: "Cinematic Build",
    category: "Featured",
    size: "sm"
  }
];

export function GalleryPreviewShowcase() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
        {previewItems.map((item, index) => {
          const spanClass =
            item.size === "lg"
              ? "md:col-span-7 md:row-span-2 h-[420px]"
              : item.size === "md"
                ? "md:col-span-5 h-[204px]"
                : "md:col-span-3 h-[204px]";

          return (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 ${spanClass}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-accent/90">{item.category}</p>
                <p className="mt-1 font-heading text-xl font-bold uppercase tracking-wide text-white">{item.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="max-w-xl text-sm text-white/75">
          Explore full-resolution cinematic captures, rolling shots, and event films from Jordan's premium automotive scene.
        </p>
        <Button asChild variant="outline">
          <Link href="/gallery">
            View Full Gallery
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}


