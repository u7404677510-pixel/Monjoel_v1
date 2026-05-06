"use client";

/**
 * Tabs — wrapper Radix Tabs.
 * Active tab : underline jaune `border-b-2 border-joel-yellow text-joel-violet`.
 * Inactive : `text-zinc-500 hover:text-zinc-700`.
 */

import { forwardRef } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 border-b border-zinc-200 w-full",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-all",
      "border-b-2 border-transparent -mb-px",
      "text-zinc-500 hover:text-zinc-700 hover:border-zinc-300",
      "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-joel-violet focus-visible:ring-offset-2 rounded-t-md",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:border-joel-yellow data-[state=active]:text-joel-violet data-[state=active]:font-semibold",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-joel-violet focus-visible:ring-offset-2 rounded-md",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
