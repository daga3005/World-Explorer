const Hero: React.FC = () => {
  return (
    <section className="relative h-[75vh] min-h-[380px] w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-700"
        style={{
          backgroundImage:
            "url('https://wallpapers.com/images/hd/world-map-pictures-6jhib448v3y63bbr.jpg')",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-slate-950/30 dark:from-slate-950/90 dark:via-slate-950/70 dark:to-slate-950/40" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background-light dark:from-background-dark" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
        <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">
            Explora el mundo
          </p>
        </div>

        <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          Descubre países,{' '}
          <span className="bg-gradient-to-r from-sky-300 to-emerald-300 bg-clip-text text-transparent">
            regiones y fronteras
          </span>{' '}
          en una sola vista.
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300/90">
          Busca por nombre, filtra por región y profundiza en los detalles de
          cada país, incluyendo sus países fronterizos.
        </p>

        <div className="mt-6 flex items-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✦</span> 250+ países
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-sky-400">✦</span> 5 regiones
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-cyan-400">✦</span> Datos en tiempo real
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;