import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "../../../shared/schemaTypes";

export default defineConfig({
  name: "default",
  title: "whoscall blog",

  projectId: "b5nfliuf",
  dataset: "production",
  basePath: "/studio",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
