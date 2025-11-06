import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

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

// Decor data with images
const decorData = [
  {
    "abet_order": 313,
    "code": "2905",
    "name": "gris cosmique pol",
    "image_url": "https://au.abetlaminati.com/CAMPIONI/2905.jpg",
    "colors": ["gris"],
    "interior": true,
    "exterior": false,
  },
  {
    "abet_order": 314,
    "code": "2909",
    "name": "gris graphite pol",
    "image_url": "https://au.abetlaminati.com/CAMPIONI/2909.jpg",
    "colors": ["gris"],
    "interior": true,
    "exterior": false,
  },
  {
    "abet_order": 315,
    "code": "1928",
    "name": "urbano",
    "image_url": "https://au.abetlaminati.com/CAMPIONI/1928.jpg",
    "colors": ["gris"],
    "interior": true,
    "exterior": true,
  },
  {
    "abet_order": 316,
    "code": "1921",
    "name": "venere",
    "image_url": "https://au.abetlaminati.com/CAMPIONI/1921.jpg",
    "colors": [],
    "interior": true,
    "exterior": true,
  },
  {
    "abet_order": 317,
    "code": "1927",
    "name": "mercurio",
    "image_url": "https://au.abetlaminati.com/CAMPIONI/1927.jpg",
    "colors": ["gris"],
    "interior": true,
    "exterior": true,
  },
  {
    "abet_order": 318,
    "code": "6197",
    "name": "d pink",
    "image_url": "https://au.abetlaminati.com/CAMPIONI/6197.jpg",
    "colors": ["rose"],
    "interior": true,
    "exterior": false,
  },
]

// Color mapping for finish matching
const colorMap = {
  'beige': ['beige', 'blanc', 'naturel'],
  'blanc': ['blanc', 'white', 'naturel'],
  'gris': ['gris', 'graphite', 'urbano', 'mercurio'],
  'noir': ['noir', 'black', 'graphite'],
  'rose': ['rose', 'pink'],
}

// Upload image from URL to Sanity
async function uploadImageFromUrl(imageUrl) {
  try {
    console.log(`  Uploading image from: ${imageUrl}`)
    const response = await fetch(imageUrl)
    if (!response.ok) {
      console.warn(`  ⚠ Failed to fetch image: ${response.statusText}`)
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
    console.error(`  ✗ Error uploading image:`, error.message)
    return null
  }
}

// Find matching decor image based on finish name/code/color
function findMatchingDecor(finishName, finishCode, finishColor) {
  const finishNameLower = finishName.toLowerCase()
  const finishCodeLower = finishCode.toLowerCase()
  
  // Try to match by color first
  if (finishColor) {
    const colorKeywords = colorMap[finishColor.toLowerCase()] || [finishColor.toLowerCase()]
    for (const decor of decorData) {
      const decorColors = decor.colors || []
      if (decorColors.some(c => colorKeywords.some(k => c.toLowerCase().includes(k)))) {
        return decor
      }
    }
  }
  
  // Try to match by name keywords
  const nameKeywords = finishNameLower.split(/\s+/)
  for (const decor of decorData) {
    const decorNameLower = decor.name.toLowerCase()
    if (nameKeywords.some(k => decorNameLower.includes(k))) {
      return decor
    }
  }
  
  // Try to match by code similarity
  for (const decor of decorData) {
    if (decor.code && finishCodeLower.includes(decor.code.substring(0, 2))) {
      return decor
    }
  }
  
  // Return random decor as fallback
  return decorData[Math.floor(Math.random() * decorData.length)]
}

// Generate finishes for a product with images
async function generateFinishesWithImages(productName, productType) {
  const finishNames = [
    'Naturel',
    'Blanc',
    'Gris',
    'Noir',
    'Beige',
    'Bois clair',
    'Bois foncé',
    'Béton',
  ]
  
  const finishCodes = [
    'NAT',
    'BL',
    'GR',
    'NO',
    'BE',
    'BC',
    'BF',
    'BT',
  ]
  
  const colorNames = [
    'beige',
    'blanc',
    'gris',
    'noir',
  ]
  
  const colors = [
    '#f5f5dc', // beige
    '#ffffff', // blanc
    '#808080', // gris
    '#000000', // noir
  ]
  
  // Generate 4 unique finishes
  const selectedIndices = []
  while (selectedIndices.length < 4) {
    const index = Math.floor(Math.random() * finishNames.length)
    if (!selectedIndices.includes(index)) {
      selectedIndices.push(index)
    }
  }
  
  const finishes = []
  
  for (let i = 0; i < selectedIndices.length; i++) {
    const index = selectedIndices[i]
    const finishName = `${finishNames[index]} ${productName}`
    const finishCode = `${finishCodes[index]}-${productType.substring(0, 3).toUpperCase()}`
    const finishColor = colorNames[i % colorNames.length]
    
    // Find matching decor
    const matchingDecor = findMatchingDecor(finishName, finishCode, finishColor)
    
    // Upload image
    let imageAsset = null
    if (matchingDecor?.image_url) {
      imageAsset = await uploadImageFromUrl(matchingDecor.image_url)
    }
    
    const finish = {
      _key: `finish-${i + 1}`,
      _type: 'object',
      name: finishName,
      code: finishCode,
      color: colors[i % colors.length],
      order: i,
    }
    
    if (imageAsset) {
      finish.image = imageAsset
      finish.image_url = matchingDecor.image_url
    }
    
    finishes.push(finish)
  }
  
  return finishes
}

async function seedFinishes() {
  console.log('\n=== Seeding Finishes for Products ===\n')
  
  try {
    // Fetch all interior products
    console.log('Fetching interior products...')
    const interiorProducts = await client.fetch(
      `*[_type == "interiorProduct"] { _id, name, slug }`
    )
    console.log(`Found ${interiorProducts.length} interior products`)
    
    // Fetch all exterior products
    console.log('Fetching exterior products...')
    const exteriorProducts = await client.fetch(
      `*[_type == "exteriorProduct"] { _id, name, slug }`
    )
    console.log(`Found ${exteriorProducts.length} exterior products`)
    
    const allProducts = [
      ...interiorProducts.map(p => ({ ...p, type: 'interior' })),
      ...exteriorProducts.map(p => ({ ...p, type: 'exterior' })),
    ]
    
    console.log(`\nTotal products to process: ${allProducts.length}\n`)
    
    let successCount = 0
    let errorCount = 0
    let skippedCount = 0
    
    for (const product of allProducts) {
      try {
        // Check if product already has finishes
        const productWithFinishes = await client.fetch(
          `*[_type == "${product.type === 'interior' ? 'interiorProduct' : 'exteriorProduct'}" && _id == $id][0] { finishes }`,
          { id: product._id }
        )
        
        // Get full product data with finishes
        const fullProduct = await client.fetch(
          `*[_type == "${product.type === 'interior' ? 'interiorProduct' : 'exteriorProduct'}" && _id == $id][0] { finishes }`,
          { id: product._id }
        )
        
        let finishes = fullProduct?.finishes || []
        
        if (finishes.length === 0) {
          // Generate new finishes if none exist
          console.log(`Processing: ${product.name} (${product.type})`)
          finishes = await generateFinishesWithImages(product.name, product.type)
          console.log(`  Adding ${finishes.length} finishes:`, finishes.map(f => f.code).join(', '))
        } else {
          // Update existing finishes with images
          console.log(`Processing: ${product.name} (${product.type})`)
          console.log(`  Found ${finishes.length} existing finishes, adding images...`)
          
          const updatedFinishes = []
          for (let i = 0; i < finishes.length; i++) {
            const finish = finishes[i]
            
            // Skip if already has image
            if (finish.image || finish.image_url) {
              console.log(`    Finish ${finish.code}: already has image, skipping`)
              updatedFinishes.push(finish)
              continue
            }
            
            // Find matching decor and upload image
            const matchingDecor = findMatchingDecor(finish.name || '', finish.code || '', finish.color || '')
            
            if (matchingDecor?.image_url) {
              console.log(`    Finish ${finish.code}: uploading image from ${matchingDecor.name}`)
              const imageAsset = await uploadImageFromUrl(matchingDecor.image_url)
              
              if (imageAsset) {
                updatedFinishes.push({
                  ...finish,
                  image: imageAsset,
                  image_url: matchingDecor.image_url,
                })
                console.log(`      ✓ Image uploaded successfully`)
              } else {
                updatedFinishes.push(finish)
                console.log(`      ⚠ Failed to upload image`)
              }
            } else {
              updatedFinishes.push(finish)
              console.log(`      ⚠ No matching decor found`)
            }
          }
          
          finishes = updatedFinishes
        }
        
        // Update the product with finishes
        await client
          .patch(product._id)
          .set({ finishes })
          .commit()
        
        console.log(`  ✓ Successfully updated finishes with images\n`)
        successCount++
      } catch (error) {
        console.error(`  ✗ Error processing ${product.name}:`, error.message)
        errorCount++
      }
    }
    
    console.log('\n=== Seeding Complete ===')
    console.log(`Success: ${successCount}`)
    console.log(`Skipped: ${skippedCount}`)
    console.log(`Errors: ${errorCount}`)
    console.log(`Total: ${allProducts.length}`)
  } catch (error) {
    console.error('Fatal error:', error.message)
    console.error(error)
  }
}

// Run the seeding
seedFinishes().catch(console.error)

