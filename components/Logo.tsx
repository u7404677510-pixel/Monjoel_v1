"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src="/logo.webp"
        alt="Joël - Dépannage d'urgence"
        width={224}
        height={72}
        className="h-auto w-auto max-h-16"
        priority
        fetchPriority="high"
      />
    </Link>
  );
}




