import { client } from '@/lib/sanity'

// ===== HOME PAGE SECTIONS (New Schemas) =====
// These functions are used by the home page (app/page.tsx)

// Get home hero section
export async function getHomeHeroSection() {
  const query = `*[_type == "homeHeroSection"][0]`
  return await client.fetch(query)
}

// Get home applications section
export async function getHomeApplicationsSection() {
  const query = `*[_type == "homeApplicationsSection"][0]{
    ...,
    interiorCard{
      ...,
      image{
        asset->
      }
    },
    exteriorCard{
      ...,
      image{
        asset->
      }
    }
  }`
  return await client.fetch(query)
}

// Get home vision section
export async function getHomeVisionSection() {
  const query = `*[_type == "homeVisionSection"][0]`
  return await client.fetch(query)
}

// Get home solutions section
export async function getHomeSolutionsSection() {
  const query = `*[_type == "homeSolutionsSection"][0]`
  return await client.fetch(query)
}

// Get home products section
export async function getHomeProductsSection() {
  const query = `*[_type == "homeProductsSection"][0]{
    ...,
    products[]{
      ...,
      image{
        asset->
      }
    }
  }`
  return await client.fetch(query)
}

// Get home inspiration section
export async function getHomeInspirationSection() {
  const query = `*[_type == "homeInspirationSection"][0]{
    ...,
    projects[]{
      ...,
      image{
        asset->
      }
    }
  }`
  return await client.fetch(query)
}

// Get contact info (used by home page)
export async function getContactInfo() {
  const query = `*[_type == "contactInfo"][0]{
    email,
    phone,
    address,
    responseTime
  }`
  return await client.fetch(query)
}
