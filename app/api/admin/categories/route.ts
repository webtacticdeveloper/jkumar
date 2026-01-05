/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authGuard } from "../_lib/auth";

// Utility: create slug
function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/-+/g, "-");
}

// Build category URL
function categoryPath(slug: string) {
  return `/investor-corner/${slug}`;
}

// Build subcategory URL
function subcategoryPath(catSlug: string, subSlug: string) {
  return `/investor-corner/${catSlug}/${subSlug}`;
}

// ======================================================
// GET — list categories
// ======================================================
export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: [{ position: "asc" }, { createdAt: "asc" }],
  });

  return NextResponse.json({ categories });
}

// ======================================================
// POST — create category
// ======================================================
export async function POST(req: NextRequest) {
  const guard = authGuard(req);
  if (guard) return guard;

  const { name } = await req.json();
  if (!name)
    return NextResponse.json({ error: "Name required" }, { status: 400 });

  const slug = toSlug(name);

  // Prevent duplicate slugs
  const exists = await prisma.category.findUnique({ where: { slug } });
  if (exists)
    return NextResponse.json(
      { error: "Category already exists" },
      { status: 400 }
    );

  const category = await prisma.category.create({
    data: {
      name,
      slug,
      path: categoryPath(slug),
    } as any,
  });

  return NextResponse.json({ category }, { status: 201 });
}

// ======================================================
// PUT — update category (rename, reposition)
// ======================================================
export async function PUT(req: NextRequest) {
  const guard = authGuard(req);
  if (guard) return guard;

  const { id, name, position } = await req.json();

  if (!id)
    return NextResponse.json({ error: "ID required" }, { status: 400 });

  const existing = await prisma.category.findUnique({
    where: { id },
  });

  if (!existing)
    return NextResponse.json({ error: "Category not found" }, { status: 404 });

  const updates: any = {};
  let newSlug = existing.slug;
  let newPath = existing.path;

  // -------------------------------
  // 🔥 NAME CHANGE → regenerate slug
  // -------------------------------
  if (name) {
    newSlug = toSlug(name);
    updates.name = name;
    updates.slug = newSlug;
    newPath = categoryPath(newSlug);
    updates.path = newPath;
  }

  if (typeof position === "number") updates.position = position;

  const updatedCategory = await prisma.category.update({
    where: { id },
    data: updates,
  });

  // -------------------------------------------------------------------
  // 🔥 IMPORTANT:
  // Update ALL child subcategories + documents paths when slug changes
  // -------------------------------------------------------------------
  if (name) {
    const subcategories = await prisma.subcategory.findMany({
      where: { categoryId: id },
    });

    for (const sub of subcategories) {
      const newSubPath = subcategoryPath(newSlug, sub.slug);

      await prisma.subcategory.update({
        where: { id: sub.id },
        data: { path: newSubPath },
      });
    }
  }

  return NextResponse.json({ category: updatedCategory });
}

// ======================================================
// DELETE — category
// ======================================================
export async function DELETE(req: NextRequest) {
  const guard = authGuard(req);
  if (guard) return guard;

  const id = new URL(req.url).searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "ID required" }, { status: 400 });

  // Prevent deleting if category has docs or subcategories
  const docCount = await prisma.document.count({
    where: { categoryId: id },
  });

  const subCount = await prisma.subcategory.count({
    where: { categoryId: id },
  });

  if (docCount + subCount > 0) {
    return NextResponse.json(
      { error: "Delete subcategories and documents first" },
      { status: 400 }
    );
  }

  await prisma.category.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
