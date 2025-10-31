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

const validCollections = [
  { code: 'c0A', name: 'WHIMSY' },
  { code: 'c10', name: 'Decori minimi' },
  { code: 'c2', name: 'Colours' },
  { code: 'c22', name: 'Magnetico' },
  { code: 'c24', name: 'Interni' },
  { code: 'c25', name: 'Full colour' },
  { code: 'c27', name: 'Labgrade' },
  { code: 'c31', name: 'Metalli' },
  { code: 'c37', name: 'MEG' },
  { code: 'c38', name: 'Walkprint' },
  { code: 'c42', name: 'Diafos' },
  { code: 'c49', name: 'HR-LAQ' },
  { code: 'c54', name: 'Labgrade Plus' },
  { code: 'c6', name: 'Design Edition' },
  { code: 'c71', name: 'PARADE' },
  { code: 'c75', name: 'DIGITAL NATURE' },
  { code: 'c78', name: 'Polaris' },
  { code: 'c7A', name: '' },
  { code: 'c7B', name: 'Polaris Contemporary' },
  { code: 'c81', name: 'Fluo' },
  { code: 'c84', name: 'Externa' },
  { code: 'c89', name: 'FEBO' },
  { code: 'c9', name: 'Rocks' },
  { code: 'c93', name: 'Metal effect' },
  { code: 'c94', name: 'Fabriek' },
  { code: 'c95', name: 'DIGITAL CIRCUS' },
  { code: 'c996', name: 'MEG-H' },
  { code: 'c997', name: 'Work In Progress' },
  { code: 'c998', name: 'Naval Deck' },
  { code: 'c999', name: 'Mare Nostrum' },
  { code: 'c9A', name: 'Legni light' },
  { code: 'c9B', name: 'Legni dark' },
  { code: 'cHA', name: 'Hachure' },
]

// Create a map for quick lookup
const collectionMap = new Map(validCollections.map(c => [c.code, c]))

// Helper function to validate and normalize collection_names
function normalizeCollectionNames(collectionNames) {
  if (!Array.isArray(collectionNames)) return []
  
  return collectionNames
    .map(cn => {
      const collection = collectionMap.get(cn.code)
      if (collection) {
        return {
          code: collection.code,
          name: collection.name || cn.name || '',
        }
      }
      // If not found in fixed list, try to find by name
      const foundByName = validCollections.find(c => c.name === cn.name)
      if (foundByName) {
        return {
          code: foundByName.code,
          name: foundByName.name,
        }
      }
      // Return original if not found (will be filtered)
      return null
    })
    .filter(Boolean)
}

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
        collection_names: normalizeCollectionNames(decor.collection_names || []),
        collections: decor.collections || [],
        surfaces: decor.surfaces || [],
        finishes: decor.finishes || [],
        option_classes: decor.option_classes || [],
        keywords: decor.keywords || [],
        colors: normalizeColors(decor.colors || []),
        interior: decor.interior || false,
        exterior: decor.exterior || false,
        available: decor.available !== undefined ? decor.available : true,
        is_new: decor.is_new || false,
        featured: false, // Default to false, can be set manually in Sanity
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

