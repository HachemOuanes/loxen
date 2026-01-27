import { Skeleton } from '@/components/ui/skeleton'

export function DecorsSkeleton() {
  return (
    <div>
      {/* Title skeleton */}
      <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 font-light mb-4">
        <span className="h-[1px] w-8 bg-black/30" />
        <Skeleton className="h-4 w-32 bg-gray-200" />
        <Skeleton className="h-4 w-16 bg-gray-200 ml-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Left intro text skeleton */}
        <div className="md:col-span-4">
          <div className="sticky top-24">
            <Skeleton className="h-8 md:h-10 lg:h-12 w-full mb-3 bg-gray-200" />
            <Skeleton className="h-6 w-3/4 mb-2 bg-gray-200" />
            <Skeleton className="h-6 w-full bg-gray-200" />
          </div>
        </div>

        {/* Right grid skeleton */}
        <div className="md:col-span-8">
          <div className="relative overflow-hidden">
            <div className="flex gap-4 lg:gap-6">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="basis-1/2 shrink-0 lg:basis-[calc((100%_-_1.5rem_*_4)/5)]"
                >
                  {/* Decor card skeleton */}
                  <div className="aspect-[4/5] overflow-hidden bg-gray-50 relative rounded-2xl border-2 border-gray-100">
                    <Skeleton className="h-full w-full rounded-2xl bg-gray-200" />
                  </div>
                  <div className="p-3">
                    <Skeleton className="h-3 w-12 mb-2 bg-gray-200" />
                    <Skeleton className="h-3 w-24 mb-1 bg-gray-200" />
                    <Skeleton className="h-3 w-20 bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Collection bar skeleton */}
      <div className="bg-gray-50 mt-6 p-3 border-2 border-gray-100">
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="h-3 w-24 bg-gray-200" />
          <Skeleton className="h-3 w-16 bg-gray-200" />
          <Skeleton className="h-3 w-20 bg-gray-200" />
        </div>
      </div>
    </div>
  )
}
