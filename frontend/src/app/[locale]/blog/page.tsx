import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";

import { client, urlFor } from "@/lib/sanity.client";
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
  category->{
    _id,
    name,
    slug,
    color
  },
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
  category->{
    _id,
    name,
    slug,
    color
  },
  tags,
  isFeatured,
  image
}`;

const CATEGORIES_QUERY = `*[_type == "category" && isActive == true]{
  _id,
  name,
  slug,
  color
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [featuredPosts, regularPosts, categories] = await Promise.all([client.fetch<SanityDocument[]>(FEATURED_POSTS_QUERY, {}, options), client.fetch<SanityDocument[]>(REGULAR_POSTS_QUERY, {}, options), client.fetch<any[]>(CATEGORIES_QUERY, {}, options)]);

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
                    <Link href={`/${locale}/${featuredPosts[0].slug.current}`} className="block group">
                      {/* Featured Image */}
                      {featuredPosts[0].image ? (
                        <div className="h-64 relative overflow-hidden">
                          <Image
                            src={urlFor(featuredPosts[0].image).width(600).height(300).fit("crop").url()}
                            alt={featuredPosts[0].title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* New badge */}
                          <div className="absolute top-4 right-4">
                            <div className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">N</div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-64 bg-gray-200 flex items-center justify-center relative">
                          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">W</span>
                          </div>
                          {/* New badge */}
                          <div className="absolute top-4 right-4">
                            <div className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">N</div>
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-3">{featuredPosts[0].category?.name}</span>
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
                    <Link href={`/${locale}/${post.slug.current}`} className="block group">
                      <div className="flex">
                        {/* Sidebar Image */}
                        {post.image ? (
                          <div className="w-24 h-24 relative flex-shrink-0 overflow-hidden">
                            <Image src={urlFor(post.image).width(100).height(100).fit("crop").url()} alt={post.title} fill sizes="(max-width: 768px) 100px, 100px" className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-24 h-24 bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">W</span>
                            </div>
                          </div>
                        )}
                        <div className="p-4 flex-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2">{post.category?.name}</span>
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
          <PostsGrid posts={regularPosts} categories={categories} locale={locale} />
        </div>
      </section>
    </main>
  );
}
