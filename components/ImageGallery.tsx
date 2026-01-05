/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Thumbs,
  Zoom,
  Keyboard,
  Mousewheel,
  Pagination,
} from "swiper/modules";

import SwiperCore from "swiper";
// eslint-disable-next-line react-hooks/rules-of-hooks
SwiperCore.use([Navigation, Thumbs, Zoom, Keyboard, Mousewheel, Pagination]);


interface ImageGalleryProps {
  images: string[];
  altPrefix?: string;
  className?: string;
  projectTitle?: string; // caption / title for the viewer
  captions?: (string | null)[]; // optional array of captions per image
}

export default function ImageGallery({
  images,
  altPrefix = "Gallery image",
  className = "",
  projectTitle,
  captions = [],
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [thumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const mainSwiperRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // open / close
  const openAt = useCallback((index: number) => {
    setActiveIndex(index);
    setSelectedIndex(index);
    // allow next tick for swiper to init
    setTimeout(() => {
      // go to slide if instance exists
      if (mainSwiperRef.current?.swiper) {
        mainSwiperRef.current.swiper.slideTo(index, 0);
      }
    }, 50);
  }, []);

  const closeGallery = useCallback(() => {
    setSelectedIndex(null);
    // enable body scroll again
    document.body.style.overflow = "";
  }, []);

  // next / prev controls
  const showNext = useCallback(() => {
    if (mainSwiperRef.current?.swiper) mainSwiperRef.current.swiper.slideNext();
  }, []);

  const showPrev = useCallback(() => {
    if (mainSwiperRef.current?.swiper) mainSwiperRef.current.swiper.slidePrev();
  }, []);

  // key handling
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, closeGallery, showNext, showPrev]);

  // disable scroll while open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedIndex]);

  // Wheel to zoom handler (desktop) — gentle zoom in/out
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let accumulating = 0;
    const onWheel = (e: WheelEvent) => {
      if (selectedIndex === null) return;
      // if user holds ctrl or meta — treat as zoom
      // or if vertical wheel and pointer inside, we zoom to mimic Google Photos
      e.preventDefault();
      const swiper = mainSwiperRef.current?.swiper;
      if (!swiper || !swiper.zoom) return;

      // accumulate wheel so we don't zoom too abruptly
      accumulating += e.deltaY;
      // Zoom out if deltaY > 0, zoom in if < 0
      if (accumulating > 50) {
        swiper.zoom.out();
        accumulating = 0;
      } else if (accumulating < -50) {
        swiper.zoom.in();
        accumulating = 0;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [selectedIndex]);

  return (
    <>
      {/* Image Grid (small preview images use next/image for optimization) */}
      <div className={cn("grid md:grid-cols-3 gap-6 md:gap-8", className)}>
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => openAt(i)}
            className="relative group overflow-hidden rounded-xl border border-[var(--border)]
            hover:border-[var(--primary)] transition cursor-pointer shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
          >
            <Image
              src={img}
              alt={`${altPrefix} ${i + 1}`}
              width={800}
              height={600}
              className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox (Swiper powered) */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed h-full inset-0 z-[99999] flex items-center justify-center bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={containerRef}
          >
            {/* Close */}
            <button
              aria-label="Close gallery"
              onClick={closeGallery}
              className="absolute cursor-pointer top-5 right-5 z-[999999] text-white hover:text-[var(--primary)] transition"
            >
              <X size={34} />
            </button>

            {/* Prev */}
            <button
              aria-label="Previous image"
              onClick={showPrev}
              className={cn("absolute cursor-pointer left-4 md:left-8 z-[999999] text-white hover:text-[var(--primary)] transition",activeIndex===0?"hidden":"block")}
            >
              <ChevronLeft size={50} />
            </button>

            {/* Next */}
            <button
              aria-label="Next image"
              onClick={showNext}
              className={cn("absolute cursor-pointer right-4 md:right-8 z-[999999] text-white hover:text-[var(--primary)] transition",activeIndex===images.length-1?"hidden":"block")}
            >
              <ChevronRight size={50} />
            </button>

            {/* Title & Caption */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[999998] max-w-[90vw] text-center">
              {projectTitle && (
                <div className="text-white text-lg md:text-xl font-semibold drop-shadow">
                  {projectTitle}
                </div>
              )}
              {captions[activeIndex] && (
                <div className="text-white/80 text-sm md:text-base mt-1">
                  {captions[activeIndex]}
                </div>
              )}
            </div>

            {/* MAIN SWIPER */}
            <div className="w-full h-full flex flex-col items-center justify-center px-4">
              <div className="max-w-[98vw] w-full max-h-[92vh]">
                <Swiper
                  onSwiper={(s) => (mainSwiperRef.current = { swiper: s })}
                  initialSlide={activeIndex}
                  onSlideChange={(s) => {
                    setActiveIndex(s.activeIndex);
                    // sync thumbs
                    if (thumbsSwiper && !thumbsSwiper.destroyed) {
                      try {
                        thumbsSwiper.slideTo(s.activeIndex);
                      } catch {}
                    }
                  }}
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation={false}
                  zoom={{ maxRatio: 3, minRatio: 1 }}
                  keyboard={{ enabled: true }}
                  mousewheel={{ forceToAxis: true }}
                  pagination={{ clickable: true }}
                  thumbs={{ swiper: thumbsSwiper }}
                  centeredSlides={true}
                  grabCursor={true}
                  className="h-[92vh] flex items-center justify-center"
                >
                  {images.map((src, idx) => (
                    <SwiperSlide key={idx} className="flex items-center justify-center">
                      {/* Swiper zoom container expects a child with class 'swiper-zoom-container' */}
                      <div className="swiper-zoom-container w-full h-full flex items-center justify-center">
                        {/* Use native img here so swiper zoom / pinch works perfectly */}
                        <img
                          src={src}
                          alt={`${altPrefix} ${idx + 1}`}
                          className="max-h-[95vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
                          draggable={false}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
