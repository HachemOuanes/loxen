import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { InspirationSection } from "@/components/inspiration-section"
import { ProductsSection } from "@/components/products-section"
import { InteriorSection } from "@/components/interior-section"
import { ExteriorSection } from "@/components/exterior-section"
import { PartnersSection } from "@/components/partners-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <InspirationSection />
      <ProductsSection />
      <InteriorSection />
      <ExteriorSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
