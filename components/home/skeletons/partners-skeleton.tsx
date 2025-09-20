import { Skeleton } from "@/components/ui/skeleton"

export function PartnersSkeleton() {
  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header skeleton */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <Skeleton className="h-8 sm:h-10 lg:h-12 w-64 sm:w-80 mx-auto mb-4 sm:mb-6" />
          <div className="space-y-2 max-w-2xl mx-auto">
            <Skeleton className="h-4 sm:h-5 w-full" />
            <Skeleton className="h-4 sm:h-5 w-2/3 mx-auto" />
          </div>
        </div>

        {/* Partners grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-8 lg:gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex items-center justify-center p-4 sm:p-6 bg-white border border-gray-100 transition-all duration-300">
              <Skeleton className="h-8 sm:h-10 lg:h-12 w-16 sm:w-20 lg:w-24" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
