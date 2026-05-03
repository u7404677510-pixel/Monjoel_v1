"use client";

/**
 * Badge — pastille de statut/label, taille fixe `text-xs`.
 * Variantes : default | primary | accent | success | warning | danger | outline
 */

import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium border transition-colors",
  {
    variants: {
      variant: {
        default: "bg-zinc-100 text-zinc-700 border-zinc-200",
        primary: "bg-joel-violet/10 text-joel-violet border-joel-violet/20",
        accent: "bg-joel-yellow/20 text-joel-violet border-joel-yellow/40",
        success: "bg-joel-violet/5 text-joel-violet border-joel-violet/20",
        warning: "bg-amber-50 text-amber-800 border-amber-200",
        danger: "bg-red-50 text-red-700 border-red-200",
        outline: "bg-transparent text-zinc-600 border-zinc-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
