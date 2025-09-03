<script lang="ts">
  import Button from "./elements/button.svelte";

  const {
    navitems = {},
  }: {
    navitems?: {
      [key: string]: {
        url: string;
        target?: string;
      };
    };
  } = $props();
</script>

<header
  class="fixed top-0 left-0 w-full grid grid-cols-3 grid-rows-1 p-6 items-center backdrop-blur-xl z-60"
>
  <a href="/" class="h-full">
    <img
      src="/api/logo/random?background=transparent&with-gap=no&with-shield=no"
      alt="Mon logo"
      class="h-12 aspect-square"
    />
  </a>
  <nav>
    <ul class="flex items-center justify-center gap-4">
      {#each Object.entries(navitems) as [label, location]}
        <li>
          <a
            href={location.url}
            target={location.target}
            class="uppercase font-medium text-xl hover:text-primary hover:underline decoration-wavy transition">{label}</a
          >
        </li>
      {/each}
    </ul>
  </nav>
  <div class="flex items-center justify-end">
    <Button
      type={{
        link: {
          url: "#contact",
        },
      }}
    >
      Contact me
    </Button>
  </div>
</header>
