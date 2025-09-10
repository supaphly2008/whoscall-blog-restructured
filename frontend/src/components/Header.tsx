"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [isPartnersOpen, setIsPartnersOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPartnersOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-green-50 px-6 py-4">
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
            Features
          </Link>
          <Link href="/premium" className="text-gray-700 hover:text-green-600 transition-colors">
            Premium
          </Link>
          <Link href="/enterprise" className="text-gray-700 hover:text-green-600 transition-colors">
            Enterprise
          </Link>

          {/* Partners Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsPartnersOpen(!isPartnersOpen)} className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors">
              <span>Partners</span>
              <svg className={`w-4 h-4 transition-transform ${isPartnersOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isPartnersOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <Link href="/partners/developers" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                  Developers
                </Link>
                <Link href="/partners/resellers" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                  Resellers
                </Link>
                <Link href="/partners/integrations" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                  Integrations
                </Link>
              </div>
            )}
          </div>

          <Link href="/blog" className="text-gray-700 hover:text-green-600 transition-colors">
            Blog
          </Link>
        </nav>

        {/* Download Button */}
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">Download</button>

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
