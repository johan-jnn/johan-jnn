import type SkillCategory from "$lib/components/skillCategory.svelte";
import type { ComponentProps } from "svelte";

export const SkillCategories: ComponentProps<typeof SkillCategory>[] = [
  {
    category: {
      name: "Front-End",
    },
    revealChildren: false,
    stacks: [
      "devicon:html5",
      "devicon:css3",
      "devicon:tailwindcss",
      "devicon:sass",
      "devicon:typescript",
    ],
  },
  {
    category: {
      name: "Back-End",
    },
    revealChildren: false,
    stacks: ["devicon:nodejs-wordmark", "devicon:laravel"],
  },
  {
    category: {
      name: "Databases",
    },
    revealChildren: false,
    stacks: ["devicon:mysql", "devicon:postgresql"],
  },
  {
    category: {
      name: "Deployment & CI/CD",
    },
    revealChildren: false,
    stacks: ["devicon:docker", "devicon:githubactions", "devicon:git"],
  },
];
