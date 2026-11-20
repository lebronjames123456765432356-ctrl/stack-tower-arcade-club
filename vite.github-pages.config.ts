
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Do not build a Cloudflare Worker for this backup.
  nitro: false,

  // GitHub Pages hosts this site inside the repository folder.
  vite: {
    base: "/stack-tower-arcade-club/",
  },

  tanstackStart: {
    server: { entry: "server" },
    spa: {
      enabled: true,
      prerender: {
        crawlLinks: true,
      },
    },
    prerender: {
      failOnError: false,
    },
  },
});
