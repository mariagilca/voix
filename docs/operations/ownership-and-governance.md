---
id: ownership-and-governance
title: Ownership and governance
description: Assign an owner to every documentation area, set freshness expectations, define how content is archived, and measure whether the docs still work.
sidebar_position: 4
keywords:
  - documentation governance
  - docs ownership model
  - content freshness review
  - documentation RACI
  - deprecating documentation
---

# Ownership and governance

Documentation decays at the speed the product changes, and nothing in a
migration slows that down. A new platform buys a stretch of good months; a
governance model is what you have afterwards. This is the section that gets
dropped when a migration runs late, and skipping it is how a team ends up
migrating a second time.

Governance here means four concrete things: every page has a named owner, every
area has a review rhythm, there is a defined way for content to die, and
somebody looks at the numbers.

## Who should own documentation?

The team that owns the product area owns its documentation, and a small central
group owns the platform, the standards and the review of last resort.
Centralising the writing does not scale past a few products; decentralising it
entirely produces twelve dialects and no navigation. The split that works is
ownership by area, standards by centre.

| Responsibility | Product team | Docs owner or central group |
| --- | --- | --- |
| Accuracy of their pages | Accountable | Consults |
| Writing new pages for their features | Responsible | Reviews |
| Information architecture and navigation | Consulted | Accountable |
| Style, templates, vocabulary | Informed | Accountable |
| Platform, pipeline, redirects | Informed | Accountable |
| Deciding a page should be archived | Consulted | Accountable |
| Review of every docs pull request | Consulted | Responsible |

Make ownership machine-readable rather than a page in a wiki. Two places, kept
in agreement:

```markdown
---
id: verify-signatures
title: Verify webhook signatures
owner: platform-team
review_by: 2026-09-30
---
```

```text
# .github/CODEOWNERS
/docs/webhooks/    @acme/docs @acme/platform
```

The frontmatter `owner` field lets you generate a report — pages by owner,
pages with no owner, pages past their review date — with one script. An
ownership model you cannot query is an ownership model nobody honours.

## Freshness without a fantasy

Nobody reviews four hundred pages quarterly. Do not write a policy that says
they will. Tier the corpus by consequence instead, and set an interval you can
actually meet:

| Tier | Which pages | Review interval | Trigger |
| --- | --- | --- | --- |
| Critical | Top 20 by traffic, anything with a security or billing consequence | Quarterly | Also on every release affecting the area |
| Standard | Everything else that is current | Annually | On product change |
| Reference | Generated from a spec | Never manually | Regenerated on each release |
| Frozen | Archived versions | Never | Banner says it is unmaintained |

The trigger column carries more weight than the interval. A calendar review
finds documentation that drifted; a change-triggered review prevents the drift.
The most effective single rule is that a change to a product surface requires a
docs change or an explicit "no docs impact" statement in the same pull request
— it costs the engineer ten seconds and catches most decay at the source.

Generate the calendar reviews rather than remembering them:

```bash
# pages past their review date
grep -rl '^review_by:' --include='*.md' docs/ \
  | xargs awk -v today="$(date +%F)" '
      /^review_by:/ { if ($2 < today) print FILENAME " overdue since " $2 }
    '
```

Turn that into a weekly job that opens one issue per owning team, batching
their overdue pages. One issue per team per week gets acted on; one per page
gets muted.

## How content dies

Documentation without a deletion path grows until search is useless. Define the
lifecycle explicitly, and make each transition somebody's decision rather than
an accident:

1. **Deprecate.** The feature is going away. The page stays, gains a dated
   banner naming the replacement, and drops out of the primary navigation.
2. **Archive.** The feature is gone or the version is unmaintained. The page is
   removed from search indexing and the sitemap, keeps its URL, and carries an
   unmaintained banner.
3. **Redirect and remove.** The content has a successor page. Remove it, and
   add the row to the redirect map so the URL still works. Never delete a URL
   outright — see [redirect mapping](../migration/redirect-mapping.md).

Two anti-patterns to name in the policy so people can point at them. Do not
keep a page "just in case" without an owner; that is how a corpus becomes
unsearchable. And do not delete a page because it has no traffic, without
checking whether it has inbound links or is pasted by support — the reasoning
is in [building a content inventory](../planning/content-inventory.md).

## Measure whether it is working

Pick a small number of measures, define them before you look, and review them
quarterly with the owners. Suggested set, all of which you can gather from
tools you already have:

- **Coverage.** Share of shipped features with documentation at release. The
  clearest signal of whether docs are inside the development process or beside
  it.
- **Freshness.** Share of critical-tier pages reviewed within their interval,
  and the age distribution of the corpus.
- **Contribution breadth.** Number of distinct authors per quarter. A falling
  number means the process is getting harder, whatever it looks like from
  inside.
- **Time from merge to published.** Should be minutes. If it is not, the
  pipeline in [CI/CD publishing](./ci-cd-publishing.md) has regressed.
- **Search queries with no useful result.** The most direct list of missing
  pages you will ever get, and it is free.
- **Support tickets whose answer exists in documentation.** Ask support to tag
  them. This is the number that gets documentation funded.

Report them as a trend, not a target. Turning any one of them into an
individual objective produces gaming rather than improvement — coverage in
particular can be met with empty stub pages.

## Handover is the deliverable

If the migration was run by a project team or an outside studio, governance is
the part that must be handed over deliberately: named owners accepted in
writing, the review job running, the standards documented, and at least two
people who have each published a change end to end without help. A pipeline
somebody else built and nobody else has run is not a handover. What that
handover contains in practice is described in
[our services](/services/), and the standards side of it is
[authoring standards](./authoring-standards.md).
