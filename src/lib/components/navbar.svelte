<script lang="ts">
  const {
    navitems = {},
  }: {
    navitems?: {
      [key: string]: {
        url: string;
        target?: string;
      };
    };
  } = $props();
</script>

<header class="sticky top-0 left-0 w-full h-18 grid grid-cols-3">
  <img
    src="/api/logo/random?background=transparent&with-gap=no&with-shield=yes"
    alt="Mon logo"
  />
  <nav>
    <ul>
      {#each Object.entries(navitems) as [label, location]}
        <li>
          <a href={location.url} target={location.target}>{label}</a>
        </li>
      {/each}
    </ul>
  </nav>
</header>
