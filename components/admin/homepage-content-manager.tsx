"use client";

import { FormEvent, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HomepageContentManagerProps {
  initialSubtitle: string;
  initialDateLabel: string;
  initialLocation: string;
}

export function HomepageContentManager({
  initialSubtitle,
  initialDateLabel,
  initialLocation
}: HomepageContentManagerProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/admin/homepage-content", { method: "POST", body: formData });
    const data = (await response.json()) as { message?: string; error?: string };
    setLoading(false);

    if (!response.ok) {
      setMessage(data.error ?? "Failed to update homepage content.");
      return;
    }
    setMessage(data.message ?? "Homepage content saved.");
  }

  return (
    <section id="homepage-content" className="space-y-4">
      <h3 className="font-heading text-2xl font-bold uppercase">Manage Homepage Content</h3>
      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input id="subtitle" name="subtitle" defaultValue={initialSubtitle} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date_label">Event Date Label</Label>
              <Input id="date_label" name="date_label" defaultValue={initialDateLabel} required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" defaultValue={initialLocation} required />
            </div>
            <div className="md:col-span-3">
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Homepage Content
              </Button>
              {message && <p className="mt-3 text-sm text-white/75">{message}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
