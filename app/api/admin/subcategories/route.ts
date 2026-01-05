/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authGuard } from '../_lib/auth'

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-')
}

function subPath(catSlug: string, subSlug: string) {
  return `/investor-corner/${catSlug}/${subSlug}`
}

export async function GET(req: NextRequest) {
  const categoryId = new URL(req.url).searchParams.get('categoryId')
  const subcategories = await prisma.subcategory.findMany({
    where: categoryId ? { categoryId } : undefined,
    orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
  })
  return NextResponse.json({ subcategories })
}

export async function POST(req: NextRequest) {
  const guard = authGuard(req)
  if (guard) return guard

  const { categoryId, name } = await req.json()
  if (!categoryId || !name) {
    return NextResponse.json({ error: 'categoryId & name required' }, { status: 400 })
  }

  const category = await prisma.category.findFirst({ where: { id: categoryId } })
  if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 })

  const slug = toSlug(name)

  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId, slug } },
    update: { name },
    create: {
      name,
      slug,
      categoryId,
      path: subPath(category.slug, slug),
    },
  })

  return NextResponse.json({ subcategory }, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const guard = authGuard(req)
  if (guard) return guard

  const { id, name, categoryId, position } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  const existing = await prisma.subcategory.findUnique({
    where: { id },
    include: { category: true },
  })

  if (!existing)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const updates: any = {}

  let newSlug = existing.slug
  let newPath = existing.path

  // -----------------------------
  // 🔥 NAME CHANGE → regenerate slug + path
  // -----------------------------
  if (name) {
    newSlug = toSlug(name)
    updates.name = name
    updates.slug = newSlug
  }

  // --------------------------------------------------
  // 🔥 CATEGORY CHANGE → compute NEW correct path
  // --------------------------------------------------
  if (categoryId && categoryId !== existing.categoryId) {
    const newCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    })

    if (!newCategory)
      return NextResponse.json({ error: 'Invalid categoryId' }, { status: 400 })

    updates.categoryId = categoryId
    newPath = subPath(newCategory.slug, newSlug)
  }
  else if (name) {
    // If only name changed → update path using existing category slug
    newPath = subPath(existing.category.slug, newSlug)
  }

  updates.path = newPath

  if (typeof position === 'number') {
    updates.position = position
  }

  const updated = await prisma.subcategory.update({
    where: { id },
    data: updates,
  })

  return NextResponse.json({ subcategory: updated })
}

export async function DELETE(req: NextRequest) {
  const guard = authGuard(req)
  if (guard) return guard

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  const docCount = await prisma.document.count({ where: { subcategoryId: id } })
  const groupDocCount = await prisma.document.count({
    where: { subTextGroup: { subcategoryId: id } },
  })

  if (docCount + groupDocCount > 0) {
    return NextResponse.json(
      { error: 'Delete documents first' },
      { status: 400 }
    )
  }

  await prisma.subTextGroup.deleteMany({ where: { subcategoryId: id } })
  await prisma.subcategory.delete({ where: { id } })

  return NextResponse.json({ ok: true })
}
