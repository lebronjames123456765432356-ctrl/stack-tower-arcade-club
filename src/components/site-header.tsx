import { Link } from "@tanstack/react-router";
import { Gamepad2 } from "lucide-react";

import { SITE_NAME } from "@/lib/games";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
      <Link to="/" className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Gamepad2 className="size-5" />
        </span>
        <span className="font-display text-xl font-extrabold tracking-tight">{SITE_NAME}</span>
      </Link>
      <nav>
        <Link
          to="/"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          All games
        </Link>
      </nav>
    </header>
  );
}
