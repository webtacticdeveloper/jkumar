/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";

const DISCLOSURES_NAME =
  "Disclosures Under Regulation 46 Of SEBI LODR & Shareholder's Data";

/** ---------- Helper: Get Latest Date ---------- **/
function getLatestDate(dates: (Date | null | undefined)[]): Date | null {
  const valid = dates.filter(Boolean) as Date[];
  if (valid.length === 0) return null;
  return new Date(Math.max(...valid.map((d) => d.getTime())));
}

/** ---------- Helper: Remove docs that belong to groups ---------- **/
function excludeDocsInGroups(docs: any[], groups: any[]) {
  if (!groups || groups.length === 0) return docs;
  const groupDocIds = new Set(
    groups.flatMap((g: any) => (g.documents ?? []).map((d: any) => d.id))
  );
  return docs.filter((d: any) => !groupDocIds.has(d.id));
}

/** ---------- Helper: Process Subcategory Docs & SubTextGroups ---------- **/
function mergeAndSortDocs(sub: any) {
  if (!sub) return null;

  const subTextGroups = (sub.subTextGroups ?? [])
    .map((st: any) => {
      const sortedDocs = [...(st.documents ?? [])].sort(
        (a: any, b: any) =>
          new Date(b.updatedAt ?? b.createdAt).getTime() -
          new Date(a.updatedAt ?? a.createdAt).getTime()
      );

      return {
        ...st,
        documents: sortedDocs,
        latestFileDate: getLatestDate(
          sortedDocs.map((d: any) => d.updatedAt ?? d.createdAt)
        ),
      };
    })
    .filter((st: any) => st.documents.length > 0);

  const standaloneDocs = excludeDocsInGroups(
    sub.documents ?? [],
    subTextGroups
  ).sort(
    (a: any, b: any) =>
      new Date(b.updatedAt ?? b.createdAt).getTime() -
      new Date(a.updatedAt ?? a.createdAt).getTime()
  );

  const merged = [
    ...standaloneDocs.map((doc: any) => ({
      type: "file" as const,
      id: doc.id,
      name: doc.name,
      url: doc.url,
      createdAt: new Date(doc.updatedAt ?? doc.createdAt),
    })),
    ...subTextGroups.map((st: any) => ({
      type: "subtext" as const,
      id: st.id,
      title: st.title,
      documents: st.documents,
      latestDate: st.latestFileDate ?? new Date(0),
    })),
  ].sort((a: any, b: any) => {
    const da = a.type === "file" ? a.createdAt : a.latestDate;
    const db = b.type === "file" ? b.createdAt : b.latestDate;
    return db.getTime() - da.getTime();
  });

  return {
    ...sub,
    allDocs: merged,
    latestFileDate: getLatestDate(
      merged.map((m: any) => (m.type === "file" ? m.createdAt : m.latestDate))
    ),
  };
}

/** ---------- Process Category-Level SubTextGroups ---------- **/
function processCategoryGroups(cat: any) {
  return (cat.subTextGroups ?? [])
    .map((group: any) => {
      const sorted = [...(group.documents ?? [])].sort(
        (a: any, b: any) =>
          new Date(b.updatedAt ?? b.createdAt).getTime() -
          new Date(a.updatedAt ?? a.createdAt).getTime()
      );

      if (sorted.length === 0) return null;

      return {
        id: group.id,
        slug: group.slug,
        title: group.title,
        documents: sorted,
        latestDate: new Date(sorted[0].updatedAt ?? sorted[0].createdAt),
      };
    })
    .filter(Boolean);
}

/** ---------- Process Category-Level Documents ---------- **/
function processCategoryDocs(cat: any) {
  const docs = (cat.documents ?? [])
    .sort(
      (a: any, b: any) =>
        new Date(b.updatedAt ?? b.createdAt).getTime() -
        new Date(a.updatedAt ?? a.createdAt).getTime()
    )
    .map((d: any) => ({
      id: d.id,
      slug: d.slug,
      name: d.name,
      url: d.url,
      createdAt: new Date(d.updatedAt ?? d.createdAt),
    }));

  return {
    docs,
    latestFileDate: getLatestDate(docs.map((d: any) => d.createdAt)),
  };
}

/** ---------- Merge category groups + docs ---------- **/
function mergeCategoryItems(categoryDocs: any[], categoryGroups: any[]) {
  const formattedGroups = categoryGroups.map((g: any) => ({
    type: "group" as const,
    id: g.id,
    slug: g.slug,
    title: g.title,
    documents: g.documents,
    latestDate: g.latestDate,
  }));

  const formattedDocs = categoryDocs.map((d: any) => ({
    type: "file" as const,
    id: d.id,
    slug: d.slug,
    title: d.name,
    url: d.url,
    latestDate: d.createdAt,
  }));

  return [...formattedGroups, ...formattedDocs].sort(
    (a: any, b: any) =>
      (b.latestDate?.getTime() ?? 0) - (a.latestDate?.getTime() ?? 0)
  );
}

/* ===========================================================
   GET CATEGORY PAGE
=========================================================== */

export async function getCategoryWithSubcategories(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      documents: true,
      subTextGroups: { include: { documents: true } },
      subcategories: {
        include: {
          documents: true,
          subTextGroups: { include: { documents: true } },
        },
      },
    },
  });

  if (!category) return null;

  /* 🔒 DISCLOSURES */
  if (category.name === DISCLOSURES_NAME) {
    const categoryGroups = processCategoryGroups(category);

    // 🔒 EXCLUDE docs already present inside subTextGroups
    const rawDocs = category.documents ?? [];
    const safeDocs = excludeDocsInGroups(rawDocs, category.subTextGroups);

    const processedDocs = safeDocs
      .sort(
        (a: any, b: any) =>
          new Date(b.updatedAt ?? b.createdAt).getTime() -
          new Date(a.updatedAt ?? a.createdAt).getTime()
      )
      .map((d: any) => ({
        id: d.id,
        slug: d.slug,
        name: d.name,
        url: d.url,
        createdAt: new Date(d.updatedAt ?? d.createdAt),
      }));

    const combined = mergeCategoryItems(processedDocs, categoryGroups);

    return {
      ...category,
      subcategories: [],
      categoryCombined: combined,
      latestFileDate: combined[0]?.latestDate ?? null,
    };
  }

  /* ✅ NORMAL CATEGORY (FIXED) */
  const subcategories = (category.subcategories ?? [])
    .map(mergeAndSortDocs)
    .filter(Boolean);

  return {
    ...category,
    subcategories,
    categoryCombined: [], // ✅ REQUIRED FOR UI SAFETY
  };
}

/* ===========================================================
   GET SUBCATEGORY / CHILD PAGE
=========================================================== */

export async function getSubcategoryData(
  categorySlug: string,
  subSlug: string
) {
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
    include: {
      documents: true,
      subTextGroups: { include: { documents: true } },
    },
  });

  if (!category) return null;

  /* 🔒 DISCLOSURES: resolve silently */
  if (category.name === DISCLOSURES_NAME) {
    const group = category.subTextGroups.find((g: any) => g.slug === subSlug);
    if (group) {
      const docs = [...(group.documents ?? [])].sort(
        (a, b) =>
          new Date(b.updatedAt ?? b.createdAt).getTime() -
          new Date(a.updatedAt ?? a.createdAt).getTime()
      );
      return {
        type: "group",
        id: group.id,
        title: group.title,
        documents: docs,
      };
    }

    const doc = category.documents.find((d: any) => d.slug === subSlug);
    if (doc) {
      return {
        type: "file",
        id: doc.id,
        title: doc.name,
        url: doc.url,
      };
    }

    const hiddenSub = await prisma.subcategory.findFirst({
      where: { slug: subSlug, categoryId: category.id },
      include: {
        documents: true,
        subTextGroups: { include: { documents: true } },
      },
    });

    if (hiddenSub) return mergeAndSortDocs(hiddenSub);
    return null;
  }

  /* NORMAL CATEGORIES */
  const subcategory = await prisma.subcategory.findFirst({
    where: {
      slug: subSlug,
      category: { slug: categorySlug },
    },
    include: {
      documents: true,
      subTextGroups: { include: { documents: true } },
    },
  });

  if (!subcategory) return null;
  return mergeAndSortDocs(subcategory);
}
