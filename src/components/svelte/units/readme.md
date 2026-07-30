# Units

This folder contains "unit" Svelte components: components that are generally used in only one place on the site, and are therefore not meant to be reused elsewhere.

They are useful when you need `client:load`/`client:visible` with data that isn't "serializable" by Astro (e.g. a function). In that case, you need to create an extra Svelte layer to carry that data, since it can't be passed directly through Astro's templating.

## Example

In [`src/pages/index.astro`](../../../pages/index.astro), the component [`homepage/stackButton.svelte`](./homepage/stackButton.svelte) wraps a `Button` that needs an `onclick` function passed to it. Since that function can't go through an Astro component's props, `stackButton.svelte` acts as a client-hydrated intermediary.
