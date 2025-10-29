import { notFound } from 'next/navigation'
import { getInspirationBySlug, getInspirationSlugs, getFinitionTypes } from '@/services/sanity/inspirations'
import { getRandomDecors } from '@/services/sanity/decors'
import { InspirationPageContent } from '@/components/inspirations/inspiration-page-content'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'

// Revalidate every 60 seconds
export const revalidate = 10

export async function generateStaticParams() {
    try {
        const slugs = await getInspirationSlugs()
        return slugs.map((slug: string) => ({ slug }))
    } catch (error) {
        console.error('Error generating static params for inspirations:', error)
        return []
    }
}

export default async function InspirationPage({ params }: { params: { slug: string } }) {
    try {
        // Fetch inspiration document
        const inspiration = await getInspirationBySlug(params.slug)

        if (!inspiration) {
            return notFound()
        }

        // Fetch shared data (finition types and random decors)
        const [finitionTypes, randomDecors] = await Promise.all([
            getFinitionTypes(),
            getRandomDecors(20)
        ])

        const shared = {
            typesFinitions: finitionTypes,
            finitionsDisponibles: {
                title: 'Décors disponibles',
                productSlug: 'random', // Special flag for random decors
                decors: randomDecors
            },
            contact: {
                link: inspiration.contactSection?.contactLink || '/contact',
                cta: inspiration.contactSection?.contactCta || 'Nous contacter'
            }
        }

        return (
            <main className="min-h-screen bg-white overflow-x-hidden">
                <Header />
                <InspirationPageContent shared={shared} specific={inspiration} />
                <Footer />
            </main>
        )
    } catch (error) {
        console.error('Error fetching inspiration:', error)
        return notFound()
    }
}

