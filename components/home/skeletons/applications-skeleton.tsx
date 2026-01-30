export function ApplicationsSkeleton() {
  return (
    <section id="applications" className="w-full relative z-10 m-0 p-0 bg-white overflow-hidden">
      <div className="relative w-[calc(100%-2rem)] ml-4 px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 relative">
          {/* Title at top - spans 2 columns */}
          <div className="absolute top-8 md:top-12 lg:top-16 xl:top-20 left-0 mb-16 z-10 w-full">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-[1px] w-8 bg-black/30"></span>
              <div className="h-3 w-32 bg-black/5"></div>
            </div>
            <div className="h-12 md:h-16 lg:h-20 w-2/3 bg-black/5 mb-3"></div>
            <div className="w-1/3 pr-12 pt-12 space-y-3">
              <div className="h-5 md:h-6 w-full bg-black/5"></div>
              <div className="h-5 md:h-6 w-full bg-black/5"></div>
              <div className="h-5 md:h-6 w-5/6 bg-black/5"></div>
            </div>
          </div>

          {/* Text Column - Left */}
          <div className="relative bg-white flex flex-col py-8 md:py-12 lg:py-16 xl:py-20">
            {/* Background color overlay - dark slate from midpoint */}
            <div className="absolute top-[55%] -left-8 md:-left-12 lg:-left-16 xl:-left-20 -right-8 md:-right-12 lg:-right-16 xl:-right-20 bottom-0 bg-black"></div>
            
            {/* CTA Section skeleton */}
            <div className="max-w-md mt-auto relative z-10 pr-8">
              <div className="h-5 md:h-6 w-full bg-white/10 mb-6"></div>
              <div className="h-12 w-48 bg-white/10"></div>
            </div>
          </div>

          {/* Intérieur Column - Middle */}
          <div className="relative bg-white overflow-visible flex items-start justify-center py-20">
            <div className="absolute top-2/3 -left-8 md:-left-12 lg:-left-16 xl:-left-20 -right-8 md:-right-12 lg:-right-16 xl:-right-20 bottom-0 bg-black"></div>
            <div className="relative w-full aspect-[3/4] mt-36 z-10">
              <div className="w-full h-full bg-gray-100"></div>
            </div>
          </div>

          {/* Extérieur Column - Right */}
          <div className="relative bg-white overflow-visible flex items-start justify-center py-8 md:py-12 lg:py-16 xl:py-20">
            <div className="absolute top-2/3 -left-8 md:-left-12 lg:-left-16 xl:-left-20 -right-8 md:-right-12 lg:-right-16 xl:-right-20 bottom-0 bg-black"></div>
            <div className="relative w-full aspect-[3/4] mt-4 md:mt-6 z-10">
              <div className="w-full h-full bg-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

