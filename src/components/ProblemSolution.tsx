const problems = [
  'Hundreds of Fathom recordings sitting unused',
  'No clear view of why people buy vs don\'t buy',
  'Time wasted on bad-fit calls',
  'Guessing at what messaging works',
];

const steps = [
  { title: 'Connect Fathom', desc: 'Auto-sync your historical and future calls in seconds.', icon: '🔌' },
  { title: 'Auto-Organize', desc: 'Smart tags, folders, and rules sort everything for you.', icon: '🗂️' },
  { title: 'Mine for Gold', desc: 'Extract offers, messaging, and content instantly.', icon: '💎' },
];

export default function ProblemSolution() {
  return (
    <>
      {/* Problem Section */}
      <section id="how-it-works" className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-bold uppercase tracking-wider mb-4">
                The Old Way
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                You&apos;ve Been Told the Answer Is <span className="text-[#FF3D00]">&quot;Do More&quot;</span>.
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                More tests, more ads, more funnels, more calls. Meanwhile, your goldmine of existing conversations sits gathering dust.
              </p>

              <ul className="space-y-4">
                {problems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <svg className="w-6 h-6 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative p-8 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="grid grid-cols-2 gap-4 opacity-50">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-slate-200 rounded-lg animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-6 rounded-xl shadow-xl border border-slate-100 text-center">
                  <div className="text-4xl mb-2">😫</div>
                  <div className="font-bold text-slate-900">Data Overload</div>
                  <div className="text-xs text-slate-500">Where was that quote?</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section section-vault border-t border-slate-200">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold uppercase tracking-wider mb-4">
              The New Leverage Game
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              You Don&apos;t Need More Volume. <br />
              You Need <span className="lava-text">More Leverage</span>.
            </h2>
            <p className="text-xl text-slate-600">
              CallVault is your meeting‑intelligence vault that turns calls into a profit library. Stop guessing and start mining your own data for gold.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all h-full">
                  <div className="text-4xl mb-6">{step.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>

                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
