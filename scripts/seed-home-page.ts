/**
 * Seed script for home page sections
 * 
 * Setup:
 * 1. Create a .env.local file with:
 *    NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
 *    NEXT_PUBLIC_SANITY_DATASET=production
 *    SANITY_API_TOKEN=your_write_token
 * 
 * 2. Run: npx tsx scripts/seed-home-page.ts
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve, join, dirname } from 'path'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
  console.error('❌ Missing required environment variables:')
  console.error('   - NEXT_PUBLIC_SANITY_PROJECT_ID')
  console.error('   - SANITY_API_TOKEN')
  console.error('\nPlease create a .env.local file with these variables.')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  requestTagPrefix: 'home-seed',
  timeout: 30000,
})

// Helper function to retry operations
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error: any) {
      if (i === maxRetries - 1) throw error
      if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
        console.log(`  ⚠️  Retry ${i + 1}/${maxRetries} after ${delay}ms...`)
        await new Promise(resolve => setTimeout(resolve, delay))
        delay *= 2 // Exponential backoff
      } else {
        throw error
      }
    }
  }
  throw new Error('Max retries exceeded')
}

// Helper function to upload image to Sanity
async function uploadImageToSanity(imagePath: string) {
  try {
    if (!existsSync(imagePath)) {
      console.error(`  ⚠️  Image not found: ${imagePath}`)
      return null
    }

    const imageBuffer = readFileSync(imagePath)
    const filename = imagePath.split(/[/\\]/).pop() || 'image.jpg'
    
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    })
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error: any) {
    console.error(`  ❌ Error uploading image ${imagePath}:`, error.message)
    return null
  }
}

async function seedHomePage() {
  console.log('🌱 Seeding home page sections...')

  try {
    // 1. Hero Section
    console.log('📝 Creating Hero Section...')
    const heroDoc = await retryOperation(() => client.createOrReplace({
      _type: 'homeHeroSection',
      _id: 'homeHeroSection',
      title: 'Solutions Facade Architect Premium',
      subtitle: 'Transformez vos visions en réalité avec nos systèmes d\'aluminium et façades de haute qualité',
      ctaText: 'Découvrir',
      ctaLink: '/produits/exterieur',
      showSection: true,
    }))
    console.log('✅ Hero Section created:', heroDoc._id)

    // 2. Applications Section
    console.log('📝 Creating Applications Section...')
    
    // Upload images for applications section
    console.log('  📤 Uploading application images...')
    const publicPath = join(__dirname, '..', 'public')
    const interiorImagePath = join(publicPath, 'luxury-interior-office-glass-partitions.png')
    const exteriorImagePath = join(publicPath, 'modern-glass-facade-building-architecture-premium.jpg')
    
    const interiorImage = await uploadImageToSanity(interiorImagePath)
    if (interiorImage) {
      console.log('  ✓ Uploaded interior image: luxury-interior-office-glass-partitions.png')
    }
    
    const exteriorImage = await uploadImageToSanity(exteriorImagePath)
    if (exteriorImage) {
      console.log('  ✓ Uploaded exterior image: modern-glass-facade-building-architecture-premium.jpg')
    }
    
    const applicationsDoc = await retryOperation(() => client.createOrReplace({
      _type: 'homeApplicationsSection',
      _id: 'homeApplicationsSection',
      sectionLabel: 'Applications',
      title: 'Interior and exterior integral solutions.',
      description: [
        'Explore our comprehensive product portfolio and discover innovative solutions for your next project.',
        'Our team is here to help you find the perfect materials and systems tailored to your architectural vision.',
      ],
      ctaTitle: 'Ready to get started?',
      ctaText: 'Explore Our Products',
      ctaLink: '/produits',
      interiorCard: {
        title: 'Intérieur',
        image: interiorImage,
        link: '/produits/interieur',
      },
      exteriorCard: {
        title: 'Extérieur',
        image: exteriorImage,
        link: '/produits/exterieur',
      },
      showSection: true,
    }))
    console.log('✅ Applications Section created:', applicationsDoc._id)

    // 3. Vision Section
    console.log('📝 Creating Vision Section...')
    const visionDoc = await retryOperation(() => client.createOrReplace({
      _type: 'homeVisionSection',
      _id: 'homeVisionSection',
      largeText: 'Made to matter',
      smallText: 'Transformez vos visions en réalité avec nos systèmes d\'aluminium et façades de haute qualité premium.',
      showSection: true,
    }))
    console.log('✅ Vision Section created:', visionDoc._id)

    // 4. Solutions Section
    console.log('📝 Creating Solutions Section...')
    const solutionsDoc = await retryOperation(() => client.createOrReplace({
      _type: 'homeSolutionsSection',
      _id: 'homeSolutionsSection',
      sectionLabel: 'Solutions',
      slogan: 'Where <em>artistry</em> meets <em>precision</em>, creating spaces that <em>inspire</em>.',
      solutions: [
        {
          name: 'Fibre Cement',
          benefits: [
            {
              title: 'Durability & Longevity',
              description: 'Exceptional resistance to weather, fire, and impact, ensuring your investment lasts for decades with minimal maintenance.',
            },
            {
              title: 'Versatile Design Options',
              description: 'Available in a wide range of textures, colors, and finishes to match any architectural vision, from modern to traditional.',
            },
            {
              title: 'Sustainable Choice',
              description: 'Made from natural materials with low environmental impact, contributing to LEED certification and green building standards.',
            },
          ],
        },
        {
          name: 'High Pressure Laminate (HPL)',
          benefits: [
            {
              title: 'Premium Aesthetic Appeal',
              description: 'High-quality surface finishes that replicate natural materials like wood, stone, and metal with exceptional realism.',
            },
            {
              title: 'Superior Performance',
              description: 'Excellent resistance to scratches, stains, and UV radiation, maintaining its appearance in demanding environments.',
            },
            {
              title: 'Easy Installation & Maintenance',
              description: 'Lightweight and easy to work with, reducing installation time and costs while requiring minimal ongoing maintenance.',
            },
          ],
        },
      ],
      showSection: true,
    }))
    console.log('✅ Solutions Section created:', solutionsDoc._id)

    // 5. Products Section
    console.log('📝 Creating Products Section...')
    
    // Upload product images
    console.log('  📤 Uploading product images...')
    const productImages = [
      { 
        name: 'Copanel', 
        image: 'contemporary-composite-facade-panels-copanel-moder.jpg', 
        description: 'Panneaux composites haute performance pour façades architecturales modernes, alliant durabilité exceptionnelle et flexibilité de design.', 
        link: '/produits/exterieur' 
      },
      { 
        name: 'MEG System', 
        image: 'modern-architectural-facade-panels-meg-system-high.jpg', 
        description: 'Système de panneaux de façade haute performance offrant une résistance supérieure aux intempéries et un attrait esthétique remarquable.', 
        link: '/produits/exterieur' 
      },
      { 
        name: 'Trespa', 
        image: 'sophisticated-ventilated-facade-system-performance.jpg', 
        description: 'Panneaux stratifiés haute pression premium pour applications intérieures et extérieures avec des performances exceptionnelles.', 
        link: '/produits' 
      },
      { 
        name: 'Fundermax', 
        image: 'elegant-composite-panel-facade-system-lightweight-.jpg', 
        description: 'Solutions de façade innovantes alliant esthétique et excellence technique pour bâtiments modernes.', 
        link: '/produits' 
      },
      { 
        name: 'Abet Laminati', 
        image: 'premium-minimalist-facade-clean.jpg', 
        description: 'Excellence du design italien en stratifiés haute pression pour usage intérieur et extérieur.', 
        link: '/produits' 
      },
    ]
    
    const uploadedProducts = []
    for (let i = 0; i < productImages.length; i++) {
      const product = productImages[i]
      const imagePath = join(publicPath, product.image)
      const uploadedImage = await uploadImageToSanity(imagePath)
      
      if (uploadedImage) {
        uploadedProducts.push({
          _key: `product-${i}`,
          name: product.name,
          description: product.description,
          image: uploadedImage,
          order: i,
          link: product.link,
        })
        console.log(`  ✓ Uploaded product image: ${product.name}`)
      }
    }
    
    const productsDoc = await retryOperation(() => client.createOrReplace({
      _type: 'homeProductsSection',
      _id: 'homeProductsSection',
      sectionLabel: 'Produits',
      title: 'High-performance hardscaping. Consciously crafted + fully customisable.',
      description: [
        'Discover our comprehensive range of interior and exterior solutions designed to meet your architectural needs.',
        'From premium materials to innovative design systems.',
      ],
      ctaText: 'Découvrir nos produits',
      ctaLink: '/produits',
      products: uploadedProducts,
      showSection: true,
    }))
    console.log('✅ Products Section created:', productsDoc._id)

    // 6. Inspiration Section
    console.log('📝 Creating Inspiration Section...')
    
    // Upload inspiration project images
    console.log('  📤 Uploading inspiration images...')
    const inspirationProjects = [
      { title: 'Modern Corporate Tower', image: 'modern-corporate-glass-tower-facade-london.png', location: 'London', category: 'Commercial' },
      { title: 'Luxury Hotel Facade', image: 'luxury-hotel-glass-facade-architecture-milan.png', location: 'Milan', category: 'Hospitality' },
      { title: 'Residential Building', image: 'modern-residential-building-aluminium-facade-berlin.png', location: 'Berlin', category: 'Residential' },
      { title: 'Office Campus', image: 'modern-office-campus-curtain-wall-amsterdam.png', location: 'Amsterdam', category: 'Commercial' },
    ]
    
    const uploadedProjects = []
    for (let i = 0; i < inspirationProjects.length; i++) {
      const project = inspirationProjects[i]
      const imagePath = join(publicPath, project.image)
      const uploadedImage = await uploadImageToSanity(imagePath)
      
      if (uploadedImage) {
        uploadedProjects.push({
          _key: `project-${i}`,
          title: project.title,
          image: uploadedImage,
          location: project.location,
          category: project.category,
          order: i,
        })
        console.log(`  ✓ Uploaded inspiration image: ${project.title}`)
      }
    }
    
    const inspirationDoc = await retryOperation(() => client.createOrReplace({
      _type: 'homeInspirationSection',
      _id: 'homeInspirationSection',
      sectionLabel: 'Inspirations',
      title: 'Architectural excellence. Realized through innovative design.',
      projects: uploadedProjects,
      showSection: true,
    }))
    console.log('✅ Inspiration Section created:', inspirationDoc._id)

    // 7. Contact Info
    console.log('📝 Creating Contact Info...')
    const contactDoc = await retryOperation(() => client.createOrReplace({
      _type: 'contactInfo',
      _id: 'contactInfo',
      email: 'info@loxen.com',
      phone: '+44 20 7123 4567',
      address: '123 Architecture Street\nLondres, UK EC1A 1BB',
      responseTime: 'Réponse sous 24 heures',
    }))
    console.log('✅ Contact Info created:', contactDoc._id)

    console.log('\n🎉 All home page sections seeded successfully!')
    console.log('✅ All images have been uploaded and linked.')

  } catch (error) {
    console.error('❌ Error seeding home page:', error)
    process.exit(1)
  }
}

// Run the seed function
seedHomePage()

