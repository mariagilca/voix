---
id: versioning-strategies
title: Versioning strategies
description: When to version documentation, which model to use - single, snapshot, or branch per release - and what each one costs to maintain over time.
sidebar_position: 4
keywords:
  - documentation versioning
  - versioned docs
  - Docusaurus versioning
  - API version documentation
  - maintaining multiple doc versions
---

# Versioning strategies

Versioned documentation is the most expensive structural decision in a
migration, and the one most often taken by default. Every version you publish
is a copy of the corpus that someone has to patch when a correction lands.
Decide it consciously, and prefer the cheapest model that tells the truth.

## Do we need versioned documentation?

You need versioned documentation when readers are running software you no
longer ship and cannot upgrade on their own schedule. That is the whole test.
Self-hosted products, SDKs, CLIs and public APIs with deprecation windows
qualify. A continuously deployed SaaS with one live version does not, no matter
how much the release process feels like versions.

Ask three questions in order:

1. **Can a reader be on an old version today?** If everyone is always on the
   current release, stop here. You do not need versions; you need good release
   notes and change annotations.
2. **Does the old version behave differently in a way that breaks a documented
   procedure?** Cosmetic differences do not justify a copy of the corpus. A
   changed default, a removed flag or a moved endpoint does.
3. **Will you actually maintain the old version's pages?** A published version
   nobody patches is worse than no version, because it looks authoritative and
   is quietly wrong.

If the answer to any of these is no, use one of the cheaper models below.

## The five models, cheapest first

| Model | What it is | Maintenance cost | Use when |
| --- | --- | --- | --- |
| Single version | One live set, no history | Lowest | Continuous delivery, one live release |
| Inline annotation | One set, with per-feature version notes | Low | Small number of behavioural differences |
| Snapshot on major | Frozen copies of majors only | Medium | Semantic versioning, slow major cadence |
| Version per minor | A copy per released minor | High | Regulated or self-hosted with long support windows |
| Branch per release | Docs versioned with the code branch | High, but engineering-owned | Docs live in the product repository |

Inline annotation is underused and solves more cases than people expect. One
sentence in the page — "Available from 4.2. On 4.1 and earlier, use the
`--legacy-auth` flag" — keeps a single source of truth and costs nothing to
maintain. It stops working when the differences are structural rather than
local, at which point snapshots are the answer.

Snapshot on major is the safe default when you do need versions: freeze at each
major, maintain the current version plus one previous, and archive everything
older behind a banner that says it is unmaintained. Every additional maintained
version multiplies the cost of every correction, so add a third only when a
reader who cannot upgrade needs it.

## Implementing snapshots in Docusaurus 3

Cutting a version copies the current docs into a frozen directory:

```bash
npm run docusaurus docs:version 2.0
```

That command writes three things:

```text
versioned_docs/version-2.0/        # a full copy of docs/ at this moment
versioned_sidebars/version-2.0-sidebars.json
versions.json                      # the ordered list of versions
```

From then on, `docs/` is the in-progress version and the snapshot is edited
separately. Configure how they are presented:

```js
docs: {
  sidebarPath: './sidebars.js',
  lastVersion: '2.0',
  includeCurrentVersion: true,
  versions: {
    current: {
      label: '2.1 (unreleased)',
      path: 'next',
      banner: 'unreleased',
    },
    '2.0': {
      label: '2.0',
      path: '',
    },
    '1.4': {
      label: '1.4',
      banner: 'unmaintained',
    },
  },
},
```

The details that matter in production:

- `lastVersion` decides which version is served at the bare `/docs/` path. It
  should be the current stable release, not the unreleased one, or every search
  result will land readers on documentation for software they cannot download.
- `path: ''` on the stable version keeps its URLs unprefixed, so
  `/docs/webhooks/subscribe/` stays valid across the whole life of the 2.x
  line. Versioned URLs for older releases carry their prefix.
- `banner` renders the standard warning strip. Set `unmaintained` on anything
  you have stopped patching, and mean it.
- Build time and output size scale with the number of published versions. Use
  `onlyIncludeVersions` in preview and local builds to keep the loop fast:

```js
onlyIncludeVersions: process.env.NODE_ENV === 'development'
  ? ['current', '2.0']
  : undefined,
```

For a multi-instance setup, each instance versions independently, and the
command takes the instance id:

```bash
npm run docusaurus docs:version:api 2026-03-01
```

Date-based versions suit APIs with dated release channels; semantic versions
suit shipped software. Match whatever the product already tells customers.

## Rules that keep versioning from eating you

**Version the smallest thing.** If only the API reference has versions, only
the API reference should be a versioned instance. Copying the conceptual guides
alongside it triples the corpus for no reader benefit. This is the strongest
argument for the multi-instance split described in
[navigation models](./navigation-models.md).

**Fix forward, then backport deliberately.** Corrections land on current and
are cherry-picked to maintained versions only. Write the backport rule into
[review gates](../operations/review-gates.md) so it is a checkbox, not a habit.

**Archive loudly.** An unmaintained version keeps its URLs, keeps its banner,
and is excluded from search indexing and from the sitemap. Silent removal
breaks inbound links; silent retention misleads readers.

**Never version during a migration.** Migrate the current version only, cut the
first snapshot after launch, and be honest that older versions stay on the old
platform until they age out. Migrating history multiplies the conversion work
by the number of versions and buys almost nothing — readers on a two-year-old
release are not comparing your platforms.

Once the versioning model is settled, the structure is complete and the actual
content movement can start:
[converting content to Markdown](../migration/converting-to-markdown.md).
