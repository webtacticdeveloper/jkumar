"use client";
import SectionTitle from "@/app/about-us/components/SectionTitle";
import { useScroll, useTransform, motion } from "motion/react";
// import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="max-w-[90rem] mx-5 md:mx-auto bg-[var(--main-background)] text-[var(--foreground)] py-10 border-t-2"
    >
      {/* --- Hero Section (100vh with image overlay + motion) --- */}
      <SectionTitle title="Company History"/>

      {/* --- Timeline Section --- */}
      <section className="relative max-w-7xl mx-auto">
        <div ref={ref}>
          {data.map((item, index) => (
            <div
              key={index}
              className="flex justify-start pt-10 md:pt-20 md:gap-10"
            >
              {/* --- Year + Dot (Sticky) --- */}
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[var(--main-background)] flex items-center justify-center shadow-[0_0_25px_rgba(242,211,19,0.4)]">
                  <div className="h-4 w-4 rounded-full bg-[var(--primary)] border border-[var(--primary)]" />
                </div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-[var(--foreground)]/25">
                  {item.title}
                </h3>
              </div>

              {/* --- Content Box --- */}
              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-[var(--primary)]">
                  {item.title}
                </h3>
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] transition-all duration-500">
                  {item.content}
                </div>
              </div>
            </div>
          ))}

          {/* --- Scroll Progress Line --- */}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] 
              bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]
              from-transparent via-[var(--primary)]/30 to-transparent
              [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] 
                bg-gradient-to-t from-[var(--primary)] via-[#ED3237] to-transparent rounded-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
