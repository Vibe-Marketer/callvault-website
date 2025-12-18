import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-vault-bg.png"
          alt=""
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Meeting Intelligence for Coaches
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1] animate-fade-in-up animation-delay-100">
            Stop Doing More. <br />
            Start <span className="lava-text">Profiting</span> From the Calls You Already Have.
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-200">
            CallVault turns every Fathom recording into an organized, searchable library you can mine to sharpen your offer, nail your messaging, and close more perfect‑fit clients.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up animation-delay-300">
            <a href="https://app.callvaultai.com" className="btn btn-primary btn-lg shadow-xl shadow-orange-500/25">
              Start Free
            </a>
            <a href="#demo" className="btn btn-outline btn-lg group">
              <svg className="w-4 h-4 mr-2 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch 2-min Demo
            </a>
          </div>

          <p className="mt-4 text-sm text-slate-400 animate-fade-in-up animation-delay-400">
            No credit card required · Connect Fathom in minutes
          </p>
        </div>

        {/* Product Mockup */}
        <div className="relative max-w-5xl mx-auto animate-fade-in-up animation-delay-500 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

          <div className="relative rounded-2xl overflow-hidden border border-white/50 shadow-2xl bg-white/80 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent z-10 pointer-events-none" />
            <Image
              src="/organized-library.png"
              alt="CallVault Dashboard"
              width={1200}
              height={675}
              className="w-full h-auto transform transition-transform duration-700 hover:scale-[1.01]"
            />

            {/* Floating UI Element */}
            <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 max-w-xs hidden md:block animate-float">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">New Insight Found</div>
                  <div className="text-xs text-slate-500">Just now</div>
                </div>
              </div>
              <p className="text-xs text-slate-600">&quot;Client mentioned &apos;scalability&apos; 5 times. Suggested tag: #Enterprise-Ready&quot;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
