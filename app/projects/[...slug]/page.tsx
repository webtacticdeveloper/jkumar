"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projectCategories } from "@/data/projectsData";
import ImageGallery from "@/components/ImageGallery";

export default function ProjectSlugPage() {
  const { slug } = useParams();
  const slugArray = Array.isArray(slug) ? slug : [];

  if (slugArray.length === 0) return notFound();

  const categoryId = slugArray[0];
  const projectId = slugArray[1];

  const categoryData = projectCategories.find((c) => c.id === categoryId);
  if (!categoryData) return notFound();

  // =======================================================
  // CATEGORY PAGE
  // =======================================================
  if (!projectId) {
    return (
      <section className="w-full bg-background text-[var(--foreground)] pt-10 pb-24 px-4 md:px-8 ">
        <div className="max-w-7xl mx-auto space-y-14">

          {/* CATEGORY TITLE */}
          <div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[2px] w-14 md:w-16 bg-gradient-to-r via-primary to-primary" />
              <h2 className="text-4xl font-bold tracking-tight capitalize text-black text-center">
                {categoryData.title}
              </h2>
              <div className="h-[2px] w-14 md:w-16 bg-gradient-to-r from-primary via-primary" />
            </div>
            <p className="text-[var(--muted-foreground)] text-justify leading-relaxed max-w-full">
              {categoryData.description}
            </p>
          </div>

          {/*  Showcase Grid */}
          {/* <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto"> */}
            {/* {categoryData.showcaseImages.map((img, index) => ( */}
              {/* <div */}
                {/* key={index} */}
                {/* className="relative group overflow-hidden rounded-2xl border border-[var(--border)] hover:border-[var(--primary)] transition shadow-sm hover:shadow-[0_0_20px_rgba(242,211,19,0.25)]" */}
              {/* > */}
                {/* <Image */}
                  {/* src={img} */}
                  {/* alt={`${categoryData.title} showcase ${index + 1}`} */}
                  {/* width={900} */}
                  {/* height={900} */}
                  {/* className="w-full h-full object-cover group-hover:scale-105 transition duration-500" */}
                {/* /> */}

                {/* Subtle overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" /> */}
              {/* </div> */}
            {/* ))} */}
          {/* </div> */}

          {/* PROJECT LIST */}
          <div className="pt-10">

            <h3 className="flex items-center justify-center gap-x-2 text-2xl font-semibold text-[var(--primary)] mb-6">
              <div className="h-[2px] w-16 bg-gradient-to-r via-primary to-primary" />
              All Projects
              <div className="h-[2px] w-16 bg-gradient-to-r from-[var(--primary)] via-primary" />
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryData.projects.map((proj) => (
                <Link
                  key={proj.id}
                  href={`/projects/${categoryId}/${proj.id}`}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--border)] hover:border-[var(--primary)] transition shadow-sm hover:shadow-[0_0_18px_rgba(242,211,19,0.25)]"
                >
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    width={500}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                  />
                  <h3 className="absolute z-10 bottom-4 left-4 text-lg md:text-xl font-semibold text-[var(--primary)] drop-shadow">
                    {proj.title}
                  </h3>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                </Link>
              ))}
            </div>
          </div>

          {/* OTHER CATEGORIES */}
          <div className="pt-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[2px] w-16 bg-gradient-to-r via-primary to-primary" />
              <h3 className="text-2xl font-semibold text-[var(--primary)] text-center">
                Other Categories
              </h3>
              <div className="h-[2px] w-16 bg-gradient-to-r from-primary via-primary" />
            </div>

            <div className="grid md:grid-cols-3 gap-y-4 md:gap-x-12 text-base md:text-lg">
              {projectCategories.map((c) => {
                const isActive = c.id === categoryId;
                return (
                  <Link
                    key={c.id}
                    href={isActive ? "#" : `/projects/${c.id}`}
                    className={`text-center transition ${isActive
                        ? "text-[var(--primary)] font-semibold pointer-events-none"
                        : "hover:text-[var(--primary)]"
                      }`}
                  >
                    {c.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =======================================================
  // PROJECT DETAIL PAGE
  // =======================================================
  const projectData = categoryData.projects.find((p) => p.id === projectId);
  if (!projectData) return notFound();

  const images = projectData.showcaseImages?.length
    ? projectData.showcaseImages
    : [projectData.image];

  return (
    <section className="w-full bg-background text-[var(--foreground)] pt-10 pb-28 px-4 md:px-8 ">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* PROJECT TITLE */}
        <div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-14 md:w-16 bg-gradient-to-r via-primary to-primary" />
            <h2 className="text-4xl text-center font-bold tracking-tight capitalize text-black">
              {projectData.title}
            </h2>
            <div className="h-[2px] w-14 md:w-16 bg-gradient-to-r from-primary via-primary" />
          </div>

          <p className="text-[var(--muted-foreground)] text-justify leading-relaxed max-w-full">
            {projectData.description}
          </p>
        </div>

        {/* IMAGE GALLERY */}
        <ImageGallery
          images={images}
          altPrefix={projectData.title}
          className="mt-8"
        />

        {/* OTHER PROJECTS */}
        <div className="pt-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[2px] w-16 bg-gradient-to-r via-primary to-primary" />
              <h3 className="text-2xl font-semibold text-[var(--primary)] text-center">
                Other {categoryData.title} Projects
              </h3>
              <div className="h-[2px] w-16 bg-gradient-to-r from-primary via-primary" />
          </div>

          <div className="grid md:grid-cols-3 gap-y-4 md:gap-x-12 text-base md:text-lg">
            {categoryData.projects.map((p) => {
              const isActive = p.id === projectId;
              return (
                <Link
                  key={p.id}
                  href={isActive ? "#" : `/projects/${categoryId}/${p.id}`}
                  className={`text-center transition ${isActive
                      ? "text-[var(--primary)] font-semibold pointer-events-none"
                      : "hover:text-[var(--primary)]"
                    }`}
                >
                  {p.title}
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
