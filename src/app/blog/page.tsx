import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog',
  description: 'Practical guides on organizing call recordings, turning conversations into content, and getting more value from every client call.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
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
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">CallVault Blog</h1>
              <p className="text-xl text-slate-600">
                Practical guides on organizing call recordings, turning conversations into content, and getting more value from every client call.
              </p>
            </div>

            {posts.length === 0 ? (
              <p className="text-slate-500 italic">No posts yet. Check back soon!</p>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <article key={post.slug} className="group">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block p-6 -mx-6 rounded-2xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                        <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <time dateTime={post.pubDate}>
                          {new Date(post.pubDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-2">
                        {post.title}
                      </h2>
                      <p className="text-slate-600 leading-relaxed">{post.description}</p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.tags.map((tag) => (
                            <span key={tag} className="text-xs text-slate-400">#{tag}</span>
                          ))}
                        </div>
                      )}
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
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
