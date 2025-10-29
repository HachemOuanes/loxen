import { notFound } from 'next/navigation'
import { getSecteurBySlug, getSecteursSlugs } from '@/services/sanity/secteurs'
import { SecteursPageContent } from '@/components/secteurs/secteurs-page-content'
import { Header } from '@/components/shared/header'
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

    // Mock shared data for now (will be replaced with Sanity data later)
    const shared = {
      contact: {
        link: '/contact',
        cta: 'Nous contacter'
      }
    }

    return (
      <main className="min-h-screen bg-white overflow-x-hidden">
        <Header />
        <SecteursPageContent shared={shared} specific={specific} />
        <Footer />
      </main>
    )
  } catch (error) {
    console.error('Error fetching secteur:', error)
    return notFound()
  }
}