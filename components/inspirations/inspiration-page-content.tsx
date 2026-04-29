"use client"

import { HeroSection } from '@/components/inspirations/hero-section'
import { ApplicationsSection } from '@/components/inspirations/applications-section'
import { CollageSection } from '@/components/inspirations/collage-section'
import { BigImageSection } from '@/components/inspirations/big-image-section'
import { SplitSection } from '@/components/inspirations/split-section'
import { GridSection } from '@/components/inspirations/grid-section'
import { FinitionsSection } from '@/components/inspirations/finitions-section'
import { DecorsSection } from '@/components/shared/decors-section'
import { ArtisticCtaSection } from '@/components/shared/artistic-cta-section'
import { SecteursProductsSection } from '@/components/secteurs/secteurs-products-section'
import { useAnimations } from '@/components/shared/use-animations'

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
        contactLink={shared?.contact?.link || '/#contact'}
        contactCta={shared?.contact?.cta || 'Nous contacter'}
        leftText={specific?.heroLeftText}
        rightText={specific?.heroRightText}
      />

      {/* Decors Section - Conditionally rendered based on toggle */}
      <DecorsSection
        enabled={specific?.showDecors === true}
        slug={shared?.finitionsDisponibles?.productSlug || "meg-standard"}
        shared={shared}
      />

      {/* Applications Section - Conditionally rendered */}
      {specific?.applicationsSection?.enabled === true && specific?.applicationsSection && (
        <ApplicationsSection
          title={specific.applicationsSection.title}
          items={specific.applicationsSection.items || []}
        />
      )}

      {/* Collage Section - Conditionally rendered */}
      {specific?.collageSection?.enabled === true && specific?.collageSection && (
        <CollageSection
          images={specific.collageSection.images || []}
          tiles={specific.collageSection.tiles || []}
          title={specific.collageSection.title}
        />
      )}
      
      {/* Finitions Section - Conditionally rendered */}
      {specific?.showFinitions === true && (
        <FinitionsSection
          title={shared?.typesFinitions?.title || 'Les types de finitions'}
          items={shared?.typesFinitions?.items || []}
        />
      )}

      {/* Big Images Section - Conditionally rendered */}
      {specific?.bigImages?.enabled === true && specific?.bigImages?.images && specific.bigImages.images.length > 0 && (
        <BigImageSection
          images={specific.bigImages.images}
          alt={specific?.title || 'Inspiration'}
          title={specific.bigImages.title}
        />
      )}

      {/* Split Section - Conditionally rendered */}
      {specific?.splitSection?.enabled === true && specific?.splitSection && (
        <SplitSection
          topImage={specific.splitSection.topImage}
          topText={specific.splitSection.topText}
          bottomImage={specific.splitSection.bottomImage}
          title={specific.splitSection.title}
        />
      )}

      {/* Grid Section - Conditionally rendered */}
      {specific?.gridSection?.enabled === true && specific?.gridSection && (
        <GridSection
          text={specific.gridSection.text}
          images={specific.gridSection.images || []}
          title={specific.gridSection.title}
        />
      )}

      {/* Products Section - Conditionally rendered */}
      {specific?.productsSection?.enabled === true && specific?.productsSection && (
        <SecteursProductsSection
          title={specific.productsSection.title || "Produits"}
          description={specific.productsSection.description}
          products={specific.productsSection.products?.map((item: any) => ({
            _id: item.product?._id || '',
            name: item.product?.name || '',
            slug: item.product?.slug || { current: '' },
            description: item.product?.description || '',
            image: item.product?.image,
            _productType: item.productType === 'interieur' ? 'interior' : 'exterior',
            category: item.product?.category
          })) || []}
        />
      )}

      {/* Contact Section - Conditionally rendered */}
      {specific?.contactSection?.enabled === true && (
        <ArtisticCtaSection
          title={specific?.contactSection?.title || specific?.title || 'projet'}
          description={specific?.contactSection?.description || "Besoin d'un rendu marbre ou bois, de coupes spéciales ou d'un format sur-mesure ? Nos équipes vous accompagnent dans le choix des finitions et la mise en œuvre HPL."}
          contactCta={specific?.contactSection?.contactCta || shared?.contact?.cta || 'Nous contacter'}
        />
      )}
    </div>
  )
}
