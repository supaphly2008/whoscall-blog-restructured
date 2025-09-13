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
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "color",
      type: "string",
      title: "Color",
      description: "Hex color code for the category (e.g., #3B82F6)",
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
      color: "color",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, color, isActive } = selection;
      const status = isActive ? "✅" : "❌";

      return {
        title: title,
        subtitle: `🇹🇼 繁體中文 • ${status} • ${color}`,
      };
    },
  },
});
