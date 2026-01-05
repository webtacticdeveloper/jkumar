"use client";

import React, { JSX, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { menulist } from "@/data/menulist";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedFullScreenMenu({
  scrolled,
}: {
  scrolled?: boolean;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   ✅ FIX — LOCK SCROLL WITHOUT RESETTING TO TOP
   */
  useEffect(() => {
    let scrollY = 0;

    if (open) {
      // store scroll position accurately
      scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      // restore scroll without jumping
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      if (top) {
        const y = parseInt(top.replace(/[^0-9\-]/g, ""), 10);
        window.scrollTo(0, -y);
      }
    }
  }, [open]);


  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Fallback link mapping
  // const titleHrefMap: Record<string, string> = {
  //   Contact: "/contact",
  //   About: "/about-us",
  //   CSR: "/csr",
  //   Projects: "/projects",
  //   "Investor Corner": "/investor-corner",
  // };

  if (!mounted)
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-white hover:text-[#F2D313] transition"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    );

  return (
    <>
      {/* menu toggle button */}
      <button
        onClick={() => setOpen(true)}
        className={`${scrolled ? "text-[var(--overlay-light)]" : "text-[var(--overlay-light)]"} hover:text-[#F2D313] transition cursor-pointer`}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>

              {/* BACKDROP */}
              <div
                className="fixed inset-0 z-[9999]"
                onClick={() => setOpen(false)}
                style={{
                  background: "linear-gradient(180deg, rgba(0,0,0,.88) 0%, rgba(0,0,0,.65) 45%, rgba(255,255,255,.25) 100%)",
                  backdropFilter: "blur(15px)",
                }}
              />

              {/* MENU PANEL */}
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ type: "spring", stiffness: 250, damping: 30 }}
                className="fixed inset-0 z-[10000] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="min-h-screen flex flex-col pt-24 px-6 md:px-28">

                  {/* CLOSE BUTTON */}
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute cursor-pointer top-6 right-6 text-[#F2D313] text-3xl hover:rotate-90 transition"
                  >
                    ✕
                  </button>

                  {/* MENU GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {menulist.map((menu, i) => {
                      const hasChildren = menu.links && menu.links.length > 0;
                      return (
                        <div key={i}>
                          {hasChildren ? (
                            <h3 className="text-[#F2D313] text-2xl font-semibold mb-4 tracking-wide">
                              {menu.label}
                            </h3>
                          ) : null
                          }
                          {hasChildren && (
                            <ul className="space-y-3">
                              {menu.links.map((link, idx) => (
                                <li key={idx}>
                                  <Link
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="menu-link text-lg text-white"
                                  >
                                    {link.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                    <div>
                      <h3 className="text-2xl font-semibold text-[var(--primary)] mb-4">
                        Contact
                      </h3>
                      <ul className="space-y-3 text-white">
                        <li className="text-lg">Mumbai, Maharashtra, India</li>
                        <li>
                          <Link href="/contact" onClick={() => setOpen(false)} className="menu-link text-lg text-white">
                            Click here Contact us
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-[var(--primary)] mb-4">
                        Careers
                      </h3>
                      <ul className="space-y-3 text-white">
                        <li className="text-lg">Work Opportunities</li>
                        <li>
                          <Link href="/careers" onClick={() => setOpen(false)} className="menu-link text-lg text-white">
                            Click here get in touch
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>


                  <div className="mt-auto pt-6 pb-2 text-center text-sm text-[#F2D313]/80">
                    © {new Date().getFullYear()} J. Kumar Infraprojects Ltd.
                  </div>
                </div>
              </motion.div>

              {/* Hover underline */}
              <style>{`
                .menu-link {
                  position: relative;
                  transition: color .3s;
                }
                .menu-link:hover { color: #F2D313; }
                .menu-link::after {
                  content:"";
                  position:absolute;
                  left:0; bottom:-2px;
                  width:0%; height:2px;
                  background:#F2D313; transition:.3s;
                }
                .menu-link:hover::after { width:100%; }
              `}</style>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
