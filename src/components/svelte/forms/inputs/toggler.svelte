<script lang="ts" module>
  export interface TogglerProps<
    Type extends "checkbox" | "radio" | "resetable-radio",
    Value = unknown,
  > {
    children: Snippet;
    name: string;

    type: Type;

    value?: Value;
    id?: string;

    group: Type extends "checkbox" ? Value[] : Value | null;
    active?: boolean;

    classes?: {
      label?: SvelteClassAttribute;
      input?: SvelteClassAttribute;
    };
  }
</script>

<script lang="ts">
  import {
    merge_classes,
    type SvelteClassAttribute,
  } from "$src/utils/svelte/classes";
  import { onDestroy, type Snippet } from "svelte";

  let {
    children,
    name,
    id: maybe_id,
    type,
    value,
    classes,

    group = $bindable(),
    active = $bindable(),
  }:
    | TogglerProps<"checkbox">
    | TogglerProps<"radio">
    | TogglerProps<"resetable-radio"> = $props();

  const id = $derived(maybe_id ?? `toggler-${name}`);

  const input_attributes = $derived({
    name,
    id,
    value,
    class: merge_classes("hidden", classes?.input),
  });

  /**
   * We simulate the bind:group attribute as it works only if all `bind:group` are in the same svelte component
   */
  $effect(() => {
    if (type === "checkbox") {
      let tmp_group = group as unknown[];
      const contains = tmp_group.includes(value);
      if (active !== contains) {
        group = active
          ? [...tmp_group, value]
          : tmp_group.filter((v) => v !== value);
      }
    } else {
      active = group === value;
    }
  });

  onDestroy(() => {
    if (type === "checkbox") {
      active = false;
    } else if (group === value) {
      group = null;
    }
  });
</script>

{#snippet checkbox()}
  <input type="checkbox" bind:checked={active} {...input_attributes} />
{/snippet}
{#snippet radio()}
  <input
    type="radio"
    bind:group
    onclick={type === "resetable-radio"
      ? ({ currentTarget }) => {
          if (active && group === value) {
            group = null;
            currentTarget.checked = active = false;
          }
        }
      : undefined}
    {...input_attributes}
  />
{/snippet}

<label
  for={id}
  class={merge_classes(
    `
    px-5 py-1 bg-black-400 dark:bg-white-600
    border-black dark:border-white font-bold
    border-2 has-checked:bg-primary-400
    dark:has-checked:bg-secondary-400
    text-white dark:text-black font-heading uppercase
    cursor-pointer
    neo-shadow neo-shadow--push neo-shadow-black dark:neo-shadow-white has-checked:neo-shadow-0
    transition-[shadow_transform_background] w-full text-center
  `,
    classes?.label,
  )}
>
  {@render children()}

  {@render (type === "checkbox" ? checkbox : radio)()}
</label>
