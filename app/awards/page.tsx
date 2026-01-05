"use client";

import Image from "next/image";
import { awardsData } from "@/data/about-page-data";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* === HERO SECTION === */}
      <div className="relative w-full h-[100vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero/awards-bg.jpg"
            alt="Awards Background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
        </div>

        {/* Hero Text */}
        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-[var(--primary)] drop-shadow-[0_4px_20px_rgba(242,211,19,0.8)] mb-4"
          >
            Awards & Accolades
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-white text-base md:text-lg"
          >
            Celebrating milestones of excellence, innovation, and leadership that define our legacy.
          </motion.p>
        </div>

        {/* Scroll Down Icon */}
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
      </div>

      {/* === AWARDS GRID SECTION === */}
      <div className="relative bg-[var(--main-background)] w-full py-20 px-4 md:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {awardsData.map((award, i) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="
                group relative bg-[var(--card)] border border-[var(--border)]
                rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:-translate-y-2
                transition-all duration-500
              "
            >
              {/* Image Wrapper */}
              <div className="relative flex justify-center w-full aspect-[4/4] overflow-hidden">
                <Image
                  src={award.image}
                  alt={award.description}
                  fill
                  className="object-fill transform group-hover:scale-105 transition-transform duration-500 p-5"
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                         33vw"
                />

                {/* Hover Overlay */}
                <div
                  className="
                    absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/85
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    hidden md:flex flex-col justify-end text-left p-6
                  "
                >
                  <p className="text-white text-sm leading-relaxed line-clamp-4">
                    {award.description}
                  </p>
                </div>
              </div>

              {/* Mobile Description */}
              <div className="block md:hidden p-5 space-y-2 text-left">
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed text-justify">
                  {award.description}
                </p>
              </div>

              {/* Bottom Gradient Accent */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--primary)] via-[#ED3237] to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
