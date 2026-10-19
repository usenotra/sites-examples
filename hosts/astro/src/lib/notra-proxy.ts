import type { APIRoute } from "astro";
import { NOTRA_SITE_ORIGIN } from "astro:env/server";

const SITE_ORIGIN = NOTRA_SITE_ORIGIN.replace(/\/+$/, "");

const DROPPED_REQUEST_HEADERS = [
  "host",
  "connection",
  "keep-alive",
  "transfer-encoding",
  "upgrade",
  "te",
  "trailer",
  "proxy-authorization",
  "proxy-connection",
  "content-length",
  "cookie",
  "authorization",
];

// fetch() decodes compressed bodies, so these no longer describe the body.
const DROPPED_RESPONSE_HEADERS = ["content-encoding", "content-length", "transfer-encoding", "connection"];

export const proxyToNotra: APIRoute = async ({ request, clientAddress }) => {
  const url = new URL(request.url);
  const headers = new Headers(request.headers);
  for (const name of DROPPED_REQUEST_HEADERS) {
    headers.delete(name);
  }
  // Keep the chain from any proxy in front of this server and add the address it connected from.
  const forwardedFor = request.headers.get("x-forwarded-for");
  headers.set("x-forwarded-for", forwardedFor ? `${forwardedFor}, ${clientAddress}` : clientAddress);

  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const upstream = await fetch(`${SITE_ORIGIN}${url.pathname}${url.search}`, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    redirect: "manual",
  });

  const responseHeaders = new Headers(upstream.headers);
  for (const name of DROPPED_RESPONSE_HEADERS) {
    responseHeaders.delete(name);
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
};
