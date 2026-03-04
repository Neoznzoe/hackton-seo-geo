"use client";

import Link from "next/link";
import { trackCtaClick } from "@/lib/tracking";

interface TrackedCtaProps {
  href: string;
  label: string;
  className?: string;
}

export default function TrackedCta({ href, label, className }: TrackedCtaProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackCtaClick(label)}
    >
      {label}
    </Link>
  );
}
