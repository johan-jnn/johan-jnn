<script lang="ts">
  import { gsap } from "gsap";
  import { onMount } from "svelte";

  let hero = $state<HTMLElement>();
  onMount(async () => {
    if (!hero) throw new Error("No hero element found.");

    // Hero exit animation
    gsap
      .timeline({
        scrollTrigger: {
          trigger: hero,
          start: "0 0",
          end: "+=500",
          scrub: 0.75,
          pin: true,
          fastScrollEnd: true,
        },
      })
      .to(hero.querySelector("&>div"), {
        borderRadius: 0,
      })
      .to(
        hero,
        {
          padding: 0,
        },
        "<"
      )
      .to(
        hero.querySelectorAll("&>div *"),
        {
          opacity: 0,
        },
        "<"
      );

    // What do I do
  });
</script>

<section
  class="h-svh grid place-content-center px-14 py-18 grid-cols-1 grid-rows-1"
  bind:this={hero}
>
  <div
    class="rounded-[75px] bg-secondary h-full w-full flex justify-center flex-col p-[4vw]"
  >
    <h1 class="font-heading text-[5vw] font-medium">
      Meet a full-stack developper
    </h1>
    <p class="text-[2vw]">And way more !</p>
  </div>
</section>
