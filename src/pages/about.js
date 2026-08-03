import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {
  Button,
  ButtonRow,
  Card,
  DescriptionList,
  Grid,
  PageHeader,
  PageRail,
  Section,
  CallToAction,
  StructuredData,
} from '@site/src/components/site';
import styles from './about.module.css';

const SITE = 'https://www.voix.md';
const PAGE = `${SITE}/about/`;
const EMAIL = 'mariag@voix.md';

const RAIL = [
  {id: 'who-runs-this', label: 'Who runs this'},
  {id: 'why-voix-exists', label: 'Why voix exists'},
  {id: 'how-we-work', label: 'How we work'},
  {id: 'where-we-are', label: 'Where we are'},
];

const HEADER_FACTS = [
  {
    label: 'Founder',
    text: 'Maria Gilca, documentation architect. She scopes the work and leads the engagement.',
  },
  {
    label: 'Base',
    text: 'Moldova, inside an IT park. Clients are remote, and so is the work.',
  },
  {
    label: 'Model',
    text: 'One-time projects under a written proposal. No retainer, no subscription, no licence.',
  },
];

const BIO_ROWS = [
  {
    term: 'Role',
    description: 'Documentation architect. Founder of voix.',
  },
  {
    term: 'Based',
    description: 'Moldova, inside an IT park.',
  },
  {
    term: 'Works with',
    description:
      'Remote product, platform, support and enablement teams that own a documentation set.',
  },
  {
    term: 'Focus',
    description:
      'Migrations off proprietary documentation platforms onto Docusaurus, Git and Markdown.',
  },
  {
    term: 'Writes',
    description: <Link to="/blog/">Field notes on documentation migration</Link>,
  },
  {
    term: 'Contact',
    description: <Link href={`mailto:${EMAIL}`}>{EMAIL}</Link>,
  },
];

const LOCK_IN_ROWS = [
  {
    term: 'Your content',
    description:
      'It sits in a database you cannot query, in a shape that exists only inside that product. The pages you wrote are stored as blocks and records, not as files you can open.',
  },
  {
    term: 'Your export',
    description:
      'The export button returns HTML with the styling welded into the markup: inline font stacks, colour attributes, wrapper divs with generated ids. It is technically your content and practically unusable.',
  },
  {
    term: 'Your URLs',
    description:
      'The address structure belongs to the vendor. Moving means remapping every indexed URL, which is the reason a lot of teams who want to leave decide they cannot afford to.',
  },
  {
    term: 'Your writers',
    description:
      'Per-seat pricing decides who is allowed to write. The support engineer who already knows the answer has no seat, so the answer stays in a ticket instead of becoming a page.',
  },
  {
    term: 'Your roadmap',
    description:
      'Every decision about documentation — versioning, translations, review before publish, how navigation works — has to be checked against what the platform permits before it can be checked against what your readers need.',
  },
];

const PRINCIPLES = [
  {
    index: '01',
    title: 'Delivery, not a retainer',
    body: 'A migration is a project with an end. It runs under a written proposal that fixes scope, timeline and fee: 50% is due at signing, 50% on delivery, and standard delivery is within two business weeks of the deposit and the materials the work depends on. Nothing renews afterwards. If your team never needs voix again, the engagement did what it was for.',
  },
  {
    index: '02',
    title: 'You own the repository',
    body: 'The documentation lives in your Git account, in your organisation, from the first commit rather than at handoff. On full payment you own the final deliverables; voix keeps rights only to its own pre-existing tools, templates and know-how. A copy of the initial delivered project is kept for one year, and after that the project lives entirely on your hosting.',
  },
  {
    index: '03',
    title: 'Open formats only',
    body: 'Content is Markdown. Metadata is frontmatter. Navigation is a file in the repository. History is Git history. Nothing that matters is stored in a format a single tool can read, and nothing critical depends on an account only voix can sign into. The test is blunt: you should be able to move the whole site again, to something else entirely, without asking permission.',
  },
  {
    index: '04',
    title: 'Training your team, not building a dependency',
    body: 'Authoring standards, page templates, a contributor guide and hands-on onboarding are part of delivery, not an upsell bolted on at the end. The real measure of a finished migration is the first release note your team publishes without asking voix anything, and the handoff playbook exists so the second one is easier than the first.',
  },
  {
    index: '05',
    title: 'Saying no, in writing',
    body: 'Anything outside the agreed scope needs written approval before it is built, so the fee never moves quietly. That cuts both ways: if a request would make the documentation harder to maintain, or belongs in a tool you already pay for, you get told that instead of getting a quote for it.',
  },
];

const CONTACT_ROWS = [
  {
    term: 'Email',
    description: <Link href={`mailto:${EMAIL}`}>{EMAIL}</Link>,
  },
  {
    term: 'Studio base',
    description: 'Moldova, inside an IT park.',
  },
  {
    term: 'Time zone',
    description: 'Eastern European time, UTC+2 in winter and UTC+3 in summer.',
  },
  {
    term: 'Engagements',
    description:
      'Remote and worldwide. Written work in pull requests, with scheduled calls for kickoff, training and handoff.',
  },
  {
    term: 'Legal details',
    description: (
      <>
        Provider information is on the <Link to="/imprint/">imprint</Link>, the
        commercial agreement is in the{' '}
        <Link to="/terms/">terms and conditions</Link>.
      </>
    ),
  },
];

const PERSON_DESCRIPTION =
  'Maria Gilca is a documentation architect and the founder of voix, a studio that migrates product documentation off proprietary platforms onto open-source stacks the client owns. She is based in Moldova and works remotely with product, platform and support teams.';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${PAGE}#webpage`,
      url: PAGE,
      name: 'About voix',
      description:
        'Who runs voix, why the studio exists, and the principles an engagement runs under: one-time delivery, client-owned repositories and open formats.',
      isPartOf: {'@id': `${SITE}/#website`},
      about: {'@id': `${SITE}/#organization`},
      mainEntity: {'@id': `${SITE}/#maria-gilca`},
      inLanguage: 'en',
    },
    {
      '@type': 'Person',
      // Same @id as the founder node declared site-wide in docusaurus.config.js,
      // so the two graphs merge into one person rather than two.
      '@id': `${SITE}/#maria-gilca`,
      name: 'Maria Gilca',
      jobTitle: 'Documentation architect',
      description: PERSON_DESCRIPTION,
      email: EMAIL,
      url: PAGE,
      mainEntityOfPage: {'@id': `${PAGE}#webpage`},
      worksFor: {'@id': `${SITE}/#organization`},
      homeLocation: {
        '@type': 'Place',
        address: {'@type': 'PostalAddress', addressCountry: 'MD'},
      },
      knowsAbout: [
        'Documentation migration',
        'Docs as code',
        'Docusaurus',
        'Information architecture',
        'Technical writing',
        'CI/CD publishing pipelines',
        'Documentation governance',
        'Content audits',
      ],
      knowsLanguage: {'@type': 'Language', name: 'English'},
    },
    {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      // Founder only. voix is Maria Gilca plus specialist collaborators on the
      // projects that need them, so an `employee` claim would assert a
      // headcount the rest of the site does not support.
      founder: {'@id': `${SITE}/#maria-gilca`},
    },
  ],
};

export default function AboutPage() {
  return (
    <Layout
      title="About"
      description="voix is a documentation migration studio run by Maria Gilca, a documentation architect in Moldova. Who runs it, why it exists, how it works.">
      <StructuredData schema={SCHEMA} />
      <PageRail sections={RAIL} />

      <main>
        <PageHeader
          eyebrow="About"
          title="About voix, a documentation migration studio"
          lead="voix moves product documentation off locked proprietary platforms onto an open-source stack the client owns: Markdown in Git, a static site, a publishing pipeline that runs in CI. It is run by Maria Gilca, a documentation architect based in Moldova, and it works remotely with teams anywhere."
          facts={HEADER_FACTS}
        />

        <Section
          id="who-runs-this"
          eyebrow="The person behind it"
          title="Who runs voix?"
          lead="voix is run by Maria Gilca, a documentation architect based in Moldova. She founded the studio, scopes each engagement, and stays on it from the first content audit through to the handoff session where your team publishes without her.">
          <div className={styles.split}>
            <div className={`${styles.prose} ${styles.flush}`}>
              <p>
                Documentation architect is not a title most companies have on
                the org chart, which is roughly the problem. Two roles usually
                share the work and neither owns it: the technical writer, who
                knows how to explain the product, and the platform engineer, who
                knows how to build and ship a site. The layer between them is
                unclaimed — what counts as a page, where it lives, who reviews
                it, how it reaches production, and what happens to all of it
                when the product changes shape. That layer is what voix is
                hired for.
              </p>
              <p>
                The engagements look alike more often than not. Documentation
                starts wherever it was easiest to start — a hosted help centre,
                a wiki, a folder of shared documents, a README that kept growing
                — and by the time anyone treats it as a system there are four
                systems. Search returns three versions of the same page, two of
                them wrong, and nobody can say which one is canonical because
                nothing in the setup ever forced that question. A migration is
                the moment the question finally gets asked, page by page, with
                someone accountable for the answer.
              </p>
              <p>
                The positions taken on this site are hers: that documentation
                belongs in the same repository as the product it describes; that
                reviewing a docs change should look like reviewing a code
                change; that a platform you cannot leave is a platform you do
                not own; and that an engagement should end with your team
                shipping on its own. None of those are neutral. A studio holding
                the opposite views would build you a different site and sell you
                a different contract.
              </p>
              <p>
                There is no client list on this page and no logo strip. voix
                does not publish a client&rsquo;s name or their work without
                written consent — that is written into the{' '}
                <Link to="/confidentiality/">confidentiality policy</Link> and
                it rules out most of what a studio page normally uses as proof.
                What stands in its place is the method, stated in enough detail
                to be argued with: the{' '}
                <Link to="/services/">services page</Link> says what is
                delivered and what is refused, the{' '}
                <Link to="/pricing/">pricing page</Link> says what it costs and
                on what terms, the{' '}
                <Link to="/case-studies/">case studies</Link> are labelled
                composites rather than dressed-up client stories, and the{' '}
                <Link to="/blog/">field notes</Link> show the reasoning in
                public before you have paid for any of it.
              </p>
            </div>

            <Card index="Founder" title="Maria Gilca">
              {/* Stacked: this card is the narrow track of .split, so a term
                  column beside a description leaves neither room to read. */}
              <DescriptionList rows={BIO_ROWS} stacked />
            </Card>
          </div>
        </Section>

        <Section
          id="why-voix-exists"
          eyebrow="Point of view"
          title="Why voix exists"
          lead="Documentation is the one part of a product that companies routinely agree to keep on someone else's platform, in someone else's format, behind someone else's export button. voix exists to undo that decision and to make the next one reversible."
          tone="paper"
          narrow>
          <div className={`${styles.prose} ${styles.flush}`}>
            <p>
              The trade looks sensible when it is made. A hosted documentation
              platform gets a team publishing in an afternoon: a visual editor,
              hosted search, a theme somebody else maintains, no engineering
              time to beg for. Against a launch date that is a good deal, and it
              is usually the right call at the time. The cost arrives later, and
              it never arrives as a line on the invoice.
            </p>
          </div>

          <div className={styles.block}>
            <DescriptionList rows={LOCK_IN_ROWS} />
          </div>

          <div className={styles.prose}>
            <p>
              None of this is an argument for building your own tooling. The
              alternative is duller than that: Markdown files in the repository
              the product already lives in, a static site generator, and a
              pipeline in CI that builds and publishes on merge. Docusaurus, Git
              and Markdown are the usual answer here because they are open
              source, well documented, widely known, and boring in the way
              infrastructure should be — and because every part of the stack can
              be swapped, including the studio that assembled it.
            </p>
            <p>
              That is the test worth applying to any documentation setup,
              including the one voix builds for you. Could you leave it? If the
              content is plain text in files, the history is in your own Git
              account, and the site builds with a public tool your engineers
              already understand, then the platform is a choice you keep making
              rather than one you made once and now pay for annually. Lock-in is
              not really about price. It is about how much of your documentation
              strategy has to be negotiated with a vendor before it can be
              discussed with your readers.
            </p>
            <p>
              The commercial model follows the same argument, because it would
              be incoherent otherwise. voix charges a one-time project fee: a
              studio living off a retainer has a permanent incentive to leave
              you needing it, and that incentive eventually shows up in the
              work. The engagement is designed to finish. What is on the{' '}
              <Link to="/pricing/">pricing page</Link> is the entire commercial
              relationship — a fee, a deposit, a delivery window, and an
              optional maintenance package if your team wants a safety net while
              it takes over.
            </p>
          </div>
        </Section>

        <Section
          id="how-we-work"
          eyebrow="Principles"
          title="How voix works"
          lead="Five rules decide how an engagement runs. They apply whether a project is twelve pages or twelve hundred, and each one costs voix something — which is the only reason to believe they are real.">
          <Grid cols={2}>
            {PRINCIPLES.map(({index, title, body}) => (
              <Card key={index} index={index} title={title}>
                <p className={styles.cardText}>{body}</p>
              </Card>
            ))}
          </Grid>

          <div className={styles.prose}>
            <p>
              These are principles, not the agreement. The{' '}
              <Link to="/terms/">terms and conditions</Link> set out payment,
              defects, ownership, liability and governing law in full, and the{' '}
              <Link to="/confidentiality/">confidentiality policy</Link> covers
              how your material is handled while the work runs and what happens
              to it afterwards. Read those two for the commitments; this page is
              only the reasoning behind them.
            </p>
            <p>
              If you want the same principles expressed as deliverables rather
              than positions, the <Link to="/services/">services page</Link>{' '}
              breaks the engagement into what gets built, the{' '}
              <Link to="/process/">process page</Link> puts the phases in order
              and says who does what in each of them, and the{' '}
              <Link to="/faq/">FAQ</Link> answers the objections that usually
              come before a first email.
            </p>
          </div>
        </Section>

        <Section
          id="where-we-are"
          eyebrow="Location and contact"
          title="Where is voix based?"
          lead="voix is based in Moldova, inside an IT park, and works remotely with teams anywhere. Engagements run asynchronously and in writing, with scheduled calls for kickoff, training and handoff."
          tone="sunk">
          <div className={styles.split}>
            <div className={`${styles.prose} ${styles.flush}`}>
              <p>
                The park is a cluster of small product companies and studios,
                which turns out to be a useful place to run this kind of work
                from. The people around us are building the products that will
                need documentation in a year, so the failure modes show up early
                and in person: the wiki nobody prunes, the help centre that two
                teams edit and neither owns, the API reference that drifts a
                release behind the API.
              </p>
              <p>
                Remote is the default rather than a concession. Most of a
                migration is written work reviewed in pull requests — a
                migration map, an information architecture, converted pages, a
                publishing pipeline, a set of templates — and a pull request
                reads the same whether the reviewer is in the next room or six
                time zones away. Moldova sits in Eastern European time, which
                overlaps a full working day with Europe and the start of the day
                in North America.
              </p>
              <p>
                The first step is an email, and it goes to the person who would
                do the work. Describe what you have, where it lives today and
                roughly how many pages are involved, and you get back either a
                scope conversation or a straight answer about why voix is not
                the right fit for it. The{' '}
                <Link to="/pricing/">pricing page</Link> lists what to include
                if you want a fee estimate in the first reply rather than a
                second round of questions.
              </p>
            </div>

            <Card index="Contact" title="How to reach the studio">
              {/* Stacked for the same reason as the bio card above. */}
              <DescriptionList rows={CONTACT_ROWS} stacked />
              <ButtonRow className={styles.cardAction}>
                <Button variant="quiet" href={`mailto:${EMAIL}`}>
                  Email the studio
                </Button>
              </ButtonRow>
            </Card>
          </div>
        </Section>

        <CallToAction
          id="contact"
          title="Talk to the person doing the work"
          lead="No account manager and no discovery funnel. Describe your documentation and where it lives today, and you get a written scope back.">
          <Button href={`mailto:${EMAIL}`}>Start a migration</Button>
          <Button variant="secondary" to="/services/">
            See what voix does
          </Button>
          <Button variant="quiet" to="/pricing/">
            Pricing and terms
          </Button>
        </CallToAction>
      </main>
    </Layout>
  );
}
