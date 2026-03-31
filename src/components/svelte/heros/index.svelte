<script lang="ts">
  import Button from "$svelte/button.svelte";
  import Music from "../spinners/music.svelte";

  const title_parts = ["Johan JANIN //", "Architecte", "Digital"];
</script>

<div
  class="h-full grid grid-cols-[60%_1fr] items-center px-12 py-18 border-b-black border-b-2"
>
  <section class="grid tracking-wider gap-12">
    <p class="uppercase font-heading text-primary-700 text-xs" data-location>
      Lyon / 45.7640° N, 4.8357° E
    </p>

    <h1
      class="text-[6svw]/25 tracking-tighter font-heading uppercase font-bold"
    >
      {#each title_parts as part, index}
        <span
          class={{
            block: true,
            "text-primary tracking-tight": index % 2,
          }}
        >
          {part}
        </span>
      {/each}
    </h1>

    <p class="max-w-[40svw] text-black-400">
      Développeur Full-Stack & explorateur de code. Je transforme les idées en
      solutions digitales efficaces, innovantes et collaboratives.
    </p>

    <div class="flex items-center gap-4">
      <Button
        level="primary"
        action={{
          url: "/portfolio",
        }}
        class="py-4 px-5"
      >
        Voir mes projets
      </Button>

      <Button
        level="neutral"
        action={{
          url: "/contact",
        }}
        class="py-4 px-5"
      >
        Me recruter
      </Button>
    </div>
  </section>
  <section class="flex justify-center items-center w-full h-full">
    <div class="h-40/100">
      <Music />
    </div>
  </section>
</div>

<style>
  [data-location] {
    --bar-size: calc(var(--spacing) * 18);
    --bar-mr: calc(var(--spacing) * 6);

    padding-left: calc(var(--bar-size) + var(--bar-mr));
    position: relative;
    &::before {
      content: "";
      position: absolute;

      top: 50%;
      left: 0;
      width: var(--bar-size);
      height: 0.35em;

      translate: 0 -50%;

      background-color: currentColor;
      border-radius: calc(infinity * 1px);
    }
  }
</style>
