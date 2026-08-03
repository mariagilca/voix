---
id: converting-to-markdown
title: Converting content to Markdown
description: A repeatable pipeline for turning exported HTML into clean Markdown - pandoc settings, post-processing passes, and the MDX pitfalls that break builds.
sidebar_position: 1
keywords:
  - convert HTML to Markdown
  - pandoc html to markdown
  - docs migration conversion
  - MDX escaping errors
  - turndown converter
---

# Converting content to Markdown

Conversion is the part of a migration that looks hardest and is actually the
most tractable, because it is deterministic. Build a pipeline, run it on the
whole corpus, throw the output away, fix the pipeline, run it again. Never hand
edit converted output before the pipeline is final — you will lose the edits on
the next run, and you will do the next run.

## What is the fastest reliable way to convert HTML to Markdown?

Run pandoc over the exported HTML with GitHub-flavoured Markdown as the target,
then apply your own post-processing passes for the things pandoc cannot know
about. Pandoc handles the structural translation correctly and predictably;
everything platform-specific is your job.

```bash
pandoc \
  --from=html \
  --to=gfm \
  --wrap=none \
  --markdown-headings=atx \
  --strip-comments \
  input.html -o output.md
```

Each flag matters. `--wrap=none` keeps one paragraph on one line, which makes
later diffs readable — semantic line breaks are a nice idea that fights every
automated rewrite you are about to do. `--markdown-headings=atx` produces `#`
headings instead of underlines. `--strip-comments` removes the editor droppings
that proprietary platforms leave behind.

Over a directory:

```bash
find ./export -name '*.html' -print0 \
  | while IFS= read -r -d '' f; do
      out="docs/${f#./export/}"
      mkdir -p "$(dirname "$out")"
      pandoc --from=html --to=gfm --wrap=none --markdown-headings=atx \
             "$f" -o "${out%.html}.md"
    done
```

If the export is not HTML but a proprietary JSON block model, you are writing a
small converter instead. That is fine and usually a day's work: walk the block
tree, map each block type to a Markdown emitter, and fail loudly on unknown
block types rather than dropping them silently. A conversion that reports "17
unhandled block types across 43 pages" is far more useful than one that
produces plausible-looking output with holes in it.

## The post-processing passes

Pandoc output is correct but not idiomatic. Six passes, run in order, each
independently re-runnable:

1. **Strip the chrome.** Exports include the platform's navigation, breadcrumb,
   footer and "was this helpful" widget on every page. Cut them before pandoc,
   at the HTML stage, with a selector-based extraction of the article body
   only. Doing it after conversion is far harder.
2. **Recover code block languages.** Vendor exports usually lose the language
   hint, and every code fence arrives bare. Infer it: a block containing
   `curl -X` is `bash`, one starting with `{` and quoted keys is `json`, one
   with `def ` is `python`. Get the bulk of them right automatically and fix
   the rest by review. Untagged code blocks are the most visible quality defect
   in a migrated site.
3. **Map admonitions.** Vendor callouts become the target syntax. In Docusaurus
   3 that is a directive:

   ```markdown
   :::warning Rotating a key invalidates the old one

   Requests using the previous key start failing immediately.

   :::
   ```

4. **Normalise links.** Absolute vendor URLs pointing at other documentation
   pages become relative Markdown links; everything else stays absolute. This
   pass produces the raw material for the
   [redirect map](./redirect-mapping.md), so log every rewrite.
5. **Rewrite image paths** to their new location, covered in
   [images and attachments](./images-and-attachments.md).
6. **Inject frontmatter** from the inventory CSV, so the metadata contract from
   [content types and templates](../architecture/content-types-and-templates.md)
   is satisfied on the first commit rather than backfilled.

A frontmatter injector is about thirty lines and pays for itself immediately:

```js
// scripts/inject-frontmatter.mjs
import {readFile, writeFile} from 'node:fs/promises';
import {parse} from 'csv-parse/sync';

const rows = parse(await readFile('inventory.csv'), {columns: true});

for (const row of rows) {
  if (row.disposition === 'archive') continue;
  const body = await readFile(row.new_file, 'utf8');
  const fm = [
    '---',
    `id: ${row.id}`,
    `title: ${JSON.stringify(row.title)}`,
    `description: ${JSON.stringify(row.description)}`,
    `owner: ${row.owner || 'unassigned'}`,
    '---',
    '',
  ].join('\n');
  await writeFile(row.new_file, fm + body.replace(/^#\s.*\n/, ''));
}
```

Note the last line: it removes the duplicated h1 that pandoc produced from the
page title, because the frontmatter `title` now supplies it. Two h1 elements on
a page is the most common defect in converted documentation.

## The MDX traps that break the build

Docusaurus 3 parses `.md` files as MDX by default, which means the file is
JavaScript-adjacent and some ordinary prose characters are now syntax. These
break the build, loudly, which is better than the alternative but is still a
day of your life if you meet them one file at a time.

| Pattern in source | What MDX does | Fix in the pipeline |
| --- | --- | --- |
| `{placeholder}` in prose | Parsed as a JS expression | Wrap in backticks or escape the brace |
| `<Item>` or `<user@example.com>` | Parsed as a JSX tag | Wrap in backticks |
| Raw HTML with unclosed tags | Fails JSX parsing | Close it or convert it |
| `style="..."` on retained HTML | Not a valid JSX attribute | Strip inline styles entirely |
| Indented HTML blocks | Silently becomes a code block | Dedent during cleanup |

Two escape hatches. For pages that are genuinely full of braces and angle
brackets, set the format per file in frontmatter:

```markdown
---
title: Template syntax reference
format: md
---
```

Or configure the whole site to treat `.md` as CommonMark and reserve MDX for
`.mdx`:

```js
markdown: {
  format: 'detect',
},
```

`detect` is the right setting for a migration: converted content is plain
Markdown and should be parsed as such, while the handful of pages that need
React components get the `.mdx` extension and opt in deliberately.

## Verify the conversion, do not eyeball it

Run these checks on every pipeline run, before any human reads a page:

```bash
# every file has frontmatter with a title
grep -rL '^title:' --include='*.md' docs/

# code fences that open without a language tag
find docs -name '*.md' -exec awk '
  /^`{3}/ { open = !open; if (open && length($0) == 3) print FILENAME ":" FNR }
' {} +

# no vendor domain left in links
grep -rn 'docs\.oldplatform\.example' docs/

# no leftover HTML tags
grep -rnE '<(div|span|table|br|img)\b' docs/
```

Each of these should return nothing at the end of the run. Track the counts
across runs; a pipeline is finished when all four have been zero for two
consecutive full-corpus runs. Then, and only then, start
[QA and link checking](./qa-and-link-checking.md) with human reviewers.
