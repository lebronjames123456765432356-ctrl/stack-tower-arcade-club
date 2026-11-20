// Single source of truth for the games shelf. Playable games are standalone HTML files in
// public/games/<slug>.html, embedded in an iframe by the /games/$slug player page.
export type Game = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  controls: string;
  status: "playable" | "coming-soon";
  thumb: "stack" | "hoop" | "golf" | "placeholder";
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
  {
    slug: "hoop-streak",
    title: "Hoop Streak",
    tagline: "Pull back. Let go. Keep the streak.",
    description:
      "Press the ball, pull back and release to arc it into the hoop — the dots preview your shot. Every basket moves the hoop somewhere new, always within reach. One miss resets your streak, so how deep can you go?",
    controls: "Press, pull back, then release to shoot",
    status: "playable",
    thumb: "hoop",
  },
  {
    slug: "pullback-golf",
    title: "Pullback Golf",
    tagline: "Pull back. Sink it. Mind the sand.",
    description:
      "Press, pull back and release to launch the ball toward the flag across 5 random holes. Water and out-of-bounds cost a shot — and landing in sand makes your next shot less powerful.",
    controls: "Press, pull back, then release to shoot",
    status: "playable",
    thumb: "golf",
  },
  ...[1, 2, 3].map(
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
