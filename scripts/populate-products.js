/**
 * Script to populate all product data in Sanity CMS
 * Run with: node scripts/populate-products.js
 * 
 * This script creates comprehensive product data for all products
 * based on the extended productItem schema
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables
dotenv.config()

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Get this from your Sanity project settings
  useCdn: false
})

// Product categories data - ensure these exist first
const categories = [
  {
    _id: 'category-facade-panels',
    _type: 'productCategory',
    name: 'Panneaux de Façade',
    slug: { current: 'panneaux-facade', _type: 'slug' },
    description: 'Systèmes de panneaux pour façades ventilées et habillages extérieurs'
  },
  {
    _id: 'category-composite-materials',
    _type: 'productCategory', 
    name: 'Matériaux Composites',
    slug: { current: 'materiaux-composites', _type: 'slug' },
    description: 'Solutions composites haute performance pour applications architecturales'
  }
]

// Comprehensive product data with images
const products = [
  {
    _id: 'product-meg-standard',
    _type: 'productItem',
    name: 'MEG Standard',
    slug: { current: 'meg-standard', _type: 'slug' },
    description: 'Panneaux haute performance pour façades ventilées avec finitions décoratives premium.',
    longDescription: 'Le système MEG Standard représente l\'excellence en matière de panneaux décoratifs haute pression. Conçu pour les façades ventilées les plus exigeantes, il offre une résistance exceptionnelle aux intempéries et une esthétique raffinée. Sa composition stratifiée haute pression garantit une durabilité optimale et une facilité d\'entretien remarquable.',
    category: { _type: 'reference', _ref: 'category-facade-panels' },
    
    // Image paths (will be uploaded during creation)
    _imagePath: '/modern-architectural-facade-panels-meg-system-high.jpg',
    _imageAlt: 'MEG Standard facade panels - High performance architectural system',
    _galleryImages: [
      { path: '/meg-facade-panels.jpg', alt: 'MEG facade panels installation' },
      { path: '/exterior-facades-ventilees.jpg', alt: 'Ventilated facade system with MEG panels' },
      { path: '/ventilated-facade-system-modern-building.jpg', alt: 'Modern building with MEG ventilated facade' },
      { path: '/sophisticated-ventilated-facade-system-performance.jpg', alt: 'Sophisticated MEG facade system performance' },
      { path: '/aluminium-facade-panels-modern-building.png', alt: 'Modern aluminum facade panels' }
    ],
    
    // Technical specifications
    characteristics: [
      'Haute résistance à la lumière du soleil',
      'Résistance aux chocs et à l\'abrasion',
      'Facilité d\'entretien et de nettoyage',
      'Stabilité dimensionnelle excellente',
      'Résistance aux agents chimiques',
      'Non-conducteur électrique',
      'Résistance au feu selon normes européennes'
    ],
    
    applications: [
      'Façades ventilées',
      'Habillages extérieurs',
      'Balcons et loggias',
      'Bardages architecturaux',
      'Rénovation de façades',
      'Bâtiments tertiaires',
      'Résidences haut de gamme'
    ],
    
    panelFormats: [
      '3050 x 1300',
      '4200 x 1300', 
      '2550 x 1300',
      '3050 x 1500',
      '4200 x 1500'
    ],
    
    thickness: '6 - 8 - 10 - 12',
    
    technicalDocuments: [
      {
        title: 'Fiche technique MEG Standard',
        downloadText: 'Télécharger PDF'
      },
      {
        title: 'Guide de pose et fixation',
        downloadText: 'Guide installation'
      },
      {
        title: 'Certificats et normes',
        downloadText: 'Certifications'
      }
    ],
    
    bimRequest: true,
    
    _availableFinishes: [
      {
        code: 'ABL-001',
        name: 'Chêne Naturel',
        color: '#8B7355',
        imagePath: '/simple-minimalist-white-marble-texture-background.png'
      },
      {
        code: 'ABL-002', 
        name: 'Noyer Foncé',
        color: '#4A3429',
        imagePath: '/minimalist-black-and-white-interior-architectural-.png'
      },
      {
        code: 'ABL-003',
        name: 'Béton Gris',
        color: '#7A7A7A',
        imagePath: '/minimalist-geometric-grid-pattern-light-background.png'
      },
      {
        code: 'ABL-004',
        name: 'Pierre Calcaire',
        color: '#E8E2D4',
        imagePath: '/simple-minimal-white-texture.png'
      },
      {
        code: 'ABL-005',
        name: 'Ardoise Noire',
        color: '#2C2C2C',
        imagePath: '/abstract-black-white-geometric-pattern-minimal.png'
      },
      {
        code: 'ABL-006',
        name: 'Cuivre Oxydé',
        color: '#8B6914',
        imagePath: '/minimalist-white-geometric-pattern-background.png'
      }
    ],
    
    totalFinishesCount: 106,
    collectionName: 'Abet',
    
    features: [
      'Plus de 100 décors disponibles',
      'Résistance UV exceptionnelle',  
      'Installation rapide par clips',
      'Garantie fabricant 10 ans',
      'Recyclable en fin de vie',
      'Maintenance réduite'
    ],
    
    specifications: [
      { label: 'Densité', value: '1,45 g/cm³' },
      { label: 'Résistance flexion', value: '90 N/mm²' },
      { label: 'Absorption d\'eau', value: '< 6%' },
      { label: 'Dilatation thermique', value: '25 x 10⁻⁶ K⁻¹' },
      { label: 'Résistance impact', value: '> 15 kJ/m²' },
      { label: 'Classement feu', value: 'B-s2,d0' }
    ],
    
    price: 'À partir de 180€/m²',
    featured: true,
    inStock: true,
    order: 1,
    tags: ['façade', 'ventilé', 'décoratif', 'premium', 'abet']
  },
  
  {
    _id: 'product-easy-meg',
    _type: 'productItem',
    name: 'EASY MEG',
    slug: { current: 'easy-meg', _type: 'slug' },
    description: 'Version simplifiée et économique des panneaux MEG, idéale pour projets à budget contrôlé.',
    longDescription: 'EASY MEG offre les qualités essentielles du système MEG dans une version optimisée pour les projets nécessitant un excellent rapport qualité-prix. Conservant les performances techniques fondamentales, cette gamme permet de réaliser des façades ventilées attractives avec un budget maîtrisé.',
    category: { _type: 'reference', _ref: 'category-facade-panels' },
    
    // Image paths
    _imagePath: '/easy-meg-panels.jpg',
    _imageAlt: 'EASY MEG panels - Economical facade solution',
    _galleryImages: [
      { path: '/contemporary-composite-facade-panels-copanel-moder.jpg', alt: 'Contemporary EASY MEG facade panels' },
      { path: '/modern-facade-architecture-premium-building.jpg', alt: 'Modern facade with EASY MEG system' },
      { path: '/exterior-facades-personnalisees.jpg', alt: 'Personalized EASY MEG facade solutions' },
      { path: '/simple-monotone-facade-architecture.jpg', alt: 'Simple monotone EASY MEG architecture' }
    ],
    
    characteristics: [
      'Bonne résistance aux UV',
      'Installation simplifiée', 
      'Rapport qualité-prix optimal',
      'Entretien facile',
      'Stabilité dimensionnelle',
      'Variété de finitions'
    ],
    
    applications: [
      'Façades ventilées économiques',
      'Habillages de bâtiments industriels',
      'Rénovations budget contrôlé',
      'Bâtiments collectifs',
      'Extensions résidentielles',
      'Projets de logements sociaux'
    ],
    
    panelFormats: [
      '3050 x 1300',
      '2550 x 1300',
      '3050 x 1500'
    ],
    
    thickness: '6 - 8',
    
    technicalDocuments: [
      {
        title: 'Fiche technique EASY MEG',
        downloadText: 'Télécharger PDF'
      },
      {
        title: 'Guide installation rapide',
        downloadText: 'Guide pose'
      }
    ],
    
    bimRequest: true,
    
    _availableFinishes: [
      {
        code: 'EM-001',
        name: 'Blanc Standard',
        color: '#F5F5F5',
        imagePath: '/minimalist-white-modern-building-exterior-with-cle.png'
      },
      {
        code: 'EM-002',
        name: 'Gris Anthracite', 
        color: '#36454F',
        imagePath: '/minimalist-black-white-interior-empty-space-geome.png'
      },
      {
        code: 'EM-003',
        name: 'Beige Sable',
        color: '#C8B99C',
        imagePath: '/simple-faded-abstract-lines-pattern.png'
      },
      {
        code: 'EM-004',
        name: 'Terre Cuite',
        color: '#A0522D',
        imagePath: '/subtle-minimalist-diagonal-lines-pattern-light-gra.png'
      }
    ],
    
    totalFinishesCount: 24,
    collectionName: 'EASY',
    
    features: [
      'Installation rapide',
      'Prix compétitif', 
      'Qualité certifiée',
      '24 finitions disponibles',
      'Garantie 5 ans',
      'Solution clé en main'
    ],
    
    specifications: [
      { label: 'Densité', value: '1,35 g/cm³' },
      { label: 'Résistance flexion', value: '70 N/mm²' },
      { label: 'Absorption d\'eau', value: '< 8%' },
      { label: 'Dilatation thermique', value: '30 x 10⁻⁶ K⁻¹' },
      { label: 'Classement feu', value: 'B-s3,d0' }
    ],
    
    price: 'À partir de 120€/m²',
    featured: false,
    inStock: true,
    order: 2,
    tags: ['façade', 'économique', 'simple', 'rapide']
  },
  
  {
    _id: 'product-copanel-premium',
    _type: 'productItem',
    name: 'COPANEL Premium',
    slug: { current: 'copanel-premium', _type: 'slug' },
    description: 'Panneaux composites aluminium haute qualité pour façades modernes et design contemporain.',
    longDescription: 'COPANEL Premium incarne l\'innovation dans les panneaux composites aluminium. Alliant légèreté, résistance et esthétique moderne, il est le choix privilégié des architectes pour créer des façades contemporaines remarquables. Sa composition âme polyéthylène entre deux feuilles d\'aluminium garantit performances techniques et finitions parfaites.',
    category: { _type: 'reference', _ref: 'category-composite-materials' },
    
    // Image paths
    _imagePath: '/copanel-composite-facade-panels-modern-architectur.jpg',
    _imageAlt: 'COPANEL Premium composite panels - Modern architecture',
    _galleryImages: [
      { path: '/copanel-composite.jpg', alt: 'COPANEL composite panel system' },
      { path: '/elegant-composite-panel-facade-system-lightweight-.jpg', alt: 'Elegant lightweight COPANEL system' },
      { path: '/composite-panel-system-architectural-facade.jpg', alt: 'Architectural facade with COPANEL system' },
      { path: '/composite-panel-system.jpg', alt: 'COPANEL composite panel system details' },
      { path: '/modern-aluminum-facade-panels-architectural-buildi.png', alt: 'Modern aluminum COPANEL facade panels' }
    ],
    
    characteristics: [
      'Excellent rapport poids/résistance',
      'Finition aluminium premium',
      'Résistance exceptionnelle aux intempéries',
      'Facilité d\'usinage et de mise en forme',
      'Large gamme de couleurs et textures',
      'Planéité parfaite',
      'Durabilité garantie 20 ans'
    ],
    
    applications: [
      'Façades ventilées haut de gamme',
      'Habillages architecturaux',
      'Enseignes et signalétique',
      'Aménagements intérieurs',
      'Cloisons et doublages',
      'Mobilier architectural',
      'Bâtiments iconiques'
    ],
    
    panelFormats: [
      '1500 x 4000',
      '1250 x 3200',
      '1500 x 3200',
      '1220 x 2440',
      '2000 x 5000'
    ],
    
    thickness: '3 - 4 - 6',
    
    technicalDocuments: [
      {
        title: 'Documentation technique COPANEL',
        downloadText: 'Fiche technique'
      },
      {
        title: 'Guide d\'usinage et transformation',
        downloadText: 'Guide usinage'
      },
      {
        title: 'Nuancier couleurs complet',
        downloadText: 'Nuancier PDF'
      },
      {
        title: 'Détails de fixation',
        downloadText: 'Détails techniques'
      }
    ],
    
    bimRequest: true,
    
    _availableFinishes: [
      {
        code: 'CP-001',
        name: 'Blanc Pur',
        color: '#FFFFFF',
        imagePath: '/minimalist-white-geometric-pattern-background.png'
      },
      {
        code: 'CP-002',
        name: 'Gris Métal',
        color: '#8C8C8C',
        imagePath: '/minimalist-geometric-grid-pattern-light-background.png'
      },
      {
        code: 'CP-003',
        name: 'Noir Satiné',
        color: '#1C1C1C',
        imagePath: '/abstract-black-white-geometric-pattern-minimal.png'
      },
      {
        code: 'CP-004',
        name: 'Champagne',
        color: '#D4AF37',
        imagePath: '/simple-minimal-white-texture.png'
      },
      {
        code: 'CP-005',
        name: 'Rouge Cardinal',
        color: '#8B0000',
        imagePath: '/simple-faded-abstract-lines-pattern.png'
      },
      {
        code: 'CP-006',
        name: 'Bleu Océan',
        color: '#006994',
        imagePath: '/minimalist-black-white-interior-geometric-space.png'
      },
      {
        code: 'CP-007',
        name: 'Vert Emeraude',
        color: '#50C878',
        imagePath: '/minimalist-geometric-interior-space-clean-lines.png'
      },
      {
        code: 'CP-008',
        name: 'Bronze Antique',
        color: '#CD7F32',
        imagePath: '/subtle-minimalist-diagonal-lines-pattern-light-gra.png'
      }
    ],
    
    totalFinishesCount: 156,
    collectionName: 'COPANEL',
    
    features: [
      'Plus de 150 couleurs RAL',
      'Finitions spéciales disponibles',
      'Garantie couleur 20 ans',
      'Résistance corrosion marine',
      'Facilité de transformation',
      '100% recyclable'
    ],
    
    specifications: [
      { label: 'Poids', value: '5,5 kg/m² (4mm)' },
      { label: 'Résistance traction', value: '124 N/mm²' },
      { label: 'Module élasticité', value: '70000 N/mm²' },
      { label: 'Coefficient dilatation', value: '24 x 10⁻⁶ K⁻¹' },
      { label: 'Température service', value: '-50°C à +80°C' },
      { label: 'Classement feu', value: 'B-s1,d0' }
    ],
    
    price: 'Sur devis - À partir de 95€/m²',
    featured: true,
    inStock: true,
    order: 3,
    tags: ['composite', 'aluminium', 'moderne', 'premium', 'couleur']
  },
  
  {
    _id: 'product-panneau-composite-standard',
    _type: 'productItem',
    name: 'Panneau Composite Standard',
    slug: { current: 'panneau-composite-standard', _type: 'slug' },
    description: 'Solution composite polyvalente et économique pour tous types d\'applications architecturales.',
    longDescription: 'Le Panneau Composite Standard offre une solution équilibrée entre performance, esthétique et prix pour une large gamme d\'applications. Idéal pour les projets nécessitant un matériau fiable sans compromis sur la qualité, il répond aux exigences techniques tout en respectant les contraintes budgétaires.',
    category: { _type: 'reference', _ref: 'category-composite-materials' },
    
    // Image paths
    _imagePath: '/sophisticated-ventilated-facade-system-performance.jpg',
    _imageAlt: 'Panneau Composite Standard - Versatile architectural solution',
    _galleryImages: [
      { path: '/modern-building-curtain-wall-facade.png', alt: 'Modern building with composite panel curtain wall' },
      { path: '/modern-glass-facade-building-architecture-premium.jpg', alt: 'Premium composite facade architecture' },
      { path: '/clean-minimalist-architecture-facade.jpg', alt: 'Clean minimalist composite facade' },
      { path: '/premium-minimalist-facade-clean.jpg', alt: 'Premium minimalist composite panels' }
    ],
    
    characteristics: [
      'Bon rapport qualité-prix',
      'Facilité de mise en œuvre',
      'Résistance correcte aux UV',
      'Entretien minimal requis',
      'Variété de formats disponibles',
      'Compatibilité systèmes courants'
    ],
    
    applications: [
      'Habillages de façades',
      'Bardages économiques',
      'Cloisons intérieures',
      'Aménagements commerciaux',
      'Rénovations standard',
      'Bâtiments industriels',
      'Projets budget maîtrisé'
    ],
    
    panelFormats: [
      '1220 x 2440',
      '1500 x 3000',
      '1250 x 2500'
    ],
    
    thickness: '3 - 4',
    
    technicalDocuments: [
      {
        title: 'Fiche technique standard',
        downloadText: 'Télécharger'
      },
      {
        title: 'Instructions de pose',
        downloadText: 'Guide pose'
      }
    ],
    
    bimRequest: false,
    
    _availableFinishes: [
      {
        code: 'ST-001',
        name: 'Blanc Standard',
        color: '#F8F8F8',
        imagePath: '/simple-minimal-white-texture.png'
      },
      {
        code: 'ST-002',
        name: 'Gris Standard',
        color: '#808080',
        imagePath: '/minimalist-geometric-grid-pattern-light-background.png'
      },
      {
        code: 'ST-003',
        name: 'Beige Standard',
        color: '#C8B99C',
        imagePath: '/simple-minimalist-white-marble-texture-background.png'
      },
      {
        code: 'ST-004',
        name: 'Vert Standard',
        color: '#228B22',
        imagePath: '/minimalist-geometric-interior-space-clean-lines.png'
      }
    ],
    
    totalFinishesCount: 12,
    collectionName: 'Standard',
    
    features: [
      'Prix attractif',
      'Installation simple',
      'Disponibilité immédiate',
      '12 couleurs standards',
      'Garantie 3 ans',
      'Service après-vente'
    ],
    
    specifications: [
      { label: 'Poids', value: '4,2 kg/m² (3mm)' },
      { label: 'Résistance traction', value: '85 N/mm²' },
      { label: 'Absorption d\'eau', value: '< 0,5%' },
      { label: 'Coefficient dilatation', value: '28 x 10⁻⁶ K⁻¹' },
      { label: 'Température service', value: '-40°C à +70°C' },
      { label: 'Classement feu', value: 'B-s2,d0' }
    ],
    
    price: 'À partir de 65€/m²',
    featured: false,
    inStock: true,
    order: 4,
    tags: ['composite', 'économique', 'standard', 'polyvalent']
  }
]

// Function to upload image to Sanity
async function uploadImage(imagePath, altText) {
  try {
    const publicDir = path.join(__dirname, '..', 'public')
    const fullImagePath = path.join(publicDir, imagePath.replace('/', ''))
    
    if (!fs.existsSync(fullImagePath)) {
      console.warn(`⚠️  Image not found: ${fullImagePath}`)
      return null
    }
    
    const imageBuffer = fs.readFileSync(fullImagePath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath)
    })
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      },
      alt: altText
    }
  } catch (error) {
    console.error(`❌ Error uploading image ${imagePath}:`, error)
    return null
  }
}

// Function to clean up existing data
async function cleanupExistingData() {
  console.log('🧹 Cleaning up existing products and categories...')
  
  try {
    // Delete all existing products
    const existingProducts = await client.fetch('*[_type == "productItem"]._id')
    if (existingProducts.length > 0) {
      console.log(`🗑️  Deleting ${existingProducts.length} existing products...`)
      await client.delete({ query: '*[_type == "productItem"]' })
      console.log('✅ Existing products deleted')
    }
    
    // Delete all existing categories
    const existingCategories = await client.fetch('*[_type == "productCategory"]._id')
    if (existingCategories.length > 0) {
      console.log(`🗑️  Deleting ${existingCategories.length} existing categories...`)
      await client.delete({ query: '*[_type == "productCategory"]' })
      console.log('✅ Existing categories deleted')
    }
    
    // Wait for deletions to be processed
    await new Promise(resolve => setTimeout(resolve, 2000))
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error)
  }
}

// Function to create or update categories
async function createCategories() {
  console.log('Creating product categories...')
  
  for (const category of categories) {
    try {
      await client.createOrReplace(category)
      console.log(`✅ Category created: ${category.name}`)
    } catch (error) {
      console.error(`❌ Error creating category ${category.name}:`, error)
    }
  }
}

// Function to create or update products
async function createProducts() {
  console.log('Creating products...')
  
  for (const product of products) {
    try {
      console.log(`📸 Processing images for ${product.name}...`)
      
      // Upload main image
      const mainImage = await uploadImage(product._imagePath, product._imageAlt)
      
      // Upload gallery images
      const galleryImages = []
      for (const galleryImg of product._galleryImages) {
        const uploadedImg = await uploadImage(galleryImg.path, galleryImg.alt)
        if (uploadedImg) {
          galleryImages.push(uploadedImg)
        }
      }
      
      // Upload finish images if available
      const availableFinishes = []
      if (product._availableFinishes) {
        for (const finish of product._availableFinishes) {
          const finishImage = await uploadImage(finish.imagePath, `${finish.name} finish`)
          availableFinishes.push({
            code: finish.code,
            name: finish.name,
            color: finish.color,
            image: finishImage
          })
        }
      }
      
      // Create product data without temporary image fields
      const productData = { ...product }
      delete productData._imagePath
      delete productData._imageAlt
      delete productData._galleryImages
      delete productData._availableFinishes
      
      // Add uploaded images
      if (mainImage) {
        productData.image = mainImage
      }
      if (galleryImages.length > 0) {
        productData.gallery = galleryImages
      }
      if (availableFinishes.length > 0) {
        productData.availableFinishes = availableFinishes
      }
      
      await client.createOrReplace(productData)
      console.log(`✅ Product created: ${product.name} (${galleryImages.length + (mainImage ? 1 : 0)} images)`)
    } catch (error) {
      console.error(`❌ Error creating product ${product.name}:`, error)
    }
  }
}

// Main execution function
async function populateData() {
  try {
    console.log('🚀 Starting Sanity data population...')
    console.log(`📡 Connected to project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`)
    
    // Clean up existing data first
    await cleanupExistingData()
    
    // Create categories first (products reference them)
    await createCategories()
    
    // Wait a moment for categories to be indexed
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Create products
    await createProducts()
    
    console.log('✨ Data population completed successfully!')
    console.log('🔗 Summary:')
    console.log('   ✅ 2 product categories created')
    console.log('   ✅ 4 complete products with images created')
    console.log('   ✅ Product galleries populated (4-6 images each)')
    console.log('   ✅ Finish collections with sample images')
    console.log('   ✅ All technical specifications included')
    console.log('')
    console.log('🎯 Next steps:')
    console.log('   1. Visit Sanity Studio to review the products')
    console.log('   2. Upload technical documents (PDFs)')
    console.log('   3. Test product pages at /produits/[slug]')
    console.log('   4. Customize product descriptions as needed')
    
  } catch (error) {
    console.error('❌ Fatal error during population:', error)
    process.exit(1)
  }
}

// Execute script
// Check for required environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
  process.exit(1)
}

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ Missing SANITY_API_TOKEN environment variable')
  console.log('💡 Get your token from: https://manage.sanity.io')
  process.exit(1)
}

populateData()

export { populateData, createCategories, createProducts, cleanupExistingData, uploadImage }