"use client"

import { Download } from 'lucide-react'

interface TechnicalDocument {
  title: string
  fileUrl?: string
  fileType?: string
  downloadText?: string
}

interface ProductsTechnicalDocumentsSectionProps {
  documents: TechnicalDocument[]
  sectionTitle: string
  sectionNumber?: number
  description?: string
  image?: string
  imageAlt?: string
}

export function ProductsTechnicalDocumentsSection({ 
  documents, 
  sectionTitle,
  sectionNumber = 1,
  description,
  image,
  imageAlt
}: ProductsTechnicalDocumentsSectionProps) {
  if (!documents || documents.length === 0) {
    return null
  }

  return (
    <section className="relative bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Left Column: Image only - 1/3 width */}
          <div className="md:col-span-1">
            {image && (
              <div className="relative overflow-hidden h-[60vh] md:h-[70vh] border border-black/10">
                <img
                  src={image}
                  alt={imageAlt || sectionTitle}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
          </div>

          {/* Right Column: Title, Description and Documents List - 2/3 width */}
          <div className="md:col-span-2 space-y-6 md:space-y-8">
            {/* Title and Description */}
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-black tracking-tight leading-tight">
                {sectionTitle}
              </h2>
              {description && (
                <p className="mt-4 text-sm md:text-base text-black/70 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            
            {/* Documents List */}
            <div className="space-y-0">
            {documents.map((doc, docIndex) => (
              <div
                key={docIndex}
                className={`py-4 md:py-5 px-4 flex items-center justify-between group hover:bg-black/5 transition-colors duration-200 ${
                  docIndex < documents.length - 1 ? 'border-b border-black/10' : ''
                }`}
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
                    <p className="text-base md:text-lg text-black">
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
      </div>
    </section>
  )
}
