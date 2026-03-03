import { type Country } from '../types/country';
import { Link } from 'react-router-dom';

interface Props {
  country: Country;
}

const CountryCard: React.FC<Props> = ({ country }) => {
  return (
    <Link
      to={`/country/${country.cca3}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300/60 hover:shadow-xl hover:shadow-slate-200/60 dark:border-slate-800/60 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-slate-950/60"
    >
      {/* Flag */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Region badge */}
        <div className="absolute right-2.5 top-2.5 rounded-full bg-slate-950/60 px-2.5 py-0.5 backdrop-blur-sm">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90">
            {country.region}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-50 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
          {country.name.common}
        </h3>

        <div className="space-y-1">
          {country.capital && (
            <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="text-slate-300 dark:text-slate-600">📍</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">{country.capital[0]}</span>
            </p>
          )}
          <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="text-slate-300 dark:text-slate-600">👥</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {country.population.toLocaleString('es-ES')}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;