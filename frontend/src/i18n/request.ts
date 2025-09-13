import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

const locales = ["en", "zh-hant"];

export default getRequestConfig(async ({ locale }) => {
  // Fallback: try to get locale from headers if not provided
  if (!locale) {
    const headersList = headers();
    const pathname = (await headersList).get("x-pathname") || "";

    // Extract locale from pathname like /en/blog -> en
    const localeMatch = pathname.match(/^\/([a-z]{2})/);
    locale = localeMatch?.[1] || "en";
  }

  if (!locales.includes(locale as any)) {
    locale = "en"; // fallback
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
