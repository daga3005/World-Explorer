import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchFilterBar from '../components/SearchFilterBar';
import CountryGrid from '../components/CountryGrid';
import CountryGridSkeleton from '../components/skeletons/CountryGridSkeleton';
import { type Country } from '../types/country';
import { fetchAllCountries } from '../lib/api';

const Home: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  // Infinite scroll
  const ITEMS_PER_LOAD = 30;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllCountries();
        setCountries(data);
      } catch (err) {
        setError('No se pudieron cargar los países.');
        console.log(err)
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Filtrar países
  const filtered = useMemo(() => {
    return countries.filter(c => {
      const matchesSearch = c.name.common
        .toLowerCase()
        .includes(search.toLowerCase().trim());
      const matchesRegion = region ? c.region === region : true;
      return matchesSearch && matchesRegion;
    });
  }, [countries, search, region]);

  // Resetear scroll cuando cambian filtros
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [search, region]);

  // Países visibles actualmente
  const visibleCountries = filtered.slice(0, visibleCount);

  // IntersectionObserver para cargar más
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting) {
          setVisibleCount(prev =>
            Math.min(prev + ITEMS_PER_LOAD, filtered.length)
          );
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [filtered]);

  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <Navbar />
      <Hero />

      <SearchFilterBar
        search={search}
        region={region}
        onSearchChange={setSearch}
        onRegionChange={setRegion}
      />

      {loading ? (
        <CountryGridSkeleton />
      ) : (
        <CountryGrid
          countries={visibleCountries}
          loading={false}
          error={error}
        />
      )}

      {/* Sentinel para infinite scroll */}
      {!loading && visibleCountries.length < filtered.length && (
        <div
          ref={loaderRef}
          className="h-10 w-full flex justify-center items-center text-sm text-slate-500 dark:text-slate-400"
        >
          Cargando más países...
        </div>
      )}
    </div>
  );
};

export default Home;
