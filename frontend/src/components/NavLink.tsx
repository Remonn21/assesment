"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function NavLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`flex min-h-12 items-center gap-3 rounded-lg px-3 text-sm lg:min-h-10 font-medium transition-colors [&_svg]:size-5 [&_svg]:shrink-0 ${
        isActive ? "bg-accent-fill text-on-accent" : "text-ink hover:bg-paper"
      }`}
    >
      {icon}
      {children}
    </Link>
  );
}
