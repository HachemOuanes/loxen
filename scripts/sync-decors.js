import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uoshkmah',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN || 'skFlzXO1THyGKn67Pletsy5t6UgzHDWmeLezWQvLdGRmbJXxGAUauOkdG0xEnskbnubQBSKurlRc41YdekGJeJ6WOkSgq9Imbo4bJVt4VZDX2oAs0vmBBVsytypXhgVjkUxwfeLu1tt2P2h3eMrP8UxmHF06Cpkh9bXVAjDzaJRZsrDGQfbk',
})

// Fixed lists for validation
const validColors = ['beige', 'blanc', 'bleu', 'gris', 'jaune', 'noir', 'orange', 'rose', 'rouge', 'vert', 'violet']

// Helper function to validate and normalize colors
function normalizeColors(colors) {
  if (!Array.isArray(colors)) return []
  return colors.filter(color => validColors.includes(color))
}

// Read the JSON data
const dataPath = path.join(__dirname, '../data/decors.json')
const decorsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

async function uploadImageFromUrl(imageUrl) {
  try {
    console.log(`Uploading image from: ${imageUrl}`)
    const response = await fetch(imageUrl)
    if (!response.ok) {
      console.warn(`Failed to fetch image from ${imageUrl}: ${response.statusText}`)
      return null
    }
    
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Get file extension from URL
    const extension = path.extname(new URL(imageUrl).pathname) || '.jpg'
    const filename = path.basename(new URL(imageUrl).pathname) || `image${extension}`
    
    // Upload to Sanity
    const asset = await client.assets.upload('image', buffer, {
      filename,
    })
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.error(`Error uploading image from ${imageUrl}:`, error.message)
    return null
  }
}

async function deleteAllDecors() {
  console.log('\n=== Deleting all existing decors ===')
  try {
    // Try to fetch all decors - if unauthorized, skip deletion and proceed with creation
    const allDecors = await client.fetch(`*[_type == "decor"] { _id }`)
    console.log(`Found ${allDecors.length} existing decors to delete`)
    
    if (allDecors.length > 0) {
      // Delete in batches to avoid transaction limits
      const batchSize = 50
      for (let i = 0; i < allDecors.length; i += batchSize) {
        const batch = allDecors.slice(i, i + batchSize)
        const transaction = client.transaction()
        
        batch.forEach(decor => {
          transaction.delete(decor._id)
        })
        
        await transaction.commit()
        console.log(`✓ Deleted batch ${Math.floor(i / batchSize) + 1} (${batch.length} decors)`)
      }
      console.log(`✓ Deleted all ${allDecors.length} existing decors`)
    } else {
      console.log('No existing decors to delete')
    }
  } catch (error) {
    if (error.statusCode === 401) {
      console.warn('⚠ Warning: Unauthorized to delete decors. Token may not have delete permissions.')
      console.warn('⚠ Continuing with creation - existing decors will be updated if they match by code.')
    } else {
      console.error('Error deleting decors:', error.message)
      throw error
    }
  }
}

async function syncDecors() {
  console.log(`\n=== Starting sync of ${decorsData.length} decors ===`)
  
  // First, delete all existing decors
  await deleteAllDecors()
  
  let successCount = 0
  let errorCount = 0
  
  for (const decor of decorsData) {
    try {
      console.log(`\nProcessing decor: ${decor.code} - ${decor.name}`)
      
      // Check if decor already exists (in case deletion failed)
      const existingDecors = await client.fetch(
        `*[_type == "decor" && code == $code] { _id }`,
        { code: decor.code }
      )
      
      let imageAsset = null
      
      // Upload image if image_url is provided
      if (decor.image_url) {
        imageAsset = await uploadImageFromUrl(decor.image_url)
      }
      
      // Prepare the document with normalized data
      const document = {
        _type: 'decor',
        code: decor.code,
        name: decor.name,
        abet_order: decor.abet_order || null,
        image_url: decor.image_url || null,
        keywords: decor.keywords || [],
        colors: normalizeColors(decor.colors || []),
        interior: decor.interior || false,
        exterior: decor.exterior || false,
        available: decor.available !== undefined ? decor.available : true,
        is_new: decor.is_new || false,
        featured: false, // Default to false, can be set manually in Sanity
        // products field will be set manually in Sanity Studio
      }
      
      // Add image asset if available
      if (imageAsset) {
        document.image = imageAsset
      }
      
      if (existingDecors.length > 0) {
        // Update existing decor
        const existingId = existingDecors[0]._id
        await client
          .patch(existingId)
          .set(document)
          .commit()
        console.log(`✓ Updated decor: ${decor.code} - ${decor.name}`)
      } else {
        // Create new decor
        await client.create(document)
        console.log(`✓ Created decor: ${decor.code} - ${decor.name}`)
      }
      
      successCount++
    } catch (error) {
      console.error(`✗ Error processing decor ${decor.code}:`, error.message)
      errorCount++
    }
  }
  
  console.log(`\n\n=== Sync Complete ===`)
  console.log(`Success: ${successCount}`)
  console.log(`Errors: ${errorCount}`)
  console.log(`Total: ${decorsData.length}`)
}

// Run the sync
syncDecors().catch(console.error)

