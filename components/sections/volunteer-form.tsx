"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VolunteerResponse {
  message?: string;
  error?: string;
}

export function VolunteerForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/volunteer", {
      method: "POST",
      body: formData
    });

    const data = (await response.json()) as VolunteerResponse;
    setLoading(false);
    if (!response.ok) {
      setMessage(data.error ?? "Unable to submit volunteer form.");
      return;
    }

    setSuccess(true);
    setMessage(data.message ?? "Volunteer application received.");
    form.reset();
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Volunteer / Usher Application</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input id="full_name" name="full_name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" name="age" type="number" min={16} max={80} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input id="phone_number" name="phone_number" type="tel" required />
          </div>

          <Button className="w-full" type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Application
          </Button>
        </form>

        {message && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm">
            <p className={success ? "flex items-center gap-2 text-emerald-300" : "text-red-300"}>
              {success && <CheckCircle2 className="h-4 w-4" />}
              {message}
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
