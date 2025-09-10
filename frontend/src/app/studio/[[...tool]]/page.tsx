"use client";

import { renderStudio } from "sanity";
import config from "../../../lib/sanity.config";
import { useEffect, useRef } from "react";

export default function StudioPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear any existing content
      containerRef.current.innerHTML = "";

      // Render the studio
      renderStudio(containerRef.current, config, {
        reactStrictMode: false,
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    />
  );
}
