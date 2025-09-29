import { Skeleton } from "@/components/ui/skeleton"

export function ProductsSkeleton() {
  return (
    <>
      {/* Header Section Skeleton */}
      <section className="pt-28 pb-16 px-4 relative z-10 min-h-[50vh] flex items-center bg-gray-200">
        <div className="relative z-10 text-center w-full">
          {/* Title skeleton */}
          <Skeleton className="h-12 sm:h-16 lg:h-20 w-64 sm:w-80 lg:w-96 mx-auto mb-6 sm:mb-8" />
          
          {/* Subtitle skeleton */}
          <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto px-4 mb-8">
            <Skeleton className="h-4 sm:h-5 lg:h-6 w-full mb-2" />
            <Skeleton className="h-4 sm:h-5 lg:h-6 w-3/4 mx-auto" />
          </div>
          
          {/* Search bar skeleton */}
          <div className="max-w-md mx-auto mt-8 mb-6">
            <Skeleton className="h-12 w-full rounded-none" />
          </div>
          
          {/* Divider skeleton */}
          <Skeleton className="w-16 sm:w-20 h-px mx-auto mt-6" />
        </div>
      </section>

      {/* Products Section Skeleton */}
      <section className="py-16 px-4 bg-white relative z-10">
        {/* Category Filters Skeleton */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sm:mb-16">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-10 w-20 sm:w-24 rounded-none" />
          ))}
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-12 sm:mb-16">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="group relative overflow-hidden border border-gray-100">
              {/* Image skeleton */}
              <div className="aspect-[3/4] overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
              
              {/* Content overlay skeleton */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-300 via-gray-200 to-transparent p-5 sm:p-6 lg:p-7">
                {/* Category tag skeleton */}
                <Skeleton className="h-3 w-20 mb-2" />
                
                {/* Title skeleton */}
                <Skeleton className="h-5 sm:h-6 w-3/4 mb-2 sm:mb-3" />
                
                {/* Description skeleton */}
                <Skeleton className="h-3 sm:h-4 w-full mb-1" />
                <Skeleton className="h-3 sm:h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section Skeleton */}
      <section className="py-16 px-4 bg-gray-50 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* CTA Title skeleton */}
          <Skeleton className="h-8 sm:h-10 lg:h-12 w-80 sm:w-96 mx-auto mb-6 sm:mb-8" />
          
          {/* Divider skeleton */}
          <Skeleton className="w-16 sm:w-20 h-px mx-auto mb-6 sm:mb-8" />
          
          {/* CTA Description skeleton */}
          <div className="max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            <Skeleton className="h-4 sm:h-5 w-full mb-2" />
            <Skeleton className="h-4 sm:h-5 w-4/5 mx-auto mb-2" />
            <Skeleton className="h-4 sm:h-5 w-3/5 mx-auto" />
          </div>
          
          {/* CTA Button skeleton */}
          <Skeleton className="h-12 sm:h-14 w-48 sm:w-56 mx-auto rounded-none" />
        </div>
      </section>
    </>
  )
}