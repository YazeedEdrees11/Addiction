import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-JO", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(value));
}

export function createTicketId() {
  const part = crypto.randomUUID().split("-")[0].toUpperCase();
  return `AJ-${part}`;
}
