import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/lib/sanity.client";
import PostsGrid from "@/components/PostsGrid";

const FEATURED_POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && isFeatured == true
]|order(publishedAt desc)[0...4]{
  _id, 
  title, 
  slug, 
  publishedAt,
  category,
  tags,
  isFeatured,
  image
}`;

const REGULAR_POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && isFeatured != true
]|order(publishedAt desc)[0...8]{
  _id, 
  title, 
  slug, 
  publishedAt,
  category,
  tags,
  isFeatured,
  image
}`;

const CATEGORIES_QUERY = `array::unique(*[_type == "post" && defined(category)].category)`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const [featuredPosts, regularPosts, categories] = await Promise.all([client.fetch<SanityDocument[]>(FEATURED_POSTS_QUERY, {}, options), client.fetch<SanityDocument[]>(REGULAR_POSTS_QUERY, {}, options), client.fetch<string[]>(CATEGORIES_QUERY, {}, options)]);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-bold text-gray-900">Whoscall blog</h1>
        </div>
      </section>

      {/* Featured Articles Section */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Featured articles</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Large Featured Article */}
              <div className="lg:col-span-2">
                {featuredPosts[0] && (
                  <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden">
                    <Link href={`/${featuredPosts[0].slug.current}`} className="block group">
                      {/* Image placeholder */}
                      <div className="h-64 bg-gray-200 flex items-center justify-center relative">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-2xl">W</span>
                        </div>
                        {/* New badge */}
                        <div className="absolute top-4 right-4">
                          <div className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">N</div>
                        </div>
                      </div>
                      <div className="p-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-3">{featuredPosts[0].category}</span>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">{featuredPosts[0].title}</h3>
                        <p className="text-gray-500 text-sm">
                          {new Date(featuredPosts[0].publishedAt).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          • Whoscall
                        </p>
                      </div>
                    </Link>
                  </article>
                )}
              </div>

              {/* Sidebar Articles */}
              <div className="space-y-6">
                {featuredPosts.slice(1, 4).map((post) => (
                  <article key={post._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden">
                    <Link href={`/${post.slug.current}`} className="block group">
                      <div className="flex">
                        {/* Image placeholder */}
                        <div className="w-24 h-24 bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">W</span>
                          </div>
                        </div>
                        <div className="p-4 flex-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2">{post.category}</span>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">{post.title}</h3>
                          <p className="text-gray-500 text-xs">
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}{" "}
                            • Whoscall
                          </p>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <PostsGrid posts={regularPosts} categories={categories} />
        </div>
      </section>
    </main>
  );
}
