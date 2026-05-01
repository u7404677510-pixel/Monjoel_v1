"use client";

/**
 * EmptyState — vue vide (pas de résultats, pas encore de leads, etc.).
 * Centered, paddings généreux, icône grande opacity-30.
 */

import type { ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: ComponentType<LucideProps>;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        "rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50",
        className
      )}
    >
      {Icon && (
        <Icon
          className="h-16 w-16 mb-4 text-joel-violet opacity-30"
          strokeWidth={1.5}
          aria-hidden
        />
      )}
      <h3 className="text-lg font-semibold text-zinc-900 mb-1.5">{title}</h3>
      {description && (
        <p className="text-sm text-zinc-500 max-w-sm mb-6">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
