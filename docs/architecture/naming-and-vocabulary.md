---
id: naming-and-vocabulary
title: Naming and controlled vocabulary
description: Rules for file names, URL slugs, page titles and product terminology, plus how to enforce a controlled vocabulary in CI so terms stop drifting.
sidebar_position: 3
keywords:
  - documentation naming conventions
  - URL slug rules
  - controlled vocabulary
  - terminology management
  - Vale style linting
---

# Naming and controlled vocabulary

Naming is where documentation quietly goes wrong. Three teams call the same
object three things, page titles drift out of sync with the UI, URLs encode a
directory structure that changed last year, and search returns nothing because
the reader typed the word your product actually uses. A migration is the one
moment when you can fix all of it at once, because you are touching every page
anyway.

## What makes a good documentation URL?

A good URL describes what the page is, stays valid when the navigation changes,
and is short enough to paste into a support reply without wrapping. Concretely:

- **Lowercase, kebab-case, ASCII.** `rotate-api-keys`, not `rotateApiKeys` or
  `Rotate_API_Keys`. Case-sensitivity differences between local machines and
  production servers cause real, hard-to-reproduce 404s.
- **Noun phrase or verb phrase, matching the content type.** Tasks read as
  verbs: `/docs/webhooks/verify-signatures/`. Reference reads as nouns:
  `/docs/reference/webhook-events/`.
- **No version, date or status in the path.** `v2`, `new`, `beta` and `2024`
  all expire. Version belongs in the versioning scheme, not in a slug.
- **No stop words, no product name repeated.** `/docs/acme/acme-webhooks/` is
  the site telling you it was assembled by different people.
- **Three segments after the base path, maximum.** Deeper paths are almost
  always the navigation tree leaking into the URL.

Decouple the slug from the file location so that reorganising the sidebar is
free. In Docusaurus 3, set the slug in frontmatter and let the file live
wherever it is convenient:

```markdown
---
id: verify-signatures
title: Verify webhook signatures
slug: /webhooks/verify-signatures
---
```

Once a URL is published it is a contract. If it has to change, it changes
through the [redirect map](../migration/redirect-mapping.md), never silently.

## Titles, sidebar labels and headings

Three names per page, each with a different job, and they are allowed to
differ:

| Field | Job | Rule |
| --- | --- | --- |
| `title` | The h1 and the browser tab | Full, sentence case, unambiguous out of context |
| `sidebar_label` | The rail entry | Short enough not to wrap; drop the shared prefix |
| `description` | Search snippet and index card | One sentence, under 155 characters, no "This page describes" |

Sentence case for everything. It is easier to be consistent about than title
case, which requires a ruling on every preposition, and it makes product names
stand out because they are the only capitalised words left.

Titles should be unambiguous when they appear alone in a search result. Four
pages called "Overview" are four pages nobody can choose between; "Webhooks
overview" costs one word and solves it.

## Building a controlled vocabulary

A controlled vocabulary is a short list of approved terms with their banned
alternatives. It is not a glossary — a glossary explains terms to readers, a
controlled vocabulary constrains writers. You want both, and they are different
files.

Start it from your own content. Pull the most frequent capitalised phrases out
of the corpus and look at what came back:

```bash
grep -rhoE '\b[A-Z][a-zA-Z0-9]+( [A-Z][a-zA-Z0-9]+)*' docs/ \
  | sort | uniq -c | sort -rn | head -60
```

You will find the drift immediately: `API key`, `API Key`, `api key` and
`APIKey` in the same corpus, or a feature that has both its internal codename
and its launched name in use. For each cluster, pick one, and record the
decision:

```yaml
# vocabulary.yml - one entry per term the product owns
- term: API key
  banned: [API Key, api key, APIKey, api-key, access key]
  note: The credential. "Token" means the short-lived OAuth token, not this.

- term: workspace
  banned: [Workspace, org, organisation, team account]
  note: Lowercase. The container for projects. Matches the UI label.

- term: sign in
  banned: [login, log in, signin, log-in]
  note: Verb is "sign in", noun is "the sign-in page".
```

Three rules keep the vocabulary usable. Match the product UI, always — if the
interface says "workspace" and the docs say "organisation", the docs are wrong
even if "organisation" is better. Include the reader's word as a searchable
alias rather than pretending they will learn yours. And keep the list under
about fifty entries; beyond that nobody consults it and enforcement has to be
automatic.

## Enforcing it in CI

Vale is the standard tool for this and it takes an afternoon to wire up. A
minimal configuration:

```text
; .vale.ini
StylesPath = .vale/styles
MinAlertLevel = warning
Vocab = Product

[*.md]
BasedOnStyles = Vale, House
```

A substitution rule turns each vocabulary entry into an enforced check:

```yaml
# .vale/styles/House/Terms.yml
extends: substitution
message: "Use '%s' instead of '%s'."
level: error
ignorecase: false
swap:
  'API Key': API key
  'APIKey': API key
  'log ?in': sign in
  'organisation': workspace
```

Run it in the same pull-request job as your other checks:

```bash
vale --minAlertLevel=error docs/
```

Set terminology rules to `error` and stylistic preferences to `warning`.
Everything at `error` level makes people disable the linter; nothing at `error`
level makes it advisory, which is the same as absent. The split is what makes
[review gates](../operations/review-gates.md) tolerable.

## Naming during the migration

Do the renaming in one pass, at conversion time, and record every old-to-new
pair in the inventory as you go. Two things make this survivable: rename files
with `git mv` so history follows the content, and never rename and rewrite in
the same commit — a reviewer cannot see a content change inside a rename diff.

```bash
git mv docs/guides/Webhooks_Setup.md docs/webhooks/subscribe.md
git commit -m "Rename webhook setup page to match naming rules"
```

Terminology fixes are the exception: those are a bulk, mechanical, separately
reviewable commit across the whole corpus, best done immediately after
conversion and before human review, so reviewers never spend attention on them.
Feed the results back into
[authoring standards](../operations/authoring-standards.md) so new pages start
compliant.
