import { Skeleton } from "@/components/ui/skeleton"

interface InteriorExteriorSkeletonProps {
  sectionId: string
  isInterior?: boolean
}

export function InteriorExteriorSkeleton({ sectionId, isInterior = false }: InteriorExteriorSkeletonProps) {
  return (
    <section id={sectionId} className="relative h-screen flex flex-col lg:flex-row px-6 gap-2 my-6">
      {/* Categories grid skeleton */}
      <div className={`w-full lg:w-3/4 ${isInterior ? 'order-1 lg:order-2' : 'order-2 lg:order-1'}`}>
        <div className="grid grid-cols-2 sm:grid-cols-2 h-full gap-2">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="relative group overflow-hidden flex-1">
              {/* Image skeleton */}
              <Skeleton className="w-full h-full" />
              {/* Overlay skeleton */}
              <div className="absolute inset-0 bg-black/40" />
              {/* Text skeleton */}
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 lg:p-4">
                <Skeleton className="h-4 sm:h-5 w-3/4 bg-white/30 mb-1" />
                <Skeleton className="h-3 sm:h-4 w-2/3 bg-white/20" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content panel skeleton */}
      <div className={`w-full lg:w-1/4 relative flex flex-col items-center justify-center z-10 ${isInterior ? 'order-2 lg:order-1' : 'order-1 lg:order-2'}`}>
        {/* Background skeleton */}
        <Skeleton className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        {/* Content skeleton */}
        <div className="relative text-center space-y-4 sm:space-y-6 lg:space-y-8 px-4">
          <Skeleton className="h-8 sm:h-10 lg:h-12 w-40 sm:w-48 mx-auto bg-white/30" />
          <div className="space-y-3 max-w-md mx-auto">
            <Skeleton className="h-4 sm:h-5 w-full bg-white/20" />
            <Skeleton className="h-4 sm:h-5 w-4/5 mx-auto bg-white/20" />
            <Skeleton className="h-4 sm:h-5 w-3/4 mx-auto bg-white/20" />
          </div>
          <Skeleton className="h-12 sm:h-14 w-40 sm:w-48 mx-auto bg-white/25 rounded-none" />
        </div>
      </div>
    </section>
  )
}
