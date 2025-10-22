"use client"

import { HeroSection } from '@/components/inspirations/hero-section'
import { ApplicationsSection } from '@/components/inspirations/applications-section'
import { CollageSection } from '@/components/inspirations/collage-section'
import { FinitionsSection } from '@/components/inspirations/finitions-section'
import { DecorsDispoGrid } from '@/components/inspirations/decors-dispo-grid'
import { ContactSection } from '@/components/inspirations/contact-section'
import { useAnimations } from '@/components/inspirations/use-animations'

interface InspirationPageContentProps {
  shared: any
  specific: any
}

export function InspirationPageContent({ shared, specific }: InspirationPageContentProps) {
  const rootRef = useAnimations()

  return (
    <div ref={rootRef}>
      {/* Hero Section */}
      <HeroSection
        title={specific?.title || 'Inspiration'}
        description={specific?.description || ''}
        heroImage={specific?.heroImage}
        contactLink={shared?.contact?.link || '/contact'}
        contactCta={shared?.contact?.cta || 'Nous contacter'}
      />

      {/* Dynamic sections based on data */}
      {specific?.sections?.map((section: any, sectionIndex: number) => {
        if (section.type === 'applications') {
          return (
            <ApplicationsSection
              key={sectionIndex}
              title={section.title}
              items={section.items}
            />
          )
        }

        if (section.type === 'collage') {
          return (
            <CollageSection
              key={sectionIndex}
              images={section.images}
              tiles={section.tiles}
              title={specific?.title || 'HPL'}
            />
          )
        }

        return null
      })}

      {/* Finitions Section */}
      <FinitionsSection
        title={shared?.typesFinitions?.title || 'Les types de finitions'}
        items={shared?.typesFinitions?.items || []}
      />

      {/* Finitions disponibles (from MEG Standard) */}
      <section id="examples" className="relative bg-white py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <DecorsDispoGrid slug={shared?.finitionsDisponibles?.productSlug || "meg-standard"} shared={shared} />
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection
        title={specific?.contactSection?.title || specific?.title || 'projet'}
        description={specific?.contactSection?.description || "Besoin d'un rendu marbre ou bois, de coupes spéciales ou d'un format sur-mesure ? Nos équipes vous accompagnent dans le choix des finitions et la mise en œuvre HPL."}
        contactLink={shared?.contact?.link || '/contact'}
        contactCta={shared?.contact?.cta || 'Nous contacter'}
      />
    </div>
  )
}
