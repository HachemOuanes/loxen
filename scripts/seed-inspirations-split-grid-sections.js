import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'fs'
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
  token: process.env.SANITY_API_TOKEN,
})

// Helper function to upload image to Sanity
async function uploadImageToSanity(imagePath) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.error(`  ⚠ Image not found: ${imagePath}`)
      return null
    }

    const imageBuffer = fs.readFileSync(imagePath)
    const filename = path.basename(imagePath)
    
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    })
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.error(`  ❌ Error uploading image ${imagePath}:`, error.message)
    return null
  }
}

// Split section data
const splitSectionData = {
  topText: {
    title: "Excellence architecturale",
    subtitle: "Détails",
    description: "Chaque projet est une opportunité de créer quelque chose d'unique, où l'innovation rencontre la tradition pour donner vie à des espaces exceptionnels."
  }
}

// Grid section data
const gridSectionData = {
  text: {
    title: "Innovation et savoir-faire",
    subtitle: "Expertise",
    description: "Notre approche combine les dernières technologies avec un savoir-faire artisanal, garantissant des résultats qui dépassent les attentes."
  }
}

async function seedSplitAndGridSections() {
  console.log('\n=== Seeding Split and Grid Sections for Inspirations ===\n')
  
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN is not set in .env.local')
    process.exit(1)
  }

  try {
    // Fetch all inspirations
    console.log('Fetching inspirations...')
    const inspirations = await client.fetch(
      `*[_type == "inspiration"] { _id, title, slug }`
    )
    console.log(`Found ${inspirations.length} inspirations\n`)
    
    if (inspirations.length === 0) {
      console.log('No inspirations found.')
      return
    }

    // Select images from public folder
    const publicPath = path.join(__dirname, '..', 'public')
    
    // Images for split section (top and bottom)
    const splitTopImages = [
      'modern-architectural-facade-panels-meg-system-high.jpg',
      'luxury-glass-facade-modern-architecture.jpg',
      'premium-glass-facade-architecture-4k.jpg',
      'modern-facade-architecture-premium-building.jpg'
    ]
    
    const splitBottomImages = [
      'contemporary-composite-facade-panels-copanel-moder.jpg',
      'modern-glass-facade-building-architecture-premium.jpg',
      'ultra-high-quality-facade-architecture-4k.jpg',
      'natural-modern-facade-architecture-4k.jpg'
    ]

    // Images for grid section (need 3 images per inspiration)
    const gridImages = [
      'modern-building-curtain-wall-facade.png',
      'modern-corporate-glass-tower-facade.png',
      'modern-office-campus-curtain-wall.png',
      'modern-residential-building-aluminium-facade.png',
      'stunning-modern-glass-building-facade-architectura.png',
      'modern-glass-building-facade-inspiration.png',
      'modern-glass-facade-building-architecture-black-an.png',
      'modern-glass-facade-building-architecture-premium.jpg',
      'premium-minimalist-facade-clean.jpg',
      'simple-monotone-facade-architecture.jpg',
      'sophisticated-ventilated-facade-system-performance.jpg',
      'ventilated-facade-system-modern-building.jpg'
    ]

    // Upload images
    console.log('Uploading images...')
    const uploadedSplitTopImages = []
    const uploadedSplitBottomImages = []
    const uploadedGridImages = []

    for (const img of splitTopImages.slice(0, inspirations.length)) {
      const imgPath = path.join(publicPath, img)
      const uploaded = await uploadImageToSanity(imgPath)
      if (uploaded) {
        uploadedSplitTopImages.push(uploaded)
        console.log(`  ✓ Uploaded: ${img}`)
      }
    }

    for (const img of splitBottomImages.slice(0, inspirations.length)) {
      const imgPath = path.join(publicPath, img)
      const uploaded = await uploadImageToSanity(imgPath)
      if (uploaded) {
        uploadedSplitBottomImages.push(uploaded)
        console.log(`  ✓ Uploaded: ${img}`)
      }
    }

    // Upload enough grid images (3 per inspiration)
    const totalGridImagesNeeded = inspirations.length * 3
    for (let i = 0; i < totalGridImagesNeeded && i < gridImages.length; i++) {
      const img = gridImages[i]
      const imgPath = path.join(publicPath, img)
      const uploaded = await uploadImageToSanity(imgPath)
      if (uploaded) {
        uploadedGridImages.push(uploaded)
        console.log(`  ✓ Uploaded: ${img}`)
      }
    }

    console.log(`\nUploaded ${uploadedSplitTopImages.length} top images, ${uploadedSplitBottomImages.length} bottom images, ${uploadedGridImages.length} grid images\n`)

    let successCount = 0
    let skippedCount = 0
    let errorCount = 0

    for (let i = 0; i < inspirations.length; i++) {
      const inspiration = inspirations[i]
      try {
        console.log(`Processing: ${inspiration.title || inspiration.slug?.current || inspiration._id}`)
        
        // Check if already has sections
        const existing = await client.fetch(
          `*[_type == "inspiration" && _id == $id][0] { splitSection, gridSection }`,
          { id: inspiration._id }
        )

        const hasSplit = !!existing?.splitSection
        const hasGrid = !!existing?.gridSection

        if (hasSplit && hasGrid) {
          console.log(`  ⚠ Already has split and grid sections\n`)
          skippedCount++
          continue
        }

        const updates = {}

        // Prepare split section
        if (!hasSplit && uploadedSplitTopImages[i] && uploadedSplitBottomImages[i]) {
          updates.splitSection = {
            topImage: uploadedSplitTopImages[i],
            topText: splitSectionData.topText,
            bottomImage: uploadedSplitBottomImages[i]
          }
          console.log(`  ✓ Prepared split section`)
        }

        // Prepare grid section (3 images per inspiration)
        if (!hasGrid) {
          const startIndex = i * 3
          const endIndex = startIndex + 3
          if (uploadedGridImages.length >= endIndex) {
            const gridImagesForInspiration = uploadedGridImages.slice(startIndex, endIndex)
            if (gridImagesForInspiration.length === 3) {
              updates.gridSection = {
                text: gridSectionData.text,
                images: gridImagesForInspiration
              }
              console.log(`  ✓ Prepared grid section with ${gridImagesForInspiration.length} images`)
            } else {
              console.log(`  ⚠ Not enough grid images (have ${gridImagesForInspiration.length}, need 3)`)
            }
          } else {
            console.log(`  ⚠ Not enough grid images uploaded (have ${uploadedGridImages.length}, need ${endIndex})`)
          }
        }

        if (Object.keys(updates).length > 0) {
          await client
            .patch(inspiration._id)
            .set(updates)
            .commit()
          console.log(`  ✅ Successfully updated\n`)
          successCount++
        } else {
          console.log(`  ⚠ No updates needed\n`)
          skippedCount++
        }

      } catch (error) {
        console.error(`  ❌ Error updating ${inspiration.title || inspiration._id}:`, error.message)
        errorCount++
      }
    }

    console.log('\n=== Seeding Complete ===')
    console.log(`✅ Success: ${successCount}`)
    console.log(`⚠ Skipped: ${skippedCount}`)
    console.log(`❌ Errors: ${errorCount}\n`)

  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

// Run the seeding
seedSplitAndGridSections()
  .then(() => {
    console.log('Seeding completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Seeding failed:', error)
    process.exit(1)
  })

