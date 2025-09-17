<script lang="ts">
  import Number from "$lib/components/showoff/number.svelte";
</script>

<section class="grid grid-cols-2 h-screen p-18 grid-rows-1">
  <div class="flex flex-col justify-between">
    <ul class="grid grid-cols-2 grid-rows-2 gap-18 my-auto">
      <li>
        <Number number={35} context="projects" />
      </li>
      <li>
        <Number number={20} context="known languages" />
      </li>
      <li>
        <Number number={85} context="recommendations" />
      </li>
      <li>
        <Number number={6} context="years as a dev" />
      </li>
    </ul>
    <div>
      <h1 class="font-heading font-semibold text-[8vw]">
        Meet a <span class="block font-core text-[4vw] font-medium"
          >Full-Stack developper</span
        >
      </h1>
    </div>
  </div>
  <img
    src="/img/me.png"
    alt="Myself"
    class="h-full place-self-center object-contain"
  />
</section>
