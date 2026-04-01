export interface ProjectOverview {
  name: string;
  description: string;
  category: string;
  tags: string[];
  cover: string;
}

export interface Project extends ProjectOverview {
  presentation: {
    title?: string; // If undefined -> take the project's name
    subtitle?: string; // If undefined -> take the project's description
    content: string;
  };
  gallery?: string[];
  related_projects?: ProjectOverview[];
}
