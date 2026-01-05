"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

interface InvestorSidebarProps {
  categories: Category[];
}

export default function InvestorSidebar({ categories }: InvestorSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* ===== Mobile Toggle Button ===== */}
      <div className="md:hidden flex justify-start p-2">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md bg-yellow-400 text-black font-medium hover:bg-yellow-500 transition"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ===== Desktop Sidebar ===== */}
      <aside
        className="hidden md:flex flex-col w-64 p-4 rounded-2xl text-white space-y-6
        h-auto bg-transparent"
      >
        <h2 className="text-xl font-bold text-yellow-400 border-b border-white/10 pb-2">
          Investor Corner
        </h2>

        {categories.map((cat) => (
          <div key={cat.id}>
            <h3 className="text-lg font-semibold text-white/90 mb-2">
              {cat.name}
            </h3>
            <ul className="space-y-2">
              {cat.subcategories.map((sub) => {
                const isActive =
                  pathname === `/investor-corner/${cat.slug}/${sub.slug}`;

                return (
                  <li key={sub.id}>
                    <Link
                      href={`/investor-corner/${cat.slug}/${sub.slug}`}
                      className={`flex justify-between gap-2 transition-colors 
                        ${isActive
                          ? "text-yellow-400 font-medium"
                          : "text-white/80 hover:text-yellow-400"
                        }`}
                    >
                      <span className="flex-1 leading-snug break-words whitespace-normal">
                        {sub.name}
                      </span>
                      <span className="flex items-center justify-center min-w-[16px] h-full self-center">
                        <ChevronRight
                          size={16}
                          className={`${isActive ? "text-yellow-400" : ""}`}
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </aside>

      {/* ===== Mobile Sidebar (Drawer) ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/70 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Drawer */}
            <motion.aside
              className="fixed top-0 left-0 h-full w-72 bg-black/90 border-r border-white/10 z-50 
              p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-500/30 scrollbar-track-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between mb-6 sticky top-0 bg-black/90 z-10 pb-2 border-b border-white/10">
                <h2 className="text-xl font-bold text-yellow-400">
                  Investor Corner
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-yellow-400 hover:text-yellow-500"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="space-y-6">
                {categories.map((cat) => (
                  <div key={cat.id}>
                    <h3 className="text-lg font-semibold text-white/90 mb-2">
                      {cat.name}
                    </h3>
                    <ul className="space-y-2">
                      {cat.subcategories.map((sub) => {
                        const isActive =
                          pathname ===
                          `/investor-corner/${cat.slug}/${sub.slug}`;

                        return (
                          <li key={sub.id}>
                            <Link
                              href={`/investor-corner/${cat.slug}/${sub.slug}`}
                              className={`flex justify-between gap-2 transition-colors 
                                ${isActive
                                  ? "text-yellow-400 font-medium"
                                  : "text-white/80 hover:text-yellow-400"
                                }`}
                            >
                              <span className="flex-1 leading-snug break-words whitespace-normal">
                                {sub.name}
                              </span>
                              <span className="flex items-center justify-center min-w-[16px] h-full self-center">
                                <ChevronRight
                                  size={16}
                                  className={`${isActive ? "text-yellow-400" : ""}`}
                                />
                              </span>
                            </Link>
                          </li>

                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
