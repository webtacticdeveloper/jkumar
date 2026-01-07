/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectCategories } from "@/data/projectsData";
import SectionMotion from "./SectionMotion";
import Link from "next/link";
import SectionTitle from "@/app/about-us/components/SectionTitle";

export default function ProjectsFilterGrid() {
  const filters = ["All", ...projectCategories.map((cat) => cat.title)];
  const [active, setActive] = useState("All");
  const [showAll, setShowAll] = useState(false);

  // RESET show more when filter changes
  useEffect(() => {
    setShowAll(false);
  }, [active]);

  // BUILD PROJECT LIST
  const baseProjects =
    active === "All"
      ? projectCategories.flatMap((cat) => {
          const first = cat.projects[0]; // only 1 project per category
          return first ? [{ ...first, categoryId: cat.id }] : [];
        })
      : projectCategories
          .find((cat) => cat.title === active)
          ?.projects.slice(0, 6)
          .map((p) => ({
            ...p,
            categoryId:
              projectCategories.find((c) => c.title === active)?.id ?? "",
          })) ?? [];

  // SHOW ALL / LESS
  const projects = showAll
    ? projectCategories.flatMap((cat) =>
        cat.projects.slice(0, 6).map((p) => ({ ...p, categoryId: cat.id }))
      )
    : baseProjects.slice(0, 6);

  return (
    <SectionMotion>
      <section className="py-20  max-w-7xl mx-auto px-6 md:px-16">
        {/* HEADING */}
        <SectionTitle white title="Our Projects" />

        {/* FILTER BUTTONS */}
        <motion.div className="flex gap-4 flex-wrap mb-12 justify-center">
          {filters.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileTap={{ scale: 0.92 }}
              className={`cursor-pointer px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                active === cat
                  ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                  : "border-white-400 bg-white hover:bg-primary hover:text-white hover:border-primary"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* PROJECT GRID */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active + (showAll ? "-all" : "-partial")}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((proj) => (
              <Link
                key={proj.id}
                href={`/projects/${proj.categoryId}/${proj.id}`}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)] hover:border-[var(--primary)] transition shadow-sm hover:shadow-[0_0_18px_rgba(242,211,19,0.25)]"
              >
                <div className="relative w-full h-64">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Title */}
                <h3 className="absolute z-10 bottom-10 left-4 text-lg md:text-xl font-semibold text-[var(--primary)] drop-shadow">
                  {proj.title}
                </h3>

                {/* Subtitle */}
                <p className="absolute z-10 bottom-4 left-4 text-sm text-white/80 font-medium drop-shadow">
                  {proj.categoryId}
                </p>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* SHOW MORE / LESS BUTTON */}
        {baseProjects.length > 6 && (
          <div className="flex justify-center mt-10">
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-3 shadow-2xl cursor-pointer rounded-full border border-[var(--border)] bg-primary text-white hover:bg-[var(--primary-hover)] transition text-sm font-medium"
            >
              {showAll ? "Show Less" : "Show More"}
            </motion.button>
          </div>
        )}
      </section>
    </SectionMotion>
  );
}
