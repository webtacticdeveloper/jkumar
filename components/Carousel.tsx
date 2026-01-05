/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState,useEffect, useRef, useCallback } from "react";
import Link from "next/link";

// Data for the carousel slides.
const slidesData = [
  { id: "metro", title: "Metro", imageUrl: "/images/metro/1761296408714-metro1.jpg" },
  { id: "flyovers", title: "Flyovers", imageUrl: "/images/flyovers/1761406809389-home-flyover.jpg" },
  { id: "bridges", title: "Bridges", imageUrl: "/images/bridges/1761641394117-home-bridges1.jpg" },
  { id: "roads", title: "Roads", imageUrl: "/images/roads/1761732119877-home-roads1.jpg" },
  { id: "urban-infra", title: "Urban Infra", imageUrl: "/images/urban-infra/1761743358627-JKI_0857.jpg" },
  { id: "sky-walks", title: "Sky Walks", imageUrl: "/images/sky-walks/1761800803511-skywalk3.jpg" },
  { id: "dams-and-canals", title: "Dams & Canals", imageUrl: "/images/dams-and-canals/1761803677717-DAM_NEW2.jpg" },
];

// Debounce function for resize events
function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function App() {
  const [activeSlideId, setActiveSlideId] = useState("metro");
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const navigationRef = useRef<HTMLDivElement>(null);
  const baselineRef = useRef<HTMLDivElement>(null);
  const [baselineTop, setBaselineTop] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // const activeSlide = useMemo(() => slidesData.find((s) => s.id === activeSlideId), [activeSlideId]);

  const updateBaselineY = useCallback(() => {
    if (!navigationRef.current || !baselineRef.current) return;

    const nav = navigationRef.current;
    const activeLabel =
      (nav.querySelector(`[data-slide="${activeSlideId}"] .nav-label`) as HTMLElement) ||
      (nav.querySelector(".nav-label") as HTMLElement);

    if (!activeLabel) return;

    const navRect = nav.getBoundingClientRect();
    const labelRect = activeLabel.getBoundingClientRect();
    const baselineHeight = baselineRef.current.offsetHeight || 3;

    const top = labelRect.bottom - navRect.top - baselineHeight;
    setBaselineTop(top);
  }, [activeSlideId]);

  useEffect(() => {
    if (isMobile) return;
    const t = setTimeout(() => updateBaselineY(), 0);
    return () => clearTimeout(t);
  }, [updateBaselineY, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const debounced = debounce(updateBaselineY, 100);
    window.addEventListener("resize", debounced);
    return () => window.removeEventListener("resize", debounced);
  }, [updateBaselineY, isMobile]);

  const handleNavigationScroll = useCallback(() => {
    if (!navigationRef.current || !isMobile) return;

    const navigationBar = navigationRef.current;
    const activeNavItem = navigationBar.querySelector(`[data-slide="${activeSlideId}"]`) as HTMLElement;

    if (navigationBar && activeNavItem) {
      const navBarRect = navigationBar.getBoundingClientRect();
      const activeItemRect = activeNavItem.getBoundingClientRect();

      const scrollLeft =
        activeItemRect.left - navBarRect.left - navBarRect.width / 2 + activeItemRect.width / 2;

      navigationBar.scrollTo({
        left: navigationBar.scrollLeft + scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeSlideId, isMobile]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 790);
    };
    checkMobile();
    const debouncedResize = debounce(checkMobile, 100);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const t = setTimeout(() => handleNavigationScroll(), 100);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => updateBaselineY(), 0);
      return () => clearTimeout(t);
    }
  }, [activeSlideId, isMobile, handleNavigationScroll, updateBaselineY]);

  // Auto slide logic
  useEffect(() => {
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        setActiveSlideId((currentId) => {
          const currentIndex = slidesData.findIndex((slide) => slide.id === currentId);
          const nextIndex = (currentIndex + 1) % slidesData.length;
          return slidesData[nextIndex].id;
        });
      }, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering]);

  const handleNavHover = (slideId: string) => {
    setActiveSlideId(slideId);
    setHoveredItem(slideId);
  };

  const handleNavEnter = () => setIsHovering(true);
  const handleNavLeave = () => {
    setIsHovering(false);
    setHoveredItem(null);
  };
  const handleItemLeave = () => setHoveredItem(null);

  return (
    <div>
      <main className="bg-gray-900">
        <div className="relative w-full h-[70vh] md:h-[100vh] bg-black flex items-end justify-center overflow-hidden">
          {/* Background Image */}
          {slidesData.map((slide) => (
            <div
              key={slide.id}
              aria-hidden={activeSlideId !== slide.id}
              className={`absolute inset-0 w-full h-full bg-center transition-opacity bg-cover md:bg-none md:bg-size-[100%_100%] duration-1000 ease-in-out ${
                activeSlideId === slide.id ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${slide.imageUrl})`}}
            />
          ))}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Main Content */}
          <div className="relative w-full max-w-7xl mx-auto p-4 md:p-8 z-5">
            <div className="flex flex-col items-center text-center">
              {/* Navigation Bar */}
              <div className="w-full mt-8">
                <div
                  ref={navigationRef}
                  className={`relative ${isMobile ? "overflow-x-auto scrollbar-hide px-4 pb-3" : ""}`}
                  onMouseEnter={handleNavEnter}
                  onMouseLeave={handleNavLeave}
                >
                  <div
                    className={`${
                      isMobile ? "inline-flex gap-x-2" : "flex flex-wrap justify-center gap-x-2"
                    } relative z-5`}
                  >
                    {slidesData.map((slide) => {
                      const isActive = activeSlideId === slide.id;
                      const isHovered = hoveredItem === slide.id;

                      return (
                        <div
                          key={slide.id}
                          data-slide={slide.id}
                          onMouseEnter={() => handleNavHover(slide.id)}
                          onMouseLeave={handleItemLeave}
                          className={`relative cursor-pointer py-3 px-1 sm:px-2 tablet:px-3 text-xs sm:text-sm tablet:text-base lg:text-lg font-semibold uppercase tracking-wider transition-colors duration-300 ${
                            isMobile ? "flex-shrink-0 min-w-fit" : "whitespace-nowrap"
                          } ${isActive || isHovered ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400"}`}
                        >
                          {/* Link wraps text only */}
                          <Link href={`/projects/${slide.id}`} className="relative inline-block pb-1 nav-label">
                            {slide.title}

                            {/* Yellow active line */}
                            <span
                              className={`absolute left-0 bottom-0 h-[3px] tablet:h-[4px] w-full transition-all duration-300 ease-out ${
                                isActive || isHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                              }`}
                              style={{
                                zIndex: 20,
                                borderRadius: "2px",
                                transformOrigin: "center",
                                background:
                                  "radial-gradient(ellipse at center, rgba(255,215,0,1) 0%, rgba(255,215,0,0.6) 40%, rgba(255,215,0,0.2) 70%, transparent 100%)",
                              }}
                            />

                            {/* White underline (mobile only) */}
                            {isMobile && (
                              <span
                                className="absolute left-0 bottom-0 h-[3px] tablet:h-[4px] w-full opacity-100"
                                style={{
                                  zIndex: 5,
                                  borderRadius: "2px",
                                  background:
                                    "radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.2) 70%, transparent 100%)",
                                }}
                              />
                            )}
                          </Link>
                        </div>
                      );
                    })}
                  </div>

                  {/* Global white baseline: desktop only */}
                  {!isMobile && (
                    <div
                      ref={baselineRef}
                      className="pointer-events-none absolute left-0 h-[3px] tablet:h-[4px] z-0 w-full"
                      style={{
                        top: `${baselineTop}px`,
                        background:
                          "radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.2) 70%, transparent 100%)",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
