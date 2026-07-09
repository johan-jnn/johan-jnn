<script module lang="ts">
  import { AMBIANCE_LIBRAIRY, AMBIANCE_PLAYER } from "$src/stores/ambiance";
  import { AudioPlayer } from "$utils/audio/player";
  import { get } from "svelte/store";
  import Music from "../animations/spinners/music.svelte";
  import Button from "../button.svelte";
  import Range from "../forms/inputs/range.svelte";

  export function enable(music_index: undefined | number = undefined) {
    const library = get(AMBIANCE_LIBRAIRY);
    music_index ??= Math.floor(Math.random() * library.length);
    music_index %= library.length;

    const music = library[music_index];
    let player = get(AMBIANCE_PLAYER);
    if (player) {
      player.audio.src = music;
    } else {
      player = new AudioPlayer(new Audio(music));
      player.volume = 0.5;
      player.audio.addEventListener("ended", () => {
        enable(music_index + 1);
      });

      CLOCK_CPS.subscribe((speed) => {
        if (!player) return;
        player.audio.playbackRate = speed / 100;
      });

      AMBIANCE_PLAYER.set(player);
    }

    player.audio.currentTime = 0;
    player.audio.play();
  }
  export function stop() {
    const player = get(AMBIANCE_PLAYER);
    if (!player) return;

    player.audio.pause();
    player.audio.remove();
    AMBIANCE_PLAYER.set(undefined);
  }
</script>

<script lang="ts">
  import { CLOCK_CPS, CLOCK_CPS_LIMITS } from "$src/stores/clock";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { slide } from "svelte/transition";

  const {
    ambianceFilesUrls,
  }: {
    ambianceFilesUrls: string[];
  } = $props();

  $effect(() => {
    $AMBIANCE_LIBRAIRY = ambianceFilesUrls;
  });

  let modal_open = $state(!!$AMBIANCE_PLAYER);
  const anim_duration = 200;
  let debounceTm: NodeJS.Timeout;

  $effect(() => {
    clearTimeout(debounceTm);

    if ($AMBIANCE_PLAYER) {
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
  {#if $AMBIANCE_PLAYER && modal_open}
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

      <Range bounds={CLOCK_CPS_LIMITS} bind:value={$CLOCK_CPS} steps={10} />

      <Range
        bounds={[0, 1]}
        bind:value={$AMBIANCE_PLAYER.volume}
        steps={0.01}
      />

      <div class="flex gap-4 items-center justify-end">
        <Button
          level={$AMBIANCE_PLAYER.active ? "secondary" : "neutral"}
          action={{
            type: "button",
            onclick: () => {
              if (!$AMBIANCE_PLAYER) return;
              if ($AMBIANCE_PLAYER.active) {
                $AMBIANCE_PLAYER.audio.pause();
              } else {
                $AMBIANCE_PLAYER.audio.play();
              }
            },
          }}
        >
          {$AMBIANCE_PLAYER.active ? "pause" : "resume"}
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
