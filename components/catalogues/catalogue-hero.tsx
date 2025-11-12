'use client'

import { useState } from 'react'
import { Search, Filter, ChevronDown } from 'lucide-react'

interface CatalogueHeroProps {
  onSearchChange: (query: string) => void
  onCategoryFilter: (category: string) => void
  selectedCategory: string
  categories: string[]
}

export function CatalogueHero({ onSearchChange, onCategoryFilter, selectedCategory, categories }: CatalogueHeroProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearchChange(value)
  }

  const handleCategorySelect = (category: string) => {
    onCategoryFilter(category)
    setIsCategoryOpen(false)
  }

  return (
    <div className="bg-gray-50 pt-20 md:pt-24">
      {/* Title Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-black">
          Catalogues
        </h1>
      </div>

      {/* First Separator */}
      <div className="border-t border-black/10" />

      {/* Filter/Search Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
          {/* Filter Section */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-black/60" strokeWidth={1.5} />
            <span className="text-xs tracking-[0.18em] uppercase text-black/60 font-light">
              Filter:
            </span>
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase text-black font-light hover:text-black/80 transition-colors"
              >
                <span>{selectedCategory === 'All' ? 'Categories' : selectedCategory}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
              </button>
              
              {isCategoryOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-[45]" 
                    onClick={() => setIsCategoryOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 bg-white border border-black/10 shadow-lg z-[60] min-w-[200px]">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`w-full text-left px-4 py-2.5 text-xs tracking-[0.18em] uppercase font-light hover:bg-black/5 transition-colors ${
                          selectedCategory === category ? 'bg-black/5 text-black' : 'text-black/70'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Search Section */}
          <div className="flex items-center gap-2 flex-1 md:flex-initial md:justify-end">
            <Search className="w-4 h-4 text-black/60" strokeWidth={1.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="SEARCH BY NAME"
              className="text-xs tracking-[0.18em] uppercase text-black placeholder:text-black/40 font-light bg-transparent border-none outline-none focus:outline-none flex-1 md:flex-initial md:w-48"
            />
          </div>
        </div>
      </div>

      {/* Second Separator */}
      <div className="border-t border-black/10" />
    </div>
  )
}

