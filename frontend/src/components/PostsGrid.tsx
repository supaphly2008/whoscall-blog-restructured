"use client";

import Link from "next/link";
import { useState } from "react";
import { type SanityDocument } from "next-sanity";

interface PostsGridProps {
  posts: SanityDocument[];
  categories: string[];
}

export default function PostsGrid({ posts, categories }: PostsGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts;

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => handleCategoryChange(null)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeCategory === null ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
          View all
        </button>
        {categories.map((category) => (
          <button key={category} onClick={() => handleCategoryChange(category)} className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${activeCategory === category ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article key={post._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden">
            <Link href={`/${post.slug.current}`} className="block group">
              {/* Image placeholder */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 font-bold text-lg">W</span>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-3">{post.category}</span>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">{post.title}</h3>
                <p className="text-gray-500 text-sm">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  • Whoscall
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found in this category.</p>
        </div>
      )}

      {filteredPosts.length > 0 && (
        <div className="text-center mt-12">
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">View all</button>
        </div>
      )}
    </>
  );
}
