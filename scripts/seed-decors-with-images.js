import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Sanity client configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

console.log('🔧 Sanity Configuration:')
console.log(`   Project ID: ${projectId || '❌ NOT SET'}`)
console.log(`   Dataset: ${dataset}`)
console.log(`   Token: ${token ? '✅ SET' : '❌ NOT SET'}\n`)

if (!projectId) {
  console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set!')
  console.error('   Please set environment variable or run with:')
  console.error('   $env:NEXT_PUBLIC_SANITY_PROJECT_ID="uoshkmah"; node scripts/seed-decors-with-images.js\n')
  process.exit(1)
}

if (!token) {
  console.error('❌ Error: SANITY_API_TOKEN is not set!')
  console.error('   Please set your Sanity write token:')
  console.error('   $env:SANITY_API_TOKEN="your_token"; node scripts/seed-decors-with-images.js\n')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-03-01',
  useCdn: false,
  token,
})

// Load extracted decor data
const decorDataPath = path.join(__dirname, '../decor-data-with-collections.json')
const decorData = JSON.parse(fs.readFileSync(decorDataPath, 'utf8'))

console.log(`📦 Loaded ${decorData.length} decor items for seeding\n`)

// Helper function to download image from URL
async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`))
        return
      }
      
      const chunks = []
      response.on('data', (chunk) => chunks.push(chunk))
      response.on('end', () => resolve(Buffer.concat(chunks)))
      response.on('error', reject)
    }).on('error', reject)
  })
}

// Helper function to upload image to Sanity
async function uploadImageToSanity(imageBuffer, filename) {
  try {
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
      contentType: 'image/jpeg',
    })
    return asset._id
  } catch (error) {
    console.error(`  ❌ Failed to upload image: ${error.message}`)
    return null
  }
}

// Helper function to create a decor document in Sanity
async function createDecorDocument(decorItem, imageAssetId) {
  try {
    // Prepare the document
    const document = {
      _type: 'decor',
      code: decorItem.code,
      name: decorItem.name,
      title: decorItem.title,
      collections: decorItem.collections.map(col => col.name),
      applicationType: decorItem.applicationType,
      color: decorItem.color,
      collectionName: decorItem.collection,
      available: decorItem.available,
      featured: false,
      order: 0,
    }
    
    // Add image reference if upload was successful
    if (imageAssetId) {
      document.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId,
        },
      }
    }
    
    // Create the document
    const result = await client.create(document)
    return result
  } catch (error) {
    throw error
  }
}

// Main seeding function
async function seedDecors() {
  let successCount = 0
  let errorCount = 0
  let skippedCount = 0
  
  console.log('🌱 Starting decor seeding process...\n')
  
  for (let i = 0; i < decorData.length; i++) {
    const decorItem = decorData[i]
    const progress = `[${i + 1}/${decorData.length}]`
    
    try {
      console.log(`${progress} Processing: ${decorItem.code} - ${decorItem.name}`)
      
      // Check if decor already exists
      const existing = await client.fetch(
        `*[_type == "decor" && code == $code][0]`,
        { code: decorItem.code }
      )
      
      if (existing) {
        console.log(`  ⏭️  Already exists, skipping...`)
        skippedCount++
        continue
      }
      
      // Download image from URL
      console.log(`  📥 Downloading image from: ${decorItem.image}`)
      const imageBuffer = await downloadImage(decorItem.image)
      console.log(`  ✓ Downloaded ${(imageBuffer.length / 1024).toFixed(2)} KB`)
      
      // Upload image to Sanity
      console.log(`  📤 Uploading image to Sanity...`)
      const imageAssetId = await uploadImageToSanity(imageBuffer, decorItem.cover)
      
      if (!imageAssetId) {
        console.log(`  ⚠️  Image upload failed, creating document without image...`)
      } else {
        console.log(`  ✓ Image uploaded: ${imageAssetId}`)
      }
      
      // Create decor document
      console.log(`  💾 Creating decor document...`)
      const result = await createDecorDocument(decorItem, imageAssetId)
      console.log(`  ✅ Created: ${result._id}\n`)
      
      successCount++
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
      
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}\n`)
      errorCount++
      
      // Continue with next item instead of failing completely
      continue
    }
  }
  
  return { successCount, errorCount, skippedCount }
}

// Run the seeding process
console.log('🚀 Starting seeding process...\n')
seedDecors()
    .then(({ successCount, errorCount, skippedCount }) => {
      console.log(`\n${'='.repeat(60)}`)
      console.log(`🎉 Decor seeding completed!`)
      console.log(`${'='.repeat(60)}`)
      console.log(`   ✅ Created: ${successCount} decors`)
      console.log(`   ⏭️  Skipped: ${skippedCount} decors (already exist)`)
      console.log(`   ❌ Errors: ${errorCount} decors`)
      console.log(`   📊 Total processed: ${successCount + errorCount + skippedCount}/${decorData.length}`)
      console.log(`${'='.repeat(60)}\n`)
      
      process.exit(errorCount > 0 ? 1 : 0)
    })
    .catch((error) => {
      console.error('\n❌ Seeding failed:', error)
      process.exit(1)
    })

export { seedDecors }

