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
                  <a
                    href="https://www.instagram.com/addiction.jo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    @addiction.jo
                  </a>
                </p>
                <p className="flex items-center gap-2 text-white/80">
                  <Mail className="h-4 w-4 text-accent" />
                  <a
                    href="mailto:addiction.jo2026@gmail.com"
                    className="hover:text-accent transition-colors"
                  >
                    addiction.jo2026@gmail.com
                  </a>
                </p>
                <div className="flex flex-col gap-2 text-white/80">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-accent" />
                    <a
                      href="https://wa.me/962795444257"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      +962 7 9544 4257
                    </a>
                  </div>
                  <div className="pl-6">
                    <a
                      href="https://wa.me/962787878807"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      +962 7 8787 8807
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  title="Hujrah Village | World Cup Fan Zone"
                  src="https://www.google.com/maps?q=Hujrah+Village+Airport+Road+Amman+Jordan&output=embed"
                  width="100%"
                  height="320"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0 [filter:grayscale(1)_invert(0.92)_contrast(1.15)_brightness(0.7)_saturate(0.35)]"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/RQt4EhtkPxMVaLpHA?g_st=iw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
