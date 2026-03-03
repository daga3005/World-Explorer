import { type Country } from '../types/country';
import CountryCard from './CountryCard';
import CountryGridSkeleton from './skeletons/CountryGridSkeleton';

interface Props {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

const CountryGrid: React.FC<Props> = ({ countries, loading, error }) => {
  if (loading) return <CountryGridSkeleton />;

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 dark:border-red-900/40 dark:bg-red-950/30">
          <span className="text-lg">⚠️</span>
          <p className="text-sm font-medium text-red-700 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!countries.length) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <p className="text-2xl mb-2">🔍</p>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          No se encontraron países con esos criterios.
        </p>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Intenta con otro nombre o región.
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 pb-16">
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {countries.map(country => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </main>
  );
};

export default CountryGrid;