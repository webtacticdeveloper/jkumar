"use client";
import { leaders } from "@/data/about-page-data";
import Image from "next/image";
import { useState } from "react";

export default function AboutLeadership() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-[var(--main-background)] py-20 px-4 md:px-8 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="relative flex items-center justify-center gap-4 mb-4">
          <div className="h-[2px] w-14 md:w-16 bg-gradient-to-r via-primary to-primary" />
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight capitalize text-black text-center">
            J. Kumar Leadership
          </h2>
          <div className="h-[2px] w-14 md:w-16 bg-gradient-to-r via-primary from-primary" />
          <div className="absolute left-1/2 -bottom-3 w-24 h-[1px] -translate-x-1/2 bg-[var(--primary)]/30 rounded-full" />
        </div>
        <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Our leadership embodies vision, innovation, and integrity—driving
          JKumar towards excellence in infrastructure development across India.{" "}
        </p>
      </div>

      {/* --- Leadership Cards --- */}
      <div className="max-w-7xl mx-auto space-y-24">
        {leaders.map((leader, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* --- Image Panel --- */}
            <div className="relative w-full md:w-1/2 overflow-hidden rounded-2xl border border-[var(--border)] shadow-[0_10px_40px_rgba(0,0,0,0.25)] group">
              <Image
                src={leader.image}
                alt={leader.name}
                width={600}
                height={400}
                className="object-cover w-full h-[380px] rounded-2xl transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundSize: "100% 100%" }}
              />

              {/* --- Stronger Golden Overlay --- */}
              <div className="absolute bottom-0 left-0 w-full h-[25%] bg-gradient-to-t from-black via-black/80 to-transparent opacity-95" />

              {/* --- Glow Aura --- */}
              {/* <div className="absolute bottom-0 left-0 w-full h-[25%] bg-[radial-gradient(circle_at_center,rgba(242,211,19,0.5)_0%,transparent_70%)] blur-[25px]" /> */}

              {/* --- Text Overlay --- */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-primary">
                  {leader.name}
                </h3>
                <p className="text-sm uppercase tracking-wide text-white/90 font-medium">
                  {leader.designation}
                </p>
              </div>
            </div>

            {/* --- Description Panel --- */}
            <div className="w-full md:w-1/2 bg-[var(--card)]  rounded-2xl p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all duration-500">
              <p
                className={`text-[var(--muted-foreground)] text-justify leading-relaxed transition-all duration-500 ${
                  expandedIndex === index ? "line-clamp-none" : "line-clamp-4"
                }`}
              >
                {leader.description}
              </p>

              {/* Button */}
              <div className="mt-6">
                <button
                  onClick={() => toggleExpand(index)}
                  className="px-5 cursor-pointer py-2.5 rounded-full border border-[var(--primary)] text-[var(--primary)] text-sm font-medium hover:bg-[var(--primary)] hover:text-[var(--foreground)] transition-all duration-300"
                >
                  {expandedIndex === index ? "Show Less" : "Know More"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
