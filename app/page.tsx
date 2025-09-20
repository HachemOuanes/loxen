import { Header } from "@/components/shared/header"
import { HeroSection } from "@/components/home/hero-section"
import { InspirationSection } from "@/components/home/inspiration-section"
import { ProductsSection } from "@/components/home/products-section"
import { InteriorSection } from "@/components/home/interior-section"
import { ExteriorSection } from "@/components/home/exterior-section"
import { PartnersSection } from "@/components/home/partners-section"
import { ContactSection } from "@/components/home/contact-section"
import { Footer } from "@/components/shared/footer"
import { client } from "@/lib/sanity"
import { getSiteSettings, getPageSEO, generateMetadata as createMetadata, generateStructuredData } from "@/lib/seo"
import type { Metadata } from 'next'

// Enable ISR - revalidate once per day (24 hours)
export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const [siteSettings, pageSeo] = await Promise.all([
    getSiteSettings(),
    getPageSEO('home')
  ])

  return createMetadata(siteSettings, pageSeo)
}

// Fetch hero data for static generation
async function getHeroData() {
  const query = `*[_type == "heroSection"][0]`
  return await client.fetch(query)
}

export default async function HomePage() {
  // Fetch data at build time
  const [heroData, siteSettings] = await Promise.all([
    getHeroData(),
    getSiteSettings()
  ])

  const structuredData = generateStructuredData(siteSettings)

  return (
    <>
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      <main className="min-h-screen">
        <Header />
        <HeroSection heroData={heroData} />
        <InspirationSection />
        <ProductsSection />
        <ExteriorSection />
        <InteriorSection />
        <PartnersSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}