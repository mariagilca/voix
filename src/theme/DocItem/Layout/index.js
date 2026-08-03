/**
 * Wraps the stock DocItem/Layout - it is not ejected, only decorated - to add
 * page-level structured data to every handbook page.
 *
 * Docusaurus emits a BreadcrumbList for docs and nothing else, so the most
 * extractable pages on the site were the only ones with no article entity and
 * no link back to the organization node. TechArticle is the right type: these
 * are how-to reference pages, not news.
 */

import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import Head from '@docusaurus/Head';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function DocItemLayout(props) {
  const {metadata, frontMatter} = useDoc();
  const {
    siteConfig: {url},
  } = useDocusaurusContext();

  const canonical = `${url}${metadata.permalink}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${canonical}#article`,
    headline: metadata.title,
    name: metadata.title,
    description: metadata.description,
    url: canonical,
    mainEntityOfPage: {'@type': 'WebPage', '@id': canonical},
    inLanguage: 'en',
    isPartOf: {'@id': `${url}/#website`},
    publisher: {'@id': `${url}/#organization`},
    author: {'@id': `${url}/#organization`},
    ...(frontMatter.keywords?.length
      ? {keywords: frontMatter.keywords.join(', ')}
      : {}),
    ...(metadata.lastUpdatedAt
      ? {dateModified: new Date(metadata.lastUpdatedAt * 1000).toISOString().slice(0, 10)}
      : {}),
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(schema).replace(/</g, '\\u003c')}
        </script>
      </Head>
      <Layout {...props} />
    </>
  );
}
