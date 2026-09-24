export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl space-y-8" aria-busy="true" aria-label="Cargando">
      <div className="h-12 w-20 animate-pulse rounded bg-stone-200" />
      <div className="h-96 animate-pulse rounded-3xl bg-stone-200" />
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-stone-200" />
        <div className="h-6 w-96 animate-pulse rounded bg-stone-200" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="h-64 animate-pulse rounded-2xl bg-stone-200" />
        <div className="h-64 animate-pulse rounded-2xl bg-stone-200" />
      </div>
    </div>
  );
}