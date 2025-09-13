"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh-hant", name: "繁體中文", flag: "🇹🇼" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Extract current locale from pathname
  const getCurrentLocale = () => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const firstSegment = pathSegments[0];
    return languages.find((lang) => lang.code === firstSegment)?.code || "en";
  };

  const currentLocale = getCurrentLocale();

  const handleLanguageChange = (newLocale: string) => {
    // Remove all locale prefixes from the pathname
    let pathWithoutLocale = pathname;

    // Remove any existing locale prefixes
    languages.forEach((lang) => {
      pathWithoutLocale = pathWithoutLocale.replace(new RegExp(`^/${lang.code}(?=/)`), "");
    });

    // Ensure we have a leading slash
    if (!pathWithoutLocale.startsWith("/")) {
      pathWithoutLocale = "/" + pathWithoutLocale;
    }

    // If path is just "/", default to "/blog"
    if (pathWithoutLocale === "/") {
      pathWithoutLocale = "/blog";
    }

    // Debug logging
    console.log("Language switch:", {
      currentLocale,
      newLocale,
      pathname,
      pathWithoutLocale,
      finalUrl: `/${newLocale}${pathWithoutLocale}`,
    });

    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-green-600 transition-colors">
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium">{currentLanguage.name}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {languages.map((language) => (
            <button key={language.code} onClick={() => handleLanguageChange(language.code)} className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${language.code === currentLocale ? "bg-green-50 text-green-600" : "text-gray-700"}`}>
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-medium">{language.name}</span>
              {language.code === currentLocale && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
