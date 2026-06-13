"use client";

import { FormEvent, useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactResponse {
  message?: string;
  error?: string;
}

export function ContactForm() {
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
    const response = await fetch("/api/contact", { method: "POST", body: formData });
    const data = (await response.json()) as ContactResponse;
    setLoading(false);

    if (!response.ok) {
      setMessage(data.error ?? "Unable to send message.");
      return;
    }

    setSuccess(true);
    setMessage(data.message ?? "Message sent.");
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required />
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            Send Message
          </Button>
        </form>

        {message && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`mt-4 text-sm ${success ? "text-emerald-300" : "text-red-300"}`}>
            {success && <CheckCircle2 className="mr-2 inline-block h-4 w-4" />}
            {message}
          </motion.p>
        )}
      </CardContent>
    </Card>
  );
}
