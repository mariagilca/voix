---
id: authoring-standards
title: Authoring standards
description: A practical house style for product documentation - voice, structure, code samples and links - plus the tooling that makes it the easy path.
sidebar_position: 3
keywords:
  - documentation style guide
  - technical writing standards
  - docs house style
  - writing code samples
  - documentation voice and tone
---

# Authoring standards

An authoring standard exists so that pages written by twelve people read as if
written by one, and so that a new contributor can produce an acceptable page
without asking anyone. It is not a manuscript style guide. Keep it to a page or
two of rules that change what people type, and put everything else in templates
and linters where it costs nobody any attention.

## What belongs in a documentation style guide?

The rules that recur across every page and that reviewers would otherwise raise
by hand: voice, sentence construction, heading style, how to write steps, how
to write code samples, and how to write links. Anything a linter can enforce
belongs in the linter's config, not in prose that people have to remember.

The rules worth writing down, with the reasoning that makes them stick:

**Second person, present tense, active voice.** "Send the key in the
`Authorization` header", not "The key should be sent". The reader is doing
something; name them and name the action. Passive voice hides who acts, which
in documentation is exactly the information the reader needs.

**Sentence case for every heading.** Fewer decisions, and product names stay
visually distinct because they are the only capitalised words left.

**One idea per paragraph, three sentences or fewer.** Documentation is scanned
before it is read. Long paragraphs are skipped whole; short ones get read even
by skimmers.

**Lead with the answer.** The first sentence under a heading answers the
heading. Context, caveats and alternatives come after. This helps readers,
helps search snippets, and helps answer engines that quote the first sentence.

**Say "if" before "do".** Conditions go at the start of the sentence: "If you
are self-hosting, set `BASE_URL` before starting" — not the reverse. A reader
who is not self-hosting stops after four words.

**No hedging and no future tense.** "This will allow you to be able to
optionally configure" is six words of nothing. Say what it does, now.

**Never write "simply", "just", "easy" or "obviously".** They are the only
words in documentation that can make a reader feel stupid, and they add no
information. Ban them in the linter.

## Structure rules

- **Every page starts with a sentence that says what it is for**, before any
  heading. Not "Introduction" and not a restatement of the title.
- **A task page states prerequisites before step one** and ends with a
  verification the reader can observe.
- **Steps are numbered, one action per step**, in the imperative. If a step has
  two verbs, it is two steps.
- **Do not nest deeper than three heading levels.** A fourth level means the
  page is two pages.
- **Every page ends with where to go next**, and it is a real judgement about
  what the reader will want, not an automatic list of siblings.

## Code samples are content, not decoration

Code samples are the part of documentation readers copy, so they are the part
most likely to cause damage.

- **Always tag the language on the fence.** An untagged block loses
  highlighting and tells screen readers nothing.
- **Samples must be complete and runnable**, or explicitly marked as a
  fragment. A snippet missing its imports costs the reader more time than no
  snippet.
- **Use obviously fake placeholder values** in a consistent format, so nobody
  ever pastes a real one. `example.com`, `acme`, and keys shaped like
  `sk_test_REPLACE_ME`.
- **Show the expected output** when the reader needs to know whether it worked.
- **Never include a real credential, hostname or customer identifier**, and add
  a secret scanner to the pipeline so this rule is enforced rather than trusted.

```bash
# good: complete, tagged, obviously fake, shows what success looks like
curl -sS https://api.example.com/v1/webhooks \
  -H "Authorization: Bearer sk_test_REPLACE_ME" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://hooks.example.com/acme", "events": ["invoice.paid"]}'

# => {"id":"wh_01H...","status":"active"}
```

## Links, images and admonitions

Write link text that describes the destination: "see
[redirect mapping](../migration/redirect-mapping.md)", never "click
[here](../migration/redirect-mapping.md)". Link text is read out of context by
screen readers and lifted out of context by search engines.

Use relative Markdown paths for links between documentation pages so the build
validates them. Use absolute paths for links to the rest of the site.

Screenshots need a reason to exist. Take one when the UI is genuinely hard to
describe, not to illustrate a sentence that already worked. Every screenshot is
a maintenance liability that expires the next time the product is restyled, and
the rules for handling them are in
[images and attachments](../migration/images-and-attachments.md).

Use admonitions sparingly and consistently. A page with five warning boxes has
no warnings, only decoration:

```markdown
:::warning Rotating a key invalidates the old one immediately

Requests using the previous key start failing as soon as the new key is issued.
Deploy the new key before rotating.

:::
```

Agree what each type means — note for asides, tip for optional improvements,
warning for potential damage, danger for data loss — and write those definitions
into the standard.

## Make the standard the easy path

A standard nobody can follow accidentally will not be followed. Three
mechanisms, in order of effectiveness:

1. **Templates**, copied from `docs/_templates/`, which encode the structure
   rules so an author never starts from an empty file.
2. **Linters**, which enforce the mechanical rules on every pull request. Every
   rule in this page that can be checked should be a rule in
   [review gates](./review-gates.md) rather than something a reviewer types.
3. **Examples.** Nominate three existing pages as the reference implementation
   of concept, task and reference, and link them from the standard. People copy
   what is in front of them far more reliably than they follow instructions.

Train contributors once, briefly, on the tooling rather than the prose rules:
how to open a pull request, how to read the preview, how to interpret a failed
check. The writing rules are absorbed from templates and review; the toolchain
is the part that genuinely needs teaching. Who does that teaching, and who
keeps the standard current, is settled in
[ownership and governance](./ownership-and-governance.md).
