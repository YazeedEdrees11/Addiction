"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
}

export function MotionSection({ children, className }: MotionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
