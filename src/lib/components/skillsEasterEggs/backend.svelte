<script lang="ts">
  let parameters = $state<Record<string, string>>({});

  let url = $derived(
    new URL(
      `/api/logo/random?${new URLSearchParams({ "with-gap": "no", "with-shield": "yes", background: "transparent", ...parameters }).toString()}`,
      location.origin
    )
  );
  let updating = $state(false);
  const TRANSITION_DURATION = 1000;

  function update_img() {
    updating = true;
    setTimeout(() => {
      parameters = { _: Date.now().toString() };
    }, TRANSITION_DURATION / 2);
    setTimeout(() => {
      updating = false;
    }, TRANSITION_DURATION);
  }
</script>

<div class="grid place-content-center justify-items-center gap-4">
  <div class="bg-white p-4 aspect-square w-[100px] rounded-full">
    {#key url}
      <img
        src={url.toString()}
        alt="My logo with random colors"
        class:updating
        class="w-full h-full object-contain"
      />
    {/key}
  </div>

  <form method="dialog">
    <button
      type="button"
      class="bg-white py-2 px-4 rounded-xl font-medium cursor-pointer hover:rounded-2xl transition-[border-radius]"
      onclick={update_img}
    >
      Randomize
    </button>
  </form>
</div>

<style>
  @keyframes rotate {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 360deg;
    }
  }
  .updating {
    animation: rotate infinite linear 20ms;
  }
</style>
