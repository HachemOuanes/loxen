import { client } from '@/lib/sanity'

// ===== HOME PAGE SECTIONS =====

// Get hero section
export async function getHeroSection() {
  const query = `*[_type == "heroSection"][0]{
    title,
    subtitle,
    description,
    backgroundImage,
    ctaText,
    ctaLink
  }`
  
  return await client.fetch(query)
}

// Get products section
export async function getProductsSection() {
  const query = `*[_type == "productsSection"][0]{
    title,
    description,
    showSection,
    categories[]{
      name,
      description,
      image,
      link
    }
  }`
  
  return await client.fetch(query)
}

// Get inspiration section
export async function getInspirationSection() {
  const query = `*[_type == "inspirationSection"][0]{
    title,
    description,
    showSection,
    featuredInspirations[]->{
      title,
      slug,
      heroImage
    }
  }`
  
  return await client.fetch(query)
}

// Get interior section
export async function getInteriorSection() {
  const query = `*[_type == "interiorSection"][0]{
    title,
    description,
    showSection,
    categories[]{
      name,
      description,
      image,
      link
    }
  }`
  
  return await client.fetch(query)
}

// Get exterior section
export async function getExteriorSection() {
  const query = `*[_type == "exteriorSection"][0]{
    title,
    description,
    showSection,
    categories[]{
      name,
      description,
      image,
      link
    }
  }`
  
  return await client.fetch(query)
}

// Get partners section
export async function getPartnersSection() {
  const query = `*[_type == "partnersSection"][0]{
    title,
    description,
    showSection,
    partners[]{
      name,
      logo,
      website
    }
  }`
  
  return await client.fetch(query)
}

// Get contact info
export async function getContactInfo() {
  const query = `*[_type == "contactInfo"][0]{
    title,
    description,
    email,
    phone,
    address,
    socialMedia[]{
      platform,
      url
    }
  }`
  
  return await client.fetch(query)
}
