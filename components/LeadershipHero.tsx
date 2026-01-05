"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { leaders } from "@/data/about-page-data";

export default function LeadershipHero() {
  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-black">
      {/* --- Background Layout --- */}
      <div className="absolute inset-0 flex justify-center items-center">
        {/* Left small image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hidden md:block relative w-[30%] md:w-[25%] h-[70%] rounded-2xl overflow-hidden mx-2 md:mx-4"
        >
          <Image
            src={leaders[1]?.image || "/images/leader1.jpg"}
            alt={leaders[1]?.name || "Leader"}
            fill
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        {/* Center big image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative w-full md:w-[35%] h-[85%] rounded-2xl overflow-hidden mx-2 md:mx-6 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
        >
          <Image
            src={leaders[0]?.image || "/images/leader2.jpg"}
            alt={leaders[0]?.name || "Leader"}
            fill
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        {/* Right small image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative hidden md:block w-[30%] md:w-[25%] h-[70%] rounded-2xl overflow-hidden mx-2 md:mx-4"
        >
          <Image
            src={leaders[2]?.image || "/images/leader3.jpg"}
            alt={leaders[2]?.name || "Leader"}
            fill
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </div>

      {/* --- Overlay Gradient (for depth) --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/30 to-black" />

      {/* --- Text Content --- */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-[var(--primary)] drop-shadow-[0_4px_20px_rgba(242,211,19,0.8)] mb-4"
          >
            Our Leadership
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-white text-base md:text-lg"
          >
            Visionaries leading JKumar’s growth with innovation, discipline, and dedication.
          </motion.p>
      </div>

      {/* --- Animated Arrow --- */}
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
    </section>
  );
}
