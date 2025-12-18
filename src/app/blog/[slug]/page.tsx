import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Not Found' };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.pubDate,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.pubDate,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'CallVault',
      logo: { '@type': 'ImageObject', url: 'https://callvaultai.com/logo-full-transparent.png' },
    },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
            <header className="mb-8 pb-8 border-b border-slate-200">
              <div className="mb-4">
                <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">{post.title}</h1>
              <div className="flex items-center gap-4 text-slate-500 text-sm">
                <span className="font-medium text-slate-700">{post.author}</span>
                <span>&middot;</span>
                <time dateTime={post.pubDate}>
                  {new Date(post.pubDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
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

            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline">
              <MDXRemote source={post.content} />
            </div>

            {post.faqSchema && post.faqSchema.length > 0 && (
              <section className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {post.faqSchema.map((item, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.question}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <div className="mt-12 p-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to stop losing insights from your calls?</h3>
              <p className="text-slate-600 mb-4">Try CallVault free and turn your Fathom recordings into a searchable profit library.</p>
              <a href="https://app.callvaultai.com" className="btn btn-primary btn-md inline-flex">Start Free Today</a>
            </div>
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
