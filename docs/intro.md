---
id: intro
title: The documentation migration handbook
description: A vendor-neutral field guide to moving product documentation off a proprietary platform onto Git, Markdown and a static site generator you own.
slug: /
sidebar_position: 1
keywords:
  - documentation migration
  - docs as code
  - migrate documentation to Markdown
  - documentation platform migration
  - Docusaurus migration guide
---

# The documentation migration handbook

This handbook is a working reference for moving product documentation off a
proprietary platform and onto a stack your own team controls: Git for history,
Markdown for source, a static site generator for output, and CI for publishing.
It covers the decision, the inventory, the information architecture, the
conversion, and the operating model you need afterwards.

It is vendor-neutral. Where a concrete example helps, the examples use
Docusaurus 3, because that is a common destination and because abstract advice
about "your SSG" is useless when you are three hours into debugging a broken
sidebar. Every principle here transfers to MkDocs, Hugo, Astro Starlight,
Sphinx, or a bespoke pipeline.

## What is a documentation migration?

A documentation migration is the transfer of documentation content, structure,
URLs and publishing workflow from one platform to another, with the content
model rebuilt rather than copied. That last clause is the whole difficulty. A
straight export-and-import produces a site that looks like the old one, carries
every structural problem the old one had, and gives you no reason to have spent
the quarter. A migration worth doing changes four things at once:

- **Source format** — proprietary blocks or WYSIWYG HTML become plain Markdown
  in files you can grep, diff and review.
- **Structure** — an accumulated page tree becomes a deliberate information
  architecture with named content types.
- **Workflow** — "someone with an editor licence publishes it" becomes a pull
  request with automated checks.
- **Ownership** — the content lives in a repository you control and can move
  again, cheaply, to somewhere else.

Doing all four at once is more work than doing one. Doing them one at a time,
across four separate projects, is more work still, because each pass touches
every page again.

## Who is this handbook for?

It is for the person who has to make the migration happen: a documentation
lead, a platform or developer-experience engineer, a product marketing manager
who inherited the docs, or a founding technical writer at a company that
outgrew its first tool. It assumes you can read a YAML file and run a command
in a terminal. It does not assume you have run a migration before, and it does
not assume you have a dedicated docs team — most of the people who need this
have neither.

If you are building the business case rather than the pipeline, read
[deciding whether to migrate](./planning/deciding-whether-to-migrate.md) and
[getting stakeholder buy-in](./planning/stakeholder-buy-in.md), then hand the
rest to whoever will do the work.

## How is the handbook organised?

Four sections, in the order the work actually happens.

| Section | What it answers | Start here |
| --- | --- | --- |
| Planning | Should we migrate, what do we have, in what order, and who has to agree? | [Deciding whether to migrate](./planning/deciding-whether-to-migrate.md) |
| Architecture | What shape should the new documentation have before a single page moves? | [Content types and templates](./architecture/content-types-and-templates.md) |
| Migration | How does content, media and every old URL get from there to here? | [Converting content to Markdown](./migration/converting-to-markdown.md) |
| Operations | How does it stay good after launch? | [CI/CD publishing](./operations/ci-cd-publishing.md) |

The sections are ordered but not strictly sequential. Architecture decisions
change what the inventory needs to capture, and the first conversion attempt
always sends you back to revise a template. Expect to loop.

## How should I use it?

Three reading paths, depending on where you are:

1. **Scoping a migration you have not started.** Read Planning end to end,
   skim Architecture, and stop. You do not need conversion detail yet, and
   reading it now will make the project feel larger than it is.
2. **Mid-migration and stuck on a specific problem.** Go straight to the page:
   [redirect mapping](./migration/redirect-mapping.md) if URLs are the issue,
   [handling images and attachments](./migration/images-and-attachments.md) if
   media is, [QA and link checking](./migration/qa-and-link-checking.md) before
   you cut over.
3. **Launched and now trying to keep it healthy.** Operations is the section
   that matters, particularly
   [ownership and governance](./operations/ownership-and-governance.md), which
   is the part a migration drops when it runs late and the part that is
   expensive to retrofit once the content is already drifting.

Every page is written to be read alone. Cross-links point to the page that
answers the next obvious question rather than to a general index.

## What this handbook will not tell you

It will not tell you which platform to pick, because the answer depends on who
maintains it after you. It will not benchmark tools against each other with
numbers we have not measured. It will not claim a migration is quick — most of
the cost is editorial judgement about content, and no tool removes that.

It also does not sell anything. If you want to know what an outside team would
take on, that is what [our services page](/services/) is for; this handbook is
written so you can do the work without one.
