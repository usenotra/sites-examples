import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import styles from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Brightdesk, the help desk for small SaaS teams" },
      {
        name: "description",
        content:
          "Shared inbox, SLA timers and a Tickets API for SaaS teams of 2 to 20.",
      },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "The Brightdesk Blog",
        href: "/blog/feed.xml",
      },
    ],
  }),
  component: Outlet,
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
});

function NotFound() {
  return (
    <main className="hero container">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p className="lead">
        <a href="/">Back to Brightdesk</a>
      </p>
    </main>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
