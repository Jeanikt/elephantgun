import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Handle auth routes
  if (req.nextUrl.pathname.startsWith("/auth/")) {
    return res;
  }

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const token = await getToken({ req });

    if (!token) {
      const url = new URL("/auth/login", req.url);
      url.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(url);
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
