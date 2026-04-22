// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import umami from "@yeskunall/astro-umami";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

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

  adapter: cloudflare({
    sessionKVBindingName: "BGP_MOM_v6_SESSION",
  }),
  integrations: [
    sitemap(),
    umami({ id: "e94e1dc0-f5e2-4746-97ba-313fbe5bcd99" })
  ],
});
