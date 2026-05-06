"use client";

/**
 * Input — champ texte primitif du design system DA Purple.
 * Support left/right icon, état error, hint, label, helper text.
 */

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", leftIcon, rightIcon, error, ...props }, ref) => {
    if (leftIcon || rightIcon) {
      return (
        <div className="relative w-full">
          {leftIcon && (
            <span
              className={cn(
                "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400",
                error && "text-red-500"
              )}
              aria-hidden
            >
              {leftIcon}
            </span>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-lg border bg-white text-sm placeholder:text-zinc-400 transition-colors",
              "border-zinc-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-joel-violet focus-visible:ring-offset-2 focus-visible:border-joel-violet",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-zinc-50",
              "px-3 py-2",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error &&
                "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500",
              className
            )}
            aria-invalid={error || undefined}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <span
              className={cn(
                "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400",
                error && "text-red-500"
              )}
              aria-hidden
            >
              {rightIcon}
            </span>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border bg-white text-sm placeholder:text-zinc-400 transition-colors",
          "border-zinc-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-joel-violet focus-visible:ring-offset-2 focus-visible:border-joel-violet",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-zinc-50",
          "px-3 py-2",
          error &&
            "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500",
          className
        )}
        aria-invalid={error || undefined}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

/**
 * Textarea — variante multi-lignes alignée stylistiquement sur Input.
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-lg border bg-white text-sm placeholder:text-zinc-400 transition-colors",
        "border-zinc-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-joel-violet focus-visible:ring-offset-2 focus-visible:border-joel-violet",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-zinc-50",
        "px-3 py-2",
        error &&
          "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500",
        className
      )}
      aria-invalid={error || undefined}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
