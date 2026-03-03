const CountryDetailSkeleton = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 animate-pulse">
      <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded mb-6" />

      <div className="grid gap-8 md:grid-cols-[1.2fr,1.8fr]">
        {/* Bandera */}
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-xl" />

        {/* Info */}
        <div className="space-y-4">
          <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded" />

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>

            <div className="space-y-2">
              <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailSkeleton;
