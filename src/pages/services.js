import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {
  Button,
  Card,
  CallToAction,
  DescriptionList,
  Grid,
  List,
  PageHeader,
  PageRail,
  Section,
  StructuredData,
} from '@site/src/components/site';
import styles from './services.module.css';

const SITE = 'https://www.voix.md';
const ORG = `${SITE}/#organization`;
const EMAIL = 'mariag@voix.md';

/* ------------------------------------------------------------ page index -- */

const RAIL = [
  {id: 'consolidation', label: 'Consolidation'},
  {id: 'platform-implementation', label: 'Platform'},
  {id: 'enablement', label: 'Enablement'},
  {id: 'ci-cd-delivery', label: 'CI/CD delivery'},
  {id: 'delivery-scope', label: 'Scope'},
  {id: 'out-of-scope', label: 'Out of scope'},
  {id: 'portfolio-creation', label: 'Portfolio'},
  {id: 'delivery-timing', label: 'Timing'},
  {id: 'contact', label: 'Start'},
];

/* ----------------------------------------------------- the four services -- */

const SERVICES = [
  {
    id: 'consolidation',
    eyebrow: 'Service 01',
    title: 'Consolidation and information architecture',
    lead: 'Collect scattered documentation and data into one searchable, maintainable structure.',
    body: (
      <>
        <p>
          Most documentation does not live in one place. It lives in a help
          centre, a wiki, a shared drive, a support macro library, a handful of
          README files and a folder of PDFs somebody exported two years ago.
          Each of those surfaces has its own search, its own owner and its own
          idea of what is current. Readers stop guessing which one is right and
          open a ticket instead.
        </p>
        <p>
          Consolidation starts with an audit. voix inventories every source and
          records what each page is for, who last touched it, and whether
          anything still links to it. That inventory becomes a migration map:
          pages to move as they are, pages to merge, pages to rewrite, and pages
          to retire outright. Retiring is part of the work. A smaller set of
          pages your team trusts is cheaper to maintain than a large set nobody
          believes.
        </p>
        <p>
          The information architecture is then designed around the questions
          readers actually arrive with, rather than around your internal org
          chart. Sections are named in the reader&rsquo;s words. Depth is capped
          so nothing important sits four clicks down. Every page gets a place in
          the tree and a named owner, and the tree is shaped to absorb the next
          two years of product changes without a second reorganisation.
        </p>
        <p>
          You see the map before anything moves.{' '}
          <Link to="/process/">The process page</Link> shows where the audit sits
          in an engagement: nothing is merged, moved or deleted on a guess, and
          the structure is approved in writing before the build starts.
        </p>
      </>
    ),
    gets: [
      'An inventory of every documentation source, with owner and last-touched date',
      'A migration map that decides move, merge, rewrite or retire page by page',
      'A navigation tree named in your readers’ language, not your org chart’s',
      'A redirect plan covering every URL that changes',
      'A written ownership model, so each section has a named maintainer',
    ],
    audience:
      'Teams whose documentation is spread across a help centre, a wiki, a drive and a repository, and who cannot answer “where does this page belong?” without calling a meeting.',
  },
  {
    id: 'platform-implementation',
    eyebrow: 'Service 02',
    title: 'Modern platform implementation',
    lead: 'Implement a documentation platform your company owns, with reusable templates, navigation standards and a quality baseline.',
    body: (
      <>
        <p>
          The platform is Docusaurus: content in Markdown, configuration in
          code, all of it in a Git repository your company controls. There is no
          seat licence to renew, no editor to log into, and no export request to
          negotiate if you change your mind later. The stack is the same one
          this site runs on.
        </p>
        <p>
          Implementation covers the parts that decide whether a documentation
          site stays usable after launch: sidebar and navigation structure,
          search configuration, versioning if your product ships versions, and
          the templates authors start from. Templates matter more than they
          sound. A concept page, a how-to, a reference entry and a
          troubleshooting page each have a fixed shape, so a writer begins with
          a structure instead of a blank file and a reviewer knows what
          &ldquo;finished&rdquo; means.
        </p>
        <p>
          The quality baseline is written down and enforced by the build rather
          than by memory: heading order, required front matter, link targets,
          code block languages, image alt text. Anything a machine can check,
          the build checks, which keeps review conversations about content
          instead of formatting.
        </p>
        <p>
          The look is yours. Typography, colour and layout follow your brand,
          while the underlying stack stays completely standard, so any developer
          who has worked on a React project can maintain it.{' '}
          <Link to="/case-studies/">The case studies</Link> show what the
          before-and-after of an implementation looks like.
        </p>
      </>
    ),
    gets: [
      'A Docusaurus site in your Git account, with full commit history',
      'Page templates for concepts, how-tos, reference and troubleshooting',
      'Sidebar, navigation and search configured against the new architecture',
      'Versioning and a release workflow, if your product ships versions',
      'A written quality baseline that the build enforces on every change',
      'A brand-matched theme built entirely on standard open-source tooling',
    ],
    audience:
      'Companies paying for a proprietary documentation platform they cannot leave, and teams who want the docs to live beside the code rather than in a vendor account.',
  },
  {
    id: 'enablement',
    eyebrow: 'Service 03',
    title: 'Employee onboarding and enablement',
    lead: 'Train the people who will write, review and publish, so documentation keeps moving after handoff.',
    body: (
      <>
        <p>
          A migration only one person understands is a new dependency, not a
          fix. Enablement is the part of the engagement that takes voix out of
          the critical path and puts your team in it.
        </p>
        <p>
          Training runs against your real repository, not a demo. Authors learn
          the branch-and-pull-request loop, how to preview a change before it
          ships, which template to start from, and what the review checklist
          asks for. Reviewers learn what to accept, what to send back, and how
          to decline a page that duplicates one that already exists. Whoever
          owns the repository learns how the build works, where publishing is
          configured, and how to add a section without breaking navigation.
        </p>
        <p>
          Sessions are recorded, and the material stays in the repository as a
          contributor guide that is versioned alongside the content. The fifth
          writer who joins reads the same instructions as the first, and new
          joiners onboard from the documentation about the documentation instead
          of from somebody&rsquo;s memory.
        </p>
        <p>
          Enablement also settles governance: who reviews what, how often each
          area is checked for drift, and what happens when a page loses its
          owner. Most documentation decay is an ownership problem long before it
          is a writing problem, so the ownership model is written down and
          handed over with everything else.
        </p>
      </>
    ),
    gets: [
      'Live training for three audiences: authors, reviewers and repository owners',
      'A contributor guide committed to the repository and versioned with it',
      'A review checklist that turns “ready to merge” into a shared definition',
      'A governance model with named owners, a review cadence and a rule for orphan pages',
      'A handoff playbook you can give to the next person who joins',
    ],
    audience:
      'Teams who have been through a documentation project before and watched it go stale because the knowledge left with the consultant.',
  },
  {
    id: 'ci-cd-delivery',
    eyebrow: 'Service 04',
    title: 'CI/CD documentation delivery',
    lead: 'Reviewed, tested and consistently published updates, so a documentation change carries the same low risk as a code change.',
    body: (
      <>
        <p>
          Once documentation lives in Git, it can be delivered like the rest of
          the product. Every change arrives as a pull request. Every pull
          request builds a preview a reviewer can read in a browser. Nothing
          reaches production without a green build behind it.
        </p>
        <p>
          The pipeline checks the things people skip when they are in a hurry:
          broken internal links, dead external links, missing front matter,
          files that are not reachable from the sidebar, images without alt
          text, and code blocks that do not declare a language. Redirects are
          validated too, so the URLs you gave to search engines and support
          agents keep resolving after a restructure.
        </p>
        <p>
          Publishing happens automatically on merge. There is no release ritual,
          no copy-paste into a vendor editor, and no single person who is the
          only route to production. A site publishes in minutes once the
          pipeline is wired up, and that changes what a team is willing to fix:
          a typo stops being a ticket and becomes a two-minute pull request.
        </p>
        <p>
          The pipeline is plain configuration committed to your repository and
          running on your CI provider. You can read it, change it and take it
          with you. Rolling back is a revert, because every published state of
          the site is a commit.
        </p>
      </>
    ),
    gets: [
      'A build preview on every pull request, before anything is published',
      'Automated link, structure and front matter checks on each build',
      'Redirect validation, so old URLs keep resolving after a restructure',
      'Automatic publishing when a change merges to the main branch',
      'CI configuration committed to your repository, on your own provider',
      'Rollback by revert, because every published state is a commit',
    ],
    audience:
      'Platform, support and product marketing teams whose documentation updates are currently queued behind one person and a manual publish step.',
  },
];

/* -------------------------------------------------------- delivery scope -- */

const SCOPE_GROUPS = [
  {
    index: '01',
    title: 'Audit and architecture',
    items: [
      'Content audit and migration map',
      'Information architecture redesign',
      'Search and navigation optimisation',
    ],
  },
  {
    index: '02',
    title: 'Build',
    items: [
      'Docusaurus implementation',
      'Authoring standards and templates',
      'Versioning and release workflow',
    ],
  },
  {
    index: '03',
    title: 'Delivery pipeline',
    items: ['CI/CD publishing setup', 'QA, redirects and link checks'],
  },
  {
    index: '04',
    title: 'Handoff',
    items: [
      'Contributor onboarding and training',
      'Governance and ownership model',
      'Launch support and handoff playbook',
      'Post-launch iteration plan',
    ],
  },
];

/* --------------------------------------------------------- what we don't -- */

const BOUNDARIES = [
  {
    term: 'Product copy',
    description:
      'voix does not write your feature copy, launch messaging or sales pages. The engagement covers documentation: how the product works and how somebody uses it.',
  },
  {
    term: 'Owning your docs',
    description:
      'voix does not stay the owner of your documentation after handoff. The repository, the pipeline and the content are yours, and the enablement work exists precisely so your team runs them without us.',
  },
  {
    term: 'Retainers',
    description:
      'There is no monthly retainer. The only ongoing commitment on offer is the optional five interventions package for post-launch fixes and minor updates. Anything beyond that is scoped as new work.',
  },
  {
    term: 'Translation',
    description:
      'voix does not translate content or run a localisation programme. The platform can be configured for multiple locales, but producing and maintaining translated content is not part of the scope.',
  },
  {
    term: 'Custom CMS',
    description:
      'voix does not build a bespoke content management system. The entire argument here is standard open-source tooling you can hire for. A custom CMS is the lock-in problem again, wearing a different logo.',
  },
];

/* ---------------------------------------------------------------- schema -- */

/**
 * WebPage, ItemList and Service only. No FAQPage node: /faq/ is the single
 * page on this site that publishes FAQPage entities, so the same question is
 * never marked up here with a different answer.
 */
const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE}/services/#webpage`,
      url: `${SITE}/services/`,
      name: 'Documentation migration services',
      description:
        'The four services behind a voix documentation migration: consolidation and information architecture, platform implementation, team enablement, and CI/CD delivery.',
      isPartOf: {'@id': `${SITE}/#website`},
      about: {'@id': ORG},
      inLanguage: 'en',
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE}/services/#core-services`,
      name: 'voix documentation migration services',
      description:
        'The four core services voix delivers in a documentation migration engagement.',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: 4,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Service',
            '@id': `${SITE}/services/#consolidation`,
            name: 'Consolidation and information architecture',
            description:
              'Collect scattered documentation and data into one searchable, maintainable structure, with an audit, a migration map and a navigation model.',
            serviceType: 'Information architecture',
            url: `${SITE}/services/#consolidation`,
            provider: {'@id': ORG},
            areaServed: {'@type': 'Place', name: 'Worldwide, remote'},
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'Service',
            '@id': `${SITE}/services/#platform-implementation`,
            name: 'Modern platform implementation',
            description:
              'Implement a documentation platform the company owns, with reusable templates, navigation standards and a quality baseline enforced by the build.',
            serviceType: 'Documentation platform implementation',
            url: `${SITE}/services/#platform-implementation`,
            provider: {'@id': ORG},
            areaServed: {'@type': 'Place', name: 'Worldwide, remote'},
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'Service',
            '@id': `${SITE}/services/#enablement`,
            name: 'Employee onboarding and enablement',
            description:
              'Train employees on authoring, reviewing and publishing so teams ship documentation independently after handoff.',
            serviceType: 'Training and enablement',
            url: `${SITE}/services/#enablement`,
            provider: {'@id': ORG},
            areaServed: {'@type': 'Place', name: 'Worldwide, remote'},
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'Service',
            '@id': `${SITE}/services/#ci-cd-delivery`,
            name: 'CI/CD documentation delivery',
            description:
              'Reviewed, tested and consistently published documentation updates, with previews on every pull request and automatic publishing on merge.',
            serviceType: 'CI/CD publishing pipeline',
            url: `${SITE}/services/#ci-cd-delivery`,
            provider: {'@id': ORG},
            areaServed: {'@type': 'Place', name: 'Worldwide, remote'},
          },
        },
      ],
    },
    {
      '@type': 'Service',
      '@id': `${SITE}/services/#portfolio-creation`,
      name: 'Portfolio creation',
      description:
        'A one-time portfolio build on the same open-source stack: structure and design direction, copy refinement, and deployment to GitHub Pages or your own domain.',
      serviceType: 'Portfolio site build',
      url: `${SITE}/services/#portfolio-creation`,
      provider: {'@id': ORG},
      areaServed: {'@type': 'Place', name: 'Worldwide, remote'},
      offers: {
        '@type': 'Offer',
        price: '500',
        priceCurrency: 'EUR',
        description: 'One-time build fee.',
      },
    },
  ],
};

/* ------------------------------------------------------------------ page -- */

export default function ServicesPage() {
  return (
    <Layout
      title="Services"
      description="The four services behind a voix documentation migration: consolidation, platform implementation, team enablement and CI/CD publishing.">
      <StructuredData schema={SCHEMA} />

      {/* <main> opens before the h1 and closes after the CTA: Docusaurus's
          skip link targets main:first-of-type, so anything above it is
          unreachable by that link. */}
      <main>
      <PageHeader
        eyebrow="Services"
        title="Documentation migration services"
        lead="voix moves product documentation off locked proprietary platforms onto an open-source stack your company owns. Four services do that work, and most engagements use all four. Each one can also be scoped on its own."
        facts={[
          {
            label: 'Engagement',
            text: 'A one-time project fee, scoped by documentation volume, complexity and implementation requirements.',
          },
          {
            label: 'Delivery',
            text: 'Standard delivery within two business weeks of the deposit and the required materials.',
          },
          {
            label: 'Ownership',
            text: 'On full payment the final deliverables are yours, in your own Git account.',
          },
          {
            label: 'No lock-in',
            text: 'No subscription, no per-seat fee and no recurring platform licence.',
          },
        ]}
      />

      <PageRail sections={RAIL} />

        {SERVICES.map((service, i) => (
          <Section
            key={service.id}
            id={service.id}
            eyebrow={service.eyebrow}
            title={service.title}
            lead={service.lead}
            ruled={i > 0}>
            <div className={styles.serviceGrid}>
              <div className={styles.prose}>{service.body}</div>
              <Card title="What you get">
                <List items={service.gets} />
              </Card>
            </div>
            <div className={styles.audience}>
              <DescriptionList
                rows={[
                  {term: 'Who this is for', description: service.audience},
                ]}
              />
            </div>
          </Section>
        ))}

        <Section
          id="delivery-scope"
          tone="paper"
          eyebrow="Delivery scope"
          title="What a migration engagement covers"
          lead="Twelve pieces of work, grouped by the phase they land in. A proposal assembles a scope from these; it does not always include all twelve.">
          <Grid cols={2}>
            {SCOPE_GROUPS.map((group) => (
              <Card key={group.title} index={group.index} title={group.title}>
                <List items={group.items} />
              </Card>
            ))}
          </Grid>
          <p className={styles.crossRefNote}>
            Scope, timeline and fees are fixed in a written proposal or
            statement of work before anything starts.{' '}
            <Link to="/pricing/">Pricing</Link> explains what a quote is based
            on, and <Link to="/process/">process</Link> sets out the order these
            phases run in and who does what in each one.
          </p>
        </Section>

        <Section
          id="out-of-scope"
          eyebrow="Boundaries"
          title="What voix does not do"
          lead="A short list, published here so nobody discovers a boundary halfway through a project.">
          <DescriptionList rows={BOUNDARIES} />
          <p className={styles.crossRefNote}>
            None of this is refused on principle. Out-of-scope requests are
            possible; under the{' '}
            <Link to="/terms/">terms and conditions</Link> they need written
            approval and a revised scope before they enter the plan, so the
            delivery date you were given stays honest.
          </p>
        </Section>

        <Section
          id="portfolio-creation"
          ruled
          narrow
          eyebrow="Additional service"
          title="Portfolio creation"
          lead="A separate, smaller service that sits outside the migration practice: a one-time portfolio build for 500 EUR.">
          <div className={styles.prose}>
            <p>
              This is not a cut-down migration and it is not a way to buy one
              cheaply. It exists because people ask for it. voix builds a
              personal or studio portfolio on the same open-source stack the
              rest of this page describes: content in Markdown, the site in a
              repository you own, no licence to renew.
            </p>
          </div>
          <div className={styles.portfolioList}>
            <List
              items={[
                'Custom structure and design direction',
                'Copy refinement for clarity and positioning',
                'Deployment on GitHub Pages or your own domain',
                'A one-time build fee of 500 EUR',
              ]}
            />
          </div>
          <p className={styles.crossRefNote}>
            If you came here about product documentation, this is not the thing
            to read. Start with the four services above, then{' '}
            <Link to="/pricing/">pricing</Link>.
          </p>
        </Section>

        {/* The full timing answer lives on /process/. This section states the
            one delivery fact a services reader needs and hands off, so the two
            pages do not publish competing answers to the same question. */}
        <Section
          id="delivery-timing"
          tone="paper"
          narrow
          eyebrow="Timing"
          title="When does delivery start?"
          lead="Standard delivery is within two business weeks of receiving the deposit and the required materials.">
          <div className={styles.prose}>
            <p>
              The clock starts on the deposit and the materials, not on the
              first conversation.{' '}
              <Link to="/process/#how-long-does-a-documentation-migration-take">
                How long a documentation migration takes
              </Link>{' '}
              gives the full answer: what the two weeks cover, what is scoped
              separately, and what moves the date.
            </p>
          </div>
        </Section>

      <CallToAction
        title="Tell us what you are trying to leave"
        lead="Send the platform you are on, roughly how many pages you have, and where they live now. You get back a scoped proposal with a fixed fee and a delivery date.">
        <Button href={`mailto:${EMAIL}`}>Start a migration</Button>
        <Button to="/pricing/" variant="secondary">
          See how quoting works
        </Button>
        <Button to="/case-studies/" variant="quiet">
          Read the case studies
        </Button>
      </CallToAction>
      </main>
    </Layout>
  );
}
