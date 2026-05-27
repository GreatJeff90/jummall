import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Regex paths requiring explicit session token verification gates
const PROTECTED_ROUTES = [
  /^\/customer(\/|$)/, 
  /^\/seller(\/|$)/, 
  /^\/checkout(\/|$)/
];

export function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;

  // 1. Structural safety gate: Completely ignore Next.js internals, public static images, and the login page itself
  if (
    currentPath.startsWith("/_next") || 
    currentPath.startsWith("/api") ||
    currentPath === "/login" ||
    currentPath.includes(".")
  ) {
    return NextResponse.next();
  }

  const needsAuth = PROTECTED_ROUTES.some((rx) => rx.test(currentPath));
  
  if (!needsAuth) return NextResponse.next();

  // Extract authentication value out of request cookies
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    const loginRedirectUrl = req.nextUrl.clone();
    loginRedirectUrl.pathname = "/login";
    
    // Set the query string destination parameter to drop the user back exactly where they left off
    loginRedirectUrl.searchParams.set("next", currentPath);
    return NextResponse.redirect(loginRedirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  /* Enhanced matcher filter: Excludes internal next framework asset compilers 
    so your dev terminal isn't overwhelmed during HMR ticks.
  */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
    "/customer/:path*", 
    "/seller/:path*", 
    "/checkout/:path*"
  ],
};