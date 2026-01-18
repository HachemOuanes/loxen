import { Skeleton } from "@/components/ui/skeleton"

interface InteriorExteriorSkeletonProps {
  sectionId: string
  isInterior?: boolean
}

export function InteriorExteriorSkeleton({ sectionId, isInterior = false }: InteriorExteriorSkeletonProps) {
  return (
    <section id={sectionId} className="w-full relative z-10 m-0 p-0 bg-white min-h-screen overflow-hidden">
      {/* Gray Background - Full height from top, no left spacing */}
      <div className="bg-gray-100 absolute top-0 left-0 h-full w-1/3 z-0"></div>
      
      <div className="w-[calc(100%-2rem)] ml-4 px-4 md:px-6 py-8 md:py-12 lg:py-16 relative min-h-screen pt-20 md:pt-24">
        {/* Main Content - 2 Column Grid */}
        <div className="grid md:grid-cols-3 gap-0 items-start z-30 relative md:items-stretch">
          {/* Left Column - Category List */}
          <div className="pt-20 md:pt-24 pb-4 md:pb-6 pr-4 md:pr-6 relative z-30">
            {/* Title Skeleton */}
            <div className="mb-6 md:mb-8">
              <Skeleton className="h-8 md:h-10 lg:h-12 w-48 mb-3 bg-gray-200" />
              <Skeleton className="h-12 md:h-16 lg:h-20 w-64 bg-gray-200" />
            </div>

            {/* Category Buttons Skeleton */}
            <div className="flex flex-col gap-2 md:gap-3 z-30">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-12 md:h-14 w-full bg-gray-200" />
              ))}
            </div>
          </div>

          {/* Spacer for desktop grid */}
          <div className="hidden md:block"></div>
          
          {/* Mobile Image - Inside content container */}
          <div className="md:hidden col-span-3 py-4">
            <Skeleton className="w-full aspect-[3/4] bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Desktop Image Container - Positioned relative to section */}
      <div className="hidden md:block absolute top-0 right-0 bottom-0 left-[33.333%] z-0 h-full overflow-hidden">
        <Skeleton className="w-full h-full bg-gray-200" />
      </div>

      {/* Products List - Glassmorphic overlay on the right - Fixed position */}
      <div className="hidden md:block absolute top-20 md:top-24 right-0 bottom-0 md:w-[26%] w-full flex flex-col p-4 md:p-6 lg:p-8 z-[60]">
        <div className="h-full w-full bg-black/50 backdrop-blur-md border-l border-white/30 rounded-l-lg p-4 md:p-6 lg:p-8 flex flex-col overflow-y-auto">
          {/* Products Header Skeleton */}
          <div className="mb-4 md:mb-6">
            <Skeleton className="h-6 md:h-8 w-24 mb-2 bg-white/20" />
            <Skeleton className="h-px w-12 md:w-16 bg-white/40" />
          </div>

          {/* Products List Skeleton */}
          <div className="space-y-6 md:space-y-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="pb-6 md:pb-8 border-b border-white/10 last:border-b-0">
                <Skeleton className="h-5 md:h-6 w-3/4 mb-2 bg-white/20" />
                <Skeleton className="h-4 md:h-5 w-full mb-3 bg-white/15" />
                <Skeleton className="h-4 md:h-5 w-5/6 bg-white/15" />
                <div className="flex items-center gap-2 mt-3">
                  <Skeleton className="h-3 md:h-4 w-20 bg-white/20" />
                  <Skeleton className="h-3 md:h-4 w-3 md:w-4 bg-white/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
