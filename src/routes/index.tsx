import { createFileRoute } from "@tanstack/react-router";

import { GameCard } from "@/components/game-card";
import { SiteHeader } from "@/components/site-header";
import { games, SITE_NAME } from "@/lib/games";

const description = "Quick, free browser games you can play instantly — fullscreen on any device.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE_NAME} — Free browser games` },
      { name: "description", content: description },
      { property: "og:title", content: `${SITE_NAME} — Free browser games` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GamesPage,
});

function GamesPage() {
  const playable = games.filter((g) => g.status === "playable").length;
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-20">
        <section className="py-10 md:py-16">
          <p className="animate-blink text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Insert coin
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
            UG Arcade
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            No downloads, no sign-ups. Every game runs right in your browser and goes fullscreen.
          </p>
        </section>

        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-bold">Games</h2>
          <span className="text-sm text-muted-foreground">
            {playable} playable · more on the way
          </span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </main>
    </div>
  );
}
