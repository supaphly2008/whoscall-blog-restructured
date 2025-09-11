import { PortableText as BasePortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <div className="my-8">
          <Image src={urlFor(value).width(800).height(400).fit("crop").url()} alt={value.alt || "Image"} width={800} height={400} className="rounded-lg shadow-md" />
          {value.caption && <p className="text-sm text-gray-600 mt-2 text-center italic">{value.caption}</p>}
        </div>
      );
    },
    figure: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <figure className="my-8">
          <Image src={urlFor(value).width(800).height(400).fit("crop").url()} alt={value.alt || "Image"} width={800} height={400} className="rounded-lg shadow-md" />
          {value.caption && <figcaption className="text-sm text-gray-600 mt-2 text-center italic">{value.caption}</figcaption>}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-6">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-5">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-bold text-gray-900 mb-2 mt-4">{children}</h4>,
    normal: ({ children }: any) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-green-500 pl-4 my-6 italic text-gray-600">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-gray-700">{children}</li>,
    number: ({ children }: any) => <li className="text-gray-700">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-gray-900">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>,
    link: ({ children, value }: any) => (
      <a href={value.href} className="text-green-600 hover:text-green-700 underline" target={value.blank ? "_blank" : undefined} rel={value.blank ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    ),
  },
};

interface PortableTextProps {
  content: any;
}

export default function PortableText({ content }: PortableTextProps) {
  if (!content) {
    return null;
  }

  return <BasePortableText value={content} components={components} />;
}
