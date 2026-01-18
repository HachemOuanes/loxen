/**
 * Seed script for exterior product categories with products
 * 
 * Setup:
 * 1. Create a .env.local file with:
 *    NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
 *    NEXT_PUBLIC_SANITY_DATASET=production
 *    SANITY_API_TOKEN=your_write_token
 * 
 * 2. Run: node scripts/seed-exterior-products.js
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
const result = dotenv.config({ path: '.env.local' })

if (result.error) {
  console.warn('⚠️  Could not load .env.local file, trying default .env')
  dotenv.config()
}

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
  requestTagPrefix: 'exterior-products-seed',
  timeout: 30000,
})

// Mock products data matching the component
const mockProductsByCategory = {
  0: [
    { name: 'Copanel Premium', description: 'Panneaux composites haute performance pour façades architecturales modernes.', link: '/produits/exterieur/copanel', order: 0 },
    { name: 'MEG System Pro', description: 'Système de panneaux de façade haute performance avec résistance supérieure.', link: '/produits/exterieur/meg-system', order: 1 },
    { name: 'Trespa Facade', description: 'Panneaux stratifiés haute pression premium pour applications extérieures.', link: '/produits/exterieur/trespa', order: 2 },
  ],
  1: [
    { name: 'Fundermax Classic', description: 'Solutions de façade innovantes alliant esthétique et excellence technique.', link: '/produits/exterieur/fundermax', order: 0 },
    { name: 'Abet Laminati Elite', description: 'Excellence du design italien en stratifiés haute pression.', link: '/produits/exterieur/abet', order: 1 },
    { name: 'Alucobond Premium', description: 'Panneaux composites aluminium pour façades ventilées modernes.', link: '/produits/exterieur/alucobond', order: 2 },
  ],
  2: [
    { name: 'Vitrage Structural', description: 'Systèmes de vitrage structural pour façades transparentes.', link: '/produits/exterieur/vitrage', order: 0 },
    { name: 'Curtain Wall System', description: 'Systèmes de murs-rideaux haute performance.', link: '/produits/exterieur/curtain-wall', order: 1 },
    { name: 'Double Skin Facade', description: 'Façades double peau pour efficacité énergétique optimale.', link: '/produits/exterieur/double-skin', order: 2 },
  ],
}

async function seedExteriorProducts() {
  console.log('🌱 Seeding exterior products to categories...')

  try {
    // Fetch existing exterior product categories document
    const existingDoc = await client.fetch(
      `*[_type == "exteriorProductCategories" && (_id == "exteriorProductCategories" || _id == "drafts.exteriorProductCategories")][0]`
    )

    if (!existingDoc) {
      console.error('❌ Exterior Product Categories document not found. Please run seed-exterior-section.ts first.')
      process.exit(1)
    }

    console.log(`📝 Found document with ${existingDoc.categories?.length || 0} categories`)

    // Update each category with products
    const updatedCategories = existingDoc.categories.map((category, index) => {
      const products = mockProductsByCategory[index] || []
      
      if (products.length > 0) {
        console.log(`  ✓ Adding ${products.length} products to category: ${category.name}`)
      }

      return {
        ...category,
        products: products,
      }
    })

    // Update the document
    console.log('📝 Updating Exterior Product Categories with products...')
    const updatedDoc = await client
      .patch(existingDoc._id)
      .set({ categories: updatedCategories })
      .commit()

    console.log('✅ Exterior Product Categories updated successfully!')
    console.log(`✅ Added products to ${updatedCategories.length} categories`)

    // Print summary
    updatedCategories.forEach((category, index) => {
      if (category.products && category.products.length > 0) {
        console.log(`  - ${category.name}: ${category.products.length} products`)
      }
    })

    console.log('\n🎉 Exterior products seeded successfully!')

  } catch (error) {
    console.error('❌ Error seeding exterior products:', error)
    process.exit(1)
  }
}

// Run the seed function
seedExteriorProducts()
