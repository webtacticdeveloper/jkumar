/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCategoryWithSubcategories,
  getSubcategoryData,
} from "@/lib/investorQueries";
import InvestorPaginatedList from "@/components/PaginatedList";
import BoardOfDirectorsPage from "./boardofdirector";
import SubcategoryDropdownPage from "./SubcategoryDropdownPage";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

const DROPDOWN_SUBCATEGORIES = [
  "corporate-governance-report",
  "transcript-of-conference-call",
  "investor-presentation",
  "corporate-social-responsibility",
  "investor-complaints",
  "agm-egm-information",
  "shareholding-pattern",
];

export default async function InvestorCornerSlugPage({ params }: PageProps) {
  const { slug = [] } = await params;

  // ======================================================================
  // 🟡 CATEGORY PAGE
  // ======================================================================
  if (slug.length === 1) {
    const category = await getCategoryWithSubcategories(slug[0]);
    if (!category) return notFound();

    const hasSubcategories = category.subcategories?.length > 0;
    const hasCombined = category.categoryCombined?.length > 0;

    if (!hasSubcategories && !hasCombined) return notFound();

    if (hasSubcategories) {
      return (
        <div className="p-6 md:p-10 max-w-360 mx-auto min-h-screen bg-background">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-8">
            {category.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.subcategories.map((sub: any) => (
              <div
                key={sub.id}
                className="bg-white rounded-xl shadow-lg border border-[#e5e5e5] overflow-hidden flex flex-col"
              >
                <div className="bg-accent px-6 py-3">
                  <h2 className="font-semibold text-sm text-white">{sub.name}</h2>
                </div>

                <div className="divide-y divide-gray-200">
                  {(sub.allDocs?.slice(0, 5) ?? []).map((item: any) => {
                    const isFile = item.type === "file";
                    const firstDoc = item.documents?.[0];

                    return (
                      <a
                        key={item.id}
                        href={isFile ? item.url : firstDoc?.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block px-6 py-4 hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {isFile ? item.name : item.title}
                          </p>
                          <span className="text-gray-500 text-lg">↗</span>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <div className="flex justify-end px-6 py-4 mt-auto">
                  <Link
                    href={`/investor-corner/${category.slug}/${sub.slug}`}
                    className="px-6 py-2 border rounded-full text-sm hover:bg-gray-100 flex items-center gap-2"
                  >
                    View all →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // CATEGORY WITHOUT SUBCATEGORIES
    const mergedForPagination = (category.categoryCombined ?? []).map(
      (item: any) => {
        if (item.type === "group") {
          return {
            type: "subtext",
            id: item.id,
            title: item.title,
            documents: item.documents.map((d: any) => ({
              id: d.id,
              name: d.name,
              url: d.url,
            })),
          };
        }
        return {
          type: "file",
          id: item.id,
          name: item.title,
          url: item.url,
        };
      }
    );

    return (
      <div className="p-6 min-h-screen max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-black">
          {category.name}
        </h1>

        <div className="bg-accent text-white font-semibold px-5 py-3 rounded-t-xl mt-10">
          TITLE
        </div>

        <InvestorPaginatedList items={mergedForPagination} />
      </div>
    );
  }

  // ======================================================================
  // 🔵 SUBCATEGORY / GROUP PAGE
  // ======================================================================
  if (slug.length === 2) {
    const [categorySlug, subSlug] = slug;

    if (subSlug === "board-of-directors") {
      return <BoardOfDirectorsPage />;
    }

    // 🔥 NEW: Dropdown-based subcategories
    if (DROPDOWN_SUBCATEGORIES.includes(subSlug)) {
      return (
        <SubcategoryDropdownPage
          categorySlug={categorySlug}
          subSlug={subSlug}
        />
      );
    }

    // NORMAL SUBCATEGORY
    const subData = await getSubcategoryData(categorySlug, subSlug);
    if (subData) {
      return (
        <div className="p-6 min-h-screen max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-black">
            {subData.name}
          </h1>

          <div className="bg-accent text-white font-semibold px-5 py-3 rounded-t-xl mt-10">
            TITLE
          </div>

          <InvestorPaginatedList items={subData.allDocs} />
        </div>
      );
    }

    // CATEGORY-LEVEL GROUP
    const category = await getCategoryWithSubcategories(categorySlug);
    const group = category?.categoryCombined?.find(
      (g: any) => g.type === "group" && g.id === subSlug
    );

    if (group?.type === "group") {
      return (
        <div className="p-6 min-h-screen max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-black">
            {group.title}
          </h1>

          <div className="bg-accent text-white font-semibold px-5 py-3 rounded-t-xl mt-10">
            TITLE
          </div>

          <InvestorPaginatedList
            items={group.documents.map((d: any) => ({
              type: "file",
              id: d.id,
              name: d.name,
              url: d.url,
            }))}
          />
        </div>
      );
    }

    return notFound();
  }

  return notFound();
}
