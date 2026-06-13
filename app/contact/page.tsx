import type { Metadata } from "next";
import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { MotionSection } from "@/components/sections/motion-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ADDICTION JO for tickets, partnerships, and event details."
};

export default function ContactPage() {
  return (
    <div className="container section-padding pt-36">
      <MotionSection>
        <SectionHeading
          badge="Get In Touch"
          title="Contact"
          description="Questions, partnerships, and media inquiries. We are ready."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <ContactForm />
          <div className="space-y-5">
            <Card>
              <CardContent className="space-y-4 p-6">
                <p className="flex items-center gap-2 text-white/80">
                  <Instagram className="h-4 w-4 text-accent" />
                  <Link href="https://instagram.com/addictionjo" target="_blank">
                    @addictionjo
                  </Link>
                </p>
                <p className="flex items-center gap-2 text-white/80">
                  <Mail className="h-4 w-4 text-accent" />
                  hello@addictionjo.com
                </p>
                <p className="flex items-center gap-2 text-white/80">
                  <Phone className="h-4 w-4 text-accent" />
                  +962 79 000 0000
                </p>
              </CardContent>
            </Card>

            <div className="overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Airport Road Amman"
                src="https://www.google.com/maps?q=Airport+Road,+Amman,+Jordan&output=embed"
                width="100%"
                height="320"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0 [filter:grayscale(1)_invert(0.92)_contrast(1.15)_brightness(0.7)_saturate(0.35)]"
              />
            </div>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
