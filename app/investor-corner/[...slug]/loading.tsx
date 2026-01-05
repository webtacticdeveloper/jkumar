"use client";

import { usePathname } from "next/navigation";

export default function InvestorDynamicLoading() {
  const pathname = usePathname();

  // Count how many slug segments: /investor-corner/xxx/... 
  const segments = pathname.split("/").filter(Boolean).length;
  const isSubcategoryPage = segments === 3; 
  // investor-corner / category / subcategory  → 3 segments

  return (
    <div className="animate-pulse">

      {/* =============================== */}
      {/* 🔶 SUBCATEGORY LEVEL SKELETON   */}
      {/* =============================== */}
      {isSubcategoryPage && (
        <div className="p-6 min-h-screen max-w-5xl mx-auto mt-24">

          {/* BIG TITLE */}
          <div className="h-12 w-full bg-neutral-300 rounded mb-10"></div>

          {/* HEADER BAR */}
          <div className="bg-accent h-10 w-full rounded-t-xl"></div>

          {/* PAGINATED LIST SKELETON */}
          <div className="border border-neutral-200 rounded-b-xl divide-y">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="px-6 py-5">
                <div className="h-4 w-3/4 bg-neutral-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* PAGINATION BUTTONS */}
          <div className="flex itme-center justify-center gap-3 mt-6">
            <div className="h-8 w-8 bg-neutral-300 rounded-full"></div>
            <div className="h-8 w-8 bg-neutral-300 rounded-full"></div>
            <div className="h-8 w-8 bg-neutral-300 rounded-full"></div>
          </div>
        </div>
      )}

      {/* =============================== */}
      {/* 🟡 CATEGORY LEVEL SKELETON       */}
      {/* =============================== */}
      {!isSubcategoryPage && (
        <div className="p-6 md:p-10 min-h-screen bg-[#FCF7EE] ">

          {/* PAGE TITLE */}
          <div className="h-10 w-full bg-neutral-300 rounded-md mb-10"></div>

          {/* SUBCATEGORY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="
                  bg-white rounded-xl shadow-lg
                  border border-[#e5e5e5]
                  overflow-hidden flex flex-col
                "
              >
                {/* GOLD HEADER */}
                <div className="bg-accent px-6 py-3">
                  <div className="h-4 w-32 bg-white/40 rounded"></div>
                </div>

                <div className="divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="px-6 py-4">
                      <div className="h-4 w-full bg-neutral-200 rounded"></div>
                    </div>
                  ))}
                </div>

                {/* VIEW ALL BUTTON */}
                <div className="flex justify-end px-6 py-4 mt-auto">
                  <div className="h-8 w-24 bg-neutral-300 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
