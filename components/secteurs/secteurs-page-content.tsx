"use client"

import { SecteursHeroSection } from '@/components/secteurs/secteurs-hero-section'
import { SecteursApplicationsSection } from '@/components/secteurs/secteurs-applications-section'
import { SecteursShowcaseSection } from '@/components/secteurs/secteurs-showcase-section'
import { useAnimations } from '@/components/inspirations/use-animations'
import { CtaSection } from '@/components/shared/cta-section'
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


      {/* Contact Section */}
      <CtaSection
        title={specific?.contactSection?.title || specific?.title || 'projet'}
        description={specific?.contactSection?.description || "Besoin d'un conseil personnalisé pour votre projet ? Nos équipes vous accompagnent dans le choix des matériaux et la mise en œuvre."}
        contactLink={shared?.contact?.link || '/contact'}
        contactCta={shared?.contact?.cta || 'Nous contacter'}
      />
    </div>
  )
}