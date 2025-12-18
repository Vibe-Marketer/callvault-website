const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const freePlan = ['Up to 50 active calls', 'Full historical sync (locked > 50)', 'Basic search', 'Single-call export', '20 AI actions / month'];
const proPlan = ['Unlimited active calls', 'Advanced automation rules', 'Bulk operations & tagging', 'Full AI & Analytics suite', 'Bulk exports (CSV, PDF, ZIP)', 'Priority support'];
const teamsPlan = ['Everything in Pro', 'Team analytics dashboard', 'Shared prompt library', 'AI sales coach grading', 'Role-based permissions', 'SSO & Enterprise security'];

export default function Pricing() {
  return (
    <section id="pricing" className="section section-vault">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Simple Pricing for <span className="lava-text">Serious Growth</span>
          </h2>
          <p className="text-lg text-slate-600">Start for free, upgrade when you&apos;re ready to scale.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-slate-900 mb-2">$0</div>
              <p className="text-slate-500 text-sm">Forever free for individuals.</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {freePlan.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a href="https://app.callvaultai.com" className="w-full rounded-full bg-slate-900 text-white hover:bg-slate-800 py-3 text-center font-medium transition-colors block">
              Start Free
            </a>
          </div>

          {/* Pro Plan */}
          <div className="relative bg-white p-8 rounded-2xl border-2 border-orange-500 shadow-xl flex flex-col transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 lava-bg text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
              Most Popular
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Pro</h3>
              <div className="text-4xl font-bold text-slate-900 mb-2">$49<span className="text-lg font-normal text-slate-500">/mo</span></div>
              <p className="text-slate-500 text-sm">For power users & consultants.</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {proPlan.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                  <Check className="w-5 h-5 text-orange-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a href="https://app.callvaultai.com" className="btn btn-primary w-full py-3 text-center block">
              Start 14-Day Pro Trial
            </a>
          </div>

          {/* Teams Plan */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 border-dashed flex flex-col opacity-80 hover:opacity-100 transition-opacity">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Teams</h3>
              <div className="text-2xl font-bold text-slate-500 mb-2">Coming Soon</div>
              <p className="text-slate-500 text-sm">For agencies & sales teams.</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {teamsPlan.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-500 text-sm">
                  <Check className="w-5 h-5 text-slate-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full rounded-full border border-slate-300 text-slate-600 hover:bg-white py-3 text-center font-medium transition-colors">
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
