'use client'

import { useState, useMemo } from 'react'
import { CatalogueAccordion } from './catalogue-accordion'
import { CatalogueHero } from './catalogue-hero'

interface CatalogueDocument {
  title: string
  fileUrl?: string
  fileType?: string
  downloadText?: string
}

interface CatalogueData {
  id?: string
  title: string
  category?: string
  description?: string
  overview?: string
  image?: string
  imageAlt?: string
  documents?: CatalogueDocument[]
}

interface CataloguesPageClientProps {
  catalogues: CatalogueData[]
}

export function CataloguesPageClient({ catalogues }: CataloguesPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Extract unique categories from catalogues
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>()
    catalogues.forEach(catalogue => {
      if (catalogue.category) {
        uniqueCategories.add(catalogue.category)
      }
    })
    return ['All', ...Array.from(uniqueCategories).sort()]
  }, [catalogues])

  // Filter catalogues based on search and category
  const filteredCatalogues = useMemo(() => {
    return catalogues.filter(catalogue => {
      // Category filter
      if (selectedCategory !== 'All' && catalogue.category !== selectedCategory) {
        return false
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchesSearch =
          catalogue.title?.toLowerCase().includes(query) ||
          catalogue.description?.toLowerCase().includes(query) ||
          catalogue.overview?.toLowerCase().includes(query) ||
          catalogue.documents?.some(doc => doc.title?.toLowerCase().includes(query))

        if (!matchesSearch) return false
      }

      return true
    })
  }, [catalogues, searchQuery, selectedCategory])

  return (
    <>
      {/* Hero Section with Filter/Search */}
      <CatalogueHero
        onSearchChange={setSearchQuery}
        onCategoryFilter={setSelectedCategory}
        selectedCategory={selectedCategory}
        categories={categories}
      />

      {/* Catalogues Accordion List */}
      <section className="relative py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="relative">
            {filteredCatalogues.length > 0 ? (
              filteredCatalogues.map((catalogue, index) => (
                <CatalogueAccordion
                  key={catalogue.id || index}
                  catalogue={catalogue}
                  index={index}
                  isLast={index === filteredCatalogues.length - 1}
                  id={catalogue.id}
                />
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-lg md:text-xl text-black/70">Aucun catalogue trouvé.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

