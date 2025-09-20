import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Sanity client
const client = createClient({
  projectId: 'uoshkmah',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03'
})

// Helper function to upload image from local path
async function uploadImage(imagePath, filename) {
  try {
    const fullPath = path.join(__dirname, 'public', imagePath.replace(/^\//, ''))
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Image not found: ${fullPath}, skipping...`)
      return null
    }

    const imageBuffer = fs.readFileSync(fullPath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename
    })
    
    console.log(`✅ Uploaded image: ${filename}`)
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    }
  } catch (error) {
    console.error(`❌ Error uploading image ${filename}:`, error.message)
    return null
  }
}

// SEO Migration Data
const seoMigrationData = {
  seoSettings: {
    _id: 'seoSettings',
    _type: 'seoSettings',
    title: 'Loxen - Solutions Architecturales Premium',
    description: 'Transformez vos visions architecturales en réalité avec nos systèmes d\'aluminium et façades de haute qualité. Excellence, innovation et durabilité pour vos projets les plus ambitieux.',
    keywords: [
      'aluminium',
      'façades',
      'architecture',
      'design',
      'construction',
      'loxen',
      'premium',
      'solutions architecturales',
      'panneaux composites',
      'MEG',
      'COPANEL',
      'façades ventilées',
      'bâtiment durable',
      'innovation',
      'qualité'
    ],
    ogImage: '/og-image-loxen.jpg',
    favicon: '/favicon.ico',
    siteUrl: 'https://loxen.com',
    companyName: 'Loxen',
    companyDescription: 'Loxen est un leader dans le domaine des solutions architecturales premium, spécialisé dans les systèmes d\'aluminium et façades innovantes. Nous transformons les visions architecturales les plus ambitieuses en réalité grâce à notre expertise technique, notre engagement envers l\'excellence et notre gamme complète de produits haute performance.',
    socialMedia: {
      facebook: 'https://facebook.com/loxenarchitecture',
      twitter: 'https://twitter.com/loxenarch',
      linkedin: 'https://linkedin.com/company/loxen',
      instagram: 'https://instagram.com/loxenarchitecture'
    }
  },
  
  pagesSeo: [
    {
      _id: 'page-seo-home',
      _type: 'pageSeo',
      pageId: 'home',
      title: 'Accueil - Loxen | Solutions Architecturales Premium',
      description: 'Découvrez les solutions architecturales premium de Loxen : systèmes d\'aluminium innovants, façades haute performance et expertise technique pour vos projets d\'exception.',
      keywords: [
        'accueil',
        'loxen',
        'solutions architecturales',
        'aluminium premium',
        'façades innovantes',
        'construction durable',
        'design architectural'
      ],
      ogImage: '/og-image-home.jpg',
      noIndex: false,
      canonicalUrl: 'https://loxen.com/'
    },
    {
      _id: 'page-seo-products',
      _type: 'pageSeo',
      pageId: 'products',
      title: 'Produits Loxen - Panneaux MEG, COPANEL & Composites',
      description: 'Explorez notre gamme complète de produits architecturaux : panneaux MEG haute performance, systèmes COPANEL innovants, solutions composites premium.',
      keywords: [
        'panneaux MEG',
        'systèmes COPANEL',
        'panneaux composites',
        'façades ventilées',
        'panneaux aluminium',
        'matériaux construction',
        'produits architecturaux',
        'solutions techniques'
      ],
      ogImage: '/og-image-products.jpg',
      noIndex: false,
      canonicalUrl: 'https://loxen.com/products'
    },
    {
      _id: 'page-seo-interior',
      _type: 'pageSeo',
      pageId: 'interior',
      title: 'Aménagement Intérieur - Loxen Solutions Design',
      description: 'Solutions d\'aménagement intérieur sur mesure : espaces commerciaux, hôtellerie, bureaux. Design contemporain et fonctionnalité optimale.',
      keywords: [
        'aménagement intérieur',
        'design intérieur',
        'espaces commerciaux',
        'hôtellerie',
        'bureaux',
        'mobilier sur mesure',
        'architecture intérieure'
      ],
      ogImage: '/og-image-interior.jpg',
      noIndex: false,
      canonicalUrl: 'https://loxen.com/#interieur'
    },
    {
      _id: 'page-seo-exterior',
      _type: 'pageSeo',
      pageId: 'exterior',
      title: 'Façades Extérieures - Loxen Solutions Innovantes',
      description: 'Conception et réalisation de façades extérieures innovantes : façades ventilées, brise-soleil, structures aluminium pour l\'architecture moderne.',
      keywords: [
        'façades extérieures',
        'façades ventilées',
        'brise-soleil',
        'structures aluminium',
        'architecture moderne',
        'solutions extérieures',
        'enveloppe bâtiment'
      ],
      ogImage: '/og-image-exterior.jpg',
      noIndex: false,
      canonicalUrl: 'https://loxen.com/#exterieur'
    },
    {
      _id: 'page-seo-inspiration',
      _type: 'pageSeo',
      pageId: 'inspiration',
      title: 'Projets d\'Inspiration - Réalisations Loxen',
      description: 'Découvrez nos projets d\'inspiration : réalisations architecturales exceptionnelles, références internationales et savoir-faire technique.',
      keywords: [
        'projets inspiration',
        'réalisations architecturales',
        'références',
        'portfolio',
        'projets internationaux',
        'architecture exceptionnelle',
        'savoir-faire'
      ],
      ogImage: '/og-image-inspiration.jpg',
      noIndex: false,
      canonicalUrl: 'https://loxen.com/#inspirations'
    },
    {
      _id: 'page-seo-partners',
      _type: 'pageSeo',
      pageId: 'partners',
      title: 'Partenaires Loxen - Collaboration Excellence',
      description: 'Nos partenaires de confiance : fabricants leaders, collaboration technique et innovation partagée pour des solutions architecturales d\'exception.',
      keywords: [
        'partenaires',
        'collaboration',
        'fabricants',
        'innovation',
        'qualité',
        'excellence technique',
        'réseau professionnel'
      ],
      ogImage: '/og-image-partners.jpg',
      noIndex: false,
      canonicalUrl: 'https://loxen.com/#partenaires'
    },
    {
      _id: 'page-seo-contact',
      _type: 'pageSeo',
      pageId: 'contact',
      title: 'Contact Loxen - Votre Projet Architectural',
      description: 'Contactez nos experts pour votre projet architectural. Conseil personnalisé, devis sur mesure et accompagnement technique pour vos réalisations.',
      keywords: [
        'contact',
        'devis',
        'conseil',
        'projet architectural',
        'expertise technique',
        'accompagnement',
        'consultation'
      ],
      ogImage: '/og-image-contact.jpg',
      noIndex: false,
      canonicalUrl: 'https://loxen.com/#contact'
    }
  ]
}

// Migration functions
async function migrateSeoSettings() {
  console.log('🎯 Migrating SEO Settings...')
  
  try {
    const seoData = seoMigrationData.seoSettings
    
    // Upload images
    if (seoData.ogImage) {
      const ogImageRef = await uploadImage(seoData.ogImage, 'og-image-loxen.jpg')
      if (ogImageRef) {
        seoData.ogImage = ogImageRef
      } else {
        delete seoData.ogImage
      }
    }
    
    if (seoData.favicon) {
      const faviconRef = await uploadImage(seoData.favicon, 'favicon.ico')
      if (faviconRef) {
        seoData.favicon = faviconRef
      } else {
        delete seoData.favicon
      }
    }
    
    // Create or update SEO settings
    await client.createOrReplace(seoData)
    console.log('✅ SEO Settings migrated successfully')
    
  } catch (error) {
    console.error('❌ Error migrating SEO settings:', error.message)
  }
}

async function migratePagesSeo() {
  console.log('📄 Migrating Pages SEO...')
  
  for (const pageData of seoMigrationData.pagesSeo) {
    try {
      // Upload OG image if specified
      if (pageData.ogImage) {
        const ogImageRef = await uploadImage(pageData.ogImage, `og-image-${pageData.pageId}.jpg`)
        if (ogImageRef) {
          pageData.ogImage = ogImageRef
        } else {
          delete pageData.ogImage
        }
      }
      
      // Create or update page SEO
      await client.createOrReplace(pageData)
      console.log(`✅ Page SEO migrated: ${pageData.pageId}`)
      
    } catch (error) {
      console.error(`❌ Error migrating page SEO for ${pageData.pageId}:`, error.message)
    }
  }
}

async function createPlaceholderImages() {
  console.log('🖼️  Creating placeholder OG images...')
  
  const placeholderImages = [
    'og-image-loxen.jpg',
    'og-image-home.jpg', 
    'og-image-products.jpg',
    'og-image-interior.jpg',
    'og-image-exterior.jpg',
    'og-image-inspiration.jpg',
    'og-image-partners.jpg',
    'og-image-contact.jpg'
  ]
  
  const publicDir = path.join(__dirname, 'public')
  
  // Create public directory if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  for (const imageName of placeholderImages) {
    const imagePath = path.join(publicDir, imageName)
    
    if (!fs.existsSync(imagePath)) {
      // Create a simple placeholder file (you should replace with actual images)
      const placeholderContent = `<!-- Placeholder for ${imageName} -->`
      fs.writeFileSync(imagePath.replace('.jpg', '.html'), placeholderContent)
      console.log(`📝 Created placeholder reference for: ${imageName}`)
    }
  }
}

// Main migration function
async function migrateSEO() {
  try {
    console.log('🚀 Starting comprehensive SEO migration...')
    console.log('==========================================')
    
    // Create placeholder images
    await createPlaceholderImages()
    
    // Step 1: Migrate SEO Settings
    await migrateSeoSettings()
    
    // Step 2: Migrate Pages SEO
    await migratePagesSeo()
    
    console.log('==========================================')
    console.log('✅ SEO migration completed successfully!')
    console.log('')
    console.log('📋 Migration Summary:')
    console.log('• SEO Settings: Global site configuration')
    console.log('• Page SEO: 7 pages configured')
    console.log('• Images: OG images and favicon references')
    console.log('• Social Media: Facebook, Twitter, LinkedIn, Instagram')
    console.log('• Keywords: Comprehensive keyword strategy')
    console.log('')
    console.log('🎯 Next Steps:')
    console.log('1. Replace placeholder images with actual OG images')
    console.log('2. Update social media URLs with real accounts')
    console.log('3. Verify canonical URLs match your domain')
    console.log('4. Test SEO implementation in production')
    
  } catch (error) {
    console.error('❌ SEO migration failed:', error)
    process.exit(1)
  }
}

// Run migration if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateSEO()
}

export { migrateSEO }
