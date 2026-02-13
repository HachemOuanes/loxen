import { client } from '@/lib/sanity'

// ===== SEO SETTINGS =====

// Get global SEO settings
export async function getGlobalSeoSettings() {
  const query = `*[_type == "seoSettings"][0]{
    siteName,
    siteDescription,
    defaultTitle,
    defaultDescription,
    defaultKeywords,
    ogImage,
    twitterCard,
    twitterSite,
    twitterCreator
  }`
  
  return await client.fetch(query)
}

// Get page SEO by slug
export async function getPageSeo(slug: string) {
  const query = `*[_type == "pageSeo" && slug.current == $slug][0]{
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
    noIndex,
    noFollow
  }`
  
  return await client.fetch(query, { slug })
}

// Get all page SEO slugs
export async function getPageSeoSlugs() {
  const query = `*[_type == "pageSeo"].slug.current`
  return await client.fetch(query)
}

// ===== SETTINGS =====

// Get settings
export async function getSettings() {
  const query = `*[_type == "settings"][0]{
    whatsappNumber
  }`
  
  return await client.fetch(query)
}