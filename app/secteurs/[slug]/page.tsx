import { notFound } from 'next/navigation'
import { getSecteurBySlug, getSecteursSlugs } from '@/services/sanity/secteurs'
import { getRandomDecors } from '@/services/sanity/decors'
import { SecteursPageContent } from '@/components/secteurs/secteurs-page-content'
import { Header } from '@/components/shared/header'
import { BottomBar } from '@/components/shared/bottom-bar'
import { Footer } from '@/components/shared/footer'

// Revalidate every 60 seconds
export const revalidate = 10

export async function generateStaticParams() {
  try {
    const slugs = await getSecteursSlugs()
    return slugs.map((slug: string) => ({ slug }))
  } catch (error) {
    console.error('Error generating static params for secteurs:', error)
    return []
  }
}

export default async function SecteursPage({ params }: { params: { slug: string } }) {
  try {
    const specific = await getSecteurBySlug(params.slug)

    if (!specific) {
      return notFound()
    }

    // Fetch shared data (random decors)
    const randomDecors = await getRandomDecors(20).catch(() => [])

    const shared = {
      finitionsDisponibles: {
        title: 'Décors disponibles',
        productSlug: 'random', // Special flag for random decors
        decors: randomDecors
      },
      contact: {
        link: '/#contact',
        cta: 'Nous contacter'
      }
    }

    return (
      <main className="min-h-screen bg-white overflow-x-hidden">
        <Header />
        <SecteursPageContent shared={shared} specific={specific} />
        <Footer />
        <BottomBar />
      </main>
    )
  } catch (error) {
    console.error('Error fetching secteur:', error)
    return notFound()
  }
}