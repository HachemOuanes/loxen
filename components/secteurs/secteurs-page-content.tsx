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
        description={specific?.description || ''}
        heroImage={urlFor(specific?.heroImage).width(1200).height(600).url()}
        contactLink={shared?.contact?.link || '/contact'}
        contactCta={shared?.contact?.cta || 'Nous contacter'}
      />


      {/* Showcase Section */}
      {specific?.showcaseSection && (
        <SecteursShowcaseSection
          heroImage={urlFor(specific.showcaseSection.heroImage).width(1200).height(600).url()}
          leftText={specific.showcaseSection.leftText}
          rightText={specific.showcaseSection.rightText}
          images={specific.showcaseSection.images.map((img: any) => ({
            src: urlFor(img.src).width(600).height(400).url(),
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
                image: urlFor(item.image).width(800).height(600).url()
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