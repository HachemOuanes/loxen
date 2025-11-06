import { client } from '@/lib/sanity'

// ===== INSPIRATIONS =====

// Get inspiration by slug
export async function getInspirationBySlug(slug: string) {
  const query = `*[_type == "inspiration" && slug.current == $slug][0]{
    _id,
    title,
    description,
    heroImage,
    sections[]{
      type,
      title,
      items[]{
        title,
        subtitle,
        description,
        features,
        image
      },
      images[],
      tiles[]{
        title,
        subtitle,
        description
      }
    },
    contactSection{
      title,
      description,
      contactLink,
      contactCta
    }
  }`
  
  return await client.fetch(query, { slug })
}

// Get all inspiration slugs for static generation
export async function getInspirationSlugs() {
  const query = `*[_type == "inspiration"].slug.current`
  return await client.fetch(query)
}

// Get inspirations for mega menu
export async function getInspirationsForMegaMenu() {
  const query = `*[_type == "inspiration"] | order(order asc, title asc)[0...6]{
    _id,
    title,
    slug,
    description,
    heroImage
  }`
  
  return await client.fetch(query)
}

// ===== FINITION TYPES =====

// Get finition types
export async function getFinitionTypes() {
  const query = `*[_type == "finitionTypes"][0]{
    title,
    items[]{
      key,
      title,
      subtitle,
      description,
      image,
      schema
    }
  }`
  
  return await client.fetch(query)
}

// ===== DECOR FINISHES =====

// Get decor finishes
export async function getDecorFinishes() {
  const query = `*[_type == "decorFinishes"][0]{
    title,
    productSlug
  }`
  
  return await client.fetch(query)
}

// ===== PRODUCT ITEM (for decor finishes) =====

// Get product item by slug for decor finishes
export async function getProductItemBySlug(slug: string) {
  const query = `*[_type == "productItem" && slug.current == $slug][0]{
    productId,
    collectionName
  }`
  
  return await client.fetch(query, { slug })
}
