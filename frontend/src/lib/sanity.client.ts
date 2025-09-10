import { createClient } from "sanity";
import type { Post } from "./sanity.types";

export const client = createClient({
  projectId: "b5nfliuf",
  dataset: "production",
  useCdn: false, // Set to true for production
  apiVersion: "2024-01-01",
});

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
      image,
      body
    }
  `,
    { slug }
  );

  return post;
}
