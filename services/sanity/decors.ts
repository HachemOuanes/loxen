import { client } from '@/lib/sanity'

// ===== DECORS =====

// Get all decors
export async function getAllDecors() {
  const query = `*[_type == "decor"] | order(featured desc, order asc, name asc) {
    _id,
    code,
    name,
    image,
    color,
    category->{
      _id,
      name,
      slug
    },
    collectionName,
    description,
    tags,
    featured,
    order
  }`
  
  return await client.fetch(query)
}

// Get decors by category
export async function getDecorsByCategory(categorySlug: string) {
  const query = `*[_type == "decor" && category->slug.current == $categorySlug] | order(featured desc, order asc, name asc) {
    _id,
    code,
    name,
    image,
    color,
    category->{
      _id,
      name,
      slug
    },
    collectionName,
    description,
    tags,
    featured,
    order
  }`
  
  return await client.fetch(query, { categorySlug })
}

// Get decors by product type (interior/exterior)
export async function getDecorsByProductType(productType: 'interior' | 'exterior') {
  const categoryName = productType === 'interior' ? 'Intérieur' : 'Extérieur'
  
  const query = `*[_type == "decor" && category->name == $categoryName] | order(featured desc, order asc, name asc) {
    _id,
    code,
    name,
    image,
    color,
    category->{
      _id,
      name,
      slug
    },
    collectionName,
    description,
    tags,
    featured,
    order
  }`
  
  return await client.fetch(query, { categoryName })
}

// Get random decors for inspiration page
export async function getRandomDecors(limit: number = 20) {
  const query = `*[_type == "decor"] | order(featured desc, order asc) [0...$limit] {
    _id,
    code,
    name,
    image,
    color,
    category->{
      _id,
      name,
      slug
    },
    collectionName,
    description,
    tags,
    featured,
    order
  }`
  
  return await client.fetch(query, { limit })
}

// Get featured decors
export async function getFeaturedDecors(limit: number = 10) {
  const query = `*[_type == "decor" && featured == true] | order(order asc, name asc) [0...$limit] {
    _id,
    code,
    name,
    image,
    color,
    category->{
      _id,
      name,
      slug
    },
    collectionName,
    description,
    tags,
    featured,
    order
  }`
  
  return await client.fetch(query, { limit })
}

// Get decors by collection
export async function getDecorsByCollection(collectionName: string) {
  const query = `*[_type == "decor" && collectionName == $collectionName] | order(featured desc, order asc, name asc) {
    _id,
    code,
    name,
    image,
    color,
    category->{
      _id,
      name,
      slug
    },
    collectionName,
    description,
    tags,
    featured,
    order
  }`
  
  return await client.fetch(query, { collectionName })
}

// Get decors by tags
export async function getDecorsByTags(tags: string[]) {
  const query = `*[_type == "decor" && count(tags[@ in $tags]) > 0] | order(featured desc, order asc, name asc) {
    _id,
    code,
    name,
    image,
    color,
    category->{
      _id,
      name,
      slug
    },
    collectionName,
    description,
    tags,
    featured,
    order
  }`
  
  return await client.fetch(query, { tags })
}

// Get decor by code
export async function getDecorByCode(code: string) {
  const query = `*[_type == "decor" && code == $code][0] {
    _id,
    code,
    name,
    image,
    color,
    category->{
      _id,
      name,
      slug
    },
    collectionName,
    description,
    tags,
    featured,
    order
  }`
  
  return await client.fetch(query, { code })
}

// Get decor statistics
export async function getDecorStats() {
  const query = `{
    "total": count(*[_type == "decor"]),
    "byCategory": *[_type == "decor"] {
      "category": category->name
    } | group(category) | {
      "category": category,
      "count": count()
    },
    "byCollection": *[_type == "decor"] {
      "collection": collectionName
    } | group(collection) | {
      "collection": collection,
      "count": count()
    },
    "featured": count(*[_type == "decor" && featured == true])
  }`
  
  return await client.fetch(query)
}

