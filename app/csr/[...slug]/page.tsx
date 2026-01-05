
import { notFound } from "next/navigation";
import { csrData } from "@/data/csr-page-data";
import ImageGallery from "@/components/ImageGallery";

export default async function CSRDetailPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  // Await params (Required in Next.js 15+)
  const { slug } = await params;

  // catch-all routes → slug is always an array
  if (!slug || slug.length === 0) return notFound();

  const pageSlug = slug[0]; // first part of URL

  const csr = csrData.find((item) => item.slug === pageSlug);
  if (!csr) return notFound();

  return (
    <section className="w-full bg-background text-[var(--foreground)] pt-10 pb-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* TITLE */}
        <div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-14 md:w-16 bg-gradient-to-r via-primary to-primary" />
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight capitalize text-black text-center">
              {csr.title}
            </h2>
            <div className="h-[2px] w-14 md:w-16 bg-gradient-to-r via-primary from-primary" />
          </div>

          <p className="text-[var(--muted-foreground)] text-center italic leading-relaxed mb-4">
            {csr.quote}
          </p>

          <p className="text-[var(--muted-foreground)] text-center leading-relaxed">
            {csr.description}
          </p>

          <p className="text-[var(--foreground)] text-center font-semibold mt-4">
            — {csr.person}
          </p>
        </div>

        {/* GALLERY */}
        <ImageGallery
          images={csr.images}
          altPrefix={csr.title}
          className="mt-8"
        />

        {/* OTHER CSR */}
        <div className="pt-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[2px] w-16 bg-gradient-to-r via-primary to-primary" />
            <h3 className="text-xl md:text-2xl font-semibold text-[var(--primary)] text-center">
              Other CSR Initiatives
            </h3>
            <div className="h-[2px] w-16 bg-gradient-to-r from-[var(--primary)] via-primary" />
          </div>

          <div className="grid md:grid-cols-3 gap-y-4 md:gap-x-12 text-base md:text-lg">
            {csrData.map((item) => (
              <a
                key={item.slug}
                href={item.slug === pageSlug ? "#" : `/csr/${item.slug}`}
                className={`text-center transition ${item.slug === pageSlug
                    ? "text-[var(--primary)] font-semibold pointer-events-none"
                    : "hover:text-[var(--primary)]"
                  }`}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
