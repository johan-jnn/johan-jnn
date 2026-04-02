<script lang="ts">
  const SOCIALS = {
    Github: "https://github.com/johan-jnn",
    LinkedIn: "https://linkedin.com/in/johan-janin/",
  };
</script>

<footer
  class={[
    "mt-18 border-t-2 border-black dark:border-white py-12 px-8",
    "flex items-end justify-between",
    "font-heading uppercase",
  ]}
>
  <section>
    <p class="font-bold text-xl">Johan JANIN</p>
    <p>&copy; Johan JANIN // Signal stable</p>
  </section>
  <section>
    <nav>
      <ul class="flex gap-8 items-end font-medium">
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
    class="flex items-center gap-4 text-black-300 dark:text-white-700 text-xs"
  >
    <p>Packet_loss: 0%</p>
    <hr
      class="h-1 w-auto m-0 aspect-square rounded-full border-none bg-black-300 dark:bg-white-700"
    />
    <p>Encryption: AES-256</p>
  </section>
</footer>
