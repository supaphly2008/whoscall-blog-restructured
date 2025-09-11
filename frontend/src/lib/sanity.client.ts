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

// Function to fetch featured posts
export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await client.fetch<Post[]>(`
    *[_type == "post" && isFeatured == true] | order(publishedAt desc) {
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
  `);

  return posts;
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
