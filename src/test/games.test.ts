import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { games, getPlayableGame } from "@/lib/games";
import { routeTree } from "@/routeTree.gen";

describe("games shelf", () => {
  it("has Stack Tower as a playable game", () => {
    expect(getPlayableGame("stack-tower")?.title).toBe("Stack Tower");
  });

  it("does not open placeholder games", () => {
    expect(games.some((g) => g.status === "coming-soon")).toBe(true);
    expect(getPlayableGame("coming-soon-1")).toBeUndefined();
  });

  it("routes /games/stack-tower to the player page", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/games/stack-tower").at(-1)?.routeId).toBe("/games/$slug");
  });
});
