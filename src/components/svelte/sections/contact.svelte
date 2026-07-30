<script module lang="ts">
  export const NETLIFY_FORM_NAME = "emails";
  export const SUBMITED_STORAGE_KEY = "Did you contacted me ?";
</script>

<script lang="ts">
  import gsap from "gsap";

  import { onMount } from "svelte";
  import type { EventHandler } from "svelte/elements";

  const {
    title,
    subtitle: givenSubtitle,
    id,
  }: {
    title: string;
    subtitle?: string;
    id?: string;
  } = $props();
  let subtitle = $derived(givenSubtitle);

  // #region Initialisation
  onMount(() => {
    if (localStorage.getItem(SUBMITED_STORAGE_KEY) !== null) {
      alreadySubmitted = true;
      subtitle =
        "[Processed (409)] Vous m'avez déjà contacté. Merci beaucoup ! <3";
    }
  });
  // #endregion

  // #region Typing animation
  let current_tm: NodeJS.Timeout | null = null;
  let pressing = $state(false);

  function typed() {
    if (typeof current_tm === "number") {
      clearTimeout(current_tm);
    }

    pressing = true;
    current_tm = setTimeout(() => {
      if (typeof current_tm !== "number") {
        return;
      }

      pressing = false;
      clearTimeout(current_tm);
      current_tm = null;
    }, 100);
  }
  // #endregion

  // #region Submition

  // We use "false" by default to pre-render the form and let netlify discover it
  let alreadySubmitted = $state(false);
  let isSubmitting = $state(false);

  const onsubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (isSubmitting || alreadySubmitted) return;
    isSubmitting = true;

    let result: Response | undefined;

    // #region Data sender
    const form = e.currentTarget;
    const data = new FormData(e.currentTarget);
    data.set("form-name", NETLIFY_FORM_NAME);
    // ? https://docs.netlify.com/manage/forms/setup/#submit-html-forms-with-ajax
    const connexion = fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      //@ts-ignore - I just follow the netlify's docs.
      body: new URLSearchParams(data).toString(),
    })
      .then((response) => {
        result = response;
      })
      .catch(console.error);
    // #endregion

    // #region Sending animation
    const animation = gsap.timeline();
    animation.pause(0);

    animation.call(() => {
      subtitle = "Openning connexion...";
    });

    // earthquake animation
    for (let i = 0; i < 100; i++) {
      animation.to(form, {
        x: "random(-5, 5)",
        y: "random(-5, 5)",
        duration: 0.025,
      });
    }
    animation.addLabel("shaked");
    animation.to(
      form,
      {
        scale: 0.65,
        duration: () => animation.labels["shaked"] * 0.5,
        ease: "power1.out",
      },
      0,
    );

    animation.call(
      () => {
        subtitle = "Sending data to my cyberspace...";
      },
      [],
      ">",
    );
    // #endregion

    // #region Result animation
    animation.play();
    await animation.then();
    await connexion;
    if (!result) {
      throw new Error(
        "The data has been sent without saving the response's informations.",
      );
    }

    if (result.ok) {
      // Success
      subtitle = `[Success (${result.status})] Data succesfully transfered. Thanks you <3`;

      await gsap
        .to(form, {
          scale: 2,
          x: 0,
          y: 0,
          opacity: 0,
          duration: 2,
          ease: "power4.out",
        })
        .then();
      alreadySubmitted = true;
      localStorage.setItem(SUBMITED_STORAGE_KEY, "Yes ! Thanks you <3");
    } else {
      // Error
      subtitle = `[Failed (${result.status})] Sorry, there is some most likely some space-pirates on the path`;

      await gsap
        .to(form, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: "bounce.out",
        })
        .then();
    }

    isSubmitting = false;
    // #endregion
  };
  // #endregion
</script>

<section
  class="my-[20svh] grid content-center font-bold uppercase font-heading px-8"
  {id}
>
  <header class="text-center">
    <h2
      class="text-6xl sm:text-8xl tracking-tighter text-black-400 dark:text-white-600"
    >
      {title}
    </h2>
    {#if subtitle}
      <p class="text-primary-600 tracking-widest mt-2">{subtitle}</p>
    {/if}
  </header>

  {#if !alreadySubmitted}
    <main>
      <form
        method="post"
        data-netlify="true"
        name={NETLIFY_FORM_NAME}
        class={[
          "flex group items-stretch w-fit mx-auto my-12",
          "*:px-6 *:py-4 *:transition-[shadow_translate] *:neo-shadow-black dark:*:neo-shadow-white",
          "*:border-black *:dark:border-white *:border-2 *:outline-none",

          "max-sm:flex-col max-sm:w-full",
        ]}
        {onsubmit}
      >
        <input
          oninput={typed}
          type="email"
          name="email"
          id="email"
          placeholder="email"
          required
          class={{
            "neo-shadow neo-shadow--push": true,
            "placeholder:uppercase": true,
            "not-group-has-focus:group-has-placeholder-shown:neo-shadow-0": true,
            "neo-shadow-0": pressing,
          }}
        />
        <button
          type="submit"
          class={[
            "cursor-pointer neo-shadow neo-shadow--push bg-primary",
            "hover:neo-shadow-0 not-group-has-focus:group-has-placeholder-shown:neo-shadow-0",
          ]}
          disabled={isSubmitting}
        >
          INITIATE_PING
        </button>
      </form>
    </main>
  {/if}
</section>
