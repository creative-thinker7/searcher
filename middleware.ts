import { NextRequest, NextResponse } from "next/server";
import { AUTH_STATUS_COOKIE } from "./app/constants";

export default async function middleware(req: NextRequest) {
  const authStatus = req.cookies.get(AUTH_STATUS_COOKIE);

  const path = req.nextUrl.pathname;

  if (path !== "/login" && authStatus?.value !== "true") {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (path === "/login" && authStatus?.value === "true") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*.png|.*.svg$).*)",
  ],
};
