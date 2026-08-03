---
id: content-types-and-templates
title: Content types and templates
description: Define a small set of documentation content types, give each a template and a frontmatter contract, and make the structure enforceable.
sidebar_position: 1
keywords:
  - documentation content types
  - documentation templates
  - concept task reference
  - frontmatter schema
  - Diataxis documentation structure
---

# Content types and templates

A content type is a promise about what a page contains and how it is shaped.
Naming four or five types, writing a template for each, and enforcing the
frontmatter contract is the cheapest structural improvement available in a
migration — cheaper than a redesign, and it survives one.

Do this before conversion starts. The content type of a page decides its
template, its position in the navigation, and often whether it should exist at
all, so it is the column in the
[content inventory](../planning/content-inventory.md) that everything else
hangs off.

## What content types should we use?

Use the smallest set that describes your corpus, which for most software
products is five: concept, task, reference, troubleshooting and release note.
The distinction that matters is the reader's mode — learning versus doing
versus looking something up — because mixing modes on one page is what makes
documentation feel exhausting.

| Type | Reader is | Answers | Shape |
| --- | --- | --- | --- |
| Concept | Building a mental model | What is this and why does it work this way | Prose, one diagram, no numbered steps |
| Task | Trying to do one thing | How do I do X | Prerequisites, numbered steps, verification, next step |
| Reference | Looking up a specific fact | What are the exact parameters | Tables, exhaustive, alphabetical or spec order, no narrative |
| Troubleshooting | Blocked by an error | Why did this fail and how do I fix it | Symptom, cause, resolution, one entry per symptom |
| Release note | Checking what changed | What changed in version N | Dated, versioned, grouped by added / changed / fixed / removed |

If you want the theoretical version of this split, the Diátaxis framework makes
the same argument more rigorously and is worth reading. In practice, the
enforcement matters more than the taxonomy: any consistent set of four to six
types beats a perfect set nobody applies.

Two rules keep the set honest. A page has exactly one type — if it needs two,
it is two pages, and you link them. And you do not add a type without deleting
one; "guide", "overview" and "getting started" are the three names people reach
for when they mean "I did not decide", and each will absorb everything unless
you refuse them.

## The frontmatter contract

Every page carries the same required fields, and CI rejects the ones that do
not. In Docusaurus 3 the docs plugin reads these fields directly:

```markdown
---
id: rotate-api-keys
title: Rotate an API key
description: Replace a live API key with a new one without dropping requests.
sidebar_position: 4
sidebar_label: Rotate a key
keywords:
  - rotate API key
  - key rotation
last_update:
  date: 2026-03-11
  author: platform-team
---
```

- `id` is the stable handle used by sidebars and cross-links. Never change it
  casually; changing it breaks every explicit sidebar entry that names it.
- `title` is the h1 and the browser title. Sentence case.
- `description` is the meta description and the card text in generated
  indexes. Write a real sentence under 155 characters, and never leave it to be
  auto-extracted from the first paragraph.
- `sidebar_label` overrides the sidebar text when the title is too long for a
  narrow rail. Use it rather than shortening the title.
- `keywords` feeds the page metadata and is a useful discipline even where it
  carries little ranking weight: if you cannot name three, the page's job is
  unclear.

Add your own required field for ownership — `owner: platform-team` — and
validate it in CI. It is the hook that makes
[ownership and governance](../operations/ownership-and-governance.md)
mechanical rather than a wiki page nobody updates.

## Templates that people actually use

Put the templates in the repository, not in a style guide PDF. A template is a
file an author copies:

```bash
docs/
  _templates/
    concept.md
    task.md
    reference.md
    troubleshooting.md
    release-note.md
```

Prefix the directory with an underscore so the docs plugin ignores it, and keep
each template short enough to read in full before writing. A task template that
earns its place:

````markdown
---
id: TODO-kebab-case-id
title: TODO verb-first sentence case title
description: TODO one sentence, under 155 characters, says what the reader achieves.
owner: TODO-team
---

# TODO verb-first title

One sentence on what this task achieves and when you would do it.

## Before you start

- Permission or role required
- Version or plan required
- Anything that must already exist

## Steps

1. Do the first thing.

   ```bash
   command --with-real-flags
   ```

2. Do the second thing. Say what the reader should see.

## Verify it worked

The observable signal that the task succeeded.

## Related

- Link to the concept page that explains why
- Link to the reference page for full parameters
````

Note the two structural rules embedded in it: the task states its
prerequisites before the first step, and it ends with a verification the reader
can observe. Those two sections are what separate documentation from a memo.

## Making the contract enforceable

Templates decay unless something checks them. Three cheap gates, in increasing
order of strictness:

1. **Frontmatter validation.** A small CI script that fails the build when a
   required key is missing or a `description` is over 155 characters. Twenty
   lines of Node, run over every file, and it will catch something every week.
2. **Structure linting.** `markdownlint-cli2` with a rule set that enforces one
   h1 per page, no skipped heading levels, and ATX headings.
3. **Editorial linting.** Vale with a house style for terminology and voice,
   covered in [authoring standards](../operations/authoring-standards.md).

Run all three on pull requests. A rule that only runs on someone's laptop is a
suggestion.

## Retro-fitting types during a migration

Assign the type column in bulk from title patterns first — anything starting
with a verb is almost always a task, anything with "API" or "options" in the
title is usually reference — then correct by hand. Expect a steady supply of
mixed-type pages: a concept with three steps buried in it, or a reference
table with a tutorial wrapped around it. Splitting those is genuine rewriting
work and belongs in the `rewrite` disposition in your inventory, not in
`keep`.

Once types are settled, they determine how the sidebar is grouped, which is
the subject of [navigation models](./navigation-models.md).
