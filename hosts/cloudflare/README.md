# Cloudflare host

A Cloudflare Worker for Relaywave's main website. It serves a one-page landing page at `/`, plus `/favicon.svg` and a `/robots.txt` that lists both section sitemaps for the domain it runs on, and forwards `/blog` and `/changelog` to the Notra site in [`sites/cloudflare`](../../sites/cloudflare).

The proxy code follows [Serve your site under a path with Cloudflare](https://usenotra.com/docs/sites/domains/cloudflare): it forwards each section path and everything below it with the path unchanged, drops `cookie` and `authorization`, sets `x-forwarded-for` from `cf-connecting-ip`, forwards the method and body, and returns Notra's redirects to the browser with `redirect: "manual"`.

## Run locally

```bash
bun install
cp .env.example .env   # optional, to point at a different Notra address
bun run dev
```

Open http://localhost:8787, then `/blog` and `/changelog`.

## Deploy

```bash
bunx wrangler login
bun run deploy
```

Then pick one of the two route setups in `wrangler.jsonc`:

- **This Worker is the whole website.** Uncomment the `custom_domain` route. Cloudflare creates the DNS record and certificate for `www.yourdomain.com`.
- **You already have a website.** Uncomment the two section routes and add `"PASS_THROUGH": "true"` to `vars`. The Worker only receives `/blog*` and `/changelog*`, and anything else it gets goes straight to your origin with `fetch(request)`, like in the docs. Add both section sitemaps to your own `robots.txt`.

After deploying, open `https://www.yourdomain.com/blog/_notra/probe.txt` and click **Check** on the domain in Notra. If Bot Fight Mode or WAF rules are on, allow the section paths or the user agent `NotraSitesVerifier/1.0`, and exclude the section paths from any "cache everything" rule.

## Environment variables

| Name | Default | Description |
| --- | --- | --- |
| `NOTRA_SITE_ORIGIN` | `https://relaywave-cloudflare.notra.site` | The Notra address from the site's **Domains** page. Set it in `vars` in `wrangler.jsonc`, or in `.env` for `wrangler dev` |
| `PASS_THROUGH` | unset | `"true"` sends every non-section request to your origin instead of the landing page |

## Files

```text
worker.js          routing: sections to Notra, plus the landing page, favicon and robots.txt
landing.js         the landing page HTML and the logo
wrangler.jsonc     Worker name, vars and routes
.env.example       local override for NOTRA_SITE_ORIGIN
package.json       wrangler, pinned
```
