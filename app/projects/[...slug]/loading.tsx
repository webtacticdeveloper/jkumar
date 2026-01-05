export default function Loading() {
  return (
    <section className="w-full bg-forecolor text-background pt-10 pb-20 px-4 md:px-8 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="h-8 w-1/3 bg-white/10 rounded-lg" />
        <div className="h-4 w-2/3 bg-white/10 rounded-lg" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-64 rounded-2xl bg-white/10 border border-white/10"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
