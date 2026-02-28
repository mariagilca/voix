---
slug: docs-migration-without-lockin
title: How to migrate docs without vendor lock-in
authors: [voix]
tags: [docs-migration, docs-as-code]
---

Moving documentation out of an expensive platform can feel risky, but staying
locked in is usually more expensive over time.

<!-- truncate -->

The goal is not just to move pages. The goal is to move to a system you own,
where content is versioned, testable, and portable.

A reliable migration usually follows five steps:

1. Inventory your content and identify duplicates, gaps, and stale pages.
2. Define the target information model (types, metadata, and templates).
3. Convert and normalize content into open formats like Markdown.
4. Validate links, embeds, redirects, and navigation before launch.
5. Cut over with CI/CD so updates stay safe after migration.

The biggest mistake is treating migration as a copy-and-paste project. It is a
platform change, which means structure and workflows matter as much as content.

When done well, migration reduces tooling cost, improves collaboration, and
makes your documentation easier to maintain for years.
