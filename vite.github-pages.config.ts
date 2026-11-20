import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: true,
      failOnError: false,
    },
  },
  nitro: {
    preset: "github_pages",
  },
  vite: {
    base: "/stack-tower-arcade-club/",
  },
});
