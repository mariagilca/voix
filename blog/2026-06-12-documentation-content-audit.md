---
slug: documentation-content-audit
title: What a documentation content audit actually finds
authors: [maria]
tags: [content-audit, docs-migration, content-structure, governance]
description: The categories of rot a documentation content audit turns up, how to count each one, and what decision each category earns before a migration starts.
keywords:
  - documentation content audit
  - docs content inventory
  - content audit template
  - stale documentation
  - duplicate documentation
  - documentation migration planning
---

Every migration proposal contains the phrase "content audit", and almost nobody
says what comes out of one. It is not a reading exercise, and it is not a
quality score out of ten. It is a classification pass that ends with one
decision per page, a count next to each decision, and a named person who agreed
to it.

<!-- truncate -->

## Why the audit comes first

A migration that starts with the platform moves the rot into a nicer building.
You get clean Markdown, a fast search index, a pipeline that publishes on merge,
and the same 61 duplicate pages you had before, now in Git.

The audit is also the only honest input to the rest of the plan. You cannot size
an information architecture redesign without knowing how many pages exist. You
cannot build a redirect map without a list of source URLs. You cannot promise a
cutover date when nobody has counted what is being cut over. Every downstream
artefact in a migration is a projection of the inventory.

## The categories of rot

Pages do not rot in one way. They rot in about eight, and each one earns a
different decision.

**Duplicates.** The same procedure written twice, usually because two teams
owned the same feature at different times. Duplicates are cheap to find and
politically expensive to resolve, because merging them means one team's page
loses.

**Stale pages.** The last meaningful edit predates a release that changed the
behaviour the page describes. Stale is not the same as old: a page about an API
that has not changed in three years is fine. Compare the last edit against the
product's release history, not against today's date.

**Orphans.** Reachable by URL, not reachable by navigation, and not surfaced by
search. Orphans are usually the residue of a previous reorganisation. Some of
them still get traffic from Google, which is exactly why you find them before
cutover rather than after.

**Stubs.** A heading, one sentence, and a "more coming soon" that was true four
years ago. Stubs cost more than they return: they occupy a navigation slot and
a search result, and they teach readers that the docs do not answer questions.

**Vendor artefacts.** Content whose structure only exists because the old editor
produced it. Nested tables used for layout, styled spans wrapping every second
word, screenshots of text, macro-generated tables of contents, anchor names like
`id-a71f0e2`. The information is fine; the container is not.

**Wrong-audience pages.** Internal runbooks published on the customer portal, or
customer-facing setup guides buried in an internal wiki. This category is worth
a separate count because the fix is a move, not a rewrite, and because one of
those moves may be a disclosure problem.

**Contradictions.** Two pages that both look current and give different
instructions. This is the most expensive category, because a support answer is
only as good as the worse page, and because resolving it needs someone with
authority over the product, not over the docs.

**Dead weight.** No inbound links, no traffic, no owner, no successor. Not
harmful, just carried. Cutting it is a decision, not a cleanup.

## How do you count all this without reading 500 pages?

You do not read every page; you classify every page, which is a different job.
Classification comes from metadata plus the first screen of the page, and only
the ambiguous rows earn a real read. In practice that means joining three
sources into one table: the file inventory, the traffic export, and the link
graph.

Start with the inventory. If the content is already in Git:

```bash
# One row per file, oldest last-touched first.
git ls-files 'docs/**/*.md*' | while read -r f; do
  printf '%s\t%s\n' "$(git log -1 --format=%as -- "$f")" "$f"
done | sort
```

If it is still in a proprietary platform, the export manifest or the platform
API carries the same fields. Ask for `updated_at`, `created_at`, author and
parent page id before you ask for the HTML.

Duplicate titles are the cheapest first pass:

```bash
grep -rh '^title:' docs/ | sort | uniq -d
```

Orphan candidates come from the link graph. A crude version that works well
enough to build a review list:

```bash
for f in $(git ls-files 'docs/**/*.md'); do
  slug=$(basename "$f" .md)
  if ! grep -rq -- "$slug" docs/ --exclude="$(basename "$f")"; then
    echo "orphan candidate: $f"
  fi
done
```

Then join traffic. Export twelve months of sessions per URL from analytics and
match on path. Zero sessions is a signal, not a verdict — release notes,
compliance pages and error-code references are supposed to have thin traffic and
still have to exist.

## A worked inventory

The table below is a worked example, not a client result. It exists to show the
shape of the output: one row per category, a count, a decision, and the person
who owns the decision.

| Category | Pages | Share | Decision | Who decides |
| --- | ---: | ---: | --- | --- |
| Current and correct | 214 | 43% | Migrate as is | Docs owner |
| Duplicate of another page | 61 | 12% | Merge, redirect the loser | Docs owner |
| Stale, product moved on | 78 | 16% | Rewrite or retire before cutover | Product manager |
| Stub | 40 | 8% | Cut, keep the title in a backlog | Docs owner |
| Vendor artefact only | 33 | 7% | Migrate, strip markup, re-cut sections | Migration engineer |
| Wrong audience | 22 | 4% | Move to the internal space | Support lead |
| Contradictory pair | 18 | 4% | Escalate, one owner picks the truth | Engineering owner |
| Dead weight | 30 | 6% | Cut, redirect to the parent section | Docs owner |
| **Total** | **496** | **100%** | | |

Two things about that table matter more than the numbers. First, the counts add
up, which means every page has exactly one home and no page was quietly skipped.
Second, the last column is filled in. An audit with no names in it is a
document; an audit with names is a plan.

## What each decision costs downstream

Every row generates work somewhere else, and this is the part teams discover
late:

- **Migrate as is** is the only decision with no extra cost. Protect this
  category by not inflating it.
- **Merge** creates at least one redirect row and one editorial pass. Two pages
  never merge cleanly; someone has to decide which examples survive.
- **Rewrite** needs a subject-matter reviewer with time in the same sprint as
  the cutover. This is the row that slips.
- **Cut** creates a redirect row and, if the page had traffic, a note on the
  successor page saying what replaced it.
- **Move** may need an access-control change, not just a path change.
- **Escalate** needs a decision meeting on a calendar, with the two page owners
  in the room. Book it during the audit, not after.

Sequence the work so that everything except "rewrite" happens before cutover.
Rewrites can land after launch on real pages in Git; contradictions cannot,
because they will be baked into the new navigation.

## The audit deliverables checklist

An audit is done when all of these exist and someone has signed off on the
counts:

- [ ] One row per source URL: title, owner, last meaningful edit, twelve-month
      sessions, category, decision, target path
- [ ] A count and a share per category, agreed in a meeting where someone was
      allowed to say no
- [ ] A list of contradictory pairs, each with a named decision owner and a date
- [ ] A first-cut target information architecture derived from the surviving
      pages, not from the old navigation
- [ ] A redirect map seed, which is simply the inventory filtered to every row
      whose target path differs from its source path
- [ ] A rewrite backlog with owners, separated into "before cutover" and "after"

The last two are why the audit pays for itself. The redirect map and the
navigation model both fall out of a table you had to build anyway, and both are
much more expensive to reconstruct in the week before launch.

If you are running this yourself, the [migration handbook](/docs/) covers the
same pass in more detail, including how the target information architecture
comes out of the inventory. If you would rather hand it over, the inventory is
the first deliverable of a migration engagement — see what that covers on the
[services page](/services/), and how it is scoped and quoted on
[pricing](/pricing/).
