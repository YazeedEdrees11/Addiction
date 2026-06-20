import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // Redirect /admin paths to Vercel only if the request isn't already on the Vercel domain
  if (url.pathname.startsWith("/admin") && !host.includes("addiction-eta.vercel.app")) {
    return NextResponse.redirect(
      `https://addiction-eta.vercel.app${url.pathname}${url.search}`
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
