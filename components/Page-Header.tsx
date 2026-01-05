"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

// Pages that use overlay mode
const heroPages = ["/about-us", "/awards", "/our-leadership"];

// Skeleton Loader
function PageHeaderSkeleton() {
  return (
    <div className="pl-5 pt-6 bg-[#FCF7EE] border-b border-gray-300/40 space-y-3">
      <div className="h-6 w-1/4 bg-gray-300 rounded" />
      <div className="flex gap-3">
        <Skeleton className="h-4 w-12 bg-gray-400/40" />
        <Skeleton className="h-4 w-3 bg-gray-400/40" />
        <Skeleton className="h-4 w-16 bg-gray-400/40" />
      </div>
    </div>
  );
}

function PageHeaderContent() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (!segments.length) return null;
  if (segments[0] === "not-found") return null;
  if (segments[0] === "pdf") return null;

  // Detect overlay pages
  const isHeroPage = heroPages.some((path) => pathname.startsWith(path));

  // Overlay colors
  const overlayColors = {
    text: "text-white",
    faded: "text-white/80",
    separator: "text-white/90",
    wrapper:
      "absolute top-24 left-0 md:left-2 tablet:left-5 lg:left-12 z-50 px-6 py-4 drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]",
  };

  // Normal page colors
  const normalColors = {
    text: "text-gray-900",
    faded: "text-gray-600",
    separator: "text-gray-400",
    wrapper:
      "pt-6 pl-7 md:pl-17 pl-0 mt-20 md:mt-14 md:pt-15 bg-background border-b border-gray-300/40",
  };

  const colors = isHeroPage ? overlayColors : normalColors;

  // Build breadcrumb segments
  const breadcrumbs = [
    { label: "Home", href: "/", isLast: false },
    ...segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const label = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return { label, href, isLast: index === segments.length - 1 };
    }),
  ];

  return (
    <div className={colors.wrapper}>
      <Breadcrumb>
        <BreadcrumbList
          className={`flex flex-wrap items-center text-sm md:text-lg  gap-2 ${colors.faded}`}
        >
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center gap-2">
              {index > 0 && (
                <BreadcrumbSeparator className={colors.separator} />
              )}

              <BreadcrumbItem>
                {crumb.isLast ? (
                  <span className={`font-semibold ${colors.text}`}>
                    {crumb.label}
                  </span>
                ) : (
                  <BreadcrumbLink
                    asChild
                    className={`hover:text-primary transition ${colors.text}`}
                  >
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export function PageHeader() {
  return (
    <Suspense fallback={<PageHeaderSkeleton />}>
      <PageHeaderContent />
    </Suspense>
  );
}
