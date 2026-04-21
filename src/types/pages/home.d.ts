export interface Homepage {
  hero: {
    localistation: string;
    titles: { lines: string[] }[];
    description: string;
    ctas: { label: string; url: string; target?: string }[];
  };
  sections: {
    technos: {
      section: {
        title: string;
        subtitle?: string;
        important: boolean;
      };
      technos: string[];
    };
    projects: {
      section: {
        title: string;
        important: boolean;
        subtitle?: string;
      };
    };
  };
}
