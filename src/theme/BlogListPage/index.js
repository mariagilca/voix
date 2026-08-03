/**
 * Ejected from @docusaurus/theme-classic.
 *
 * The stock BlogListPage renders no <h1> and no visible title at all - the blog
 * index arrives as a bare list of posts. That is a heading-structure gap on a
 * page we want indexed, and a reader landing from search has nothing telling
 * them what this blog is.
 *
 * The only change from upstream is the <header> block inside
 * BlogListPageContent. Everything else is the original component; if this file
 * drifts after a Docusaurus upgrade, diff it against
 * node_modules/@docusaurus/theme-classic/lib/theme/BlogListPage/index.js.
 */

import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import styles from './styles.module.css';

function BlogListPageMetadata(props) {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props) {
  const {metadata, items, sidebar} = props;
  const {blogTitle, blogDescription, page, totalPages} = metadata;
  const isPaginated = totalPages > 1 && page > 1;

  return (
    <BlogLayout sidebar={sidebar}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Field notes</p>
        <h1 className={styles.title}>{blogTitle}</h1>
        <p className={styles.description}>{blogDescription}</p>
        {isPaginated && (
          <p className={styles.pageMarker}>
            Page {page} of {totalPages}
          </p>
        )}
      </header>
      <BlogPostItems items={items} />
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
