import { DecorsCarousel, type Decor } from "@/components/shared/decors-carousel"

interface Product {
  _id: string
  name: string
  characteristics?: string[]
  applications?: string[]
  collectionName?: string
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
  specifications?: Array<{ label: string; value: string }>
}

interface ProductSpecificationsProps {
  product: Product
  decors?: Decor[]
}

export function ProductSpecifications({ product, decors = [] }: ProductSpecificationsProps) {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <DecorsCarousel
          decors={decors}
          collectionName={product.collectionName}
          title="Décors disponibles"
          showCollectionBar={true}
        />
      </div>
    </section>
  )
}