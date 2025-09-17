import logo from "$lib/server/assets/editable-logo.svg?raw";
import { type RequestHandler } from "@sveltejs/kit";

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

const variablesPrefix = "$$";

export const GET: RequestHandler = async ({ url, setHeaders }) => {
  const borderType = url.searchParams.has("no-gap") ? "gapless" : "gapped";
  const shieldType = url.searchParams.has("no-shield")
    ? "shieldless"
    : "shielded";

  const primary =
    url.searchParams.get("primary") ??
    (shieldType === "shielded" ? "--white" : "--primary");
  const secondary = url.searchParams.get("secondary") ?? "--black";
  const background = url.searchParams.get("background") ?? "transparent";
  const shield =
    shieldType === "shielded" ? url.searchParams.get("shield") ?? "--primary" : "transparent";

  const variables: { [key: string]: string } = {
    vb: viewBoxes[shieldType][borderType],
    j: primary,
    dot: secondary,
    bg: background,
    shield,
  };

  let editedLogo = logo;
  for (const variable in variables) {
    const value = variables[variable];
    editedLogo = editedLogo.replace(
      variablesPrefix + variable,
      value.startsWith("--") ? `var(${value})` : value
    );
  }

  setHeaders({
    "Content-Type": "image/svg+xml",
    "Content-Length": editedLogo.length.toString(),
  });
  return new Response(editedLogo);
};
