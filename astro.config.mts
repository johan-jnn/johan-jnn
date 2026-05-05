// @ts-check
import { defineConfig } from "astro/config";

import node from "@astrojs/node";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import rehypeAutolinkHeadings, {
  type Options as AutoLinkHeadingsOptions,
} from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: "standalone",
  }),

  integrations: [
    svelte({
      compilerOptions: {
        experimental: {
          async: true,
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          content: {
            children: [],
            properties: {
              class: "heading-link-icon",
            },
            tagName: "span",
            type: "element",
          },
        } satisfies AutoLinkHeadingsOptions,
      ],
    ],
    syntaxHighlight: "shiki",
  },
});
