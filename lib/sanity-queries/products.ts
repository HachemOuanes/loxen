import { client } from '@/lib/sanity'

// ===== EXTERIOR PRODUCTS =====

// Get all exterior products for listing page
export async function getExteriorProducts() {
  const query = `*[_type == "exteriorProduct"] | order(featured desc, order asc) {
    _id,
    name,
    slug,
    description,
    longDescription,
    image,
    featured,
    order,
    imageSections,
    specifications,
    technicalDocs,
    relatedProducts
  }`
  
  return await client.fetch(query)
}

// Get exterior product by slug
export async function getExteriorProductBySlug(slug: string) {
  const query = `*[_type == "exteriorProduct" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    description,
    longDescription,
    image,
    featured,
    order,
    imageSections,
    specifications,
    technicalDocs,
    relatedProducts
  }`
  
  return await client.fetch(query, { slug })
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
    slug,
    description,
    longDescription,
    image,
    featured,
    order,
    imageSections,
    specifications,
    technicalDocs,
    relatedProducts
  }`
  
  return await client.fetch(query)
}

// Get interior product by slug
export async function getInteriorProductBySlug(slug: string) {
  const query = `*[_type == "interiorProduct" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    description,
    longDescription,
    image,
    featured,
    order,
    imageSections,
    specifications,
    technicalDocs,
    relatedProducts
  }`
  
  return await client.fetch(query, { slug })
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

// ===== RELATED PRODUCTS =====

// Get related products (excluding current product)
export async function getRelatedProducts(productType: string, currentProductId: string) {
  const query = `*[_type == $productType && _id != $currentProductId] | order(featured desc, order asc, name asc) [0...4] {
    _id,
    name,
    slug,
    description,
    image,
    featured
  }`
  
  return await client.fetch(query, { productType, currentProductId })
}

// ===== PRODUCT SLUGS =====

// Get all exterior product slugs for static generation
export async function getExteriorProductSlugs() {
  const query = `*[_type == "exteriorProduct"].slug.current`
  return await client.fetch(query)
}

// Get all interior product slugs for static generation
export async function getInteriorProductSlugs() {
  const query = `*[_type == "interiorProduct"].slug.current`
  return await client.fetch(query)
}
