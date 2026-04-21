import type Techno from "$src/components/svelte/cards/techno.svelte";

export interface ProjectOverview {
  name: string;
  description: string;
  category: string;
  tags: string[];
  stack: Techno[];
  cover: string;
  slug: string;
  date?: Date;
}

export interface Project extends ProjectOverview {
  presentation: {
    title?: string; // If undefined -> take the project's name
    subtitle?: string; // If undefined -> take the project's description
  };
  body: string;
  gallery?: string[];
  related_projects?: ProjectOverview[];
}
