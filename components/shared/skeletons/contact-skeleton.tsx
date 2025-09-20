import { Skeleton } from "@/components/ui/skeleton"

export function ContactSkeleton() {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information skeleton */}
            <div className="space-y-8 sm:space-y-12">
              <div>
                <Skeleton className="h-8 sm:h-10 lg:h-12 w-48 sm:w-64 mb-6 sm:mb-8" />
                <div className="space-y-6 sm:space-y-8">
                  {/* Email skeleton */}
                  <div className="flex items-start space-x-4">
                    <Skeleton className="w-6 h-6 rounded-full flex-shrink-0 mt-1" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-5 w-48" />
                    </div>
                  </div>
                  
                  {/* Phone skeleton */}
                  <div className="flex items-start space-x-4">
                    <Skeleton className="w-6 h-6 rounded-full flex-shrink-0 mt-1" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-5 w-40" />
                    </div>
                  </div>
                  
                  {/* Address skeleton */}
                  <div className="flex items-start space-x-4">
                    <Skeleton className="w-6 h-6 rounded-full flex-shrink-0 mt-1" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-16" />
                      <div className="space-y-1">
                        <Skeleton className="h-5 w-44" />
                        <Skeleton className="h-5 w-36" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Response time skeleton */}
                  <div className="flex items-start space-x-4">
                    <Skeleton className="w-6 h-6 rounded-full flex-shrink-0 mt-1" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form skeleton */}
            <div className="bg-gray-50 p-6 sm:p-8 lg:p-12">
              <Skeleton className="h-6 sm:h-7 w-56 mb-6 sm:mb-8" />
              
              <div className="space-y-6">
                {/* Name field skeleton */}
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-12 w-full rounded-none" />
                </div>
                
                {/* Email field skeleton */}
                <div>
                  <Skeleton className="h-4 w-12 mb-2" />
                  <Skeleton className="h-12 w-full rounded-none" />
                </div>
                
                {/* Subject field skeleton */}
                <div>
                  <Skeleton className="h-4 w-14 mb-2" />
                  <Skeleton className="h-12 w-full rounded-none" />
                </div>
                
                {/* Message field skeleton */}
                <div>
                  <Skeleton className="h-4 w-18 mb-2" />
                  <Skeleton className="h-32 w-full rounded-none" />
                </div>
                
                {/* Submit button skeleton */}
                <Skeleton className="h-12 w-full rounded-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
