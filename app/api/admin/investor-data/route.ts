/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authGuard } from "../_lib/auth";

export async function GET(req: NextRequest) {
  const guard = authGuard(req);
  if (guard) return guard;

  const categories = await prisma.category.findMany({
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
    orderBy: { position: "asc" },
  });

  const flat: any[] = [];

  for (const cat of categories) {
    const catName = cat.name;
    const catId = cat.id;

    /* CATEGORY LEVEL DOCUMENTS */
    for (const d of cat.documents) {
      flat.push({
        id: d.id,
        fileName: d.name,
        fileUrl: d.url,
        portfolioUrl: `/investor-corner/${cat.slug}`,
        categoryName: catName,
        categoryId: catId,
        subcategoryName: "(No Subcategory)",
        subcategoryId: "",
        subTextTitle: undefined,
        subTextId: undefined,
        uploadedAt: d.updatedAt.toISOString(),
      });
    }

    /* CATEGORY LEVEL GROUP DOCUMENTS */
    for (const g of cat.subTextGroups) {
      for (const d of g.documents) {
        flat.push({
          id: d.id,
          fileName: d.name,
          fileUrl: d.url,
          portfolioUrl: `/investor-corner/${cat.slug}`,
          categoryName: catName,
          categoryId: catId,
          subcategoryName: "(No Subcategory)",
          subcategoryId: "",
          subTextTitle: g.title,
          subTextId: g.id,
          uploadedAt: d.updatedAt.toISOString(),
        });
      }
    }

    /* SUBCATEGORIES */
    for (const sub of cat.subcategories) {
      const subName = sub.name;
      const subId = sub.id;

      const groupDocIds = new Set(
        sub.subTextGroups.flatMap((g: { documents: any[]; }) => g.documents.map((d: { id: any; }) => d.id))
      );

      const filteredSubDocs = sub.documents.filter(
        (d: { id: unknown; }) => !groupDocIds.has(d.id)
      );

      /* SUBCATEGORY DOCS (non-group) */
      for (const d of filteredSubDocs) {
        flat.push({
          id: d.id,
          fileName: d.name,
          fileUrl: d.url,
          portfolioUrl: `/investor-corner/${cat.slug}/${sub.slug}`,
          categoryName: catName,
          categoryId: catId,
          subcategoryName: subName,
          subcategoryId: subId,
          subTextTitle: undefined,
          subTextId: undefined,
          uploadedAt: d.updatedAt.toISOString(),
        });
      }

      /* SUBCATEGORY GROUP DOCS */
      for (const g of sub.subTextGroups) {
        for (const d of g.documents) {
          flat.push({
            id: d.id,
            fileName: d.name,
            fileUrl: d.url,
            portfolioUrl: `/investor-corner/${cat.slug}/${sub.slug}`,
            categoryName: catName,
            categoryId: catId,
            subcategoryName: subName,
            subcategoryId: subId,
            subTextTitle: g.title,
            subTextId: g.id,
            uploadedAt: d.updatedAt.toISOString(),
          });
        }
      }
    }
  }

  /* ------------------------------------------
   * 🔥 FINAL FIX — REMOVE DUPLICATES BY ID
   * ------------------------------------------ */
  const unique = Array.from(new Map(flat.map((d) => [d.id, d])).values());

  return NextResponse.json(unique);
}
