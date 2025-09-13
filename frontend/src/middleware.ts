import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en"],

  // Used when no locale matches
  defaultLocale: "en",

  // Redirect to /[locale]/blog instead of /[locale]
  localePrefix: "always",
});

export const config = {
  // Match only internationalized pathnames - FIXED: removed 'de', added your actual locales
  matcher: ["/", "/(en)/:path*"],
};
