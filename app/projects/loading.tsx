"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loader() {
  return (
    <section className="w-full bg-forecolor text-background pt-10 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto animate-pulse">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[2px] w-12 bg-yellow-400/40" />
          <Skeleton className="h-8 w-48 rounded-md bg-white/15" />
        </div>

        <Skeleton className="h-4 w-3/4 mb-16 rounded-md bg-white/10" />

        {/* Grid of Project Categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white/5 backdrop-blur-sm"
            >
              <Skeleton className="w-full h-64 rounded-2xl bg-white/10" />
              <div className="absolute bottom-4 left-4">
                <Skeleton className="h-6 w-40 rounded-md bg-white/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
