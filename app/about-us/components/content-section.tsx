"use client";
import React, { useState } from "react";
import SectionTitle from "./SectionTitle";
import { motion, AnimatePresence } from "framer-motion";

const ContentSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-7xl  mx-5 md:mx-auto py-20">
      <SectionTitle title="About Us" />

      {/* Always visible content */}
      <p className="text-justify text-[var(--muted-foreground)] leading-relaxed">
        J. Kumar Infraprojects Limited was founded in 1980 by Mr. Jagdishkumar
        M. Gupta. Over the years, we have established ourselves as one of the
        leading infrastructure companies in India. We have gained expertise in
        various construction techniques and have executed challenging
        projects.We have expertise in building complex infrastructure projects
        involving underground and elevated Metro, Irrigation Projects, Diaphragm
        walls, Tunnelling, Creek and River structures and have built a robust
        portfolio of accomplishments. We have been involved in numerous
        prestigious projects across India and have established a strong
        reputation for delivering high-quality infrastructure solutions. We have
        worked on projects funded by various government bodies, including The
        National Highways Authority of India (NHAI), The Mumbai Metropolitan
        Region Development Authority (MMRDA), Delhi Metro Rail Corporation
        (DMRC) and the Maharashtra State Road Development Corporation (MSRDC),
        Ahmedabad Metro, Surat Metro, Maha Metro, Cidco Metro, Pune Corporation,
        Mumbai Corporation, Thane Corporation, Pimpri Chinchwad Corporation
        ,Maharashtra State PWD, ESIC Corporation, Uttar Pradesh Rajkiya Nigam
        Limited ( UPRNL) , Central and Western Railways, Rail Vikas Nigam
        Limited ( RVNL ).
      </p>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="mt-6"
          >
            <br />

            <p className="text-justify text-[var(--muted-foreground)] leading-relaxed">
              We have a diverse range of capabilities and offers end-to-end
              construction services. Our expertise includes project planning,
              design, engineering, procurement, construction, project management
              and timely delivery of the project. We have a skilled workforce
              comprising engineers, project managers, and other professionals
              along with state of art plant, equipment and machineries to ensure
              the successful and timely execution of projects.
            </p>

            <br />

            <p className="text-justify text-[var(--muted-foreground)] leading-relaxed">
              The Company places a strong emphasis on quality, safety, and
              sustainability in its projects. We adhere to the highest standards
              of construction practices and ensure compliance with all relevant
              regulations. J. Kumar Infraprojects Limited is committed to
              delivering projects within stipulated timelines while maintaining
              the highest quality standards.
            </p>

            <br />

            <p className="text-justify text-[var(--muted-foreground)] leading-relaxed">
              Some notable projects undertaken by J. Kumar Infraprojects Limited
              include the construction of the Delhi Metro Rail Project, the
              Mumbai Metro Line 7, Line 2A, Line 2B, Line 4, Line 9, Line 6 and
              Underground Metro Line 3 and 7A , Cidco Metro Depot, stations and
              viaduct of about 6 KM, Delhi Metro Rail Corporation DC 08, Worli
              Shivdi Link Flyover, Santacruz Chembur Link Flyover, Airoli Creek,
              Kalwa Creek Bridges, Dwarka Express way, JNPT Construction
              Project. These projects have contributed significantly to the
              infrastructure development of Mumbai and have earned the Company
              recognition for its expertise and capabilities. We are a prominent
              construction Company in India with a strong track record of
              delivering high-quality infrastructure projects. Our commitment to
              excellence, safety, and sustainability have gained a trusted name
              in the industry.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show more / less button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="
            px-6 py-2 rounded-full
            border border-[var(--primary)]
            text-[var(--primary)]
            font-medium
            hover:bg-[var(--primary)]
            hover:text-white
            transition-all duration-300
          "
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default ContentSection;
