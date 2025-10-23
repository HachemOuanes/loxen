import { createClient } from '@sanity/client'

console.log('🚀 Starting decor seeding from products...')

const client = createClient({
  projectId: 'uoshkmah',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN, // Add token if needed
})

async function seedDecorsFromProducts() {
  try {
    console.log('📡 Connecting to Sanity...')
    
    // Step 1: Get all products with decor data
    console.log('\n1️⃣ Fetching products with decor data...')
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
    
    if (products.length === 0) {
      console.log('⚠️  No products found in the database')
      return
    }
    
    // Step 2: Extract decor data
    console.log('\n2️⃣ Extracting decor data...')
    const allDecors = []
    const decorMap = new Map() // To avoid duplicates
    
    products.forEach(product => {
      if (product.availableFinishes && product.availableFinishes.length > 0) {
        console.log(`  📦 ${product.name} (${product._type}): ${product.availableFinishes.length} decors`)
        
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
    
    if (uniqueDecors.length === 0) {
      console.log('⚠️  No decor data found in products!')
      console.log('   This could mean:')
      console.log('   1. Products don\'t have decor data yet')
      console.log('   2. The decor fields have already been removed')
      console.log('   3. The field names are different')
      return
    }
    
    // Step 3: Get product categories
    console.log('\n3️⃣ Getting product categories...')
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
    
    // Step 4: Create decor documents
    console.log('\n4️⃣ Creating decor documents...')
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
    
    // Step 5: Summary
    console.log('\n📈 Seeding Summary:')
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
    
    if (successCount > 0) {
      console.log('\n🎉 Decor seeding completed successfully!')
      console.log('   You can now see the decors in the Sanity Studio under "🎨 Decors"')
    }
    
    return { successCount, errorCount, totalDecors: uniqueDecors.length }
    
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    
    if (error.message.includes('ECONNRESET')) {
      console.log('\n💡 Connection issue detected. This might be due to:')
      console.log('   1. Network connectivity issues')
      console.log('   2. Sanity API rate limiting')
      console.log('   3. Firewall blocking the connection')
      console.log('   4. Missing API token for write operations')
      console.log('\n🔧 Try running the script again, or check your network connection.')
    }
    
    throw error
  }
}

// Run the seeding
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDecorsFromProducts()
    .then(({ successCount, errorCount, totalDecors }) => {
      console.log(`\n🎉 Decor seeding completed!`)
      console.log(`   Created: ${successCount} decors`)
      console.log(`   Errors: ${errorCount} decors`)
      console.log(`   Total found: ${totalDecors} decors`)
      process.exit(errorCount > 0 ? 1 : 0)
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error)
      process.exit(1)
    })
}

export { seedDecorsFromProducts }
