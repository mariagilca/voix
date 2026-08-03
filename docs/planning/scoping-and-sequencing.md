---
id: scoping-and-sequencing
title: Scoping and sequencing the work
description: How to size a documentation migration from inventory data, split it into shippable slices, and order the work so the risky parts fail early and cheaply.
sidebar_position: 3
keywords:
  - documentation migration scope
  - migration estimate
  - docs migration phases
  - pilot migration slice
  - big bang versus incremental migration
---

# Scoping and sequencing the work

Scope a migration from the [content inventory](./content-inventory.md), not
from a page count. Two hundred reference pages generated from an API spec and
two hundred hand-written tutorials with screenshots are the same number and a
five-fold difference in effort. This page turns inventory columns into an
estimate, splits the estimate into slices you can ship, and puts them in an
order that surfaces the expensive surprises in week one instead of week nine.

## How long does a documentation migration take?

The honest answer is that the timeline is driven by editorial decisions, not by
conversion, and editorial decisions are bounded by how much attention subject
matter experts can give you. Mechanical conversion of a clean export is fast
enough to be a rounding error; deciding what each page should say is not.

Estimate bottom-up from disposition, because the four dispositions differ by an
order of magnitude in cost:

| Disposition | What the work is | Relative effort |
| --- | --- | --- |
| Keep | Convert, fix frontmatter, spot check | 1x (the baseline unit) |
| Merge | Read 2-5 pages, write one, redirect the rest | 4-6x |
| Rewrite | Interview an expert, restructure, re-verify | 8-15x |
| Archive | Choose a redirect target, remove | 0.2x |

Pick your own baseline unit by actually converting ten representative "keep"
pages and timing it. A borrowed number is worthless; ten pages of your own
content takes an afternoon and makes the rest of the estimate defensible.

Then add the fixed costs, which do not scale with page count and which people
routinely forget: platform setup and theming, sidebar and navigation build,
redirect map and verification, CI pipeline, search configuration, author
training, and the launch itself. On small migrations the fixed costs dominate;
on large ones they disappear into the noise. Both surprise people.

## Slices, not phases

Split by product area or documentation set, never by activity. "Convert
everything, then fix all links, then set up CI" is three phases that each end
with nothing shippable and no feedback. A slice is a vertical cut: one coherent
area, converted, structured, redirected, reviewed and published behind a flag
or on a preview URL.

A slice should be small enough to finish inside two weeks and complete enough
to demo. Good slice boundaries usually already exist in the inventory: a
top-level section, a product, an audience, or a versioned set.

## What order should the slices go in?

Front-load risk, not volume. The correct first slice is the one that teaches
you the most about your own content, and that is rarely the biggest or the most
important.

1. **A thin vertical spike, before any slice.** Take five pages that between
   them contain a table, a code sample with syntax highlighting, an image, an
   admonition, a tabbed section and a cross-reference. Push them all the way to
   a deployed preview. Every structural incompatibility you are going to hit
   lives in those five pages, and finding them now costs a day instead of a
   sprint.
2. **The gnarliest small area.** Whatever has the most bespoke formatting.
   Conversion tooling is written once and then reused; write it against the
   hard case.
3. **The highest-traffic area.** Now that the pipeline is proven, do the pages
   that carry the traffic, while you still have the schedule to be careful with
   their redirects.
4. **The long tail.** Bulk, low-variance, parallelisable, and the part you can
   hand to more people.
5. **Archive and stubs last.** Cheap, mechanical, and a useful buffer if the
   schedule slips.

## Big bang or incremental cutover?

Both work; the choice is about URL ownership. If the new site can serve some
paths while the old platform serves the rest — usually via a reverse proxy or
path-based routing at the CDN — cut over incrementally, one slice at a time,
and you never take a single large risk. If the old platform owns the whole
domain and cannot share it, you are doing a big bang, and the implication is
that everything must be complete and verified before cutover, with a rollback
that is one DNS or proxy change.

Write the rollback down before launch week. It should be a command, not a
plan:

```bash
# rollback: point the docs hostname back at the old origin
# (illustrative - the exact command depends on your DNS or CDN provider)
cdnctl route update docs.example.com --origin legacy-docs-origin
cdnctl cache purge docs.example.com
```

## Budget the parts people forget

- **Search.** New site, new index, new relevance behaviour. Budget a week of
  tuning and a list of the twenty queries that must return the right page.
- **In-product help links.** Deep links from the application into docs are
  owned by engineering, not by you. Find them early with a code search; they
  have release cycles of their own.
- **Freeze windows.** Content keeps changing during the migration. Either
  freeze the source (short migrations) or re-sync changed pages before cutover
  using `last_modified` from the inventory (long ones). Decide which, in
  writing, at kickoff.
- **Training.** Authors need to learn Git, Markdown and the review flow. That
  is real calendar time, and it belongs in the plan alongside
  [authoring standards](../operations/authoring-standards.md).

## Track it where the work is

Turn the inventory CSV into the tracker by adding a `status` column with a
fixed set of values — `todo`, `converted`, `reviewed`, `published` — and
generate the burndown from it. One source of truth, no reconciliation, and a
progress report that takes one command to produce.

With scope and sequence settled, the remaining planning problem is people:
[getting stakeholder buy-in](./stakeholder-buy-in.md). For how an engagement
with an outside team maps onto these slices, see
[our process](/process/).
