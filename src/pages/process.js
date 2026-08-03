import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {
  Button,
  ButtonRow,
  CallToAction,
  Card,
  DescriptionList,
  Grid,
  List,
  PageHeader,
  PageRail,
  Section,
  StructuredData,
} from '@site/src/components/site';
import styles from './process.module.css';

const ORIGIN = 'https://www.voix.md';

/**
 * The seven phases, defined once. The visible sections, the phase index and
 * the HowTo steps in the structured data are all generated from this array, so
 * the schema can never drift from the page a reader actually sees.
 */
const PHASES = [
  {
    n: '01',
    id: 'audit',
    label: 'Content audit and migration map',
    title: 'Count what you have before you move any of it',
    lead: 'Nothing gets migrated until every existing page has a row in a spreadsheet and a decision written next to it.',
    summary:
      'Inventory every existing page with its owner, last meaningful edit and traffic, then mark each one keep, merge, rewrite or retire. The output is a content inventory and a migration map from every current URL to its destination.',
    happens: (
      <>
        <p>
          We pull the current platform into one inventory: one row per page,
          with its URL, title, section, owner, the date of its last meaningful
          edit, its traffic if you have analytics, and a decision. The decision
          is one of four words: keep, merge, rewrite, retire. The export is read
          as data rather than as a website, so pages that no navigation reaches
          still show up in the count.
        </p>
        <p>Four things are worth looking for by name:</p>
        <List
          items={[
            'Duplicates. The same procedure written three times, in three tones, giving three different answers.',
            'Orphans. Pages nothing links to and no menu reaches, still indexed and still wrong.',
            'Stale pages. Screenshots of a screen that shipped two releases ago, endpoints that were deprecated, numbers that changed.',
            'Undocumented features. Behaviour that exists in the changelog and in support replies but has no page at all.',
          ]}
        />
        <p>
          Retire is a real option and it is used. A page nobody opens and nobody
          will own is cheaper to delete and redirect than to carry into a new
          platform and maintain forever.
        </p>
      </>
    ),
    needs: [
      'An export of the current platform, or read access to it.',
      'Analytics access if you have it. Six to twelve months of page views changes what is worth keeping.',
      'A named owner per product area who can settle a keep-or-cut disagreement in one message.',
      'Your top support questions, or access to the ticket queue, so gaps surface now instead of after launch.',
    ],
    ends: [
      'A content inventory: one row per page, with owner, decision and destination.',
      'A migration map from every current URL to its new path, its merge target, or a redirect.',
      'A gap list: the features and questions your documentation does not currently answer.',
      <span key="scope">
        A page count and a complexity read, which is what the{' '}
        <Link to="/pricing/">quote</Link> is scoped against.
      </span>,
    ],
  },
  {
    n: '02',
    id: 'architecture',
    label: 'Information architecture',
    title: 'Decide where everything lives, once',
    lead: 'The structure is agreed and signed off before a single page is converted, because moving a page twice costs more than deciding once.',
    summary:
      'Define content types and templates, file and URL naming, the navigation model and a controlled vocabulary, then get the top-level structure approved before any content moves.',
    happens: (
      <>
        <p>
          Documentation is separated into content types, and each type gets a
          template: concept, task, reference, tutorial, troubleshooting, release
          note. A task page and a reference page are different shapes, and
          mixing them is the reason pages grow long and stop being findable.
        </p>
        <p>Then the conventions that keep the structure stable:</p>
        <List
          items={[
            'Naming. One pattern for file names, directory names and page titles, so a new page has an obvious place to go.',
            'Navigation. A sidebar organised around what a reader is trying to do, not around which team wrote the page.',
            'URLs. A scheme that survives a reorganisation, because every URL you publish is a promise to someone.',
            'Controlled vocabulary. One agreed word per concept and a list of the synonyms you are retiring. Search fails when one feature has three names.',
          ]}
        />
        <p>
          Versioning boundaries are decided here too: whether readers need older
          versions at all, which version is the default, and how far back
          support goes.
        </p>
      </>
    ),
    needs: [
      'Two hours with someone who knows the product taxonomy well enough to argue about it.',
      'A final decision on product and feature naming, including the names you are dropping.',
      'Approval of the top-level navigation. This is the one sign-off that blocks the build.',
      'A view on versioning: who still reads the previous version, and why.',
    ],
    ends: [
      'An approved navigation tree, specified down to the second level.',
      'A template per content type, listing the sections each type must contain.',
      'Naming and URL conventions, written down rather than remembered.',
      'A terminology list: preferred term, retired synonyms, and how each one is capitalised.',
    ],
  },
  {
    n: '03',
    id: 'implementation',
    label: 'Open-source platform build',
    title: 'Build the platform inside a repository you own',
    lead: 'Docusaurus, in your Git repository, on your hosting, at your domain, standing up before any content lands in it.',
    summary:
      'Stand up Docusaurus in your own repository: a directory tree that mirrors the agreed architecture, theming through design tokens, search, versioning and reusable content blocks, running on a staging URL before content arrives.',
    happens: (
      <>
        <p>
          The platform is Docusaurus: Markdown and MDX in Git, built to static
          files. The repository is yours from the first commit rather than
          transferred at the end, so there is never a moment where the work
          lives somewhere you cannot reach.
        </p>
        <List
          items={[
            'Repository structure. A docs tree that mirrors the approved navigation, so the file path and the published URL are the same thought.',
            'Theming. Your brand applied through CSS custom properties and component slots instead of a fork, which keeps a Docusaurus upgrade an ordinary pull request.',
            'Search. Configured and tested against your real titles and headings, because most of what people call a search problem is a structure problem.',
            'Versioning. A current version that is writable and older versions frozen, or no versioning at all when the product does not need it.',
            'Reusable blocks. Admonitions, tabbed code samples and shared snippets, so a value that changes gets changed in one file.',
          ]}
        />
        <p>
          Nothing in the stack is proprietary and nothing is licensed per seat.
          Every dependency is open source and every configuration file sits in
          the repository you own. The{' '}
          <Link to="/docs/">migration handbook</Link> walks through how the
          pieces fit together if you want to build it yourself.
        </p>
      </>
    ),
    needs: [
      'A repository, and a decision on where the site is built and hosted.',
      'The domain or subdomain, and someone who can change DNS records.',
      'Brand assets: logo files, colour values, and web fonts you are licensed to use.',
      'A decision on whether the documentation is public or sits behind authentication.',
    ],
    ends: [
      'A running site on a staging URL, built from your repository by your pipeline.',
      'Navigation, search, theming and versioning working, with content still to come.',
      'A local development setup your engineers can run themselves, documented in the repository.',
      'A dependency list with no proprietary platform in it.',
    ],
  },
  {
    n: '04',
    id: 'migration',
    label: 'Conversion, redirects and QA',
    title: 'Convert the content and keep every old link working',
    lead: 'The pages move, the vendor markup does not, and every URL you have ever published still resolves to something useful.',
    summary:
      'Convert pages to Markdown, rebuild tables, code blocks and images, add front matter, map every old URL to a redirect target, then run link checks and a page-by-page QA pass against the migration map.',
    happens: (
      <>
        <p>
          Pages become Markdown or MDX. Wrapper markup, inline styles and editor
          artefacts are dropped rather than translated. Tables and code blocks
          are rebuilt as real tables and real code blocks. Images are
          re-exported, renamed to match the page they belong to and referenced
          by relative path. Front matter is added to every file: title,
          description, sidebar position, slug.
        </p>
        <p>
          Then the part that decides whether your readers ever notice the
          migration happened:
        </p>
        <List
          items={[
            'Redirects. Every old URL maps to its new page or to the nearest genuinely useful parent. Nothing gets redirected to the home page.',
            'Internal links. Rewritten as relative paths so the build itself can verify them.',
            'Link checking. A broken internal link or a broken anchor fails the build, which means it cannot reach production quietly.',
            'QA. Every page opened, every code sample rendered, every image loaded, every sidebar entry checked back against the migration map.',
          ]}
        />
        <p>
          Bookmarks, inbound links from other sites and search results all still
          point at the old URLs. Redirects are the only thing keeping those
          people from a 404, which is why this phase is not left until last.
        </p>
      </>
    ),
    needs: [
      'Sign-off on the keep, merge and retire decisions from the audit.',
      'A redirect owner: someone who can apply rules where they actually take effect, whether that is the CDN, the old platform or the new host.',
      'Subject-matter review for the pages marked rewrite and for anything the gap list added.',
      'A decision on the old platform: switched to read-only, or kept live until the redirect window closes.',
    ],
    ends: [
      'Your content in Git, in Markdown, in the structure you approved.',
      'A redirect map, applied and tested against the full list of old URLs.',
      'A build that passes internal link and anchor checks.',
      'A QA log recording what was checked, what was fixed and what was deliberately left out of scope.',
    ],
  },
  {
    n: '05',
    id: 'enablement',
    label: 'Author and reviewer training',
    title: 'Train the people who will write the next page',
    lead: 'A migration only voix can maintain has not finished. Authors publish a real page during training, not a practice one.',
    summary:
      'Run working sessions where every author branches, writes, previews and merges a real page, and write down the authoring standards, templates and review rubric the team will use after handoff.',
    happens: (
      <>
        <p>
          Training is a working session rather than a lecture. Each author
          brings a page that genuinely needs writing and, during the session,
          creates a branch, writes it in Markdown, previews the rendered result,
          opens a pull request, takes a review and merges it. The first pull
          request is the one people remember, so it happens with someone in the
          room.
        </p>
        <List
          items={[
            'Authoring standards. Voice, sentence case, when to use each content type, how to name a file, how a page joins the sidebar, how screenshots are taken and stored.',
            'A review rubric, so review is about accuracy, structure and terminology instead of commas.',
            'Publishing guidelines. What needs review, what needs product sign-off, and what an author can merge alone.',
            'Escalation. Who decides when a page does not fit any template.',
          ]}
        />
        <p>
          Writers who have never touched Git get the same session. The workflow
          is taught through the browser editor first and the command line only
          for the people who want it.
        </p>
      </>
    ),
    needs: [
      'A list of authors and reviewers, with repository access granted before the session rather than during it.',
      'Ninety uninterrupted minutes of their calendar.',
      'One reviewer per team who agrees to be the first point of review.',
      'A real page per author that needs writing anyway.',
    ],
    ends: [
      'Authors who have each merged at least one page under their own name.',
      'A contributing guide in the repository, next to the content it describes.',
      'A copy-ready template for every content type.',
      'A review checklist your reviewers have actually agreed to.',
    ],
  },
  {
    n: '06',
    id: 'ci-cd',
    label: 'Review gates and publishing pipeline',
    title: 'Automate the checks so review can be about the content',
    lead: 'Every pull request builds the site, checks the links and produces a preview URL. Merging publishes. Rolling back is a revert.',
    summary:
      'Wire the publishing pipeline: build, link check and terminology check on every pull request, a preview deployment for reviewers, required checks and reviews before merge, automatic publishing on merge and a revert-based rollback.',
    happens: (
      <>
        <p>
          The pipeline runs in whatever CI your engineering team already uses.
          Documentation gets the same delivery discipline as code because it now
          lives in the same place as code.
        </p>
        <List
          items={[
            'On every pull request. The site builds, internal links and anchors are checked, and the terminology list from the architecture phase is enforced.',
            'Preview deployments. Reviewers read the rendered page instead of the diff, which is the difference between a review and an approval.',
            'Branch protection. Required checks and required review before anything reaches the default branch.',
            'On merge. The site builds and publishes itself. Nobody copies files onto a server.',
            'Rollback. A revert. The previous state of the documentation is always one commit away.',
          ]}
        />
        <p>
          This is the phase that stops the other six decaying. Once publishing
          is a merge, updating the documentation stops being a project.{' '}
          <Link to="/services/">CI/CD documentation delivery</Link> can also be
          bought on its own if your content is already in Git.
        </p>
      </>
    ),
    needs: [
      'Permissions on the repository and its CI, including the ability to set branch protection.',
      'A decision on who can approve and who can merge.',
      'Deploy tokens and any search API keys, placed in the repository secret store by someone authorised to hold them.',
      'Agreement from engineering on where documentation builds run, so the pipeline is not a surprise to them.',
    ],
    ends: [
      'Required, passing checks on every pull request.',
      'A preview URL attached to every pull request.',
      'Publishing on merge, with a documented rollback.',
      'The pipeline definition in your repository, readable and editable by your own team.',
    ],
  },
  {
    n: '07',
    id: 'handoff',
    label: 'Ownership, governance and handoff',
    title: 'Hand over ownership, and mean it',
    lead: 'The engagement ends with named owners, a written governance model and a playbook covering everything you would otherwise have to email us about.',
    summary:
      'Record named owners per area of the documentation, agree governance for new pages and structural changes, deliver a handoff playbook covering local setup, theming, versions, redirects and deploys, and optionally hold five post-launch interventions in reserve.',
    happens: (
      <>
        <p>
          Ownership is recorded in the repository, per area of the documentation
          tree, so a pull request reaches the person able to judge it.
          Governance answers the questions that get argued about six months
          later: how a new page is proposed, who approves a change to the
          navigation, when the terminology list is updated, and how often each
          section is reviewed for staleness.
        </p>
        <p>
          The handoff playbook is written for the person who joins your team
          next year:
        </p>
        <List
          items={[
            'How to run the site locally and where every configuration file lives.',
            'How to add a page, a section, or a whole new version.',
            'How to change theming without forking the theme.',
            'How to add a redirect and how to prove it works.',
            'How to read a failed build and how to roll a deployment back.',
          ]}
        />
        <p>
          The five interventions package is optional and costs a small extra
          amount on top of the project fee. It covers five post-launch
          maintenance interventions for fixes and minor updates, which is worth
          having in the first months when the awkward questions are still
          arriving. It is described in full on the{' '}
          <Link to="/pricing/">pricing page</Link>.
        </p>
      </>
    ),
    needs: [
      'Named owners per documentation area, with the authority that implies.',
      'A decision on the optional five interventions package.',
      'A date for the handoff walkthrough, with those owners actually in the room.',
      'Confirmation that your team can build, preview and deploy the site without us on the call.',
    ],
    ends: [
      'A documentation platform running in your repository, under your ownership.',
      'A governance model with named owners and a review cadence.',
      'A handoff playbook, checked into the repository next to the site it describes.',
      'Five post-launch interventions held in reserve, if you took the package.',
    ],
  },
];

const RAIL_SECTIONS = [
  {id: 'phases', label: 'The sequence'},
  {id: 'audit', label: '01 Audit'},
  {id: 'architecture', label: '02 Architecture'},
  {id: 'implementation', label: '03 Implementation'},
  {id: 'migration', label: '04 Migration'},
  {id: 'enablement', label: '05 Enablement'},
  {id: 'ci-cd', label: '06 CI/CD'},
  {id: 'handoff', label: '07 Handoff'},
  {id: 'what-we-need-from-you', label: 'What we need'},
  {id: 'how-long-does-a-documentation-migration-take', label: 'How long it takes'},
];

const CHECKLIST = [
  {
    title: 'Access',
    items: [
      'An export of the current platform, or read access to it.',
      'A Git repository, and CI permissions including branch protection.',
      'DNS access for the domain or subdomain the documentation will live at.',
      'Analytics, if you have it.',
      'The support ticket queue, or a list of the questions it keeps answering.',
    ],
  },
  {
    title: 'Decisions',
    items: [
      'Final product and feature naming, including the names you are retiring.',
      'Approval of the top-level navigation.',
      'Sign-off on the keep, merge and retire list from the audit.',
      'Public documentation or authenticated documentation.',
      'Who can approve a documentation change, and who can merge it.',
    ],
  },
  {
    title: 'People and time',
    items: [
      'A named owner per product area who can settle a disagreement.',
      'Two hours for the information architecture session.',
      'Ninety minutes for the author and reviewer training.',
      'A subject-matter reviewer for pages marked rewrite.',
      'Authors and reviewers with repository access granted in advance.',
    ],
  },
  {
    title: 'Materials',
    items: [
      'Logo files, colour values and licensed web fonts.',
      'Anything living outside the platform: internal wikis, PDFs, support macros, README files, shared documents.',
      'API specifications or generated reference output, if the docs include reference material.',
      'Anything under NDA flagged as such before it is sent.',
    ],
  },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HowTo',
      '@id': `${ORIGIN}/process/#howto`,
      name: 'How a documentation migration works',
      description:
        'The seven phases of a documentation migration off a proprietary platform onto an open-source stack the client owns: content audit, information architecture, platform implementation, content migration, author enablement, CI/CD delivery and handoff.',
      /* No totalTime. The two-week figure is a commercial delivery SLA — two
         business weeks, measured from the deposit and the materials, for the
         scope a proposal names — and larger consolidations get their own
         timeline. The method itself has no fixed duration to declare. */
      provider: {'@id': `${ORIGIN}/#organization`},
      inLanguage: 'en',
      mainEntityOfPage: {'@id': `${ORIGIN}/process/`},
      supply: [
        'An export of, or read access to, the current documentation platform',
        'A Git repository and CI permissions',
        'DNS access for the documentation domain',
        'A named owner per product area',
        'Authors and reviewers with repository access',
        'Brand assets and licensed web fonts',
      ].map((name) => ({'@type': 'HowToSupply', name})),
      tool: ['Docusaurus', 'Git', 'Markdown', 'A CI/CD pipeline'].map((name) => ({
        '@type': 'HowToTool',
        name,
      })),
      step: PHASES.map((phase, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: phase.title,
        text: phase.summary,
        url: `${ORIGIN}/process/#${phase.id}`,
      })),
    },
    {
      '@type': 'WebPage',
      '@id': `${ORIGIN}/process/`,
      url: `${ORIGIN}/process/`,
      name: 'How a documentation migration works',
      description:
        'The seven phases of a voix documentation migration, what each phase needs from the client, and what exists at the end of it.',
      isPartOf: {'@id': `${ORIGIN}/#website`},
      about: {'@id': `${ORIGIN}/#organization`},
      mainEntity: {'@id': `${ORIGIN}/process/#howto`},
      breadcrumb: {'@id': `${ORIGIN}/process/#breadcrumb`},
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${ORIGIN}/process/#breadcrumb`,
      itemListElement: [
        {'@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/`},
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Process',
          item: `${ORIGIN}/process/`,
        },
      ],
    },
  ],
};

export default function ProcessPage() {
  return (
    <Layout
      title="How a documentation migration works"
      description="The seven phases of a documentation migration: audit, architecture, implementation, migration, enablement, CI/CD and handoff, and what each needs from you.">
      <StructuredData schema={SCHEMA} />
      <PageRail sections={RAIL_SECTIONS} />

      {/* <main> opens at the page header and closes after the CTA: Docusaurus
          points its skip link at main:first-of-type, so anything left outside
          it sits in front of "Skip to main content". */}
      <main>
        <PageHeader
          eyebrow="Process"
          title="How a documentation migration works"
          lead="A documentation migration runs in seven phases: content audit, information architecture, platform implementation, content migration, author enablement, CI/CD delivery and handoff. This page describes each one — what happens, what we need from you, and what exists when it ends — in enough detail to follow the method whether or not you hire voix to run it."
          facts={[
            {
              label: 'Seven phases',
              text: 'Run in order. Each one ends in something you can open and inspect.',
            },
            {
              label: 'Standard delivery',
              text: 'Within two business weeks of the deposit and the required materials arriving.',
            },
            {
              label: 'Ownership',
              text: 'On full payment you own the deliverables: the repository, the content and the pipeline.',
            },
          ]}
        />

        <Section
          id="phases"
          tone="paper"
          eyebrow="The sequence"
          title="What are the phases of a documentation migration?"
          lead="A documentation migration has seven phases: audit the existing content, redesign the information architecture, build the open-source platform, convert the content and map the redirects, train the authors, automate the review and publishing pipeline, then hand over ownership. Each phase depends on the one before it, so they run in order rather than in parallel.">
          <ol className={styles.sequence}>
            {PHASES.map((phase) => (
              <li key={phase.id} className={styles.sequenceItem}>
                <a className={styles.sequenceLink} href={`#${phase.id}`}>
                  <span className={styles.sequenceNum}>{phase.n}</span>
                  <span className={styles.sequenceLabel}>{phase.label}</span>
                  <span className={styles.sequenceText}>{phase.summary}</span>
                </a>
              </li>
            ))}
          </ol>
          <p className={styles.clayAside}>
            The phases map onto the four things voix sells. Consolidation and
            information architecture covers phases one and two, platform
            implementation covers three and four, enablement covers five, and
            CI/CD delivery covers six. The seventh, handoff, is how every
            engagement closes. The{' '}
            <Link to="/services/">services page</Link> describes each service as
            a piece of work you can buy on its own.
          </p>
        </Section>

        {PHASES.map((phase) => (
          <Section
            key={phase.id}
            id={phase.id}
            ruled
            narrow
            eyebrow={`Phase ${phase.n} / ${phase.label}`}
            title={phase.title}
            lead={phase.lead}>
            <DescriptionList
              rows={[
                {
                  term: 'What happens',
                  description: (
                    <div className={styles.prose}>{phase.happens}</div>
                  ),
                },
                {
                  term: 'What we need from you',
                  description: <List items={phase.needs} />,
                },
                {
                  term: 'What exists at the end',
                  description: <List items={phase.ends} />,
                },
              ]}
            />
            {phase.id === 'handoff' && (
              <p className={styles.clayAside}>
                Two commercial facts belong in this phase. On full payment you
                own the final deliverables, while voix keeps the rights to its
                own pre-existing tools, templates and know-how. voix also
                retains a copy of the initial delivered project for one year,
                after which the project lives on your Git account or your own
                hosting.
              </p>
            )}
          </Section>
        ))}

        <Section
          id="what-we-need-from-you"
          tone="paper"
          ruled
          eyebrow="Your side of the work"
          title="What we need from you"
          lead="Delivery is measured from the day the deposit and the required materials arrive, so this checklist is the part of the timeline you control completely. Most of it can be gathered before the proposal is even signed.">
          <Grid cols={2}>
            {CHECKLIST.map((group) => (
              <Card key={group.title} title={group.title}>
                <List items={group.items} />
              </Card>
            ))}
          </Grid>
          <p className={styles.clayAside}>
            Everything you send is used only to deliver the work, and access is
            limited to the people who need it. Nothing about your project is
            published or named without your written consent. The{' '}
            <Link to="/confidentiality/">confidentiality policy</Link> sets that
            out in full.
          </p>
        </Section>

        <Section
          id="how-long-does-a-documentation-migration-take"
          ruled
          narrow
          eyebrow="Timing"
          title="How long does a documentation migration take?"
          lead="Standard delivery is within two business weeks, measured from the day the deposit and the required materials arrive — not from the first conversation, and not from the day the proposal is signed.">
          <DescriptionList
            rows={[
              {
                term: 'When the clock starts',
                description:
                  'The two business weeks begin once the 50% deposit is received and the materials in the checklist above are in our hands. Work always runs under a written proposal or statement of work that fixes scope, timeline and fees before anything begins.',
              },
              {
                term: 'What that covers',
                description:
                  'A scoped migration: the seven phases above, applied to the volume of content the proposal names. The remaining 50% is due on delivery.',
              },
              {
                term: 'What is scoped separately',
                description:
                  'Larger consolidations are scoped individually. Several platforms merging into one, multiple products or maintained versions, or a volume of content nobody could review inside two weeks all get their own timeline written into the proposal. We would rather quote a longer timeline than miss a short one.',
              },
              {
                term: 'What moves the date',
                description: (
                  <List
                    items={[
                      'Access that has not been granted yet: repository, CI, DNS, analytics.',
                      'Navigation approval waiting on a decision maker who was never brought into the loop.',
                      'Subject-matter review of rewritten pages queued behind a product release.',
                      'Out-of-scope requests, which need written approval before they are picked up.',
                    ]}
                  />
                ),
              },
              {
                term: 'What it does not depend on',
                description:
                  'Platform licences, vendor support tickets and export windows. The stack is open source, so no part of the timeline is spent waiting for permission from a supplier.',
              },
            ]}
          />
          <div className={styles.trailer}>
            <ButtonRow>
              <Button to="/pricing/" variant="secondary">
                How pricing and quoting work
              </Button>
              <Button to="/services/" variant="quiet">
                What each phase covers as a service
              </Button>
            </ButtonRow>
          </div>
        </Section>

        <CallToAction
          title="Start with the audit"
          lead="Tell us what platform you are on, roughly how many pages it holds and who owns them. You get back a scope, a phase plan and a quote.">
          <Button href="mailto:mariag@voix.md">Email mariag@voix.md</Button>
          <Button to="/pricing/" variant="secondary">
            See pricing
          </Button>
          <Button to="/docs/" variant="quiet">
            Read the migration handbook
          </Button>
        </CallToAction>
      </main>
    </Layout>
  );
}
