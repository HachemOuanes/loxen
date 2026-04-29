'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { DecorCard } from './decor-card'
import { DecorDetailModal } from './decor-detail-modal'
import { SearchIcon, FilterIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

type Decor = {
  _id: string
  external_code: string
  loxen_code?: string
  name: string
  image?: any
  image_url?: string
  colors?: string[]
  external_order?: number
  products?: Array<{
    _key?: string
    product: {
      _id: string
      _type: string
      title?: string
      name?: string
      productId?: string
      slug?: { current: string }
    }
  }>
  interior?: boolean
  exterior?: boolean
}

interface DecorsWithFiltersProps {
  finishes: Decor[]
}

export function DecorsWithFilters({ finishes }: DecorsWithFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [interiorFilter, setInteriorFilter] = useState<boolean | null>(null)
  const [exteriorFilter, setExteriorFilter] = useState<boolean | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedDecor, setSelectedDecor] = useState<Decor | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Extract unique filter values
  const allColors = useMemo(() => {
    const colorSet = new Set<string>()
    finishes.forEach(f => {
      if (f.colors) f.colors.forEach(c => colorSet.add(c))
    })
    return Array.from(colorSet).sort()
  }, [finishes])

  const allProducts = useMemo(() => {
    const productSet = new Set<string>()
    finishes.forEach(f => {
      if (f.products) {
        f.products.forEach(p => {
          const name = p.product?.title || p.product?.name
          if (name) productSet.add(name)
        })
      }
    })
    return Array.from(productSet).sort()
  }, [finishes])

  // Filter decors
  const filteredFinishes = useMemo(() => {
    return finishes.filter(finish => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const displayCode = finish.loxen_code || finish.external_code
        const matchesSearch =
          finish.name?.toLowerCase().includes(query) ||
          displayCode?.toLowerCase().includes(query) ||
          (finish.products && finish.products.some(p => (p.product?.title || p.product?.name)?.toLowerCase().includes(query)))

        if (!matchesSearch) return false
      }

      // Color filter
      if (selectedColors.length > 0) {
        const hasColor = selectedColors.some(color =>
          finish.colors && finish.colors.includes(color)
        )
        if (!hasColor) return false
      }

      // Product filter
      if (selectedProducts.length > 0) {
        const hasProduct = selectedProducts.some(productName =>
          finish.products && finish.products.some(p => (p.product?.title || p.product?.name) === productName)
        )
        if (!hasProduct) return false
      }

      // Interior/Exterior filter
      const hasUsageFilter = interiorFilter === true || exteriorFilter === true
      if (hasUsageFilter) {
        let matchesUsage = false

        if (interiorFilter === true && exteriorFilter === true) {
          matchesUsage = finish.interior === true || finish.exterior === true
        } else if (interiorFilter === true) {
          matchesUsage = finish.interior === true
        } else if (exteriorFilter === true) {
          matchesUsage = finish.exterior === true
        }

        if (!matchesUsage) return false
      }

      return true
    })
  }, [finishes, searchQuery, selectedColors, selectedProducts, interiorFilter, exteriorFilter])

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
  }

  const toggleProduct = (productName: string) => {
    setSelectedProducts(prev =>
      prev.includes(productName) ? prev.filter(p => p !== productName) : [...prev, productName]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedColors([])
    setSelectedProducts([])
    setInteriorFilter(null)
    setExteriorFilter(null)
  }

  const hasActiveFilters = searchQuery || selectedColors.length > 0 || selectedProducts.length > 0 || interiorFilter !== null || exteriorFilter !== null

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
          <div className="space-y-2 max-h-48 overflow-y-auto">
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

      {/* Products Filter */}
      {allProducts.length > 0 && (
        <div>
          <h3 className="text-xs font-medium text-black mb-3 uppercase tracking-wide">Produits</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {allProducts.map(productName => (
              <label key={productName} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(productName)}
                  onChange={() => toggleProduct(productName)}
                  className="w-4 h-4 border border-black/20 rounded focus:ring-black/20 focus:ring-2"
                />
                <span className="text-xs text-black/70">{productName}</span>
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
              placeholder="Rechercher par nom, code, produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-black/20 focus:border-black/40 rounded-none"
            />
          </div>
        </div>

        {/* Results Count */}
        {filteredFinishes.length > 0 && (
          <div className="mb-6">
            <div className="text-sm text-black/60">
              {filteredFinishes.length} décors{filteredFinishes.length !== finishes.length && ` sur ${finishes.length}`}
            </div>
          </div>
        )}

        {/* Decors Grid */}
        {filteredFinishes.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredFinishes.map((finish) => (
              <DecorCard
                key={finish._id}
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
