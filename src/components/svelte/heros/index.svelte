<script lang="ts">
  import Button from "$svelte/button.svelte";
</script>

<div class="h-full grid grid-cols-[auto_1fr]">
  <section>
    <p>Lyon / 45.7640° N, 4.8357° E</p>

    <h1>
      <span>Johan JANIN //</span>
      <span>Architecture</span>
      <span>Digitale</span>
    </h1>

    <p>
      Développeur Full-Stack & explorateur de code. Je transforme les idées en
      solutions digitales efficaces, innovantes et collaboratives.
    </p>

    <div>
      <Button
        level="primary"
        action={{
          url: "/portfolio",
        }}
      >
        Voir mes projets
      </Button>

      <Button
        level="neutral"
        action={{
          url: "/contact",
        }}
      >
        Me recruter
      </Button>
    </div>
  </section>
  <section></section>
</div>
