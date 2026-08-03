---
slug: docs-as-code-without-the-cargo-cult
title: Docs as code without the cargo cult
authors: [maria]
tags: [docs-as-code, developer-experience, governance]
description: Which parts of the docs-as-code toolchain earn their keep, what has to be true before you adopt each one, and which practices are pure theatre.
keywords:
  - docs as code
  - documentation ci cd
  - vale prose linter
  - docusaurus workflow
  - documentation tooling
  - technical writing pipeline
---

Docs as code is a shipping model, not a shopping list. Copying another company's
toolchain gives you their cost structure without their constraints, and most of
the cost lands on the person maintaining the pipeline rather than the person
writing the page. This is which parts pay for themselves, what has to be true
before each one does, and what is theatre.

<!-- truncate -->

## Two things are load-bearing, the rest is optional

The model rests on two properties: the content is plain text in version control,
and a change reaches production through a review that a machine can gate. Every
other practice in the stack exists to make one of those two cheaper or safer.

That framing is useful because it gives you a test. Before adopting a tool, ask
which of the two properties it strengthens. A prose linter makes review cheaper,
so it qualifies once review is a bottleneck. Screenshot automation strengthens
neither; it is a content-production tool that happens to live in the repo, and
it should be judged on its own terms.

## What pays for itself, and when

| Practice | Adopt when | What it buys |
| --- | --- | --- |
| Markdown or MDX in Git | Day one | History, blame, branches, and an exit from any vendor |
| Build on every commit, publish on merge | Day one | Nobody publishes by hand at 6pm on a Friday |
| Internal link checking in the build | Day one | Reorganisations stop producing silent 404s |
| Pull request review with CODEOWNERS | As soon as two people can edit the same page | The right reviewer is assigned without anyone remembering to |
| Preview deployment per pull request | As soon as reviewers are not the writers | Subject-matter experts review rendered pages, not diffs |
| External link checking, scheduled | Once you link out to third parties | Rot in other people's URLs surfaces weekly instead of in a ticket |
| Prose linter with a small rule set | When the same correction appears in review for the third time | Style arguments move from people to config |
| Reusable snippets or partials | When one procedure appears verbatim in three or more places | One edit instead of three, and no drift between them |
| Generated API reference | When the spec is authoritative and validated in CI | Reference stops lagging the API |
| Docs versioning | When you support more than one released version at once | Users on the old release stop reading the new instructions |
| Custom MDX components | When a layout pattern repeats across many pages | Consistency without copy-pasted markup |
| Executable code samples | When users copy samples and they break silently | Samples fail in CI instead of in production |
| Localisation pipeline | When translation is funded and continuous | Translations track the source instead of forking from it |

Read the middle column as a precondition, not a recommendation. Docs versioning
without a second supported release multiplies your maintenance surface for
nothing: every fix now needs a decision about which versions it applies to.
Snippets before the third duplicate make the source harder to read than the
duplication did.

## Do you need docs as code for a five-person team?

You need version control and a build that fails on broken links. You almost
certainly do not need the rest yet. At five people, review happens in a shared
channel rather than through CODEOWNERS, style is settled by asking the person
sitting next to you, and there is only one supported version of the product, so
the parts of the stack that pay off through coordination have nothing to
coordinate.

What is worth doing early is choosing formats that do not block later adoption.
Plain Markdown in a repo with a real build keeps every option open. A
proprietary editor with an export button does not: you can add a linter to
Markdown next year, but you cannot add version control to a platform that only
stores rendered HTML.

## The smallest pipeline that is worth having

For a Docusaurus site, this is close to the whole thing:

```yaml
name: docs
on:
  pull_request:
    paths: ['docs/**', 'blog/**', 'src/**', 'docusaurus.config.js']
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      # onBrokenLinks: 'throw' makes this step the internal link checker.
      - run: npm run build
      - name: Check external links
        uses: lycheeverse/lychee-action@v2
        with:
          args: --no-progress --max-concurrency 8 build/
          fail: true
```

The comment on the build step is the important part. In Docusaurus,
`onBrokenLinks: 'throw'` and `onBrokenAnchors: 'throw'` turn the ordinary build
into a link checker for every internal link and every heading anchor on the
site. It is two lines of configuration and it removes an entire class of defect
that is otherwise chased with a crawler running after deployment, which is to
say after users have already found the 404.

Ownership is the other early win, and it is one file:

```
# CODEOWNERS — the last matching pattern wins, so general first, specific after.
/docs/            @acme/docs
/docs/api/        @acme/platform
/docs/billing/    @acme/billing
```

That gets the API team onto API pull requests automatically. Without it, "the
docs team reviews everything" becomes the bottleneck the pipeline was supposed
to remove.

When style corrections start repeating, add a linter with a deliberately small
rule set. Three rules that block a merge beat forty that people learn to ignore:

```ini
StylesPath = styles
MinAlertLevel = error
Packages = Google

[*.{md,mdx}]
BasedOnStyles = Google
Google.Headings = YES
Google.WordList = YES
Google.Passive = NO
```

`Google.Passive = NO` is not an oversight. Passive voice is a judgement call a
reviewer should make, and a linter that fails builds over it teaches writers to
route around the linter.

## What is usually theatre

- **A style guide nobody enforces.** A 40-page document that no build checks and
  no reviewer cites. Either encode three rules in the linter or accept that
  style is a review conversation.
- **Screenshot automation.** The pipeline is itself a product: selectors,
  seeded data, a browser runner, and a rendering environment that drifts. It
  earns its keep when the screenshot count is large and the UI is stable. While
  the UI is still moving, crop and commit.
- **Versioning switched on because the platform supports it.** Each version is a
  copy of the docs that someone now has to keep true.
- **A monorepo docs setup for one product.** Path filters, build matrices and
  workspace configuration to solve a coordination problem you do not have.
- **A custom static site generator.** The maintenance never appears on the
  roadmap and never stops.
- **"Everyone contributes" with no template, owner or review commitment.** Open
  contribution without a review service level turns the pull request queue into
  a slower version of the backlog it replaced, and contributors stop trying
  after the second unreviewed pull request.
- **A WYSIWYG layer bolted onto the Git workflow so non-writers can edit.** You
  now maintain two authoring models and reconcile them by hand. Pick one, and if
  the answer is that some contributors cannot use Git, make the web editor in
  the Git host the fallback rather than a second system.

None of these are wrong in every context. They are wrong as a starting position,
and they are what a stack looks like when it was copied rather than chosen.

## Adopt in the order that removes pain

A workable sequence, where each step is only taken when the previous one is
boring:

1. Content in Git, built in CI, published on merge to the default branch.
2. Broken internal links fail the build.
3. CODEOWNERS, so review routing is automatic.
4. Preview deployments, so subject-matter experts can review rendered pages.
5. Templates for the two or three page types you actually publish.
6. A linter, with the smallest rule set that ends the recurring argument.
7. Everything else, only when its precondition in the table above is met.

Steps 1 to 4 are the ones that change how it feels to ship a page. Steps 5 and 6
are what keep a growing contributor pool from producing forty page shapes. Most
of the tooling anxiety in this space is about step 7, which is the part that
matters least.

A migration is the cheapest moment to make these choices, because the pipeline
is being built once anyway and nobody has habits in the new system yet. The
[migration handbook](/docs/) covers the operational side of that build, and
[contributor onboarding and CI/CD delivery](/services/) are two of the four
things a voix engagement covers. If you are earlier than that and still deciding
whether the move is worth it, the [content audit post](/blog/documentation-content-audit/)
is the honest first step.
