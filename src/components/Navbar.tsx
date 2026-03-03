import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/40 bg-white/75 backdrop-blur-xl dark:border-white/5 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-cyan-400 to-emerald-400 shadow-lg shadow-sky-500/25">
            <span className="text-base">🌍</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              World Explorer
            </span>
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Países · Regiones · Fronteras
            </span>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="group flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800"
        >
          <span className="transition-transform duration-300 group-hover:rotate-12">
            {theme === 'light' ? '🌙' : '☀️'}
          </span>
          {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;