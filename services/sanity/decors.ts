import { client } from '@/lib/sanity'

// ===== DECORS =====

// Common projection for decor queries
// Normalizes both old (plain reference) and new (object with nested product ref) formats
const DECOR_PROJECTION = `{
  _id,
  external_code,
  loxen_code,
  name,
  image,
  image_url,
  colors,
  external_order,
  "products": products[]{
    _key,
    formats,
    epaisseurs,
    finishes,
    "product": select(
      defined(product) => product->{_id, _type, title, name, productId, slug},
      defined(_ref) => @->{_id, _type, title, name, productId, slug}
    )
  },
  interior,
  exterior
}`

// Get all decors
export async function getAllDecors() {
  const query = `*[_type == "decor"] | order(external_order asc, name asc) ${DECOR_PROJECTION}`

  return await client.fetch(query)
}

// Get decors by category
export async function getDecorsByCategory(categorySlug: string) {
  const query = `*[_type == "decor" && category->slug.current == $categorySlug] | order(external_order asc, name asc) ${DECOR_PROJECTION}`

  return await client.fetch(query, { categorySlug })
}

// Get decors by product type (interior/exterior)
export async function getDecorsByProductType(productType: 'interior' | 'exterior') {
  const field = productType === 'interior' ? 'interior' : 'exterior'

  const query = `*[_type == "decor" && ${field} == true] | order(external_order asc, name asc) ${DECOR_PROJECTION}`

  return await client.fetch(query)
}

// Get decors by product ID
export async function getDecorsByProductId(productId: string, limit: number = 20) {
  const query = `*[_type == "decor" && ($productId in products[].product._ref || $productId in products[]._ref)] | order(external_order asc, name asc) [0...$limit] ${DECOR_PROJECTION}`

  return await client.fetch(query, { productId, limit })
}

// Get random decors for inspiration page
export async function getRandomDecors(limit: number = 20) {
  const query = `*[_type == "decor"] | order(external_order asc) [0...$limit] ${DECOR_PROJECTION}`

  return await client.fetch(query, { limit })
}

// Get decors by colors
export async function getDecorsByColors(colors: string[]) {
  const query = `*[_type == "decor" && count(colors[@ in $colors]) > 0] | order(external_order asc, name asc) ${DECOR_PROJECTION}`

  return await client.fetch(query, { colors })
}

// Get decor by ID (fresh, bypasses page cache)
export async function getDecorById(id: string) {
  const query = `*[_type == "decor" && _id == $id][0] ${DECOR_PROJECTION}`

  return await client.fetch(query, { id })
}

// Get decor by external code
export async function getDecorByCode(code: string) {
  const query = `*[_type == "decor" && external_code == $code][0] ${DECOR_PROJECTION}`

  return await client.fetch(query, { code })
}

// Get decor statistics
export async function getDecorStats() {
  const query = `{
    "total": count(*[_type == "decor"]),
    "interior": count(*[_type == "decor" && interior == true]),
    "exterior": count(*[_type == "decor" && exterior == true])
  }`

  return await client.fetch(query)
}
