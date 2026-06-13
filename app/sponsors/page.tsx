import type { Metadata } from "next";
import Link from "next/link";
import { MotionSection } from "@/components/sections/motion-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sponsors",
  description: "Discover ADDICTION JO sponsors and partnership opportunities."
};

const tiers = [
  {
    name: "Title Partner",
    benefits: ["Primary branding placement", "Main stage integration", "VIP hospitality package"]
  },
  {
    name: "Performance Partner",
    benefits: ["Track-side branding", "Social media inclusion", "Booth activation space"]
  },
  {
    name: "Community Partner",
    benefits: ["On-site logo visibility", "Event listing mentions", "Networking access"]
  }
];

const sponsors = [
  "TurboHaus",
  "NightShift Media",
  "Paddock 98",
  "Velocity Parts",
  "PetroMax",
  "Driftline Garage"
];

export default function SponsorsPage() {
  return (
    <div className="container section-padding pt-36">
      <MotionSection>
        <SectionHeading badge="Partnerships" title="Sponsors" description="Powering the premium automotive experience across Jordan." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((sponsor) => (
            <Card key={sponsor} className="text-center">
              <CardContent className="p-10">
                <p className="font-heading text-2xl font-bold uppercase tracking-wider text-white/85">{sponsor}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="section-padding">
        <SectionHeading badge="Tiers" title="Partnership Tiers" />
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name}>
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-white/75">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit}>• {benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/contact">Become a Sponsor</Link>
          </Button>
        </div>
      </MotionSection>
    </div>
  );
}
