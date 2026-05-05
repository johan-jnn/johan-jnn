<script lang="ts">
  import H from "../headings/tag.svelte";

  const {
    description,
    title,
    url,

    h_n,
    heading,
  }: {
    title: string;
    description: string;
    url: string;

    heading?: string;
    h_n?: number;
  } = $props();

  const sharables: {
    [key: string]: {
      url: string | (() => any);
      icon: string;
      theme: string;

      key_prefix?: string;
    };
  } = $derived({
    LinkedIn: {
      url: `https://www.linkedin.com/sharing/share-offsite/?mini=true&url=${encodeURIComponent(
        url,
      )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}&source=${encodeURIComponent(url)}"`,
      icon: "icon-[fa7-brands--linkedin-in]",
      theme: "#0077B5",
    },
    WhatsApp: {
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        description + "\n" + url,
      )}`,
      icon: "icon-[fa7-brands--whatsapp]",
      theme: "#25D366",
    },
    Twitter: {
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        description,
      )}&url=${encodeURIComponent(url)}`,
      icon: "icon-[fa7-brands--x-twitter]",
      theme: "#000000",
    },
    mail: {
      url: `mailto:?subject=${encodeURIComponent(
        title,
      )}&body=${encodeURIComponent(description + "\n" + url)}"`,
      icon: "icon-[material-symbols--attach-email-outline]",
      theme: "var(--color-primary)",
      key_prefix: "Envoie par ",
    },
    "Copier dans le presse-papier": {
      url: () => {
        const text = `${title}: ${description}\n${url}`;
        navigator.clipboard
          .writeText(text)
          .then(() => alert("Merci! L'article vient d'être copié."))
          .catch(() => alert("Aie... L'article n'a pas pu être copié."));
      },
      icon: "icon-[material-symbols--content-copy]",
      theme: "var(--color-secondary)",
      key_prefix: "",
    },
  });
</script>

<H
  class="text-center font-heading uppercase md:max-w-60 px-5 mx-auto"
  h={h_n ?? 3}
>
  {heading ?? "Partage mon travail sur tes réseau favoris"}
</H>
<ul class="flex items-center justify-center gap-2 mt-4">
  {#each Object.entries(sharables) as [network, info] (network)}
    {@const label = (info.key_prefix ?? "Partage sur ") + network}
    {@const classStyles: string[] = [
      "size-8 grid cursor-pointer",
      "hover:text-(--theme) pointer-coarse:text-(--theme) transition-colors"
    ]}
    <li style:--theme={info.theme}>
      {#if typeof info.url === "string"}
        <a
          href={info.url}
          target="_blank"
          class={classStyles}
          aria-label={label}
          title={label}
        >
          <span class="{info.icon} size-full"></span>
        </a>
      {:else}
        <button
          class={classStyles}
          onclick={info.url}
          aria-label={label}
          title={label}
        >
          <span class="{info.icon} size-full"></span>
        </button>
      {/if}
    </li>
  {/each}
</ul>
