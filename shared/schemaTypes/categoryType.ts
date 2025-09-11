import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Category Name",
      type: "string",
      validation: (rule) => rule.required().min(1).max(50),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 50,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Optional description for this category",
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      options: {
        list: [
          { title: "Green", value: "green" },
          { title: "Blue", value: "blue" },
          { title: "Purple", value: "purple" },
          { title: "Orange", value: "orange" },
          { title: "Red", value: "red" },
          { title: "Yellow", value: "yellow" },
        ],
        layout: "dropdown",
      },
      initialValue: "green",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Only active categories will be available when creating posts",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle || "No description",
      };
    },
  },
  orderings: [
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Name Z-A",
      name: "nameDesc",
      by: [{ field: "name", direction: "desc" }],
    },
  ],
});
