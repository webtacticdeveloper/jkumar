"use client";

export default function InvestorSidebarSkeleton() {
  return (
    <aside className="w-64 p-4 rounded-2xl space-y-6 animate-pulse">
      <div className="h-6 w-40 bg-white/10 rounded-md" />

      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-5 w-32 bg-white/10 rounded-md" />
          <ul className="space-y-2">
            {[...Array(4)].map((_, j) => (
              <li key={j} className="h-4 w-48 bg-white/10 rounded-md" />
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
