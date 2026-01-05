"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CSRLoading() {
  return (
    <section className="min-h-screen w-full bg-forecolor text-white px-6 md:px-12 lg:px-16 py-20 flex flex-col gap-20">
      {/* Simulate CSR Sections */}
      {Array.from({ length: 2 }).map((_, sectionIndex) => (
        <div key={sectionIndex} className="space-y-12">
          {/* Title + Quote */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Skeleton className="h-[2px] w-12 bg-yellow-500/20 rounded-full" />
              <Skeleton className="h-10 w-1/3 bg-gradient-to-r from-yellow-500/10 via-gray-600/20 to-yellow-500/10 rounded-lg animate-pulse" />
              <Skeleton className="h-[2px] w-12 bg-yellow-500/20 rounded-full" />
            </div>
            <Skeleton className="h-4 w-2/3 mx-auto bg-gradient-to-r from-gray-700/40 via-gray-600/30 to-gray-700/40 rounded-lg animate-pulse" />
          </div>

          {/* Image Grid Placeholder */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl border border-border/40 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              >
                <Skeleton className="w-full h-56 md:h-64 bg-gradient-to-br from-gray-800/50 via-gray-700/40 to-gray-800/30 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/5 via-transparent to-transparent" />
              </div>
            ))}
          </div>

          {/* Description + Person Placeholder */}
          <div className="max-w-3xl mx-auto space-y-4 text-center">
            <Skeleton className="h-4 w-3/4 mx-auto bg-gray-700/40 rounded-lg animate-pulse" />
            <Skeleton className="h-4 w-2/3 mx-auto bg-gray-700/40 rounded-lg animate-pulse" />
            <Skeleton className="h-4 w-1/2 mx-auto bg-gray-700/40 rounded-lg animate-pulse" />
          </div>

          {/* Person Name */}
          <div className="max-w-3xl mx-auto text-center">
            <Skeleton className="h-5 w-1/3 mx-auto bg-yellow-500/20 rounded-lg animate-pulse" />
          </div>

          {/* Divider */}
          {sectionIndex < 1 && (
            <div className="flex justify-center pt-10">
              <Skeleton className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
