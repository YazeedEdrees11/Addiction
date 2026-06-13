"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { CAR_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegisterResponse {
  message?: string;
  error?: string;
}

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/register-car", {
      method: "POST",
      body: formData
    });

    const data = (await response.json()) as RegisterResponse;
    setLoading(false);

    if (!response.ok) {
      setMessage(data.error ?? "Registration failed.");
      return;
    }

    setSuccess(true);
    setMessage(data.message ?? "Car submitted successfully.");
    form.reset();
    setCategory("");
    setImagePreviewUrl(null);
    setImageName("");
  }

  function onImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setImagePreviewUrl(null);
      setImageName("");
      return;
    }

    setImageName(file.name);
    const objectUrl = URL.createObjectURL(file);
    setImagePreviewUrl(objectUrl);
  }

  return (
    <>
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Car Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input id="full_name" name="full_name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="car_brand">Car Brand / Type</Label>
            <Input id="car_brand" name="car_brand" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="car_category">Car Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="car_category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CAR_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" name="car_category" value={category} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="manufacturing_year">Manufacturing Year</Label>
            <Input id="manufacturing_year" name="manufacturing_year" type="number" min={1940} max={2030} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plate_number">License Plate Number</Label>
            <Input id="plate_number" name="plate_number" required />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input id="phone_number" name="phone_number" type="tel" required />
          </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="car_image">Car Image Upload</Label>
              <label
                htmlFor="car_image"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-accent/60 bg-accent/5 px-4 py-5 text-sm text-white/80"
              >
                <Upload className="h-4 w-4 text-accent" />
                Upload image (JPG/PNG/WebP)
              </label>
              <Input id="car_image" name="car_image" type="file" accept="image/*" required className="hidden" onChange={onImageChange} />

              {imagePreviewUrl && (
                <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20 p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreviewUrl} alt="Selected car" className="h-56 w-full rounded-lg object-cover" />
                  <p className="mt-2 text-xs text-white/65">{imageName}</p>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Registration
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed right-5 top-24 z-[80] w-[min(460px,92vw)] rounded-xl border border-white/10 bg-neutral-900/95 p-4 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 text-sm">
            {success && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
            <p className={success ? "text-emerald-300" : "text-red-300"}>{message}</p>
          </div>
        </motion.div>
      )}
    </>
  );
}
