import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {
  Button,
  ButtonRow,
  Card,
  DescriptionList,
  Grid,
  List,
  PageHeader,
  PageRail,
  Section,
  CallToAction,
  StructuredData,
} from '@site/src/components/site';
import styles from './pricing.module.css';

const SITE = 'https://www.voix.md';
const PAGE = `${SITE}/pricing/`;
const EMAIL = 'mariag@voix.md';

const RAIL = [
  {id: 'what-it-costs', label: 'What it costs'},
  {id: 'what-drives-the-quote', label: 'What drives the quote'},
  {id: 'what-the-fee-covers', label: 'What the fee covers'},
  {id: 'payment-and-terms', label: 'Payment and terms'},
  {
    id: 'how-much-does-a-documentation-migration-cost',
    label: 'Straight answer',
  },
];

const HEADER_FACTS = [
  {
    label: 'Model',
    text: 'One-time fee per project. No subscription and no per-seat cost.',
  },
  {
    label: 'Payment',
    text: '50% at signing, 50% on delivery, both set in a written proposal.',
  },
  {
    label: 'Standard delivery',
    text: 'Two business weeks from the deposit and the materials the work needs.',
  },
];

const QUOTE_DRIVERS = [
  {
    term: 'Page count',
    description:
      'How many pages actually move. Most documentation sets carry pages nobody has opened in a year, and the audit separates what migrates from what gets archived. The archived pile is the cheap part.',
  },
  {
    term: 'Source systems',
    description:
      'One export from one platform is a straight run. Content split across a help centre, an internal wiki, a shared drive and a handful of README files means several extraction paths, several formats, and one merge that has to reconcile them.',
  },
  {
    term: 'Rewrite vs convert',
    description:
      'Converting clean, structured content is mechanical work. Pages written in a WYSIWYG editor, with styling baked into the markup and no consistent heading levels, have to be rewritten rather than converted, and rewriting is priced as writing.',
  },
  {
    term: 'Redirects',
    description:
      'If the current URLs are public and indexed, every one of them needs a mapped redirect and a link check before launch. If the docs are internal, or the domain is changing anyway, that work disappears from the quote.',
  },
  {
    term: 'Authors to train',
    description:
      'Training two engineers who already work in Git is a short session. Onboarding a mixed group of writers, support leads and product managers who have never opened a pull request takes structured sessions and written guides they can use after handoff.',
  },
  {
    term: 'Versioning',
    description:
      'Publishing a single current version is simpler than maintaining several released versions side by side, each with its own navigation, its own redirects and its own release workflow.',
  },
];

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
    title: 'Platform and pipeline',
    items: [
      'Docusaurus implementation',
      'Versioning and release workflow',
      'CI/CD publishing setup',
    ],
  },
  {
    index: '03',
    title: 'Standards and people',
    items: [
      'Authoring standards and templates',
      'Contributor onboarding and training',
      'Governance and ownership model',
    ],
  },
  {
    index: '04',
    title: 'Launch and handoff',
    items: [
      'QA, redirects and link checks',
      'Launch support and handoff playbook',
      'Post-launch iteration plan',
    ],
  },
];

const TERMS = [
  {
    term: 'Deposit',
    description:
      '50% of the agreed fee at contract signing. Work begins once it has been received.',
  },
  {
    term: 'Balance',
    description: 'The remaining 50% is due on delivery.',
  },
  {
    term: 'Delivery',
    description:
      'Standard delivery is within two business weeks of the deposit and the materials the project depends on. Late materials move the date.',
  },
  {
    term: 'Scope changes',
    description:
      'Anything outside the agreed proposal needs written approval before it is built, so the fee never moves quietly.',
  },
  {
    term: 'Bugs',
    description:
      'Defects voix introduces are fixed at no charge. Defects caused by changes made on your side are quoted case by case and capped at 500 EUR.',
  },
  {
    term: 'Ownership',
    description:
      'On full payment you own the final deliverables. voix keeps the rights to its own pre-existing tools, templates and know-how.',
  },
];

const FIRST_EMAIL = [
  'A link to your current documentation, or an export if it sits behind a login',
  'A rough page count, even an order of magnitude',
  'Every system the content lives in today, including wikis and shared drives',
  'Whether the current URLs are public and have to keep working',
  'Whether more than one version has to be published at a time',
  'Who will be writing documentation after handoff, and how many of them',
  'Any date the migration has to land before',
];

const ANSWER =
  'A documentation migration from voix is a single one-time project fee, quoted after a scope review rather than published as a list price, because the cost is driven by how much of your content has to be rewritten rather than converted and that cannot be read off a page count.';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${PAGE}#webpage`,
      url: PAGE,
      name: 'Documentation migration pricing',
      description:
        'What a documentation migration costs: a one-time project fee quoted per project, an optional maintenance package, and a 500 EUR portfolio build.',
      isPartOf: {'@id': `${SITE}/#website`},
      about: {'@id': `${SITE}/#organization`},
      mainEntity: {'@id': `${PAGE}#migration-service`},
      inLanguage: 'en',
    },
    {
      '@type': 'Service',
      '@id': `${PAGE}#migration-service`,
      name: 'Docs migration project',
      serviceType: 'Documentation migration',
      description:
        'A one-time engagement that moves product documentation off a proprietary platform onto an open-source stack the client owns, covering audit, information architecture, implementation, CI/CD publishing, training and handoff.',
      provider: {'@id': `${SITE}/#organization`},
      areaServed: {'@type': 'Place', name: 'Worldwide, remote'},
      termsOfService: `${SITE}/terms/`,
      offers: {
        '@type': 'Offer',
        '@id': `${PAGE}#migration-offer`,
        name: 'Custom quote',
        // No price and no priceSpecification: a PriceSpecification carrying a
        // currency but no price is semantically empty and validators read the
        // parent Offer as missing its price. The honest state is availability
        // plus plain text.
        description:
          'One-time fee, scoped by documentation volume, complexity and implementation requirements. No subscription and no per-seat charge. No fixed price is published: the fee is set per project in a written proposal after a scope review.',
        availability: 'https://schema.org/InStock',
        url: `${PAGE}#what-it-costs`,
      },
    },
    {
      '@type': 'Service',
      '@id': `${PAGE}#interventions-service`,
      name: '5 interventions package',
      serviceType: 'Documentation maintenance',
      description:
        'An optional add-on to a migration: five post-launch maintenance interventions for fixes and minor documentation updates.',
      provider: {'@id': `${SITE}/#organization`},
      isRelatedTo: {'@id': `${PAGE}#migration-service`},
      offers: {
        '@type': 'Offer',
        '@id': `${PAGE}#interventions-offer`,
        name: 'Small extra cost',
        description:
          'Added to the one-time migration fee. No fixed price is published: the add-on is quoted alongside the migration it extends.',
        availability: 'https://schema.org/InStock',
        url: `${PAGE}#what-it-costs`,
      },
    },
    {
      '@type': 'Service',
      '@id': `${PAGE}#portfolio-service`,
      name: 'Portfolio creation',
      serviceType: 'Portfolio build',
      description:
        'An additional service, scoped separately from a migration: a one-time portfolio build.',
      provider: {'@id': `${SITE}/#organization`},
      offers: {
        '@type': 'Offer',
        '@id': `${PAGE}#portfolio-offer`,
        name: 'Portfolio creation, one-time build',
        // Price stated once, at the Offer level. Repeating it inside a
        // priceSpecification gave two sources for the same number.
        price: '500',
        priceCurrency: 'EUR',
        description: 'One-time build. Not a recurring fee.',
        availability: 'https://schema.org/InStock',
        url: `${PAGE}#what-it-costs`,
      },
    },
    // No FAQPage node here: /faq/ is the single FAQPage on the site, so this
    // page keeps the visible question and answer without a second claim to it.
  ],
};

export default function PricingPage() {
  return (
    <Layout
      title="Pricing"
      description="What a documentation migration costs: a one-time project fee, custom quote, no subscription. What drives the quote, what the fee covers, and the terms.">
      <StructuredData schema={SCHEMA} />

      {/* <main> opens before the h1 and closes after the CTA: Docusaurus's
          skip link targets main:first-of-type, so anything above it is
          unreachable by that link. */}
      <main>
      <PageHeader
        eyebrow="Pricing"
        title="Documentation migration pricing"
        lead="Every voix engagement is a one-time project fee. A documentation migration is quoted after a scope review; there is no subscription, no per-seat charge and no platform licence to renew. Once your documentation is in your own Git repository, keeping it there costs nothing."
        facts={HEADER_FACTS}
      />

      <PageRail sections={RAIL} />

        <Section
          id="what-it-costs"
          eyebrow="Three price points"
          title="What it costs"
          lead="There are three things you can buy. One of them is the migration itself; the other two are optional and sit on top of it.">
          <div className={styles.tiers}>
            <Card
              emphasis
              index="Core project"
              title="Docs migration project">
              <p className={styles.price}>Custom quote</p>
              <p className={styles.tierText}>
                A one-time fee, scoped by documentation volume, complexity and
                implementation requirements. It covers the whole engagement —
                audit, architecture, implementation, training and handoff — and
                ends with your team publishing without voix in the loop.
              </p>
              <ButtonRow className={styles.tierAction}>
                <Button variant="quiet" href={`mailto:${EMAIL}`}>
                  Ask for a quote
                </Button>
              </ButtonRow>
            </Card>

            <Card index="Optional add-on" title="5 interventions package" quiet>
              <p className={styles.price}>Small extra cost</p>
              <p className={styles.tierText}>
                Five post-launch maintenance interventions for fixes and minor
                updates, bought on top of the migration. Worth taking if your
                team wants a safety net while it takes over authoring.
              </p>
            </Card>

            <Card index="Additional service" title="Portfolio creation" quiet>
              <p className={styles.price}>500 EUR</p>
              <p className={styles.tierText}>
                A one-time build, available on request and scoped separately
                from a migration. It is the one price on this page that does not
                need a scope review first.
              </p>
            </Card>
          </div>

          <p className={styles.note}>
            One-time means one-time. voix does not sell a subscription, a
            per-seat licence or a hosting plan, and nothing here renews. What
            you end up with is an open-source stack running on infrastructure
            you control, so the cost of keeping the documentation online after
            handoff is whatever your own hosting already costs. Whatever is
            agreed goes into a written proposal before work starts.
          </p>
        </Section>

        <Section
          id="what-drives-the-quote"
          eyebrow="Scoping"
          title="What drives the quote"
          lead="Two documentation sets with the same page count can be weeks apart in effort. These are the variables that move the number, and the ones you will be asked about first."
          tone="paper"
          narrow>
          <DescriptionList rows={QUOTE_DRIVERS} />
          <div className={styles.prose}>
            <p>
              None of these is padding. Each one maps to hours inside a phase
              you can see in advance: the{' '}
              <Link to="/process/">engagement process</Link> lists the phases in
              order and says who does what in each of them. If your setup has an
              awkward edge — a docs site that is half marketing pages, a
              translation workflow, an API reference generated from source — the{' '}
              <Link to="/faq/">FAQ</Link> covers the ones that come up most.
            </p>
          </div>
        </Section>

        <Section
          id="what-the-fee-covers"
          eyebrow="Delivery scope"
          title="What the fee covers"
          lead="The migration fee buys a finished engagement, not a content dump into a new repository. Scope is confirmed per project in the proposal, and these are the standard building blocks.">
          <Grid cols={2}>
            {SCOPE_GROUPS.map(({index, title, items}) => (
              <Card key={index} index={index} title={title}>
                <List items={items} />
              </Card>
            ))}
          </Grid>
          <div className={styles.prose}>
            <p>
              Each block is described in depth on the{' '}
              <Link to="/services/">services page</Link>, including what voix does
              not take on. Anything not written into the proposal is out of
              scope until it is approved in writing, which is what keeps the
              one-time fee a one-time fee.
            </p>
          </div>
        </Section>

        <Section
          id="payment-and-terms"
          eyebrow="Commercial terms"
          title="Payment and terms"
          lead="Every engagement runs under a written proposal or statement of work that fixes scope, timeline and fees before anyone starts. This is the short version of what that document says about money."
          tone="sunk"
          narrow>
          <DescriptionList rows={TERMS} />
          <div className={styles.prose}>
            <p>
              This is a summary, not the agreement, and it adds nothing to it.
              Late payment, the limits on liability, and the governing law of
              the Republic of Moldova are all set out in full in the terms and
              conditions. How your material is handled while the work runs — who
              can see it, how long a copy is kept, what happens when you ask for
              it back — is covered separately in the confidentiality policy.
            </p>
          </div>
          <ButtonRow className={styles.actions}>
            <Button variant="secondary" to="/terms/">
              Read the full terms
            </Button>
            <Button variant="quiet" to="/confidentiality/">
              Confidentiality policy
            </Button>
          </ButtonRow>
        </Section>

        <Section
          id="how-much-does-a-documentation-migration-cost"
          eyebrow="Straight answer"
          title="How much does a documentation migration cost?"
          lead={ANSWER}>
          <div className={styles.split}>
            <div className={`${styles.prose} ${styles.flush}`}>
              <p>
                A single published price would be wrong in both directions: too
                high for a small product manual that exports cleanly, far too
                low for a platform reference spread across three systems where
                half the pages need rewriting before they can move. Quoting per
                project keeps the fee tied to the work rather than to a tier
                someone picked off a page.
              </p>
              <p>
                What comes back is a written proposal with scope, timeline and
                fee — the same document the engagement then runs under. Nothing
                starts before it is signed and the deposit is received, and the
                fee does not move afterwards unless you approve a change in
                writing.
              </p>
              <p>
                If you would rather see the shape of the work before asking for
                a number, the <Link to="/services/">services page</Link>{' '}
                describes what is delivered and the <Link to="/faq/">FAQ</Link>{' '}
                answers the questions that usually come before a first email.
              </p>
            </div>

            <Card index="Send this" title="What to send to get a number back">
              <List items={FIRST_EMAIL} />
              <ButtonRow className={styles.tierAction}>
                <Button variant="primary" href={`mailto:${EMAIL}`}>
                  Email {EMAIL}
                </Button>
              </ButtonRow>
            </Card>
          </div>
        </Section>

      <CallToAction
        id="contact"
        title="Send your docs, get a scope and a fee"
        lead="Describe what you have and where it lives today. You get back a written proposal with scope, timeline and a one-time price.">
        <Button href={`mailto:${EMAIL}`}>Start a migration</Button>
        <Button variant="secondary" to="/services/">
          See what voix does
        </Button>
        <Button variant="quiet" to="/faq/">
          Read the FAQ
        </Button>
      </CallToAction>
      </main>
    </Layout>
  );
}
