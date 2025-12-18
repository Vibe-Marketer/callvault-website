const brands = ['ScaleUp Coach', 'ConsultingPro', 'AgencyFlow', 'Expert Empire', 'GrowthLabs'];

export default function SocialProof() {
  return (
    <section className="py-10 border-y border-slate-100 bg-white/50 backdrop-blur-sm">
      <div className="container">
        <p className="text-center text-sm font-medium text-slate-400 mb-8 uppercase tracking-widest">
          Trusted by 500+ Coaches & Consultants
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand) => (
            <div key={brand} className="text-xl font-bold text-slate-300 flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-slate-200" />
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
