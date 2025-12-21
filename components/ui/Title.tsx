"use client";

import React, { ReactNode } from "react";

interface TitleProps {
  children: string | ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "span";
  className?: string;
}

/**
 * Title component - renders text with yellow punctuation
 * Punctuation: . ; : / ? , !
 */
export default function Title({ children, as: Tag = "h2", className = "" }: TitleProps) {
  if (typeof children !== "string") {
    return <Tag className={className}>{children}</Tag>;
  }
  return <Tag className={className}>{yellowPunctuation(children)}</Tag>;
}

/**
 * Utility function to wrap punctuation in yellow spans
 * Punctuation: . ; : / ? , !
 */
export function yellowPunctuation(text: string): ReactNode {
  if (typeof text !== "string") return text;
  
  const parts: ReactNode[] = [];
  let buffer = "";
  
  for (let idx = 0; idx < text.length; idx++) {
    const char = text[idx];
    
    // Check if it's a punctuation mark
    if (['.', ';', ':', '/', '?', ',', '!'].includes(char)) {
      if (buffer) {
        parts.push(buffer);
        buffer = "";
      }
      parts.push(
        <span key={`punct-${idx}`} className="text-joel-yellow">
          {char}
        </span>
      );
    } else {
      buffer += char;
    }
  }
  
  if (buffer) {
    parts.push(buffer);
  }

  return parts.length > 0 ? <>{parts}</> : text;
}
