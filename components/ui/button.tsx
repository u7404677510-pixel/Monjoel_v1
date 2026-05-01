"use client";

/**
 * Button — bouton primitif du design system DA Purple.
 *
 * Variantes :
 *  - primary  : gradient violet→mauve, ombre violette (CTA principaux)
 *  - secondary: bordure violet, fond blanc (actions secondaires)
 *  - ghost    : transparent, hover violet/10 (toolbar, table actions)
 *  - accent   : jaune avec texte violet (highlight, mise en avant)
 *  - danger   : rouge atténué (destructeur uniquement)
 *  - link     : style lien souligné violet
 *
 * Tailles : sm | md | lg | icon (carré pour icônes seules)
 * Slots : leftIcon / rightIcon (Lucide ou ReactNode)
 * Polymorphism : `asChild` via Radix Slot (rendu d'un Link Next.js par ex.)
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Slot as SlotNS } from "radix-ui";
const { Slot } = SlotNS;
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-joel-violet focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-joel text-white shadow-lg shadow-joel-violet/30 hover:shadow-xl hover:shadow-joel-violet/40 hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-white text-joel-violet border border-joel-violet/30 hover:bg-joel-violet/5 hover:border-joel-violet/60",
        ghost:
          "bg-transparent text-joel-violet hover:bg-joel-violet/10 hover:text-joel-violet",
        accent:
          "bg-joel-yellow text-joel-violet shadow-lg shadow-joel-yellow/40 hover:shadow-xl hover:shadow-joel-yellow/50 hover:-translate-y-0.5 active:translate-y-0",
        danger:
          "bg-red-500 text-white shadow-md shadow-red-500/30 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/40",
        link: "text-joel-violet underline-offset-4 hover:underline hover:text-joel-mauve p-0 h-auto",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    // Quand asChild, on ne peut pas injecter d'enfants additionnels (Slot exige 1 child)
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
