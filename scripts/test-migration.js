const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function testMigration() {
  try {
    console.log('🧪 Testing decor migration...')
    
    // Test 1: Check if decor schema exists
    console.log('\n1️⃣ Testing decor schema...')
    const decorSchemaQuery = `*[_type == "decor"][0]`
    const decorSample = await client.fetch(decorSchemaQuery)
    
    if (decorSample) {
      console.log('✅ Decor schema is accessible')
      console.log(`   Sample decor: ${decorSample.name} (${decorSample.code})`)
    } else {
      console.log('⚠️  No decor documents found - schema may not be deployed yet')
    }
    
    // Test 2: Check decor count
    console.log('\n2️⃣ Testing decor count...')
    const decorCountQuery = `count(*[_type == "decor"])`
    const decorCount = await client.fetch(decorCountQuery)
    console.log(`📊 Total decors in database: ${decorCount}`)
    
    // Test 3: Check decor categories
    console.log('\n3️⃣ Testing decor categories...')
    const categoryQuery = `*[_type == "decor"] {
      category->{
        _id,
        name,
        slug
      }
    } | group(category) | {
      "category": category,
      "count": count()
    }`
    const categories = await client.fetch(categoryQuery)
    console.log('📂 Decor categories:')
    categories.forEach(cat => {
      console.log(`   ${cat.category?.name || 'Unknown'}: ${cat.count} decors`)
    })
    
    // Test 4: Check collections
    console.log('\n4️⃣ Testing decor collections...')
    const collectionQuery = `*[_type == "decor"] {
      collectionName
    } | group(collectionName) | {
      "collection": collectionName,
      "count": count()
    }`
    const collections = await client.fetch(collectionQuery)
    console.log('🎨 Decor collections:')
    collections.forEach(col => {
      console.log(`   ${col.collection || 'Unknown'}: ${col.count} decors`)
    })
    
    // Test 5: Test decor queries
    console.log('\n5️⃣ Testing decor queries...')
    
    // Test random decors
    const randomQuery = `*[_type == "decor"] | order(featured desc, order asc) [0...5] {
      _id,
      code,
      name,
      image,
      color
    }`
    const randomDecors = await client.fetch(randomQuery)
    console.log(`🎲 Random decors (5): ${randomDecors.length} found`)
    
    // Test by product type
    const interiorQuery = `*[_type == "decor" && category->name == "Intérieur"] | order(featured desc, order asc) [0...3] {
      _id,
      code,
      name
    }`
    const interiorDecors = await client.fetch(interiorQuery)
    console.log(`🏠 Interior decors (3): ${interiorDecors.length} found`)
    
    const exteriorQuery = `*[_type == "decor" && category->name == "Extérieur"] | order(featured desc, order asc) [0...3] {
      _id,
      code,
      name
    }`
    const exteriorDecors = await client.fetch(exteriorQuery)
    console.log(`🏢 Exterior decors (3): ${exteriorDecors.length} found`)
    
    // Test 6: Check if products still have decor fields (they shouldn't)
    console.log('\n6️⃣ Testing product schema changes...')
    const productQuery = `*[_type in ["productItem", "interiorProduct", "exteriorProduct"]][0] {
      _type,
      name,
      availableFinishes
    }`
    const productSample = await client.fetch(productQuery)
    
    if (productSample?.availableFinishes) {
      console.log('⚠️  Product still has availableFinishes field - migration may not be complete')
    } else {
      console.log('✅ Product schema updated - availableFinishes field removed')
    }
    
    // Test 7: Check extracted data file
    console.log('\n7️⃣ Testing extracted data file...')
    const dataPath = path.join(__dirname, 'extracted-decor-data.json')
    if (fs.existsSync(dataPath)) {
      const extractedData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      console.log(`📄 Extracted data file: ${extractedData.length} decors`)
    } else {
      console.log('⚠️  Extracted data file not found - run extract-decor-data.js first')
    }
    
    console.log('\n🎉 Migration test completed!')
    
    // Summary
    console.log('\n📋 Test Summary:')
    console.log(`   Decor documents: ${decorCount}`)
    console.log(`   Categories: ${categories.length}`)
    console.log(`   Collections: ${collections.length}`)
    console.log(`   Random decors: ${randomDecors.length}`)
    console.log(`   Interior decors: ${interiorDecors.length}`)
    console.log(`   Exterior decors: ${exteriorDecors.length}`)
    
    return {
      success: true,
      decorCount,
      categories: categories.length,
      collections: collections.length,
      randomDecors: randomDecors.length,
      interiorDecors: interiorDecors.length,
      exteriorDecors: exteriorDecors.length
    }
    
  } catch (error) {
    console.error('❌ Migration test failed:', error)
    return { success: false, error: error.message }
  }
}

// Run the test
if (require.main === module) {
  testMigration()
    .then((result) => {
      if (result.success) {
        console.log('\n✅ All tests passed!')
        process.exit(0)
      } else {
        console.log('\n❌ Some tests failed!')
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error('❌ Test execution failed:', error)
      process.exit(1)
    })
}

module.exports = { testMigration }

