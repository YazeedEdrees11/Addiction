import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ badge, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto mb-10 max-w-2xl text-center", className)}>
      {badge && <p className="font-heading text-sm uppercase tracking-[0.28em] text-accent/90">{badge}</p>}
      <h2 className="mt-3 font-heading text-3xl font-bold uppercase leading-tight md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-white/70">{description}</p>}
    </div>
  );
}
