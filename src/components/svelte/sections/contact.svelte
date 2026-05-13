<script lang="ts">
  const {
    title,
    subtitle,
    id,
  }: {
    title: string;
    subtitle?: string;
    id?: string;
  } = $props();

  let current_tm: NodeJS.Timeout | null = null;
  let pressing = $state(false);

  function typed() {
    if (typeof current_tm === "number") {
      clearTimeout(current_tm);
    }

    pressing = true;
    current_tm = setTimeout(() => {
      if (typeof current_tm !== "number") {
        return;
      }

      pressing = false;
      clearTimeout(current_tm);
      current_tm = null;
    }, 100);
  }
</script>

<section
  class="my-[20svh] grid content-center font-bold uppercase font-heading px-8"
  {id}
>
  <header class="text-center">
    <h2
      class="text-6xl sm:text-8xl tracking-tighter text-black-400 dark:text-white-600"
    >
      {title}
    </h2>
    {#if subtitle}
      <p class="text-primary-600 tracking-widest">{subtitle}</p>
    {/if}
  </header>
  <main>
    <form
      method="post"
      class={[
        "flex group items-stretch w-fit mx-auto my-12",
        "*:px-6 *:py-4 *:transition-[shadow_translate] *:neo-shadow-black dark:*:neo-shadow-white",
        "*:border-black *:dark:border-white *:border-2 *:outline-none",

        "max-sm:flex-col max-sm:w-full",
      ]}
    >
      <input
        oninput={typed}
        type="email"
        name="email"
        id="email"
        placeholder="email"
        required
        class={{
          "neo-shadow neo-shadow--push": true,
          "placeholder:uppercase": true,
          "not-group-has-focus:group-has-placeholder-shown:neo-shadow-0": true,
          "neo-shadow-0": pressing,
        }}
      />
      <button
        type="submit"
        class={[
          "cursor-pointer neo-shadow neo-shadow--push bg-primary",
          "hover:neo-shadow-0 not-group-has-focus:group-has-placeholder-shown:neo-shadow-0",
        ]}
      >
        INITIATE_PING
      </button>
    </form>
  </main>
</section>
