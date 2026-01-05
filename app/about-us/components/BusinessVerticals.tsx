/* eslint-disable @next/next/no-img-element */
"use client";

import SectionTitle from "./SectionTitle";
import { verticals } from "@/data/about-page-data";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export default function BusinessVerticals() {
  const verticalsRef = useRef<HTMLElement | null>(null);
  const verticalsInView = useInView(verticalsRef, { once: true });

  // 👉 Active card for mobile/tablet tap
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={verticalsRef}
      id="business-verticals"
      className="
        relative flex flex-col items-center justify-center
        bg-accent
        px-6 md:px-10 pb-16
      "
    >
      {/* Top Divider */}
      <div className="w-full max-w-[90rem] border-t-2 border-border/40 pb-20 mx-auto" />

      <SectionTitle title="Business Verticals" white />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
        {verticals.map((vertical, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={vertical.name}
              initial={{ opacity: 0, y: 40 }}
              animate={verticalsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group perspective-1000"
              onClick={() => handleCardClick(index)}
            >
              {/* 3D Container */}
              <div
                className={`
                  relative w-full h-[320px]
                  transition-transform duration-700 ease-out
                  ${isActive ? "[transform:rotateY(180deg)]" : ""}
                `}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* FRONT */}
                <div
                  className="
                    absolute inset-0 rounded-2xl overflow-hidden shadow-xl
                    transition-transform duration-700 ease-out
                    group-hover:[transform:rotateY(180deg)]
                  "
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={vertical.src}
                    alt={vertical.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <img
                          src={vertical.icon}
                          alt={`${vertical.name} icon`}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                    </div>

                    <h3 className="text-xl font-bold text-card mb-2">
                      {vertical.name}
                    </h3>

                    <p className="text-card/60 text-sm">
                      Tap or hover to explore
                    </p>
                  </div>
                </div>

                {/* BACK */}
                <div
                  className="
                    absolute inset-0 rounded-2xl overflow-hidden shadow-xl
                    bg-gradient-to-br from-primary via-primary to-accent
                    transition-transform duration-700 ease-out
                    [transform:rotateY(-180deg)]
                    group-hover:[transform:rotateY(0deg)]
                  "
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center">
                    <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-primary-foreground/30 rounded-tl-xl" />
                    <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-primary-foreground/30 rounded-br-xl" />

                    <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-6">
                      <img
                        src={vertical.icon}
                        alt={`${vertical.name} icon`}
                        className="w-8 h-8 object-contain"
                      />
                    </div>

                    <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                      {vertical.name}
                    </h3>

                    <p className="text-primary-foreground/90 text-sm mb-6">
                      {vertical.description}
                    </p>

                    <Link
                      href={vertical.href}
                      className="
                        px-6 py-2 rounded-full font-semibold
                        bg-primary-foreground text-primary
                        hover:bg-primary-foreground/90
                        transition-colors duration-300
                      "
                    >
                      View Projects
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
