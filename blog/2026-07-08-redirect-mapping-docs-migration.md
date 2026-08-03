---
slug: redirect-mapping-docs-migration
title: Redirect mapping is the part of a docs migration that breaks
authors: [maria]
tags: [docs-migration, redirects, information-architecture]
description: Why URL continuity decides whether a docs migration hurts, how to build a redirect map from real traffic sources, and how to test it before cutover.
keywords:
  - docs migration redirects
  - redirect map
  - 301 redirect documentation
  - url continuity
  - documentation migration seo
  - broken links after migration
---

Content conversion is the visible part of a migration and the part that rarely
fails. The part that fails is the URL layer: every bookmark, support macro,
in-product help button, partner page and search result that points at the old
docs. A redirect map keeps those working, and it is usually built last, in a
hurry, by whoever is still awake.

<!-- truncate -->

## Every old URL has an owner you cannot email

The reason redirects matter is not tidiness. It is that most links into your
documentation were created by people and systems you have no way to update:

- **Released clients.** A help button compiled into version 4.2 of a desktop or
  mobile app points at the old URL for as long as anyone runs 4.2. You cannot
  patch a shipped binary's help links, so the URL has to keep answering.
- **Support macros and canned replies.** Every saved reply in the helpdesk
  carries a URL. Nobody has an inventory of them.
- **Search engines.** The index is built from URLs, and ranking signals attach
  to URLs, not to content.
- **Third parties.** Community answers, partner integration guides, conference
  slides, blog posts, and the customer's own internal wiki.
- **Onboarding email sequences and PDFs**, which are usually owned by a team
  that does not know a migration is happening.

You do not need to know who they all are. You need every path they might request
to resolve to the right page.

## What happens to search rankings when you skip redirects?

The old URLs start returning 404, crawlers drop them from the index over the
following crawls, and none of the authority those pages accumulated transfers to
the new ones — the new pages compete as if they were published yesterday. That
is the mechanism, and it is worth being precise about two variants that look
like fixes and are not.

Redirecting everything to the docs home page is almost as bad as a 404. A
redirect to a page that does not answer the original request is treated as a
soft 404: the target is not credited, and the old URL still leaves the index.
Using a 302 is the other common mistake — a temporary redirect tells crawlers to
keep the old URL and not to consolidate signals onto the new one. For a
migration, the answer is a 301 to the closest equivalent page, per URL.

## Build the map from traffic, not from the sitemap

The old platform's sitemap tells you what it thinks it publishes. It does not
tell you what people actually request. Build the source list as a union of six
exports, then deduplicate:

1. `sitemap.xml` from the old platform — the structural baseline.
2. Analytics, every URL with at least one session in the last 24 months — what
   humans use.
3. CDN or server access logs — what integrations and bots fetch, including
   URLs analytics never recorded.
4. Search Console pages with impressions — what search already knows about.
5. A crawl of the old site — catches orphans the sitemap omits.
6. A grep of the product source and the helpdesk macros for the docs domain —
   catches the links you are contractually stuck with.

Then normalise before you map anything: decide on trailing slash, lowercase
paths if the old platform was case-insensitive, and strip tracking query
strings. Do this once, in a script, so the same rules apply to the map and to
the test suite.

## One rule per situation

Most of a redirect map is mechanical once you agree on the rules. The content
audit already tells you which situation each page is in.

| Situation | Rule | Status |
| --- | --- | --- |
| Page moved, content unchanged | One-to-one redirect to the new path | 301 |
| Two pages merged | Both old paths to the merged page, with an anchor if the section survived | 301 |
| Page split into several | Old path to the best successor, usually the new overview | 301 |
| Page deleted, successor exists | Old path to the successor | 301 |
| Page deleted, no successor | Old path to the section index, plus a line on that index saying what replaced it | 301 |
| Heading renamed, page kept | Client-side anchor mapping on the target page | none |
| Legacy query-string page ids | Rewrite at the edge, before the static host sees the request | 301 |

Two hard rules sit on top of the table. Never ship a chain: if A points to B and
B later points to C, collapse it so A points to C. And never let a row point at
the site root — a root redirect is the map's way of saying nobody decided.

## Keep the map in the repository

The map is a reviewable artefact, not a console UI. A CSV in the docs repo,
changed through pull requests, means the redirect list is diffable and the
reason for each row survives the person who wrote it.

```csv
old_path,new_path,reason
/display/DOCS/Authentication,/docs/guides/authentication/,moved
/display/DOCS/Auth+Tokens,/docs/guides/authentication/#tokens,merged
/display/DOCS/Legacy+SDK,/docs/sdk/,deleted-no-successor
/pages/viewpage.action?pageId=1183,/docs/guides/webhooks/,legacy-id
```

Generate the host configuration from that file rather than hand-editing it. On a
CDN or reverse proxy the output looks like this:

```nginx
# nginx: exact-match legacy paths, generated from redirects.csv
map $request_uri $legacy_target {
    default                             "";
    /display/DOCS/Authentication        /docs/guides/authentication/;
    /display/DOCS/Legacy+SDK            /docs/sdk/;
}

server {
    if ($legacy_target != "") {
        return 301 $legacy_target;
    }
}
```

Where the host cannot issue real redirects, Docusaurus can emit client-side ones
with `@docusaurus/plugin-client-redirects`:

```js
[
  '@docusaurus/plugin-client-redirects',
  {
    redirects: [
      {from: '/display/DOCS/Authentication', to: '/docs/guides/authentication/'},
    ],
  },
],
```

Treat that as a fallback. It publishes an HTML page that redirects in the
browser, so the request still costs a round trip and the status code is 200, not
301. Use it for the long tail on a static host, and put the paths that carry
traffic behind a real 301 at the edge.

## Test the map before cutover, then keep testing it

A redirect map that nobody executed is a hypothesis. Run it against staging, and
keep the same script in CI so a later reorganisation cannot quietly break it:

```bash
#!/usr/bin/env bash
# redirect-check.sh https://docs.example.com
set -uo pipefail
BASE=${1:?usage: redirect-check.sh BASE_URL}
fail=0

while IFS=, read -r old new _reason; do
  first=$(curl -s -o /dev/null -w '%{http_code}' "$BASE$old")
  read -r final_code hops final < <(
    curl -sIL -o /dev/null \
      -w '%{http_code} %{num_redirects} %{url_effective}' "$BASE$old"
  )
  if [ "$first" != 301 ] || [ "$hops" -ne 1 ] ||
     [ "$final_code" != 200 ] || [ "$final" != "$BASE$new" ]; then
    echo "FAIL $old -> $final (first $first, $hops hops, final $final_code)"
    fail=1
  fi
done < <(tail -n +2 redirects.csv)

exit $fail
```

Four assertions, and each one catches a different failure. The first status code
catches 302s that someone configured by accident. The hop count catches chains.
The final URL catches rows pointing at the wrong page. The final status catches
redirect targets that are themselves 404 — the most common defect in a map built
the week the content moved.

## Cutover checklist

- [ ] Source list is the union of sitemap, analytics, logs, Search Console, a
      crawl and a source grep, deduplicated and normalised
- [ ] Every source URL has a row with a target and a reason
- [ ] Zero chains, zero rows pointing at the site root
- [ ] The map lives in the repo and changes through review
- [ ] Test script green against staging, then against production within minutes
      of DNS or origin switching
- [ ] New sitemap submitted; old host still resolving and still redirecting
- [ ] Support macros, in-product help links and onboarding emails updated to the
      new URLs anyway — redirects are the safety net, not the plan
- [ ] A dated note in the repo recording when the map was built and from which
      exports

## How long do you keep the redirects?

Permanently, unless you can prove nothing requests them. The cost of a redirect
row is a line in a config file; the cost of removing one that still gets traffic
is a support ticket you never trace back to this decision. If the list grows
uncomfortable, add hit counting at the edge and review annually — retire only
rows with no requests in a full year, and never retire a row that a released
client hardcodes.

The [migration handbook](/docs/) covers where the map fits in the cutover
sequence, and the [content audit post](/blog/documentation-content-audit/)
covers the inventory it is generated from. If you want redirects, link checks
and QA handled as part of the move rather than bolted on at the end, that scope
is described on the [services page](/services/).
