export default function Skeleton({ count = 3 }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="glass h-80 animate-pulse rounded-3xl p-5">
          <div className="h-44 rounded-2xl bg-slate-200/80 dark:bg-white/10" />
          <div className="mt-5 h-4 w-2/3 rounded bg-slate-200 dark:bg-white/10" />
          <div className="mt-3 h-4 w-1/2 rounded bg-slate-200 dark:bg-white/10" />
        </div>
      ))}
    </div>
  );
}
