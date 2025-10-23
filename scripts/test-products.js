import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'uoshkmah',
  dataset: 'production',
  useCdn: false,
})

async function testProducts() {
  try {
    console.log('🔍 Testing products with decor data...')
    
    // Check all product types
    const query = `*[_type in ["productItem", "interiorProduct", "exteriorProduct"]] {
      _id,
      _type,
      name,
      slug,
      availableFinishes
    }`
    
    const products = await client.fetch(query)
    console.log(`📊 Found ${products.length} products`)
    
    let totalDecors = 0
    products.forEach(product => {
      const decorCount = product.availableFinishes?.length || 0
      if (decorCount > 0) {
        console.log(`  ${product.name} (${product._type}): ${decorCount} decors`)
        totalDecors += decorCount
      }
    })
    
    console.log(`\n🎨 Total decors found: ${totalDecors}`)
    
    if (totalDecors === 0) {
      console.log('⚠️  No decor data found in products. This might mean:')
      console.log('   1. Products don\'t have decor data yet')
      console.log('   2. The decor fields have already been removed')
      console.log('   3. There are no products in the database')
    }
    
    return { products: products.length, totalDecors }
    
  } catch (error) {
    console.error('❌ Error testing products:', error)
    throw error
  }
}

// Run the test
if (import.meta.url === `file://${process.argv[1]}`) {
  testProducts()
    .then(({ products, totalDecors }) => {
      console.log(`\n✅ Test completed!`)
      console.log(`   Products: ${products}`)
      console.log(`   Total decors: ${totalDecors}`)
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Test failed:', error)
      process.exit(1)
    })
}

export { testProducts }

