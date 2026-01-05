/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AnimatedFullScreenMenu from "./AnimatedFullScreenMenu";
import Image from "next/image";
import NavItem from "./NavItem";

const transparentRoutes = ["/", "/about-us", "/awards", "/our-leadership"];

export default function Navbar({ categories }: any) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isTransparentPage = transparentRoutes.includes(pathname);

  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const bgClass = (() => {
    if (!isTransparentPage) return "bg-black/90 shadow-md";
    if (scrolled) return "bg-black/90 shadow-md";
    return "bg-transparent";
  })();
  
  if(pathname.includes("pdf"))return null;
  return (
    <nav
      className={`
        fixed top-0 z-[999] flex w-full items-center justify-between 
        px-4 md:px-16 transition-all duration-300 
        overflow-visible   /* <-- REQUIRED FIX */
        ${bgClass} ${scrolled ? "py-3" : "py-5"}
      `}
    >
      {/* --- LOGO + TITLE --- */}
      <Link href="/" className="flex items-center gap-3">
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-300 ${
            scrolled
              ? "h-14 w-14 bg-[var(--card)] card-shadow"
              : isTransparentPage
              ? "h-18 w-18 bg-[var(--overlay-light)] backdrop-blur-md"
              : "h-14 w-14 bg-[var(--card)] card-shadow"
          }`}
        >
          <Image
            src="/jkumar_logo_white.png"
            alt="JKumar Logo"
            width={200}
            height={200}
            priority
            className={`${scrolled ? "h-9" : "h-12"} w-auto transition-all`}
          />
        </div>

        <h1
          className={`font-semibold tracking-wide transition-all duration-300 ${
            scrolled || !isTransparentPage
              ? "text-[var(--overlay-light)] text-sm"
              : "text-[var(--overlay-light)] text-sm md:text-base"
          }`}
        >
          J. KUMAR INFRAPROJECTS LIMITED
        </h1>
      </Link>

      {/* --- CONTACT INFO + MENU --- */}
      <div className="flex items-center gap-8">
        <div
          className={`
            hidden tablet:flex items-center gap-7 font-medium transition-all 
            overflow-visible   /* <-- IMPORTANT FIX */
            ${
              scrolled || !isTransparentPage
                ? "text-[var(--overlay-light)]"
                : "text-[var(--overlay-light)]"
            }
          `}
        >
          {/* <Dropdown scrolled={scrolled || !isTransparentPage} data={categories} /> */}
              <NavItem scrolled={scrolled||!isTransparentPage} item={categories} depth={0} />
          <a
            href="mailto:info@jkumar.com"
            className="relative group hover:text-[var(--primary)] transition"
          >
            info@jkumar.com
            <span className="absolute left-1/2 -bottom-[2px] w-0 h-[2px] bg-[var(--primary)] transition-all group-hover:w-full group-hover:left-0" />
          </a>

          <a
            href="tel:2268717900"
            className="relative group hover:text-[var(--primary)] transition"
          >
            +91 2268717900
            <span className="absolute left-1/2 -bottom-[2px] w-0 h-[2px] bg-[var(--primary)] transition-all group-hover:w-full group-hover:left-0" />
          </a>
        </div>

        <AnimatedFullScreenMenu scrolled={scrolled || !isTransparentPage} />
      </div>
    </nav>
  );
}
