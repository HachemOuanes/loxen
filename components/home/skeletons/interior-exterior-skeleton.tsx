import { Skeleton } from "@/components/ui/skeleton"

interface InteriorExteriorSkeletonProps {
  sectionId: string
  isInterior?: boolean
}

export function InteriorExteriorSkeleton({ sectionId, isInterior = false }: InteriorExteriorSkeletonProps) {
  return (
    <section id={sectionId} className="w-full relative z-10 m-0 p-0 bg-white">
      <div className="w-[calc(100%-2rem)] ml-4 px-6 md:px-8 py-16 md:py-20 lg:py-24">
        {/* Main Content - 3 Column Grid */}
        <div className="grid md:grid-cols-3 gap-0 items-start">
          {/* Left Column - Category List */}
          <div className="py-6 md:py-8 lg:py-10 pr-6 md:pr-8 lg:pr-10 border-r border-black/10">
            {/* Title Skeleton */}
            <Skeleton className="h-16 md:h-20 lg:h-24 w-3/4 mb-8 md:mb-10 bg-gray-200" />
            
            {/* Decorative Element Skeleton */}
            <div className="mb-8 md:mb-10 flex items-center gap-2">
              <Skeleton className="h-px w-12 bg-gray-200" />
              <Skeleton className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              <Skeleton className="h-px w-12 bg-gray-200" />
            </div>

            {/* Category Buttons Skeleton */}
            <div className="flex flex-col gap-3 md:gap-4">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-12 w-full bg-gray-200 rounded-full" />
              ))}
            </div>
          </div>

          {/* Middle Column - Category Image */}
          <div className="py-6 md:py-8 lg:py-10 px-6 md:px-8 lg:px-10 border-r border-black/10">
            {/* Image Skeleton */}
            <Skeleton className="w-full aspect-[3/4] bg-gray-200 mb-6 md:mb-8" />
            
            {/* Button Skeleton */}
            <Skeleton className="h-12 w-32 bg-gray-200 rounded-full" />
          </div>

          {/* Right Column - Products List */}
          <div className="py-6 md:py-8 lg:py-10 pl-6 md:pl-8 lg:pl-10">
            {/* Products Header Skeleton */}
            <div className="mb-6 md:mb-8">
              <Skeleton className="h-8 md:h-10 lg:h-12 w-32 mb-3 bg-gray-200" />
              <Skeleton className="h-px w-12 md:w-16 bg-gray-200" />
            </div>

            {/* Products List Skeleton */}
            <div className="space-y-4 md:space-y-5">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="p-4 md:p-5 border border-gray-200">
                  <Skeleton className="h-6 md:h-7 lg:h-8 w-3/4 mb-2 md:mb-3 bg-gray-200" />
                  <Skeleton className="h-4 md:h-5 w-full bg-gray-100" />
                  <Skeleton className="h-4 md:h-5 w-5/6 mt-2 bg-gray-100" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Separator at Bottom */}
        <div className="flex items-center justify-center mt-16 md:mt-20 lg:mt-24">
          <div className="flex items-center gap-4 w-full max-w-2xl">
            <Skeleton className="flex-1 h-px bg-gray-200" />
            <Skeleton className="w-2 h-2 rounded-full bg-gray-300" />
            <Skeleton className="flex-1 h-px bg-gray-200" />
          </div>
        </div>
      </div>
    </section>
  )
}
