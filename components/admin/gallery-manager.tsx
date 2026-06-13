"use client";

import { FormEvent, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import type { Database } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type GalleryAssetRow = Database["public"]["Tables"]["gallery_assets"]["Row"];

interface GalleryManagerProps {
  initialItems: GalleryAssetRow[];
}

export function GalleryManager({ initialItems }: GalleryManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/gallery", { method: "POST", body: formData });
    const data = (await response.json()) as { item?: GalleryAssetRow; error?: string };
    setLoading(false);

    if (!response.ok || !data.item) {
      setMessage(data.error ?? "Failed to add gallery item.");
      return;
    }

    setItems((current) => [data.item!, ...current]);
    setMessage("Gallery asset added.");
    event.currentTarget.reset();
  }

  return (
    <section id="gallery" className="space-y-4">
      <h3 className="font-heading text-2xl font-bold uppercase">Gallery Assets</h3>
      <Card>
        <CardHeader>
          <CardTitle>Add Asset</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input id="image_url" name="image_url" placeholder="https://..." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Optional title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Input id="caption" name="caption" placeholder="Optional caption" />
            </div>
            <div>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                Add Asset
              </Button>
              {message && <p className="mt-3 text-sm text-white/75">{message}</p>}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.slice(0, 12).map((item) => (
          <div key={item.id} className="glass-panel overflow-hidden p-2">
            <div className="relative h-40 overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image_url} alt={item.title ?? "gallery asset"} className="h-full w-full object-cover" />
            </div>
            <p className="mt-2 text-sm font-semibold">{item.title ?? "Untitled"}</p>
            <p className="text-xs text-white/60">{item.caption ?? "No caption"}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
