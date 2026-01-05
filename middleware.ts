import { NextRequest, NextResponse } from "next/server";

const ADMIN_TOKEN = process.env.ADMIN_API_SECRET; // set this in env

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /* -------------------------------
     PROTECTED ROUTES
  -------------------------------- */
  const isAdminApi = pathname.startsWith("/api/admin/");
  const isPdfRoute = pathname.startsWith("/pdf/");

  if (isAdminApi || isPdfRoute) {
    const token =
      req.headers.get("authorization")?.replace("Bearer ", "") ||
      req.headers.get("x-access-token");

    // ❌ Missing token
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: token required" },
        { status: 401 }
      );
    }

    // ❌ Invalid token
    if (token !== ADMIN_TOKEN) {
      return NextResponse.json(
        { error: "Forbidden: invalid token" },
        { status: 403 }
      );
    }
  }

  /* -------------------------------
     CORS (Admin API only)
  -------------------------------- */
  if (isAdminApi) {
    const res = NextResponse.next();
    const origin = req.headers.get("origin") || "*";

    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Access-Token"
    );
    res.headers.set("Access-Control-Max-Age", "86400");

    if (req.method === "OPTIONS") {
      return new NextResponse(null, { status: 204, headers: res.headers });
    }

    return res;
  }

  /* -------------------------------
     FORCE /pdf/* TO ROUTE HANDLER
  -------------------------------- */
  if (isPdfRoute) {
    return NextResponse.rewrite(
      new URL(`/pdf/${pathname.replace("/pdf/", "")}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/admin/:path*",
  ],
};
