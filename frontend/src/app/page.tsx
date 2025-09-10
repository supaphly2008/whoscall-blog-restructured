import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id, 
  title, 
  slug, 
  publishedAt,
  category,
  tags,
  isFeatured,
  image
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
        <div className="container mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to the Whoscall Blog</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Stay updated with the latest news, insights, and updates from Whoscall. Discover new features, security tips, and industry trends.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">Read Latest Posts</button>
            <button className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">Subscribe to Updates</button>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="p-6">
                  <Link href={`/${post.slug.current}`} className="block group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{post.category}</span>
                      {post.isFeatured && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">⭐ Featured</span>}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">{post.title}</h3>
                    <p className="text-gray-500 text-sm mb-3">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && <span className="text-xs text-gray-400">+{post.tags.length - 3} more</span>}
                      </div>
                    )}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
