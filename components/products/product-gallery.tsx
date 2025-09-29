'use client'

import { useState } from "react"
import { urlFor } from "@/lib/sanity"

interface ProductGalleryProps {
  mainImage: any
  gallery?: any[]
  productName: string
}

export function ProductGallery({ mainImage, gallery, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  
  // Combine main image with gallery images
  const allImages = [mainImage, ...(gallery || [])]

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="bg-gray-100 overflow-hidden">
        <img
          src={urlFor(allImages[selectedImage]).quality(95).url()}
          alt={`${productName} - Image ${selectedImage + 1}`}
          className="w-full h-full transition-all duration-500"
        />
      </div>

      {/* Thumbnail Navigation */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              className={`flex-shrink-0 w-20 h-20 border-2 transition-all duration-300 ${
                selectedImage === index 
                  ? 'border-black' 
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={urlFor(image).width(80).height(80).quality(90).url()}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {allImages.length > 1 && (
        <div className="text-center">
          <span className="text-sm text-gray-500 font-light">
            {selectedImage + 1} / {allImages.length}
          </span>
        </div>
      )}
    </div>
  )
}