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
  const rel = pathname.replace(/^\/?storage\/reportFile\/?/, "");
  return path.join(process.cwd(), "reportFile", rel);
}

function ensureDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
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
   PUT — update document (URL IMMUTABLE)
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
    if (!id) {
      return NextResponse.json(
        { error: "Document ID missing" },
        { status: 400 }
      );
    }

    const doc = await prisma.document.findUnique({ where: { id } });
    if (!doc) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    const name = form.get("name") ? String(form.get("name")) : undefined;
    const file = form.get("file") as File | null;

    const useExternal = form.get("useExternal") === "true";
    const externalUrl = form.get("externalUrl")
      ? String(form.get("externalUrl"))
      : "";

    const updates: any = {};
    if (name) updates.name = name;

    /* =====================================================
       CASE 0 — SWITCH TO EXTERNAL
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
        const abs = toAbsStorage(doc.url);
        if (existsSync(abs)) await unlink(abs).catch(() => {});
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
       CASE 2 — FILE REPLACE (SAME URL)
    ===================================================== */
    const uploadedExt = (file.name.split(".").pop() || "").toLowerCase();
    if (!ALLOWED.includes(uploadedExt)) {
      return NextResponse.json(
        { error: "Invalid file type" },
        { status: 400 }
      );
    }

    // extension must stay the same
    const existingExt = path
      .extname(doc.url)
      .replace(".", "")
      .toLowerCase();

    if (existingExt !== uploadedExt) {
      return NextResponse.json(
        { error: "File extension must remain the same" },
        { status: 400 }
      );
    }

    // ensure directory exists
    const absPath = toAbsStorage(doc.url);
    await ensureDir(path.dirname(absPath));

    // overwrite file (URL unchanged)
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(absPath, buffer);

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
    if (!doc)
      return NextResponse.json({ error: "not found" }, { status: 404 });

    if (!doc.isExternal) {
      const abs = toAbsStorage(doc.url);
      if (existsSync(abs)) await unlink(abs).catch(() => {});
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
