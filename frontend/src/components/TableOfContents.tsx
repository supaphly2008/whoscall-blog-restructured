"use client";

import { useEffect, useState } from "react";

interface TableOfContentsProps {
  content: any[];
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from Portable Text content
    const extractedHeadings: Array<{ id: string; text: string; level: number }> = [];

    const extractHeadings = (blocks: any[]) => {
      blocks.forEach((block) => {
        if (block._type === "block" && block.style && block.style.startsWith("h")) {
          const level = parseInt(block.style.replace("h", ""));
          if (level >= 2 && level <= 6) {
            const text = block.children?.map((child: any) => child.text).join("") || "";
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "");
            extractedHeadings.push({ id, text, level });
          }
        }
      });
    };

    if (content) {
      extractHeadings(content);
    }

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(({ id }) => document.getElementById(id)).filter(Boolean);

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element && element.getBoundingClientRect().top <= 100) {
          setActiveId(element.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Table of contents</h3>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a key={heading.id} href={`#${heading.id}`} className={`block py-1 text-sm transition-colors ${activeId === heading.id ? "text-green-600 bg-green-50 px-2 rounded" : "text-gray-600 hover:text-gray-900"}`} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
