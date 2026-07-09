<script lang="ts">
  import { AMBIANCE_PLAYER } from "$src/stores/ambiance";

  const SOCIALS = {
    Github: "https://github.com/johan-jnn",
    LinkedIn: "https://linkedin.com/in/johan-janin/",
    "Me contacter": "/contact",
    "Mentions Légales": "/mentions",
  };

  let height = $state(0);
  $effect(() => {
    height && document.body.style.setProperty("--footer-height", height + "px");
  });
</script>

<footer
  class={[
    "py-12 px-8",
    "flex sm:items-end justify-between",
    "font-heading uppercase",

    "fixed bottom-0 left-0 w-full",

    "max-sm:flex-col-reverse max-sm:gap-8",
  ]}
  bind:clientHeight={height}
>
  <section>
    <p class="font-bold text-xl">Johan JANIN</p>
    <p>
      &copy; Johan JANIN // Signal
      {#if $AMBIANCE_PLAYER}
        {#if $AMBIANCE_PLAYER.active}
          Connected
        {:else}
          Buffering
        {/if}
      {:else}
        Unlinked
      {/if}
    </p>
  </section>
  <section>
    <nav>
      <ul
        class="flex flex-wrap gap-x-8 items-end font-medium max-sm:justify-center"
      >
        {#each Object.entries(SOCIALS) as [network, link]}
          <li>
            <a
              class="not-hover:underline"
              href={link}
              target={/^\.?\//.test(link) ? "_self" : "_blank"}
            >
              {network}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </section>
  {#if $AMBIANCE_PLAYER}
    <section
      aria-hidden="true"
      class="flex items-center gap-4 text-black-300 dark:text-white-700 text-xs max-sm:justify-end"
    >
      <p>Processed: {Math.round(($AMBIANCE_PLAYER.time.rate ?? 0) * 100)}%</p>
      <hr
        class="h-1 w-auto m-0 aspect-square rounded-full border-none bg-black-300 dark:bg-white-700"
      />
      <p>Rate: {$AMBIANCE_PLAYER.analyser.node.context.sampleRate}</p>
    </section>
  {/if}
</footer>
