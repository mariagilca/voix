---
id: images-and-attachments
title: Handling images and attachments
description: Extract, deduplicate, rename and relocate documentation media during a migration, and choose between colocated assets, static files and Git LFS.
sidebar_position: 2
keywords:
  - documentation images migration
  - image optimisation docs
  - Git LFS documentation
  - alt text audit
  - static assets Docusaurus
---

# Handling images and attachments

Media is where migrations lose time they did not budget. The content converts
in an afternoon; the screenshots with hashed filenames, the copies of the same
image stored once per page, and the ones showing a UI that no longer exists
take a week. Handle media as its own workstream with its own checklist.

## Where should documentation images live?

Colocate images with the pages that use them, in a folder next to the Markdown
file, and reserve the global static directory for assets shared across many
pages. Colocation means moving or deleting a page moves or deletes its images
with it, which is the only arrangement that stays tidy without policing.

```text
docs/
  webhooks/
    subscribe.md
    img/
      subscribe-event-picker.png
static/
  img/
    architecture-overview.svg      # referenced from several pages
```

In Docusaurus 3, a relative reference from a colocated folder is resolved and
fingerprinted at build time, and a broken path fails the build rather than
shipping a missing image:

```markdown
![The event picker with three event types selected](./img/subscribe-event-picker.png)
```

Assets under `static/` are copied verbatim and referenced from the site root as
`/img/architecture-overview.svg`. They are not fingerprinted and not checked, so
use them only for genuinely shared media.

## The extraction pass

Vendor exports rarely give you clean media. Expect hashed names
(`a83f0e2b.png`), images embedded as base64 data URIs, and the same screenshot
stored separately for every page that used it. Work through it in this order.

**1. Pull everything out of the export, including the inline ones.** Data URIs
inside the HTML need decoding into real files before pandoc runs, or they end
up as multi-kilobyte strings in your Markdown.

**2. Deduplicate by content hash, not by name.**

```bash
find ./export/media -type f \
  | xargs shasum -a 256 \
  | sort \
  | awk '{ if ($1 == prev) print "DUP " $2; prev = $1 }'
```

Duplicate copies of the same asset are common in platforms where authors upload
rather than reference. Keep one copy, point every reference at it, and record
the mapping so the link rewrite pass can apply it.

**3. Rename to describe the content.** `a83f0e2b.png` becomes
`subscribe-event-picker.png`. Descriptive names make images reviewable in a
pull request, greppable when the UI changes, and diagnosable when one goes
missing. Do it as a table in the media manifest, applied by a script; do not
rename by hand.

**4. Optimise.** Documentation screenshots are routinely shipped far wider than
they render. Cap the width, strip metadata, and re-encode:

```bash
# raster screenshots
magick input.png -resize '1600x>' -strip -quality 82 output.png

# vector diagrams
npx svgo --multipass --input diagram.svg --output diagram.svg
```

The `1600x>` form only shrinks images wider than 1600 pixels, which is the
behaviour you want for a mixed corpus. Check the result at full size before
committing the whole batch: text inside screenshots is the first thing to go
illegible.

**5. Rewrite the references** in the converted Markdown from the mapping
produced in steps 2 and 3, then fail the build on any reference that did not
resolve.

## Alt text is a migration task, not a nicety

Most exported alt text is either empty or the original filename, and both are
useless. A migration touches every image once, which makes it the cheapest
opportunity you will ever have to fix this. The rules:

- Describe what the image shows in the context of the surrounding text, in one
  sentence. "The event picker with three event types selected", not
  "screenshot".
- If the image is purely decorative, use empty alt text so screen readers skip
  it — but ask first why a decorative image is in the documentation.
- If the image contains information that appears nowhere else — a diagram, a
  table rendered as a picture, an error message — put that information in the
  page text too. Alt text is not the place for a paragraph.
- Never start with "Image of" or "Screenshot of". The reader's software already
  said that.

Audit what you have before deciding how much work it is:

```bash
grep -rhoE '!\[[^]]*\]' --include='*.md' docs/ \
  | sort | uniq -c | sort -rn | head -20
```

An `![]` at the top of that list tells you how many images have no alt text at
all.

## Non-image attachments

PDFs, sample datasets, Postman collections, installers and archives need a
policy, because they are the files that make a repository unpleasant to clone.

| Attachment | Recommended handling |
| --- | --- |
| Small samples under about 100 KB | Commit normally, colocated |
| Large binaries, repeatedly updated | Git LFS, or host outside the repository and link |
| Generated artefacts (installers, builds) | Never in the docs repository; link to the release |
| Documents that should be pages | Convert them; a PDF is not documentation, it is a page in a costume |

The last row deserves a real decision during the inventory. Every PDF in a
documentation site is content that cannot be searched properly, cannot be
version controlled meaningfully, and cannot be read on a phone. Convert the
ones that are genuinely reference material and archive the rest.

If you do use LFS, set it up before the first large commit, because retrofitting
means rewriting history:

```bash
git lfs install
git lfs track "*.pdf" "*.zip" "*.mp4"
git add .gitattributes
git commit -m "Track large documentation attachments with LFS"
```

## Checks to run before launch

- Every referenced image resolves — the build enforces this for colocated
  paths, so make the build the check.
- No image wider than your content column at 2x, and no single file over about
  500 KB without a reason.
- Every image has non-empty alt text, or a deliberate empty one.
- No screenshot shows a UI that shipped a redesign since it was taken. Sort the
  media manifest by original capture date and review the oldest 10% by hand.
- The repository clones in a reasonable time on a normal connection. If it does
  not, media is the reason.

Media paths are also URLs, and moving them breaks the ones customers linked to
directly. Fold image paths into the [redirect map](./redirect-mapping.md) if any
of them are hot-linked, then verify everything together in
[QA and link checking](./qa-and-link-checking.md).
