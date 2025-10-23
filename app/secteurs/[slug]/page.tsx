import { notFound } from 'next/navigation';
import { SecteursPageContent } from '@/components/secteurs/secteurs-page-content';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { getSecteurBySlug, getSecteursSlugs } from '@/services/sanity/secteurs';

export const revalidate = 86400

export async function generateStaticParams() {
  const slugs = await getSecteursSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function SecteursPage({ params }: { params: { slug: string } }) {
  const specific = await getSecteurBySlug(params.slug);
  if (!specific) return notFound();

  // Mock shared data for now (will be replaced with Sanity data later)
  const shared = {
    contact: {
      link: '/contact',
      cta: 'Nous contacter'
    }
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <SecteursPageContent shared={shared} specific={specific} />
      <Footer />
    </main>
  );
}