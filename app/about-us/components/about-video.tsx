"use client";
import React from "react";

interface AboutVideoProps {
  title?: string;
  subtitle?: string;
  videoId: string; // YouTube video ID only
}

export default function AboutVideo({
  title = "Corporate Video",
  subtitle = "A glimpse into our vision, values, and achievements that shape our journey.",
  videoId,
}: AboutVideoProps) {
  return (
    <section className="relative w-full bg-[var(--main-background)] text-[var(--foreground)] py-20 px-4 md:px-8 lg:px-10 overflow-hidden">
      {/* --- Subtle Background Accent --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--main-background)] via-black/20 to-[var(--main-background)] opacity-80 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto text-center space-y-12 z-10">
        {/* --- Title --- */}
        <div>
          <div className="relative flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-14 md:w-16 bg-gradient-to-r via-primary to-primary" />
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight capitalize text-black text-center">
              {title}
            </h2>
            <div className="h-[2px] w-14 md:w-16 bg-gradient-to-r via-primary from-primary" />
            <div className="absolute left-1/2 -bottom-3 w-24 h-[1px] -translate-x-1/2 bg-[var(--primary)]/30 rounded-full" />
          </div>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* --- Video Frame --- */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--border)] shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          {/* Video Overlay Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,211,19,0.2)_0%,transparent_70%)] blur-[40px] z-[1]" />
          <iframe
            className="absolute inset-0 w-full h-full rounded-2xl z-[2]"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=white&showinfo=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
