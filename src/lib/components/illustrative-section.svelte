<script lang="ts">
  import type { Snippet } from "svelte";

  const props: {
    label: string;
    id?: string;
    description: string;
    children: Snippet;

    rotate_dir?: 1 | 0 | -1;
  } = $props();
</script>

<section
  id={props.id}
  class="bg-white py-8 px-4 rounded-2xl aspect-[3/4] min-w-[260px] transition-all hover:scale-105 {props.rotate_dir !==
  0
    ? `hover:${props.rotate_dir === -1 ? '-' : ''}rotate-5`
    : ''} hover:shadow-2xl shadow-black/25"
>
  <div>
    <h3 class="font-heading text-4xl">{props.label}</h3>
    <p>{props.description}</p>
  </div>
  <hr class="my-4" />
  <div>
    {@render props.children()}
  </div>
</section>
