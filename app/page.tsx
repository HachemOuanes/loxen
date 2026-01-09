import { Header } from "@/components/shared/header"
import { HeroSection } from "@/components/home/hero-section"
import { ApplicationsSection } from "@/components/home/applications-section"
import { VisionSection } from "@/components/home/vision-section"
import { ProductsSection } from "@/components/home/products-section"
import { SolutionsSection } from "@/components/home/solutions-section"
import { InspirationSection } from "@/components/home/inspiration-section"
import { ContactSection } from "@/components/home/contact-section"
import { Footer } from "@/components/shared/footer"
import { getSiteSettings, getPageSEO, generateMetadata as createMetadata, generateStructuredData } from "@/lib/seo"
import {
  getHomeHeroSection,
  getHomeApplicationsSection,
  getHomeVisionSection,
  getHomeProductsSection,
  getHomeSolutionsSection,
  getHomeInspirationSection,
  getContactInfo,
} from "@/services/sanity/home"
import type { Metadata } from 'next'

// Enable ISR - revalidate once per day (24 hours)
export const revalidate = 1

export async function generateMetadata(): Promise<Metadata> {
  const [siteSettings, pageSeo] = await Promise.all([
    getSiteSettings(),
    getPageSEO('home')
  ])

  return createMetadata(siteSettings, pageSeo)
}

// Fetch all home page data for static generation
async function getHomePageData() {
  try {
    const [hero, applications, vision, products, solutions, inspiration, contact] = await Promise.all([
      getHomeHeroSection(),
      getHomeApplicationsSection(),
      getHomeVisionSection(),
      getHomeProductsSection(),
      getHomeSolutionsSection(),
      getHomeInspirationSection(),
      getContactInfo(),
    ])

    return {
      hero,
      applications,
      vision,
      products,
      solutions,
      inspiration,
      contact,
    }
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return {
      hero: null,
      applications: null,
      vision: null,
      products: null,
      solutions: null,
      inspiration: null,
      contact: null,
    }
  }
}

export default async function HomePage() {
  // Fetch data at build time
  const [homeData, siteSettings] = await Promise.all([
    getHomePageData(),
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
      
      <main className="w-full">
        <Header />
        <HeroSection heroData={homeData.hero} />
        <ApplicationsSection data={homeData.applications} />
        <VisionSection data={homeData.vision} />
        <ProductsSection data={homeData.products} />
        <SolutionsSection data={homeData.solutions} />
        <InspirationSection data={homeData.inspiration} />
        <ContactSection data={homeData.contact} />
        <Footer />
      </main>
    </>
  )
}