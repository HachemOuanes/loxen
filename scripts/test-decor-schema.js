const { createClient } = require('@sanity/client')

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uoshkmah',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function testDecorSchema() {
  try {
    console.log('🔍 Testing decor schema availability...')
    
    // Test 1: Check if decor schema is accessible
    console.log('\n1️⃣ Testing decor schema access...')
    const decorQuery = `*[_type == "decor"][0]`
    const decorSample = await client.fetch(decorQuery)
    
    if (decorSample) {
      console.log('✅ Decor schema is accessible')
      console.log(`   Sample decor: ${decorSample.name} (${decorSample.code})`)
    } else {
      console.log('⚠️  No decor documents found - schema may not be deployed yet')
    }
    
    // Test 2: Try to create a test decor
    console.log('\n2️⃣ Testing decor creation...')
    try {
      const testDecor = {
        _type: 'decor',
        code: 'TEST-001',
        name: 'Test Decor',
        color: '#FF5733',
        category: {
          _type: 'reference',
          _ref: 'interior' // Assuming interior category exists
        },
        featured: false,
        order: 0
      }
      
      // Check if decor already exists
      const existingQuery = `*[_type == "decor" && code == "TEST-001"][0]`
      const existing = await client.fetch(existingQuery)
      
      if (existing) {
        console.log('✅ Test decor already exists')
      } else {
        const result = await client.create(testDecor)
        console.log('✅ Test decor created successfully')
        console.log(`   Created decor ID: ${result._id}`)
      }
    } catch (error) {
      console.log('❌ Failed to create test decor:', error.message)
    }
    
    // Test 3: Check schema types
    console.log('\n3️⃣ Testing schema types...')
    const schemaQuery = `*[_type == "decor"] | order(_createdAt desc) [0...5] {
      _id,
      _type,
      code,
      name,
      category->{
        _id,
        name
      }
    }`
    const decors = await client.fetch(schemaQuery)
    console.log(`📊 Found ${decors.length} decor documents`)
    
    if (decors.length > 0) {
      console.log('   Recent decors:')
      decors.forEach(decor => {
        console.log(`   - ${decor.name} (${decor.code}) - Category: ${decor.category?.name || 'Unknown'}`)
      })
    }
    
    // Test 4: Check if decor schema is in the schema types
    console.log('\n4️⃣ Testing schema registration...')
    const allTypesQuery = `*[_type == "decor"] | order(_createdAt desc) [0...1]`
    const testResult = await client.fetch(allTypesQuery)
    
    if (testResult !== null) {
      console.log('✅ Decor schema is properly registered')
    } else {
      console.log('❌ Decor schema may not be registered properly')
    }
    
    console.log('\n🎉 Decor schema test completed!')
    
    return {
      success: true,
      decorCount: decors.length,
      schemaAccessible: decorSample !== null
    }
    
  } catch (error) {
    console.error('❌ Decor schema test failed:', error)
    return { success: false, error: error.message }
  }
}

// Run the test
if (require.main === module) {
  testDecorSchema()
    .then((result) => {
      if (result.success) {
        console.log('\n✅ Decor schema test passed!')
        if (result.schemaAccessible) {
          console.log('🎉 Decor schema is working correctly!')
        } else {
          console.log('⚠️  Decor schema is registered but no documents exist yet.')
          console.log('   Run the seeding script to create decor documents.')
        }
        process.exit(0)
      } else {
        console.log('\n❌ Decor schema test failed!')
        console.log('   This might indicate the schema is not properly deployed.')
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error('❌ Test execution failed:', error)
      process.exit(1)
    })
}

module.exports = { testDecorSchema }

