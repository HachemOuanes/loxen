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

async function extractDecorData() {
  try {
    console.log('🔍 Extracting decor data from all products...')
    
    // Get all products with their decor data
    const query = `*[_type in ["productItem", "interiorProduct", "exteriorProduct"]] {
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
      totalFinishesCount,
      collectionName
    }`
    
    const products = await client.fetch(query)
    console.log(`📊 Found ${products.length} products with decor data`)
    
    // Extract all decors with their source product information
    const allDecors = []
    
    products.forEach(product => {
      if (product.availableFinishes && product.availableFinishes.length > 0) {
        product.availableFinishes.forEach(decor => {
          allDecors.push({
            ...decor,
            sourceProduct: {
              _id: product._id,
              _type: product._type,
              name: product.name,
              slug: product.slug,
              collectionName: product.collectionName
            }
          })
        })
      }
    })
    
    console.log(`🎨 Extracted ${allDecors.length} decors from all products`)
    
    // Save to JSON file
    const outputPath = path.join(__dirname, 'extracted-decor-data.json')
    fs.writeFileSync(outputPath, JSON.stringify(allDecors, null, 2))
    
    console.log(`💾 Decor data saved to: ${outputPath}`)
    
    // Show summary by product type
    const summary = products.reduce((acc, product) => {
      const decorCount = product.availableFinishes?.length || 0
      acc[product._type] = (acc[product._type] || 0) + decorCount
      return acc
    }, {})
    
    console.log('\n📈 Summary by product type:')
    Object.entries(summary).forEach(([type, count]) => {
      console.log(`  ${type}: ${count} decors`)
    })
    
    return allDecors
    
  } catch (error) {
    console.error('❌ Error extracting decor data:', error)
    throw error
  }
}

// Run the extraction
if (import.meta.url === `file://${process.argv[1]}`) {
  extractDecorData()
    .then(() => {
      console.log('✅ Decor data extraction completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Extraction failed:', error)
      process.exit(1)
    })
}

export { extractDecorData }
