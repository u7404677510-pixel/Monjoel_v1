import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes intelligently with conditional support.
 * Resolves conflicts between utility classes (e.g. `p-2 p-4` -> `p-4`).
 *
 * @example
 * cn("px-2", isActive && "bg-joel-violet", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
