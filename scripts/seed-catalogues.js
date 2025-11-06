import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

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

const cataloguesData = [
  {
    id: 'plaquettes-produits',
    title: 'Plaquettes produits',
    description: 'Découvrez l\'ensemble de nos produits HPL avec leurs caractéristiques techniques et visuelles.',
    overview: 'Plaquettes produits. Une présentation complète de nos solutions HPL—conçues pour l\'intérieur et l\'extérieur, avec toutes les spécifications techniques et visuelles nécessaires.',
    image: '/meg/meg-1.jpg',
    imageAlt: 'Plaquettes produits HPL',
    documents: [
      {
        title: 'Catalogue Produits HPL',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Plaquettes Produits Intérieur',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Plaquettes Produits Extérieur',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Spécifications Techniques Produits',
        fileType: 'DOCX',
        fileUrl: '#',
        downloadText: 'Download'
      }
    ],
    content: {
      sections: [
        {
          title: 'Gamme complète',
          text: 'Notre collection de plaquettes produits présente une sélection exhaustive de nos solutions HPL pour l\'intérieur et l\'extérieur. Chaque plaquette détaille les spécifications techniques, les finitions disponibles et les applications possibles.',
          image: '/meg/meg-2.jpeg',
          imageAlt: 'Gamme complète de produits'
        },
        {
          title: 'Documentation technique',
          text: 'Accédez à toutes les informations techniques nécessaires pour vos projets : résistance, durabilité, certifications et normes. Nos plaquettes sont conçues pour faciliter votre prise de décision.',
          image: '/meg/meg-3.jpeg',
          imageAlt: 'Documentation technique'
        }
      ]
    },
    order: 0
  },
  {
    id: 'nuanciers-decors',
    title: 'Nuanciers décors',
    description: 'Explorez notre palette complète de décors disponibles avec leurs codes, visuels et caractéristiques.',
    overview: 'Nuanciers décors. Une palette complète de décors HPL—organisés par collections, avec codes uniques, visuels haute qualité et informations détaillées pour tous vos projets de design et d\'architecture.',
    image: '/interior-design-background.jpg',
    imageAlt: 'Nuanciers décors',
    documents: [
      {
        title: 'Nuancier Décors Complet',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Nuancier Marbres',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Nuancier Bois',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Nuancier Bétons et Unis',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      }
    ],
    content: {
      text: [
        'Nos nuanciers présentent l\'intégralité de nos décors HPL, organisés par collections et catégories. Chaque décors est accompagné de son code unique, de visuels haute qualité et d\'informations sur ses applications possibles.',
        'Vous y trouverez des marbres, des bois, des bétons, des unis et bien d\'autres finitions pour répondre à tous vos besoins de design et d\'architecture.'
      ]
    },
    order: 1
  },
  {
    id: 'guides-techniques',
    title: 'Guides techniques',
    description: 'Téléchargez nos guides détaillés pour la mise en œuvre, l\'entretien et les recommandations d\'utilisation.',
    overview: 'Guides techniques. Des ressources complètes pour la mise en œuvre, l\'entretien et l\'utilisation optimale de nos produits HPL—avec instructions détaillées, illustrations et recommandations pratiques.',
    image: '/architectural-technical-drawings-blueprints-modern.png',
    imageAlt: 'Guides techniques',
    documents: [
      {
        title: 'Guide de Mise en Œuvre HPL',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Guide d\'Entretien et Maintenance',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Recommandations d\'Utilisation',
        fileType: 'DOCX',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Guide Découpe et Fixation',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      }
    ],
    content: {
      sections: [
        {
          title: 'Mise en œuvre',
          text: 'Nos guides techniques couvrent tous les aspects de la mise en œuvre de nos produits HPL : découpe, fixation, jointoiement et finitions. Des instructions claires et illustrées pour garantir un résultat optimal.',
          image: '/finitions/solid-top-HPL-TOP-A.jpg',
          imageAlt: 'Mise en œuvre'
        },
        {
          title: 'Entretien et maintenance',
          text: 'Apprenez à entretenir vos installations HPL pour préserver leur beauté et leur performance dans le temps. Des conseils pratiques et des recommandations spécifiques selon le type d\'application.',
          image: '/finitions/solid-top-HPL-TOP-D.jpg',
          imageAlt: 'Entretien et maintenance'
        }
      ]
    },
    order: 2
  },
  {
    id: 'fiches-produits',
    title: 'Fiches produits',
    description: 'Documents techniques détaillés pour chaque produit avec toutes les spécifications nécessaires.',
    overview: 'Fiches produits. Documentation technique complète pour chaque référence—dimensions, épaisseurs, finitions, caractéristiques mécaniques, résistances, certifications et conditions d\'utilisation, conformes aux normes internationales.',
    image: '/architectural-technical-drawings-blueprints.png',
    imageAlt: 'Fiches produits',
    documents: [
      {
        title: 'Fiche Produit HPL Intérieur',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Fiche Produit HPL Extérieur',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Fiches Produits Complètes',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Spécifications Techniques Détaillées',
        fileType: 'DOCX',
        fileUrl: '#',
        downloadText: 'Download'
      }
    ],
    content: {
      text: [
        'Nos fiches produits fournissent une documentation complète pour chaque référence : dimensions disponibles, épaisseurs, finitions, caractéristiques mécaniques, résistances, certifications et conditions d\'utilisation.',
        'Ces documents sont essentiels pour vos cahiers des charges et vos dossiers de consultation. Ils respectent les normes internationales et sont régulièrement mis à jour.'
      ]
    },
    order: 3
  },
  {
    id: 'bibliotheque-bim',
    title: 'Bibliothèque BIM',
    description: 'Accédez à nos modèles 3D et fichiers BIM pour intégrer nos produits directement dans vos projets.',
    overview: 'Bibliothèque BIM. Modèles 3D et fichiers BIM complets pour intégrer nos produits HPL directement dans vos projets d\'architecture—compatibles avec les principaux logiciels de CAO et de modélisation.',
    image: '/modern-office-campus-curtain-wall.png',
    imageAlt: 'Bibliothèque BIM',
    documents: [
      {
        title: 'Modèles 3D HPL Intérieur',
        fileType: 'RFA',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Modèles 3D HPL Extérieur',
        fileType: 'RFA',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Fichiers BIM Revit',
        fileType: 'RVT',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Bibliothèque BIM Complète',
        fileType: 'ZIP',
        fileUrl: '#',
        downloadText: 'Download'
      }
    ],
    content: {
      sections: [
        {
          title: 'Modèles 3D',
          text: 'Téléchargez nos modèles 3D pour visualiser nos produits dans vos projets d\'architecture. Formats compatibles avec les principaux logiciels de CAO et de modélisation 3D.',
          image: '/modern-building-curtain-wall-facade.png',
          imageAlt: 'Modèles 3D'
        },
        {
          title: 'Fichiers BIM',
          text: 'Intégrez nos produits dans vos maquettes numériques avec nos fichiers BIM complets. Toutes les informations nécessaires sont incluses pour une utilisation optimale dans vos projets.',
          image: '/modern-corporate-glass-tower-facade.png',
          imageAlt: 'Fichiers BIM'
        }
      ]
    },
    order: 4
  },
  {
    id: 'certifications-et-normes',
    title: 'Certifications et normes',
    description: 'Consultez toutes les certifications, labels et conformités de nos produits HPL.',
    overview: 'Certifications et normes. Tous les documents certifiés de nos produits HPL—certifications internationales, labels qualité, conformités fire safety, performance environnementale et résistance mécanique pour vos dossiers et garanties.',
    image: '/sophisticated-ventilated-facade-system-performance.jpg',
    imageAlt: 'Certifications et normes',
    documents: [
      {
        title: 'Certifications Fire Safety',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Certifications Environnementales',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Certifications Résistance Mécanique',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      },
      {
        title: 'Documents de Conformité Complets',
        fileType: 'PDF',
        fileUrl: '#',
        downloadText: 'Download'
      }
    ],
    content: {
      text: [
        'Nos produits HPL sont certifiés selon les normes internationales les plus strictes. Vous trouverez ici toutes les certifications, labels qualité et documents de conformité pour chaque produit.',
        'Fire safety, performance environnementale, résistance mécanique : tous nos documents certifiés sont disponibles pour vos dossiers et vos garanties.'
      ]
    },
    order: 5
  }
]

async function seedCatalogues() {
  console.log('🌱 Starting catalogue seeding...\n')

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN is not set in .env.local')
    console.error('Please add your Sanity API token to .env.local')
    process.exit(1)
  }

  for (const catalogue of cataloguesData) {
    try {
      // Check if catalogue already exists
      const existing = await client.fetch(
        `*[_type == "catalogue" && id == $id][0]`,
        { id: catalogue.id }
      )

      if (existing) {
        console.log(`📝 Updating catalogue: ${catalogue.title}`)
        await client
          .patch(existing._id)
          .set(catalogue)
          .commit()
        console.log(`   ✅ Updated successfully`)
      } else {
        console.log(`✨ Creating catalogue: ${catalogue.title}`)
        await client.create({
          _type: 'catalogue',
          ...catalogue,
        })
        console.log(`   ✅ Created successfully`)
      }
    } catch (error) {
      console.error(`❌ Error processing ${catalogue.title}:`, error.message)
      if (error.message.includes('Unauthorized')) {
        console.error('   ⚠️  Authentication failed. Please check your SANITY_API_TOKEN')
      }
    }
  }

  console.log('\n✅ Catalogue seeding completed!')
}

seedCatalogues().catch(console.error)

