<script lang="ts">
  import type { ComponentProps } from "svelte";
  import { Toaster as LibToaster } from "svelte-french-toast";

  const props: ComponentProps<LibToaster> = $props();
</script>

<LibToaster position="top-right" {...props} />
