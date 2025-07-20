// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

import yeskunallumami from "@yeskunall/astro-umami";

// https://astro.build/config
export default defineConfig({
  output: "server",

  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: false,
    },
  },

  adapter: cloudflare({ imageService: "compile" }),
  integrations: [
    yeskunallumami({ id: "76f95944-8c8c-49e5-accc-025cc8478499" }),
  ],
});
