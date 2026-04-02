<script lang="ts">
  const {
    title,
    subtitle,
  }: {
    title: string;
    subtitle?: string;
  } = $props();

  let current_tm: number | null = null;
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
  class="my-[20svh] grid content-center font-bold uppercase font-heading"
>
  <header class="text-center">
    <h2 class="text-8xl tracking-tighter text-black-400 dark:text-white-600">
      {title}
    </h2>
    {#if subtitle}
      <p class="text-primary-600 tracking-widest">{subtitle}</p>
    {/if}
  </header>
  <main>
    <form
      method="post"
      class={{
        "flex items-stretch w-fit mx-auto my-12": true,
        "children:px-6 children:py-4 children:transition-[shadow_translate] children:neo-shadow-black dark:children:neo-shadow-white": true,
        "children:border-black children:dark:border-white children:border-2 children:outline-none": true,
      }}
    >
      <input
        oninput={typed}
        type="email"
        name="email"
        id="email"
        placeholder="email"
        class={{
          "neo-shadow neo-shadow--push": true,
          "placeholder:uppercase": true,
          "neo-shadow-0": pressing,
        }}
      />
      <button
        type="submit"
        class={[
          "cursor-pointer neo-shadow neo-shadow--push bg-primary",
          "hover:neo-shadow-0",
        ]}
      >
        INITIATE_PING
      </button>
    </form>
  </main>
</section>
