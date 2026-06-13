import type { Metadata } from "next";
import { Montserrat, Rajdhani } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "@/lib/metadata";
import { AppShell } from "@/components/layout/app-shell";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["600", "700"]
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var key = "addiction-theme";
                  var saved = localStorage.getItem(key);
                  var mode = (saved === "light" || saved === "dark")
                    ? saved
                    : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
                  document.documentElement.setAttribute("data-theme", mode);
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${rajdhani.variable} ${montserrat.variable} min-h-screen`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
