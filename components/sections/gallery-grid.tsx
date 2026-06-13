"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { GalleryItem } from "@/types";
import { Button } from "@/components/ui/button";

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const categories = useMemo(() => ["All", ...new Set(items.map((item) => item.category))], [items]);
  const filtered = filter === "All" ? items : items.filter((item) => item.category === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Button key={category} variant={filter === category ? "default" : "outline"} size="sm" onClick={() => setFilter(category)}>
            {category}
          </Button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filtered.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.015 }}
            className="group relative mb-4 block w-full overflow-hidden rounded-2xl border border-white/10 text-left"
            onClick={() => setActive(item)}
          >
            <div className="relative min-h-56 w-full">
              {item.image_url.endsWith(".mp4") ? (
                <video src={item.image_url} controls className="h-full w-full object-cover" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image_url}
                  alt={item.category}
                  loading="lazy"
                  className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-sm text-white/85">
              {item.category}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              {active.image_url.endsWith(".mp4") ? (
                <video src={active.image_url} controls autoPlay className="max-h-[90vh] w-full object-contain" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={active.image_url} alt={active.category} className="max-h-[90vh] w-full object-contain" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
