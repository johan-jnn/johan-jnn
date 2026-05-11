<script module lang="ts">
  import { ambiancePlayer } from "$src/stores/ambiance";
  import { CLOCK_SPEED } from "$src/stores/clock";
  import { AudioPlayer } from "$utils/audio/player";

  export function start() {
    const player = new AudioPlayer(
      new Audio("/content/audio/background/ambiance1.mp3"),
    );
    player.audio.volume = 0.5;
    ambiancePlayer.set(player);

    CLOCK_SPEED.subscribe((speed) => {
      player.audio.playbackRate = speed / 100;
    });
    player.audio.play();
  }
</script>

<script lang="ts">
  const {
    ambianceFilesUrls,
  }: {
    ambianceFilesUrls: string[];
  } = $props();

  $inspect(ambianceFilesUrls);
</script>

{#if $ambiancePlayer?.active}
  <p>Currently playing !</p>
{/if}
