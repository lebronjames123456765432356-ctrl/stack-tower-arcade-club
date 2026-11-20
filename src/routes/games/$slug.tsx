import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Maximize, Minimize } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { getPlayableGame, SITE_NAME } from "@/lib/games";

export const Route = createFileRoute("/games/$slug")({
  loader: ({ params }) => {
    const game = getPlayableGame(params.slug);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.game.title} — ${SITE_NAME}` : `Game not found — ${SITE_NAME}`;
    const description = loaderData?.game.description ?? "This game isn't available.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: GameNotFound,
  component: GamePage,
});

function GameNotFound() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-md px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Game not found</h1>
        <p className="mt-2 text-muted-foreground">This game isn't here yet.</p>
        <Button asChild className="mt-6">
          <Link to="/">Back to all games</Link>
        </Button>
      </main>
    </div>
  );
}

function GamePage() {
  const { game } = Route.useLoaderData();
  const frameWrap = useRef<HTMLDivElement>(null);
  const iframe = useRef<HTMLIFrameElement>(null);
  const [nativeFull, setNativeFull] = useState(false);
  // Fallback for browsers without element fullscreen (e.g. iPhone Safari): fill the window.
  const [pseudoFull, setPseudoFull] = useState(false);
  const isFull = nativeFull || pseudoFull;

  useEffect(() => {
    const onChange = () => setNativeFull(document.fullscreenElement === frameWrap.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    if (!pseudoFull) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPseudoFull(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [pseudoFull]);

  const focusGame = useCallback(() => iframe.current?.contentWindow?.focus(), []);

  const toggleFull = async () => {
    if (isFull) {
      if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
      setPseudoFull(false);
    } else {
      const el = frameWrap.current;
      if (el?.requestFullscreen) {
        try {
          await el.requestFullscreen();
        } catch {
          setPseudoFull(true);
        }
      } else {
        setPseudoFull(true);
      }
    }
    focusGame();
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-16">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon" aria-label="Back to all games">
              <Link to="/">
                <ArrowLeft />
              </Link>
            </Button>
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                {game.title}
              </h1>
              <p className="text-sm text-muted-foreground">{game.controls}</p>
            </div>
          </div>
          <Button onClick={toggleFull}>
            <Maximize />
            Fullscreen
          </Button>
        </div>

        <div
          ref={frameWrap}
          className={
            pseudoFull
              ? "fixed inset-0 z-50 bg-stage"
              : "relative h-[calc(100dvh-11rem)] min-h-[520px] overflow-hidden rounded-2xl border bg-stage"
          }
        >
          <iframe
            ref={iframe}
            src={`/games/${game.slug}.html`}
            title={game.title}
            allow="fullscreen; autoplay"
            allowFullScreen
            onLoad={focusGame}
            className="block h-full w-full border-0"
          />
          {isFull && (
            <Button
              onClick={toggleFull}
              variant="secondary"
              size="sm"
              className="absolute left-3 top-3 opacity-80 hover:opacity-100"
            >
              <Minimize />
              Exit
            </Button>
          )}
        </div>

        <p className="mt-5 max-w-2xl text-muted-foreground">{game.description}</p>
      </main>
    </div>
  );
}
