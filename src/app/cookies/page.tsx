import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for CallVault by 7x Systems LLC.',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-full-transparent.png"
              alt="CallVault"
              width={120}
              height={32}
              className="h-8 w-auto brightness-0 invert"
            />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <iframe
          src="/cookies.html"
          className="w-full min-h-[80vh] border-0 rounded-lg bg-white"
          title="Cookie Policy"
        />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div>&copy; {new Date().getFullYear()} CallVault by 7x Systems LLC. All rights reserved.</div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
              <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              <Link href="/acceptable-use" className="hover:text-white transition-colors">Acceptable Use</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
