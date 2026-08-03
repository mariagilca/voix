---
id: content-inventory
title: Building a content inventory
description: How to build a documentation content inventory - crawl the URLs, join analytics, score each page, then decide keep, merge, rewrite or archive.
sidebar_position: 2
keywords:
  - content inventory
  - documentation audit
  - content audit spreadsheet
  - page inventory sitemap crawl
  - docs migration map
---

# Building a content inventory

A content inventory is a row per page with enough attributes attached that you
can decide, in bulk, what happens to it. It is the single highest-leverage
artefact in a migration: it converts "the docs are a mess" into "412 pages, 118
of which had fewer than ten views last year", and it is what makes scoping,
sequencing and redirect mapping possible instead of guesswork.

Budget one to three days for a set under a thousand pages. Do it before you
choose a navigation model, not after.

## What is a content inventory and what goes in it?

A content inventory is a machine-readable list of every published page with its
metadata, usage and disposition. One row per URL, one column per attribute you
will filter on later. Start with these columns and add only what you will
actually sort by:

| Column | Source | Why it earns its place |
| --- | --- | --- |
| `url` | Crawl or sitemap | The join key for everything else, and the input to redirect mapping |
| `title` | Crawl | Reveals duplicates and naming drift |
| `word_count` | Crawl | The best cheap proxy for conversion effort |
| `last_modified` | Platform export or API | Age is the strongest single predictor of wrongness |
| `author` or `owner` | Platform export | You need someone to ask |
| `pageviews_12mo` | Analytics | Separates the corpus from the content |
| `entrances` | Analytics | Distinguishes destinations from waypoints |
| `inbound_internal_links` | Crawl | A page nothing links to is either an orphan or an entry point |
| `has_images` / `has_attachments` | Crawl | Feeds [media handling](../migration/images-and-attachments.md) |
| `content_type` | Human | Concept, task, reference, troubleshooting, release note |
| `disposition` | Human | keep / merge / rewrite / archive |
| `new_path` | Human | The target URL, which becomes the redirect map |

Keep it in a CSV in the repository, not in a shared spreadsheet that becomes
the only copy. It is project data with a lifetime; treat it like code.

## Getting the raw list

Start from the sitemap if there is one, because it is the platform's own claim
about what is published.

```bash
curl -s https://docs.example.com/sitemap.xml \
  | grep -oE '<loc>[^<]+</loc>' \
  | sed -E 's#</?loc>##g' \
  | sort -u > urls.txt
wc -l urls.txt
```

Then crawl those URLs for the attributes the sitemap does not carry. Any
crawler works; the point is that the output is a CSV keyed on URL. A minimal
pass with `wget` gives you a local copy of the rendered HTML to extract from
and to diff against later:

```bash
wget --input-file=urls.txt \
     --adjust-extension --page-requisites --convert-links \
     --wait=0.5 --random-wait \
     --directory-prefix=./crawl
```

Two checks before you trust the list. First, compare the sitemap count against
the platform's own page count in its admin UI; a gap means unlisted or
permission-gated pages that will surprise you later. Second, pull the top 500
documentation URLs from analytics and confirm each one is in `urls.txt`. Live
traffic to a URL that is not in the sitemap is exactly the page a customer will
notice missing.

## Joining analytics without lying to yourself

Export twelve months, not three — documentation traffic is seasonal around
releases, and a quarterly window will condemn pages that matter in March.
Export at the page-path level, deduplicate query strings, and be explicit about
what the numbers can and cannot tell you.

Pageviews measure findability and demand together, and you cannot separate them
from the report. A page with no views may be useless, or it may be a correct
answer that search never surfaces. Before archiving anything on view count
alone, check whether it has inbound internal links and whether support ever
sends it to customers. Ask the support team for their five most-pasted links;
that list rarely matches the analytics top five, and both are true.

## Turning rows into decisions

Score, then decide. A workable first pass:

- **Keep as-is** — accurate, used, correctly typed. It converts mechanically.
- **Merge** — two to five pages that are one page. Very common around
  "getting started", "quickstart", "installation" and "setup".
- **Rewrite** — the topic is needed, the page is not correct or not the right
  content type. This is the row that costs real time; count it separately.
- **Archive** — no longer true, or true of a version nobody runs. Archived is
  not deleted: it still needs a redirect target, usually the nearest surviving
  parent.

Run the pass with the person who owns the product area, not alone, and do it in
one sitting per area with a timebox. Judgement improves after about thirty
pages and then plateaus.

## How long does a content inventory take?

Plan on roughly one working day per two hundred pages for the crawl, join and
first-pass disposition, plus a review session per product area. The crawl and
join are minutes of compute; the disposition column is where all the time goes
because it needs someone who knows whether the content is still true.

Two ways to compress it: type-check in bulk before you read individual pages
(sorting by title pattern catches most content types), and let word count carry
the effort estimate instead of reading every page to judge.

## What the inventory unlocks

Three downstream artefacts come straight out of these columns and cannot be
built without them: the effort estimate in
[scoping and sequencing](./scoping-and-sequencing.md), the content-type counts
that drive [templates](../architecture/content-types-and-templates.md), and the
`url` to `new_path` pairs that become your
[redirect map](../migration/redirect-mapping.md).

Keep the CSV updated during the migration itself. Add a `status` column, move
rows through it, and you have a burndown that a sceptical stakeholder can read
without a status meeting.
