"use client"

import { HeroSection } from '@/components/inspirations/hero-section'
import { ApplicationsSection } from '@/components/inspirations/applications-section'
import { CollageSection } from '@/components/inspirations/collage-section'
import { BigImageSection } from '@/components/inspirations/big-image-section'
import { SplitSection } from '@/components/inspirations/split-section'
import { GridSection } from '@/components/inspirations/grid-section'
import { FinitionsSection } from '@/components/inspirations/finitions-section'
import { DecorsDispoGrid } from '@/components/inspirations/decors-dispo-grid'
import { ArtisticCtaSection } from '@/components/shared/artistic-cta-section'
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

      {/* Applications Section - Conditionally rendered */}
      {specific?.applicationsSection?.enabled !== false && specific?.applicationsSection && (
        <ApplicationsSection
          title={specific.applicationsSection.title}
          items={specific.applicationsSection.items || []}
        />
      )}

      {/* Collage Section - Conditionally rendered */}
      {specific?.collageSection?.enabled !== false && specific?.collageSection && (
        <CollageSection
          images={specific.collageSection.images || []}
          tiles={specific.collageSection.tiles || []}
          title={specific.collageSection.title}
        />
      )}

      {/* Big Images Section - Conditionally rendered */}
      {specific?.bigImages?.enabled !== false && specific?.bigImages?.images && specific.bigImages.images.length > 0 && (
        <BigImageSection
          images={specific.bigImages.images}
          alt={specific?.title || 'Inspiration'}
          title={specific.bigImages.title}
        />
      )}

      {/* Split Section - Conditionally rendered */}
      {specific?.splitSection?.enabled !== false && specific?.splitSection && (
        <SplitSection
          topImage={specific.splitSection.topImage}
          topText={specific.splitSection.topText}
          bottomImage={specific.splitSection.bottomImage}
          title={specific.splitSection.title}
        />
      )}

      {/* Grid Section - Conditionally rendered */}
      {specific?.gridSection?.enabled !== false && specific?.gridSection && (
        <GridSection
          text={specific.gridSection.text}
          images={specific.gridSection.images || []}
          title={specific.gridSection.title}
        />
      )}

      {/* Finitions Section - Conditionally rendered */}
      {specific?.showFinitions !== false && (
        <FinitionsSection
          title={shared?.typesFinitions?.title || 'Les types de finitions'}
          items={shared?.typesFinitions?.items || []}
        />
      )}

      {/* Decors Section - Conditionally rendered based on toggle */}
      {specific?.showDecors !== false && (
        <section id="examples" className="relative bg-white py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <DecorsDispoGrid slug={shared?.finitionsDisponibles?.productSlug || "meg-standard"} shared={shared} />
          </div>
        </section>
      )}

      {/* Contact Section - Conditionally rendered */}
      {specific?.contactSection?.enabled !== false && (
        <ArtisticCtaSection
          title={specific?.contactSection?.title || specific?.title || 'projet'}
          description={specific?.contactSection?.description || "Besoin d'un rendu marbre ou bois, de coupes spéciales ou d'un format sur-mesure ? Nos équipes vous accompagnent dans le choix des finitions et la mise en œuvre HPL."}
          contactLink={specific?.contactSection?.contactLink || shared?.contact?.link || '/contact'}
          contactCta={specific?.contactSection?.contactCta || shared?.contact?.cta || 'Nous contacter'}
        />
      )}
    </div>
  )
}
