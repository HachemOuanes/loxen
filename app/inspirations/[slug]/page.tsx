import { notFound } from 'next/navigation';
import { urlFor } from '@/lib/sanity';
import { getInspirationBySlug, getFinitionTypes, getDecorFinishes } from '@/lib/sanity-queries';
import { InspirationPageContent } from '@/components/inspirations/inspiration-page-content';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

async function getInspirationData(slug: string) {
    try {
        // Fetch inspiration document
        const inspiration = await getInspirationBySlug(slug);

        if (!inspiration) return null;

        // Fetch shared data (finition types and decor finishes)
        const [finitionTypes, decorFinishes] = await Promise.all([
            getFinitionTypes(),
            getDecorFinishes()
        ]);

        return {
            specific: inspiration,
            shared: {
                typesFinitions: finitionTypes,
                finitionsDisponibles: decorFinishes,
                contact: {
                    link: inspiration.contactSection?.contactLink || '/contact',
                    cta: inspiration.contactSection?.contactCta || 'Nous contacter'
                }
            }
        };
    } catch (error) {
        console.error('Error fetching inspiration data:', error);
        return null;
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const data = await getInspirationData(params.slug);
    if (!data) return notFound();
    const { shared, specific } = data;

    return (
        <main className="min-h-screen bg-white overflow-x-hidden">
            <Header />
            <InspirationPageContent shared={shared} specific={specific} />
            <Footer />
        </main>
    );
}

