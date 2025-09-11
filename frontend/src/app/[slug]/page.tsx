import { type SanityDocument } from "next-sanity";
import { client, urlFor } from "@/lib/sanity.client";
import Link from "next/link";
import PortableText from "@/components/PortableText";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  const postImageUrl = post.image ? urlFor(post.image).width(800).height(400).fit("crop").url() : null;

  if (!post) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <h1 className="text-4xl font-bold mb-8">Post not found</h1>
        <Link href="/" className="text-green-600 hover:underline">
          ← Back to posts
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-8">
      <Link href="/" className="text-green-600 hover:underline mb-8 inline-block">
        ← Back to posts
      </Link>

      {postImageUrl && <img src={postImageUrl} alt={post.title} className="w-full aspect-video rounded-xl mb-8 object-cover" />}

      <div className="mb-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">{post.category}</span>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-gray-600">
          Published:{" "}
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="prose prose-lg max-w-none">{Array.isArray(post.body) && <PortableText content={post.body} />}</div>
    </main>
  );
}
