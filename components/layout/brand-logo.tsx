import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  iconOnly?: boolean;
  priority?: boolean;
}

export function BrandLogo({ className, iconOnly = false, priority = false }: BrandLogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-3", className)} aria-label="ADDICTION JO Home">
      <Image
        src="/images/addiction-jo-logo.png"
        alt="ADDICTION JO logo"
        width={52}
        height={52}
        priority={priority}
        className="h-11 w-11 rounded-full object-contain shadow-neon md:h-12 md:w-12"
      />
      {!iconOnly && (
        <span className="font-heading text-xl font-bold tracking-[0.18em] text-accent">ADDICTION JO</span>
      )}
    </Link>
  );
}
