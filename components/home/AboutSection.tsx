/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import SectionMotion from "./SectionMotion";

export default function AboutSection() {
  return (
    <SectionMotion>
      <section className="relative bg-background py-20 px-6 md:px-16  overflow-hidden">
        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="backdrop-blur-[2px] md:backdrop-blur-0">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              About Us
            </h2>

            <p className="text-gray-800 md:text-gray-700 leading-relaxed text-justify text-lg mb-6">
              J. Kumar Infraprojects Limited was founded in 1980 by Mr.
              Jagdishkumar M. Gupta. Over the years, we have established
              ourselves as one of the leading infrastructure companies in India.
              We have gained expertise in various construction techniques and
              have executed challenging projects including underground and
              elevated Metro, Irrigation Projects, Diaphragm walls, Tunnelling,
              Creek and River structures.
            </p>

            <Link
              href="/about-us"
              className="inline-block px-6 py-3 bg-[var(--primary)] text-white rounded-full shadow hover:bg-[var(--primary-hover)] transition"
            >
              Know More →
            </Link>
          </div>

          {/* ========== DESKTOP IMAGE WITH YELLOW BLOCK ========== */}
          <div className="relative w-full h-[380px] md:h-[480px] block">
            {/* Yellow Block */}
            <div className="absolute inset-0 translate-x-[-20px] translate-y-[20px] bg-black/90 rounded-md"></div>

            {/* Main Image */}
            <div className="absolute inset-0 rounded-md overflow-hidden shadow-xl">
              <img
                src="/hero/hero-about.webp"
                alt="About J Kumar"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>
    </SectionMotion>
  );
}
