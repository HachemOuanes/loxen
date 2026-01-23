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
  token: process.env.SANITY_API_TOKEN || 'skFlzXO1THyGKn67Pletsy5t6UgzHDWmeLezWQvLdGRmbJXxGAUauOkdG0xEnskbnubQBSKurlRc41YdekGJeJ6WOkSgq9Imbo4bJVt4VZDX2oAs0vmBBVsytypXhgVjkUxwfeLu1tt2P2h3eMrP8UxmHF06Cpkh9bXVAjDzaJRZsrDGQfbk',
})

// Customization section data
const customizationSectionData = {
  title: "Conceptions personnalisées avec Abet Digital",
  mainText: "Avec Abet Digital, vous pouvez personnaliser n'importe quelle surface avec des graphiques, des images ou des éléments visuels uniques qui reflètent l'identité de votre projet.",
  secondaryText: "L'impression numérique permet de personnaliser les surfaces et donc de créer des espaces idéaux. Une gamme variée de solutions différentes, du dessin à la texture de surface, offrant une flexibilité maximale dans la réalisation pour obtenir une touche esthétique originale.",
  ctaText: "Découvrez Abet Digital",
  ctaLink: "/produits"
}

// Products section data
const productsSectionData = {
  title: "Produits",
  subtitle: "Produits",
  description: "Découvrez notre gamme complète de solutions pour vos projets d'aménagement intérieur et extérieur."
}

// Contact section data
const contactSectionData = {
  title: "projet",
  description: "Besoin d'un conseil personnalisé pour votre projet ? Nos équipes vous accompagnent dans le choix des matériaux et la mise en œuvre.",
  ctaText: "Nous contacter",
  ctaLink: "/#contact"
}

// Helper function to upload image to Sanity
async function uploadImageToSanity(imagePath) {
  try {
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
    console.error(`Error uploading image ${imagePath}:`, error.message)
    return null
  }
}

// Helper function to get products for seeding
async function getProductsForSeeding() {
  try {
    // Fetch first 3 interior and 3 exterior products
    const [interiorProducts, exteriorProducts] = await Promise.all([
      client.fetch(`*[_type == "interiorProduct"] | order(order asc) [0...3] { _id, _type }`),
      client.fetch(`*[_type == "exteriorProduct"] | order(order asc) [0...3] { _id, _type }`)
    ])
    
    const products = [
      ...(interiorProducts || []).map(p => ({
        productType: 'interior',
        product: {
          _type: 'reference',
          _ref: p._id,
        }
      })),
      ...(exteriorProducts || []).map(p => ({
        productType: 'exterior',
        product: {
          _type: 'reference',
          _ref: p._id,
        }
      }))
    ].slice(0, 6)
    
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

async function seedCustomizationAndProductsSections() {
  console.log('\n=== Seeding Customization, Products, and Contact Sections for Secteurs ===\n')
  
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
    
    // Upload customization image
    const imagePath = path.join(__dirname, '..', 'public', 'modern-architectural-facade-panels-meg-system-high.jpg')
    let customizationImage = null
    
    if (fs.existsSync(imagePath)) {
      console.log('Uploading customization image...')
      customizationImage = await uploadImageToSanity(imagePath)
      if (customizationImage) {
        console.log('  ✓ Image uploaded successfully\n')
      }
    } else {
      console.log('  ⚠ Customization image not found, skipping image upload\n')
    }
    
    // Get products for seeding
    console.log('Fetching products for products section...')
    const products = await getProductsForSeeding()
    console.log(`  ✓ Found ${products.length} products\n`)
    
    let successCount = 0
    let errorCount = 0
    let skippedCount = 0
    
    for (const secteur of secteurs) {
      try {
        // Check if secteur already has these sections
        const existingSecteur = await client.fetch(
          `*[_type == "secteur" && _id == $id][0] { customizationSection, productsSection, contactSection }`,
          { id: secteur._id }
        )
        
        const hasCustomization = !!existingSecteur?.customizationSection
        const hasProducts = !!existingSecteur?.productsSection
        const hasContact = !!existingSecteur?.contactSection?.ctaText
        
        if (hasCustomization && hasProducts && hasContact) {
          console.log(`Skipping ${secteur.title}: already has customization, products, and contact sections`)
          skippedCount++
          continue
        }
        
        console.log(`Processing: ${secteur.title}`)
        
        // Prepare customization section
        const customizationSection = {
          ...customizationSectionData,
          image: customizationImage || undefined
        }
        
        // Prepare products section
        const productsSection = {
          ...productsSectionData,
          products: products
        }
        
        // Prepare contact section
        const contactSection = {
          ...contactSectionData
        }
        
        // Update the secteur
        const updates = {}
        
        if (!existingSecteur?.customizationSection) {
          updates.customizationSection = customizationSection
          console.log(`  ✓ Added customization section`)
        }
        
        if (!existingSecteur?.productsSection) {
          updates.productsSection = productsSection
          console.log(`  ✓ Added products section`)
        }
        
        if (!hasContact) {
          updates.contactSection = contactSection
          console.log(`  ✓ Added contact section`)
        }
        
        if (Object.keys(updates).length > 0) {
          await client
            .patch(secteur._id)
            .set(updates)
            .commit()
        }
        
        console.log(`  ✓ Successfully updated ${secteur.title}\n`)
        successCount++
      } catch (error) {
        console.error(`  ✗ Error updating ${secteur.title}:`, error.message)
        errorCount++
      }
    }
    
    console.log('\n=== Seeding Complete ===')
    console.log(`✓ Success: ${successCount}`)
    console.log(`⚠ Skipped: ${skippedCount}`)
    console.log(`✗ Errors: ${errorCount}\n`)
    
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

// Run the seeding
seedCustomizationAndProductsSections()
  .then(() => {
    console.log('Seeding completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Seeding failed:', error)
    process.exit(1)
  })

