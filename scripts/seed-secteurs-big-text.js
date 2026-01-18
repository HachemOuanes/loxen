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

// Big text data for each secteur type
const bigTextData = {
  'education': {
    largeText: 'Solutions pour l\'éducation',
    smallText: 'Des systèmes innovants pour transformer vos visions en réalité architecturale. Nous proposons des solutions complètes adaptées aux besoins spécifiques des établissements scolaires.\n\nNotre expertise couvre tous les aspects de la construction éducative moderne, de la conception à la réalisation.'
  },
  'sante': {
    largeText: 'Solutions pour la santé',
    smallText: 'Des systèmes innovants pour transformer vos visions en réalité architecturale. Nous proposons des solutions complètes adaptées aux exigences strictes des établissements de santé.\n\nNotre expertise couvre tous les aspects de la construction médicale moderne, de la conception à la réalisation.'
  },
  'tertiaire': {
    largeText: 'Solutions pour le tertiaire',
    smallText: 'Des systèmes innovants pour transformer vos visions en réalité architecturale. Nous proposons des solutions complètes adaptées aux besoins spécifiques des espaces de bureau et commerciaux.\n\nNotre expertise couvre tous les aspects de la construction tertiaire moderne, de la conception à la réalisation.'
  },
  'default': {
    largeText: 'Solutions architecturales',
    smallText: 'Des systèmes innovants pour transformer vos visions en réalité architecturale. Nous proposons des solutions complètes adaptées à vos besoins spécifiques.\n\nNotre expertise couvre tous les aspects de la construction moderne, de la conception à la réalisation.'
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

async function seedBigTextSection() {
  console.log('\n=== Seeding Big Text Sections for Secteurs ===\n')
  
  try {
    // Fetch all secteurs
    console.log('Fetching secteurs...')
    const secteurs = await client.fetch(
      `*[_type == "secteur"] { _id, title, slug }`
    )
    console.log(`Found ${secteurs.length} secteurs\n`)
    
    if (secteurs.length === 0) {
      console.log('No secteurs found. Please create secteurs first.')
      return
    }
    
    let successCount = 0
    let errorCount = 0
    let skippedCount = 0
    
    for (const secteur of secteurs) {
      try {
        // Check if secteur already has bigTextSection
        const existingSecteur = await client.fetch(
          `*[_type == "secteur" && _id == $id][0] { bigTextSection }`,
          { id: secteur._id }
        )
        
        if (existingSecteur?.bigTextSection?.largeText) {
          console.log(`Skipping ${secteur.title}: already has bigTextSection`)
          skippedCount++
          continue
        }
        
        // Get the appropriate data based on secteur type
        const secteurType = getSecteurType(secteur)
        const bigText = bigTextData[secteurType] || bigTextData.default
        
        console.log(`Processing: ${secteur.title} (type: ${secteurType})`)
        console.log(`  Large Text: ${bigText.largeText}`)
        console.log(`  Small Text: ${bigText.smallText.substring(0, 50)}...`)
        
        // Update the secteur with bigTextSection
        await client
          .patch(secteur._id)
          .set({
            bigTextSection: {
              enabled: true,
              largeText: bigText.largeText,
              smallText: bigText.smallText
            }
          })
          .commit()
        
        console.log(`  ✓ Successfully updated bigTextSection\n`)
        successCount++
      } catch (error) {
        console.error(`  ✗ Error processing ${secteur.title}:`, error.message)
        errorCount++
      }
    }
    
    console.log('\n=== Seeding Complete ===')
    console.log(`Success: ${successCount}`)
    console.log(`Skipped: ${skippedCount}`)
    console.log(`Errors: ${errorCount}`)
    console.log(`Total: ${secteurs.length}`)
  } catch (error) {
    console.error('Fatal error:', error.message)
    console.error(error)
  }
}

// Run the seeding
seedBigTextSection().catch(console.error)
