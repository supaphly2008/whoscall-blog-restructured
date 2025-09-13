import { defineField, defineType } from "sanity";

export const postEnType = defineType({
  name: "postEn",
  title: "Post (en)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "categoryEn" }],
      options: {
        filter: "isActive == true",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "isFeatured",
      type: "boolean",
      title: "Featured Post",
      description: "Mark this post as featured to highlight it on the homepage",
      initialValue: false,
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }, { type: "figure" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      media: "image",
    },
    prepare(selection) {
      const { title, publishedAt } = selection;
      const date = new Date(publishedAt).toLocaleDateString();

      return {
        title: title,
        subtitle: `🇺🇸 English • ${date}`,
        media: selection.media,
      };
    },
  },
});
