const CountryGridSkeleton = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-10">
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-slate-200/70 bg-white dark:bg-slate-900 dark:border-slate-800"
          >
            <div className="h-40 w-full bg-slate-200 dark:bg-slate-800" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default CountryGridSkeleton;
