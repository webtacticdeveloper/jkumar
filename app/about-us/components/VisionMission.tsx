"use client";

import { missionVision } from "@/data/about-page-data";
import SectionTitle from "./SectionTitle";
import { motion } from "framer-motion";

export default function VisionMission() {
  const VisionIcon = missionVision[0].Icon;
  const MissionIcon = missionVision[1].Icon;

  return (
    <section className="relative w-full bg-accent py-20 px-6 md:px-10 overflow-hidden">
      {/* Section Title */}
      <div className="max-w-7xl mx-auto text-center">
        <SectionTitle white title="Vision & Mission" />
      </div>

      {/* --- Main Layout --- */}
      <div className="relative flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto mt-16 gap-12 md:gap-16">
        {/* --- Vision Card --- */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-[var(--card)] border border-[var(--border)]
                     rounded-r-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                     px-6 md:px-10 py-10 max-w-[460px] text-center md:text-right"
        >
          {/* Icon (right side for Vision) */}
          <div className="hidden md:flex absolute -right-10 top-1/2 -translate-y-1/2 z-20">
            <div
              className="relative w-16 h-16 flex items-center justify-center 
                            rounded-full border-4 border-[var(--card)] 
                            bg-[var(--primary)] shadow-[0_0_20px_rgba(242,211,19,0.4)]"
            >
              <VisionIcon className="w-7 h-7 text-[var(--foreground)]" />
            </div>
          </div>

          {/* Mobile icon (top center) */}
          <div className="md:hidden flex justify-center mb-6">
            <div
              className="w-14 h-14 flex items-center justify-center 
                            rounded-full border-4 border-[var(--card)] 
                            bg-[var(--primary)] shadow-[0_0_20px_rgba(242,211,19,0.4)]"
            >
              <VisionIcon className="w-7 h-7 text-[var(--foreground)]" />
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-3">
            {missionVision[0].name}
          </h3>
          <p className="text-[var(--muted-foreground)] text-sm md:text-base leading-relaxed">
            {missionVision[0].description}
          </p>

          {/* Accent bar */}
          <div
            className="absolute top-0 left-0 w-[4px] h-full 
                          bg-gradient-to-b from-[var(--primary)] to-[#ED3237] rounded-l-xl"
          />
        </motion.div>

        {/* --- Center Connecting Icons & Line (only on desktop) --- */}
        <div className="hidden md:flex items-center justify-center gap-4 relative">
          {/* Connecting line */}
          <div className="w-24 h-[3px] bg-gradient-to-r from-[var(--primary)] to-[#ED3237] rounded-full z-10" />
        </div>

        {/* --- Mission Card --- */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-[var(--card)] border border-[var(--border)]
                     rounded-l-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                     px-6 md:px-10 py-10 max-w-[460px] text-center md:text-left"
        >
          {/* Icon (left side for Mission) */}
          <div className="hidden md:flex absolute -left-10 top-1/2 -translate-y-1/2 z-20">
            <div
              className="relative w-16 h-16 flex items-center justify-center 
                            rounded-full border-4 border-[var(--card)] 
                            bg-[#ED3237] shadow-[0_0_20px_rgba(237,50,55,0.4)]"
            >
              <MissionIcon className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Mobile icon (top center) */}
          <div className="md:hidden flex justify-center mb-6">
            <div
              className="w-14 h-14 flex items-center justify-center 
                            rounded-full border-4 border-[var(--card)] 
                            bg-[#ED3237] shadow-[0_0_20px_rgba(237,50,55,0.4)]"
            >
              <MissionIcon className="w-7 h-7 text-white" />
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-3">
            {missionVision[1].name}
          </h3>
          <p className="text-[var(--muted-foreground)] text-sm md:text-base leading-relaxed">
            {missionVision[1].description}
          </p>

          {/* Accent bar */}
          <div
            className="absolute top-0 right-0 w-[4px] h-full 
                          bg-gradient-to-b from-[#ED3237] to-[var(--primary)] rounded-r-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
