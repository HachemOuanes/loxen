import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function seedDecorData() {
  try {
    console.log('🌱 Starting decor data seeding...')
    
    // Read extracted decor data
    const dataPath = path.join(__dirname, 'extracted-decor-data.json')
    if (!fs.existsSync(dataPath)) {
      throw new Error('❌ extracted-decor-data.json not found. Please run extract-decor-data.js first.')
    }
    
    const extractedDecors = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    console.log(`📊 Found ${extractedDecors.length} decors to migrate`)
    
    // Get product categories for mapping
    const categoriesQuery = `*[_type == "productCategory"] {
      _id,
      name,
      slug
    }`
    const categories = await client.fetch(categoriesQuery)
    console.log(`📂 Found ${categories.length} product categories`)
    
    // Create category mapping
    const categoryMap = {}
    categories.forEach(cat => {
      categoryMap[cat.name.toLowerCase()] = cat._id
    })
    
    // Process each decor
    let successCount = 0
    let errorCount = 0
    const errors = []
    
    for (const decorData of extractedDecors) {
      try {
        // Determine category based on source product type
        let categoryId = null
        const sourceType = decorData.sourceProduct._type
        
        if (sourceType === 'interiorProduct') {
          categoryId = categoryMap['intérieur'] || categoryMap['interior']
        } else if (sourceType === 'exteriorProduct') {
          categoryId = categoryMap['extérieur'] || categoryMap['exterior']
        } else if (sourceType === 'productItem') {
          // For productItem, we need to check if we can determine the category
          // This might need manual mapping based on the product name or slug
          categoryId = categoryMap['intérieur'] || categoryMap['interior'] // Default to interior
        }
        
        if (!categoryId) {
          console.warn(`⚠️  Could not determine category for decor from ${sourceType}`)
          categoryId = categoryMap['intérieur'] || categories[0]?._id // Fallback
        }
        
        // Create decor document
        const decorDoc = {
          _type: 'decor',
          code: decorData.code,
          name: decorData.name,
          image: decorData.image,
          color: decorData.color,
          category: {
            _type: 'reference',
            _ref: categoryId
          },
          collectionName: decorData.sourceProduct.collectionName,
          featured: false,
          order: 0
        }
        
        // Check if decor already exists
        const existingQuery = `*[_type == "decor" && code == $code][0]`
        const existing = await client.fetch(existingQuery, { code: decorData.code })
        
        if (existing) {
          console.log(`⏭️  Skipping existing decor: ${decorData.code}`)
          continue
        }
        
        // Create the decor
        const result = await client.create(decorDoc)
        console.log(`✅ Created decor: ${decorData.code} (${decorData.name})`)
        successCount++
        
      } catch (error) {
        console.error(`❌ Error creating decor ${decorData.code}:`, error.message)
        errors.push({
          decor: decorData.code,
          error: error.message
        })
        errorCount++
      }
    }
    
    console.log('\n📈 Seeding Summary:')
    console.log(`  ✅ Successfully created: ${successCount} decors`)
    console.log(`  ❌ Errors: ${errorCount} decors`)
    
    if (errors.length > 0) {
      console.log('\n❌ Errors encountered:')
      errors.forEach(({ decor, error }) => {
        console.log(`  - ${decor}: ${error}`)
      })
    }
    
    // Save error report
    if (errors.length > 0) {
      const errorPath = path.join(__dirname, 'seeding-errors.json')
      fs.writeFileSync(errorPath, JSON.stringify(errors, null, 2))
      console.log(`📄 Error report saved to: ${errorPath}`)
    }
    
    return { successCount, errorCount, errors }
    
  } catch (error) {
    console.error('❌ Error seeding decor data:', error)
    throw error
  }
}

// Run the seeding
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDecorData()
    .then(({ successCount, errorCount }) => {
      console.log(`\n🎉 Decor data seeding completed!`)
      console.log(`   Created: ${successCount} decors`)
      console.log(`   Errors: ${errorCount} decors`)
      process.exit(errorCount > 0 ? 1 : 0)
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error)
      process.exit(1)
    })
}

export { seedDecorData }
