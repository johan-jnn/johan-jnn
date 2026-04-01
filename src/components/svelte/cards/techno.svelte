<script lang="ts">
  import moment from "moment";
  import type { Snippet } from "svelte";

  const {
    name,
    color,
    animation,
    presentation,
    used_since,
  }: {
    name: string;
    color: string;

    presentation?: string;
    used_since?: Date;

    animation?: Snippet<
      [
        {
          color: string;
          state: number;
        },
      ]
    >;
  } = $props();
</script>

<article
  class="border-3 border-black neo-shadow-black neo-shadow p-4 font-heading uppercase font-bold"
  style="--theme:{color}"
>
  <header
    class="flex items-center justify-between relative pr-8 after:content-[''] after:top-50/100 after:-translate-y-50/100 after:absolute after:right-0 after:h-80/100 after:aspect-square after:rounded-full after:bg-(--theme)"
  >
    <h3 class="text-2xl text-black-400">
      {name}
    </h3>
  </header>
  <main>
    <p>{presentation}</p>
    {#if animation}
      <div>
        {@render animation({ color, state: 0 })}
      </div>
    {/if}
  </main>
  <footer>
    <p>Depuis {moment(used_since).locale("fr").fromNow(true)}</p>
  </footer>
</article>
