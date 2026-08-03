import {Fragment} from 'react';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Layout from '@theme/Layout';
import {
  Button,
  CallToAction,
  PageHeader,
  PageRail,
  Section,
  StructuredData,
} from '@site/src/components/site';
import styles from './faq.module.css';

const ORIGIN = 'https://www.voix.md';
const PAGE_URL = `${ORIGIN}/faq/`;
const EMAIL = 'mariag@voix.md';

const DESCRIPTION =
  'Direct answers on documentation migration with voix: timing, cost, payment terms, repository ownership, self-hosting and what happens after launch.';

/**
 * One source of truth for the questions.
 *
 * An answer is an array of parts: a plain string, or a {to, text} link. The
 * page renders the parts, and the FAQPage schema below joins the exact same
 * parts into plain text. There is no second copy of the answer anywhere, so
 * the visible answer and the structured one cannot drift apart.
 */
const link = (to, text) => ({to, text});

const GROUPS = [
  {
    id: 'getting-started',
    label: 'Getting started',
    title: 'What voix does and who it is for',
    lead: 'The basics, for anyone arriving here from a search result rather than from a sales conversation.',
    questions: [
      {
        id: 'what-does-voix-do',
        question: 'What does voix do?',
        answer: [
          'voix is a documentation-migration studio that moves product documentation off locked proprietary platforms onto open-source stacks your company owns: Docusaurus, Git, Markdown and CI/CD. The work covers four areas — consolidation and information architecture, modern platform implementation, employee onboarding and enablement, and CI/CD documentation delivery. ',
          link('/services/', 'The services page'),
          ' describes each one in depth.',
        ],
      },
      {
        id: 'who-is-voix-for',
        question: 'Who is voix for?',
        answer: [
          'voix works with product, platform, support and enablement teams at scaleups that are paying for a documentation platform they cannot leave. The usual reason to get in touch is a renewal quote nobody wants to sign, an export that produces unusable HTML, or a documentation set that has outgrown the tool it was started in. Company size matters less than whether the content is trapped.',
        ],
      },
      {
        id: 'first-conversation',
        question: 'What happens in the first conversation with voix?',
        answer: [
          'The first conversation maps where your documentation lives today, how much of it there is, who writes it, and what has to be true on launch day. That becomes a written proposal or statement of work naming the scope, the timeline and the fee before any work starts. Nothing is billed until it is signed. ',
          link('/process/', 'The process page'),
          ' sets out the phases that follow.',
        ],
      },
      {
        id: 'agency-or-person',
        question: 'Is voix an agency or one person?',
        answer: [
          'voix is a studio founded and run by Maria Gilca, a documentation architect based in Moldova and working remotely with clients anywhere. Specialist collaborators join when a project needs them, and access to your material is limited to the people delivering the work. You talk to the person doing the migration rather than to an account manager. ',
          link('/about/', 'More about the studio'),
          '.',
        ],
      },
    ],
  },
  {
    id: 'scope-and-timing',
    label: 'Scope and timing',
    title: 'How long it takes and what it covers',
    lead: 'Timing, deliverables, and the parts of the work that need someone on your side.',
    questions: [
      {
        id: 'how-long-does-a-migration-take',
        question: 'How long does a documentation migration take?',
        answer: [
          'Standard delivery is within two business weeks of voix receiving the deposit and the required materials. That window applies to the scope agreed in the signed proposal; a larger content set, a more complex information architecture or extra implementation work is quoted with its own timeline. The clock starts when the deposit and the materials arrive, not at first contact.',
        ],
      },
      {
        id: 'what-is-included',
        question: 'What is included in a documentation migration?',
        answer: [
          'A migration engagement covers the content audit and migration map, information architecture redesign, Docusaurus implementation, versioning and release workflow, CI/CD publishing setup, search and navigation optimisation, authoring standards and templates, contributor onboarding and training, a governance and ownership model, QA with redirects and link checks, launch support with a handoff playbook, and a post-launch iteration plan. ',
          link('/services/', 'Each area is described on the services page'),
          '.',
        ],
      },
      {
        id: 'what-we-need-from-you',
        question: 'What do you need from our team during the migration?',
        answer: [
          'voix needs access to your current documentation, the exports or credentials named in the proposal, and one person who can approve information architecture decisions. The authors who will maintain the docs afterwards need to be available for the onboarding sessions. Everything else — content cleanup, implementation, redirects, pipeline setup — sits with voix unless the proposal says otherwise.',
        ],
      },
      {
        id: 'old-urls',
        question: 'What happens to our old documentation URLs?',
        answer: [
          'Old URLs are mapped to their new locations and shipped as redirects, so existing links, bookmarks and search results keep working after launch. Redirect mapping, QA and link checks are part of every migration rather than an add-on. Where a page is merged or retired, its redirect points at the closest surviving page instead of dumping the reader on the home page.',
        ],
      },
    ],
  },
  {
    id: 'platform-and-ownership',
    label: 'Platform and ownership',
    title: 'Why open source, and who owns the result',
    lead: 'The questions that decide whether this migration is the last one you have to pay for.',
    questions: [
      {
        id: 'why-open-source',
        question: 'Why migrate to an open-source stack instead of another vendor platform?',
        answer: [
          'An open-source stack removes the exit cost. Your documentation becomes Markdown in a Git repository you control, so changing hosts, themes or tools later is a normal engineering task rather than a renegotiation. Proprietary platforms keep the content in their own format, and their export usually returns the wrapper HTML from the editor instead of clean source you can reuse.',
        ],
      },
      {
        id: 'why-docusaurus',
        question: 'Why Docusaurus?',
        answer: [
          'Docusaurus is the default because it is open source, reads Markdown and MDX, ships versioning and internationalisation, builds to static files with no server to run, and any React developer on your team can already read it. This site runs on it. If a different open-source generator fits your stack better, that is a scoping conversation rather than a refusal.',
        ],
      },
      {
        id: 'who-owns-the-repository',
        question: 'Who owns the repository and the content?',
        answer: [
          'You own the content and the final deliverables in full once the project is paid. voix keeps rights only to its own pre-existing tools, templates and know-how, which are reusable across clients and are never a licence you have to keep paying for. The finished project lives in your own Git account or hosting, not behind a voix login.',
        ],
      },
      {
        id: 'self-hosting-and-running-costs',
        question: 'Can we host the documentation on our own infrastructure?',
        answer: [
          'Yes. A Docusaurus build is a folder of static HTML, CSS and JavaScript, so it runs on your own servers, on an internal network, or on any static host such as GitHub Pages, Netlify or Cloudflare Pages. There is no voix-hosted component and no platform licence, so the only running cost is whatever your chosen host charges, billed directly to you.',
        ],
      },
      {
        id: 'if-we-leave',
        question: 'What happens if we want to stop working with voix?',
        answer: [
          'You keep everything, and nothing stops working. The documentation is Markdown in your repository, the publishing pipeline is standard CI/CD configuration, and the platform is open source, so another team or another vendor can pick it up without an export request or a second migration project. Handoff is built for exactly that: templates, authoring standards and a written playbook ship with the site.',
        ],
      },
    ],
  },
  {
    id: 'cost-and-terms',
    label: 'Cost and terms',
    title: 'What it costs and how the contract works',
    lead: 'Pricing is a custom quote, but the shape of the agreement is the same every time.',
    questions: [
      {
        id: 'how-much-does-it-cost',
        question: 'How much does a documentation migration cost?',
        answer: [
          'A documentation migration is a custom quote: a one-time fee scoped by documentation volume, complexity and implementation requirements. There is no subscription, no per-seat fee and no recurring platform licence, so the cost stops when the project ships. ',
          link('/pricing/', 'The pricing page'),
          ' sets out what the fee covers and how a quote is put together.',
        ],
      },
      {
        id: 'how-payment-works',
        question: 'How does payment work?',
        answer: [
          'Payment is split in two: 50% deposit at contract signing and 50% on delivery. Delivery runs to the scope in the signed proposal, and standard turnaround is two business weeks from the deposit and the materials arriving. Late payment carries a 5% daily fee, and out-of-scope requests are only picked up once they are approved in writing.',
        ],
      },
      {
        id: 'interventions-package',
        question: 'What is the 5 interventions package?',
        answer: [
          'The 5 interventions package is an optional add-on covering five post-launch maintenance interventions for fixes and minor documentation updates, at a small extra cost on top of the migration fee. It exists for teams who want a safety net during the first weeks of running the site themselves. It is not a retainer and not a support subscription.',
        ],
      },
      {
        id: 'if-something-breaks',
        question: 'What happens if something breaks after launch?',
        answer: [
          'Bugs that voix introduced are fixed at no charge. Defects caused by changes your team made after handoff are quoted case by case and capped at 500 EUR, so there is a ceiling on the surprise. Anything that is new work rather than a fix goes through the out-of-scope route: a written estimate first, your written approval second.',
        ],
      },
    ],
  },
  {
    id: 'after-launch',
    label: 'After launch',
    title: 'Who runs the documentation afterwards',
    lead: 'A migration only works if the team can keep publishing without calling anyone.',
    questions: [
      {
        id: 'who-maintains-it',
        question: 'Who maintains the documentation after handoff?',
        answer: [
          'Your team maintains it, which is the entire point of the handoff. Authors write Markdown, open a pull request, get a review, and the pipeline publishes. The governance model that ships with the site names who owns each section, who reviews changes and what the quality baseline is, so maintenance is a defined job rather than whoever happens to remember.',
        ],
      },
      {
        id: 'how-authors-are-trained',
        question: 'How do you train our authors?',
        answer: [
          'Training is hands-on with your own content: authors learn the editing workflow, the templates, the review step and the publishing pipeline by shipping real pages. Contributor onboarding is part of every migration rather than an extra, and ',
          link('/docs/', 'the migration handbook'),
          ' documents the same workflow so people who join later can get up to speed on their own.',
        ],
      },
      {
        id: 'does-voix-keep-a-copy',
        question: 'Does voix keep a copy of our documentation?',
        answer: [
          'voix retains a copy of the initial delivered project for one year, after which the project lives on your Git account or your own hosting. Confidential material is used only to deliver the services, and access is limited to collaborators who need it. voix publishes neither your name nor your project without written consent, and returns or deletes materials on request.',
        ],
      },
    ],
  },
];

/** The plain-text form of an answer, built from the same parts the page renders. */
const plainAnswer = (parts) =>
  parts.map((part) => (typeof part === 'string' ? part : part.text)).join('');

const ALL_QUESTIONS = GROUPS.flatMap((group) => group.questions);

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faqpage`,
      url: PAGE_URL,
      name: 'Documentation migration FAQ',
      description: DESCRIPTION,
      inLanguage: 'en',
      isPartOf: {'@id': `${ORIGIN}/#website`},
      publisher: {'@id': `${ORIGIN}/#organization`},
      about: {'@id': `${ORIGIN}/#organization`},
      mainEntity: ALL_QUESTIONS.map(({id, question, answer}) => ({
        '@type': 'Question',
        '@id': `${PAGE_URL}#${id}`,
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: plainAnswer(answer),
          url: `${PAGE_URL}#${id}`,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumbs`,
      itemListElement: [
        {'@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/`},
        {'@type': 'ListItem', position: 2, name: 'FAQ', item: PAGE_URL},
      ],
    },
  ],
};

function Answer({parts}) {
  return (
    <p className={styles.answer}>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          <Fragment key={i}>{part}</Fragment>
        ) : (
          <Link key={part.to} to={part.to}>
            {part.text}
          </Link>
        ),
      )}
    </p>
  );
}

function Question({id, question, answer}) {
  // Register the anchor so Docusaurus's broken-anchor check knows it exists;
  // a bare `id` attribute in the HTML is invisible to it.
  useBrokenLinks().collectAnchor(id);
  return (
    <article className={styles.qa}>
      <h3 className={styles.question} id={id}>
        {question}
      </h3>
      <Answer parts={answer} />
    </article>
  );
}

function QuestionList({questions}) {
  return (
    <div className={styles.qaList}>
      {questions.map((q) => (
        <Question key={q.id} {...q} />
      ))}
    </div>
  );
}

export default function FaqPage() {
  return (
    <Layout title="Documentation migration FAQ" description={DESCRIPTION}>
      <StructuredData schema={SCHEMA} />
      <PageRail sections={GROUPS.map(({id, label}) => ({id, label}))} />

      <main>
        <PageHeader
          eyebrow="FAQ"
          title="Documentation migration questions, answered"
          lead="Straight answers about what a documentation migration costs, how long it takes, what your team has to do, and who owns the result. Every answer here is the one you would get on a call."
          facts={[
            {
              label: 'Delivery',
              text: 'Two business weeks from the deposit and the materials, for the scope in the signed proposal.',
            },
            {
              label: 'Fee',
              text: 'A one-time custom quote. No subscription, no per-seat fee, no platform licence.',
            },
            {
              label: 'Ownership',
              text: 'You own the content and the deliverables in full once the project is paid.',
            },
          ]}>
          <nav className={styles.jump} aria-label="Question groups">
            {GROUPS.map(({id, label}) => (
              <a className={styles.jumpLink} href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </nav>
        </PageHeader>

        {GROUPS.map((group, i) => (
          <Section
            key={group.id}
            id={group.id}
            eyebrow={group.label}
            title={group.title}
            lead={group.lead}
            tone={i % 2 === 1 ? 'paper' : undefined}>
            <QuestionList questions={group.questions} />
          </Section>
        ))}

        <Section id="where-the-answers-come-from" tone="sunk" narrow>
          <p className={styles.answer}>
            Nothing on this page is a hidden term. The commercial answers come
            from the <Link to="/terms/">terms and conditions</Link> and the{' '}
            <Link to="/confidentiality/">confidentiality policy</Link>; the
            delivery answers come from{' '}
            <Link to="/process/">the process</Link> and{' '}
            <Link to="/services/">the services</Link>. If the question you need
            answered is missing, send it and it gets added here.
          </p>
        </Section>

        <CallToAction
          title="Still have a question?"
          lead="Send your current platform and roughly how many pages you have. You get back a written scope, a timeline and a fee.">
          <Button href={`mailto:${EMAIL}`}>Email {EMAIL}</Button>
          <Button to="/pricing/" variant="secondary">
            See pricing
          </Button>
          <Button to="/case-studies/" variant="quiet">
            Read the before and after
          </Button>
        </CallToAction>
      </main>
    </Layout>
  );
}
