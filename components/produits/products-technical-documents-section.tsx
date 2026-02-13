"use client"

import { useState } from 'react'
import { Plus, X, Download } from 'lucide-react'

interface TechnicalDocument {
  title: string
  file?: {
    asset?: {
      _id: string
      url: string
    }
  }
  fileUrl?: string
  fileType?: string
  downloadText?: string
}

interface ProductsTechnicalDocumentsSectionProps {
  documents: TechnicalDocument[]
  sectionTitle: string
  description?: string
}

export function ProductsTechnicalDocumentsSection({ 
  documents, 
  sectionTitle,
  description
}: ProductsTechnicalDocumentsSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!documents || documents.length === 0) {
    return null
  }

  return (
    <section className="relative bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Accordion Item */}
        <div className="relative">
          {/* Trigger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between py-6 md:py-8"
            aria-expanded={isOpen}
          >
            {/* Title Section */}
            <div className="flex-1 text-left">
              <h2 className="text-3xl md:text-5xl lg:text-6xl text-black tracking-tight">
                {sectionTitle}
              </h2>
              {description && (
                <p className="mt-3 md:mt-4 text-base md:text-lg text-black/70 max-w-2xl leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {/* Right Side - Separator and Icon */}
            <div className="ml-6 md:ml-8 flex items-center gap-4 flex-shrink-0">
              {/* Separator Line */}
              <div className="w-12 h-px bg-black/20 hidden md:block" />
              
              {/* Icon Section */}
              <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                {isOpen ? (
                  <X className="w-7 h-7 md:w-9 md:h-9 text-black/50" strokeWidth={1.5} />
                ) : (
                  <Plus className="w-7 h-7 md:w-9 md:h-9 text-black/50" strokeWidth={1.5} />
                )}
              </div>
            </div>
          </button>

          {/* Content Section */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pb-8 md:pb-12 pt-6 md:pt-8">
              {/* Two Column Layout: Description + Documents */}
              {description && documents && documents.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Left Column - Description */}
                  <div className="py-6 md:py-8 pr-6 md:pr-8 border-r border-black/10">
                    {/* Section Header */}
                    <div className="inline-flex items-center gap-2 mb-5">
                      <span className="h-[1px] w-8 bg-black/30" />
                      <span className="text-xs tracking-[0.18em] uppercase text-black/70 font-light">
                        Overview
                      </span>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                      <div className="text-lg md:text-xl text-black/70 leading-relaxed">
                        {description}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Supporting Documents */}
                  <div className="py-6 md:py-8 pl-6 md:pl-8">
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs tracking-[0.18em] uppercase text-black/70 font-light">
                        Supporting Docs
                      </span>
                      <span className="text-xs tracking-[0.18em] uppercase text-black/70 font-light">
                        {documents.length.toString().padStart(2, '0')} Available
                      </span>
                    </div>

                    {/* Documents List */}
                    <div className="space-y-0">
                      {documents.map((doc, docIndex) => (
                        <div
                          key={docIndex}
                          className={`py-3 px-4 flex items-center justify-between group hover:bg-black/5 transition-colors duration-200 rounded-sm ${docIndex < documents.length - 1 ? 'border-b border-black/5' : ''}`}
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            {/* Document Icon */}
                            <div className="flex-shrink-0 w-8 h-8 border border-black/20 flex items-center justify-center">
                              <svg className="w-4 h-4 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                              </svg>
                            </div>

                            {/* Document Name */}
                            <div className="flex-1 min-w-0">
                              <p className="text-base md:text-lg text-black truncate">
                                {doc.title}
                              </p>
                            </div>

                            {/* File Type */}
                            {doc.fileType && (
                              <span className="text-xs uppercase text-black/50 mr-4 flex-shrink-0">
                                {doc.fileType}
                              </span>
                            )}
                          </div>

                          {/* Download Link */}
                          {doc.fileUrl ? (
                            <a
                              href={doc.fileUrl}
                              download
                              className="flex-shrink-0 text-xs tracking-[0.18em] uppercase text-black/60 hover:text-black transition-colors duration-200 flex items-center justify-center gap-1.5 ml-4"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>{doc.downloadText || 'Download'}</span>
                              <Download className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                            </a>
                          ) : (
                            <span className="flex-shrink-0 text-xs tracking-[0.18em] uppercase text-black/30 ml-4 flex items-center gap-1.5">
                              <span>{doc.downloadText || 'Download'}</span>
                              <Download className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Fallback: Documents only layout */
                <div className="py-6 md:py-8">
                  {/* Section Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs tracking-[0.18em] uppercase text-black/70 font-light">
                      Supporting Docs
                    </span>
                    <span className="text-xs tracking-[0.18em] uppercase text-black/70 font-light">
                      {documents.length.toString().padStart(2, '0')} Available
                    </span>
                  </div>

                  {/* Documents List */}
                  <div className="space-y-0">
                    {documents.map((doc, docIndex) => (
                      <div
                        key={docIndex}
                        className={`py-3 px-4 flex items-center justify-between group hover:bg-black/5 transition-colors duration-200 rounded-sm ${docIndex < documents.length - 1 ? 'border-b border-black/5' : ''}`}
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          {/* Document Icon */}
                          <div className="flex-shrink-0 w-8 h-8 border border-black/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                          </div>

                          {/* Document Name */}
                          <div className="flex-1 min-w-0">
                            <p className="text-base md:text-lg text-black truncate">
                              {doc.title}
                            </p>
                          </div>

                          {/* File Type */}
                          {doc.fileType && (
                            <span className="text-xs uppercase text-black/50 mr-4 flex-shrink-0">
                              {doc.fileType}
                            </span>
                          )}
                        </div>

                        {/* Download Link */}
                        {doc.fileUrl ? (
                          <a
                            href={doc.fileUrl}
                            download
                            className="flex-shrink-0 text-xs tracking-[0.18em] uppercase text-black/60 hover:text-black transition-colors duration-200 flex items-center justify-center gap-1.5 ml-4"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>{doc.downloadText || 'Download'}</span>
                            <Download className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                          </a>
                        ) : (
                          <span className="flex-shrink-0 text-xs tracking-[0.18em] uppercase text-black/30 ml-4 flex items-center gap-1.5">
                            <span>{doc.downloadText || 'Download'}</span>
                            <Download className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                          </span>
                        )}
                      </div>
                    ))}
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
