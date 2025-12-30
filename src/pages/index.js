import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={styles.heroBackdrop} aria-hidden="true" />
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <div className={styles.heroKicker}>
            No-license portfolio studio
          </div>
          <Heading as="h1" className={styles.heroTitle}>
            <span className={styles.heroBrand}>{siteConfig.title}</span> builds
            portfolio sites that sound like you.
          </Heading>
          <p className={styles.heroSubtitle}>
            Launch a credible, fast, and elegant portfolio without wrestling
            with templates. We design, write, and publish your site in days,
            then keep it updated with an annual care plan. No license fees,
            ever.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.buttonPrimary} to="mailto:hello@voix.studio">
              Start a project
            </Link>
            <Link className={styles.buttonGhost} to="#pricing">
              See pricing
            </Link>
          </div>
          <div className={styles.heroMeta}>
            <div>Built on GitHub Pages or your custom domain</div>
            <div>Launch in 5-10 business days</div>
            <div>Maintenance included with annual care</div>
            <div>Open-source stack, no software fees</div>
          </div>
        </div>
        <div className={styles.heroCard}>
          <div className={styles.heroCardTag}>Launch pack</div>
          <div className={styles.heroCardPrice}>500 EUR</div>
          <p className={styles.heroCardSub}>
            Complete portfolio build, brand styling, and publishing setup.
          </p>
          <ul className={styles.heroCardList}>
            <li>Custom homepage + case study templates</li>
            <li>Content polish and structure guidance</li>
            <li>GitHub publishing and handoff</li>
          </ul>
          <div className={styles.heroCardFooter}>
            Annual care: 50 EUR/year
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Voix portfolio studio"
      description="Voix builds no-license portfolio sites with publishing and maintenance included.">
      <div className={styles.page}>
        <HomepageHeader />
        <main>
          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <Heading as="h2" className={styles.sectionTitle}>
                  A portfolio that feels curated, not generic.
                </Heading>
                <p className={styles.sectionSubtitle}>
                  Voix is a boutique studio for founders, designers, and
                  freelancers who want a polished portfolio on an open-source
                  stack without the usual setup drag.
                </p>
              </div>
              <div className={styles.cardGrid}>
                <article className={styles.serviceCard}>
                  <h3>Portfolio build</h3>
                  <p>
                    A full portfolio site with thoughtful IA, standout visuals,
                    and a narrative that highlights your best work.
                  </p>
                </article>
                <article className={styles.serviceCard}>
                  <h3>Content refinement</h3>
                  <p>
                    We edit and structure your copy so it is crisp, credible,
                    and easy for clients to scan.
                  </p>
                </article>
                <article className={styles.serviceCard}>
                  <h3>Publishing + care</h3>
                  <p>
                    GitHub Pages publishing, maintenance updates, and minor
                    tweaks covered in the annual plan.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className={styles.section} id="pricing">
            <div className="container">
              <div className={styles.sectionHeader}>
                <Heading as="h2" className={styles.sectionTitle}>
                  Simple pricing, clear scope.
                </Heading>
                <p className={styles.sectionSubtitle}>
                  You pay once to launch, then keep the portfolio fresh with a
                  lightweight yearly subscription.
                </p>
              </div>
              <div className={styles.pricingGrid}>
                <article className={styles.pricingCard}>
                  <div className={styles.pricingBadge}>Most popular</div>
                  <h3>GitHub Pages plan</h3>
                  <div className={styles.pricingPrice}>500 EUR</div>
                  <p className={styles.pricingNote}>
                    One-time creation, includes GitHub publishing.
                  </p>
                  <ul>
                    <li>Custom theme and layout</li>
                    <li>Home, about, and portfolio templates</li>
                    <li>Setup on your GitHub repository</li>
                  </ul>
                  <div className={styles.pricingFooter}>
                    Annual maintenance: 50 EUR/year
                  </div>
                </article>
                <article className={styles.pricingCardAlt}>
                  <h3>Custom domain plan</h3>
                  <div className={styles.pricingPrice}>500 EUR</div>
                  <p className={styles.pricingNote}>
                    Same build, published on your domain.
                  </p>
                  <ul>
                    <li>Domain configuration and DNS setup</li>
                    <li>SSL, redirects, and launch checklist</li>
                    <li>Maintenance plan still applies</li>
                  </ul>
                  <div className={styles.pricingFooter}>
                    Domain cost billed at cost
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <Heading as="h2" className={styles.sectionTitle}>
                  A fast, focused process.
                </Heading>
                <p className={styles.sectionSubtitle}>
                  We keep the build tight so you can start sharing quickly.
                </p>
              </div>
              <div className={styles.timeline}>
                <div className={styles.timelineStep}>
                  <span>01</span>
                  <h3>Kickoff</h3>
                  <p>We align on goals, structure, and your best work.</p>
                </div>
                <div className={styles.timelineStep}>
                  <span>02</span>
                  <h3>Build</h3>
                  <p>We design and write while you approve content.</p>
                </div>
                <div className={styles.timelineStep}>
                  <span>03</span>
                  <h3>Launch</h3>
                  <p>Publishing, analytics, and handoff documentation.</p>
                </div>
                <div className={styles.timelineStep}>
                  <span>04</span>
                  <h3>Maintain</h3>
                  <p>Annual updates to keep things current and clean.</p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <Heading as="h2" className={styles.sectionTitle}>
                  FAQ
                </Heading>
                <p className={styles.sectionSubtitle}>
                  Answers to the most common questions we get.
                </p>
              </div>
              <div className={styles.faqGrid}>
                <details className={styles.faqItem}>
                  <summary>What do you need from me to start?</summary>
                  <p>
                    A short intake call, your existing content, and any brand
                    references you like. We take it from there.
                  </p>
                </details>
                <details className={styles.faqItem}>
                  <summary>Can I update the site myself later?</summary>
                  <p>
                    Yes. We deliver a clean GitHub repo and guide you through
                    editing pages in Markdown.
                  </p>
                </details>
                <details className={styles.faqItem}>
                  <summary>What is covered by the annual plan?</summary>
                  <p>
                    Publishing support, minor updates, and maintenance fixes.
                    Larger redesigns are quoted separately.
                  </p>
                </details>
              </div>
            </div>
          </section>

          <section className={styles.ctaSection}>
            <div className="container">
              <div className={styles.ctaCard}>
                <div>
                  <Heading as="h2" className={styles.ctaTitle}>
                    Ready to launch a portfolio with Voix?
                  </Heading>
                  <p className={styles.ctaSubtitle}>
                    Tell us about your goals and we will share a tailored plan
                    within 24 hours.
                  </p>
                </div>
                <Link className={styles.buttonPrimary} to="mailto:hello@voix.studio">
                  Book a kickoff
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
