import type { Metadata } from "next";
import { MotionSection } from "@/components/sections/motion-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { TicketCheckout } from "@/components/sections/ticket-checkout";

export const metadata: Metadata = {
  title: "Tickets",
  description: "Book Regular, VIP, or VVIP tickets for ADDICTION JO."
};

export default function TicketsPage() {
  return (
    <div className="container section-padding pt-36">
      <MotionSection>
        <SectionHeading
          badge="Admission"
          title="Ticket Booking"
          description="Choose your access level and secure your place with instant QR ticket generation."
        />
        <TicketCheckout />
      </MotionSection>
    </div>
  );
}
