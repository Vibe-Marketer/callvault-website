import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      {/* Final CTA */}
      <section className="section-lava text-center py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lava-accent.png')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="container relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            You&apos;re already doing the calls. <br />
            It&apos;s time to <span className="text-yellow-300">profit</span> from them.
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://app.callvaultai.com" className="btn btn-white btn-lg">
              Start Free
            </a>
            <a href="#demo" className="btn btn-lg border border-white/30 text-white hover:bg-white/10 bg-transparent">
              <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch 2-min Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
                <Image src="/logo-full-transparent.png" alt="CallVault" width={120} height={32} className="h-8 w-auto brightness-0 invert" />
              </div>
              <p className="max-w-xs text-sm leading-relaxed">
                Turn every Fathom recording into an organized, searchable profit library.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
                <li><Link href="/acceptable-use" className="hover:text-white transition-colors">Acceptable Use</Link></li>
                <li>
                  <a
                    href="#"
                    className="termly-display-preferences hover:text-white transition-colors"
                  >
                    Consent Preferences
                  </a>
                </li>
                <li><a href="mailto:support@callvaultai.com" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <div>&copy; {new Date().getFullYear()} CallVault by 7x Systems LLC. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="https://x.com/callvaultai" className="hover:text-white transition-colors">Twitter / X</a>
              <a href="https://linkedin.com/company/callvaultai" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://instagram.com/callvaultai" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
