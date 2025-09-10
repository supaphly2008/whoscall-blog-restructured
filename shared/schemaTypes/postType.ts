import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
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
      type: "string",
      options: {
        list: [
          { title: "News", value: "news" },
          { title: "Features", value: "features" },
          { title: "Security", value: "security" },
          { title: "Updates", value: "updates" },
          { title: "Tips & Tricks", value: "tips" },
          { title: "Industry", value: "industry" },
        ],
        layout: "dropdown",
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
      of: [{ type: "block" }],
    }),
  ],
});
