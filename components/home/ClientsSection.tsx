import Image from "next/image";
import SectionMotion from "./SectionMotion";
import { Marquee } from "@/components/ui/marquee"; // your marquee
import SectionTitle from "@/app/about-us/components/SectionTitle";
// No MarqueeContent, MarqueeItem, MarqueeFade (your version doesn't use those)

export default function ClientsSection() {
  const clients = [
    "/clients/clientlogo_1.png",
    "/clients/clientlogo_2.png",
    "/clients/clientlogo_3.png",
    "/clients/clientlogo_4.png",
    "/clients/clientlogo_5.png",
    "/clients/clientlogo_6.png",
    "/clients/clientlogo_7.png",
    "/clients/clientlogo_8.png",
    "/clients/clientlogo_9.png",
    "/clients/clientlogo_10.png",
    "/clients/clientlogo_11.png",
    "/clients/clientlogo_12.png",
    "/clients/clientlogo_13.png",
    "/clients/clientlogo_14.png",
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
                <Image
                  src={logo}
                  alt="Client Logo"
                  fill
                  className="object-contain border-2 rounded-2xl shadow-2xl"
                  sizes="140px"
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
                <Image
                  src={logo}
                  alt="Client Logo"
                  fill
                  className="object-contain border-2 rounded-2xl shadow-2xl"
                  sizes="140px"
                />
              </div>
            </div>
          ))}
        </Marquee>
      </section>
    </SectionMotion>
  );
}
