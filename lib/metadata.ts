import type { Metadata } from "next";

const siteUrl = "https://addiction-jo.com";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/images/addiction-jo-logo.png",
    apple: "/images/addiction-jo-logo.png"
  },
  title: {
    default: "ADDICTION JO | Premium Automotive Event",
    template: "%s | ADDICTION JO"
  },
  description:
    "ADDICTION JO is Amman's premium automotive culture event, blending cinematic visuals, elite car builds, and a high-energy community experience.",
  keywords: [
    "ADDICTION JO",
    "Amman car event",
    "Jordan automotive event",
    "car culture",
    "drift event",
    "premium car gathering"
  ],
  openGraph: {
    title: "ADDICTION JO | Premium Automotive Event",
    description: "Where Passion Meets Asphalt.",
    url: siteUrl,
    siteName: "ADDICTION JO",
    locale: "en_JO",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ADDICTION JO",
    description: "Premium automotive culture event in Amman, Jordan."
  }
};
