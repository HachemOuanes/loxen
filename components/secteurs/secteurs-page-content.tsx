"use client"

import { SecteursHeroSection } from '@/components/secteurs/secteurs-hero-section'
import { SecteursFeaturesSection } from '@/components/secteurs/secteurs-features-section'
import { SecteursApplicationsSection } from '@/components/secteurs/secteurs-applications-section'
import { SecteursShowcaseSection } from '@/components/secteurs/secteurs-showcase-section'
import { SecteursCustomizationSection } from '@/components/secteurs/secteurs-customization-section'
import { SecteursProductsSection } from '@/components/secteurs/secteurs-products-section'
import { useAnimations } from '@/components/inspirations/use-animations'
import { ArtisticCtaSection } from '@/components/shared/artistic-cta-section'
import { urlFor } from '@/lib/sanity'

interface SecteursPageContentProps {
  shared: any
  specific: any
}

export function SecteursPageContent({ shared, specific }: SecteursPageContentProps) {
  const rootRef = useAnimations()

  return (
    <div ref={rootRef}>
      {/* Hero Section */}
      <SecteursHeroSection
        title={specific?.title || 'Secteurs'}
        heroTextSections={specific?.heroTextSections}
        heroImage={urlFor(specific?.heroImage).quality(100).url()}
        contactLink={shared?.contact?.link || '/contact'}
        contactCta={shared?.contact?.cta || 'Nous contacter'}
      />

      {/* Features Section */}
      {specific?.featuresSection?.features && (
        <SecteursFeaturesSection
          features={specific.featuresSection.features.map((feature: any) => ({
            icon: feature.icon ? urlFor(feature.icon).width(80).height(80).quality(90).url() : null,
            label: feature.label || ''
          }))}
        />
      )}

      {/* Showcase Section */}
      {specific?.showcaseSection && (
        <SecteursShowcaseSection
          heroImage={urlFor(specific.showcaseSection.heroImage).width(2560).height(1440).quality(95).url()}
          leftText={specific.showcaseSection.leftText}
          rightText={specific.showcaseSection.rightText}
          images={specific.showcaseSection.images.map((img: any) => ({
            src: urlFor(img.src).width(1920).height(2560).quality(95).url(),
            alt: img.alt
          }))}
        />
      )}

      {/* Dynamic sections based on data */}
      {specific?.sections?.map((section: any, sectionIndex: number) => {
        if (section.type === 'applications') {
          return (
            <SecteursApplicationsSection
              key={sectionIndex}
              title={section.title}
              items={section.items.map((item: any) => ({
                ...item,
                image: urlFor(item.image).width(1920).height(2560).quality(95).url()
              }))}
            />
          )
        }

        return null
      })}

      {/* Customization Section */}
      {specific?.customizationSection && (
        <SecteursCustomizationSection
          title={specific.customizationSection.title || "Conceptions personnalisées avec Abet Digital"}
          mainText={specific.customizationSection.mainText || ""}
          secondaryText={specific.customizationSection.secondaryText || ""}
          ctaText={specific.customizationSection.ctaText || "Découvrez Abet Digital"}
          ctaLink={specific.customizationSection.ctaLink || "/produits"}
          image={specific.customizationSection.image ? urlFor(specific.customizationSection.image).width(1920).height(2560).quality(95).url() : "/modern-architectural-facade-panels-meg-system-high.jpg"}
        />
      )}

      {/* Products Section */}
      {specific?.productsSection && (
        <SecteursProductsSection
          title={specific.productsSection.title || "Produits"}
          description={specific.productsSection.description}
          products={specific.productsSection.products?.map((item: any) => ({
            _id: item.product?._id || '',
            name: item.product?.name || '',
            slug: item.product?.slug || { current: '' },
            description: item.product?.description || '',
            image: item.product?.image,
            _productType: item.productType === 'interior' ? 'interior' : 'exterior',
            category: item.product?.category
          })) || []}
        />
      )}

      {/* Contact Section */}
      <ArtisticCtaSection
        title={specific?.contactSection?.title || specific?.title || 'projet'}
        description={specific?.contactSection?.description || "Besoin d'un conseil personnalisé pour votre projet ? Nos équipes vous accompagnent dans le choix des matériaux et la mise en œuvre."}
        contactLink={specific?.contactSection?.ctaLink || shared?.contact?.link || '/contact'}
        contactCta={specific?.contactSection?.ctaText || shared?.contact?.cta || 'Nous contacter'}
      />
    </div>
  )
}