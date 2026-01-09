import { client } from '@/lib/sanity'

// ===== EXTERIOR PRODUCTS =====

// Get all exterior products for listing page
export async function getExteriorProducts() {
  const query = `*[_type == "exteriorProduct"] | order(featured desc, order asc) {
    _id,
    name,
    productId,
    slug,
    description,
    longDescription,
    image,
    featured,
    order,
    category->{
      _id,
      name,
      slug,
      color
    },
    characteristics,
    applications,
    panelFormats,
    thickness,
    technicalDocuments[]{
      title,
      file{
        asset->{
          _id,
          url,
          originalFilename,
          size,
          mimeType
        }
      },
      downloadText
    },
    bimRequest,
    collectionName,
    specifications[]{
      label,
      value
    },
    price,
    inStock,
    tags,
    imageSections[]{
      _key,
      _type,
      title,
      subtitle,
      description,
      features,
      image,
      heroLeft{
        title,
        subtitle,
        description
      },
      heroRight{
        title,
        subtitle,
        description
      }
    }
  }`
  
  return await client.fetch(query)
}


// Get exterior products for mega menu (first 4)
export async function getExteriorProductsForMegaMenu() {
  const query = `*[_type == "exteriorProduct"] | order(featured desc, order asc)[0...4]{
    _id,
    name,
    slug,
    description,
    image
  }`
  
  return await client.fetch(query)
}

// ===== INTERIOR PRODUCTS =====

// Get all interior products for listing page
export async function getInteriorProducts() {
  const query = `*[_type == "interiorProduct"] | order(featured desc, order asc) {
    _id,
    name,
    productId,
    slug,
    description,
    longDescription,
    image,
    featured,
    order,
    category->{
      _id,
      name,
      slug,
      color
    },
    characteristics,
    applications,
    panelFormats,
    thickness,
    technicalDocuments[]{
      title,
      file{
        asset->{
          _id,
          url,
          originalFilename,
          size,
          mimeType
        }
      },
      downloadText
    },
    bimRequest,
    collectionName,
    specifications[]{
      label,
      value
    },
    price,
    inStock,
    tags,
    imageSections[]{
      _key,
      _type,
      order,
      title,
      subtitle,
      description,
      features,
      image,
      bannerLeft{
        title,
        subtitle,
        description
      },
      bannerRight{
        title,
        subtitle,
        description
      },
      heroLeft{
        title,
        subtitle,
        description
      },
      heroRight{
        title,
        subtitle,
        description
      }
    },
    finishes[]{
      name,
      code,
      image,
      image_url,
      color,
      order
    }
  }`
  
  return await client.fetch(query)
}


// Get interior products for mega menu (first 4)
export async function getInteriorProductsForMegaMenu() {
  const query = `*[_type == "interiorProduct"] | order(featured desc, order asc)[0...4]{
    _id,
    name,
    slug,
    description,
    image
  }`
  
  return await client.fetch(query)
}


// ===== EXTERIOR PRODUCT CATEGORIES =====
// Get exterior product categories (used by exterior products page)
export async function getExteriorProductCategories() {
  // Try to fetch by document ID first, then fallback to first document
  const query = `*[_type == "exteriorProductCategories" && (_id == "exteriorProductCategories" || _id == "drafts.exteriorProductCategories")][0]{
    _id,
    title,
    description,
    categories[]{
      name,
      description,
      image,
      link,
      order
    }
  }`
  let result = await client.fetch(query)
  
  // If not found by ID, try to get the first one
  if (!result) {
    const fallbackQuery = `*[_type == "exteriorProductCategories"][0]{
      _id,
      title,
      description,
      categories[]{
        name,
        description,
        image,
        link,
        order
      }
    }`
    result = await client.fetch(fallbackQuery)
  }
  
  return result
}

// ===== INTERIOR PRODUCT CATEGORIES =====
// Get interior product categories (used by interior products page)
export async function getInteriorProductCategories() {
  // Try to fetch by document ID first, then fallback to first document
  const query = `*[_type == "interiorProductCategories" && (_id == "interiorProductCategories" || _id == "drafts.interiorProductCategories")][0]{
    _id,
    title,
    description,
    categories[]{
      name,
      description,
      image,
      link,
      order
    }
  }`
  let result = await client.fetch(query)
  
  // If not found by ID, try to get the first one
  if (!result) {
    const fallbackQuery = `*[_type == "interiorProductCategories"][0]{
      _id,
      title,
      description,
      categories[]{
        name,
        description,
        image,
        link,
        order
      }
    }`
    result = await client.fetch(fallbackQuery)
  }
  
  return result
}
