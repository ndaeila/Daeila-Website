import { defineConfig } from "tinacms";

// TinaCMS config — Forestry replacement.
// Activate: set TINACLIENTID and TINATOKEN env vars from your Tina Cloud project,
// then run `npm run tina:dev` for the local visual editor.

export default defineConfig({
  clientId: process.env.TINACLIENTID,
  token: process.env.TINATOKEN,
  branch: process.env.HEAD || "main",

  // Hugo stores processable images under assets/images.
  // Tina writes uploaded files back into the repo (Git-backed) at this path.
  media: {
    tina: {
      mediaRoot: "assets/images",
      publicFolder: "assets",
    },
  },
  build: {
    publicFolder: "assets",
    outputDir: "tina/__generated__",
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/blog",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => values?.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            required: true,
            dateFormat: "YYYY-MM-DD",
            timeFormat: false,
          },
          {
            type: "image",
            name: "image",
            label: "Cover Image",
            description: "Path under assets/images, e.g. images/blog/01.jpg",
          },
          {
            type: "string",
            name: "categories",
            label: "Categories",
            list: true,
            description: "e.g. Portfolio, Technology, Product, Analysis",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft (exclude from production build)",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "image",
                label: "Image",
                fields: [{ type: "image", name: "src", label: "Source" }],
              },
            ],
          },
        ],
      },
      {
        name: "page",
        label: "Pages",
        path: "content",
        match: { include: "*.md" },
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Image",
          },
          {
            type: "string",
            name: "description",
            label: "Description (meta / hero subtitle)",
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
            description: "Theme layout to use, e.g. about, contact, resume, search",
            options: ["about", "contact", "resume", "search"],
          },
          {
            type: "string",
            name: "button",
            label: "Button text (where applicable)",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
