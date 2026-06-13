import type { CarCategory, TicketType } from "@/types";

export const BRAND = {
  name: "ADDICTION JO",
  slogan: "Where Passion Meets Asphalt",
  eventDate: "2026-06-26T18:00:00+03:00",
  dateLabel: "26/6",
  location: "Airport Road, Amman Jordan"
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Register", href: "/register" },
  { label: "Tickets", href: "/tickets" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Gallery", href: "/gallery" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/contact" }
];

export const CAR_CATEGORIES: CarCategory[] = [
  "Supercar",
  "JDM",
  "German",
  "Muscle",
  "Drift",
  "VIP",
  "Classic",
  "Other"
];

export const TICKET_TYPES: Record<
  TicketType,
  { price: number; features: string[]; description: string }
> = {
  Standard: {
    price: 5,
    description: "General access to the event grounds.",
    features: ["Event access", "Community zone", "Main stage viewing"]
  },
  Premium: {
    price: 10,
    description: "Enhanced access with premium viewing and perks.",
    features: ["Priority entry", "VIP lounge", "Limited edition lanyard"]
  }
};

export const FAQ_ITEMS = [
  {
    question: "Can I register more than one car?",
    answer:
      "Yes. Submit one registration form for each car so our curation team can review each build individually."
  },
  {
    question: "When do I receive ticket confirmation?",
    answer:
      "Immediately after checkout. Your unique ticket ID and QR code are generated instantly."
  },
  {
    question: "Are tickets refundable?",
    answer:
      "Tickets are non-refundable but transferable. Contact support for transfer assistance."
  }
];
