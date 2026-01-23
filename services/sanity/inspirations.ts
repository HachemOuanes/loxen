import { client } from '@/lib/sanity'

// ===== INSPIRATIONS =====

// Get inspiration by slug
export async function getInspirationBySlug(slug: string) {
  try {
    if (!slug || typeof slug !== 'string') {
      return null
    }

    const query = `*[_type == "inspiration" && slug.current == $slug][0]{
      _id,
      title,
      description,
      heroImage,
      bigImages{
        title,
        enabled,
        images[]{
          images[],
          leftText{
            title,
            subtitle,
            description
          },
          rightText{
            title,
            subtitle,
            description
          }
        }
      },
      applicationsSection{
        title,
        enabled,
        items[]{
          title,
          subtitle,
          description,
          features,
          images[]
        }
      },
      collageSection{
        title,
        enabled,
        images[]{ images[] },
        tiles[]{
          title,
          subtitle,
          description
        }
      },
      bigImages{
        title,
        enabled,
        images[]{
          images[],
          leftText{
            title,
            subtitle,
            description
          },
          rightText{
            title,
            subtitle,
            description
          }
        }
      },
      splitSection{
        title,
        enabled,
        topImage,
        topText{
          title,
          subtitle,
          description
        },
        bottomImage
      },
      gridSection{
        title,
        enabled,
        text{
          title,
          subtitle,
          description
        },
        images[]
      },
      contactSection{
        title,
        enabled,
        description,
        contactCta
      },
      showFinitions,
      showDecors
    }`
    
    const result = await client.fetch(query, { slug })
    return result || null
  } catch (error) {
    console.error('Error fetching inspiration by slug:', error)
    return null
  }
}

// Get all inspiration slugs for static generation
export async function getInspirationSlugs() {
  try {
    const query = `*[_type == "inspiration" && defined(slug.current)].slug.current`
    const slugs = await client.fetch(query)
    // Ensure we return an array of strings, filtering out any null/undefined values
    return (slugs || []).filter((slug: any): slug is string => 
      typeof slug === 'string' && slug.length > 0
    )
  } catch (error) {
    console.error('Error fetching inspiration slugs:', error)
    return []
  }
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
