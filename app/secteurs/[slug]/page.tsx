import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { SectorImageSections } from "@/components/secteurs/sector-image-sections"
import { getSectorBySlug, secteursIndex } from "@/lib/secteurs-data"
import { notFound } from "next/navigation"

export const revalidate = 86400

export async function generateStaticParams() {
    return secteursIndex.map((s) => ({ slug: s.slug }))
}

export default function SecteursPage({ params }: { params: { slug: string } }) {
    const data = getSectorBySlug(params.slug)
    if (!data) return notFound()
    return (
        <main className="min-h-screen bg-white overflow-x-hidden">
            <Header />
            <div className="pt-20" />
            <SectorImageSections title={`${data.title} — MEG, Easy MEG & HPL`} description={data.description} />
            <Footer />
        </main>
    )
}