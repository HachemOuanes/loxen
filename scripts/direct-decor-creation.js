import { createClient } from '@sanity/client'

console.log('🚀 Direct decor creation script...')

const client = createClient({
  projectId: 'uoshkmah',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
})

async function createSampleDecors() {
  try {
    console.log('📡 Testing connection...')
    
    // Test connection with a simple query
    const testQuery = `*[_type == "productCategory"][0]`
    const testResult = await client.fetch(testQuery)
    console.log('✅ Connection successful')
    
    if (testResult) {
      console.log(`📂 Found category: ${testResult.name}`)
    }
    
    // Create a sample decor to test
    console.log('\n🎨 Creating sample decor...')
    
    const sampleDecor = {
      _type: 'decor',
      code: 'SAMPLE-001',
      name: 'Sample Decor',
      color: '#FF5733',
      category: {
        _type: 'reference',
        _ref: testResult?._id || 'interior'
      },
      collectionName: 'Sample Collection',
      featured: false,
      order: 0
    }
    
    const result = await client.create(sampleDecor)
    console.log(`✅ Created sample decor: ${result._id}`)
    
    console.log('\n🎉 Sample decor created successfully!')
    console.log('   You can now see it in the Sanity Studio under "🎨 Decors"')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    
    if (error.message.includes('ECONNRESET')) {
      console.log('\n💡 Connection issue detected.')
      console.log('   This might be due to network connectivity or API restrictions.')
    } else if (error.message.includes('Unauthorized')) {
      console.log('\n💡 Authorization issue detected.')
      console.log('   You might need to add a SANITY_API_TOKEN environment variable.')
    }
    
    throw error
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  createSampleDecors()
    .then(() => {
      console.log('\n✅ Script completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Script failed:', error)
      process.exit(1)
    })
}

export { createSampleDecors }
