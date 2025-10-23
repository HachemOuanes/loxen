import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Sanity client
const client = createClient({
  projectId: 'uoshkmah',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
})

async function migrateDecorData() {
  try {
    console.log('🚀 Starting decor data migration...')
    
    // Step 1: Extract decor data from products
    console.log('\n1️⃣ Extracting decor data from products...')
    const productsQuery = `*[_type in ["productItem", "interiorProduct", "exteriorProduct"]] {
      _id,
      _type,
      name,
      slug,
      availableFinishes[]{
        code,
        name,
        image,
        color
      },
      collectionName
    }`
    
    const products = await client.fetch(productsQuery)
    console.log(`📊 Found ${products.length} products`)
    
    // Extract all decors with their source product information
    const allDecors = []
    const decorMap = new Map() // To avoid duplicates
    
    products.forEach(product => {
      if (product.availableFinishes && product.availableFinishes.length > 0) {
        product.availableFinishes.forEach(decor => {
          const decorKey = `${decor.code}-${decor.name}`
          
          if (!decorMap.has(decorKey)) {
            decorMap.set(decorKey, {
              ...decor,
              sourceProduct: {
                _id: product._id,
                _type: product._type,
                name: product.name,
                slug: product.slug,
                collectionName: product.collectionName
              }
            })
          }
        })
      }
    })
    
    const uniqueDecors = Array.from(decorMap.values())
    console.log(`🎨 Found ${uniqueDecors.length} unique decors`)
    
    // Step 2: Get product categories for mapping
    console.log('\n2️⃣ Getting product categories...')
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
    
    // Step 3: Create decor documents
    console.log('\n3️⃣ Creating decor documents...')
    let successCount = 0
    let errorCount = 0
    const errors = []
    
    for (const decorData of uniqueDecors) {
      try {
        // Determine category based on source product type
        let categoryId = null
        const sourceType = decorData.sourceProduct._type
        
        if (sourceType === 'interiorProduct') {
          categoryId = categoryMap['intérieur'] || categoryMap['interior']
        } else if (sourceType === 'exteriorProduct') {
          categoryId = categoryMap['extérieur'] || categoryMap['exterior']
        } else if (sourceType === 'productItem') {
          // For productItem, default to interior
          categoryId = categoryMap['intérieur'] || categoryMap['interior']
        }
        
        if (!categoryId) {
          console.warn(`⚠️  Could not determine category for decor from ${sourceType}`)
          categoryId = categories[0]?._id // Fallback to first category
        }
        
        // Check if decor already exists
        const existingQuery = `*[_type == "decor" && code == $code][0]`
        const existing = await client.fetch(existingQuery, { code: decorData.code })
        
        if (existing) {
          console.log(`⏭️  Skipping existing decor: ${decorData.code}`)
          continue
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
    
    // Step 4: Summary
    console.log('\n📈 Migration Summary:')
    console.log(`  ✅ Successfully created: ${successCount} decors`)
    console.log(`  ❌ Errors: ${errorCount} decors`)
    console.log(`  📊 Total products processed: ${products.length}`)
    console.log(`  🎨 Unique decors found: ${uniqueDecors.length}`)
    
    if (errors.length > 0) {
      console.log('\n❌ Errors encountered:')
      errors.forEach(({ decor, error }) => {
        console.log(`  - ${decor}: ${error}`)
      })
    }
    
    // Save migration report
    const report = {
      timestamp: new Date().toISOString(),
      productsProcessed: products.length,
      uniqueDecorsFound: uniqueDecors.length,
      decorsCreated: successCount,
      errors: errorCount,
      errorDetails: errors
    }
    
    const reportPath = path.join(__dirname, 'migration-report.json')
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    console.log(`📄 Migration report saved to: ${reportPath}`)
    
    return { successCount, errorCount, totalDecors: uniqueDecors.length }
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  }
}

// Run the migration
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateDecorData()
    .then(({ successCount, errorCount, totalDecors }) => {
      console.log(`\n🎉 Decor migration completed!`)
      console.log(`   Created: ${successCount} decors`)
      console.log(`   Errors: ${errorCount} decors`)
      console.log(`   Total found: ${totalDecors} decors`)
      process.exit(errorCount > 0 ? 1 : 0)
    })
    .catch((error) => {
      console.error('❌ Migration failed:', error)
      process.exit(1)
    })
}

export { migrateDecorData }

