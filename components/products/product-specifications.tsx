'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/lib/sanity"
import { Plus } from "lucide-react"

interface Product {
  _id: string
  name: string
  characteristics?: string[]
  applications?: string[]
  availableFinishes?: Array<{
    code: string
    name: string
    image: any
    color?: string
  }>
  totalFinishesCount?: number
  collectionName?: string
  technicalDocuments?: Array<{
    title: string
    file: any
    downloadText: string
  }>
  bimRequest?: boolean
  specifications?: Array<{ label: string; value: string }>
}

interface ProductSpecificationsProps {
  product: Product
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const [showAllFinishes, setShowAllFinishes] = useState(false)
  const [expandedDocument, setExpandedDocument] = useState<string | null>(null)


  const displayedFinishes = showAllFinishes
    ? product.availableFinishes
    : product.availableFinishes?.slice(0, 5) || []

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Finishes Section - Premium Display */}
        {product.availableFinishes && product.availableFinishes.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-black uppercase tracking-wide">
                Décors disponibles
              </h3>
              {product.totalFinishesCount && (
                <span className="text-sm text-gray-500">
                  {product.totalFinishesCount} décors disponibles
                </span>
              )}
            </div>



            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 mb-6">
              <div className="mt-4">
                <p className="text-gray-800 text-lg mb-2 font-semibold">
                  {product.totalFinishesCount} décors d'exception vous attendent.
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Commendez dés maintenant vos échantillons gratuits et démarrez votre projet.
                </p>
              </div>
              {displayedFinishes?.map((finish, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="border-gray-300 overflow-hidden group-hover:border-black group-hover:shadow-lg transition-all duration-300 bg-white rounded-lg">
                    {finish.image ? (
                      <img
                        src={urlFor(finish.image).width(200).height(260).quality(90).url()}
                        alt={finish.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: finish.color || '#f0f0f0' }}
                      />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-semibold text-black">{finish.code}</p>
                    <p className="text-xs text-gray-500 truncate">{finish.name}</p>
                  </div>
                </div>
              ))}

              {/* Show All/Show Less Button as Grid Item */}
              {product.availableFinishes && product.availableFinishes.length > 5 && (
                <div className="group cursor-pointer h-full" onClick={() => setShowAllFinishes(!showAllFinishes)}>
                  <div className="h-52 border border-gray-300 overflow-hidden group-hover:border-black group-hover:shadow-lg transition-all duration-300 bg-white flex flex-col items-center justify-center rounded-md">
                    <svg className="w-6 h-6 mb-2 text-gray-500 group-hover:text-black transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      {showAllFinishes ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      )}
                    </svg>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-semibold text-black uppercase tracking-wider">
                      {showAllFinishes ? 'VOIR MOINS' : 'TOUS LES'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {showAllFinishes ? '' : 'DÉCORS'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
  )}
      </div>
    </section>
  )
}