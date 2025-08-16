// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

import yeskunallumami from "@yeskunall/astro-umami";

// https://astro.build/config
export default defineConfig({
  site: "https://bgp.mom",
  output: "server",

  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: false,
    },
  },

  adapter: cloudflare({ imageService: "compile" }),
  integrations: [
    sitemap(),
    yeskunallumami({ id: "76f95944-8c8c-49e5-accc-025cc8478499" ,"endpointUrl":"https://stats.dsl.wiki/"}),
  ],
});
