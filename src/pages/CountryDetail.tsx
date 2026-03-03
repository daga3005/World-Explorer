import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { type Country } from '../types/country';
import { fetchCountryByCode, fetchCountriesByCodes } from '../lib/api';
import CountryDetailSkeleton from '../components/skeletons/CountryDetailSkeleton';

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
      {label}
    </span>
    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{value}</span>
  </div>
);

const CountryDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!code) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCountryByCode(code);
        setCountry(data);
        if (data.borders && data.borders.length > 0) {
          const bordersData = await fetchCountriesByCodes(data.borders);
          setBorderCountries(bordersData);
        } else {
          setBorderCountries([]);
        }
      } catch (err) {
        setError('No se pudo cargar la información del país.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <Navbar />
        <CountryDetailSkeleton />
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <Navbar />
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 dark:border-red-900/40 dark:bg-red-950/30">
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              {error || 'País no encontrado.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const nativeNames = country.name.nativeName
    ? Object.values(country.name.nativeName).map(n => n.common).join(', ')
    : 'N/A';
  const currencies = country.currencies
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
    : 'N/A';
  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="group mb-8 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:shadow dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">←</span>
          Volver
        </button>

        <div className="grid gap-10 md:grid-cols-[1.1fr,1.9fr]">
          {/* Flag */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:shadow-slate-950/60">
            <img
              src={country.flags.svg}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {country.name.common}
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {country.name.official}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 dark:border-slate-800/60 dark:bg-slate-800/30 sm:grid-cols-3">
              <InfoRow label="Capital" value={country.capital?.[0] ?? 'N/A'} />
              <InfoRow label="Región" value={country.region} />
              {country.subregion && <InfoRow label="Subregión" value={country.subregion} />}
              <InfoRow label="Población" value={country.population.toLocaleString('es-ES')} />
              <InfoRow label="Monedas" value={currencies} />
              <InfoRow label="Idiomas" value={languages} />
              <InfoRow label="Nombres nativos" value={nativeNames} />
            </div>

            {/* Borders */}
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Países fronterizos
              </p>
              {borderCountries.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {borderCountries.map(b => (
                    <Link
                      key={b.cca3}
                      to={`/country/${b.cca3}`}
                      className="group flex items-center gap-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow dark:border-slate-700/60 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                    >
                      <img
                        src={b.flags.svg}
                        alt={b.name.common}
                        className="h-6 w-9 object-cover"
                      />
                      <span className="pr-3 text-xs font-medium text-slate-700 dark:text-slate-300">
                        {b.name.common}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Este país no tiene fronteras terrestres.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CountryDetail;