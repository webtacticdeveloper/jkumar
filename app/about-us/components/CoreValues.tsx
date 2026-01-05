"use client";

import { useRef, useState } from "react";
import { values } from "@/data/about-page-data";
import SectionTitle from "./SectionTitle";
import { motion, useInView } from "framer-motion";

export default function CoreValues() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true });

  // Mobile / tablet active card
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="core-values"
      className="
        relative bg-[var(--main-background)]
        px-6 md:px-12 py-20
        max-w-[90rem]
        mx-5 md:mx-auto
        border-y-2
      "
    >
      <SectionTitle title="Core Values" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-12">
        {values.map((val, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={val.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group perspective-1000"
              onClick={() => handleClick(index)}
            >
              {/* 3D wrapper */}
              <div
                className={`
                  relative w-full h-[220px]
                  transition-transform duration-700 ease-out
                  ${isActive ? "[transform:rotateY(180deg)]" : ""}
                `}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* FRONT */}
                <div
                  className="
                    absolute inset-0 rounded-2xl
                    bg-[var(--card)]
                    border border-[var(--border)]
                    shadow-md
                    flex flex-col items-center justify-center
                    transition-transform duration-700
                    group-hover:[transform:rotateY(180deg)]
                  "
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div
                    className="
                      w-16 h-16 rounded-full
                      bg-[var(--primary)]
                      flex items-center justify-center
                      mb-4
                    "
                  >
                    <val.Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-sm md:text-base font-semibold text-[var(--foreground)] text-center px-4">
                    {val.name}
                  </h3>

                  <span className="mt-2 text-xs text-[var(--muted-foreground)]">
                    Tap / Hover
                  </span>
                </div>

                {/* BACK */}
                <div
                  className="
                    absolute inset-0 rounded-2xl
                    bg-gradient-to-br from-primary via-primary to-accent
                    shadow-xl
                    flex flex-col items-center justify-center
                    px-5 text-center
                    transition-transform duration-700
                    [transform:rotateY(-180deg)]
                    group-hover:[transform:rotateY(0deg)]
                  "
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-4">
                    <val.Icon className="w-7 h-7 text-primary-foreground" />
                  </div>

                  <h3 className="text-base font-semibold text-primary-foreground mb-3">
                    {val.name}
                  </h3>

                  <p className="text-xs text-primary-foreground/90 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
