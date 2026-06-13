import type { Metadata } from "next";
import { MotionSection } from "@/components/sections/motion-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { VolunteerForm } from "@/components/sections/volunteer-form";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Join the ADDICTION JO team as a volunteer or usher."
};

export default function VolunteerPage() {
  return (
    <div className="container section-padding pt-36">
      <MotionSection>
        <SectionHeading
          badge="Community Team"
          title="Volunteer / Usher"
          description="Become part of the operation crew and help deliver a world-class automotive event."
        />
        <VolunteerForm />
      </MotionSection>
    </div>
  );
}
