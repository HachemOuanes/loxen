/**
 * Seed script for products and applications
 * 
 * Setup:
 * 1. Create a .env.local file with:
 *    NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
 *    NEXT_PUBLIC_SANITY_DATASET=production
 *    SANITY_API_TOKEN=your_write_token
 * 
 * 2. Run: npx tsx scripts/seed-products-applications.ts
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve, join, dirname } from 'path'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
  console.error('❌ Missing required environment variables:')
  console.error('   - NEXT_PUBLIC_SANITY_PROJECT_ID')
  console.error('   - SANITY_API_TOKEN')
  console.error('\nPlease create a .env.local file with these variables.')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  requestTagPrefix: 'products-seed',
  timeout: 30000,
})

// Helper function to retry operations
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error: any) {
      if (i === maxRetries - 1) throw error
      if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
        console.log(`  ⚠️  Retry ${i + 1}/${maxRetries} after ${delay}ms...`)
        await new Promise(resolve => setTimeout(resolve, delay))
        delay *= 2 // Exponential backoff
      } else {
        throw error
      }
    }
  }
  throw new Error('Max retries exceeded')
}

// Helper function to upload image to Sanity
async function uploadImageToSanity(imagePath: string) {
  try {
    if (!existsSync(imagePath)) {
      console.error(`  ⚠️  Image not found: ${imagePath}`)
      return null
    }

    const imageBuffer = readFileSync(imagePath)
    const filename = imagePath.split(/[/\\]/).pop() || 'image.jpg'
    
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
  } catch (error: any) {
    console.error(`  ❌ Error uploading image ${imagePath}:`, error.message)
    return null
  }
}

// Sample products data
const productsData = [
  {
    slug: 'meg-standard',
    title: 'MEG Standard',
    type: 'exterieur',
    heroSection: {
      overviewLeftText: 'Système de façade ventilée haute performance pour l\'architecture moderne. Une solution innovante qui allie performance technique et esthétique contemporaine.',
      overviewRightText: 'Que ce soit pour une façade ventilée résidentielle ou un revêtement extérieur commercial, notre système MEG Standard combine des panneaux composites de haute qualité avec une structure renforcée pour créer des solutions de revêtement performantes et durables pour les projets architecturaux urbains.',
      contactCta: 'Explorer les décors',
    },
    showDecors: true,
    specificationSection: {
      caracteristiques: {
        title: 'Caractéristiques',
        items: [
          'Résistance au feu A2-s1, d0',
          'Stabilité dimensionnelle exceptionnelle',
          'Résistance aux intempéries',
          'Facilité d\'installation',
          'Maintenance minimale',
        ],
      },
      applications: {
        title: 'Applications',
        items: [
          'Façades ventilées',
          'Revêtements extérieurs',
          'Brise-soleil',
          'Panneaux décoratifs',
          'Architecture contemporaine',
        ],
      },
      format: {
        title: 'Format',
        items: [
          '3050 × 1300',
          '4200 × 1300',
          '4200 × 1610',
        ],
      },
      epaisseur: '6 - 8 - 10 - 12',
    },
    showcaseSection: {
      enabled: true,
      leftText: {
        subtitle: 'Innovation',
        title: 'Technologie avancée',
        description: 'Notre système MEG Standard combine performance technique et esthétique moderne pour répondre aux exigences les plus élevées de l\'architecture contemporaine.',
      },
      rightText: {
        subtitle: 'Performance',
        title: 'Durabilité exceptionnelle',
        description: 'Conçu pour résister aux conditions climatiques les plus exigeantes tout en conservant son aspect esthétique au fil des années.',
      },
      features: [
        { label: 'RÉSISTANT AU FEU' },
        { label: 'DURABLE' },
        { label: 'ÉCOLOGIQUE' },
        { label: 'FACILE À INSTALLER' },
        { label: 'MAINTENANCE MINIMALE' },
        { label: 'LARGE GAMME' },
      ],
    },
    characteristicsSection: {
      enabled: true,
      defaultImageAlt: 'Product characteristics',
      accordionItems: [
        {
          title: 'Résistance mécanique',
          description: 'Excellente résistance aux charges et aux contraintes',
          content: 'Le système MEG Standard offre une résistance mécanique exceptionnelle grâce à sa structure composite innovante. Les panneaux sont conçus pour supporter des charges importantes tout en conservant leur légèreté et leur facilité d\'installation.',
          imageAlt: 'Résistance mécanique',
        },
        {
          title: 'Isolation thermique',
          description: 'Performance énergétique optimale',
          content: 'Notre système de façade ventilée améliore significativement l\'isolation thermique des bâtiments, réduisant ainsi les coûts énergétiques et contribuant à un meilleur confort intérieur.',
          imageAlt: 'Isolation thermique',
        },
        {
          title: 'Protection contre les intempéries',
          description: 'Durabilité face aux éléments',
          content: 'Les panneaux MEG Standard sont spécialement conçus pour résister aux intempéries, aux UV, à l\'humidité et aux variations de température, garantissant une longévité exceptionnelle.',
          imageAlt: 'Protection contre les intempéries',
        },
        {
          title: 'Esthétique et design',
          description: 'Large gamme de finitions',
          content: 'Avec une variété de finitions, textures et couleurs, le système MEG Standard s\'adapte à tous les styles architecturaux, du contemporain au classique.',
          imageAlt: 'Esthétique et design',
        },
      ],
    },
    splitImagesSection: {
      enabled: true,
      title: 'Applications',
      images: [
        {
          leftText: {
            subtitle: 'Application',
            title: 'Architecture moderne',
            description: 'Le système MEG Standard s\'intègre parfaitement dans les projets d\'architecture contemporaine, offrant une esthétique épurée et moderne.',
          },
          rightText: {
            subtitle: 'Performance',
            title: 'Résultats exceptionnels',
            description: 'Nos clients bénéficient d\'un système de façade qui allie performance technique et qualité esthétique pour des résultats durables.',
          },
        },
        {
          leftText: {
            subtitle: 'Innovation',
            title: 'Technologie de pointe',
            description: 'Notre expertise technique nous permet d\'offrir des solutions sur mesure adaptées à chaque projet architectural.',
          },
          rightText: {
            subtitle: 'Qualité',
            title: 'Standards élevés',
            description: 'Tous nos produits respectent les normes les plus strictes en matière de qualité, de sécurité et d\'environnement.',
          },
        },
      ],
    },
    technicalDocumentsSection: {
      enabled: true,
      title: 'Technical Document',
      description: 'COPANEL allie la force du ciment à l\'élégance du design pour des façades durables, sûres et intemporelles. Fabriqué à base de ciment, les panneaux ont une excellente réaction au feu (masse combustible).',
      imageAlt: 'Technical Documents Cover',
      documents: [
        {
          title: 'Fiche technique MEG Standard',
          fileUrl: '#',
          fileType: 'PDF',
          downloadText: 'Télécharger',
        },
        {
          title: 'Guide d\'installation',
          fileUrl: '#',
          fileType: 'PDF',
          downloadText: 'Télécharger',
        },
        {
          title: 'Certificats de conformité',
          fileUrl: '#',
          fileType: 'ZIP',
          downloadText: 'Télécharger',
        },
        {
          title: 'Fichiers Revit',
          fileUrl: '#',
          fileType: 'RFA',
          downloadText: 'Télécharger',
        },
        {
          title: 'Bibliothèque de textures',
          fileUrl: '#',
          fileType: 'ZIP',
          downloadText: 'Télécharger',
        },
      ],
    },
    contactSection: {
      enabled: true,
      description: "Besoin d'un conseil personnalisé pour votre projet ? Nos équipes vous accompagnent dans le choix des matériaux et la mise en œuvre.",
      contactCta: 'Nous contacter',
    },
    images: {
      showcaseHero: '/contemporary-cultural-center-glass-facade-paris.png',
      characteristicsDefault: '/sophisticated-ventilated-facade-system-performance.jpg',
      characteristics1: '/modern-architectural-facade-panels-meg-system-high.jpg',
      characteristics2: '/contemporary-cultural-center-glass-facade-paris.png',
      characteristics3: '/luxury-glass-facade-modern-architecture.jpg',
      characteristics4: '/premium-glass-facade-architecture-4k.jpg',
      split1Left: '/luxury-glass-facade-modern-architecture.jpg',
      split1Right: '/contemporary-cultural-center-glass-facade-paris.png',
      split2Left: '/premium-glass-facade-architecture-4k.jpg',
      split2Right: '/modern-architectural-facade-panels-meg-system-high.jpg',
      technicalDoc: '/Abet-MEG-2025-COVER-846x1200.jpg',
    },
  },
  {
    slug: 'copanel-interieur',
    title: 'COPANEL Intérieur',
    type: 'interieur',
    heroSection: {
      overviewLeftText: 'Panneaux HPL haute performance pour applications intérieures. Une solution élégante et durable pour vos projets d\'aménagement intérieur.',
      overviewRightText: 'COPANEL Intérieur offre une large gamme de finitions et de textures pour répondre à tous vos besoins d\'aménagement, des bureaux aux espaces commerciaux.',
      contactCta: 'Explorer les décors',
    },
    showDecors: true,
    specificationSection: {
      caracteristiques: {
        title: 'Caractéristiques',
        items: [
          'Résistance aux rayures',
          'Facilité d\'entretien',
          'Large gamme de finitions',
          'Installation rapide',
          'Design moderne',
        ],
      },
      applications: {
        title: 'Applications',
        items: [
          'Revêtements muraux',
          'Mobilier',
          'Panneaux décoratifs',
          'Aménagement commercial',
          'Espaces de bureau',
        ],
      },
      format: {
        title: 'Format',
        items: [
          '3050 × 1300',
          '4200 × 1300',
        ],
      },
      epaisseur: '6 - 8 - 10',
    },
    showcaseSection: {
      enabled: true,
      leftText: {
        subtitle: 'Design',
        title: 'Esthétique moderne',
        description: 'COPANEL Intérieur offre des finitions élégantes qui s\'intègrent parfaitement dans tous les styles d\'aménagement.',
      },
      rightText: {
        subtitle: 'Performance',
        title: 'Durabilité garantie',
        description: 'Conçu pour résister à l\'usure quotidienne tout en conservant son aspect esthétique dans le temps.',
      },
      features: [
        { label: 'RÉSISTANT' },
        { label: 'FACILE À NETTOYER' },
        { label: 'LARGE GAMME' },
        { label: 'INSTALLATION RAPIDE' },
      ],
    },
    characteristicsSection: {
      enabled: true,
      defaultImageAlt: 'Product characteristics',
      accordionItems: [
        {
          title: 'Résistance',
          description: 'Haute résistance aux impacts et rayures',
          content: 'Les panneaux COPANEL Intérieur sont conçus pour résister aux contraintes de l\'environnement intérieur tout en conservant leur aspect esthétique.',
          imageAlt: 'Résistance',
        },
        {
          title: 'Entretien',
          description: 'Facilité d\'entretien et de maintenance',
          content: 'Les surfaces lisses et non poreuses facilitent l\'entretien et garantissent une hygiène optimale.',
          imageAlt: 'Entretien',
        },
      ],
    },
    splitImagesSection: {
      enabled: true,
      title: 'Applications',
      images: [
        {
          leftText: {
            subtitle: 'Usage',
            title: 'Applications intérieures',
            description: 'Idéal pour tous types d\'aménagements intérieurs, du résidentiel au commercial.',
          },
          rightText: {
            subtitle: 'Avantages',
            title: 'Performance et esthétique',
            description: 'Allie performance technique et qualité esthétique pour des résultats durables.',
          },
        },
      ],
    },
    technicalDocumentsSection: {
      enabled: true,
      title: 'Technical Document',
      description: 'Documentation technique complète pour COPANEL Intérieur.',
      imageAlt: 'Technical Documents Cover',
      documents: [
        {
          title: 'Fiche technique COPANEL Intérieur',
          fileUrl: '#',
          fileType: 'PDF',
          downloadText: 'Télécharger',
        },
      ],
    },
    contactSection: {
      enabled: true,
      description: "Besoin d'un conseil personnalisé pour votre projet ? Nos équipes vous accompagnent dans le choix des matériaux et la mise en œuvre.",
      contactCta: 'Nous contacter',
    },
    images: {
      showcaseHero: '/luxury-interior-office-glass-partitions.png',
      characteristicsDefault: '/luxury-interior-office-glass-partitions.png',
      characteristics1: '/luxury-interior-office-glass-partitions.png',
      characteristics2: '/luxury-interior-office-glass-partitions.png',
      split1Left: '/luxury-interior-office-glass-partitions.png',
      split1Right: '/luxury-interior-office-glass-partitions.png',
      technicalDoc: '/Abet-MEG-2025-COVER-846x1200.jpg',
    },
  },
]

// Sample applications data
const applicationsData = [
  {
    type: 'exterieur',
    applications: [
      {
        name: 'Façades ventilées',
        description: 'Systèmes de façade ventilée haute performance pour l\'architecture moderne.',
        order: 0,
        link: '/produits/meg-standard',
        products: [
          {
            name: 'MEG Standard',
            description: 'Système de façade ventilée haute performance',
            link: '/produits/meg-standard',
            order: 0,
          },
        ],
      },
      {
        name: 'Revêtements extérieurs',
        description: 'Panneaux de revêtement extérieur durables et esthétiques.',
        order: 1,
        link: '/produits',
        products: [
          {
            name: 'MEG Standard',
            description: 'Revêtement extérieur haute performance',
            link: '/produits/meg-standard',
            order: 0,
          },
        ],
      },
      {
        name: 'Brise-soleil',
        description: 'Solutions de protection solaire pour l\'architecture.',
        order: 2,
        link: '/produits',
        products: [],
      },
    ],
    images: {
      application1: '/modern-glass-facade-building-architecture-premium.jpg',
      application2: '/contemporary-cultural-center-glass-facade-paris.png',
      application3: '/luxury-glass-facade-modern-architecture.jpg',
    },
  },
  {
    type: 'interieur',
    applications: [
      {
        name: 'Revêtements muraux',
        description: 'Panneaux décoratifs pour revêtements muraux intérieurs.',
        order: 0,
        link: '/produits/copanel-interieur',
        products: [
          {
            name: 'COPANEL Intérieur',
            description: 'Panneaux HPL pour applications intérieures',
            link: '/produits/copanel-interieur',
            order: 0,
          },
        ],
      },
      {
        name: 'Mobilier',
        description: 'Panneaux pour mobilier et aménagement intérieur.',
        order: 1,
        link: '/produits',
        products: [
          {
            name: 'COPANEL Intérieur',
            description: 'Panneaux pour mobilier sur mesure',
            link: '/produits/copanel-interieur',
            order: 0,
          },
        ],
      },
      {
        name: 'Espaces commerciaux',
        description: 'Solutions pour l\'aménagement d\'espaces commerciaux et de bureaux.',
        order: 2,
        link: '/produits',
        products: [],
      },
    ],
    images: {
      application1: '/luxury-interior-office-glass-partitions.png',
      application2: '/luxury-interior-office-glass-partitions.png',
      application3: '/luxury-interior-office-glass-partitions.png',
    },
  },
]

async function seedProducts() {
  console.log('\n🌱 Seeding products...\n')
  const publicPath = join(__dirname, '..', 'public')

  for (const productData of productsData) {
    try {
      console.log(`📝 Processing product: ${productData.title}`)

      // Check if product already exists
      const existing = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]`,
        { slug: productData.slug }
      )

      // Upload images
      console.log('  📤 Uploading images...')
      const images: any = {}

      // Showcase hero image
      if (productData.images.showcaseHero) {
        const imagePath = join(publicPath, productData.images.showcaseHero.replace(/^\//, ''))
        images.showcaseHero = await uploadImageToSanity(imagePath)
        if (images.showcaseHero) console.log(`    ✓ Uploaded: ${productData.images.showcaseHero}`)
      }

      // Characteristics images
      if (productData.images.characteristicsDefault) {
        const imagePath = join(publicPath, productData.images.characteristicsDefault.replace(/^\//, ''))
        images.characteristicsDefault = await uploadImageToSanity(imagePath)
        if (images.characteristicsDefault) console.log(`    ✓ Uploaded: ${productData.images.characteristicsDefault}`)
      }

      // Accordion item images
      if (productData.characteristicsSection?.accordionItems) {
        const accordionImages = []
        for (let i = 0; i < productData.characteristicsSection.accordionItems.length; i++) {
          const imageKey = `characteristics${i + 1}` as keyof typeof productData.images
          if (productData.images[imageKey]) {
            const imagePath = join(publicPath, (productData.images[imageKey] as string).replace(/^\//, ''))
            const uploaded = await uploadImageToSanity(imagePath)
            if (uploaded) {
              accordionImages.push(uploaded)
              console.log(`    ✓ Uploaded accordion image ${i + 1}`)
            }
          }
        }
        images.accordionImages = accordionImages
      }

      // Split images
      if (productData.splitImagesSection?.images) {
        const splitImages = []
        for (let i = 0; i < productData.splitImagesSection.images.length; i++) {
          const leftKey = `split${i + 1}Left` as keyof typeof productData.images
          const rightKey = `split${i + 1}Right` as keyof typeof productData.images
          const leftImage = productData.images[leftKey]
          const rightImage = productData.images[rightKey]
          
          if (leftImage) {
            const imagePath = join(publicPath, (leftImage as string).replace(/^\//, ''))
            const uploaded = await uploadImageToSanity(imagePath)
            if (uploaded) splitImages.push({ left: uploaded, right: null })
          }
          if (rightImage) {
            const imagePath = join(publicPath, (rightImage as string).replace(/^\//, ''))
            const uploaded = await uploadImageToSanity(imagePath)
            if (uploaded && splitImages[i]) {
              splitImages[i].right = uploaded
            } else if (uploaded) {
              splitImages.push({ left: null, right: uploaded })
            }
          }
        }
        images.splitImages = splitImages
      }

      // Technical document image
      if (productData.images.technicalDoc) {
        const imagePath = join(publicPath, productData.images.technicalDoc.replace(/^\//, ''))
        images.technicalDoc = await uploadImageToSanity(imagePath)
        if (images.technicalDoc) console.log(`    ✓ Uploaded: ${productData.images.technicalDoc}`)
      }

      // Build product document
      const productDoc: any = {
        _type: 'product',
        slug: {
          _type: 'slug',
          current: productData.slug,
        },
        title: productData.title,
        type: productData.type,
        heroSection: productData.heroSection,
        showDecors: productData.showDecors,
        specificationSection: productData.specificationSection,
        contactSection: productData.contactSection,
      }

      // Add showcase section with image
      if (productData.showcaseSection) {
        productDoc.showcaseSection = {
          ...productData.showcaseSection,
          heroImage: images.showcaseHero,
        }
      }

      // Add characteristics section with images
      if (productData.characteristicsSection) {
        productDoc.characteristicsSection = {
          ...productData.characteristicsSection,
          defaultImage: images.characteristicsDefault,
        }
        
        // Add images to accordion items
        if (images.accordionImages && productDoc.characteristicsSection.accordionItems) {
          productDoc.characteristicsSection.accordionItems = productDoc.characteristicsSection.accordionItems.map(
            (item: any, index: number) => ({
              ...item,
              image: images.accordionImages[index] || null,
            })
          )
        }
      }

      // Add split images section
      if (productData.splitImagesSection && images.splitImages) {
        productDoc.splitImagesSection = {
          ...productData.splitImagesSection,
          images: productData.splitImagesSection.images.map((img: any, index: number) => ({
            ...img,
            leftImage: images.splitImages[index]?.left || null,
            rightImage: images.splitImages[index]?.right || null,
          })),
        }
      }

      // Add technical documents section with image
      if (productData.technicalDocumentsSection) {
        productDoc.technicalDocumentsSection = {
          ...productData.technicalDocumentsSection,
          image: images.technicalDoc,
        }
      }

      // Create or update product
      if (existing) {
        console.log(`  📝 Updating existing product...`)
        await retryOperation(() =>
          client
            .patch(existing._id)
            .set(productDoc)
            .commit()
        )
        console.log(`  ✅ Updated: ${productData.title}`)
      } else {
        console.log(`  ✨ Creating new product...`)
        await retryOperation(() => client.create(productDoc))
        console.log(`  ✅ Created: ${productData.title}`)
      }
    } catch (error: any) {
      console.error(`  ❌ Error processing ${productData.title}:`, error.message)
    }
  }

  console.log('\n✅ Products seeding completed!\n')
}

async function seedApplications() {
  console.log('🌱 Seeding applications...\n')
  const publicPath = join(__dirname, '..', 'public')

  for (const appData of applicationsData) {
    const typeLabel = appData.type === 'interieur' ? 'Intérieur' : 'Extérieur'
    console.log(`📝 Processing ${typeLabel} applications...`)

    // Create individual application documents
    for (let i = 0; i < appData.applications.length; i++) {
      try {
        const appItem = appData.applications[i]
        console.log(`  📝 Processing: ${appItem.name}`)

        // Upload application image
        const imageKey = `application${i + 1}` as keyof typeof appData.images
        let uploadedImage = null
        
        if (appData.images[imageKey]) {
          console.log(`    📤 Uploading image...`)
          const imagePath = join(publicPath, (appData.images[imageKey] as string).replace(/^\//, ''))
          uploadedImage = await uploadImageToSanity(imagePath)
          if (uploadedImage) {
            console.log(`    ✓ Uploaded image`)
          }
        }

        // Find product references by slug
        const productReferences = []
        if (appItem.products && appItem.products.length > 0) {
          console.log(`    🔍 Finding product references...`)
          for (const productItem of appItem.products) {
            // Extract slug from link (e.g., '/produits/meg-standard' -> 'meg-standard')
            const slugMatch = productItem.link?.match(/\/produits\/([^\/]+)/)
            if (slugMatch) {
              const productSlug = slugMatch[1]
              const product = await client.fetch(
                `*[_type == "product" && slug.current == $slug][0]`,
                { slug: productSlug }
              )
              if (product) {
                productReferences.push({
                  _type: 'reference',
                  _ref: product._id,
                })
                console.log(`      ✓ Found product: ${product.title}`)
              } else {
                console.log(`      ⚠️  Product not found: ${productSlug}`)
              }
            }
          }
        }

        // Build application document
        const applicationDoc = {
          _type: 'application',
          type: appData.type,
          name: appItem.name,
          description: appItem.description,
          image: uploadedImage,
          order: appItem.order,
          link: appItem.link,
          products: productReferences,
        }

        // Check if application already exists by name
        const existing = await client.fetch(
          `*[_type == "application" && name == $name][0]`,
          { name: appItem.name }
        )

        if (existing) {
          console.log(`    📝 Updating existing application...`)
          await retryOperation(() =>
            client
              .patch(existing._id)
              .set(applicationDoc)
              .commit()
          )
          console.log(`    ✅ Updated: ${appItem.name}`)
        } else {
          console.log(`    ✨ Creating new application...`)
          await retryOperation(() => client.create(applicationDoc))
          console.log(`    ✅ Created: ${appItem.name}`)
        }
      } catch (error: any) {
        console.error(`    ❌ Error processing ${appData.applications[i].name}:`, error.message)
      }
    }
  }

  console.log('\n✅ Applications seeding completed!\n')
}

async function seedAll() {
  console.log('🚀 Starting products and applications seeding...\n')
  
  try {
    await seedProducts()
    await seedApplications()
    console.log('🎉 All seeding completed successfully!')
  } catch (error: any) {
    console.error('❌ Seeding failed:', error.message)
    process.exit(1)
  }
}

seedAll().catch(console.error)
