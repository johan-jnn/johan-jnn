import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ url, rewrite, redirect }) => {
  const redirection = new URL("/api/logo", url);

  function get_param<T extends string>(
    name: string,
    possible_values: T[],
  ): T | null {
    const value = url.searchParams.get(name) as T | null;
    if (value === null) return value;

    if (!possible_values.includes(value)) {
      throw new Response(
        `Param ${name} only accepts ${possible_values.join(
          " or ",
        )} (or unset value)`,
        {
          status: 400,
        },
      );
    }

    return value as T;
  }

  const withShield =
    get_param("with-shield", ["yes", "no"]) ?? Math.random() < 0.5;
  if (withShield === "no" || !withShield) {
    redirection.searchParams.set("no-shield", "");
  }

  const withGap = get_param("with-gap", ["yes", "no"]) ?? Math.random() < 0.5;
  if (withGap === "no" || !withGap) {
    redirection.searchParams.set("no-gap", "");
  }

  for (const color of ["primary", "secondary", "background", "shield"]) {
    redirection.searchParams.set(
      color,
      url.searchParams.get(color) ??
        `#${Math.floor(Math.random() * 255 ** 3).toString(16)}`,
    );
  }

  return url.searchParams.has("no-redirect")
    ? rewrite(redirection)
    : redirect(redirection.toString(), 302);
};
