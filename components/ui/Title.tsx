"use client";

import React, { ReactNode } from "react";

interface TitleProps {
  children: string | ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "span";
  className?: string;
  gradient?: boolean;
}

/**
 * Title component that colorizes:
 * - Punctuation (. ! ? : ; ,) in yellow
 * - Dots on letters i and j in yellow
 * Following Joël brand guidelines
 */
export default function Title({ children, as: Tag = "h2", className = "", gradient = false }: TitleProps) {
  // If children is not a string, render as-is
  if (typeof children !== "string") {
    return <Tag className={className}>{children}</Tag>;
  }

  // Function to process text and add yellow color to punctuation and i/j dots
  const processText = (text: string): ReactNode[] => {
    const parts: ReactNode[] = [];
    
    // Split text into characters and process
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const prevChar = i > 0 ? text[i - 1] : "";
      
      // Check if it's a punctuation mark
      if (['.', '!', '?', ':', ';', ','].includes(char)) {
        parts.push(
          <span key={`punct-${i}`} className="text-joel-yellow">
            {char}
          </span>
        );
      }
      // Check if it's 'i' or 'j' (lowercase) - we'll use CSS to color the dot
      else if (char === 'i' || char === 'j') {
        parts.push(
          <span key={`dot-${i}`} className="yellow-dot-letter">
            {char}
          </span>
        );
      }
      // Check if it's 'I' or 'J' (uppercase with potential accent dot in title context)
      else if (char === 'I' || char === 'J') {
        parts.push(
          <span key={`dot-${i}`} className="yellow-dot-letter-upper">
            {char}
          </span>
        );
      }
      else {
        // Regular character - group consecutive regular chars for performance
        let regularChars = char;
        while (i + 1 < text.length && 
               !['.', '!', '?', ':', ';', ',', 'i', 'j', 'I', 'J'].includes(text[i + 1])) {
          i++;
          regularChars += text[i];
        }
        
        if (gradient) {
          parts.push(
            <span key={`text-${i}`} className="gradient-text">
              {regularChars}
            </span>
          );
        } else {
          parts.push(regularChars);
        }
      }
    }

    return parts;
  };

  return <Tag className={className}>{processText(children)}</Tag>;
}

// Alternative approach using SVG-based rendering for better control
export function TitleWithYellowDots({ 
  children, 
  as: Tag = "h2", 
  className = "" 
}: TitleProps) {
  if (typeof children !== "string") {
    return <Tag className={className}>{children}</Tag>;
  }

  const processText = (text: string): ReactNode[] => {
    const result: ReactNode[] = [];
    let buffer = "";
    
    for (let idx = 0; idx < text.length; idx++) {
      const char = text[idx];
      
      // Punctuation - render with yellow
      if (['.', '!', '?', ':', ';', ','].includes(char)) {
        if (buffer) {
          result.push(<span key={`buf-${idx}`}>{buffer}</span>);
          buffer = "";
        }
        result.push(
          <span key={`punct-${idx}`} className="text-joel-yellow">
            {char}
          </span>
        );
      }
      // i or j - wrap with special class
      else if (char === 'i' || char === 'j') {
        if (buffer) {
          result.push(<span key={`buf-${idx}`}>{buffer}</span>);
          buffer = "";
        }
        result.push(
          <span key={`ij-${idx}`} className="joel-yellow-tittle">
            {char}
          </span>
        );
      }
      else {
        buffer += char;
      }
    }
    
    if (buffer) {
      result.push(<span key="buf-end">{buffer}</span>);
    }
    
    return result;
  };

  return <Tag className={className}>{processText(children)}</Tag>;
}

/**
 * Utility function to wrap text with yellow punctuation for inline use
 */
export function yellowPunctuation(text: string): ReactNode {
  if (typeof text !== "string") return text;
  
  const parts: ReactNode[] = [];
  let buffer = "";
  
  for (let idx = 0; idx < text.length; idx++) {
    const char = text[idx];
    
    if (['.', '!', '?', ':', ';', ','].includes(char)) {
      if (buffer) {
        parts.push(buffer);
        buffer = "";
      }
      parts.push(
        <span key={`punct-${idx}`} className="text-joel-yellow">
          {char}
        </span>
      );
    } else if (char === 'i' || char === 'j') {
      if (buffer) {
        parts.push(buffer);
        buffer = "";
      }
      parts.push(
        <span key={`ij-${idx}`} className="joel-yellow-tittle">
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

/**
 * Hook-like function for processing title text - simpler version
 */
export function processYellowTitle(text: string): ReactNode {
  return yellowPunctuation(text);
}
