import { createClient } from '@sanity/client'

console.log('🚀 Checking products for decor data...')

const client = createClient({
  projectId: 'uoshkmah',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
})

console.log('📡 Client created, fetching products...')

// First, let's check if there are any products at all
client.fetch('*[_type in ["productItem", "interiorProduct", "exteriorProduct"]] { _id, _type, name }')
  .then(products => {
    console.log(`📊 Found ${products.length} products total`)
    
    if (products.length === 0) {
      console.log('⚠️  No products found in the database')
      return
    }
    
    // Show first few products
    products.slice(0, 3).forEach(product => {
      console.log(`  - ${product.name} (${product._type})`)
    })
    
    // Now check for decor data
    return client.fetch('*[_type in ["productItem", "interiorProduct", "exteriorProduct"]] { _id, _type, name, availableFinishes }')
  })
  .then(productsWithDecors => {
    if (!productsWithDecors) return
    
    console.log(`\n🎨 Checking for decor data...`)
    
    let productsWithDecorsCount = 0
    let totalDecors = 0
    
    productsWithDecors.forEach(product => {
      const decorCount = product.availableFinishes?.length || 0
      if (decorCount > 0) {
        productsWithDecorsCount++
        totalDecors += decorCount
        console.log(`  ✅ ${product.name}: ${decorCount} decors`)
      }
    })
    
    console.log(`\n📈 Summary:`)
    console.log(`  Products with decors: ${productsWithDecorsCount}`)
    console.log(`  Total decors: ${totalDecors}`)
    
    if (totalDecors === 0) {
      console.log('\n⚠️  No decor data found in products!')
      console.log('   This could mean:')
      console.log('   1. Products don\'t have decor data yet')
      console.log('   2. The decor fields have already been removed')
      console.log('   3. The field names are different')
    } else {
      console.log('\n✅ Found decor data! Ready to migrate.')
    }
  })
  .catch(error => {
    console.error('❌ Error:', error.message)
    if (error.message.includes('ECONNRESET')) {
      console.log('\n💡 Connection issue detected. This might be due to:')
      console.log('   1. Network connectivity issues')
      console.log('   2. Sanity API rate limiting')
      console.log('   3. Firewall blocking the connection')
      console.log('\n🔧 Try running the script again, or check your network connection.')
    }
  })

