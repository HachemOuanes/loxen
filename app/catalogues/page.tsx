import { Metadata } from 'next'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { CatalogueAccordion } from '@/components/catalogues/catalogue-accordion'

export const metadata: Metadata = {
  title: 'Catalogues',
  description: 'Consultez nos catalogues produits et documentations techniques.'
}

// Static mockup data for catalogues
const catalogues = [
  {
    id: 'plaquettes-produits',
    title: 'Plaquettes produits',
    description: 'Découvrez l\'ensemble de nos produits HPL avec leurs caractéristiques techniques et visuelles.',
    image: '/meg/meg-1.jpg',
    imageAlt: 'Plaquettes produits HPL',
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
    }
  },
  {
    id: 'nuanciers-decors',
    title: 'Nuanciers décors',
    description: 'Explorez notre palette complète de décors disponibles avec leurs codes, visuels et caractéristiques.',
    image: '/interior-design-background.jpg',
    imageAlt: 'Nuanciers décors',
    content: {
      text: [
        'Nos nuanciers présentent l\'intégralité de nos décors HPL, organisés par collections et catégories. Chaque décors est accompagné de son code unique, de visuels haute qualité et d\'informations sur ses applications possibles.',
        'Vous y trouverez des marbres, des bois, des bétons, des unis et bien d\'autres finitions pour répondre à tous vos besoins de design et d\'architecture.'
      ]
    }
  },
  {
    id: 'guides-techniques',
    title: 'Guides techniques',
    description: 'Téléchargez nos guides détaillés pour la mise en œuvre, l\'entretien et les recommandations d\'utilisation.',
    image: '/architectural-technical-drawings-blueprints-modern.png',
    imageAlt: 'Guides techniques',
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
    }
  },
  {
    id: 'fiches-produits',
    title: 'Fiches produits',
    description: 'Documents techniques détaillés pour chaque produit avec toutes les spécifications nécessaires.',
    image: '/architectural-technical-drawings-blueprints.png',
    imageAlt: 'Fiches produits',
    content: {
      text: [
        'Nos fiches produits fournissent une documentation complète pour chaque référence : dimensions disponibles, épaisseurs, finitions, caractéristiques mécaniques, résistances, certifications et conditions d\'utilisation.',
        'Ces documents sont essentiels pour vos cahiers des charges et vos dossiers de consultation. Ils respectent les normes internationales et sont régulièrement mis à jour.'
      ]
    }
  },
  {
    id: 'bibliotheque-bim',
    title: 'Bibliothèque BIM',
    description: 'Accédez à nos modèles 3D et fichiers BIM pour intégrer nos produits directement dans vos projets.',
    image: '/modern-office-campus-curtain-wall.png',
    imageAlt: 'Bibliothèque BIM',
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
    }
  },
  {
    id: 'certifications-et-normes',
    title: 'Certifications et normes',
    description: 'Consultez toutes les certifications, labels et conformités de nos produits HPL.',
    image: '/sophisticated-ventilated-facade-system-performance.jpg',
    imageAlt: 'Certifications et normes',
    content: {
      text: [
        'Nos produits HPL sont certifiés selon les normes internationales les plus strictes. Vous trouverez ici toutes les certifications, labels qualité et documents de conformité pour chaque produit.',
        'Fire safety, performance environnementale, résistance mécanique : tous nos documents certifiés sont disponibles pour vos dossiers et vos garanties.'
      ]
    }
  }
]

export default function CataloguesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Header Section */}
          <div className="mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-6">
              <span className="h-[1px] w-8 bg-black/20" /> Catalogues
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-black mb-4">
              Documentation technique
            </h1>
            <p className="text-black/70 max-w-2xl text-base md:text-lg leading-relaxed font-light">
              Accédez à l'ensemble de nos catalogues, guides techniques et documentations pour vos projets.
            </p>
          </div>

          {/* Catalogues Accordion List */}
          <div className="relative">
            {catalogues.map((catalogue, index) => (
              <CatalogueAccordion
                key={catalogue.id || index}
                catalogue={catalogue}
                index={index}
                isLast={index === catalogues.length - 1}
                id={catalogue.id}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
