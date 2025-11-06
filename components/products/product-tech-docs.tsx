"use client"

import { useState } from 'react'
import { Plus } from 'lucide-react'

interface Product {
  specifications?: Array<{ label: string; value: string }>
  technicalDocuments?: Array<{ 
    title: string
    file?: {
      asset?: {
        _id?: string
        url?: string
        originalFilename?: string
        size?: number
        mimeType?: string
      }
    }
    downloadText?: string 
  }>
  bimRequest?: boolean
}

export function ProductTechDocs({ product }: { product: Product }) {
  const [expandedSpecifications, setExpandedSpecifications] = useState(false)
  const [expandedResources, setExpandedResources] = useState(false)

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Technical Specifications - Clean Table */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="mb-6">
            <button
              onClick={() => setExpandedSpecifications(!expandedSpecifications)}
              className="w-full px-4 flex border-b border-gray-200 items-center justify-between hover:bg-gray-50 transition-colors duration-200"
            >
              <h3 className="text-lg font-medium text-black py-3 uppercase tracking-wide">
                Spécifications techniques
              </h3>
              <Plus className="text-gray-800" />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSpecifications ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="overflow-hidden border border-gray-200 mt-2">
                {product.specifications?.map((spec, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center py-3 px-4 text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors duration-200`}
                  >
                    <span className="text-gray-600 font-medium">{spec.label}</span>
                    <span className="text-black font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Documents & BIM */}
        <div className="mb-2">
          <button
            onClick={() => setExpandedResources(!expandedResources)}
            className="w-full px-4 flex border-b border-gray-200 items-center justify-between hover:bg-gray-50 transition-colors duration-200"
          >
            <h3 className="text-lg font-medium text-black py-3 uppercase tracking-wide">Documents</h3>
            <Plus className="text-gray-800" />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedResources ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
              {/* Technical Documents */}
              {product.technicalDocuments && product.technicalDocuments.length > 0 &&
                product.technicalDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="group border border-gray-200 bg-white transition-all duration-300 cursor-pointer hover:border-black hover:shadow-md"
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Document Type Icon */}
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 group-hover:bg-black group-hover:text-white transition-all duration-300 flex items-center justify-center">
                          {doc.title?.toLowerCase().includes('technique') ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3-13.5H6.75a2.25 2.25 0 0 0-2.25 2.25v13.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.25-4.875c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5M8.25 8.25h2.25" />
                            </svg>
                          ) : doc.title?.toLowerCase().includes('guide') ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 1 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                          ) : doc.title?.toLowerCase().includes('certificat') ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-black group-hover:text-black transition-colors duration-300 truncate">
                            {doc.title}
                          </p>
                        </div>
                      </div>
                      {/* Download Button */}
                      {doc.file?.asset?.url ? (
                        <a
                          href={`${doc.file.asset.url}?dl=${doc.file.asset.originalFilename || doc.title || 'document'}.pdf`}
                          download
                          className="flex-shrink-0 w-8 h-8 border border-gray-300 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300 flex items-center justify-center ml-3"
                          aria-label="Télécharger"
                          onClick={(e) => {
                            // Ensure download works
                            e.stopPropagation()
                          }}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                        </a>
                      ) : (
                        <button
                          className="flex-shrink-0 w-8 h-8 border border-gray-300 opacity-50 cursor-not-allowed flex items-center justify-center ml-3"
                          aria-label="Fichier non disponible"
                          disabled
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}

              {/* BIM Request */}
              {product.bimRequest && (
                <div className="group border border-gray-200 bg-white hover:border-black hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* BIM Icon */}
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 group-hover:bg-black group-hover:text-white transition-all duration-300 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m21.75 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m21.75 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008V18m-2.25 0h.008v.008h-.008V18m-2.25 0h.008v.008h-.008V18m-2.25 0h.008v.008H12V18m-2.25 0h.008v.008h-.008V18m-2.25 0h.008v.008H6.75V18m-2.25 0h.008v.008h-.008V18" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-black group-hover:text-black transition-colors duration-300">
                          Fichier BIM
                        </p>
                      </div>
                    </div>
                    {/* Request Button */}
                    <button className="flex-shrink-0 w-8 h-8 border border-gray-300 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300 flex items-center justify-center ml-3" aria-label="Demander le fichier BIM">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
