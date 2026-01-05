/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";

/* ------------------ Shared Helpers ------------------ */

function sortDocsLatest(docs: any[]) {
  return [...docs]
    .filter(Boolean)
    .sort(
      (a: any, b: any) =>
        new Date(b.updatedAt ?? b.createdAt).getTime() -
        new Date(a.updatedAt ?? a.createdAt).getTime()
    );
}

function excludeCategoryGroupedDocs(cat: any) {
  const groupedIds = new Set(
    (cat.subTextGroups ?? []).flatMap(
      (g: any) => g.documents?.map((d: any) => d.id) ?? []
    )
  );
  return (cat.documents ?? []).filter(
    (d: any) => !groupedIds.has(d.id)
  );
}

/* ------------------ Subcategory Handler (NORMAL CATEGORIES ONLY) ------------------ */

function processSubcategory(cat: any, sub: any) {
  if (!sub) return null;

  const baseHref = `/investor-corner/${cat.slug}/${sub.slug}`;

  const groups = (sub.subTextGroups ?? [])
    .map((g: any) => {
      const docs = sortDocsLatest(g.documents ?? []);
      if (!docs.length) return null;

      return {
        type: "group",
        id: g.id,
        title: g.title,
        href: baseHref, // ✅ subcategory link
        latestFileDate: new Date(
          docs[0].updatedAt ?? docs[0].createdAt
        ),
      };
    })
    .filter(Boolean);

  const groupedIds = new Set(
    (sub.subTextGroups ?? []).flatMap(
      (g: any) => g.documents?.map((d: any) => d.id) ?? []
    )
  );

  const docs = sortDocsLatest(sub.documents ?? [])
    .filter((d: any) => !groupedIds.has(d.id))
    .map((d: any) => ({
      type: "doc",
      id: d.id,
      title: d.name,
      href: baseHref, // ✅ subcategory link
      latestFileDate: new Date(d.updatedAt ?? d.createdAt),
    }));

  const merged = [...groups, ...docs].sort(
    (a: any, b: any) =>
      (b.latestFileDate?.getTime() ?? 0) -
      (a.latestFileDate?.getTime() ?? 0)
  );

  if (!merged.length) return null;

  return {
    title: sub.name,
    href: baseHref, // ✅ subcategory itself clickable
    submenu: merged,
  };
}

/* ------------------ Disclosure Handler (CATEGORY ONLY) ------------------ */

function processDisclosureCategory(cat: any) {
  const baseHref = `/investor-corner/${cat.slug}`;

  const groups = (cat.subTextGroups ?? [])
    .map((g: any) => {
      const docs = sortDocsLatest(g.documents ?? []);
      if (!docs.length) return null;

      return {
        type: "group",
        id: g.id,
        title: g.title,
        href: baseHref, // ✅ category link
        latestFileDate: new Date(
          docs[0].updatedAt ?? docs[0].createdAt
        ),
      };
    })
    .filter(Boolean);

  const docs = sortDocsLatest(excludeCategoryGroupedDocs(cat)).map(
    (d: any) => ({
      type: "doc",
      id: d.id,
      title: d.name,
      href: baseHref, // ✅ category link
      latestFileDate: new Date(d.updatedAt ?? d.createdAt),
    })
  );

  return [...groups, ...docs].sort(
    (a: any, b: any) =>
      (b.latestFileDate?.getTime() ?? 0) -
      (a.latestFileDate?.getTime() ?? 0)
  );
}

/* ---------------------------------------------------------
   MAIN NAVBAR QUERY
--------------------------------------------------------- */

export async function getInvestorNavbarData() {
  const TARGET_CATEGORIES = [
    "Investor Information",
    "Disclosures Under Regulation 46 Of SEBI LODR & Shareholder's Data",
    "Financials and Reports",
    "Important Update For Shareholder",
  ];

  const categories = await prisma.category.findMany({
    where: { name: { in: TARGET_CATEGORIES } },
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

  const ordered = TARGET_CATEGORIES.map(name =>
    categories.find(c => c.name === name)
  ).filter(Boolean);

  const navbar = ordered.map((cat: any) => {
    /* ================= FINANCIALS ================= */
    if (cat.name === "Financials and Reports") {
      const ORDER = [
        "Quarterly Results",
        "Annual Reports",
        "Press Release",
        "Financials of Subsidiary Companies",
      ];

      return {
        title: cat.name,
        href: `/investor-corner/${cat.slug}`,
        submenu: ORDER.map(name =>
          processSubcategory(
            cat,
            cat.subcategories?.find((s: any) => s.name === name)
          )
        ).filter(Boolean),
      };
    }

    /* ===== INVESTOR INFO / IMPORTANT UPDATE ===== */
    if (
      cat.name === "Investor Information" ||
      cat.name === "Important Update For Shareholder"
    ) {
      return {
        title: cat.name,
        href: `/investor-corner/${cat.slug}`,
        submenu: (cat.subcategories ?? [])
          .map((s: any) => processSubcategory(cat, s))
          .filter(Boolean),
      };
    }

    /* ================= DISCLOSURES ================= */
    if (
      cat.name ===
      "Disclosures Under Regulation 46 Of SEBI LODR & Shareholder's Data"
    ) {
      return {
        title: cat.name,
        href: `/investor-corner/${cat.slug}`, // ✅ category clickable
        submenu: processDisclosureCategory(cat), // ❌ no subcategories
      };
    }

    return null;
  });

  return {
    title: "Investor Corner",
    submenu: navbar.filter(Boolean),
  };
}
