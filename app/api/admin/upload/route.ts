import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { authGuard } from "../_lib/auth";

/* ------------------ Helpers ------------------ */

function toSafeFileBase(name: string) {
  return name
    .replace(/\s+/g, "_")        // ✅ spaces → _
    .replace(/[^a-zA-Z0-9._-]/g, "_") // keep URL-safe chars
    .replace(/_+/g, "_")         // collapse multiple _
    .replace(/^_+|_+$/g, "");    // trim _
}


async function ensureDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

async function getUniqueFileName(dir: string, original: string) {
  const ext = path.extname(original);
  const base = toSafeFileBase(path.basename(original, ext));

  let name = `${base}${ext}`;
  let counter = 1;

  while (existsSync(path.join(dir, name))) {
    name = `${base}-${counter}${ext}`;
    counter++;
  }

  return name;
}

const ALLOWED_EXTS = ["pdf", "html", "htm", "mp3", "wav", "m4a", "aac", "ogg", "flac"];

/* ======================================================================
   POST
====================================================================== */

export async function POST(req: NextRequest) {
  const guard = authGuard(req);
  if (guard) return guard;

  const form = await req.formData();

  const categoryIdRaw = form.get("categoryId") as string | null;
  const subcategoryId = form.get("subcategoryId") as string | null;
  const fileName = form.get("fileName") as string;

  const useExternal = form.get("useExternal") === "true";
  const externalUrl = (form.get("externalUrl") as string) || "";

  const subTextGroupIdRaw = (form.get("subTextGroupId") as string) || null;
  const subTextTitle = (form.get("subTextTitle") as string) || null;

  const file = form.get("file") as File | null;

  if (!categoryIdRaw || !fileName.trim()) {
    return NextResponse.json(
      { error: "categoryId and fileName required" },
      { status: 400 }
    );
  }

  /* ------------------------------------------------
     FINAL PARENT (subcategory wins)
  ------------------------------------------------ */
  const finalCategoryId = subcategoryId ? null : categoryIdRaw;
  const finalSubcategoryId = subcategoryId || null;

  /* ------------------------------------------------
     SUBTEXT GROUP
  ------------------------------------------------ */
  let finalGroupId: string | null = null;

  if (subTextGroupIdRaw) {
    const group = await prisma.subTextGroup.findUnique({
      where: { id: subTextGroupIdRaw },
    });
    if (!group)
      return NextResponse.json({ error: "Invalid SubTextGroupId" }, { status: 400 });
    finalGroupId = group.id;
  } else if (subTextTitle) {
    let group = await prisma.subTextGroup.findFirst({
      where: {
        title: subTextTitle,
        ...(finalSubcategoryId
          ? { subcategoryId: finalSubcategoryId }
          : { categoryId: finalCategoryId }),
      },
    });

    if (!group) {
      group = await prisma.subTextGroup.create({
        data: {
          title: subTextTitle,
          categoryId: finalCategoryId,
          subcategoryId: finalSubcategoryId,
        },
      });
    }

    finalGroupId = group.id;
  }

  /* =====================================================
     EXTERNAL URL MODE
  ===================================================== */
  if (useExternal) {
    if (!externalUrl.trim()) {
      return NextResponse.json({ error: "External URL required" }, { status: 400 });
    }

    const created = await prisma.document.create({
      data: {
        name: fileName,
        url: externalUrl.trim(),
        isExternal: true,
        fileSize: null,
        categoryId: finalCategoryId,
        subcategoryId: finalSubcategoryId,
        subTextGroupId: finalGroupId,
      },
    });

    return NextResponse.json({ document: created }, { status: 201 });
  }

  /* =====================================================
     FILE UPLOAD MODE (NEW STORAGE RULE)
  ===================================================== */
  if (!file) {
    return NextResponse.json(
      { error: "File missing (useExternal=false requires file upload)" },
      { status: 400 }
    );
  }

  const ext = (file.name.split(".").pop() || "").toLowerCase();
  if (!ALLOWED_EXTS.includes(ext)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  /* ------------------------------------------------
     STORAGE: /storage/reportFile/
  ------------------------------------------------ */
  const storageDir = path.join(process.cwd(),"reportFile");
  await ensureDir(storageDir);

  const uniqueFileName = await getUniqueFileName(storageDir, file.name);
  const absPath = path.join(storageDir, uniqueFileName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(absPath, buffer);

  const publicUrl = `/storage/reportFile/${uniqueFileName}`;

  const created = await prisma.document.create({
    data: {
      name: fileName,
      url: publicUrl,
      isExternal: false,
      fileSize: buffer.byteLength,
      categoryId: finalCategoryId,
      subcategoryId: finalSubcategoryId,
      subTextGroupId: finalGroupId,
    },
  });

  return NextResponse.json(
    { document: created, url: publicUrl },
    { status: 201 }
  );
}
