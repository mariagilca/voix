---
id: ci-cd-publishing
title: CI/CD publishing
description: Build and deploy documentation from Git with a pipeline anyone can run - a full workflow, preview deploys, caching and rollback.
sidebar_position: 1
keywords:
  - CI/CD documentation
  - GitHub Actions Docusaurus deploy
  - docs preview deploy
  - continuous deployment documentation
  - automated docs publishing
---

# CI/CD publishing

Once documentation lives in Git, publishing should be a consequence of merging,
not a task somebody performs. The goal is narrow and testable: a contributor
opens a pull request, sees their change rendered at a URL, gets it approved,
merges, and the change is live without anyone touching a deploy button.

Build the pipeline early — during the migration, not after it. It is how you
review converted content, and a pipeline retrofitted after launch is a pipeline
nobody trusts.

## What does a documentation CI/CD pipeline need to do?

Five things: install from a lockfile, build the site reproducibly, run the
quality checks, deploy the built output to a URL, and do the same for pull
requests at a temporary URL. Everything else is refinement.

A complete workflow for GitHub Pages, which you can read top to bottom:

```yaml
# .github/workflows/deploy-docs.yml
name: Deploy documentation

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          # Full history: last-updated timestamps are read from git log.
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build

      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Four details that are easy to get wrong:

- **`fetch-depth: 0`.** Docusaurus derives "last updated" from Git history. The
  default shallow checkout gives every page the same timestamp, which is worse
  than showing none.
- **`npm ci`, never `npm install`.** The lockfile is the reproducibility
  guarantee; `install` will happily resolve a new minor version of a
  transitive dependency and change your output.
- **`concurrency` without `cancel-in-progress`.** Cancelling a half-finished
  deploy leaves the site in an undefined state. Queue instead.
- **Least-privilege permissions**, declared at the workflow level rather than
  inherited.

The same shape works anywhere. On GitLab CI it is a `pages` job publishing the
`build` directory as an artifact; on a static host it is a build command and an
output directory configured in the host's dashboard. What matters is that the
build runs on a clean machine from a lockfile, so "works on my laptop" stops
being a category of problem.

## Preview deploys are the feature that changes behaviour

Reviewing prose as a diff is fine for a typo and useless for a restructured
page. A per-pull-request preview URL is what makes non-technical reviewers able
to participate, and it is the single highest-value thing in the pipeline.

Most static hosts provide previews automatically for pull requests. If yours
does not, build on the pull request and upload the output as an artifact, so a
reviewer can at least download and open it:

```yaml
# .github/workflows/pr-checks.yml
name: Documentation checks

on:
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npx lychee --offline --include-fragments 'build/**/*.html'
      - uses: actions/upload-artifact@v4
        with:
          name: docs-preview
          path: build
          retention-days: 7
```

Note that the build here is the link check as well, because
`onBrokenLinks: 'throw'` makes a broken internal link a build failure. The
`lychee` step adds anchor and asset verification on top. The full reasoning is
in [QA and link checking](../migration/qa-and-link-checking.md).

## Keep the build fast enough to be used

Contributors abandon a workflow that takes fifteen minutes to tell them about a
typo. Watch build duration as a real metric and act when it drifts past about
five minutes:

- Cache the dependency install with `cache: npm` in `setup-node`, which keys on
  the lockfile.
- Limit versioned docs in preview builds with `onlyIncludeVersions`, as
  described in
  [versioning strategies](../architecture/versioning-strategies.md).
- Split the workflow so the fast checks — lint, frontmatter validation,
  vocabulary — run in a separate job that fails in under a minute, rather than
  behind a full build.
- Do not run external link checking on pull requests. Schedule it nightly.

## Deploy, verify, and be able to go back

A deployment is not finished when the job goes green. Add a post-deploy step
that fetches the live site and asserts something true about it — the homepage
returns 200, a known page contains a known string, the sitemap parses:

```bash
set -euo pipefail
base="https://docs.example.com"

curl -fsS "$base/" > /dev/null
curl -fsS "$base/sitemap.xml" | grep -q '<urlset'
curl -fsS "$base/docs/webhooks/subscribe/" | grep -q 'Verify webhook signatures'
echo "smoke tests passed"
```

Rollback for a static site is redeploying the previous commit, which means your
rollback procedure is one revert and one pipeline run. Write the two commands
in the repository README and test them once, deliberately, before you need
them:

```bash
git revert --no-edit <bad-commit>
git push origin main
```

## What belongs in the pipeline, and what does not

Publishing automation is not a substitute for editorial judgement. The pipeline
should enforce everything objectively checkable — links, structure, metadata,
terminology — and refuse to enforce anything else, because a linter that
argues about wording gets switched off. The boundary between the two is drawn
in [review gates and quality checks](./review-gates.md), and the human side of
it is defined by
[ownership and governance](./ownership-and-governance.md).
