import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './pricing.module.css';

const includedItems = [
  'Content migration and cleanup',
  'Information architecture and navigation rebuild',
  'Open-source docs platform implementation',
  'Employee onboarding on the new platform',
  'CI/CD publishing workflow and quality gates',
  'Redirect mapping and launch checks',
];

export default function PricingPage() {
  return (
    <Layout
      title="Pricing | Voix"
      description="Documentation migration pricing focused on ownership, employee onboarding, and CI/CD delivery."
      wrapperClassName="pricing-page-wrapper">
      <div className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroGlowA} aria-hidden="true" />
          <div className={styles.heroGlowB} aria-hidden="true" />
          <div className="container">
            <div className={styles.heroInner}>
              <p className={styles.kicker}>Pricing</p>
              <Heading as="h1" className={styles.heroTitle}>
                One-time delivery for a documentation platform you own.
              </Heading>
              <p className={styles.heroSubtitle}>
                Pricing is built around implementation and handoff, not
                recurring license lock-in. You get a modern owned platform,
                employee onboarding, and CI/CD-ready delivery.
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.buttonPrimary} to="mailto:mariag@voix.com">
                  Request quote
                </Link>
                <Link className={styles.buttonGhost} to="/services">
                  See services
                </Link>
              </div>
              <div className={styles.statRow}>
                <div>
                  <strong>One-time model</strong>
                  <span>No recurring platform lock-in</span>
                </div>
                <div>
                  <strong>Team enablement</strong>
                  <span>Employee onboarding included</span>
                </div>
                <div>
                  <strong>Operationally ready</strong>
                  <span>CI/CD delivery with clear handoff</span>
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
                  Pricing options
                </Heading>
              </div>
              <div className={styles.pricingGrid}>
                <article className={styles.pricingCard}>
                  <div className={styles.cardTag}>Core</div>
                  <h3>Docs migration project</h3>
                  <div className={styles.priceValue}>Custom quote</div>
                  <p>
                    One-time fee scoped by documentation volume, complexity, and
                    implementation requirements.
                  </p>
                </article>

                <article className={styles.pricingCardFeatured}>
                  <div className={styles.cardTag}>Optional add-on</div>
                  <h3>5 interventions package</h3>
                  <div className={styles.priceValue}>Small extra cost</div>
                  <p>
                    Five post-launch maintenance interventions for fixes and
                    minor documentation updates.
                  </p>
                </article>

                <article className={styles.pricingCard}>
                  <div className={styles.cardTag}>Additional service</div>
                  <h3>Portfolio creation</h3>
                  <div className={styles.priceValue}>500 EUR</div>
                  <p>
                    Available on request and scoped as a separate one-time
                    build.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.sectionAlt}`}>
            <div className="container">
              <div className={styles.sectionHead}>
                <Heading as="h2" className={styles.sectionTitle}>
                  What the migration fee covers
                </Heading>
                <p className={styles.sectionText}>
                  Scope is tailored per project, but these are the standard
                  building blocks.
                </p>
              </div>
              <div className={styles.coverageGrid}>
                {includedItems.map((item) => (
                  <article className={styles.coverageItem} key={item}>
                    <span />
                    <p>{item}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className="container">
              <div className={styles.focusPanel}>
                <div>
                  <Heading as="h2" className={styles.sectionTitle}>
                    Scattered docs and data package
                  </Heading>
                  <p className={styles.sectionText}>
                    If your company has fragmented documentation across
                    different tools and locations, you can request a
                    consolidation package that unifies everything into one
                    modern platform you own.
                  </p>
                </div>
                <ul className={styles.focusList}>
                  <li>Audit of current content sources</li>
                  <li>Consolidation plan and implementation roadmap</li>
                  <li>Modern platform setup with migration execution</li>
                  <li>Onboarding and CI/CD operational handoff</li>
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.ctaSection}>
            <div className="container">
              <div className={styles.ctaCard}>
                <div>
                  <Heading as="h2" className={styles.ctaTitle}>
                    Need a tailored estimate?
                  </Heading>
                  <p className={styles.ctaSubtitle}>
                    Share your current setup and we will return a practical
                    scope with timeline and pricing.
                  </p>
                </div>
                <Link className={styles.buttonPrimary} to="mailto:mariag@voix.com">
                  Contact us
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
