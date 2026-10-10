"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

function breadcrumbsFor(pathname: string) {
  if (pathname.startsWith("/manager")) return [{ label: "Overview", href: "/manager" }];
  const crumbs = [{ label: "Participants", href: "/facilitator" }];
  if (pathname.startsWith("/facilitator/participants/")) {
    crumbs.push({ label: "Report", href: pathname });
  }
  return crumbs;
}

export function Breadcrumbs() {
  const crumbs = breadcrumbsFor(usePathname());

  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm font-medium">
      {crumbs.map((crumb, index) => (
        <Fragment key={crumb.href}>
          {index > 0 && <ChevronRight className="size-4 shrink-0 text-muted" />}
          {index === crumbs.length - 1 ? (
            <span aria-current="page">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="text-muted transition-colors hover:text-accent-text">
              {crumb.label}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
