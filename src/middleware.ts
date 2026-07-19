import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Protect API routes
  if (pathname.startsWith("/api/resume") || pathname.startsWith("/api/ai") || pathname === "/api/auth/me" || pathname === "/api/auth/logout") {
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  // Protect /resume frontend routes
  if (pathname.startsWith("/resume")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Prevent logged in users from accessing auth pages
  if (pathname.startsWith("/auth")) {
    if (token) {
      return NextResponse.redirect(new URL("/resume", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/resume/:path*", "/auth/:path*", "/api/:path*"],
};
