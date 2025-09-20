import { client } from './sanity'
import { urlFor } from './sanity'

export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
  noIndex?: boolean
}

export interface SiteSettings {
  title: string
  description: string
  keywords?: string[]
  ogImage?: any
  favicon?: any
  siteUrl: string
  companyName: string
  companyDescription?: string
  socialMedia?: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const query = `*[_type == "seoSettings"][0]`
    const data = await client.fetch(query)
    return data
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

export async function getPageSEO(pageId: string): Promise<SEOData | null> {
  try {
    const query = `*[_type == "pageSeo" && pageId == $pageId][0]`
    const data = await client.fetch(query, { pageId })
    return data
  } catch (error) {
    console.error('Error fetching page SEO:', error)
    return null
  }
}

export function generateMetadata(
  siteSettings: SiteSettings | null,
  pageSeo: SEOData | null,
  fallbackTitle?: string,
  fallbackDescription?: string
) {
  const title = pageSeo?.title || fallbackTitle || siteSettings?.title || 'Loxen'
  const description = pageSeo?.description || fallbackDescription || siteSettings?.description || 'Solutions Architecturales Premium'
  const keywords = [...(pageSeo?.keywords || []), ...(siteSettings?.keywords || [])]
  
  // Use page-specific OG image or fall back to site default
  const ogImage = pageSeo?.ogImage 
    ? urlFor(pageSeo.ogImage).width(1200).height(630).url()
    : siteSettings?.ogImage 
    ? urlFor(siteSettings.ogImage).width(1200).height(630).url()
    : null

  const siteUrl = siteSettings?.siteUrl || 'https://loxen.com'

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: siteSettings?.companyName || 'Loxen',
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : [],
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
    robots: {
      index: !pageSeo?.noIndex,
      follow: true,
      googleBot: {
        index: !pageSeo?.noIndex,
        follow: true,
      },
    },
    alternates: {
      canonical: pageSeo?.canonicalUrl || siteUrl,
    },
  }
}

export function generateStructuredData(siteSettings: SiteSettings | null) {
  if (!siteSettings) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteSettings.companyName,
    description: siteSettings.companyDescription,
    url: siteSettings.siteUrl,
    logo: siteSettings.ogImage ? urlFor(siteSettings.ogImage).width(600).height(600).url() : undefined,
    sameAs: [
      siteSettings.socialMedia?.facebook,
      siteSettings.socialMedia?.twitter,
      siteSettings.socialMedia?.linkedin,
      siteSettings.socialMedia?.instagram,
    ].filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['French', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
    },
  }
}
