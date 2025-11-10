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
  token: process.env.SANITY_API_TOKEN || 'skFlzXO1THyGKn67Pletsy5t6UgzHDWmeLezWQvLdGRmbJXxGAUauOkdG0xEnskbnubQBSKurlRc41YdekGJeJ6WOkSgq9Imbo4bJVt4VZDX2oAs0vmBBVsytypXhgVjkUxwfeLu1tt2P2h3eMrP8UxmHF06Cpkh9bXVAjDzaJRZsrDGQfbk',
})

// Mockup data for text sections based on secteur type
const textSectionData = {
  'education': {
    mainText: 'Solutions sur mesure pour chaque application éducative',
    description: 'Des matériaux adaptés aux exigences spécifiques des établissements scolaires, alliant performance technique et esthétique contemporaine pour créer des espaces d\'apprentissage inspirants.'
  },
  'sante': {
    mainText: 'Solutions sur mesure pour chaque application de santé',
    description: 'Des matériaux adaptés aux exigences spécifiques des établissements de santé, alliant performance technique et esthétique contemporaine pour créer des espaces de soins optimaux.'
  },
  'tertiaire': {
    mainText: 'Solutions sur mesure pour chaque application tertiaire',
    description: 'Des matériaux adaptés aux exigences spécifiques des espaces de bureau et commerciaux, alliant performance technique et esthétique contemporaine pour créer des environnements de travail modernes.'
  },
  // Default fallback data
  'default': {
    mainText: 'Solutions sur mesure pour chaque application',
    description: 'Des matériaux adaptés aux exigences spécifiques de votre secteur, alliant performance technique et esthétique contemporaine.'
  }
}

// Get secteur type from title or slug
function getSecteurType(secteur) {
  const title = (secteur.title || '').toLowerCase()
  const slug = (secteur.slug?.current || '').toLowerCase()
  
  if (title.includes('éducation') || title.includes('education') || slug.includes('education')) {
    return 'education'
  }
  if (title.includes('santé') || title.includes('sante') || title.includes('sant') || slug.includes('sante')) {
    return 'sante'
  }
  if (title.includes('tertiaire') || slug.includes('tertiaire')) {
    return 'tertiaire'
  }
  
  return 'default'
}

async function seedApplicationsTextSections() {
  console.log('\n=== Seeding Text Sections for Application Items ===\n')
  
  try {
    // Fetch all secteurs with their sections
    console.log('Fetching secteurs with sections...')
    const secteurs = await client.fetch(
      `*[_type == "secteur"] {
        _id,
        title,
        slug,
        sections[]{
          _key,
          type,
          title,
          items[]{
            _key,
            title,
            subtitle,
            description,
            textSection,
            features,
            image
          }
        }
      }`
    )
    console.log(`Found ${secteurs.length} secteurs\n`)
    
    if (secteurs.length === 0) {
      console.log('No secteurs found. Please create secteurs first.')
      return
    }
    
    let successCount = 0
    let errorCount = 0
    let skippedCount = 0
    let totalItems = 0
    
    for (const secteur of secteurs) {
      try {
        const secteurType = getSecteurType(secteur)
        const textSection = textSectionData[secteurType] || textSectionData.default
        
        console.log(`Processing: ${secteur.title} (type: ${secteurType})`)
        
        if (!secteur.sections || secteur.sections.length === 0) {
          console.log(`  No sections found, skipping\n`)
          continue
        }
        
        // Process each section
        const updatedSections = secteur.sections.map((section) => {
          if (section.type !== 'applications') {
            return section
          }
          
          // Process each item in the section
          const updatedItems = (section.items || []).map((item) => {
            totalItems++
            
            // Check if item already has textSection
            if (item.textSection?.mainText) {
              console.log(`  Item "${item.title}": already has textSection, skipping`)
              skippedCount++
              return item
            }
            
            console.log(`  Item "${item.title}": adding textSection`)
            successCount++
            
            return {
              ...item,
              textSection: {
                mainText: textSection.mainText,
                description: textSection.description
              }
            }
          })
          
          return {
            ...section,
            items: updatedItems
          }
        })
        
        // Update the secteur with updated sections
        await client
          .patch(secteur._id)
          .set({ sections: updatedSections })
          .commit()
        
        console.log(`  ✓ Successfully updated application items\n`)
      } catch (error) {
        console.error(`  ✗ Error processing ${secteur.title}:`, error.message)
        errorCount++
      }
    }
    
    console.log('\n=== Seeding Complete ===')
    console.log(`Success: ${successCount} items updated`)
    console.log(`Skipped: ${skippedCount} items (already had textSection)`)
    console.log(`Errors: ${errorCount}`)
    console.log(`Total items processed: ${totalItems}`)
  } catch (error) {
    console.error('Fatal error:', error.message)
    console.error(error)
  }
}

// Run the seeding
seedApplicationsTextSections().catch(console.error)

