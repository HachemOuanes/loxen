"use client"

import { ProductsHeroSection } from '@/components/produits/products-hero-section'
import { ProductsSpecificationSection } from '@/components/produits/products-specification-section'
import { ProductsShowcaseSection } from '@/components/produits/products-showcase-section'
import { ProductsCharacteristicsSection } from '@/components/produits/products-characteristics-section'
import { ProductsSplitImagesSection } from '@/components/produits/products-split-images-section'
import { ProductsTechnicalDocumentsSection } from '@/components/produits/products-technical-documents-section'
import { DecorsSection } from '@/components/shared/decors-section'
import { ArtisticCtaSection } from '@/components/shared/artistic-cta-section'
import { useAnimations } from '@/components/shared/use-animations'
import { urlFor } from '@/lib/sanity'

interface Product {
  _id: string
  title: string
  slug: { current: string }
  type: string
  heroSection?: {
    overviewLeftText?: string
    overviewRightText?: string
    contactCta?: string
  }
  showDecors?: boolean
  specificationSection?: {
    caracteristiques?: {
      title?: string
      items?: string[]
    }
    applications?: {
      title?: string
      items?: string[]
    }
    format?: {
      title?: string
      items?: string[]
    }
    epaisseur?: string
  }
  showcaseSection?: {
    enabled?: boolean
    heroImage?: any
    leftText?: {
      subtitle?: string
      title?: string
      description?: string
    }
    rightText?: {
      subtitle?: string
      title?: string
      description?: string
    }
    features?: Array<{
      icon?: any
      label?: string
    }>
  }
  characteristicsSection?: {
    enabled?: boolean
    defaultImage?: any
    defaultImageAlt?: string
    accordionItems?: Array<{
      title: string
      description?: string
      content?: string
      image?: any
      imageAlt?: string
    }>
  }
  splitImagesSection?: {
    enabled?: boolean
    title?: string
    images?: Array<{
      leftImage?: any
      leftImageAlt?: string
      rightImage?: any
      rightImageAlt?: string
      leftText?: {
        subtitle?: string
        title?: string
        description?: string
      }
      rightText?: {
        subtitle?: string
        title?: string
        description?: string
      }
    }>
  }
  technicalDocumentsSection?: {
    enabled?: boolean
    title?: string
    description?: string
    image?: any
    imageAlt?: string
    documents?: Array<{
      title: string
      fileUrl?: string
      fileType?: string
      downloadText?: string
    }>
  }
  contactSection?: {
    enabled?: boolean
    title?: string
    description?: string
    contactCta?: string
  }
}

interface ProductsPageContentProps {
  product: Product
  shared?: {
    finitionsDisponibles?: {
      title?: string
      productSlug?: string
      decors?: any[]
    }
    contact?: {
      link?: string
      cta?: string
    }
  }
}

export function ProductsPageContent({ product, shared }: ProductsPageContentProps) {
  const rootRef = useAnimations()

  if (!product) {
    return null
  }

  // Helper function to convert Sanity image to URL
  const getImageUrl = (image: any): string => {
    if (!image) return ''
    if (typeof image === 'string') return image
    return urlFor(image).width(2000).height(1500).quality(90).url()
  }

  // Map product data from CMS
  const productData = {
    hero: {
      title: product.title,
      overviewLeftText: product.heroSection?.overviewLeftText || '',
      overviewRightText: product.heroSection?.overviewRightText || '',
      contactLink: shared?.contact?.link || '/#contact',
      contactCta: product.heroSection?.contactCta || shared?.contact?.cta || ''
    },
    specifications: {
      caracteristiques: {
        title: product.specificationSection?.caracteristiques?.title || '',
        items: product.specificationSection?.caracteristiques?.items || []
      },
      applications: {
        title: product.specificationSection?.applications?.title || '',
        items: product.specificationSection?.applications?.items || []
      },
      format: {
        title: product.specificationSection?.format?.title || '',
        items: product.specificationSection?.format?.items || []
      },
      epaisseur: product.specificationSection?.epaisseur || ''
    },
    showcase: {
      heroImage: getImageUrl(product.showcaseSection?.heroImage),
      leftText: product.showcaseSection?.leftText || {},
      rightText: product.showcaseSection?.rightText || {},
      features: (product.showcaseSection?.features || []).map(f => ({
        icon: f.icon ? getImageUrl(f.icon) : null,
        label: f.label || ''
      }))
    },
    characteristics: {
      defaultImage: getImageUrl(product.characteristicsSection?.defaultImage),
      defaultImageAlt: product.characteristicsSection?.defaultImageAlt || '',
      accordionItems: (product.characteristicsSection?.accordionItems || []).map(item => ({
        ...item,
        image: getImageUrl(item.image)
      }))
    },
    splitImages: (product.splitImagesSection?.images || []).map(img => ({
      ...img,
      leftImage: getImageUrl(img.leftImage),
      rightImage: getImageUrl(img.rightImage)
    })),
    technicalDocumentsSection: {
      title: product.technicalDocumentsSection?.title || '',
      description: product.technicalDocumentsSection?.description || '',
      image: getImageUrl(product.technicalDocumentsSection?.image),
      imageAlt: product.technicalDocumentsSection?.imageAlt || ''
    },
    technicalDocuments: product.technicalDocumentsSection?.documents || [],
    contactSection: {
      title: product.contactSection?.title || product.title,
      description: product.contactSection?.description || '',
      contactCta: product.contactSection?.contactCta || shared?.contact?.cta || ''
    }
  }

  return (
    <div ref={rootRef}>
      {/* Hero Section */}
      <ProductsHeroSection
        title={productData.hero.title}
        overviewLeftText={productData.hero.overviewLeftText}
        overviewRightText={productData.hero.overviewRightText}
        contactLink={productData.hero.contactLink}
        contactCta={productData.hero.contactCta}
      />

      {/* Specification Section */}
      {product?.specificationSection && (
        (productData.specifications.caracteristiques.items.length > 0 ||
         productData.specifications.applications.items.length > 0 ||
         productData.specifications.format.items.length > 0 ||
         productData.specifications.epaisseur) && (
          <ProductsSpecificationSection
            caracteristiques={productData.specifications.caracteristiques}
            applications={productData.specifications.applications}
            format={productData.specifications.format}
            epaisseur={productData.specifications.epaisseur}
          />
        )
      )}

      {/* Decors Section - Below hero */}
      {product?.showDecors !== false && (
        <DecorsSection
          enabled={true}
          slug={shared?.finitionsDisponibles?.productSlug || product.slug?.current || "random"}
          shared={shared}
        />
      )}

      {/* Showcase Section - IG Image with left/right text and features slider */}
      {product?.showcaseSection?.enabled !== false && productData.showcase.heroImage && (
        <ProductsShowcaseSection
          heroImage={productData.showcase.heroImage}
          leftText={productData.showcase.leftText}
          rightText={productData.showcase.rightText}
          features={productData.showcase.features}
        />
      )}

      {/* Characteristics Section - Big image left, accordion right */}
      {product?.characteristicsSection?.enabled !== false && productData.characteristics.defaultImage && (
        <ProductsCharacteristicsSection
          defaultImage={productData.characteristics.defaultImage}
          defaultImageAlt={productData.characteristics.defaultImageAlt}
          accordionItems={productData.characteristics.accordionItems}
        />
      )}

      {/* Split Images Section - Left and right images with text */}
      {product?.splitImagesSection?.enabled !== false && productData.splitImages.length > 0 && (
        <ProductsSplitImagesSection
          images={productData.splitImages}
          title={product?.splitImagesSection?.title}
        />
      )}

      {/* Technical Documents Section */}
      {product?.technicalDocumentsSection?.enabled !== false && productData.technicalDocuments.length > 0 && (
        <ProductsTechnicalDocumentsSection
          documents={productData.technicalDocuments}
          sectionTitle={productData.technicalDocumentsSection.title}
          description={productData.technicalDocumentsSection.description}
          image={productData.technicalDocumentsSection.image}
          imageAlt={productData.technicalDocumentsSection.imageAlt}
        />
      )}

      {/* Contact CTA Section */}
      {product?.contactSection?.enabled !== false && productData.contactSection && 
       productData.contactSection.title && productData.contactSection.contactCta && (
        <ArtisticCtaSection
          title={productData.contactSection.title}
          description={productData.contactSection.description}
          contactCta={productData.contactSection.contactCta}
          contactLink={shared?.contact?.link || '/#contact'}
        />
      )}
    </div>
  )
}
