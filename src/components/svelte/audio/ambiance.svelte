<script module lang="ts">
  import { ambiancePlayer, ambianceUrls } from "$src/stores/ambiance";
  import { CLOCK_SPEED } from "$src/stores/clock";
  import { AudioPlayer } from "$utils/audio/player";
  import { get } from "svelte/store";
  import { slide } from "svelte/transition";
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
      class="absolute bottom-0 right-0 backdrop-blur-md bg-white/50 dark:bg-black/50 p-3 transition-bounce z-1 pointer-events-auto flex items-center gap-8 rounded-l-full"
    >
      <div class="h-14 aspect-square">
        <Music animation={{ sync: true }} levels={20} />
      </div>

      <Range bounds={[70, 140]} bind:value={$CLOCK_SPEED} steps={10} />

      <Range bounds={[0, 1]} bind:value={$ambiancePlayer.volume} steps={0.01} />

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
  {/if}
</dialog>
