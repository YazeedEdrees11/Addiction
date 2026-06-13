import type { Metadata } from "next";
import { MotionSection } from "@/components/sections/motion-section";
import { RegisterForm } from "@/components/sections/register-form";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata: Metadata = {
  title: "Car Registration",
  description: "Register your car for ADDICTION JO and join Jordan's premium automotive showcase."
};

export default function RegisterPage() {
  return (
    <div className="container section-padding pt-36">
      <MotionSection>
        <SectionHeading
          badge="Entry Form"
          title="Register Your Car"
          description="Submit your build for review. Every entry is curated to maintain a premium lineup."
        />
        <RegisterForm />
      </MotionSection>
    </div>
  );
}
