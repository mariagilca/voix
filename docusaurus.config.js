// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const SITE_URL = 'https://www.voix.md';
const EMAIL = 'mariag@voix.md';
const TAGLINE =
  'Documentation migration to open-source stacks you own, with no vendor lock-in.';
// Site-wide fallback description. Kept under 155 characters because Docusaurus
// hands it to every generated page that has none of its own, and kept distinct
// from the homepage's so the two do not collide as duplicates.
const DESCRIPTION =
  'voix is a documentation studio that migrates product docs onto open-source stacks teams own, with no vendor lock-in and no recurring licence.';

// The longer form, for structured data and social cards, where length is fine.
const LONG_DESCRIPTION =
  'voix migrates product documentation off locked proprietary platforms onto open-source stacks your team owns. Content audit, information architecture, Docusaurus implementation, CI/CD publishing, and contributor training.';

/**
 * Site-wide structured data. One @graph so every node can cross-reference the
 * others by @id; page-level schema (FAQPage, Service, Article) links back to
 * #organization rather than restating it.
 */
const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'voix',
      alternateName: 'voix documentation studio',
      url: `${SITE_URL}/`,
      email: EMAIL,
      description: LONG_DESCRIPTION,
      slogan: TAGLINE,
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/#logo`,
        url: `${SITE_URL}/img/logo.svg`,
        contentUrl: `${SITE_URL}/img/logo.svg`,
        caption: 'voix',
      },
      image: {'@id': `${SITE_URL}/#logo`},
      founder: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#maria-gilca`,
        name: 'Maria Gilca',
        jobTitle: 'Documentation architect',
        email: EMAIL,
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'MD',
      },
      areaServed: {'@type': 'Place', name: 'Worldwide, remote'},
      // No priceRange: /pricing/ deliberately refuses to publish a band
      // ("a single published price would be wrong in both directions"), so
      // asserting one in structured data would contradict the visible site.
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
      makesOffer: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Documentation migration',
            description:
              'Move documentation off a proprietary platform onto an open-source stack the client owns.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Information architecture redesign',
            description:
              'Restructure documentation into a navigation model that survives product growth.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CI/CD documentation delivery',
            description:
              'Set up review gates, link checking, and automated publishing for docs in Git.',
          },
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'voix',
      description: LONG_DESCRIPTION,
      publisher: {'@id': `${SITE_URL}/#organization`},
      inLanguage: 'en',
    },
  ],
};

/**
 * Sitemap priority by route. Sitemaps should list canonical, indexable pages
 * only; thin generated routes (author pages, archives, pagination) are dropped
 * so crawl budget goes to pages that can actually rank.
 */
const SITEMAP_RULES = [
  {test: (p) => p === '/', priority: 1.0, changefreq: 'weekly'},
  {
    test: (p) =>
      ['/services/', '/pricing/', '/process/', '/faq/', '/case-studies/'].includes(p),
    priority: 0.9,
    changefreq: 'monthly',
  },
  {test: (p) => p === '/blog/', priority: 0.8, changefreq: 'weekly'},
  {test: (p) => p.startsWith('/docs/'), priority: 0.7, changefreq: 'monthly'},
  {test: (p) => p === '/about/', priority: 0.7, changefreq: 'monthly'},
  {test: (p) => p.startsWith('/blog/'), priority: 0.6, changefreq: 'monthly'},
  {
    test: (p) => ['/terms/', '/imprint/', '/confidentiality/'].includes(p),
    priority: 0.2,
    changefreq: 'yearly',
  },
];

/**
 * prism-react-renderer applies token colours as inline styles, so CSS cannot
 * override them without `!important`. Patching the theme object instead keeps
 * the fix declarative.
 *
 * Several stock token colours fail WCAG AA against their own code-block
 * background - github's comment grey (#999988) sits at 2.6:1 and vsDark's
 * constant (#646695) at 3.1:1. On a handbook that is largely code samples that
 * is the most-read text on the page, so each one below is replaced with the
 * nearest hue that clears 4.5:1.
 */
function withAccessibleTokens(theme, fixes) {
  return {
    ...theme,
    styles: theme.styles.map((entry) => {
      const fix = fixes.find((f) => f.when(entry.types));
      return fix ? {...entry, style: {...entry.style, color: fix.color}} : entry;
    }),
  };
}

const PRISM_LIGHT = withAccessibleTokens(prismThemes.github, [
  {when: (t) => t.includes('comment'), color: '#6a6558'}, // was #999988, 2.6:1
  {when: (t) => t.includes('attr-value'), color: '#c2185b'}, // was #e3116c, 4.3:1
  {when: (t) => t.includes('entity'), color: '#0a6d6b'}, // was #36acaa, 2.6:1
  {when: (t) => t.includes('atrule'), color: '#0550ae'}, // was #00a4db, 2.6:1
  {when: (t) => t.includes('deleted'), color: '#b31d28'}, // was #d73a49, 4.3:1
]);

const PRISM_DARK = withAccessibleTokens(prismThemes.vsDark, [
  {when: (t) => t.includes('constant'), color: '#9a9ccd'}, // was #646695, 3.1:1
  {when: (t) => t.length === 1 && t[0] === 'punctuation', color: '#9d9d9d'}, // was #808080, 4.2:1
  {when: (t) => t.includes('prolog'), color: '#7ba7dc'}, // was navy on near-black
]);

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'voix',
  tagline: TAGLINE,
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: SITE_URL,
  baseUrl: '/',

  // GitHub Pages serves /about/ and 301-redirects /about, so every internal
  // link, canonical tag and sitemap entry has to carry the trailing slash.
  // Without this every sitemap URL is a redirect.
  trailingSlash: true,

  organizationName: 'mariagilca',
  projectName: 'voix',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  markdown: {
    hooks: {
      // Moved off the deprecated top-level siteConfig.onBrokenMarkdownLinks,
      // which Docusaurus v4 removes.
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Self-hosted, so no third-party font CDN on the critical path.
  stylesheets: [{href: '/fonts/fonts.css', rel: 'stylesheet'}],

  scripts: [{src: '/js/navbar-scroll.js', defer: true}],

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: '/fonts/source-serif-4-400-700-latin.woff2',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: '/fonts/hanken-grotesk-400-700-latin.woff2',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {rel: 'icon', type: 'image/svg+xml', href: '/img/favicon.svg'},
    },
    {
      tagName: 'link',
      attributes: {rel: 'apple-touch-icon', sizes: '180x180', href: '/img/apple-touch-icon.png'},
    },
    {
      tagName: 'link',
      attributes: {rel: 'manifest', href: '/site.webmanifest'},
    },
    {
      tagName: 'meta',
      attributes: {name: 'theme-color', content: '#faf9f5'},
    },
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify(ORGANIZATION_SCHEMA),
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          showLastUpdateTime: true,
          breadcrumbs: true,
        },
        blog: {
          blogTitle: 'Documentation migration notes',
          blogDescription:
            'Field notes on migrating documentation off proprietary platforms: information architecture, docs-as-code workflows, CI/CD publishing, and governance.',
          showReadingTime: true,
          postsPerPage: 10,
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 8,
          feedOptions: {
            type: ['rss', 'atom'],
            title: 'voix - documentation migration notes',
            description:
              'Field notes on documentation migration, docs-as-code, and information architecture.',
            copyright: `Copyright © ${new Date().getFullYear()} voix`,
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'monthly',
          priority: 0.5,
          // Both the bare path and the /** form: a single `/x/**` glob does not
          // match `/x/` itself, so the index route would survive the filter.
          ignorePatterns: [
            '/blog/authors',
            '/blog/authors/**',
            '/blog/archive',
            '/blog/archive/**',
            '/blog/page/**',
            // The tag index is a list of lists with no description of its own.
            // Both forms are needed: with trailingSlash the route is
            // '/blog/tags/', which the bare pattern does not match.
            '/blog/tags',
            '/blog/tags/',
          ],
          filename: 'sitemap.xml',
          createSitemapItems: async ({defaultCreateSitemapItems, ...rest}) => {
            const items = await defaultCreateSitemapItems(rest);
            return items.map((item) => {
              const path = new URL(item.url).pathname;
              const rule = SITEMAP_RULES.find((r) => r.test(path));
              return rule
                ? {...item, priority: rule.priority, changefreq: rule.changefreq}
                : item;
            });
          },
        },
        googleTagManager: {
          containerId: 'GTM-NCHBVPPT',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/voix-social-card.png',
      metadata: [
        {name: 'description', content: DESCRIPTION},
        {
          name: 'keywords',
          content:
            'documentation migration, docs as code, Docusaurus migration, open source documentation, technical writing agency, information architecture, CI/CD documentation, vendor lock-in, documentation consulting',
        },
        {name: 'author', content: 'voix'},
        // twitter:card only. A hard-coded twitter:title/description here would
        // be emitted on all 70 pages, and X prefers twitter:* over og:* - so
        // every shared doc or blog post would render as the homepage. Left
        // absent, X falls back to og:title/og:description, which Docusaurus
        // already sets per page.
        {name: 'twitter:card', content: 'summary_large_image'},
        {property: 'og:type', content: 'website'},
        {property: 'og:site_name', content: 'voix'},
        {property: 'og:locale', content: 'en'},
      ],
      colorMode: {
        respectPrefersColorScheme: true,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      docs: {
        sidebar: {hideable: true, autoCollapseCategories: false},
      },
      navbar: {
        title: 'voix',
        logo: {
          alt: 'voix',
          src: 'img/logo-nav.svg',
          srcDark: 'img/logo-nav-dark.svg',
        },
        items: [
          {to: '/services/', label: 'Services', position: 'left'},
          {to: '/process/', label: 'Process', position: 'left'},
          {to: '/pricing/', label: 'Pricing', position: 'left'},
          {
            label: 'Resources',
            position: 'left',
            items: [
              {to: '/case-studies/', label: 'Case studies'},
              {to: '/faq/', label: 'FAQ'},
              {to: '/docs/', label: 'Migration handbook'},
              {to: '/blog/', label: 'Blog'},
            ],
          },
          {
            href: `mailto:${EMAIL}`,
            label: 'Start a migration',
            position: 'right',
            className: 'navbar-cta',
          },
        ],
      },
      footer: {
        style: 'light',
        logo: {
          alt: 'voix',
          src: 'img/logo.svg',
          srcDark: 'img/logo-dark.svg',
          href: '/',
          width: 44,
          height: 26,
        },
        links: [
          {
            title: 'Work with us',
            items: [
              {label: 'Services', to: '/services/'},
              {label: 'Process', to: '/process/'},
              {label: 'Pricing', to: '/pricing/'},
              {label: 'Case studies', to: '/case-studies/'},
            ],
          },
          {
            title: 'Learn',
            items: [
              {label: 'Migration handbook', to: '/docs/'},
              {label: 'FAQ', to: '/faq/'},
              {label: 'Blog', to: '/blog/'},
              // Absolute on purpose: with trailingSlash: true a root-relative
              // href gets normalised to /blog/rss.xml/, which does not exist.
              {label: 'RSS feed', href: `${SITE_URL}/blog/rss.xml`},
            ],
          },
          {
            title: 'Studio',
            items: [
              {label: 'About', to: '/about/'},
              {label: EMAIL, href: `mailto:${EMAIL}`},
            ],
          },
          {
            title: 'Legal',
            items: [
              {label: 'Imprint', to: '/imprint/'},
              {label: 'Terms and conditions', to: '/terms/'},
              {label: 'Confidentiality policy', to: '/confidentiality/'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} voix. Built on an open-source stack, like everything we ship.`,
      },
      prism: {
        theme: PRISM_LIGHT,
        darkTheme: PRISM_DARK,
        additionalLanguages: ['bash', 'diff', 'json', 'yaml'],
      },
    }),
};

export default config;
