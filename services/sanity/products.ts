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
  const query = `*[_type == "product" && type == "exterieur"] | order(order asc)[0...4]{
    _id,
    title,
    slug,
    heroSection{
      overviewRightText
    },
    characteristicsSection{
      defaultImage
    },
    showcaseSection{
    image
    }
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
  const query = `*[_type == "product" && type == "interieur"] | order(order asc)[0...4]{
    _id,
    title,
    slug,
    heroSection{
      overviewRightText
    },
    characteristicsSection{
      defaultImage
    },
    showcaseSection{
    image
    }
  }`
  
  return await client.fetch(query)
}

// ===== UNIFIED PRODUCT SCHEMA =====

// Get product by ID
export async function getProductById(productId: string) {
  try {
    if (!productId || typeof productId !== 'string') {
      return null
    }

    const query = `*[_type == "product" && _id == $productId][0]{
      _id,
      title,
      slug,
      type,
      specificationSection{
        format{
          title,
          items
        },
        epaisseur
      }
    }`
    
    const result = await client.fetch(query, { productId })
    return result || null
  } catch (error) {
    console.error('Error fetching product by ID:', error)
    return null
  }
}

// Get product by slug
export async function getProductBySlug(slug: string) {
  try {
    if (!slug || typeof slug !== 'string') {
      return null
    }

    const query = `*[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      type,
      heroSection{
        overviewLeftText,
        overviewRightText,
        contactCta
      },
      showDecors,
      specificationSection{
        caracteristiques{
          title,
          items
        },
        applications{
          title,
          items
        },
        format{
          title,
          items
        },
        epaisseur
      },
      showcaseSection{
        enabled,
        heroImage,
        leftText{
          subtitle,
          title,
          description
        },
        rightText{
          subtitle,
          title,
          description
        },
        features[]{
          icon,
          label
        }
      },
      characteristicsSection{
        enabled,
        accordionItems[]{
          title,
          description,
          content,
          image,
          imageAlt
        }
      },
      splitImagesSection{
        enabled,
        title,
        images[]{
          leftImage,
          leftImageAlt,
          rightImage,
          rightImageAlt,
          leftText{
            subtitle,
            title,
            description
          },
          rightText{
            subtitle,
            title,
            description
          }
        }
      },
      technicalDocumentsSection{
        enabled,
        title,
        description,
        documents[]{
          title,
          file{
            asset->{
              _id,
              url
            }
          },
          fileUrl,
          fileType,
          downloadText
        }
      },
      contactSection{
        enabled,
        title,
        description,
        contactCta
      }
    }`
    
    const result = await client.fetch(query, { slug })
    return result || null
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
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
      order,
      products[]{
        name,
        description,
        link,
        order
      }
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
        order,
        products[]{
          name,
          description,
          link,
          order
        }
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
