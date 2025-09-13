"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [isPartnersOpen, setIsPartnersOpen] = useState(false);
  const t = useTranslations("navigation");
  const tPartners = useTranslations("partners");

  return (
    <header className="sticky top-0 z-50 bg-white px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">w</span>
          </div>
          <span className="text-green-600 font-bold text-xl">whoscall</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-gray-700 hover:text-green-600 transition-colors">
            {t("features")}
          </Link>
          <Link href="/premium" className="text-gray-700 hover:text-green-600 transition-colors">
            {t("premium")}
          </Link>
          <Link href="/enterprise" className="text-gray-700 hover:text-green-600 transition-colors">
            {t("enterprise")}
          </Link>

          {/* Partners Dropdown */}
          <div className="relative" onMouseEnter={() => setIsPartnersOpen(true)} onMouseLeave={() => setIsPartnersOpen(false)}>
            <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors">
              <span>{t("partners")}</span>
              <svg className={`w-4 h-4 transition-transform ${isPartnersOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isPartnersOpen && (
              <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50" onMouseEnter={() => setIsPartnersOpen(true)} onMouseLeave={() => setIsPartnersOpen(false)}>
                <Link href="/partners/ads" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                  {tPartners("adsPartners")}
                </Link>
                <Link href="/partners/Gifting" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                  {tPartners("gifting")}
                </Link>
              </div>
            )}
          </div>

          <Link href="/blog" className="text-gray-700 hover:text-green-600 transition-colors">
            {t("blog")}
          </Link>
        </nav>

        {/* Language Switcher and Download Button */}
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">{t("download")}</button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
