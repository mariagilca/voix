/**
 * The voix component kit.
 *
 * Pages compose these; pages do not restyle them. If something needs a new
 * look, it belongs here or in the token layer in src/css/custom.css.
 */

import {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import clsx from 'clsx';
import styles from './styles.module.css';

/* ----------------------------------------------------------- primitives -- */

export function Eyebrow({children, clay = false, as: Tag = 'p', className}) {
  return (
    <Tag className={clsx(styles.eyebrow, clay && styles.eyebrowClay, className)}>
      {children}
    </Tag>
  );
}

export function Container({children, narrow = false, className}) {
  return (
    <div className={clsx(narrow ? styles.narrow : styles.container, className)}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------- section -- */

/**
 * A page section. `id` is required and doubles as the deep link, the rail
 * target and the anchor slug shown on hover.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  tone,
  center = false,
  ruled = false,
  headingLevel: H = 'h2',
  narrow = false,
  className,
  children,
}) {
  // Docusaurus does not scan the built HTML for `id` attributes - a component
  // has to register its anchor, the way @theme/Heading does. Without this,
  // `onBrokenAnchors: 'throw'` rejects every cross-page link to a section,
  // because as far as the checker knows the target does not exist.
  useBrokenLinks().collectAnchor(id);

  const hasHead = eyebrow || title || lead;
  return (
    <section
      id={id}
      className={clsx(
        styles.section,
        tone === 'paper' && styles.tonePaper,
        tone === 'sunk' && styles.toneSunk,
        ruled && styles.ruled,
        className,
      )}>
      <Container narrow={narrow}>
        {hasHead && (
          <div
            className={clsx(
              styles.sectionHead,
              center && styles.sectionHeadCenter,
            )}>
            {eyebrow && <Eyebrow clay>{eyebrow}</Eyebrow>}
            {title && (
              <H className={styles.sectionTitle}>
                {title}
                {/* The accessible name has to start with the visible text or
                    speech-input users cannot target it (WCAG 2.5.3). */}
                <a
                  className={styles.anchor}
                  href={`#${id}`}
                  aria-label={`#${id}, link to this section`}>
                  #{id}
                </a>
              </H>
            )}
            {lead && <p className={styles.sectionLead}>{lead}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- layout -- */

export function Grid({cols = 3, className, children}) {
  return (
    <div
      className={clsx(
        styles.grid,
        cols === 2 && styles.cols2,
        cols === 3 && styles.cols3,
        cols === 4 && styles.cols4,
        className,
      )}>
      {children}
    </div>
  );
}

/**
 * `emphasis` marks the one card in a group that is the main thing on offer.
 * It lives here rather than in a page module because a page-module rule and
 * `.card` are both single classes, so which one wins depends on bundle order -
 * and the kit does not always come last.
 */
export function Card({
  index,
  title,
  children,
  to,
  quiet = false,
  emphasis = false,
  className,
}) {
  const Wrapper = to ? Link : 'article';
  return (
    <Wrapper
      {...(to ? {to} : {})}
      className={clsx(
        styles.card,
        quiet && styles.cardQuiet,
        emphasis && styles.cardAccent,
        to && styles.cardLink,
        className,
      )}>
      {index && <span className={styles.cardIndex}>{index}</span>}
      {title && <h3 className={styles.cardTitle}>{title}</h3>}
      {children && <div className={styles.cardBody}>{children}</div>}
    </Wrapper>
  );
}

export function List({items}) {
  return (
    <ul className={styles.list}>
      {items.map((item, i) => (
        // Index keys are correct here: these lists are static content, never
        // reordered or filtered.
        <li key={i} className={styles.listItem}>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A definition list. Used wherever the content really is term/description
 * pairs, which is most of what this site has to explain.
 *
 * The two-column layout collapses on container width, not viewport width, so
 * a list dropped into a narrow card stacks correctly on a wide screen.
 */
export function DescriptionList({rows, stacked = false}) {
  return (
    <dl className={clsx(styles.dl, stacked && styles.dlStacked)}>
      {rows.map(({term, description}) => (
        <div key={term} className={styles.dlRow}>
          <dt className={styles.dlTerm}>{term}</dt>
          <dd className={styles.dlDesc}>{description}</dd>
        </div>
      ))}
    </dl>
  );
}

/* -------------------------------------------------------------- buttons -- */

export function Button({to, href, variant = 'primary', children, className, ...rest}) {
  return (
    <Link
      {...(to ? {to} : {href})}
      className={clsx(
        styles.button,
        variant === 'primary' && styles.buttonPrimary,
        variant === 'secondary' && styles.buttonSecondary,
        variant === 'quiet' && styles.buttonQuiet,
        className,
      )}
      {...rest}>
      {children}
    </Link>
  );
}

export function ButtonRow({children, className}) {
  return <div className={clsx(styles.buttonRow, className)}>{children}</div>;
}

/* ---------------------------------------------------------- page header -- */

/**
 * A plain <div>, not a <header>: a top-level <header> claims the `banner`
 * landmark, which belongs to the site header, not to a page hero. Pages render
 * this inside their <main> so the skip link lands before the h1.
 */
export function PageHeader({eyebrow, title, lead, children, facts}) {
  return (
    <div className={styles.pageHeader}>
      <Container>
        {eyebrow && <Eyebrow clay>{eyebrow}</Eyebrow>}
        <h1 className={styles.pageTitle}>{title}</h1>
        {lead && <p className={styles.pageLead}>{lead}</p>}
        {children}
        {facts && <FactRow facts={facts} />}
      </Container>
    </div>
  );
}

export function FactRow({facts}) {
  return (
    <div className={styles.factRow}>
      {facts.map(({label, text}) => (
        <div key={label}>
          <span className={styles.factLabel}>{label}</span>
          <p className={styles.factText}>{text}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ cta -- */

export function CallToAction({id = 'contact', title, lead, children}) {
  useBrokenLinks().collectAnchor(id);
  return (
    <section id={id} className={styles.cta}>
      <Container>
        <div className={styles.ctaInner}>
          <div className={styles.ctaCopy}>
            <h2 className={styles.ctaTitle}>{title}</h2>
            {lead && <p className={styles.ctaLead}>{lead}</p>}
          </div>
          <ButtonRow>{children}</ButtonRow>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------ page rail -- */

/**
 * A fixed page index. Only renders above 1500px, where there is dead space at
 * the left edge, so it never competes with the content grid.
 */
export function PageRail({sections}) {
  const [active, setActive] = useState(sections[0]?.id);
  // Depend on the ids, not the array identity: callers pass an inline literal
  // often enough that keying on the array would tear down the observer on
  // every render.
  const ids = sections.map((s) => s.id).join('|');

  useEffect(() => {
    const targets = sections
      .map(({id}) => document.getElementById(id))
      .filter(Boolean);
    if (!targets.length || !('IntersectionObserver' in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {rootMargin: '-45% 0px -45% 0px', threshold: 0},
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  // The <nav> itself carries the display rule, not just the list: a named
  // landmark whose contents are display:none is a landmark with nothing in it
  // on every viewport under 1500px.
  return (
    <nav className={styles.railNav} aria-label="On this page">
      <ol className={styles.rail}>
        {sections.map(({id, label}) => (
          <li key={id} className={styles.railItem}>
            <a
              href={`#${id}`}
              className={clsx(
                styles.railLink,
                active === id && styles.railActive,
              )}
              aria-current={active === id ? 'true' : undefined}>
              <span className={styles.railLabel}>{label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* --------------------------------------------------- signature: the diff -- */

/**
 * A real unified diff from a real migration: one page of vendor HTML export
 * becoming Markdown in a Git repository. It is the whole pitch, stated in the
 * only language that cannot be marketing copy.
 */
const DIFF_LINES = [
  {type: 'meta', text: '@@ vendor export → docs/ in your repo @@'},
  {type: 'minus', text: '<div class="wysiwyg" data-block-id="b71f0e2">'},
  {type: 'minus', text: '  <h2 style="font-size:18px;color:#333">Authentication</h2>'},
  {type: 'minus', text: '  <p><span style="font-family:Arial,sans-serif">Send your'},
  {type: 'minus', text: '  key in the </span><code style="background:#eee">'},
  {type: 'minus', text: '  Authorization</code><span> header.</span></p>'},
  {type: 'minus', text: '</div>'},
  {type: 'plus', text: '---'},
  {type: 'plus', text: 'title: Authentication'},
  {type: 'plus', text: 'description: Send your API key in the Authorization header.'},
  {type: 'plus', text: 'sidebar_position: 2'},
  {type: 'plus', text: '---'},
  {type: 'plus', text: ''},
  {type: 'plus', text: '## Authentication'},
  {type: 'plus', text: ''},
  {type: 'plus', text: 'Send your key in the `Authorization` header.'},
];

const GUTTER = {minus: '-', plus: '+', meta: ' ', context: ' '};

export function MigrationDiff({caption}) {
  return (
    <figure style={{margin: 0}}>
      <div className={styles.diff}>
        <div className={styles.diffHead}>
          <span className={styles.diffDot} aria-hidden="true" />
          <span>docs/guides/authentication.md</span>
        </div>
        {/* A <div>, not a <pre>: <pre> only accepts phrasing content, and each
            line here is a grid container. Whitespace is preserved by CSS.
            tabIndex makes the horizontal scroll reachable by keyboard, which it
            has to be on a phone where the diff genuinely overflows. */}
        <div
          className={styles.diffBody}
          tabIndex={0}
          role="group"
          aria-label="Example migration diff">
          {DIFF_LINES.map((line, i) => (
            <div
              key={`${line.type}-${i}`}
              className={clsx(
                styles.diffLine,
                line.type === 'minus' && styles.diffMinus,
                line.type === 'plus' && styles.diffPlus,
                line.type === 'meta' && styles.diffMeta,
              )}
              style={{'--i': i}}>
              <span className={styles.diffGutter}>{GUTTER[line.type]}</span>
              <span>{line.text || ' '}</span>
            </div>
          ))}
        </div>
      </div>
      {caption && <figcaption className={styles.diffCaption}>{caption}</figcaption>}
    </figure>
  );
}

/* -------------------------------------------------------- structured data -- */

export function StructuredData({schema}) {
  // `<` has to be escaped: a literal `</script>` anywhere inside the JSON would
  // close the tag early and break the page.
  const json = JSON.stringify(schema).replace(/</g, '\\u003c');
  return (
    <Head>
      <script type="application/ld+json">{json}</script>
    </Head>
  );
}
