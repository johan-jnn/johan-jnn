<script lang="ts">
  import IllustrativeSection from "$lib/components/illustrative-section.svelte";
  import { gsap } from "gsap";
  import { onMount } from "svelte";

  let section = $state<HTMLElement>();

  onMount(() => {
    if (!section)
      throw new Error("No section found for the what do I do section");
    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          pin: true,
          fastScrollEnd: true,
          end: "+=300",
          scrub: 1,
        },
      })
      .fromTo(
        section.querySelector("&>h2"),
        {
          scale: 0,
          ease: "power2.inOut",
        },
        {
          scale: 1,
        }
      );
  });
</script>

<section class="bg-secondary h-screen" bind:this={section}>
  <h2 class="font-heading text-[8vw] text-center font-bold">What do I do ?</h2>
  <ul class="pt-12 flex items-center justify-center">
    <li>
      <IllustrativeSection description="test" label="bonjour">
        hello
      </IllustrativeSection>
    </li>
  </ul>
</section>
