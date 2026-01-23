"use client"

import { SecteursHeroSection } from '@/components/secteurs/secteurs-hero-section'
import { SecteursApplicationsSection } from '@/components/secteurs/secteurs-applications-section'
import { SecteursShowcaseSection } from '@/components/secteurs/secteurs-showcase-section'
import { SecteursCustomizationSection } from '@/components/secteurs/secteurs-customization-section'
import { SecteursProductsSection } from '@/components/secteurs/secteurs-products-section'
import { DecorsSection } from '@/components/shared/decors-section'
import { useAnimations } from '@/components/shared/use-animations'
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
        heroImage={specific?.heroImage ? urlFor(specific.heroImage).quality(100).url() : ''}
        contactLink={shared?.contact?.link || '/#contact'}
        contactCta={shared?.contact?.cta || 'Nous contacter'}
      />

      {/* Decors Section - Conditionally rendered based on toggle */}
      <DecorsSection 
        enabled={specific?.showDecors === true}
        slug={shared?.finitionsDisponibles?.productSlug || "meg-standard"}
        shared={shared}
      />

      {/* Big Text Section - Below hero section */}
      {specific?.bigTextSection?.enabled === true && (specific?.bigTextSection?.largeText || specific?.bigTextSection?.smallText) && (
        <section className="relative bg-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left side - Large text */}
              {specific.bigTextSection.largeText && (
                <div className="flex flex-col">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl text-black tracking-[-0.02em] leading-tight">
                    {specific.bigTextSection.largeText}
                  </h2>
                </div>
              )}

              {/* Right side - Descriptive text */}
              {specific.bigTextSection.smallText && (
                <div className="flex flex-col space-y-4">
                  {specific.bigTextSection.smallText.split('\n\n').map((paragraph: string, index: number) => (
                    paragraph.trim() && (
                      <p key={index} className="text-lg md:text-xl text-black/70 leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Showcase Section - Conditionally rendered (before applications to match CMS order) */}
      {specific?.showcaseSection?.enabled === true && specific?.showcaseSection?.heroImage && (
        <SecteursShowcaseSection
          heroImage={urlFor(specific.showcaseSection.heroImage).width(2560).height(1440).quality(95).url()}
          leftText={specific.showcaseSection.leftText}
          rightText={specific.showcaseSection.rightText}
          images={specific.showcaseSection.images && Array.isArray(specific.showcaseSection.images) 
            ? specific.showcaseSection.images.map((img: any) => {
                // Process the image - img.src is a Sanity image object
                const imageSrc = img.src ? urlFor(img.src).width(1920).height(2560).quality(95).url() : ''
                const hasText = img.text && (img.text.title || img.text.subtitle || img.text.description)
                return {
                  src: imageSrc,
                  alt: img.alt || '',
                  text: hasText ? {
                    title: img.text.title || undefined,
                    subtitle: img.text.subtitle || undefined,
                    description: img.text.description || undefined
                  } : undefined
                }
              })
            : undefined}
          features={specific?.featuresSection?.enabled === true && 
                   specific?.featuresSection?.features && 
                   Array.isArray(specific.featuresSection.features) && 
                   specific.featuresSection.features.length > 0
            ? specific.featuresSection.features.map((feature: any) => ({
                icon: feature.icon ? urlFor(feature.icon).width(80).height(80).quality(90).url() : null,
                label: feature.label || ''
              }))
            : undefined}
        />
      )}

      {/* Applications Sections - fetch only from new fields */}
      {(() => {
        const primaryEnabled = specific?.applicationsPrimary?.enabled === true
        const secondaryEnabled = specific?.applicationsSecondary?.enabled === true
        const primaryItems = (specific?.applicationsPrimary?.items || []).map((item: any) => ({
          ...item,
          image: item?.image ? urlFor(item.image).width(1920).height(2560).quality(95).url() : ''
        }))
        const secondaryItems = (specific?.applicationsSecondary?.items || []).map((item: any) => ({
          ...item,
          image: item?.image ? urlFor(item.image).width(1920).height(2560).quality(95).url() : ''
        }))

        if (!primaryEnabled && !secondaryEnabled) return null
        if (primaryEnabled && !primaryItems.length && secondaryEnabled && !secondaryItems.length) return null

        return (
          <SecteursApplicationsSection
            primaryItems={primaryEnabled ? primaryItems : []}
            secondaryItems={secondaryEnabled ? secondaryItems : []}
          />
        )
      })()}

      {/* Customization Section - Conditionally rendered */}
      {specific?.customizationSection?.enabled === true && specific?.customizationSection && (
        <SecteursCustomizationSection
          title={specific.customizationSection.title || "Conceptions personnalisées avec Abet Digital"}
          mainText={specific.customizationSection.mainText || ""}
          secondaryText={specific.customizationSection.secondaryText || ""}
          ctaText={specific.customizationSection.ctaText || "Découvrez Abet Digital"}
          ctaLink={specific.customizationSection.ctaLink || "/produits"}
          image={specific.customizationSection.image ? urlFor(specific.customizationSection.image).width(1920).height(2560).quality(95).url() : "/modern-architectural-facade-panels-meg-system-high.jpg"}
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
            _productType: item.productType === 'interior' ? 'interior' : 'exterior',
            category: item.product?.category
          })) || []}
        />
      )}

      {/* Contact Section - Conditionally rendered */}
      {specific?.contactSection?.enabled === true && (
        <ArtisticCtaSection
          title={specific?.contactSection?.title || specific?.title || 'projet'}
          description={specific?.contactSection?.description || "Besoin d'un conseil personnalisé pour votre projet ? Nos équipes vous accompagnent dans le choix des matériaux et la mise en œuvre."}
          contactCta={specific?.contactSection?.ctaText || shared?.contact?.cta || 'Nous contacter'}
        />
      )}
    </div>
  )
}