import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

const MIME_MAP: Record<string, string> = {
  ".pdf": "application/pdf",
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".m4a": "audio/mp4",
  ".aac": "audio/aac",
  ".flac": "audio/flac",
  ".ogg": "audio/ogg",
};

function sanitizeFilename(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[^\x00-\x7F]/g, "-");
}

export async function GET(
  req: Request,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path: parts } = await ctx.params;

  const notFoundHtmlPath = path.join(
    process.cwd(),
    "public",
    "pdf-not-found.html"
  );

  const filePath = path.join(process.cwd(), ...parts);

  if (!fs.existsSync(filePath)) {
    const html = fs.readFileSync(notFoundHtmlPath);

    return new NextResponse(html, {
      status: 404,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  }

  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME_MAP[ext] || "application/octet-stream";

  const stat = fs.statSync(filePath);
  const buffer = fs.readFileSync(filePath);

  const originalName = parts.at(-1) || "file";
  const safeFileName = sanitizeFilename(originalName);

  const headers: Record<string, string> = {
    "Content-Type": mime,
    "Content-Length": stat.size.toString(),
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=3600",
  };

  // Audio player support
  if (mime.startsWith("audio/")) {
    headers["Content-Disposition"] = `inline; filename="${safeFileName}"`;
    headers["Access-Control-Expose-Headers"] = "Content-Disposition";
  }

  // PDF inline viewer
  if (mime === "application/pdf") {
    headers["Content-Disposition"] = `inline; filename="${safeFileName}"`;
  }

  return new Response(buffer, { headers });
}
