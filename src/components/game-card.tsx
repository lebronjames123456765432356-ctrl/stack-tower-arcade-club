import { Link } from "@tanstack/react-router";
import { Lock, Play } from "lucide-react";

import type { Game } from "@/lib/games";

function Thumb({ game }: { game: Game }) {
  if (game.thumb === "stack") {
    return (
      <div className="thumb-stack aspect-[4/3] w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="blk" />
        ))}
      </div>
    );
  }
  return (
    <div className="thumb-placeholder grid aspect-[4/3] w-full place-items-center bg-muted">
      <Lock className="size-8 text-muted-foreground" />
    </div>
  );
}

export function GameCard({ game }: { game: Game }) {
  if (game.status === "coming-soon") {
    return (
      <div className="overflow-hidden rounded-2xl border border-dashed bg-card/40">
        <Thumb game={game} />
        <div className="p-4">
          <p className="font-display text-lg font-bold text-muted-foreground">{game.title}</p>
          <p className="text-sm text-muted-foreground">{game.tagline}</p>
        </div>
      </div>
    );
  }

  return (
    <Link
      to="/games/$slug"
      params={{ slug: game.slug }}
      className="group overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-glow focus-visible:shadow-glow focus-visible:outline-none"
    >
      <div className="relative">
        <Thumb game={game} />
        <span className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
          <Play className="size-4 fill-current" />
        </span>
      </div>
      <div className="flex items-end justify-between gap-3 p-4">
        <div>
          <p className="font-display text-lg font-bold">{game.title}</p>
          <p className="text-sm text-muted-foreground">{game.tagline}</p>
        </div>
        <span className="rounded-full border border-primary/40 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
          Play
        </span>
      </div>
    </Link>
  );
}
