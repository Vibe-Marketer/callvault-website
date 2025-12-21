import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllSlugs, getPostBySlug, getRelatedPosts, BlogPost } from '@/lib/blog';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Not Found' };

  return {
    title: `${post.title} | CallVault Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.pubDate,
      modifiedTime: post.lastUpdated || post.pubDate,
      authors: [post.author],
      images: post.heroImage ? [post.heroImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

// Breadcrumb Component
function Breadcrumbs({ category, title }: { category: string; title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-slate-500">
        <li>
          <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
        </li>
        <li><span className="mx-1">/</span></li>
        <li>
          <Link href="/blog" className="hover:text-orange-600 transition-colors">Blog</Link>
        </li>
        <li><span className="mx-1">/</span></li>
        <li>
          <span className="capitalize hover:text-orange-600 transition-colors">{category}</span>
        </li>
        <li><span className="mx-1">/</span></li>
        <li className="text-slate-900 font-medium truncate max-w-xs">{title}</li>
      </ol>
    </nav>
  );
}

// Author Bio Component
function AuthorBio({ post }: { post: BlogPost }) {
  const authorImage = post.authorImage || 'https://assets.callvaultai.com/andrew-naegele-headshot.png';
  const authorBio = post.authorBio || 'Founder of CallVault and creator of the Multiplied Leverage Principle. Andrew helps coaches, consultants, and sales teams turn their recorded calls into searchable knowledge vaults that drive revenue.';

  return (
    <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
      <div className="flex items-start gap-4">
        <Image
          src={authorImage}
          alt={post.author}
          width={80}
          height={80}
          className="rounded-full object-cover w-20 h-20 flex-shrink-0"
        />
        <div>
          <h3 className="font-bold text-slate-900 text-lg">About {post.author}</h3>
          <p className="text-slate-600 text-sm mt-1 leading-relaxed">{authorBio}</p>
          <div className="flex gap-3 mt-3">
            <a href="https://linkedin.com/in/andrewnaegele" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://x.com/callvaultai" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Related Posts Component
function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Keep Reading</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article className="bg-white rounded-xl border border-slate-200 p-5 h-full hover:border-orange-300 hover:shadow-md transition-all">
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">{post.category}</span>
              <h3 className="font-bold text-slate-900 mt-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-slate-500 mt-2 line-clamp-2">{post.description}</p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, post.tags);

  // Enhanced Article Schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.pubDate,
    dateModified: post.lastUpdated || post.pubDate,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://callvaultai.com/about',
      image: post.authorImage || 'https://assets.callvaultai.com/andrew-naegele-headshot.png',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CallVault',
      url: 'https://callvaultai.com',
      logo: { '@type': 'ImageObject', url: 'https://callvaultai.com/logo-full-transparent.png' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://callvaultai.com/blog/${post.slug}`,
    },
    image: post.heroImage,
  };

  // Breadcrumb Schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://callvaultai.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://callvaultai.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.category, item: `https://callvaultai.com/blog?category=${post.category}` },
      { '@type': 'ListItem', position: 4, name: post.title },
    ],
  };

  const faqJsonLd = post.faqSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqSchema.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center">
            <Image src="/logo-full-transparent.png" alt="CallVault" width={120} height={32} className="h-8 w-auto" />
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors">Home</Link>
            <Link href="/blog" className="text-sm font-medium text-orange-600">Blog</Link>
            <a href="https://app.callvaultai.com" className="btn btn-primary btn-md">Start Free</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container py-12">
          <article className="max-w-3xl mx-auto">
            {/* Breadcrumbs */}
            <Breadcrumbs category={post.category} title={post.title} />

            <header className="mb-8 pb-8 border-b border-slate-200">
              <div className="mb-4">
                <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">{post.title}</h1>

              {/* Quick Answer Box (AEO) */}
              {post.quickAnswer && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg">
                  <p className="text-slate-700 font-medium">{post.quickAnswer}</p>
                </div>
              )}

              <div className="flex items-center gap-4 text-slate-500 text-sm">
                <div className="flex items-center gap-2">
                  <Image
                    src={post.authorImage || 'https://assets.callvaultai.com/andrew-naegele-headshot.png'}
                    alt={post.author}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="font-medium text-slate-700">{post.author}</span>
                </div>
                <span>&middot;</span>
                <time dateTime={post.pubDate}>
                  {new Date(post.pubDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {post.readingTime && (
                  <>
                    <span>&middot;</span>
                    <span>{post.readingTime}</span>
                  </>
                )}
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">#{tag}</span>
                  ))}
                </div>
              )}
            </header>

            {post.heroImage && (
              <Image src={post.heroImage} alt={post.title} width={800} height={450} className="w-full h-auto rounded-2xl mb-8 shadow-lg" />
            )}

            {/* Key Takeaways (AEO) */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200">
                <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-orange-500">📌</span> Key Takeaways
                </h2>
                <ul className="space-y-2">
                  {post.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-table:border-collapse prose-table:w-full prose-th:bg-slate-100 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-td:p-3 prose-td:border prose-td:border-slate-200">
              <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
            </div>

            {post.faqSchema && post.faqSchema.length > 0 && (
              <section className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {post.faqSchema.map((item, i) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-5">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.question}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Author Bio */}
            <AuthorBio post={post} />

            {/* CTA */}
            <div className="mt-8 p-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to stop losing insights from your calls?</h3>
              <p className="text-slate-600 mb-4">Try CallVault free and turn your recorded calls into a searchable knowledge vault.</p>
              <a href="https://app.callvaultai.com" className="btn btn-primary btn-md inline-flex">Start Free Today</a>
            </div>

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />
          </article>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 mt-auto">
        <div className="container text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CallVault by 7x Systems LLC. Every call captured. Every insight findable.</p>
        </div>
      </footer>
    </>
  );
}
