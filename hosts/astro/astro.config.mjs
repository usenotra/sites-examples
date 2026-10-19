import node from "@astrojs/node";
import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";

// Astro doesn't put .env into process.env while it loads this file, so read it with Vite.
const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

export default defineConfig({
  site: SITE_URL || "http://localhost:4321",
  adapter: node({ mode: "standalone" }),
  trailingSlash: "ignore",
  security: {
    checkOrigin: false,
  },
  env: {
    schema: {
      // A server secret is read when the server runs, not baked into the build.
      NOTRA_SITE_ORIGIN: envField.string({
        context: "server",
        access: "secret",
        default: "https://fernhill-astro.notra.site",
      }),
    },
  },
  integrations: [
    {
      name: "require-site-url",
      hooks: {
        "astro:config:setup": ({ command }) => {
          if (command === "build" && !SITE_URL) {
            throw new Error(
              "SITE_URL is not set. Set it to this website's public URL, like https://www.fernhill.app, so /robots.txt and /llms.txt link to the right domain.",
            );
          }
        },
      },
    },
  ],
});
