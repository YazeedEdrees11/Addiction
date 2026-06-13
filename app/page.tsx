import Link from "next/link";
import Image from "next/image";
import { CircleHelp, Mail, Phone, Instagram } from "lucide-react";
import { BRAND, FAQ_ITEMS, TICKET_TYPES } from "@/lib/constants";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { MotionSection } from "@/components/sections/motion-section";
import { SponsorsSlider } from "@/components/sections/sponsors-slider";
import { GalleryPreviewShowcase } from "@/components/sections/gallery-preview-showcase";
import { EventHighlightsShowcase } from "@/components/sections/event-highlights-showcase";

const featuredCars = [
  {
    title: "Porsche GT Builds",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "JDM Icons",
    image:
      "https://images.unsplash.com/photo-1541348263662-e068662d82af?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Drift Machines",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80"
  }
];

export default async function HomePage() {
  let heroSubtitle = BRAND.slogan;
  let eventDateLabel = BRAND.dateLabel;
  let locationLabel = BRAND.location;

  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase.from("homepage_content").select("*");
    if (data) {
      const map = new Map(data.map((row) => [row.key, row.value]));
      heroSubtitle = map.get("subtitle") ?? heroSubtitle;
      eventDateLabel = map.get("date_label") ?? eventDateLabel;
      locationLabel = map.get("location") ?? locationLabel;
    }
  } catch {
    // Fall back to static brand constants when Supabase is unavailable.
  }

  return (
    <div className="overflow-x-clip">
      <HeroSection subtitle={heroSubtitle} dateLabel={eventDateLabel} locationLabel={locationLabel} />

      <MotionSection className="section-padding">
        <div className="container">
          <SectionHeading badge="Showcase" title="Featured Cars" description="A lineup of elite machines selected for style, performance, and automotive artistry." />
          <div className="grid gap-6 md:grid-cols-3">
            {featuredCars.map((car) => (
              <Card key={car.title} className="group overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={car.image}
                    alt={car.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
                <CardContent className="pt-5">
                  <p className="font-heading text-xl uppercase tracking-wide">{car.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-padding bg-black/40">
        <div className="container">
          <SectionHeading
            badge="Atmosphere"
            title="Event Highlights"
            description="Built to feel fast, immersive, and unforgettable from arrival to final roll-out."
          />
          <EventHighlightsShowcase />
        </div>
      </MotionSection>

      <MotionSection className="section-padding">
        <div className="container">
          <SectionHeading
            badge="Visuals"
            title="Gallery Preview"
            description="A cinematic slice of the machines, motion, and atmosphere that define ADDICTION JO."
          />
          <GalleryPreviewShowcase />
        </div>
      </MotionSection>

      <MotionSection className="section-padding bg-black/40">
        <div className="container">
          <SectionHeading badge="Partners" title="Sponsors" />
          <SponsorsSlider />
        </div>
      </MotionSection>

      <MotionSection className="section-padding">
        <div className="container">
          <SectionHeading badge="FAQ" title="Frequently Asked Questions" />
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details key={item.question} className="glass-panel group p-6">
                <summary className="flex cursor-pointer items-center justify-between font-heading text-lg font-semibold">
                  {item.question}
                  <CircleHelp className="h-4 w-4 text-accent transition group-open:rotate-12" />
                </summary>
                <p className="mt-4 text-white/70">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-padding bg-black/40">
        <div className="container">
          <SectionHeading badge="Get In" title="Book Your Spot" />
          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(TICKET_TYPES).map(([type, config]) => (
              <Card key={type} className="relative overflow-hidden">
                <CardHeader>
                  <CardTitle>{type}</CardTitle>
                  <CardDescription>{config.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-heading text-3xl font-bold text-accent">{config.price} JD</p>
                  <Button asChild className="mt-5 w-full">
                    <Link href="/tickets">Buy {type}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-padding">
        <div className="container">
          <SectionHeading badge="Contact" title="Need More Details?" />
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="mx-auto h-5 w-5 text-accent" />
                <p className="mt-3 text-white/75">hello@addictionjo.com</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="mx-auto h-5 w-5 text-accent" />
                <p className="mt-3 text-white/75">+962 79 000 0000</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Instagram className="mx-auto h-5 w-5 text-accent" />
                <p className="mt-3 text-white/75">@addictionjo</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/contact">Open Contact Page</Link>
            </Button>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
