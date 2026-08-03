import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {
  Button,
  Card,
  CallToAction,
  DescriptionList,
  Eyebrow,
  Grid,
  List,
  PageHeader,
  PageRail,
  Section,
  StructuredData,
} from '@site/src/components/site';
import styles from './case-studies.module.css';

const SITE_URL = 'https://www.voix.md';
const PAGE_URL = `${SITE_URL}/case-studies/`;
const EMAIL = 'mariag@voix.md';

/**
 * voix has no published client work. Every scenario below is a composite
 * assembled from patterns that recur across documentation estates, and it is
 * labelled as one in the header, in its own eyebrow, and again under it. No
 * company is named, no person is quoted, no result is reported as measured.
 */
const MARKER = 'Illustrative composite · no client named · no result measured';

const SCENARIOS = [
  {
    id: 'scaleup-leaving-a-paid-platform',
    eyebrow: 'Scenario 01 · illustrative composite',
    railLabel: 'Leaving a paid platform',
    title: 'A scaleup leaving a paid documentation platform',
    lead: 'One hosted platform, authoring priced per seat, and an export button that produces markup nobody can maintain.',
    tone: undefined,
    ruled: true,
    situation:
      'A B2B product company publishes a few hundred pages on a single hosted documentation platform. Authoring is licensed per seat, so the two writers, the product manager who knows the API and the support lead who spots the errors are all queued behind three seats. The renewal is annual and priced against headcount, so the bill grows every time the company hires. All content sits in the vendor database, and the only way out is the export button that nobody has pressed yet.',
    wrong:
      'The export produces HTML written by a WYSIWYG editor: inline font and colour styles on every heading, wrapper divs carrying generated block ids, span tags around single words, and tables assembled out of nested divs. Images come back as URLs pointing at the vendor CDN, so the export stops rendering on the day the contract ends. None of it is under version control, which means no diff, no history, no blame and no rollback. The only record of who changed a page is somebody remembering that they said they would.',
    phases: [
      {
        title: 'Audit and migration map',
        body: 'Every published URL is inventoried with its traffic, its last-edited date and an owner, then marked move, merge, rewrite or retire. The output is a table in which each source URL has either a destination path or a written reason it is not moving. Nothing is converted before that table exists, because a migration without a map is just a re-publish of the same mess on cheaper hosting.',
      },
      {
        title: 'A conversion pipeline, not a copy-paste',
        body: 'A script turns the export into Markdown: inline styles and wrapper divs stripped, heading levels normalised, vendor callout blocks mapped onto admonitions, code samples lifted out of styled span soup, and CDN image URLs rewritten to local paths with the assets pulled down alongside. It is a pipeline rather than a one-off because the vendor keeps taking edits while the migration runs, so the whole conversion is re-run against a fresh export at cutover.',
      },
      {
        title: 'Information architecture and the Docusaurus build',
        body: 'Navigation is redesigned around what readers are trying to do rather than around the vendor category tree, versioning is set up to match how the product actually releases, and every page gets real frontmatter: title, description, sidebar position. Recurring page types get templates, so the next hundred pages arrive in the same shape as the first hundred.',
      },
      {
        title: 'Redirects, checks and cutover',
        body: 'Every old URL gets a redirect to its new path, link checking and builds run in CI, the documentation domain is pointed at the new hosting, and the seats are dropped at renewal rather than abandoned mid-term. The handoff includes the conversion scripts themselves, so the team can re-run the migration on anything that surfaces later without calling anyone.',
      },
    ],
    after: [
      'Anyone with repository access can fix a typo. An edit costs a pull request, not a licence.',
      'Every change has an author, a diff, a reviewer and a one-command revert.',
      'A broken link fails the build instead of reaching a customer.',
      'Documentation deploys from the same CI the product uses, on the day the change is written.',
      'The annual conversation moves from a per-seat renewal quote to a hosting bill the team controls.',
      'The content is Markdown in a repository the company owns, so the next platform decision is a choice rather than an escape.',
    ],
    signals: [
      'Your renewal quote goes up when you hire.',
      'Fewer people can edit the documentation than have opinions about it.',
      'Nobody has run the export yet to see what actually comes out.',
      'Your documentation lives on the vendor domain, or on a subdomain you do not fully control.',
      'Someone has said “we will move off it after the next release” more than twice.',
    ],
  },
  {
    id: 'docs-scattered-across-tools',
    eyebrow: 'Scenario 02 · illustrative composite',
    railLabel: 'Scattered across tools',
    title: 'Documentation scattered across a wiki, a drive, a helpdesk and a README',
    lead: 'Four surfaces, four search boxes, four sets of editing rules, and no single source of truth for anything.',
    tone: 'sunk',
    ruled: false,
    situation:
      'Documentation grew wherever it was convenient. The internal wiki holds process notes and roughly half the product material. A shared drive holds PDFs and slide decks that sales attaches to emails. The support helpdesk carries a knowledge base written by agents answering the same tickets. The main repository has a README that engineers actually trust, because they wrote it and it sits next to the code. Nobody chose this arrangement. It is the residue of four teams each solving their own week.',
    wrong:
      'The same procedure exists three times and the three versions disagree, with no way for a reader to tell which one is current. Search only ever covers a quarter of the material, because each tool searches only itself. A customer gets sent a deck that is a year behind the helpdesk article. New hires are told to ask in Slack, because nobody can point at a canonical page. And because no topic has an owner, every stale version is simultaneously somebody else’s problem.',
    phases: [
      {
        title: 'One inventory across all four surfaces',
        body: 'Every page, article, deck and document is listed in a single table with its owner, its last edit, its audience and a duplicate-group id. Grouping the duplicates comes before anything is written, because the real work here is not moving files, it is deciding which of three answers is the answer.',
      },
      {
        title: 'Adjudication with named owners',
        body: 'For each duplicate group, one version becomes the source and the others are marked for redirect or deletion. That is a short series of decisions taken by people empowered to take them, not a writing task, and each decision is recorded in the same table so it survives the meeting. Topics that no team will own get an owner here, or they get retired here.',
      },
      {
        title: 'Split by audience, then rebuild the architecture',
        body: 'Customer-facing material moves into a public Docusaurus site; internal process stays internal in a separate build. Navigation is designed around the tasks readers arrive with rather than around the org chart that produced the original folders, and each page type gets a template so the next contributor does not invent a new shape.',
      },
      {
        title: 'Close the old doors',
        body: 'Helpdesk articles are replaced with a short stub pointing at the canonical page, or redirected outright where the tool allows it. The drive folder is archived read-only with a pointer at the top. The README shrinks to the parts that genuinely belong beside the code, plus a link out. Then redirects, link checks and search configuration, so old bookmarks still land somewhere real.',
      },
    ],
    after: [
      'There is one URL to send a customer, and one place to change what it says.',
      'Every topic has a named owner recorded in a file the whole team can read.',
      'One search box covers the entire customer-facing set.',
      'Sales can send a link that stays current instead of attaching a PDF that starts ageing the moment it is exported.',
      'Onboarding can point at a page instead of at a person.',
      'When two answers conflict, there is a defined way to decide which one wins.',
    ],
    signals: [
      'You cannot answer “where do our docs live” in one sentence.',
      'The same how-to exists in the wiki and in the helpdesk, and the two disagree.',
      'Support agents write knowledge base articles because the product documentation did not cover it.',
      'Something load-bearing exists only in a document sitting in one person’s private drive.',
      'Your onboarding is a person, not a page.',
    ],
  },
  {
    id: 'engineering-owned-docs-that-drifted',
    eyebrow: 'Scenario 03 · illustrative composite',
    railLabel: 'Docs that drifted',
    title: 'Engineering-owned Markdown that quietly drifted',
    lead: 'Already in Git, already Markdown, already free of any licence — and still failing readers, because nothing kept it honest.',
    tone: undefined,
    ruled: true,
    situation:
      'The documentation is Markdown in the same repository as the product, published by a static site generator an engineer wired up two years ago and has not touched since. There is no vendor, no licence and no export problem. Everything is versioned, everything is diffable, and on paper this team has already done the migration everyone else is asking for.',
    wrong:
      'There is no information architecture. The sidebar is the folder listing in alphabetical order, twenty top-level entries deep, with a misc directory at the bottom where pages go to die. Frontmatter is inconsistent, so titles and descriptions in search results are unusable. Documentation is not part of code review, so features ship and their pages do not: several pages still describe flags that were removed. There are three getting-started guides written by three teams, each of them partly right. And nothing fails when a link breaks, so the dead links accumulate invisibly until a customer finds them.',
    phases: [
      {
        title: 'A drift audit the Git history writes for you',
        body: 'Last-touched dates come straight out of the Git log, then get cross-referenced against release notes and the current API surface. Every page ends up classified as current, stale but salvageable, wrong, or delete. The dates make the argument, which turns a political conversation about whose pages are worst into a data exercise anyone can check.',
      },
      {
        title: 'Information architecture and a page-type taxonomy',
        body: 'A task-based hierarchy replaces the folder listing, driven by an explicit sidebar file rather than alphabetical ordering, with one canonical getting-started and four page types: concept, how-to, reference, troubleshooting. Each type gets a template, so new pages have an obvious home. That is the part that stops the structure re-rotting six months later.',
      },
      {
        title: 'Review gates that run in CI',
        body: 'Documentation changes are required in the same pull request as the change that needs them, enforced with code ownership on the docs path. Link checking, frontmatter validation and a prose style check run on every pull request, and a broken anchor fails the build rather than printing a warning nobody reads.',
      },
      {
        title: 'Ownership and a review cadence',
        body: 'Each top-level area is assigned to an owning team in a file in the repository, with a documented review interval. A last-reviewed date in frontmatter is surfaced on the page itself, so a reader can judge the age of what they are reading without opening the Git history to work it out.',
      },
    ],
    after: [
      'A stale page is visible as a stale page, to the reader and to the owner.',
      'A pull request that changes behaviour cannot merge while the page describing that behaviour still says the old thing.',
      'New pages start from a template with correct frontmatter, so search results become readable again.',
      'The sidebar reflects what readers are trying to do, and it keeps doing that when someone adds a folder.',
      'Broken links fail in continuous integration rather than in front of a customer.',
      'There is one getting-started guide, and everyone knows which one it is.',
    ],
    signals: [
      'Your sidebar is your folder structure.',
      'You have more than one getting-started page.',
      'The documentation is in the repository but not in code review.',
      'Someone can name the page they know is wrong, and it is still published.',
      'Nothing breaks when a link breaks.',
    ],
  },
  {
    id: 'support-heavy-product',
    eyebrow: 'Scenario 04 · illustrative composite',
    railLabel: 'Support absorbs it',
    title: 'A support-heavy product whose documentation nobody can find',
    lead: 'The pages exist and are broadly accurate. Customers still cannot reach them, so support answers the same questions every week.',
    tone: 'sunk',
    ruled: false,
    situation:
      'The documentation is complete enough. It is also organised the way the product is built: by module, by service name, by the internal noun the team uses in stand-up. Customers search with the words for their problem, not the words for the architecture. So the answer is on the site, the person who needs it opens a ticket instead, and an agent types the explanation out again. Support has quietly become the search interface.',
    wrong:
      'Page titles are internal nouns, so the vocabulary never matches the query. There is almost no troubleshooting content, because troubleshooting knowledge lives in ticket replies and in a folder of canned responses that is better than the published site. The error strings the product prints appear nowhere in the documentation, so pasting the exact message into search returns nothing at all. And there is no route from a ticket back into the docs, so the same gap gets rediscovered every month and closed by hand every time.',
    phases: [
      {
        title: 'Mine the tickets and the failed searches',
        body: 'Three months of ticket subjects are clustered by intent, and the on-site search queries that returned no useful result are pulled alongside them. That produces a ranked list of the questions customers actually ask, in the words they actually use. Nothing has to be invented: the demand is already written down, it has simply never been read as a documentation backlog.',
      },
      {
        title: 'Answer-shaped pages',
        body: 'For the top clusters, pages are written whose title is the question and whose first paragraph is the answer, with the detail underneath for the reader who needs it. A troubleshooting set is keyed to the literal strings the product emits, so pasting an error message into search lands on the page about that error rather than on nothing.',
      },
      {
        title: 'Search and navigation in the reader vocabulary',
        body: 'Pages are retitled into task language, with descriptions and keyword aliases so the internal nouns still resolve for the people who use them. Search is configured and weighted, and the highest-demand questions are placed where a stuck reader is already looking rather than three levels into the tree.',
      },
      {
        title: 'A loop from ticket back to page',
        body: 'Support tags a ticket as a documentation gap, the tag opens an issue in the docs repository, and an owner triages that queue on a set cadence. Support macros link to the page instead of restating it, which makes every reply a live check that the page is still correct.',
      },
    ],
    after: [
      'An agent answers with a link plus a sentence of context, instead of retyping an explanation.',
      'A customer who pastes an error message into search lands on the page about that error.',
      'Documentation improves as a by-product of support running, rather than in a project every two years.',
      'The team can see which questions still have no page, because the tagging says so.',
      'New agents learn from the same pages customers read, so the two stop diverging.',
      'Product can see, in one queue, where the product is confusing and not only where the docs are thin.',
    ],
    signals: [
      'Support keeps a folder of canned replies that is better than your published documentation.',
      'Your most-visited page is the documentation index, because nobody can get anywhere from it.',
      'You cannot search your own documentation for an error message your own product prints.',
      'Nobody owns the question “what did customers ask us last month” on the documentation side.',
      'Your page titles are your internal names for things.',
    ],
  },
];

const RAIL = [
  {id: 'why-these-are-composites', label: 'Why composites'},
  ...SCENARIOS.map(({id, railLabel}) => ({id, label: railLabel})),
  {id: 'what-your-migration-would-look-like', label: 'Your migration'},
  {id: 'contact', label: 'Contact'},
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: 'Documentation migration scenarios',
      description:
        'Four illustrative composite scenarios describing how voix migrates product documentation onto an open-source stack the client owns.',
      disambiguatingDescription:
        'Every scenario on this page is an illustrative composite assembled from recurring documentation patterns. No client is named, no person is quoted and no measured result is reported.',
      isPartOf: {'@id': `${SITE_URL}/#website`},
      about: {'@id': `${SITE_URL}/#organization`},
      publisher: {'@id': `${SITE_URL}/#organization`},
      inLanguage: 'en',
      mainEntity: {'@id': `${PAGE_URL}#scenarios`},
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#scenarios`,
      name: 'Illustrative documentation migration scenarios',
      description:
        'Composite before-and-after scenarios for documentation migration engagements. Illustrative only: not accounts of named client projects.',
      itemListOrder: 'https://schema.org/ItemListUnordered',
      numberOfItems: SCENARIOS.length,
      itemListElement: SCENARIOS.map((scenario, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: scenario.title,
        description: scenario.lead,
        url: `${PAGE_URL}#${scenario.id}`,
      })),
    },
  ],
};

function Scenario({scenario}) {
  const {id, eyebrow, title, lead, tone, ruled, situation, wrong, phases, after, signals} =
    scenario;

  return (
    <Section id={id} eyebrow={eyebrow} title={title} lead={lead} tone={tone} ruled={ruled}>
      <div className={styles.scenario}>
        <div className={styles.prose}>
          <DescriptionList
            rows={[
              {term: 'The situation', description: situation},
              {term: 'What was wrong', description: wrong},
            ]}
          />
        </div>

        <div className={styles.block}>
          <Eyebrow className={styles.flush}>
            What the migration did, phase by phase
          </Eyebrow>
          <Grid cols={2}>
            {phases.map((phase, i) => (
              <Card
                key={phase.title}
                index={`Phase 0${i + 1}`}
                title={phase.title}>
                {phase.body}
              </Card>
            ))}
          </Grid>
        </div>

        <Grid cols={2}>
          <Card quiet title="What the team could do afterwards">
            <List items={after} />
          </Card>
          <Card quiet title="Signals this is you">
            <List items={signals} />
          </Card>
        </Grid>

        <Eyebrow className={styles.flush}>{MARKER}</Eyebrow>
      </div>
    </Section>
  );
}

export default function CaseStudiesPage() {
  return (
    <Layout
      title="Case studies"
      description="Four illustrative composite scenarios showing how a documentation migration runs, from the estate you start with to what the team can do afterwards.">
      <StructuredData schema={SCHEMA} />
      <PageRail sections={RAIL} />

      <main>
        <PageHeader
          eyebrow="Case studies"
          title="Documentation migration scenarios"
          lead="Every scenario on this page is an illustrative composite. voix does not publish a client name or client work without written consent, so instead of a case study with a logo on it, here is what these engagements look like: the estate at the start, what is wrong with it, the migration phase by phase, and what the team can do afterwards. No company is named. No number is reported."
          facts={[
            {
              label: 'Composite',
              text: 'Each scenario is assembled from patterns that recur across documentation estates, not from one engagement.',
            },
            {
              label: 'No metrics',
              text: 'Nothing here claims a measured result. Outcomes are described as things the team can newly do.',
            },
            {
              label: 'Confidentiality',
              text: (
                <>
                  Client work and client names stay private unless written
                  consent says otherwise. That is{' '}
                  <Link to="/confidentiality/">the confidentiality policy</Link>,
                  not a formality.
                </>
              ),
            },
          ]}
        />

        <Section
          id="why-these-are-composites"
          eyebrow="Read this first"
          title="Why are these case studies composites instead of named clients?"
          lead="Because voix does not publish client names or client work without written consent, and a page of logos is not something this studio is going to fake to make a sale. What it can do is describe the work exactly: the same audit, migration map, architecture, implementation, delivery pipeline and handoff that any engagement is quoted against.">
          <div className={styles.prose}>
            <DescriptionList
              rows={[
                {
                  term: 'What is real',
                  description: (
                    <>
                      The work. Content audit and migration map, information
                      architecture redesign, Docusaurus implementation,
                      versioning, CI/CD publishing, search and navigation,
                      authoring standards, contributor training, governance, QA
                      and redirects, launch and handoff. That is the delivery
                      scope set out on the{' '}
                      <Link to="/services/">services page</Link>, run in the
                      order described on the{' '}
                      <Link to="/process/">process page</Link>.
                    </>
                  ),
                },
                {
                  term: 'What is composite',
                  description:
                    'The company, the page counts, the specific mix of tools and the order in which the complaints arrived. Those are stitched together from patterns that show up again and again in documentation estates, so that the situation is concrete enough to recognise. They do not describe one organisation.',
                },
                {
                  term: 'What is absent',
                  description:
                    'Names, logos, quotes and numbers. There is no testimonial on this page and no percentage, because voix has no published client result to report and an unsourced statistic is decoration, not evidence.',
                },
                {
                  term: 'How to read them',
                  description:
                    'Each scenario runs in the same order: the situation, what was wrong with it, the migration phase by phase, what the team could do afterwards, and a short list of signals that the scenario is describing you. Read the signals first if you are in a hurry.',
                },
              ]}
            />
          </div>
        </Section>

        {SCENARIOS.map((scenario) => (
          <Scenario key={scenario.id} scenario={scenario} />
        ))}

        <Section
          id="what-your-migration-would-look-like"
          eyebrow="Your estate"
          title="What your migration would look like"
          lead="The four scenarios above are composites. Yours does not have to be. Send the setup you actually have and you get back a specific read of it rather than a generic one."
          ruled>
          <div className={styles.closing}>
            <Grid cols={2}>
              <Card index="Send" title="What to send">
                <List
                  items={[
                    'The platform you publish on today, and whether you can produce a full export from it.',
                    'Roughly how many pages are published, and your honest guess at how many are worth keeping.',
                    'Where content lives: one tool, or a wiki plus a drive plus a helpdesk plus a README.',
                    'Whether the documentation is public or gated, versioned, and whether it is translated.',
                    'The date forcing the question: a renewal, a launch, a rebrand, an audit.',
                  ]}
                />
              </Card>
              <Card index="Return" title="What comes back">
                <List
                  items={[
                    'A read of the estate: what moves as it is, what gets rewritten, what gets retired.',
                    'A migration map from your current URLs to their destinations, with redirects accounted for.',
                    'The phase order, and what voix needs from your team at each phase.',
                    'A quote, scoped by documentation volume and implementation complexity.',
                    'A written proposal fixing scope, timeline and fees before any work starts.',
                  ]}
                />
              </Card>
            </Grid>

            <div className={styles.prose}>
              <DescriptionList
                rows={[
                  {
                    term: 'Timing',
                    description: (
                      <>
                        Standard delivery runs within two business weeks of the
                        deposit and the materials voix needs. The phase order
                        behind that number is set out on the{' '}
                        <Link to="/process/">process page</Link>.
                      </>
                    ),
                  },
                  {
                    term: 'Cost',
                    description: (
                      <>
                        A migration is a one-time project fee, quoted per
                        estate. There is no subscription, no per-seat fee and no
                        recurring platform licence — see{' '}
                        <Link to="/pricing/">pricing</Link> for what the fee
                        covers and what the optional add-ons are.
                      </>
                    ),
                  },
                  {
                    term: 'Scope',
                    description: (
                      <>
                        The four services, and where each one stops, are on the{' '}
                        <Link to="/services/">services page</Link>. If your
                        situation looks like more than one scenario above, that
                        is normal: most estates are two of them at once.
                      </>
                    ),
                  },
                  {
                    term: 'Privacy',
                    description:
                      'Nothing you send gets published. If an engagement ever does become a named case study, it is because written consent was given for it, and it will say so on the page.',
                  },
                ]}
              />
            </div>

            <Eyebrow className={styles.flush}>
              The scenarios above end here · the specifics start with your export
            </Eyebrow>
          </div>
        </Section>

        <CallToAction
          id="contact"
          title="Send the setup you actually have"
          lead="Describe your platform, your rough page count and the date forcing the question. You get a migration map back, not a brochure.">
          <Button href={`mailto:${EMAIL}`}>Email {EMAIL}</Button>
          <Button to="/process/" variant="secondary">
            See how an engagement runs
          </Button>
          <Button to="/services/" variant="quiet">
            What voix does
          </Button>
        </CallToAction>
      </main>
    </Layout>
  );
}
