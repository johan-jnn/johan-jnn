<script lang="ts">
  const SOCIALS = {
    Github: "https://github.com/johan-jnn",
    LinkedIn: "https://linkedin.com/in/johan-janin/",
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
    <p>&copy; Johan JANIN // Signal stable</p>
  </section>
  <section>
    <nav>
      <ul class="flex gap-8 items-end font-medium max-sm:justify-center">
        {#each Object.entries(SOCIALS) as [network, link]}
          <li>
            <a class="not-hover:underline" href={link} target="_blank"
              >{network}</a
            >
          </li>
        {/each}
      </ul>
    </nav>
  </section>
  <section
    aria-hidden="true"
    class="flex items-center gap-4 text-black-300 dark:text-white-700 text-xs max-sm:justify-end"
  >
    <p>Packet_loss: 0%</p>
    <hr
      class="h-1 w-auto m-0 aspect-square rounded-full border-none bg-black-300 dark:bg-white-700"
    />
    <p>Encryption: AES-256</p>
  </section>
</footer>
