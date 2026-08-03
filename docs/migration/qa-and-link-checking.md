---
id: qa-and-link-checking
title: QA and link checking
description: The quality gates that prove a migration is correct - automated link and anchor checking, build gates, sampled review, and a launch checklist.
sidebar_position: 4
keywords:
  - documentation link checker
  - lychee link checking
  - broken anchors
  - docs QA checklist
  - migration acceptance criteria
---

# QA and link checking

Migration QA has two halves that people routinely conflate. One half is
mechanical — did every page arrive, does every link resolve, does every image
load — and should be fully automated, run on every commit, and never done by a
human. The other half is editorial — is this page still true, is it in the
right place, does it read as one voice — and cannot be automated at all. Split
them explicitly, because the mechanical half will otherwise eat all the time
budgeted for the editorial half.

## What should a documentation QA checklist cover?

It should cover completeness, links, structure, rendering, search and
redirects, in that order, with automated checks for the first five and a
sampled human pass over content. Everything on this list either passes in CI or
is not done:

| Check | Automated | Gate |
| --- | --- | --- |
| Every inventory row reached a published page | Yes | Blocks launch |
| No broken internal links | Yes | Blocks merge |
| No broken heading anchors | Yes | Blocks merge |
| External links resolve | Yes, scheduled | Warns |
| Every image renders | Yes, via build | Blocks merge |
| Frontmatter contract satisfied | Yes | Blocks merge |
| One h1, no skipped heading levels | Yes | Blocks merge |
| Redirects return the expected status | Yes | Blocks launch |
| Search returns the right page for the top 20 queries | Manual | Blocks launch |
| Sampled editorial review | Manual | Blocks launch per slice |

## Make the build the first gate

The cheapest link checker is the static site generator itself, because it knows
which routes exist. In Docusaurus 3, three settings turn link problems into
build failures:

```js
onBrokenLinks: 'throw',
onBrokenAnchors: 'throw',
onBrokenMarkdownLinks: 'throw',
```

Set all three to `throw` on the first day of the migration, not the last. The
default warning behaviour produces a scroll of messages nobody reads, and by
the time you tighten it there are hundreds. Failing from the start means you
never accumulate more than one broken link at a time.

For this to catch what you need, write doc-to-doc links as relative Markdown
paths rather than site URLs:

```diff
-See [the redirect map](/docs/migration/redirect-mapping/).
+See [the redirect map](./redirect-mapping.md).
```

The relative form is resolved and validated at build time, survives a change to
the base path, and is checked by `onBrokenMarkdownLinks`. Absolute site paths
are only checked against the route list, and links to files that were never
created slip through as plain 404s.

## Full link and anchor checking

The build validates internal links; it says nothing about external ones or
about anchors in links you wrote as bare URLs. Run a real link checker over the
built output. `lychee` is fast, handles fragments, and has a sane cache:

```bash
# internal links and anchors only - fast, deterministic, runs on every PR
lychee --offline --include-fragments \
  --root-dir "$(pwd)/build" \
  'build/**/*.html'

# full check including external links - nightly, not on PRs
lychee --cache --max-cache-age 1d \
  --accept 200,206,301,302,999 \
  --exclude-path build/search \
  --max-concurrency 8 \
  'build/**/*.html'
```

Two deliberate choices there. External checking is nightly rather than
per-pull-request, because third-party sites go down and you do not want an
unrelated outage blocking a documentation fix. And `999` is accepted because
some large sites return it to automated clients that are not, in fact, broken.

Keep an ignore file in the repository for the handful of URLs that genuinely
cannot be checked — authenticated pages, rate-limited APIs — with a comment per
entry saying why. An ignore list without reasons becomes a place where real
breakage hides.

## The completeness check

The one check unique to a migration: did everything arrive? Join the inventory
against the new sitemap and look at the difference in both directions.

```bash
# what the new site publishes
curl -s https://staging-docs.example.com/sitemap.xml \
  | grep -oE '<loc>[^<]+</loc>' \
  | sed -E 's#</?loc>##g' | sort -u > published.txt

# what the plan said we would publish
awk -F, 'NR>1 && $3 != "archive" { print $4 }' inventory.csv | sort -u > planned.txt

comm -23 planned.txt published.txt   # planned but missing - investigate each
comm -13 planned.txt published.txt   # published but unplanned - usually fine
```

The first list must be empty before launch. The second is normally category
index pages and tag routes, but read it anyway: it is also where accidentally
published drafts show up.

## Sampled editorial review

You cannot read four hundred pages twice. Sample deliberately instead:

- **Everything in the top 20 by traffic**, read in full. These carry most of
  the reader impact.
- **Everything with disposition `rewrite`**, because those pages changed
  substantively and the change needs a second pair of eyes.
- **Ten per cent of `keep` pages, chosen randomly.** If the defect rate in the
  sample is above roughly one page in ten, the conversion pipeline has a
  systematic problem — go fix the pipeline and re-sample rather than
  hand-patching.

Give reviewers a fixed, short checklist, or you get opinions about wording
instead of defect reports:

1. Does the page render without visual breakage on a narrow screen?
2. Are all code blocks tagged with the right language and complete?
3. Do the steps still match the current product?
4. Is the content type right, and does the page keep its promise?
5. Does every link go where the text says it goes?

## Launch day and the week after

Before cutover: run the redirect verification from
[redirect mapping](./redirect-mapping.md) against staging, confirm the
completeness check is clean, and check the top twenty search queries by hand.

After cutover, within the hour: re-run redirect verification against
production, request indexing of the new sitemap, and confirm analytics is
recording on the new site — a migration that loses its measurement is a
migration you cannot defend later.

For the first two weeks: watch the 404 log daily and fix by adding redirect
rows, watch search queries that return no results, and keep a single issue open
collecting reader-reported problems. Then hand the whole apparatus to whoever
owns it going forward, with the checks wired into
[CI/CD publishing](../operations/ci-cd-publishing.md) so they keep running long
after anyone remembers why.
