import Link from 'next/link';
import Image from 'next/image';

interface LegalPageLayoutProps {
  children: React.ReactNode;
}

export default function LegalPageLayout({ children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Simple Header */}
      <header className="bg-white border-b border-slate-200 py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-full-transparent.png"
              alt="CallVault"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          {children}
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div>&copy; {new Date().getFullYear()} CallVault by 7x Systems LLC. All rights reserved.</div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
              <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              <Link href="/acceptable-use" className="hover:text-white transition-colors">Acceptable Use</Link>
              <button
                className="termly-display-preferences hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
                type="button"
              >
                Consent Preferences
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
