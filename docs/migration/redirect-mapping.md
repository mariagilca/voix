---
id: redirect-mapping
title: Redirect mapping
description: Build a complete old-to-new URL map, implement it at the right layer, handle anchors and trailing slashes, and verify every redirect before cutover.
sidebar_position: 3
keywords:
  - URL redirect map
  - 301 redirects migration
  - Docusaurus client redirects
  - SEO safe documentation migration
  - broken links after migration
---

# Redirect mapping

Every URL you have ever published is a promise. Support macros, in-product help
buttons, forum answers, customer runbooks and the search index all hold copies
of your old paths, and none of them will be updated when you launch. The
redirect map is the artefact that keeps those promises, and it is the one part
of a migration whose failure is visible to customers on the first day.

Treat it as an acceptance criterion with a number attached: zero URLs from the
[content inventory](../planning/content-inventory.md) without a verified
destination.

## How do I make sure no links break after a migration?

Enumerate every live URL, map each one to exactly one destination, implement the
redirects at the highest layer you control, and verify all of them with an
automated check that runs before cutover and again after. The failure mode is
never the mapping logic — it is a URL nobody knew was live.

Build the source list from four places, not one:

1. **The old sitemap**, for what the platform thinks is published.
2. **Analytics**, twelve months of page paths with at least one visit. This is
   where the unlisted, permission-gated and long-forgotten URLs surface.
3. **Server or CDN logs** if you can get them, which additionally catch URLs
   that only bots and integrations request.
4. **A code search** across your own product, help widgets, email templates and
   support macros for the documentation hostname. These are links you control
   and can actually fix at the source — do that as well as redirecting.

Union the four, deduplicate, and add the count to the plan. The number is
always larger than the page count, because of aliases, old paths already
redirecting internally, query-string variants and file extensions.

## The map is a file, not a config

Keep the map as a CSV in the repository, generated into whatever format your
hosting needs. It is reviewable, diffable, and one source of truth:

```text
old_path,new_path,status,note
/help/webhooks-setup,/docs/webhooks/subscribe/,301,renamed
/help/webhooks-setup.html,/docs/webhooks/subscribe/,301,extension variant
/help/api/keys,/docs/reference/api-keys/,301,retyped as reference
/help/legacy-sdk,/docs/reference/sdk/,301,archived, nearest parent
```

Four rules for the destination column:

- **One hop, always.** Chained redirects lose speed and, over enough hops,
  get truncated by clients. If the old platform already redirects A to B, map A
  to the final destination directly.
- **Never redirect to the home page.** A redirect to the root is indistinguishable
  from a 404 for the reader, and search engines treat it as a soft 404. Send
  archived content to the nearest surviving parent, which is at least in the
  right subject area.
- **Match the trailing-slash convention exactly.** If the new site serves
  `/docs/webhooks/subscribe/`, mapping to the unslashed form adds a second hop
  at the server. Pick one convention site-wide and make the map obey it.
- **Preserve anchors where the heading survived.** Anchors are not sent to the
  server, so a redirect cannot change them; if the heading text changed, the
  anchor breaks silently. Audit anchors separately — see
  [QA and link checking](./qa-and-link-checking.md).

## Implement at the highest layer you control

| Layer | Real HTTP 301 | Use when |
| --- | --- | --- |
| CDN or edge rules | Yes | You control the CDN. Best option: fast, no origin round trip |
| Web server or host config | Yes | Self-hosted or a host with a redirects file |
| Static host redirects file | Yes | Netlify, Cloudflare Pages and similar |
| Client-side meta refresh | No | Last resort, when nothing above is available |

A static host redirects file is a direct render of the CSV:

```text
# _redirects - one rule per line, most specific first
/help/webhooks-setup      /docs/webhooks/subscribe/      301!
/help/api/keys            /docs/reference/api-keys/      301!
/help/*                   /docs/:splat                   301
```

For nginx, generate a map block rather than hundreds of location rules:

```text
# nginx.conf
map $request_uri $docs_redirect {
    default                    "";
    /help/webhooks-setup       /docs/webhooks/subscribe/;
    /help/api/keys             /docs/reference/api-keys/;
}

server {
    if ($docs_redirect != "") {
        return 301 $docs_redirect;
    }
}
```

Docusaurus 3 also ships a client-redirects plugin, which is useful for
in-site path changes when you do not control the edge:

```js
plugins: [
  [
    '@docusaurus/plugin-client-redirects',
    {
      fromExtensions: ['html'],
      redirects: [
        {
          to: '/docs/webhooks/subscribe/',
          from: ['/help/webhooks-setup', '/help/webhooks-setup.html'],
        },
      ],
      createRedirects(existingPath) {
        if (existingPath.startsWith('/docs/reference/')) {
          return [existingPath.replace('/docs/reference/', '/help/api/')];
        }
        return undefined;
      },
    },
  ],
],
```

Two things to know about it before you rely on it. It only runs during a
production build, so nothing appears in the dev server. And it emits static
HTML pages containing a meta refresh, not a server-side 301 — good enough for
readers, weaker than a real redirect for search engines. Use it for convenience
paths and use the edge for anything that carries traffic.

## Verify, twice

Write the verification as a script and run it against the staging origin before
cutover, then against production immediately after.

```bash
#!/usr/bin/env bash
# verify-redirects.sh - expects old_path,new_path,... on stdin
set -euo pipefail
base="${1:?usage: verify-redirects.sh https://docs.example.com}"
fail=0

while IFS=, read -r old new _; do
  [ "$old" = "old_path" ] && continue
  read -r code location < <(
    curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' "${base}${old}"
  )
  if [ "$code" != "301" ] || [ "${location#${base}}" != "$new" ]; then
    echo "FAIL ${old} -> ${code} ${location:-none} (expected 301 ${new})"
    fail=1
  fi
done

exit "$fail"
```

Run it in CI on a schedule for the first month after launch, not just once.
Redirects get clobbered by unrelated infrastructure changes, and the symptom —
a slow decline in traffic to pages that used to rank — takes weeks to notice by
any other means.

Finally, monitor 404s in production from day one and treat each distinct path
with more than a handful of hits as a bug with a fix, which is a new row in the
map. Expect a tail of URLs you never knew existed; that is not a planning
failure, it is what the tail is.
