import { client } from '@/lib/sanity'

// Get applications by type (interieur or exterieur)
export async function getApplicationsByType(type: 'interieur' | 'exterieur') {
  const query = `*[_type == "application" && type == $type] | order(order asc, name asc) {
    _id,
    _type,
    type,
    name,
    description,
    image,
    order,
    link,
    products[]->{
      _id,
      _type,
      title,
      slug,
      type
    }
  }`
  
  return await client.fetch(query, { type })
}

// Get all applications
export async function getAllApplications() {
  const query = `*[_type == "application"] | order(order asc, name asc) {
    _id,
    _type,
    type,
    name,
    description,
    image,
    order,
    link,
    products[]->{
      _id,
      _type,
      title,
      slug,
      type
    }
  }`
  
  return await client.fetch(query)
}
