import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MissionSection } from "@/components/mission-section"
import { DesignShowcaseSection } from "@/components/design-showcase-section"
import { ServicesSection } from "@/components/services-section"
import { BrandsSection } from "@/components/brands-section"
import { InspirationsSection } from "@/components/inspirations-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <MissionSection />
      <DesignShowcaseSection />
      <ServicesSection />
      <BrandsSection />
      <InspirationsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
