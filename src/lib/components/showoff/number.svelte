<script lang="ts">
  import { gsap } from "gsap";
  import { onMount } from "svelte";

  const {
    number,
    context,
    animate = true,
    plus = true,
  }: {
    number: number;
    context: string;
    plus?: boolean;
    animate?: boolean;
  } = $props();

  let numberEl: HTMLSpanElement;

  onMount(() => {
    gsap.from(numberEl, {
      textContent: 0,
      duration: 4,
      ease: "power4.out",
      snap: {
        textContent: 1
      }
    });
  });
</script>

<div class="flex flex-col items-center justify-center">
  <p class="font-heading font-semibold text-[4vw]/[4vw]">
    <span bind:this={numberEl}>{number}</span>{plus ? "+" : ""}
  </p>
  <p class="font-extralight text-[1.5vw]">{context}</p>
</div>
