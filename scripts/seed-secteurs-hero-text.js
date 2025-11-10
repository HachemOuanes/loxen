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

// Mockup data for each secteur type
const heroTextSectionsData = {
  'education': {
    section1: {
      mainText: 'Des solutions sur mesure pour chaque projet éducatif, alliant esthétique et performance.',
      description: 'Des solutions sur mesure pour chaque projet éducatif, alliant esthétique et performance. Des espaces d\'apprentissage modernes et durables conçus pour inspirer les générations futures.'
    },
    section2: {
      mainText: 'Innovation durable pour l\'éducation.',
      description: 'Matériaux de pointe respectueux de l\'environnement, pour une construction responsable. Des solutions adaptées aux besoins spécifiques des établissements scolaires.'
    },
    section3: {
      description: 'Plus de 20 ans d\'expérience au service de l\'architecture éducative contemporaine.'
    }
  },
  'sante': {
    section1: {
      mainText: 'Des solutions sur mesure pour chaque projet de santé, alliant esthétique et performance.',
      description: 'Des solutions sur mesure pour chaque projet de santé, alliant esthétique et performance. Des espaces de soins modernes et hygiéniques conçus pour le bien-être des patients et du personnel.'
    },
    section2: {
      mainText: 'Innovation durable pour la santé.',
      description: 'Matériaux de pointe respectueux de l\'environnement, pour une construction responsable. Des solutions adaptées aux exigences strictes des établissements de santé.'
    },
    section3: {
      description: 'Plus de 20 ans d\'expérience au service de l\'architecture médicale contemporaine.'
    }
  },
  'tertiaire': {
    section1: {
      mainText: 'Des solutions sur mesure pour chaque projet tertiaire, alliant esthétique et performance.',
      description: 'Des solutions sur mesure pour chaque projet tertiaire, alliant esthétique et performance. Des espaces de travail modernes et fonctionnels conçus pour optimiser la productivité.'
    },
    section2: {
      mainText: 'Innovation durable pour le tertiaire.',
      description: 'Matériaux de pointe respectueux de l\'environnement, pour une construction responsable. Des solutions adaptées aux besoins spécifiques des espaces de bureau et commerciaux.'
    },
    section3: {
      description: 'Plus de 20 ans d\'expérience au service de l\'architecture tertiaire contemporaine.'
    }
  },
  // Default fallback data
  'default': {
    section1: {
      mainText: 'Des solutions sur mesure pour chaque projet, alliant esthétique et performance.',
      description: 'Des solutions sur mesure pour chaque projet, alliant esthétique et performance. Des espaces modernes et durables conçus pour répondre à vos besoins spécifiques.'
    },
    section2: {
      mainText: 'Innovation durable.',
      description: 'Matériaux de pointe respectueux de l\'environnement, pour une construction responsable. Des solutions adaptées aux exigences de votre secteur.'
    },
    section3: {
      description: 'Plus de 20 ans d\'expérience au service de l\'architecture contemporaine.'
    }
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

async function seedSecteursHeroText() {
  console.log('\n=== Seeding Hero Text Sections for Secteurs ===\n')
  
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
        // Check if secteur already has heroTextSections
        const existingSecteur = await client.fetch(
          `*[_type == "secteur" && _id == $id][0] { heroTextSections }`,
          { id: secteur._id }
        )
        
        if (existingSecteur?.heroTextSections?.section1) {
          console.log(`Skipping ${secteur.title}: already has heroTextSections`)
          skippedCount++
          continue
        }
        
        // Get the appropriate data based on secteur type
        const secteurType = getSecteurType(secteur)
        const heroTextSections = heroTextSectionsData[secteurType] || heroTextSectionsData.default
        
        console.log(`Processing: ${secteur.title} (type: ${secteurType})`)
        console.log(`  Section 1: ${heroTextSections.section1.mainText.substring(0, 50)}...`)
        console.log(`  Section 2: ${heroTextSections.section2.mainText.substring(0, 50)}...`)
        console.log(`  Section 3: ${heroTextSections.section3.description.substring(0, 50)}...`)
        
        // Update the secteur with heroTextSections
        await client
          .patch(secteur._id)
          .set({ heroTextSections })
          .commit()
        
        console.log(`  ✓ Successfully updated heroTextSections\n`)
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
seedSecteursHeroText().catch(console.error)

