<script lang="ts">
  import Navbar from "$lib/components/navbar.svelte";
  import Hero from "./hero.svelte";
  import Wdid from "./wdid.svelte";
</script>

<Navbar
  navitems={{
    "My Skills": {
      url: "#stacks",
    },
  }}
/>

<Hero />
<Wdid />
