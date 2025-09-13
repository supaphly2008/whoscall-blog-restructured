import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const supportedLocales = ["en", "zh-hant"];

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname starts with an invalid locale
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // If first segment looks like a locale but isn't supported, redirect to English
  if (firstSegment && firstSegment.length >= 2 && !supportedLocales.includes(firstSegment)) {
    const pathWithoutLocale = `/${segments.slice(1).join("/")}`;
    const redirectPath = pathWithoutLocale === "/" ? "/en/blog" : `/en${pathWithoutLocale}`;

    console.log(`Redirecting invalid locale '${firstSegment}' from ${pathname} to ${redirectPath}`);
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // Use the default next-intl middleware for valid locales
  return createMiddleware({
    locales: supportedLocales,
    defaultLocale: "en",
    localePrefix: "always",
  })(request);
}

export const config = {
  // Match all pathnames except for static files and API routes
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico|studio).*)",
  ],
};
