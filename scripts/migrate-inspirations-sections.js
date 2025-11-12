import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uoshkmah',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
})

async function migrateInspirationsSections() {
  console.log('\n=== Migrating Inspirations Sections ===\n')
  
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN is not set in .env.local')
    process.exit(1)
  }

  try {
    // Fetch all inspirations with old sections structure
    console.log('Fetching inspirations with old sections structure...')
    const inspirations = await client.fetch(
      `*[_type == "inspiration"] {
        _id,
        title,
        slug,
        sections[]
      }`
    )
    
    console.log(`Found ${inspirations.length} inspirations\n`)
    
    if (inspirations.length === 0) {
      console.log('No inspirations found.')
      return
    }

    let migratedCount = 0
    let skippedCount = 0
    let errorCount = 0

    for (const inspiration of inspirations) {
      try {
        console.log(`Processing: ${inspiration.title || inspiration.slug?.current || inspiration._id}`)
        
        // Check if it has the old sections array
        if (!inspiration.sections || !Array.isArray(inspiration.sections) || inspiration.sections.length === 0) {
          console.log(`  ⚠ Skipping: No sections array found\n`)
          skippedCount++
          continue
        }

        // Extract applications and collage sections from the old structure
        let applicationsSection = null
        let collageSection = null

        for (const section of inspiration.sections) {
          if (section.type === 'applications') {
            applicationsSection = {
              title: section.title || '',
              items: section.items || []
            }
          } else if (section.type === 'collage') {
            collageSection = {
              images: section.images || [],
              tiles: section.tiles || []
            }
          }
        }

        // Check if already migrated (has new structure)
        const existing = await client.fetch(
          `*[_type == "inspiration" && _id == $id][0] {
            applicationsSection,
            collageSection,
            sections
          }`,
          { id: inspiration._id }
        )

        const hasNewStructure = existing?.applicationsSection || existing?.collageSection
        const hasOldStructure = existing?.sections && Array.isArray(existing.sections) && existing.sections.length > 0

        if (hasNewStructure && !hasOldStructure) {
          console.log(`  ✓ Already migrated to new structure\n`)
          skippedCount++
          continue
        }

        // Prepare updates
        const updates = {}
        
        if (applicationsSection && !existing?.applicationsSection) {
          updates.applicationsSection = applicationsSection
          console.log(`  ✓ Found applications section (${applicationsSection.items?.length || 0} items)`)
        }

        if (collageSection && !existing?.collageSection) {
          updates.collageSection = collageSection
          console.log(`  ✓ Found collage section (${collageSection.images?.length || 0} images, ${collageSection.tiles?.length || 0} tiles)`)
        }

        if (Object.keys(updates).length === 0) {
          console.log(`  ⚠ No sections to migrate\n`)
          skippedCount++
          continue
        }

        // Update the inspiration document
        const patch = client.patch(inspiration._id)
        
        // Set new fields
        if (updates.applicationsSection) {
          patch.set({ applicationsSection: updates.applicationsSection })
        }
        if (updates.collageSection) {
          patch.set({ collageSection: updates.collageSection })
        }

        // Remove old sections field if it exists
        if (hasOldStructure) {
          patch.unset(['sections'])
          console.log(`  ✓ Removing old sections field`)
        }

        await patch.commit()
        
        console.log(`  ✅ Successfully migrated\n`)
        migratedCount++

      } catch (error) {
        console.error(`  ❌ Error migrating ${inspiration.title || inspiration._id}:`, error.message)
        errorCount++
      }
    }

    console.log('\n=== Migration Complete ===')
    console.log(`✅ Migrated: ${migratedCount}`)
    console.log(`⚠ Skipped: ${skippedCount}`)
    console.log(`❌ Errors: ${errorCount}\n`)

  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

// Run the migration
migrateInspirationsSections()
  .then(() => {
    console.log('Migration completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Migration failed:', error)
    process.exit(1)
  })



