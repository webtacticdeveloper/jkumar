/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { existsSync, mkdirSync } from "fs";
import { unlink, writeFile } from "fs/promises";
import { prisma } from "@/lib/prisma";
import { authGuard } from "../_lib/auth";

/* -----------------------
   Helpers
------------------------*/

function toAbsStorage(p: string) {
  const pathname = p.startsWith("http") ? new URL(p).pathname : p;

  // DB url: /storage/reportFile/xyz.pdf
  const rel = pathname.replace(/^\/?storage\/reportFile\/?/, "");

  return path.join(process.cwd(), "reportFile", rel);
}

function sanitizeBaseName(name: string) {
  return name
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

async function ensureDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

async function getUniqueFileName(dir: string, base: string, ext: string) {
  let name = `${base}.${ext}`;
  let counter = 1;
  while (existsSync(path.join(dir, name))) {
    name = `${base}-${counter}.${ext}`;
    counter++;
  }
  return name;
}

const ALLOWED = [
  "pdf",
  "html",
  "htm",
  "mp3",
  "wav",
  "m4a",
  "aac",
  "ogg",
  "flac",
];

/* -----------------------------------------------------
   PUT — update document (STRICT)
------------------------------------------------------*/
export async function PUT(req: NextRequest) {
  const guard = authGuard(req);
  if (guard) return guard;

  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "multipart/form-data required" },
      { status: 400 }
    );
  }

  try {
    const form = await req.formData();

    const id = String(form.get("id") || "");
    if (!id)
      return NextResponse.json(
        { error: "Document ID missing" },
        { status: 400 }
      );

    const doc = await prisma.document.findUnique({ where: { id } });
    if (!doc)
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );

    const name = form.get("name") ? String(form.get("name")) : undefined;
    const file = form.get("file") as File | null;

    const useExternal = form.get("useExternal") === "true";
    const externalUrl = form.get("externalUrl")
      ? String(form.get("externalUrl"))
      : "";

    /* --------------------------
       Prepare DB updates
    ---------------------------*/
    const updates: any = {};

    if (name) updates.name = name;

    /* =====================================================
       CASE 0 — SWITCH TO EXTERNAL (FIXED BUG)
    ===================================================== */
    if (useExternal) {
      if (!externalUrl.trim()) {
        return NextResponse.json(
          { error: "External URL required" },
          { status: 400 }
        );
      }

      // delete old internal file
      if (!doc.isExternal) {
        const oldAbs = toAbsStorage(doc.url);
        if (existsSync(oldAbs)) {
          await unlink(oldAbs).catch(() => {});
        }
      }

      const updated = await prisma.document.update({
        where: { id },
        data: {
          ...updates,
          url: externalUrl.trim(),
          isExternal: true,
          fileSize: null,
        },
      });

      return NextResponse.json({ document: updated });
    }

    /* =====================================================
       CASE 1 — NAME ONLY UPDATE
    ===================================================== */
    if (!file || file.size === 0) {
      const updated = await prisma.document.update({
        where: { id },
        data: updates,
      });
      return NextResponse.json({ document: updated });
    }

    /* =====================================================
       CASE 2 — FILE UPDATE
    ===================================================== */
    const ext = (file.name.split(".").pop() || "").toLowerCase();
    if (!ALLOWED.includes(ext)) {
      return NextResponse.json(
        { error: "Invalid file type" },
        { status: 400 }
      );
    }

    // delete old internal file
    if (!doc.isExternal) {
      const oldAbs = toAbsStorage(doc.url);
      if (existsSync(oldAbs)) {
        await unlink(oldAbs).catch(() => {});
      }
    }

    const baseName = sanitizeBaseName(
      file.name.replace(/\.[^/.]+$/, "")
    );

    /* ------------------------------------------------
       PHYSICAL STORAGE: /reportFile
    ------------------------------------------------ */
    const absDir = path.join(process.cwd(), "reportFile");
    await ensureDir(absDir);

    const finalName = await getUniqueFileName(absDir, baseName, ext);
    const absPath = path.join(absDir, finalName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(absPath, buffer);

    /* ------------------------------------------------
       PUBLIC URL (DB)
    ------------------------------------------------ */
    updates.url = `/storage/reportFile/${finalName}`;
    updates.fileSize = buffer.byteLength;
    updates.isExternal = false;

    const updated = await prisma.document.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json({ document: updated });
  } catch (err: any) {
    console.error("PUT /api/admin/documents ERROR:", err);
    return NextResponse.json(
      { error: "Update failed", details: String(err.message) },
      { status: 500 }
    );
  }
}

/* -----------------------------------------------------
   DELETE
------------------------------------------------------*/
export async function DELETE(req: NextRequest) {
  const guard = authGuard(req);
  if (guard) return guard;

  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id)
      return NextResponse.json({ error: "id required" }, { status: 400 });

    const doc = await prisma.document.findUnique({ where: { id } });
    if (!doc) return NextResponse.json({ error: "not found" }, { status: 404 });

    if (!doc.isExternal) {
      const abs = toAbsStorage(doc.url);
      if (existsSync(abs)) {
        await unlink(abs).catch(() => {});
      }
    }

    await prisma.document.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("DELETE /api/admin/documents ERROR:", err);
    return NextResponse.json(
      { error: "Delete failed", details: String(err.message) },
      { status: 500 }
    );
  }
}
