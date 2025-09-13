import { defineField, defineType } from "sanity";

export const categoryZhHantType = defineType({
  name: "categoryZhHant",
  title: "Category (zh-hant)",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        slugify: async (input, schema, context) => {
          const { generateUniqueSlug } = await import("../utils/slugify");
          return generateUniqueSlug(input, schema.name, context.getClient({ apiVersion: "2024-01-01" }));
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isActive",
      type: "boolean",
      title: "Active",
      description: "Whether this category is active and should be displayed",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, isActive } = selection;
      const status = isActive ? "✅" : "❌";

      return {
        title: title,
        subtitle: `🇹🇼 繁體中文 • ${status}`,
      };
    },
  },
});
