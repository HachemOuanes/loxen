import { Skeleton } from "@/components/ui/skeleton"

export function ProductsSkeleton() {
  return (
    <section id="produits" className="py-16 sm:py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header skeleton */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <Skeleton className="h-8 sm:h-10 lg:h-12 w-48 sm:w-64 mx-auto mb-4 sm:mb-6" />
          <div className="space-y-2 max-w-2xl sm:max-w-3xl mx-auto">
            <Skeleton className="h-4 sm:h-5 w-full" />
            <Skeleton className="h-4 sm:h-5 w-3/4 mx-auto" />
          </div>
        </div>

        {/* Products grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-12 sm:mb-16">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="group bg-white border border-gray-100 transition-all duration-300">
              {/* Image skeleton */}
              <div className="aspect-[3/4] overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
              {/* Content skeleton */}
              <div className="p-3 sm:p-4 lg:p-6">
                <Skeleton className="h-5 sm:h-6 w-3/4 mb-2 sm:mb-3" />
                <div className="space-y-2">
                  <Skeleton className="h-3 sm:h-4 w-full" />
                  <Skeleton className="h-3 sm:h-4 w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button skeleton */}
        <div className="text-center">
          <Skeleton className="h-12 sm:h-14 w-48 sm:w-56 mx-auto rounded-none" />
        </div>
      </div>
    </section>
  )
}
