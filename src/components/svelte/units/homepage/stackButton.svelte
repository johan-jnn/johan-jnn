<script lang="ts">
  import Button from "$src/components/svelte/button.svelte";
</script>

<Button
  action={{
    type: "button",
    onclick() {
      alert(
        "Error 501:\nToo many technologies to process.\n\n(this means I'm a lazy developper and I've not implemented this feature yet)",
      );
    },
  }}
  level="neutral"
  boxingClass="mt-8 block w-fit mx-auto"
  stylingClass="w-fit"
>
  Voir toute ma boite à outils
</Button>
