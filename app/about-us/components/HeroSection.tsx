"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTypewriter } from "./hooks/useTypewriter";
import { motion } from "framer-motion";

export default function HeroSection() {
  const typed = useTypewriter(
    [
      "Engineering India's Infrastructure Landscape",
      "Building Urban Mobility for Tomorrow",
      "Delivering Scale. Precision. Trust.",
    ],
    80,
    1500
  );

  return (
    <section className="relative w-full min-h-[100vh] pt-40 pb-28">
      {/* Background Image with Soft Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/hero/metro-hero.webp"
          alt="Infrastructure Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/60 to-black"></div>
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* EST Badge */}
        <Badge className="bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)] px-4 py-1 rounded-full">
          EST. 1980
        </Badge>

        {/* Heading */}
        <div className="mt-6 h-[180px] sm:h-[140px] flex items-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-white">
            <span className="inline-block">
              {typed}
              <span className="ml-1 inline-block w-[3px] h-8 bg-[var(--primary)] animate-pulse" />
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <p className="mt-4 max-w-2xl text-lg text-white/70">
          From metros and bridges to highways and urban transit systems — we
          bring scale, precision and reliability to India’s most ambitious
          infrastructure projects.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto rounded-full px-8 py-5 bg-[var(--primary)] text-[var(--foreground)] shadow-md hover:bg-[#e3c50f] focus:bg-[#e3c50f]"
          >
            <Link href="/projects/metro">Explore Projects</Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto rounded-full px-8 py-5 border-[var(--primary)] text-white hover:bg-[var(--primary)] focus:bg-primary focus:text-foreground hover:text-[var(--foreground)]"
          >
            <Link href="/brochure.pdf" target="_blank">
              Download Brochure
            </Link>
          </Button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--primary)] opacity-75 animate-bounce"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </motion.div>
    </section>
  );
}
