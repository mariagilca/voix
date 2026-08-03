---
id: stakeholder-buy-in
title: Getting stakeholder buy-in
description: How to win approval for a documentation migration - map who must say yes, write the one-page case, run a pilot, and pre-empt the objections.
sidebar_position: 4
keywords:
  - documentation migration buy-in
  - docs project stakeholders
  - business case for docs as code
  - RACI documentation project
  - internal proposal documentation platform
---

# Getting stakeholder buy-in

Documentation migrations rarely die from technical failure. They die because
nobody with a budget ever agreed the project existed, or because the support
team found out at launch that their macros were full of dead links. Buy-in is
not a presentation; it is a short list of named people who each said yes to a
specific thing, and a record of what they said yes to.

## Who actually has to say yes?

Four roles, and they need four different arguments. Map them by name before you
write a single slide.

| Role | Typically | What they need | The argument that lands |
| --- | --- | --- | --- |
| Sponsor | VP of product, engineering or marketing | Budget and air cover | The three-year cost of staying, from [deciding whether to migrate](./deciding-whether-to-migrate.md) |
| Owner | Docs lead, DX engineer, PMM | Time protected from other work | A scope with an explicit "not doing" list |
| Contributors | Engineers, PMs, support | To not be made slower | Docs in the same pull request as the code |
| Affected teams | Support, sales engineering, education | No broken links, no surprise | A redirect guarantee and a dated cutover |

Add two more if they exist in your company: whoever owns the domain and CDN,
because cutover is their change, and whoever owns brand or design, because the
new site will be looked at by a design review you did not plan for.

## The one-page case

One page. Anything longer gets skimmed to the last paragraph anyway. Structure
it as follows and keep every claim traceable to something you counted.

```markdown
## Proposal: move product documentation to a Git-based stack

**Problem.** Three observations, each a number from the inventory or the
support queue. No adjectives.

**Cost of staying.** Licence + editor time + deferred exit cost over 3 years.
Show the arithmetic.

**Proposal.** What we build, in one sentence. Where it publishes. Who owns it
afterwards.

**Not in scope.** The explicit list. This paragraph prevents more scope creep
than any process.

**Risk and mitigation.** Broken URLs -> redirect map with automated
verification. Author resistance -> training plus templates. Slippage -> sliced
delivery, each slice shippable.

**Ask.** The specific decision you want today, from the specific person.
```

The "not in scope" paragraph is the one that gets the document approved. It
tells a sceptical reader that you understand the boundary, and it gives you
something to point at in month two when someone asks for a full rebrand.

## Prove it with a pilot, not a pitch

The most persuasive artefact is a working preview URL containing your own
content. Pick one small, recognisable area — the getting-started path is ideal
because everyone has an opinion about it — and take it end to end: converted,
restructured, in the new navigation, deployed to a preview, with search
working.

Show three things side by side in the review:

1. The same page, before and after. Structure and readability, not colours.
2. The pull request that changed it. Reviewers who have never seen a diff of
   prose find this genuinely surprising, in a good way.
3. The pipeline output: build, link check, deploy, all green, with a timestamp.

Then instrument the pilot honestly. Agree in advance what you will look at
after four weeks — time from merge to published, number of distinct
contributors, count of support tickets whose answer was in the pilot area — and
report what you find, including the parts that did not improve. A pilot that
reports one negative finding is believed. One that reports only wins is not.

## Pre-empt the five standard objections

**"Engineers will not write documentation."** Some will not. The change is
that the ones who would, now can, without asking for a licence or leaving
their editor. Show the contributor count from the pilot.

**"Markdown is too technical for our writers."** Writers learn Markdown in an
afternoon. What actually takes time is Git, and that is a training and tooling
question — a web-based editor on the repository covers most non-technical
authors. Budget it in
[authoring standards](../operations/authoring-standards.md) rather than
denying it.

**"We will lose SEO."** You lose ranking if URLs break or content thins.
Neither is inevitable: permanent redirects preserve the overwhelming majority
of link equity, and the [redirect map](../migration/redirect-mapping.md) is a
verifiable artefact you can show. Commit to zero unmapped URLs as an acceptance
criterion, and measure indexed pages before and after.

**"Who maintains it when you leave?"** The correct answer is a named owner per
area and a written governance model, not "it's just Markdown". Bring
[ownership and governance](../operations/ownership-and-governance.md) to the
approval meeting, not after it.

**"Can we do it later?"** Later costs more, in proportion to how much
documentation you add in between. This is the one place where the numbers are
genuinely on your side, so show the growth curve.

## Keep consent alive after the yes

Approval decays. Protect it with a rhythm that costs almost nothing:

- A fortnightly note with the burndown from the inventory CSV, three lines
  long, sent to the sponsor whether or not there is news.
- A preview link in every note, so progress is inspectable rather than
  reported.
- One decision log page in the repository. Every architectural choice —
  navigation model, versioning, URL scheme — gets a dated entry with the
  alternatives considered. Six months later, when someone asks why, the answer
  exists and is not a memory.

With people and scope settled, the next decisions are structural: what content
types you have and what shape the navigation takes. Start with
[content types and templates](../architecture/content-types-and-templates.md).
