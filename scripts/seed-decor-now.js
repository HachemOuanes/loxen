import { createClient } from '@sanity/client'

console.log('🚀 Starting decor seeding NOW...')

const client = createClient({
  projectId: 'uoshkmah',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
})

async function seedDecorsNow() {
  try {
    console.log('📡 Fetching products...')
    
    // Get all products with decor data
    const products = await client.fetch(`*[_type in ["productItem", "interiorProduct", "exteriorProduct"]] {
      _id,
      _type,
      name,
      availableFinishes[]{
        code,
        name,
        image,
        color
      },
      collectionName
    }`)
    
    console.log(`📊 Found ${products.length} products`)
    
    if (products.length === 0) {
      console.log('⚠️  No products found')
      return
    }
    
    // Extract decors
    const decors = []
    products.forEach(product => {
      if (product.availableFinishes && product.availableFinishes.length > 0) {
        console.log(`  📦 ${product.name}: ${product.availableFinishes.length} decors`)
        product.availableFinishes.forEach(decor => {
          decors.push({
            ...decor,
            sourceProduct: product
          })
        })
      }
    })
    
    console.log(`🎨 Total decors found: ${decors.length}`)
    
    if (decors.length === 0) {
      console.log('⚠️  No decor data found in products!')
      return
    }
    
    // Get categories
    const categories = await client.fetch(`*[_type == "productCategory"] { _id, name }`)
    console.log(`📂 Found ${categories.length} categories`)
    
    // Create decors
    let created = 0
    for (const decor of decors) {
      try {
        // Determine category
        let categoryId = null
        if (decor.sourceProduct._type === 'interiorProduct') {
          categoryId = categories.find(c => c.name.toLowerCase().includes('intérieur'))?._id
        } else if (decor.sourceProduct._type === 'exteriorProduct') {
          categoryId = categories.find(c => c.name.toLowerCase().includes('extérieur'))?._id
        }
        
        if (!categoryId) {
          categoryId = categories[0]?._id
        }
        
        // Check if exists
        const existing = await client.fetch(`*[_type == "decor" && code == $code][0]`, { code: decor.code })
        if (existing) {
          console.log(`⏭️  Skipping existing: ${decor.code}`)
          continue
        }
        
        // Create decor
        const decorDoc = {
          _type: 'decor',
          code: decor.code,
          name: decor.name,
          image: decor.image,
          color: decor.color,
          category: {
            _type: 'reference',
            _ref: categoryId
          },
          collectionName: decor.sourceProduct.collectionName,
          featured: false,
          order: 0
        }
        
        await client.create(decorDoc)
        console.log(`✅ Created: ${decor.code} (${decor.name})`)
        created++
        
      } catch (error) {
        console.error(`❌ Error creating ${decor.code}:`, error.message)
      }
    }
    
    console.log(`\n🎉 Seeding completed! Created ${created} decors`)
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message)
  }
}

// Run it
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDecorsNow()
    .then(() => {
      console.log('✅ Done!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Failed:', error)
      process.exit(1)
    })
}

export { seedDecorsNow }
