import { createClient } from '@sanity/client'

const token = 'sk166g32LOegNOmEkKGe2FICLqmy4bkys9p0v8LrJ0q6WUm4HfduM4Mbzu7pR5OxoisyucgGzymYW1O5swBj9JWbgWzcnDSLJlvtwtD1QFVKs0NXYkNF3EAKCzPjvlBg871jANEOhHeUw1S5c3huCokXQLfJ4A9f9V80rc08aa0tBA8qGxyA'

const client = createClient({
  projectId: 'uoshkmah',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: token,
})

async function testToken() {
  try {
    console.log('Testing Sanity token...')
    console.log('Project ID: uoshkmah')
    console.log('Dataset: production')
    
    // Try a simple query
    const result = await client.fetch(`*[_type == "decor"] | order(_createdAt desc) [0...5] { _id, code, name }`)
    console.log('✓ Token is valid!')
    console.log(`Found ${result.length} decors`)
    if (result.length > 0) {
      console.log('Sample decors:', result)
    }
    
    // Try to create a test document
    try {
      const testDoc = await client.create({
        _type: 'decor',
        code: 'TEST',
        name: 'Test Decor',
        available: false,
      })
      console.log('✓ Can create documents')
      console.log('Test document ID:', testDoc._id)
      
      // Delete it
      await client.delete(testDoc._id)
      console.log('✓ Can delete documents')
    } catch (createError) {
      console.log('✗ Cannot create documents:', createError.message)
    }
    
  } catch (error) {
    console.error('✗ Token test failed:', error.message)
    console.error('Error details:', error.responseBody || error)
  }
}

testToken()

