/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";

export default function InvestorMegaMenu({ categories }: any) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button className="relative cursor-pointer group font-medium hover:text-[var(--primary)] transition">
        Investor Corner
        <span className="absolute left-1/2 -bottom-[2px] w-0 h-[2px] bg-[var(--primary)] transition-all group-hover:w-full group-hover:left-0" />
      </button>

      {/* Invisible hover buffer */}
      {open && (
        <div
          className="
            absolute left-1/2 -translate-x-1/2 
            top-full h-4 w-[750px]
          "
        />
      )}

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute left-1/2 -translate-x-1/2
            mt-2
            bg-white shadow-xl border border-gray-200
            p-6 rounded-xl z-50
            grid grid-cols-3 gap-6
            w-[750px] max-w-[90vw]
            text-sm
          "
        >
          {categories.map((cat: any) => (
            <div key={cat.id} className="min-w-0">

              {/* CATEGORY CLICKABLE */}
              <Link
                href={`/investor-corner/${cat.slug}`}
                onClick={closeMenu}
                className="font-semibold text-[15px] text-[var(--foreground)] mb-2 truncate block hover:text-[var(--primary)] transition"
              >
                {cat.name}
              </Link>

              {/* SUBCATEGORIES */}
              <ul className="space-y-1">
                {cat.subcategories.map((sub: any) => (
                  <li key={sub.id}>
                    <Link
                      href={`/investor-corner/${cat.slug}/${sub.slug}`}
                      onClick={closeMenu}
                      className="
                        text-[13px] text-gray-600
                        hover:text-[var(--primary)]
                        transition truncate block
                      "
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
