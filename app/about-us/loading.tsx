"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <div className="w-full">
      {/* === HERO SECTION === */}
      <section className="relative w-full h-[100vh] flex flex-col justify-center px-6 md:px-10 bg-neutral-950">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/70 to-black" />

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-6">
          {/* Badge */}
          <Skeleton className="w-24 h-6 rounded-full bg-neutral-800" />

          {/* Title Lines */}
          <div className="space-y-3 mt-8">
            <Skeleton className="w-3/4 h-10 rounded-md bg-neutral-800" />
            <Skeleton className="w-2/3 h-10 rounded-md bg-neutral-800" />
          </div>

          {/* Paragraph */}
          <Skeleton className="w-2/3 h-5 rounded-md bg-neutral-800/80 mt-8" />

          {/* Buttons */}
          <div className="flex gap-4 mt-10">
            <Skeleton className="w-40 h-12 rounded-full bg-neutral-800" />
            <Skeleton className="w-40 h-12 rounded-full bg-neutral-800" />
          </div>
        </div>
      </section>

      {/* === BUSINESS VERTICALS === */}
      <section className="py-16 px-6 md:px-10 bg-[var(--main-background)]">
        <div className="flex justify-center mb-10">
          <Skeleton className="h-8 w-48 rounded-md bg-neutral-300/40" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-48 rounded-xl bg-neutral-300/40 shadow-sm"
            />
          ))}
        </div>
      </section>

      {/* === CORE VALUES === */}
      <section className="py-16 px-6 bg-[var(--main-background)] flex flex-col items-center">
        <Skeleton className="h-8 w-44 rounded-md bg-neutral-300/40 mb-10" />

        {/* Icons Row */}
        <div className="flex gap-6 justify-center flex-wrap max-w-3xl">
          {[...Array(9)].map((_, i) => (
            <Skeleton
              key={i}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-neutral-300/50"
            />
          ))}
        </div>

        {/* Center Description */}
        <Skeleton className="mt-10 w-80 h-28 rounded-3xl bg-neutral-300/30" />
      </section>

      {/* === VISION & MISSION === */}
      <section className="py-20 px-6 md:px-10 bg-[var(--main-background)] flex flex-col items-center">
        <Skeleton className="h-8 w-48 rounded-md bg-neutral-300/40 mb-10" />

        {/* Line and Icons (desktop only) */}
        <div className="hidden md:flex items-center justify-center gap-8 mb-12">
          <Skeleton className="w-16 h-16 rounded-full bg-neutral-300/50" />
          <div className="w-24 h-[3px] bg-gradient-to-r from-[var(--primary)] to-[#ED3237] rounded-full" />
          <Skeleton className="w-16 h-16 rounded-full bg-neutral-300/50" />
        </div>

        {/* Vision + Mission Cards */}
        <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
          {[...Array(2)].map((_, i) => (
            <Skeleton
              key={i}
              className="w-[90%] md:w-[420px] h-[220px] rounded-2xl border border-[var(--border)] bg-neutral-300/40"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
