import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Reads .env and the shell environment. The empty prefix loads every variable, not just VITE_*.
  const env = loadEnv(mode, process.cwd(), "");
  const notraSite = (
    env.NOTRA_SITE_ORIGIN || "https://brightdesk-tanstack.notra.site"
  ).replace(/\/+$/, "");

  return {
    plugins: [
      tanstackStart(),
      viteReact(),
      nitro({
        // Production on every host. On Vercel, Nitro turns these into edge routes.
        routeRules: {
          "/blog": { proxy: `${notraSite}/blog` },
          "/blog/**": { proxy: `${notraSite}/blog/**` },
          "/changelog": { proxy: `${notraSite}/changelog` },
          "/changelog/**": { proxy: `${notraSite}/changelog/**` },
        },
        // Local development: the same paths through the dev server.
        devProxy: {
          "/blog": { target: notraSite, changeOrigin: true },
          "/blog/**": { target: notraSite, changeOrigin: true },
          "/changelog": { target: notraSite, changeOrigin: true },
          "/changelog/**": { target: notraSite, changeOrigin: true },
        },
      }),
    ],
  };
});
