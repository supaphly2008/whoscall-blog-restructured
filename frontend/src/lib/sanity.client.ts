import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { Post } from "./sanity.types";

export const client = createClient({
  projectId: "b5nfliuf",
  dataset: "production",
  useCdn: false, // Set to true for production
  apiVersion: "2024-01-01",
});

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source: any) {
  return builder.image(source);
}

// Example function to fetch posts with full type safety
export async function getPosts(): Promise<Post[]> {
  const posts = await client.fetch<Post[]>(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      locale,
      title,
      slug,
      publishedAt,
      category,
      tags,
      isFeatured,
      image,
      body
    }
  `);

  return posts;
}

// Function to fetch posts by locale
export async function getPostsByLocale(locale: string): Promise<Post[]> {
  // Map locale to document type
  const documentType = locale === "en" ? "postEn" : locale === "zh-hant" ? "postZhHant" : "post";

  const posts = await client.fetch<Post[]>(
    `
    *[_type == $documentType] | order(publishedAt desc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      slug,
      publishedAt,
      category,
      tags,
      isFeatured,
      image,
      body
    }
  `,
    { documentType }
  );

  // Add locale field to posts for consistency
  return posts.map((post) => ({ ...post, locale }));
}

// Example function to fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await client.fetch<Post | null>(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      locale,
      title,
      slug,
      publishedAt,
      category,
      tags,
      isFeatured,
      image,
      body
    }
  `,
    { slug }
  );

  return post;
}

// Function to fetch a single post by slug and locale
export async function getPostBySlugAndLocale(slug: string, locale: string): Promise<Post | null> {
  // Map locale to document type
  const documentType = locale === "en" ? "postEn" : locale === "zh-hant" ? "postZhHant" : "post";

  const post = await client.fetch<Post | null>(
    `
    *[_type == $documentType && slug.current == $slug][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      slug,
      publishedAt,
      category,
      tags,
      isFeatured,
      image,
      body
    }
  `,
    { slug, documentType }
  );

  // Add locale field for consistency
  return post ? { ...post, locale } : null;
}

// Function to fetch featured posts
export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await client.fetch<Post[]>(`
    *[_type == "post" && isFeatured == true] | order(publishedAt desc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      locale,
      title,
      slug,
      publishedAt,
      category,
      tags,
      isFeatured,
      image,
      body
    }
  `);

  return posts;
}

// Function to fetch featured posts by locale
export async function getFeaturedPostsByLocale(locale: string): Promise<Post[]> {
  // Map locale to document type
  const documentType = locale === "en" ? "postEn" : locale === "zh-hant" ? "postZhHant" : "post";

  const posts = await client.fetch<Post[]>(
    `
    *[_type == $documentType && isFeatured == true] | order(publishedAt desc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      slug,
      publishedAt,
      category,
      tags,
      isFeatured,
      image,
      body
    }
  `,
    { documentType }
  );

  // Add locale field for consistency
  return posts.map((post) => ({ ...post, locale }));
}

// Function to fetch posts by category
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await client.fetch<Post[]>(
    `
    *[_type == "post" && category == $category] | order(publishedAt desc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      locale,
      title,
      slug,
      publishedAt,
      category,
      tags,
      isFeatured,
      image,
      body
    }
  `,
    { category }
  );

  return posts;
}

// Function to fetch posts by category and locale
export async function getPostsByCategoryAndLocale(category: string, locale: string): Promise<Post[]> {
  // Map locale to document type
  const documentType = locale === "en" ? "postEn" : locale === "zh-hant" ? "postZhHant" : "post";

  const posts = await client.fetch<Post[]>(
    `
    *[_type == $documentType && category == $category] | order(publishedAt desc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      slug,
      publishedAt,
      category,
      tags,
      isFeatured,
      image,
      body
    }
  `,
    { category, documentType }
  );

  // Add locale field for consistency
  return posts.map((post) => ({ ...post, locale }));
}

// Function to fetch categories by locale
export async function getCategoriesByLocale(locale: string): Promise<any[]> {
  // Map locale to document type
  const documentType = locale === "en" ? "categoryEn" : locale === "zh-hant" ? "categoryZhHant" : "category";

  const categories = await client.fetch<any[]>(
    `
    *[_type == $documentType && isActive == true] | order(name asc) {
      _id,
      name,
      slug,
      color
    }
  `,
    { documentType }
  );

  return categories;
}
