import { type SanityDocument } from "next-sanity";
import { client, urlFor } from "@/lib/sanity.client";
import Link from "next/link";
import PortableText from "@/components/PortableText";
import TableOfContents from "@/components/TableOfContents";
import SocialShare from "@/components/SocialShare";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
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
  image,
  body
}`;

const options = { next: { revalidate: 30 } };

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  const postImageUrl = post.image ? urlFor(post.image).width(800).height(400).fit("crop").url() : null;

  if (!post) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto max-w-6xl p-8">
          <h1 className="text-4xl font-bold mb-8">Post not found</h1>
          <Link href="/" className="text-green-600 hover:underline">
            ← Back to posts
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto max-w-4xl p-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Blog
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-green-600 capitalize">{post.category?.name}</span>
        </nav>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}{" "}
              • Whoscall
            </p>
            <SocialShare title={post.title} url={`/blog/${post.slug.current}`} />
          </div>
        </div>

        {/* Featured Image */}
        {postImageUrl && (
          <div className="mb-8">
            <img src={postImageUrl} alt={post.title} className="w-full rounded-lg" />
          </div>
        )}

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">{Array.isArray(post.body) && <PortableText content={post.body} />}</div>
      </div>
    </main>
  );
}
