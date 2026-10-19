<h1>
  <img src=".github/assets/notra-wordmark.svg" alt="Notra" width="150" height="40" />
</h1>

**Example blogs and changelogs for Notra Sites. Copy a folder, connect your repository and deploy.**

[Visit www.usenotra.com](https://www.usenotra.com) · [Start for free](https://app.usenotra.com/signup) · [Sites docs](https://www.usenotra.com/docs/sites/examples)

## Quick start

1. Copy a folder from [`sites/`](./sites) into your repository. Not sure which? Use [`default`](./sites/default).
2. In Notra, open **Sites → New site** and connect the repository.
3. If the folder isn't at the root, turn on **Site is in a subdirectory** and enter its path, like `sites/default`.

Each push that touches the folder redeploys the site. The brands in these examples are made up.

## Sites

| Example | Shows | Live |
| --- | --- | --- |
| [`default`](./sites/default) | The Notra theme with no customizations | – |
| [`personal`](./sites/personal) | A blog only, posts at the root of the domain | [ada-personal](https://ada-personal.notra.site) |
| [`subdomain`](./sites/subdomain) | Its own subdomain | [ledgerly-subdomain](https://ledgerly-subdomain.notra.site) |
| [`devtool-changelog`](./sites/devtool-changelog) | Changelog first, dark only, monospace headings | [forgekit-changelog](https://forgekit-changelog.notra.site) |
| [`editorial`](./sites/editorial) | Serif magazine with pull quotes and author bios | [meridian-editorial](https://meridian-editorial.notra.site) |
| [`dark-launch`](./sites/dark-launch) | Dark by default, with a launch banner | [nova-launch](https://nova-launch.notra.site) |
| [`match-your-website`](./sites/match-your-website) | Its own header, footer, slots and design tokens | [orbitly-custom-header](https://orbitly-custom-header.notra.site) |
| [`custom-components`](./sites/custom-components) | React components, a script and every built-in component | [pixelmint-components](https://pixelmint-components.notra.site) |
| [`open-source`](./sites/open-source) | Variables, redirects, SEO and instructions for AI agents | [driftdb-oss](https://driftdb-oss.notra.site) |
| [`posthog`](./sites/posthog) | PostHog analytics (EU Cloud) | [cadence-posthog](https://cadence-posthog.notra.site) |
| [`plausible`](./sites/plausible) | Plausible analytics | [northwind-plausible](https://northwind-plausible.notra.site) |
| [`umami`](./sites/umami) | Umami analytics | [kilnworks-umami](https://kilnworks-umami.notra.site) |
| [`google-analytics`](./sites/google-analytics) | Google Analytics 4 | [harborline-ga4](https://harborline-ga4.notra.site) |

The analytics examples use placeholder IDs. Replace them with your own before you deploy.

## Serving under `/blog`

To serve a site at `acme.com/blog` instead of a subdomain, your website forwards the path to Notra. Each of these has a site in [`sites/`](./sites) and a working setup in [`hosts/`](./hosts):

| Platform | Site | Host | Guide |
| --- | --- | --- | --- |
| Next.js | [`nextjs`](./sites/nextjs) | [`nextjs`](./hosts/nextjs) | [Docs](https://www.usenotra.com/docs/sites/domains/nextjs) |
| TanStack Start | [`tanstack-start`](./sites/tanstack-start) | [`tanstack-start`](./hosts/tanstack-start) | [Docs](https://www.usenotra.com/docs/sites/domains/tanstack-start) |
| Astro | [`astro`](./sites/astro) | [`astro`](./hosts/astro) | [Docs](https://www.usenotra.com/docs/sites/domains/astro) |
| Vercel | [`vercel`](./sites/vercel) | [`vercel`](./hosts/vercel) | [Docs](https://www.usenotra.com/docs/sites/domains/vercel) |
| Netlify | [`netlify`](./sites/netlify) | [`netlify`](./hosts/netlify) | [Docs](https://www.usenotra.com/docs/sites/domains/netlify) |
| Cloudflare Workers | [`cloudflare`](./sites/cloudflare) | [`cloudflare`](./hosts/cloudflare) | [Docs](https://www.usenotra.com/docs/sites/domains/cloudflare) |
| nginx | [`nginx`](./sites/nginx) | [`nginx`](./hosts/nginx) | [Docs](https://www.usenotra.com/docs/sites/domains/nginx) |

On another platform, follow [Serve on a subpath](https://www.usenotra.com/docs/sites/domains/subpath).

## Folder layout

| Path | Purpose |
| --- | --- |
| `blog.json` | Name, colors, fonts, navigation and integrations ([reference](https://www.usenotra.com/docs/sites/reference/blog-json)) |
| `blog/`, `changelog/` | Posts and release notes as MDX |
| `public/` | Images and other static files |
| `style.css` | Optional CSS on top of the theme |
| `slots/`, `header.mdx`, `footer.mdx` | Optional content for the header, footer and theme slots |
| `snippets/` | Optional reusable MDX and React components |
