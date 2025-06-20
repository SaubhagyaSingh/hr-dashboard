import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;
  console.log("TOKEN", token);

  const publicPaths = ["/", "/login"];
  const isPublicPath = publicPaths.some((path) =>
    req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(`${path}/`)
  );

  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except:
    // - /login and its subroutes
    // - / (homepage)
    // - static files (/favicon.ico, /_next, etc.)
    "/((?!_next|favicon.ico|login|api|assets|$).*)",
  ],
};

  