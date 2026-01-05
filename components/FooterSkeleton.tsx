"use client";

export default function FooterSkeleton() {
  return (
    <footer className="relative bg-white text-[var(--foreground)] border-t border-[var(--border)] mt-10">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--primary)] via-[#ED3237] to-transparent" />

      {/* --- Skeleton Grid --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-x-12 gap-y-10">

        {/* --- Brand Column Skeleton --- */}
        <div className="col-span-1 md:col-span-2">
          <div className="h-6 w-40 bg-neutral-800/30 rounded animate-pulse mb-4" />
          <div className="h-3 w-64 bg-neutral-800/20 rounded animate-pulse mb-2" />
          <div className="h-3 w-52 bg-neutral-800/20 rounded animate-pulse mb-2" />
          <div className="h-3 w-48 bg-neutral-800/20 rounded animate-pulse mb-6" />

          {/* Social icons */}
          <div className="flex space-x-4 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-9 w-9 rounded-full bg-neutral-800/20 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* --- Menu Columns Skeleton --- */}
        {[1, 2, 3].map((col) => (
          <div key={col}>
            <div className="h-5 w-28 bg-neutral-800/30 rounded animate-pulse mb-4" />

            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-3 w-32 bg-neutral-800/20 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}

        {/* --- Contact Column Skeleton --- */}
        <div>
          <div className="h-5 w-24 bg-neutral-800/30 rounded animate-pulse mb-4" />

          <div className="space-y-3">
            <div className="h-3 w-40 bg-neutral-800/20 rounded animate-pulse" />
            <div className="h-3 w-32 bg-neutral-800/20 rounded animate-pulse" />
            <div className="h-3 w-36 bg-neutral-800/20 rounded animate-pulse" />
            <div className="h-3 w-44 bg-neutral-800/20 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Bottom Bar Skeleton */}
      <div className="border-t border-[var(--border)] py-6 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="h-3 w-56 bg-neutral-800/20 rounded animate-pulse" />
        <div className="h-3 w-40 bg-neutral-800/20 rounded animate-pulse" />
      </div>
    </footer>
  );
}
