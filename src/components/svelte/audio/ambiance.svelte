<script module lang="ts">
  import { ambiancePlayer, ambianceUrls } from "$src/stores/ambiance";
  import { CLOCK_BOUDARIES, CLOCK_SPEED } from "$src/stores/clock";
  import { AudioPlayer } from "$utils/audio/player";
  import { get } from "svelte/store";
  import Music from "../animations/spinners/music.svelte";
  import Button from "../button.svelte";
  import Range from "../forms/inputs/range.svelte";

  export function start(ambiance_index: undefined | number = undefined) {
    const urls = get(ambianceUrls);
    ambiance_index ??= Math.floor(Math.random() * urls.length);

    ambiance_index %= urls.length;

    const ambiance_url = urls[ambiance_index];
    const existing = get(ambiancePlayer);
    const player = existing ?? new AudioPlayer(new Audio(ambiance_url));

    if (existing) {
      player.audio.src = ambiance_url;
    } else if (!existing) {
      player.volume = 0.5;
      player.audio.addEventListener("ended", () => {
        start(ambiance_index + 1);
      });
      CLOCK_SPEED.subscribe((speed) => {
        player.audio.playbackRate = speed / 100;
      });
    }

    player.audio.currentTime = 0;
    ambiancePlayer.set(player);
    player.audio.play();
  }
  export function stop() {
    const player = get(ambiancePlayer);
    if (!player) return;
    player.audio.pause();
    player.audio.remove();
    ambiancePlayer.set(undefined);
  }
</script>

<script lang="ts">
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { slide } from "svelte/transition";

  const {
    ambianceFilesUrls,
  }: {
    ambianceFilesUrls: string[];
  } = $props();

  $effect(() => {
    $ambianceUrls = ambianceFilesUrls;
  });

  let modal_open = $state(!!$ambiancePlayer);
  const anim_duration = 200;
  let debounceTm: NodeJS.Timeout;

  $effect(() => {
    clearTimeout(debounceTm);

    if ($ambiancePlayer) {
      modal_open = true;
    } else {
      debounceTm = setTimeout(() => {
        modal_open = false;
      }, anim_duration);
    }
  });

  let playerElement = $state<HTMLDivElement | undefined>();
  $effect(() => {
    if (!playerElement) return;
    const content = document.getElementById("content");
    if (!content) return;

    const scroller = ScrollTrigger.create({
      trigger: content,
      start: "bottom bottom",
      scrub: 0,
      onUpdate() {
        const { bottom } = content.getBoundingClientRect();
        const shift = Math.max(0, window.innerHeight - bottom + 10);
        playerElement?.style.setProperty("--shift", `${shift}px`);
      },
    });

    return () => {
      scroller.kill();
    };
  });
</script>

<dialog
  class="fixed inset-0 size-[unset] z-1 pointer-events-none bg-transparent"
  open={modal_open}
>
  {#if $ambiancePlayer && modal_open}
    <div
      transition:slide={{
        axis: "x",
        duration: anim_duration,
      }}
      bind:this={playerElement}
      class="
        absolute bottom-(--shift,0) right-0 backdrop-blur-md
        bg-white/50 dark:bg-black/50 p-3 transition-bounce z-1 pointer-events-auto
        flex items-center gap-8 rounded-l-full

        transition-transform ease-in-out duration-300
        not-hover:translate-x-90/100
      "
    >
      <div class="h-14 aspect-square">
        <Music animation="sync" levels={20} />
      </div>

      <Range bounds={CLOCK_BOUDARIES} bind:value={$CLOCK_SPEED} steps={10} />

      <Range bounds={[0, 1]} bind:value={$ambiancePlayer.volume} steps={0.01} />

      <div class="flex gap-4 items-center justify-end">
        <Button
          level={$ambiancePlayer.active ? "secondary" : "neutral"}
          action={{
            type: "button",
            onclick: () => {
              if (!$ambiancePlayer) return;
              if ($ambiancePlayer.active) {
                $ambiancePlayer.audio.pause();
              } else {
                $ambiancePlayer.audio.play();
              }
            },
          }}
        >
          {$ambiancePlayer.active ? "pause" : "resume"}
        </Button>
        <Button
          level="neutral"
          action={{
            type: "button",
            onclick: () => {
              stop();
            },
          }}
        >
          Stop
        </Button>
      </div>
    </div>
  {/if}
</dialog>
