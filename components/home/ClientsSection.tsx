/* eslint-disable @next/next/no-img-element */
import SectionMotion from "./SectionMotion";
import { Marquee } from "@/components/ui/marquee"; // your marquee
import SectionTitle from "@/app/about-us/components/SectionTitle";
// No MarqueeContent, MarqueeItem, MarqueeFade (your version doesn't use those)

export default function ClientsSection() {
  const clients = [
    "/clients/clientlogo_1.webp",
    "/clients/clientlogo_2.webp",
    "/clients/clientlogo_3.webp",
    "/clients/clientlogo_4.webp",
    "/clients/clientlogo_5.webp",
    "/clients/clientlogo_6.webp",
    "/clients/clientlogo_7.webp",
    "/clients/clientlogo_8.webp",
    "/clients/clientlogo_9.webp",
    "/clients/clientlogo_10.webp",
    "/clients/clientlogo_11.webp",
    "/clients/clientlogo_12.webp",
    "/clients/clientlogo_13.webp",
    "/clients/clientlogo_14.webp",
  ];

  const firstRow = clients.slice(0, 7);
  const secondRow = clients.slice(7, 14);

  return (
    <SectionMotion>
      <section className="py-20 px-6 md:px-16 bg-white">
        <SectionTitle title="Our Client" />

        {/* -------- Row 1: LEFT direction (1–7) -------- */}
        <Marquee speed={30} pauseOnHover direction="left" className="my-2">
          {firstRow.map((logo, i) => (
            <div
              key={`row-1-${i}`}
              className="mx-5 opacity-80 hover:opacity-100 transition"
            >
              <div className="relative w-28 h-28 md:w-36 md:h-36">
                <img
                  src={logo}
                  alt="Client Logo"
                  className="absolute inset-0 w-full h-full object-contain border-2 rounded-2xl shadow-2xl"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </Marquee>

        {/* -------- Row 2: RIGHT direction (8–14) -------- */}
        <Marquee speed={30} pauseOnHover direction="right" className="my-5">
          {secondRow.map((logo, i) => (
            <div
              key={`row-2-${i}`}
              className="mx-5 opacity-80 hover:opacity-100 transition"
            >
              <div className="relative w-28 h-28 md:w-36 md:h-36">
                <img
                  src={logo}
                  alt="Client Logo"
                  className="absolute inset-0 w-full h-full object-contain border-2 rounded-2xl shadow-2xl"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </Marquee>
      </section>
    </SectionMotion>
  );
}
