'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { DecorCard } from './decor-card'
import { DecorDetailModal } from './decor-detail-modal'
import { SearchIcon, FilterIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

type Finish = {
  _id: string
  code: string
  name: string
  image?: any
  image_url?: string
  color?: string
  colors?: string[]
  abet_order?: number
  collection_names?: Array<{ code: string; name: string }>
  collections?: string[]
  surfaces?: string[]
  finishes?: string[]
  option_classes?: string[]
  keywords?: string[]
  interior?: boolean
  exterior?: boolean
  available?: boolean
  is_new?: boolean
  featured?: boolean
}

interface DecorsWithFiltersProps {
  finishes: Finish[]
}

export function DecorsWithFilters({ finishes }: DecorsWithFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])
  const [interiorFilter, setInteriorFilter] = useState<boolean | null>(null)
  const [exteriorFilter, setExteriorFilter] = useState<boolean | null>(null)
  const [isNewFilter, setIsNewFilter] = useState<boolean | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedDecor, setSelectedDecor] = useState<Finish | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Extract unique filter values
  const allColors = useMemo(() => {
    const colorSet = new Set<string>()
    finishes.forEach(f => {
      if (f.colors) f.colors.forEach(c => colorSet.add(c))
      if (f.color) colorSet.add(f.color)
    })
    return Array.from(colorSet).sort()
  }, [finishes])

  const allCollections = useMemo(() => {
    const collectionSet = new Set<string>()
    finishes.forEach(f => {
      if (f.collection_names) {
        f.collection_names.forEach(c => collectionSet.add(c.name))
      }
    })
    return Array.from(collectionSet).sort()
  }, [finishes])

  // Filter decors based on search and filters
  const filteredFinishes = useMemo(() => {
    return finishes.filter(finish => {
      // Search filter - trim and check for empty string
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchesSearch =
          finish.name?.toLowerCase().includes(query) ||
          finish.code?.toLowerCase().includes(query) ||
          (finish.collection_names && finish.collection_names.some(c => c.name?.toLowerCase().includes(query))) ||
          (finish.keywords && finish.keywords.some(k => k?.toLowerCase().includes(query)))
        
        if (!matchesSearch) return false
      }

      // Color filter - must match at least one selected color
      if (selectedColors.length > 0) {
        const hasColor = selectedColors.some(color =>
          (finish.colors && finish.colors.includes(color)) || 
          finish.color === color
        )
        if (!hasColor) return false
      }

      // Collection filter - must match at least one selected collection
      if (selectedCollections.length > 0) {
        const hasCollection = selectedCollections.some(collection =>
          finish.collection_names?.some(c => c.name === collection)
        )
        if (!hasCollection) return false
      }

      // Interior/Exterior filter
      // If both filters are checked, show decors that are interior OR exterior (union)
      // If only one is checked, show decors matching that filter
      // If neither is checked, show all
      const hasUsageFilter = interiorFilter === true || exteriorFilter === true
      if (hasUsageFilter) {
        let matchesUsage = false
        
        if (interiorFilter === true && exteriorFilter === true) {
          // Both checked: show if interior OR exterior
          matchesUsage = finish.interior === true || finish.exterior === true
        } else if (interiorFilter === true) {
          // Only interior checked
          matchesUsage = finish.interior === true
        } else if (exteriorFilter === true) {
          // Only exterior checked
          matchesUsage = finish.exterior === true
        }
        
        if (!matchesUsage) return false
      }

      // Is New filter
      if (isNewFilter !== null) {
        if (finish.is_new !== isNewFilter) return false
      }

      return true
    })
  }, [finishes, searchQuery, selectedColors, selectedCollections, interiorFilter, exteriorFilter, isNewFilter])

  const availableFinishes = filteredFinishes.filter(f => f.available !== false)

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
  }

  const toggleCollection = (collection: string) => {
    setSelectedCollections(prev =>
      prev.includes(collection) ? prev.filter(c => c !== collection) : [...prev, collection]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedColors([])
    setSelectedCollections([])
    setInteriorFilter(null)
    setExteriorFilter(null)
    setIsNewFilter(null)
  }

  const hasActiveFilters = searchQuery || selectedColors.length > 0 || selectedCollections.length > 0 || interiorFilter !== null || exteriorFilter !== null || isNewFilter !== null

  // Reusable filter content component
  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xs tracking-[0.18em] uppercase text-black/60 mb-4">Filtres</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-black/60 hover:text-black underline mb-4"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {/* Colors Filter */}
      {allColors.length > 0 && (
        <div>
          <h3 className="text-xs font-medium text-black mb-3 uppercase tracking-wide">Couleurs</h3>
          <div className="space-y-2">
            {allColors.map(color => (
              <label key={color} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() => toggleColor(color)}
                  className="w-4 h-4 border border-black/20 rounded focus:ring-black/20 focus:ring-2"
                />
                <span className="text-xs text-black/70 capitalize">{color}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Collections Filter */}
      {allCollections.length > 0 && (
        <div>
          <h3 className="text-xs font-medium text-black mb-3 uppercase tracking-wide">Collections</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {allCollections.map(collection => (
              <label key={collection} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCollections.includes(collection)}
                  onChange={() => toggleCollection(collection)}
                  className="w-4 h-4 border border-black/20 rounded focus:ring-black/20 focus:ring-2"
                />
                <span className="text-xs text-black/70">{collection}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Interior/Exterior Filter */}
      <div>
        <h3 className="text-xs font-medium text-black mb-3 uppercase tracking-wide">Usage</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={interiorFilter === true}
              onChange={(e) => setInteriorFilter(e.target.checked ? true : null)}
              className="w-4 h-4 border border-black/20 rounded focus:ring-black/20 focus:ring-2"
            />
            <span className="text-xs text-black/70">Intérieur</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={exteriorFilter === true}
              onChange={(e) => setExteriorFilter(e.target.checked ? true : null)}
              className="w-4 h-4 border border-black/20 rounded focus:ring-black/20 focus:ring-2"
            />
            <span className="text-xs text-black/70">Extérieur</span>
          </label>
        </div>
      </div>

      {/* New Filter */}
      <div>
        <h3 className="text-xs font-medium text-black mb-3 uppercase tracking-wide">Statut</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isNewFilter === true}
            onChange={(e) => setIsNewFilter(e.target.checked ? true : null)}
            className="w-4 h-4 border border-black/20 rounded focus:ring-black/20 focus:ring-2"
          />
          <span className="text-xs text-black/70">Nouveau</span>
        </label>
      </div>
    </div>
  )

  return (
    <div className="flex gap-6 md:gap-8">
      {/* Filter Sidebar - Desktop */}
      <aside className="hidden md:block w-64 shrink-0">
        <div className="sticky top-24">
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Button */}
      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetTrigger asChild>
          <button className="md:hidden fixed bottom-6 right-6 z-30 bg-black text-white p-3 rounded-full shadow-lg hover:bg-black/90 transition-colors">
            <FilterIcon className="w-5 h-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-6">
          <SheetHeader>
            <SheetTitle className="text-xs tracking-[0.18em] uppercase text-black/60">Filtres</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black/40" />
            <Input
              type="text"
              placeholder="Rechercher par nom, code, collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-black/20 focus:border-black/40 rounded-none"
            />
          </div>
        </div>

        {/* Results Count */}
        {availableFinishes.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            <div className="text-sm text-black/60">
              {availableFinishes.length} décors{availableFinishes.length !== finishes.length && ` sur ${finishes.length}`}
            </div>
            {availableFinishes.filter(f => f.is_new).length > 0 && (
              <div className="text-sm text-black/60">
                • {availableFinishes.filter(f => f.is_new).length} nouveaux
              </div>
            )}
          </div>
        )}

        {/* Decors Grid */}
        {availableFinishes.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
            {availableFinishes.map((finish) => (
              <DecorCard 
                key={finish.code + finish.name} 
                finish={finish}
                onClick={() => {
                  setSelectedDecor(finish)
                  setModalOpen(true)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-black/60 text-sm">Aucun décor ne correspond à vos critères de recherche.</p>
          </div>
        )}
      </div>

      {/* Decor Detail Modal */}
      <DecorDetailModal
        finish={selectedDecor}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  )
}

