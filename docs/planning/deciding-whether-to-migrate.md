---
id: deciding-whether-to-migrate
title: Deciding whether to migrate
description: A decision framework for documentation platform migration - the signals that justify it, the ones that do not, and the full cost of staying put.
sidebar_position: 1
keywords:
  - should we migrate documentation
  - documentation platform lock-in
  - docs migration business case
  - total cost of documentation platform
  - docs as code decision
---

# Deciding whether to migrate

Migrating a documentation platform costs a quarter of somebody's attention at
minimum, and the output looks, to most of the company, like the same pages at
the same URLs. Decide deliberately. This page gives you the signals that
justify the work, the ones that only look like they do, and a way to price the
alternative honestly.

## When is a documentation migration worth doing?

A migration is worth doing when the platform is now blocking work you need to
do anyway, and the block is structural rather than a missing feature on a
roadmap. Five signals, in rough order of how strongly they predict that a
migration pays for itself:

1. **You cannot get your content out in a usable form.** Export produces
   nested HTML with inline styles, or a proprietary JSON blob, or nothing.
   Every quarter you stay, the export gets larger and the conversion cost
   grows.
2. **Engineers will not write in it.** If the people who know how the product
   works refuse to open the editor, documentation accuracy is capped at what
   non-engineers can infer. A tool that lives in the same pull request as the
   code change removes that cap.
3. **Review is not real.** No diff, no required approval, no history you can
   attribute. "Who changed this and why" should take fifteen seconds to answer.
4. **Publishing is manual and therefore late.** Release notes go out the day
   after release because a person has to click publish.
5. **Cost scales with editors, not with value.** Per-seat pricing makes the
   correct behaviour — more contributors — the expensive one.

Two signals that look decisive and usually are not: search quality, and
appearance. Bad search is more often bad information architecture than a bad
search engine, and you will find that out the hard way when you rebuild on a
new platform and search is still bad. Appearance is a theme, and every platform
has one.

## What does staying actually cost?

Price the status quo before you price the migration, over the same horizon —
three years is a fair window. Fill this in with your own numbers; do not
estimate the rows you can measure.

| Cost line | How to measure it |
| --- | --- |
| Licence and seats | Current annual invoice, plus the vendor's published uplift, plus seats you would add if seats were free |
| Editor time lost to the tool | Ask three authors to time one typical page edit end to end |
| Engineer time not contributed | Count code PRs that shipped with no docs change and should not have |
| Late or missing release notes | Count releases in the last two quarters with no docs update within a week |
| Support deflection you are not getting | Tickets whose answer already exists in docs but was not findable |
| Exit cost, deferred | Content volume today versus twelve months from now, at your current growth rate |

The last row is the one that changes decisions. Migration cost is roughly
linear in page count and content complexity. If the documentation set is
growing 30% a year, waiting a year makes the same project meaningfully larger
while delivering nothing in the meantime.

## What makes a migration go badly?

Four failure modes account for most of it.

**Lift and shift.** The content moves, the structure does not, and six months
later the new platform has the same navigation problem plus a new toolchain
nobody knows. If you are not going to redesign the information architecture,
the migration is a format change and should be scoped and sold as one.

**No redirect plan.** Old URLs are in support macros, in-product help links,
Stack Overflow answers, customer bookmarks and Google's index. Breaking them
is the one migration mistake that is visible to customers on day one. See
[redirect mapping](../migration/redirect-mapping.md) before you commit to a URL
structure.

**A pipeline only one person can run.** If the build works on one laptop and
nowhere else, the migration has traded a vendor for a bus factor of one.
Everything must run in CI from a clean checkout.

**No owner after launch.** Documentation decays at the rate the product
changes. A migration without an
[ownership model](../operations/ownership-and-governance.md) buys you a clean
site that starts drifting the week after launch.

## When should you not migrate?

Do not migrate if the documentation set is small, stable and served fine by the
current tool — under about fifty pages that change a few times a year, the
platform is not your constraint. Do not migrate three months before a major
product launch; you will be asked to freeze mid-cutover and the frozen state is
the worst of both worlds. Do not migrate to escape a content problem: if the
pages are wrong, they will be wrong in Markdown, and you should
[rewrite them](./content-inventory.md) first or as part of the same pass, on
purpose, with time budgeted.

Also do not migrate because a competitor's docs look better. Look at their
information architecture instead, and copy that. It is free.

## A decision you can defend

Write the decision down in one page before you ask anyone to fund it: the
signals you observed, the three-year cost of staying, the scope you propose,
the risks, and the explicit "we are not doing X" list. If you cannot fill the
signals section with observations rather than opinions, you are not ready — go
build the [content inventory](./content-inventory.md) first, because it turns
opinions into counts.

When the decision is yes, the next questions are how big the work is and in
what order it happens. That is [scoping and sequencing](./scoping-and-sequencing.md).
If you need the decision ratified by people who do not read documentation, go
to [getting stakeholder buy-in](./stakeholder-buy-in.md).
