<script lang="ts">
  import Navbar from "$lib/components/navbar.svelte";
</script>

<!-- hero -->
<section
  class="h-svh grid place-content-center px-14 py-18 grid-cols-1 grid-rows-1"
>
  <div
    class="rounded-[75px] bg-secondary h-full w-full flex justify-center flex-col p-8"
  >
    <h1 class="font-heading text-6xl font-medium">Full-stack developper</h1>
    <p class="text-2xl">And way more !</p>
  </div>
</section>

<Navbar
  navitems={{
    "My projects": {
      url: "#hello",
    },
  }}
/>
