---
id: review-gates
title: Review gates and quality checks
description: Which documentation checks to automate, which to leave to humans, how to configure them, and how to keep required checks fast enough to survive.
sidebar_position: 2
keywords:
  - documentation review process
  - markdownlint configuration
  - CODEOWNERS docs
  - required status checks
  - docs pull request checklist
---

# Review gates and quality checks

A review gate is a rule that stops a change reaching readers. Every gate you
add buys quality and costs contribution, and the exchange rate is not constant:
the first few gates are almost free, and the tenth one is why an engineer
writes a Slack message instead of a pull request. Choose them, count them, and
justify each one.

## Which documentation checks should block a merge?

Block on anything objectively wrong and cheap to verify; warn on anything
stylistic; leave anything requiring judgement to a human reviewer. The test for
"objectively wrong" is whether two reasonable people would agree without
discussion — a broken link, yes; a passive sentence, no.

| Check | Level | Why |
| --- | --- | --- |
| Build succeeds | Block | A page that does not build does not exist |
| Broken internal link or anchor | Block | Deterministic, and the reader's worst experience |
| Missing or malformed frontmatter | Block | Breaks navigation and metadata silently |
| Two h1 elements or a skipped heading level | Block | Breaks accessibility and the table of contents |
| Banned terminology | Block | Objective once the vocabulary is agreed |
| Spelling against a project dictionary | Block | Objective, with an easy escape via the dictionary |
| Style suggestions (voice, length, hedging) | Warn | Judgement; useful as a prompt, hostile as a gate |
| External link availability | Warn, nightly | Fails for reasons unrelated to the change |
| Technical accuracy | Human | Not checkable by a machine, ever |
| Structure and content type fit | Human | Requires knowing what the page is for |

## Configure the automated half

Keep every linter configured in the repository so the same rules run locally and
in CI. Structural linting with `markdownlint-cli2`:

```json
{
  "config": {
    "default": true,
    "MD013": false,
    "MD024": { "siblings_only": true },
    "MD025": { "front_matter_title": "" },
    "MD033": { "allowed_elements": ["details", "summary", "br"] },
    "MD041": false
  },
  "globs": ["docs/**/*.md"],
  "ignores": ["docs/_templates/**"]
}
```

The overrides are the interesting part. `MD013` (line length) is off because
one-line paragraphs are correct when your diffs are generated. `MD025` is
configured so a frontmatter `title` plus a Markdown h1 is not double-counted.
`MD033` allows the small set of HTML elements that Markdown genuinely lacks.
Turning rules off deliberately, with a reason, is how a linter stays credible.

Spelling with a project dictionary, so unknown product nouns are added once
rather than ignored forever:

```bash
npx cspell --no-progress --no-summary "docs/**/*.md"
```

Terminology and style with Vale, split by severity as described in
[naming and controlled vocabulary](../architecture/naming-and-vocabulary.md):

```bash
vale --minAlertLevel=error docs/    # blocks
vale --minAlertLevel=suggestion docs/  # reported as a comment, does not block
```

Wire all of these into the pull-request workflow from
[CI/CD publishing](./ci-cd-publishing.md), in a fast job that runs before the
full build.

## Route the human half automatically

The most common failure in documentation review is not a bad review; it is no
review, because nobody knew they were the right person. Encode it:

```text
# .github/CODEOWNERS
# Every docs change needs a docs reviewer.
/docs/                          @acme/docs

# Product areas additionally need their owning team.
/docs/webhooks/                 @acme/docs @acme/platform
/docs/billing/                  @acme/docs @acme/payments
/docs/reference/                @acme/docs @acme/api

# Infrastructure of the site itself.
/docusaurus.config.js           @acme/docs-platform
/sidebars.js                    @acme/docs-platform
/.github/workflows/             @acme/docs-platform
```

Pair it with branch protection that requires the code owner's approval and the
blocking checks above. Two rules make this work in practice: require exactly
one approval, not two, because a second reviewer adds latency and rarely finds
anything the first missed; and give every reviewing team a real response
expectation, such as one working day, so the gate does not become a queue.

## The human review checklist

Give reviewers a short, fixed list. Without one you get comments about commas
on a page whose steps are wrong.

1. **Is it true?** Someone who has run this procedure recently should confirm
   it still works, including exact flags and output.
2. **Is it the right content type?** A task page with three paragraphs of
   background before step one is two pages. See
   [content types and templates](../architecture/content-types-and-templates.md).
3. **Is it in the right place?** Correct section, correct sidebar position, and
   linked from somewhere a reader will actually be.
4. **Does it duplicate an existing page?** The most expensive documentation
   defect is two pages that disagree.
5. **Does it need a redirect?** Any moved or renamed page does.
6. **Is anything now stale because of this change?** Screenshots, release
   notes, the page that used to describe the old behaviour.

Reviewers should be explicit about which of these they checked. "Approved,
verified steps 1-4 on 4.2" is a useful review; a bare approval on a technical
change is a rubber stamp.

## Keep the gate passable

Two escape valves keep a strict pipeline from breeding workarounds.

**A documented bypass for urgent corrections.** When a page is actively wrong
and someone is being harmed by it, a docs owner can merge with the automated
checks green and no second approval, and must open a follow-up issue the same
day. Write this down; an undocumented bypass gets used anyway, silently.

**A trivial path for trivial changes.** Typos and broken links should be a
one-click edit that merges on a single approval, with no area-owner review.
Requiring a platform-team sign-off to fix a misspelling is how you teach people
that fixing documentation is not worth the effort.

Finally, measure the gate, not just the content: time from pull request open to
merge, and the share of pull requests that stall for more than a week. If
either is climbing, the review process is the problem, whatever the quality
numbers say. That measurement belongs to whoever owns the docs, which is the
subject of [ownership and governance](./ownership-and-governance.md).
