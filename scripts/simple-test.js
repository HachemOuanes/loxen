import { createClient } from '@sanity/client'

console.log('🚀 Starting simple test...')

const client = createClient({
  projectId: 'uoshkmah',
  dataset: 'production',
  useCdn: false,
})

console.log('📡 Client created, fetching data...')

const query = `*[_type in ["productItem", "interiorProduct", "exteriorProduct"]] {
  _id,
  _type,
  name,
  availableFinishes
}`

client.fetch(query)
  .then(products => {
    console.log(`📊 Found ${products.length} products`)
    
    let totalDecors = 0
    products.forEach(product => {
      const decorCount = product.availableFinishes?.length || 0
      if (decorCount > 0) {
        console.log(`  ${product.name}: ${decorCount} decors`)
        totalDecors += decorCount
      }
    })
    
    console.log(`🎨 Total decors: ${totalDecors}`)
    
    if (totalDecors === 0) {
      console.log('⚠️  No decor data found in products')
    }
  })
  .catch(error => {
    console.error('❌ Error:', error)
  })

