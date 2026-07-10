import { defineCollection } from "astro/content/config";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { reference } from "astro:content";
import { ContentPaths } from "./utils/content/path";

export const components = {
  link: z.object({
    label: z.string(),
    url: z.string(),
    target: z.string().optional(),
  }),
  section: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    important: z.boolean(),
  }),
  contactCta: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
  }),
};

export const collections = {
  technos: defineCollection({
    loader: glob({
      pattern: "*.json",
      base: ContentPaths.root("technos"),
      generateId: ({ data }) => data.id as string,
    }),
    schema: z.object({
      id: z.uuid(),
      name: z.string(),
      description: z.string(),
      icon: z.string(),

      color: z.string().optional(),
      used_since: z.coerce.date().optional(),
      website: z.url().optional(),
    }),
  }),
  "project-categories": defineCollection({
    loader: glob({
      pattern: "*.json",
      base: ContentPaths.root("projects/categories"),
      generateId: ({ data }) => data.id as string,
    }),
    schema: z.object({
      id: z.uuid(),
      title: z.string(),
      description: z.string().optional(),
    }),
  }),
  projects: defineCollection({
    loader: glob({
      pattern: "*.md",
      base: ContentPaths.root("projects/list"),
      generateId: ({ data }) => data.id as string,
    }),
    schema: z.object({
      id: z.uuid(),
      overview: z.object({
        cover: z.string(),
        slug: z.string(),
        name: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        category: reference("project-categories"),
        tags: z.array(z.string()),
      }),
      presentation: z.optional(
        z.object({
          title: z.string().optional(),
          subtitle: z.string().optional(),
        }),
      ),
      gallery: z.string().array().optional(),
      related_projects: z.array(reference("projects")).optional(),
    }),
  }),

  // Settings
  navigation: defineCollection({
    loader: glob({
      pattern: "navigation.json",
      base: ContentPaths.settings(),
    }),
    schema: z.object({
      header: z.object({
        title: z.string(),
        nav: z.array(components.link),
      }),
    }),
  }),

  // Singletons
  home: defineCollection({
    loader: glob({
      pattern: "home.json",
      base: ContentPaths.pages(),
    }),
    schema: z.object({
      hero: z.object({
        localisation: z.string(),
        titles: z.array(
          z.object({
            lines: z.string().array(),
          }),
        ),
        description: z.string(),
        ctas: z.array(components.link),
      }),
      sections: z.object({
        technos: z.object({
          section: components.section,
          technos: z.array(reference("technos")).optional(),
        }),
        projects: z.object({
          section: components.section,
          projects: z.array(reference("projects")).optional(),
        }),
      }),
      contact: components.contactCta,
    }),
  }),
  contact: defineCollection({
    loader: glob({
      pattern: "contact.json",
      base: ContentPaths.pages(),
    }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      links: z
        .array(
          z.object({
            id: z.uuid(),
            icon: z.string(),
            link: components.link,
          }),
        )
        .optional(),
      form: components.contactCta,
    }),
  }),
  mentions: defineCollection({
    loader: glob({
      pattern: "mentions.md",
      base: ContentPaths.pages(),
    }),
    schema: z.object({
      title: z.string(),
    }),
  }),
};
