import { Skeleton } from "@/components/ui/skeleton"

export function InspirationSkeleton() {
  return (
    <section id="inspirations" className="py-16 sm:py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header skeleton */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <Skeleton className="h-8 sm:h-10 lg:h-12 w-56 sm:w-72 mx-auto mb-4 sm:mb-6" />
          <div className="space-y-2 max-w-2xl sm:max-w-3xl mx-auto">
            <Skeleton className="h-4 sm:h-5 w-full" />
            <Skeleton className="h-4 sm:h-5 w-4/5 mx-auto" />
            <Skeleton className="h-4 sm:h-5 w-2/3 mx-auto" />
          </div>
        </div>

        {/* Carousel container skeleton */}
        <div className="relative">
          {/* Carousel slides skeleton */}
          <div className="flex transition-transform duration-500 ease-in-out">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="w-1/3 flex-shrink-0 px-2">
                <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-100">
                  {/* Image skeleton */}
                  <Skeleton className="w-full h-full" />
                  {/* Content overlay skeleton */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/95 p-3 sm:p-4 lg:p-6">
                    <Skeleton className="h-5 sm:h-6 lg:h-7 w-3/4 mb-1 bg-white/20" />
                    <Skeleton className="h-4 sm:h-5 w-1/2 bg-white/15" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows skeleton */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4">
            <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20" />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4">
            <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20" />
          </div>

          {/* Dots indicator skeleton */}
          <div className="flex justify-center space-x-2 mt-6 sm:mt-8">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" />
            ))}
          </div>
        </div>

        {/* Button skeleton */}
        <div className="text-center mt-12 sm:mt-16">
          <Skeleton className="h-12 sm:h-14 w-56 sm:w-64 mx-auto rounded-none" />
        </div>
      </div>
    </section>
  )
}
