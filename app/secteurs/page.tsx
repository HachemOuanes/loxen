import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { SectorImageSections } from "@/components/secteurs/sector-image-sections"
import Link from "next/link"
import { secteursIndex } from "@/lib/secteurs-data"

export default function SecteursPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <div className="pt-20" />
      <SectorImageSections />
      {/* Sectors index */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-4">
            <span className="h-[1px] w-8 bg-black/20" /> Parcourir les secteurs
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {secteursIndex.map((s) => (
              <Link key={s.slug} href={`/secteurs/${s.slug}`} className="group relative h-64 md:h-72 overflow-hidden border border-black/10">
                <img src={s.heroImage} alt={s.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <p className="text-white/90 text-sm uppercase tracking-[0.14em]">{s.title}</p>
                  <p className="text-white/80 text-xs mt-1 line-clamp-2">{s.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}