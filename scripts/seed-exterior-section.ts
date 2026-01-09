/**
 * Seed script for exterior product categories
 * 
 * Setup:
 * 1. Create a .env.local file with:
 *    NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
 *    NEXT_PUBLIC_SANITY_DATASET=production
 *    SANITY_API_TOKEN=your_write_token
 * 
 * 2. Run: npx tsx scripts/seed-exterior-section.ts
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
  requestTagPrefix: 'exterior-seed',
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

async function seedExteriorSection() {
  console.log('🌱 Seeding exterior product categories...')

  try {
    // Upload category images
    console.log('  📤 Uploading category images...')
    const publicPath = join(__dirname, '..', 'public')
    
    // Use existing images from public folder or create placeholders
    const categoryImages = [
      { name: 'Facades Ventilées', image: 'modern-glass-facade-building-architecture-premium.jpg' },
      { name: 'Bardages', image: 'contemporary-composite-facade-panels-copanel-moder.jpg' },
      { name: 'Enveloppe du Bâtiment', image: 'sophisticated-ventilated-facade-system-performance.jpg' },
      { name: 'Vitrage Structural', image: 'elegant-composite-panel-facade-system-lightweight-.jpg' },
      { name: 'Curtain Wall', image: 'premium-minimalist-facade-clean.jpg' },
      { name: 'Double Peau', image: 'modern-architectural-facade-panels-meg-system-high.jpg' },
    ]

    const uploadedCategories = []
    for (let i = 0; i < categoryImages.length; i++) {
      const category = categoryImages[i]
      const imagePath = join(publicPath, category.image)
      const uploadedImage = await uploadImageToSanity(imagePath)
      
      if (uploadedImage) {
        uploadedCategories.push({
          name: category.name,
          description: `Solutions innovantes pour ${category.name.toLowerCase()} offrant performance et esthétique.`,
          image: uploadedImage,
          order: i,
          link: `/produits/exterieur/${category.name.toLowerCase().replace(/\s+/g, '-')}`
        })
        console.log(`  ✓ Uploaded image for: ${category.name}`)
      } else {
        // Create category without image if upload fails
        uploadedCategories.push({
          name: category.name,
          description: `Solutions innovantes pour ${category.name.toLowerCase()} offrant performance et esthétique.`,
          order: i,
          link: `/produits/exterieur/${category.name.toLowerCase().replace(/\s+/g, '-')}`
        })
        console.log(`  ⚠️  Created category without image: ${category.name}`)
      }
    }

    // Create exterior product categories document
    console.log('📝 Creating Exterior Product Categories...')
    const exteriorDoc = await retryOperation(() => client.createOrReplace({
      _type: 'exteriorProductCategories',
      _id: 'exteriorProductCategories',
      title: 'Extérieur',
      description: 'Conception et réalisation de façades innovantes et de solutions extérieures durables pour valoriser l\'architecture moderne.',
      categories: uploadedCategories,
    }))
    console.log('✅ Exterior Product Categories created:', exteriorDoc._id)
    console.log(`✅ ${uploadedCategories.length} categories added`)

    console.log('\n🎉 Exterior product categories seeded successfully!')

  } catch (error) {
    console.error('❌ Error seeding exterior section:', error)
    process.exit(1)
  }
}

// Run the seed function
seedExteriorSection()

