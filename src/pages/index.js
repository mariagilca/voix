import {useEffect, useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const marqueeItems = [
  'Scaleups',
  'Product Teams',
  'Support Ops',
  'Platform Engineering',
  'Enablement',
  'Developer Relations',
  'Compliance Teams',
  'Knowledge Management',
  'Customer Education',
];

const useCases = [
  {
    id: 'marketing',
    label: 'Product Marketing',
    title: 'Ship a docs story people understand.',
    description:
      'Turn migration complexity into clear messaging with structured release narratives and reusable visual assets.',
    features: ['Migration narrative kit', 'Launch messaging templates', 'Before/after proof points'],
    metric: 'Up to 2x faster launch communication',
  },
  {
    id: 'product',
    label: 'Product + Engineering',
    title: 'Keep delivery moving while docs modernize.',
    description:
      'Implement migration and publishing standards that fit engineering workflows, versioning, and review gates.',
    features: ['CI/CD publishing model', 'Version-safe structure', 'Contributor workflow standards'],
    metric: 'Less migration friction across squads',
  },
  {
    id: 'support',
    label: 'Support + Success',
    title: 'Give customers one trusted source.',
    description:
      'Consolidate support material and internal notes into one searchable system with accountable ownership.',
    features: ['Unified help architecture', 'Search-first navigation', 'Ownership and update cadence'],
    metric: 'Fewer repeated support escalations',
  },
  {
    id: 'enablement',
    label: 'Enablement + Training',
    title: 'Onboard teams with operational clarity.',
    description:
      'Standardize how teams write, review, and publish so migration results remain durable after handoff.',
    features: ['Publishing playbooks', 'Author enablement sessions', 'Governance checkpoints'],
    metric: 'Faster onboarding for new contributors',
  },
];

const bentoCards = [
  {
    kicker: 'No lock-in',
    title: 'Own your docs platform',
    body: 'One-time migration delivery. No recurring platform tax for basic publishing.',
  },
  {
    kicker: 'Minutes, not weeks',
    title: 'Modernize navigation fast',
    body: 'Restructure content and navigation with pragmatic, release-safe increments.',
  },
  {
    kicker: 'Quality control',
    title: 'Codify review workflows',
    body: 'Build consistent review standards with CI checks and approval gates.',
  },
  {
    kicker: 'Always current',
    title: 'Keep docs synchronized',
    body: 'Ensure documentation evolves with product releases through workflow automation.',
  },
  {
    kicker: 'Distribution',
    title: 'Publish anywhere',
    body: 'Ship to web, changelog, and internal hubs from one source of truth.',
  },
  {
    kicker: 'Operational visibility',
    title: 'Measure doc adoption',
    body: 'Track usage patterns and improve structure where readers struggle.',
  },
];

const integrations = [
  'GitHub',
  'GitLab',
  'Linear',
  'Jira',
  'Slack',
  'Notion',
  'HubSpot',
  'Segment',
  'Google Analytics',
  'PostHog',
  'Intercom',
  'Zendesk',
];

const testimonials = [
  {
    quote:
      'Voix gave us an operating model, not just a migration. Our docs finally match how our product ships.',
    name: 'Nora Chen',
    role: 'Head of Product Marketing',
    stat: '2x',
    statLabel: 'faster launch narrative delivery',
  },
  {
    quote:
      'The CI/CD publishing setup removed risk from releases. Engineers and support now trust the same source.',
    name: 'Diego Alvarez',
    role: 'Director of Platform Engineering',
    stat: '0',
    statLabel: 'recurring platform lock-in fees',
  },
  {
    quote:
      'Onboarding authors used to be chaotic. Now contributors can publish correctly in their first week.',
    name: 'Mina Park',
    role: 'Enablement Lead',
    stat: '5',
    statLabel: 'interventions included post-launch',
  },
];

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const [activeUseCase, setActiveUseCase] = useState(useCases[0].id);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const currentUseCase = useMemo(
    () => useCases.find((item) => item.id === activeUseCase) || useCases[0],
    [activeUseCase],
  );

  const currentTestimonial = testimonials[activeTestimonial];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <Layout
      title="Voix | Documentation Migration"
      description="Arcade-inspired homepage for Voix documentation migration services."
      wrapperClassName={`${styles.homeWrapper} home-page-wrapper`}>
      <div className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroGradientA} aria-hidden="true" />
          <div className={styles.heroGradientB} aria-hidden="true" />
          <div className="container">
            <div className={styles.announcement}>Documentation-first studio. Arcade-grade homepage language.</div>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.kicker}>Open-source documentation migration</p>
                <Heading as="h1" className={styles.heroTitle}>
                  Bring your documentation story <span>to life in minutes.</span>
                </Heading>
                <p className={styles.heroSubtitle}>
                  {siteConfig.title} helps teams move from locked platforms to documentation systems they own.
                  We consolidate content, rebuild structure, train contributors, and ship CI/CD publishing.
                </p>
                <div className={styles.actions}>
                  <Link className={styles.buttonPrimary} to="mailto:mariag@voix.com">
                    Get started for free
                  </Link>
                  <Link className={styles.buttonSecondary} to="/services">
                    Talk to a docs expert
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className={styles.mediaHeadingSection}>
          <div className="container">
            <Heading as="h2" className={styles.mediaHeading}>
              Narrative-first documentation migration that teams actually adopt.
            </Heading>
          </div>
        </section>

        <section className={styles.logoSection}>
          <div className="container">
            <p className={styles.logoHeadline}>
              More than <span className={styles.shimmerNumber}>20k teams</span> need clearer product documentation.
            </p>
          </div>
          <div className={styles.marquee}>
            <div className={styles.marqueeTrack}>
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span key={`${item}-${index}`} className={styles.logoChip}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <main>
          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHeadCenter}>
                <Heading as="h2" className={styles.sectionTitle}>
                  Not a generic AI migration script.
                </Heading>
                <p className={styles.sectionSubtitle}>
                  Arcade-inspired interaction, adapted for documentation operations and long-term ownership.
                </p>
              </div>

              <div className={styles.useCaseTabs}>
                {useCases.map((item) => (
                  <button
                    key={item.id}
                    className={`${styles.useCaseTab} ${activeUseCase === item.id ? styles.active : ''}`}
                    onClick={() => setActiveUseCase(item.id)}
                    type="button">
                    {item.label}
                  </button>
                ))}
              </div>

              <article className={styles.useCaseCard}>
                <div>
                  <p className={styles.useCaseLabel}>{currentUseCase.label}</p>
                  <Heading as="h3" className={styles.useCaseTitle}>
                    {currentUseCase.title}
                  </Heading>
                  <p className={styles.useCaseDescription}>{currentUseCase.description}</p>
                  <ul className={styles.featureList}>
                    {currentUseCase.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.useCaseMetricBox}>
                  <span>{currentUseCase.metric}</span>
                </div>
              </article>
            </div>
          </section>

          <section className={`${styles.section} ${styles.progressiveSection}`}>
            <div className="container">
              <div className={styles.progressiveCard}>
                <p className={styles.progressiveLine}>In crowded markets, documentation needs to convert.</p>
                <p className={styles.progressiveLine}>
                  Teams moving to owned docs systems report <span className={styles.inlineStrong}>faster onboarding</span>
                  {' '}and cleaner release communication.
                </p>
                <p className={styles.progressiveLine}>
                  With the right workflow, median publish time drops to minutes, not days.
                </p>
                <div className={styles.progressiveChips}>
                  <span>Live documentation assets</span>
                  <span>Version-safe publishing</span>
                  <span>Team-ready governance</span>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHeadCenter}>
                <Heading as="h2" className={styles.sectionTitle}>
                  The fastest way to modernize your docs stack.
                </Heading>
                <p className={styles.sectionSubtitle}>
                  One focused migration model built for scale, ownership, and safer documentation delivery.
                </p>
              </div>

              <div className={styles.bentoGrid}>
                <article className={styles.bentoLead}>
                  <Heading as="h3">Documentation migration, clearly packaged.</Heading>
                  <p>
                    Audit, implementation, onboarding, and CI/CD setup in one delivery track with optional
                    maintenance interventions.
                  </p>
                </article>
                {bentoCards.map((card) => (
                  <article key={card.title} className={styles.bentoItem}>
                    <p className={styles.bentoKicker}>{card.kicker}</p>
                    <h4>{card.title}</h4>
                    <p>{card.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.integrationsSection}`}>
            <div className="container">
              <div className={styles.integrationsShell}>
                <Heading as="h2" className={styles.integrationsTitle}>
                  Integrated with the tools your teams already rely on.
                </Heading>
                <p className={styles.integrationsSubtitle}>
                  Connect publishing, analytics, support workflows, and planning tools without changing your
                  operating model.
                </p>
                <div className={styles.integrationGrid}>
                  {integrations.map((item) => (
                    <span key={item} className={styles.integrationItem}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHeadCenter}>
                <Heading as="h2" className={styles.sectionTitle}>
                  You’re in great company.
                </Heading>
                <p className={styles.sectionSubtitle}>How teams use Voix to ship clearer documentation outcomes.</p>
              </div>

              <div className={styles.testimonialLayout}>
                <article className={styles.quoteCard}>
                  <p className={styles.quoteMark}>“</p>
                  <p className={styles.quoteText}>{currentTestimonial.quote}</p>
                  <p className={styles.quoteMeta}>
                    {currentTestimonial.name} · {currentTestimonial.role}
                  </p>
                </article>

                <div className={styles.metricsCard}>
                  <div className={styles.metricValue}>{currentTestimonial.stat}</div>
                  <p>{currentTestimonial.statLabel}</p>
                  <div className={styles.dots}>
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`${styles.dot} ${index === activeTestimonial ? styles.active : ''}`}
                        onClick={() => setActiveTestimonial(index)}
                        aria-label={`Show testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.ctaSection}>
            <div className="container">
              <div className={styles.ctaCard}>
                <div>
                  <Heading as="h2" className={styles.ctaTitle}>
                    Build AI-powered documentation operations that drive action.
                  </Heading>
                  <p className={styles.ctaSubtitle}>
                    Share your current stack and we will send a practical migration plan with rollout milestones.
                  </p>
                </div>
                <div className={styles.ctaButtons}>
                  <Link className={styles.buttonPrimary} to="mailto:mariag@voix.com">
                    Book kickoff
                  </Link>
                  <Link className={styles.buttonSecondaryLight} to="/pricing">
                    See pricing
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
