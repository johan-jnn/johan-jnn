<script lang="ts">
  let parameters = $state<Record<string, string>>({});

  let url = $derived(
    new URL(
      `/api/logo/random?${new URLSearchParams({ "with-gap": "no", "with-shield": "yes", background: "transparent", ...parameters }).toString()}`,
      location.origin
    )
  );

  $effect(() => console.log(url));
</script>

<div class="grid place-content-center justify-items-center gap-4">
  <div class="bg-white p-4 aspect-square w-[100px] rounded-full">
    {#key url}
      <img
        src={url.toString()}
        alt="My logo with random colors"
        class="w-full h-full object-contain"
      />
    {/key}
  </div>

  <form method="dialog">
    <button
      type="button"
      class="bg-white py-2 px-4 rounded-xl font-medium cursor-pointer hover:rounded-2xl transition-[border-radius]"
      onclick={() => {
        console.log("Updating...");
        parameters = { _: Date.now().toString() };
      }}>Randomize</button
    >
  </form>
</div>
