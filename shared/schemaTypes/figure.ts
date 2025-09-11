// schemas/figure.ts (or .js)
import { defineField, defineType } from "sanity";

export const figureType = defineType({
  name: "figure",
  title: "Figure",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Alt text",
      validation: (r) => r.required().warning("Add alt text for accessibility"),
    }),
    defineField({
      name: "caption",
      type: "string",
      title: "Caption",
    }),
  ],
});
