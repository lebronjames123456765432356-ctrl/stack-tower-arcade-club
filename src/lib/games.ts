// Single source of truth for the games shelf. Playable games are standalone HTML files in
// public/games/<slug>.html, embedded in an iframe by the /games/$slug player page.
export type Game = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  controls: string;
  status: "playable" | "coming-soon";
  thumb: "stack" | "placeholder";
};

export const SITE_NAME = "UG Games";

export const games: Game[] = [
  {
    slug: "stack-tower",
    title: "Stack Tower",
    tagline: "Drop, trim, climb.",
    description:
      "Drop each sliding block onto the tower. Any overhang gets cut off, so the tower narrows. Land a perfect drop three times in a row and the block grows back.",
    controls: "Tap, click, or press Space to drop",
    status: "playable",
    thumb: "stack",
  },
  ...[1, 2, 3, 4, 5].map(
    (n): Game => ({
      slug: `coming-soon-${n}`,
      title: "Coming soon",
      tagline: "A new game is on the way.",
      description: "",
      controls: "",
      status: "coming-soon",
      thumb: "placeholder",
    }),
  ),
];

export function getPlayableGame(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug && g.status === "playable");
}
