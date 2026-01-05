"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AwardsLoading() {
  return (
    <div className="w-full">
      {/* === HERO SECTION === */}
      <section className="relative w-full h-[100vh] flex flex-col justify-center items-center bg-neutral-950 overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/70 to-black" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-6 max-w-4xl mx-auto text-center px-6">
          {/* Title */}
          <Skeleton className="w-3/4 md:w-2/3 h-12 rounded-md bg-neutral-800" />
          {/* Subtitle */}
          <Skeleton className="w-2/3 md:w-1/2 h-6 rounded-md bg-neutral-800/80" />
        </div>

        {/* Scroll Icon */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <Skeleton className="w-10 h-10 rounded-full bg-neutral-800/80" />
        </div>
      </section>

      {/* === AWARDS GRID === */}
      <section className="relative bg-[var(--main-background)] py-20 px-4 md:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Title Placeholder */}
          <div className="flex justify-center mb-12">
            <Skeleton className="w-48 h-8 rounded-md bg-neutral-300/30" />
          </div>

          {/* Grid Skeletons */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm"
              >
                {/* Card Body */}
                <Skeleton className="absolute inset-0 bg-neutral-300/30" />

                {/* Bottom Accent Bar */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--primary)] via-[#ED3237] to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
