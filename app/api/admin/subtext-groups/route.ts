/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authGuard } from "../_lib/auth";

/* =====================================================
   GET — Fetch groups by category OR subcategory
===================================================== */
export async function GET(req: NextRequest) {
  try {
    const guard = authGuard(req);
    if (guard) return guard;

    const url = new URL(req.url);
    const subcategoryId = url.searchParams.get("subcategoryId");
    const categoryId = url.searchParams.get("categoryId");

    if (!subcategoryId && !categoryId) {
      return NextResponse.json(
        { error: "Either subcategoryId or categoryId required" },
        { status: 400 }
      );
    }

    const where = subcategoryId
      ? { subcategoryId }
      : { categoryId };

    const groups = await prisma.subTextGroup.findMany({
      where,
      orderBy: [{ position: "asc" }, { createdAt: "asc" }],
    });

    return NextResponse.json({ groups });
  } catch (err: any) {
    console.error("GET /api/admin/subtext-groups error:", err);
    return NextResponse.json(
      { error: "Failed to fetch subtext groups" },
      { status: 500 }
    );
  }
}

/* =====================================================
   POST — Create / Update SubTextGroup
   RULE:
   - subcategoryId PRESENT → subcategory group
   - ONLY categoryId PRESENT → category group
===================================================== */
export async function POST(req: NextRequest) {
  const guard = authGuard(req);
  if (guard) return guard;

  const body = await req.json();
  let { subcategoryId, categoryId, title, position } = body;

  subcategoryId = subcategoryId || null;
  categoryId = categoryId || null;

  if (!title || (!subcategoryId && !categoryId)) {
    return NextResponse.json(
      { error: "title + (subcategoryId or categoryId) required" },
      { status: 400 }
    );
  }

  /* ---------------------------------------------
     PRIORITY CASE — SUBCATEGORY GROUP
     (subcategoryId ALWAYS wins)
  --------------------------------------------- */
  if (subcategoryId) {
    // Get categoryId from subcategory (never trust client)
    const sub = await prisma.subcategory.findUnique({
      where: { id: subcategoryId },
      select: { categoryId: true },
    });

    if (!sub) {
      return NextResponse.json(
        { error: "Invalid subcategoryId" },
        { status: 400 }
      );
    }

    const existing = await prisma.subTextGroup.findFirst({
      where: {
        subcategoryId,
        title: { equals: title },
      },
    });

    if (existing) {
      const updated = await prisma.subTextGroup.update({
        where: { id: existing.id },
        data: {
          position: position ?? existing.position,
        },
      });
      return NextResponse.json({ group: updated }, { status: 200 });
    }

    const created = await prisma.subTextGroup.create({
      data: {
        title,
        subcategoryId,
        categoryId: sub.categoryId,
        position: position ?? 0,
      },
    });

    return NextResponse.json({ group: created }, { status: 201 });
  }

  /* ---------------------------------------------
     CATEGORY GROUP
     (ONLY when subcategoryId is null)
  --------------------------------------------- */
  const existingCatGroup = await prisma.subTextGroup.findFirst({
    where: {
      categoryId,
      subcategoryId: null, // 🔒 important
      title: { equals: title },
    },
  });

  if (existingCatGroup) {
    const updated = await prisma.subTextGroup.update({
      where: { id: existingCatGroup.id },
      data: {
        position: position ?? existingCatGroup.position,
      },
    });

    return NextResponse.json({ group: updated }, { status: 200 });
  }

  const createdCat = await prisma.subTextGroup.create({
    data: {
      categoryId,
      subcategoryId: null,
      title,
      position: position ?? 0,
    },
  });

  return NextResponse.json({ group: createdCat }, { status: 201 });
}

/* =====================================================
   DELETE — Safe delete (no documents allowed)
===================================================== */
export async function DELETE(req: NextRequest) {
  try {
    const guard = authGuard(req);
    if (guard) return guard;

    const id = new URL(req.url).searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const docCount = await prisma.document.count({
      where: { subTextGroupId: id },
    });

    if (docCount > 0) {
      return NextResponse.json(
        { error: "Delete documents in this group first" },
        { status: 400 }
      );
    }

    await prisma.subTextGroup.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("DELETE /api/admin/subtext-groups error:", err);
    return NextResponse.json(
      { error: "Failed to delete group" },
      { status: 500 }
    );
  }
}
