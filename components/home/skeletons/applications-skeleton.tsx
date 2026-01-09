export function ApplicationsSkeleton() {
  return (
    <section id="applications" className="w-full relative z-10 m-0 p-0 bg-white overflow-hidden">
      <div className="relative w-[calc(100%-2rem)] ml-4 px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 relative">
          {/* Title at top - spans 2 columns */}
          <div className="absolute top-8 md:top-12 lg:top-16 xl:top-20 left-0 mb-16 z-10 w-full">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-[1px] w-8 bg-black/10"></div>
              <div className="h-3 w-32 bg-black/5 rounded"></div>
            </div>
            <div className="h-12 md:h-16 lg:h-20 w-2/3 bg-black/5 rounded mb-3"></div>
            <div className="w-1/3 pr-12 pt-12 space-y-3">
              <div className="h-5 md:h-6 w-full bg-black/5 rounded"></div>
              <div className="h-5 md:h-6 w-full bg-black/5 rounded"></div>
              <div className="h-5 md:h-6 w-5/6 bg-black/5 rounded"></div>
            </div>
          </div>

          {/* Cards skeleton */}
          <div className="col-span-3 mt-64 md:mt-80 lg:mt-96">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="relative">
                  <div className="aspect-[4/3] bg-black/5 rounded mb-4"></div>
                  <div className="h-6 w-3/4 bg-black/5 rounded mb-2"></div>
                  <div className="h-4 w-full bg-black/5 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

