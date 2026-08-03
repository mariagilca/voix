/**
 * The homepage.
 *
 * The argument, the diff, and routes into everything below. The hero is the
 * only bespoke layout on the site: copy on the left, a real migration diff on
 * the right. Everything after it composes the kit.
 */

import Layout from '@theme/Layout';
import {
  Button,
  ButtonRow,
  CallToAction,
  Card,
  Container,
  DescriptionList,
  Eyebrow,
  Grid,
  List,
  MigrationDiff,
  PageRail,
  Section,
  StructuredData,
} from '@site/src/components/site';
import styles from './index.module.css';

const SITE_URL = 'https://www.voix.md';
const EMAIL = 'mariag@voix.md';

const DESCRIPTION =
  'voix moves product documentation off locked platforms onto an open-source stack your team owns: audit, restructure, implement, train, hand over.';

const RAIL = [
  {id: 'the-problem', label: 'the problem'},
  {id: 'what-we-do', label: 'what we do'},
  {id: 'what-you-own', label: 'what you own'},
  {id: 'how-it-works', label: 'how it works'},
  {id: 'common-questions', label: 'questions'},
  {id: 'contact', label: 'start'},
];

const LOCK_IN = [
  {
    term: 'The format',
    description:
      'Your pages live in a vendor database behind a WYSIWYG editor. The source of truth is an internal representation nobody outside the platform can open, diff, grep or script against.',
  },
  {
    term: 'The seats',
    description:
      'Publishing is priced per seat, so the engineer who knows the answer is not the person allowed to write it down. Contribution gets rationed to whoever holds a licence.',
  },
  {
    term: 'The search',
    description:
      'You get the search the vendor ships. You cannot tune the ranking, boost the pages support sends people to every day, or find out why the right page came fourth.',
  },
  {
    term: 'The review gate',
    description:
      'There is no pull request, no second reader, no automated link check, and no way to ship a documentation change in the same review as the release it describes.',
  },
  {
    term: 'The export',
    description:
      'The export button returns markup, not content: nested divs, inline styles and vendor data attributes. It technically leaves the platform. It does not arrive anywhere useful.',
  },
];

const SERVICES = [
  {
    index: '01',
    title: 'Consolidation and information architecture',
    body: 'We collect documentation and data scattered across wikis, tickets, slide decks and the old platform, then put it into one searchable, maintainable structure.',
  },
  {
    index: '02',
    title: 'Modern platform implementation',
    body: 'We implement a documentation platform your company owns, with reusable templates, navigation standards and a quality baseline the team can hold to.',
  },
  {
    index: '03',
    title: 'Employee onboarding and enablement',
    body: 'We train your people to author, review and publish, so the team ships documentation independently once the engagement ends.',
  },
  {
    index: '04',
    title: 'CI/CD documentation delivery',
    body: 'Updates are reviewed, tested and published consistently, which lowers release risk and shortens the gap between shipping a feature and documenting it.',
  },
];

const OWNERSHIP = [
  {
    term: 'The repository',
    description:
      'Documentation ships as Markdown files with frontmatter in your own Git account, next to the config and build scripts that turn them into a site. voix keeps a copy of the initial delivered project for one year; after that it exists only where you host it.',
  },
  {
    term: 'The deliverables',
    description:
      'On full payment the final deliverables are yours. voix keeps rights to its own pre-existing tools, templates and know-how, and publishes nothing about your project or your name without written consent.',
  },
  {
    term: 'The bill',
    description:
      'One project fee, paid 50% at signing and 50% on delivery. No subscription and no per-seat charge from voix, and the stack you land on is open source, so there is no platform licence to renew.',
  },
];

const SCOPE = [
  [
    'Content audit and migration map',
    'Information architecture redesign',
    'Docusaurus implementation',
    'Versioning and release workflow',
  ],
  [
    'CI/CD publishing setup',
    'Search and navigation optimisation',
    'Authoring standards and templates',
    'Contributor onboarding and training',
  ],
  [
    'Governance and ownership model',
    'QA, redirects and link checks',
    'Launch support and handoff playbook',
    'Post-launch iteration plan',
  ],
];

const STEPS = [
  {
    index: '01',
    title: 'Audit',
    body: 'We inventory every page, mark the duplicates and the dead ends, and write a migration map that says what moves, what merges and what gets deleted.',
  },
  {
    index: '02',
    title: 'Restructure',
    body: 'We redesign the information architecture and the navigation model first, then convert content into Markdown with frontmatter, so structure is settled before files move.',
  },
  {
    index: '03',
    title: 'Implement',
    body: 'We stand up Docusaurus in your repository and wire the delivery path: CI/CD publishing, redirects, link checks, search, templates and a quality baseline.',
  },
  {
    index: '04',
    title: 'Hand over',
    body: 'We train the authors and reviewers, write down the governance model, and hand you the repository with a launch playbook and a post-launch iteration plan.',
  },
];

/**
 * The four questions that usually decide whether a migration happens. This is
 * page content only: /faq/ is the single FAQPage entity on the site, so the
 * homepage renders these without marking them up as a competing one.
 */
const QUESTIONS = [
  {
    q: 'How long does a documentation migration take?',
    a: 'Standard delivery is within two business weeks of receiving the deposit and the materials needed to start. Scope, timeline and fees are agreed in a written proposal before any work begins, and anything outside that scope is approved in writing rather than absorbed silently.',
  },
  {
    q: 'What does a documentation migration cost?',
    a: 'A migration is a one-time custom quote, scoped by documentation volume, complexity and implementation requirements. Payment is 50% at contract signing and 50% on delivery, with no subscription, no per-seat fee and no recurring platform licence.',
  },
  {
    q: 'Who owns the documentation after the migration?',
    a: 'You do. On full payment the final deliverables are yours and the content lives in your own Git account as Markdown files, while voix keeps rights only to its pre-existing tools, templates and know-how.',
  },
  {
    q: 'What happens to our existing documentation URLs?',
    a: 'They keep resolving. Redirects, QA and link checks are part of the delivery scope, so old paths point at their new pages and every internal link is verified before launch.',
  },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: 'Documentation migration without vendor lock-in',
      description: DESCRIPTION,
      inLanguage: 'en',
      isPartOf: {'@id': `${SITE_URL}/#website`},
      about: {'@id': `${SITE_URL}/#organization`},
      publisher: {'@id': `${SITE_URL}/#organization`},
      primaryImageOfPage: {'@id': `${SITE_URL}/#logo`},
      significantLink: [
        `${SITE_URL}/services/`,
        `${SITE_URL}/process/`,
        `${SITE_URL}/pricing/`,
        `${SITE_URL}/faq/`,
      ],
    },
  ],
};

export default function Home() {
  return (
    <Layout
      title="Documentation migration without vendor lock-in"
      description={DESCRIPTION}>
      <StructuredData schema={SCHEMA} />
      <PageRail sections={RAIL} />

      {/* <main> opens at the hero and closes after the CTA: Docusaurus points
          its skip link at main:first-of-type, so anything left outside it sits
          in front of "Skip to main content". The hero is a plain <div>, not a
          <header>, because a top-level <header> claims the `banner` landmark
          that belongs to the site header. */}
      <main>
        <div className={styles.hero}>
          <Container>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <Eyebrow clay>Documentation migration studio</Eyebrow>
                <h1 className={styles.heroTitle}>
                  Documentation migration onto a stack you own
                </h1>
                <p className={styles.heroLead}>
                  voix moves product documentation off locked proprietary
                  platforms and onto an open-source stack your team owns. We
                  audit what you have, restructure it, implement it in
                  Docusaurus, train your writers and engineers, wire publishing
                  into CI/CD, and hand over the repository. What you keep is
                  Markdown in Git and a build you can run yourself.
                </p>
                <div className={styles.heroActions}>
                  <ButtonRow>
                    <Button href={`mailto:${EMAIL}`}>Start a migration</Button>
                    <Button to="/process/" variant="secondary">
                      See how it works
                    </Button>
                  </ButtonRow>
                </div>
              </div>

              <div className={styles.heroDiff}>
                <MigrationDiff caption="One page mid-migration: six lines of vendor HTML out, Markdown with frontmatter in — a title, a description and a sidebar position your build can actually read. Reviewable as a pull request, like any other change." />
              </div>
            </div>
          </Container>
        </div>

        <Section
          id="the-problem"
          tone="paper"
          eyebrow="The problem"
          title="What platform lock-in actually costs a docs team"
          lead="Lock-in rarely arrives as a single invoice. It shows up as content you cannot open, contributors who are not allowed to contribute, and an export button that returns markup instead of documentation.">
          <DescriptionList rows={LOCK_IN} />
        </Section>

        <Section
          id="what-we-do"
          eyebrow="What we do"
          title="Four services, sequenced into one engagement"
          lead="A migration usually needs all four, in this order: the structure first, then the platform, then the people who keep it current, then the pipeline that publishes it.">
          <Grid cols={2}>
            {SERVICES.map(({index, title, body}) => (
              <Card key={index} index={index} title={title} to="/services/">
                {body}
              </Card>
            ))}
          </Grid>
          <div className={styles.after}>
            <ButtonRow>
              <Button to="/services/" variant="quiet">
                Read the full service scope →
              </Button>
              <Button to="/case-studies/" variant="quiet">
                See illustrative before and after →
              </Button>
            </ButtonRow>
          </div>
        </Section>

        <Section
          id="what-you-own"
          tone="sunk"
          eyebrow="The difference"
          title="What you own after the handover"
          lead="The end state is a documentation stack your team can run without voix and without a vendor: Markdown in your Git account, a build you can execute locally, and a publishing pipeline your engineers can read and change.">
          <DescriptionList rows={OWNERSHIP} />

          <div className={styles.scope}>
            <Eyebrow>Every engagement covers</Eyebrow>
            <div className={styles.scopeColumns}>
              {SCOPE.map((column) => (
                <List key={column[0]} items={column} />
              ))}
            </div>
          </div>

          <div className={styles.after}>
            <ButtonRow>
              <Button to="/pricing/" variant="quiet">
                What a migration costs →
              </Button>
              <Button to="/docs/" variant="quiet">
                The self-serve migration handbook →
              </Button>
            </ButtonRow>
          </div>
        </Section>

        <Section
          id="how-it-works"
          eyebrow="Process"
          title="How a migration runs"
          lead="Four phases, in order. Standard delivery is within two business weeks of the deposit and the materials we need, and the written proposal fixes scope, timeline and fees before the first file moves.">
          <Grid cols={4}>
            {STEPS.map(({index, title, body}) => (
              <Card key={index} index={index} title={title}>
                {body}
              </Card>
            ))}
          </Grid>
          <div className={styles.after}>
            <ButtonRow>
              <Button to="/process/" variant="quiet">
                The full process, phase by phase →
              </Button>
            </ButtonRow>
          </div>
        </Section>

        <Section
          id="common-questions"
          tone="paper"
          eyebrow="Questions"
          title="Common questions about documentation migration"
          lead="Short answers to the four questions that usually decide whether a migration happens.">
          <Grid cols={2}>
            {QUESTIONS.map(({q, a}) => (
              <Card key={q} title={q}>
                {a}
              </Card>
            ))}
          </Grid>
          <div className={styles.after}>
            <ButtonRow>
              <Button to="/faq/" variant="quiet">
                Every question we get asked →
              </Button>
            </ButtonRow>
          </div>
        </Section>

        <CallToAction
          title="Tell us what you are locked into"
          lead="Send the platform you are on, roughly how many pages you have, and what breaks today. You get back a scope, a timeline and a fixed quote.">
          <Button href={`mailto:${EMAIL}`}>Start a migration</Button>
          <Button to="/pricing/" variant="secondary">
            See pricing
          </Button>
        </CallToAction>
      </main>
    </Layout>
  );
}
