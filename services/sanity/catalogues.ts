import { client } from '@/lib/sanity'

// ===== CATALOGUES =====

// Get all catalogues
export async function getAllCatalogues() {
  const query = `*[_type == "catalogue"] | order(order asc) {
    _id,
    id,
    title,
    description,
    overview,
    image,
    imageAlt,
    documents[]{
      title,
      fileUrl,
      fileType,
      downloadText
    },
    content{
      text,
      sections[]{
        title,
        text,
        image,
        imageAlt
      }
    },
    order
  }`
  
  return await client.fetch(query)
}

// Get catalogue by ID (for deep linking)
export async function getCatalogueById(id: string) {
  const query = `*[_type == "catalogue" && id == $id][0]{
    _id,
    id,
    title,
    description,
    overview,
    image,
    imageAlt,
    documents[]{
      title,
      fileUrl,
      fileType,
      downloadText
    },
    content{
      text,
      sections[]{
        title,
        text,
        image,
        imageAlt
      }
    },
    order
  }`
  
  return await client.fetch(query, { id })
}

// Get catalogues for mega menu (simplified)
export async function getCataloguesForMegaMenu() {
  const query = `*[_type == "catalogue"] | order(order asc) {
    _id,
    id,
    title
  }`
  
  return await client.fetch(query)
}

