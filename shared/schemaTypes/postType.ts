import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post (Legacy)",
  type: "document",
  fields: [
    defineField({
      name: "locale",
      type: "string",
      title: "Language/Locale",
      description: "Select the language for this post",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "繁體中文", value: "zh-hant" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
      initialValue: "en",
    }),
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
      to: [{ type: "category" }],
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
      of: [
        { type: "block" },
        {
          type: "image",
          name: "inlineImage",
          title: "Inline Image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              description: "Alternative text for accessibility",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Optional caption for the image",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      locale: "locale",
      publishedAt: "publishedAt",
      media: "image",
    },
    prepare(selection) {
      const { title, locale, publishedAt } = selection;
      const localeLabel = locale === "en" ? "🇺🇸 EN" : "🇹🇼 ZH";
      const date = new Date(publishedAt).toLocaleDateString();

      return {
        title: title,
        subtitle: `${localeLabel} • ${date}`,
        media: selection.media,
      };
    },
  },
});
