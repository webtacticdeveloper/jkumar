/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import "./investor-dropdown.css";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function InvestorDropdown({ scrolled, data }: any) {
  return (
    <div className="dropdown menu--part group">

      {/* Title */}
      <div
        className={cn(
          "relative flex items-center group-hover:text-[var(--primary)] transition cursor-pointer",
          scrolled ? "text-[var(--foreground)]" : "text-[var(--overlay-light)]"
        )}
      >
        Investor Corner
        <span className="transition-transform group-hover:rotate-180">
          <ChevronDown size={20} />
        </span>

        <span className="absolute left-1/2 -bottom-[2px] w-0 h-[2px] bg-[var(--primary)] transition-all group-hover:w-full group-hover:left-0" />
      </div>

      {/* Level 1 Panel */}
      <div className="dropdown-content">
        <ul className="menu-wrapper">
          {/* <ul className="menu-list"> */}
            {data.submenu.map((cat: any, i: number) => (
              <li key={i} className=" menu-item parent">
                {/* Level 1 Item */}
                <Link href={cat.href} className="dropright">
                  {cat.title}
                </Link>

                {/* Level 2 Panel */}
                <div className="submenu-wrapper">
                  <ul className="submenu-list">
                    {cat.submenu.map((sub: any, j: number) => (
                      <li key={j} className="menu-item parent submenu">
                        {/* Level 2 Item */}
                        <Link href={sub.href} className="dropright">
                          {sub.title}
                        </Link>

                        {/* Level 3 Panel */}
                        <div className="submenu-wrapper">
                          <ul className="submenu submenu-scroll">

                            {sub.submenu.map((doc: any, k: number) => (
                              <li key={k} className="submenu-item">
                                <Link href={doc.href}>{doc.title}</Link>
                              </li>
                            ))}

                          </ul>
                        </div>
                      </li>
                    ))}

                  </ul>
                </div>

              </li>
            ))}

          {/* </ul> */}
        </ul>
      </div>
    </div>
  );
}
