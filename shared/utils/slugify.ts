/**
 * Multi-language slug generation utility
 * Handles English, Chinese, and other languages
 */

import { pinyin } from "pinyin-pro";

export function slugify(input: string): string {
  if (!input) return "";

  let processed = input.trim();

  // Extract English words first (they're usually brand names or important terms)
  const englishWords = processed.match(/[a-zA-Z]+/g) || [];

  // Convert Chinese characters to pinyin using the library
  const pinyinResult = pinyin(processed, {
    toneType: "none", // Remove tone marks
    type: "string", // Return as string
    nonZh: "consecutive", // Keep non-Chinese characters
  });

  // Clean up the pinyin result
  const cleanedPinyin = pinyinResult
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, " ") // Replace non-alphanumeric with spaces
    .replace(/\s+/g, " ") // Normalize spaces
    .trim();

  // Split pinyin into words
  const pinyinWords = cleanedPinyin.split(" ").filter(Boolean);

  // Combine English words with pinyin words
  const combined = [...englishWords, ...pinyinWords];

  // If we have meaningful content, use it; otherwise fall back to a generic slug
  let slug = combined.length > 0 ? combined.join("-") : "post";

  return (
    slug
      // Clean up the slug
      .replace(/[^a-zA-Z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "")
      .substring(0, 50)
      .replace(/-+$/, "") || "post"
  );
}

/**
 * Generate a unique slug by checking for existing slugs
 */
export async function generateUniqueSlug(input: string, documentType: string, client: any, currentDocumentId?: string): Promise<string> {
  const baseSlug = slugify(input);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    // Check if slug exists (excluding current document if editing)
    const existingQuery = currentDocumentId ? `*[_type == "${documentType}" && slug.current == "${slug}" && _id != "${currentDocumentId}"][0]` : `*[_type == "${documentType}" && slug.current == "${slug}"][0]`;

    const existing = await client.fetch(existingQuery);

    if (!existing) {
      return slug;
    }

    // If slug exists, append counter
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}
