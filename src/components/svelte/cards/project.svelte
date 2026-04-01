<script lang="ts" module>
  import type { ProjectOverview } from "$types/project";

  export interface ProjectCardProps extends ProjectOverview {}
</script>

<script lang="ts">
  const {
    name,
    category,
    cover,
    description,
    tags
  }: ProjectCardProps = $props();
</script>


