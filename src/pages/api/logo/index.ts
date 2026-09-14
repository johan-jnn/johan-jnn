import logo from "$data/svg/editable-logo.svg?raw";
import type { APIRoute } from "astro";

export const prerender = false;

const viewBoxes = {
  shielded: {
    gapped: "0 0 1500 1400",
    gapless: "259.63 154.5 980.72 1091",
  },
  shieldless: {
    gapped: "100 100 1300 1200",
    gapless: "455.03 308.52 589.97 783.37",
  },
} as const;

const colorVariables: Record<string, string> = {
  primary: "#ff7f11",
  secondary: "#00eefc",
  tercary: "#00adf8",
  black: "#080808",
  white: "#fcfcfc",
};

const variablesPrefix = "$$";

export const GET: APIRoute = async ({ url }) => {
  const borderType = url.searchParams.has("no-gap") ? "gapless" : "gapped";
  const shieldType = url.searchParams.has("no-shield")
    ? "shieldless"
    : "shielded";

  const letter =
    url.searchParams.get("letter") ??
    url.searchParams.get("primary") ??
    (shieldType === "shielded" ? "--white" : "--primary");
  const dot =
    url.searchParams.get("dot") ??
    url.searchParams.get("secondary") ??
    "--black";

  const background = url.searchParams.get("background") ?? "transparent";
  const shield =
    shieldType === "shielded"
      ? (url.searchParams.get("shield") ?? "--primary")
      : "transparent";

  const vb = viewBoxes[shieldType][borderType].trim();
  const [x, y, w, h] = vb.split(" ");
  const variables: { [key: string]: string } = {
    vb: viewBoxes[shieldType][borderType],
    j: letter,
    bg: background,
    dot,
    shield,
    x,
    y,
    w,
    h,
  };

  let editedLogo = logo;
  for (const variable in variables) {
    let value = variables[variable];
    if (value.startsWith("--")) {
      const variable = value.slice(2);
      if (!(variable in colorVariables)) {
        return new Response(
          `Invalid variable '${value}'. Possible values are ${Object.keys(colorVariables).map((v) => `--${v}`)}`,
          {
            status: 400,
          },
        );
      }

      value = colorVariables[variable];
    }

    editedLogo = editedLogo.replaceAll(variablesPrefix + variable, value);
  }

  return new Response(editedLogo, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Content-Length": editedLogo.length.toString(),
    },
  });
};
