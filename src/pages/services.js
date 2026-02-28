import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './services.module.css';

const coreOffers = [
  {
    label: 'Offer 01',
    title: 'Consolidation and information architecture',
    body: 'Collect scattered documentation and data into a single structure that is searchable, maintainable, and clear for every team.',
  },
  {
    label: 'Offer 02',
    title: 'Modern platform implementation',
    body: 'Implement a modern documentation platform your company owns, with reusable templates, navigation standards, and quality baseline.',
  },
  {
    label: 'Offer 03',
    title: 'Employee onboarding and enablement',
    body: 'Train employees on authoring, reviewing, and publishing workflows so teams can ship documentation independently after handoff.',
  },
  {
    label: 'Offer 04',
    title: 'CI/CD documentation delivery',
    body: 'Set up CI/CD so updates are reviewed, tested, and published consistently. This reduces release risk and improves update speed.',
  },
];

export default function ServicesPage() {
  return (
    <Layout
      title="Services | Voix"
      description="Voix offers documentation consolidation, implementation, team onboarding, and CI/CD delivery for modern owned platforms.">
      <div className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroGlowA} aria-hidden="true" />
          <div className={styles.heroGlowB} aria-hidden="true" />
          <div className="container">
            <div className={styles.heroInner}>
              <p className={styles.kicker}>Services</p>
              <Heading as="h1" className={styles.heroTitle}>
                Build a documentation platform your company owns.
              </Heading>
              <p className={styles.heroSubtitle}>
                If your documentation is fragmented across tools, folders, and
                outdated pages, we consolidate it into one modern platform,
                train your employees, and implement CI/CD workflows so updates
                become faster and safer.
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.buttonPrimary} to="mailto:hello@voix.studio">
                  Request a quote
                </Link>
                <Link className={styles.buttonGhost} to="/pricing">
                  View pricing
                </Link>
              </div>
              <div className={styles.statRow}>
                <div>
                  <strong>Owned platform</strong>
                  <span>No recurring license lock-in</span>
                </div>
                <div>
                  <strong>Employee enablement</strong>
                  <span>Training for writing and publishing</span>
                </div>
                <div>
                  <strong>CI/CD delivery</strong>
                  <span>Reliable, faster releases</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main>
          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHead}>
                <Heading as="h2" className={styles.sectionTitle}>
                  Core services
                </Heading>
                <p className={styles.sectionText}>
                  You can order a complete migration package or a scoped phase
                  depending on your current documentation maturity.
                </p>
              </div>
              <div className={styles.cardGrid}>
                {coreOffers.map((offer) => (
                  <article className={styles.card} key={offer.title}>
                    <div className={styles.cardLabel}>{offer.label}</div>
                    <h3>{offer.title}</h3>
                    <p>{offer.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.sectionAlt}`}>
            <div className="container">
              <div className={styles.focusPanel}>
                <div>
                  <Heading as="h2" className={styles.sectionTitle}>
                    For teams with scattered docs and data
                  </Heading>
                  <p className={styles.sectionText}>
                    If your knowledge base is spread across multiple locations,
                    you can order a consolidation + migration package that
                    unifies everything into one modern documentation platform
                    your company owns.
                  </p>
                </div>
                <ul className={styles.focusList}>
                  <li>Inventory and audit of current documentation sources</li>
                  <li>Consolidation strategy with clear ownership model</li>
                  <li>Migration and modern UX implementation</li>
                  <li>Employee onboarding and publishing guidelines</li>
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHead}>
                <Heading as="h2" className={styles.sectionTitle}>
                  Additional service
                </Heading>
              </div>
              <article className={styles.secondaryCard}>
                <h3>Portfolio creation</h3>
                <p>
                  Portfolio creation is still available as an additional
                  offering.
                </p>
                <ul>
                  <li>Custom structure and design direction</li>
                  <li>Copy refinement for clarity and positioning</li>
                  <li>Deployment on GitHub Pages or your domain</li>
                  <li>Standard one-time build fee: 500 EUR</li>
                </ul>
              </article>
            </div>
          </section>

          <section className={styles.ctaSection}>
            <div className="container">
              <div className={styles.ctaCard}>
                <div>
                  <Heading as="h2" className={styles.ctaTitle}>
                    Ready to modernize documentation you own?
                  </Heading>
                  <p className={styles.ctaSubtitle}>
                    Share your current setup and receive a practical migration
                    scope with implementation and onboarding steps.
                  </p>
                </div>
                <Link className={styles.buttonPrimary} to="mailto:hello@voix.studio">
                  Book kickoff
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
