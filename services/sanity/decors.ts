import { client } from '@/lib/sanity'

// ===== DECORS =====

// Get all decors
export async function getAllDecors() {
  const query = `*[_type == "decor"] | order(featured desc, abet_order asc, name asc) {
    _id,
    code,
    name,
    image,
    image_url,
    color,
    colors,
    abet_order,
    products[]->{
      _id,
      _type,
      name,
      productId,
      slug
    },
    keywords,
    interior,
    exterior,
    available,
    is_new,
    featured
  }`
  
  return await client.fetch(query)
}

// Get decors by category
export async function getDecorsByCategory(categorySlug: string) {
  const query = `*[_type == "decor" && category->slug.current == $categorySlug] | order(featured desc, abet_order asc, name asc) {
    _id,
    code,
    name,
    image,
    image_url,
    color,
    colors,
    abet_order,
    products[]->{
      _id,
      _type,
      name,
      productId,
      slug
    },
    keywords,
    interior,
    exterior,
    available,
    is_new,
    featured
  }`
  
  return await client.fetch(query, { categorySlug })
}

// Get decors by product type (interior/exterior)
export async function getDecorsByProductType(productType: 'interior' | 'exterior') {
  const field = productType === 'interior' ? 'interior' : 'exterior'
  
  const query = `*[_type == "decor" && ${field} == true] | order(featured desc, abet_order asc, name asc) {
    _id,
    code,
    name,
    image,
    image_url,
    color,
    colors,
    abet_order,
    products[]->{
      _id,
      _type,
      name,
      productId,
      slug
    },
    keywords,
    interior,
    exterior,
    available,
    is_new,
    featured
  }`
  
  return await client.fetch(query)
}

// Get decors by product ID
export async function getDecorsByProductId(productId: string, limit: number = 20) {
  const query = `*[_type == "decor" && $productId in products[]._ref] | order(featured desc, abet_order asc, name asc) [0...$limit] {
    _id,
    code,
    name,
    image,
    image_url,
    color,
    colors,
    abet_order,
    products[]->{
      _id,
      _type,
      title,
      slug,
      type
    },
    keywords,
    interior,
    exterior,
    available,
    is_new,
    featured
  }`
  
  return await client.fetch(query, { productId, limit })
}

// Get random decors for inspiration page
export async function getRandomDecors(limit: number = 20) {
  const query = `*[_type == "decor"] | order(featured desc, abet_order asc) [0...$limit] {
    _id,
    code,
    name,
    image,
    image_url,
    color,
    colors,
    abet_order,
    products[]->{
      _id,
      _type,
      name,
      productId,
      slug
    },
    keywords,
    interior,
    exterior,
    available,
    is_new,
    featured
  }`
  
  return await client.fetch(query, { limit })
}

// Get featured decors
export async function getFeaturedDecors(limit: number = 10) {
  const query = `*[_type == "decor" && featured == true] | order(abet_order asc, name asc) [0...$limit] {
    _id,
    code,
    name,
    image,
    image_url,
    color,
    colors,
    abet_order,
    products[]->{
      _id,
      _type,
      name,
      productId,
      slug
    },
    keywords,
    interior,
    exterior,
    available,
    is_new,
    featured
  }`
  
  return await client.fetch(query, { limit })
}

// Get decors by collection
export async function getDecorsByCollection(collectionCode: string) {
  const query = `*[_type == "decor" && $collectionCode in collections] | order(featured desc, abet_order asc, name asc) {
    _id,
    code,
    name,
    image,
    image_url,
    color,
    colors,
    abet_order,
    products[]->{
      _id,
      _type,
      name,
      productId,
      slug
    },
    keywords,
    interior,
    exterior,
    available,
    is_new,
    featured
  }`
  
  return await client.fetch(query, { collectionCode })
}

// Get decors by colors
export async function getDecorsByColors(colors: string[]) {
  const query = `*[_type == "decor" && count(colors[@ in $colors]) > 0] | order(featured desc, abet_order asc, name asc) {
    _id,
    code,
    name,
    image,
    image_url,
    color,
    colors,
    abet_order,
    products[]->{
      _id,
      _type,
      name,
      productId,
      slug
    },
    keywords,
    interior,
    exterior,
    available,
    is_new,
    featured
  }`
  
  return await client.fetch(query, { colors })
}

// Get decor by code
export async function getDecorByCode(code: string) {
  const query = `*[_type == "decor" && code == $code][0] {
    _id,
    code,
    name,
    image,
    image_url,
    color,
    colors,
    abet_order,
    products[]->{
      _id,
      _type,
      name,
      productId,
      slug
    },
    keywords,
    interior,
    exterior,
    available,
    is_new,
    featured
  }`
  
  return await client.fetch(query, { code })
}

// Get decor statistics
export async function getDecorStats() {
  const query = `{
    "total": count(*[_type == "decor"]),
    "available": count(*[_type == "decor" && available == true]),
    "interior": count(*[_type == "decor" && interior == true]),
    "exterior": count(*[_type == "decor" && exterior == true]),
    "new": count(*[_type == "decor" && is_new == true]),
    "featured": count(*[_type == "decor" && featured == true])
  }`
  
  return await client.fetch(query)
}

