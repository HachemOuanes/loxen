export function ProductsSkeleton() {
  return (
    <section id="produits" className="w-full relative z-10 m-0 p-0 bg-white">
      <div className="w-[calc(100%-2rem)] ml-4 px-6 md:px-8 py-16 md:py-24 lg:py-32">
        {/* Header Section - Title on top */}
        <div className="mb-12">
          {/* Section Indicator */}
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-[1px] w-8 bg-black/10"></div>
            <div className="h-3 w-24 bg-black/5 rounded"></div>
          </div>

          {/* Main Headline */}
          <div className="space-y-3 mb-3">
            <div className="h-12 md:h-16 lg:h-20 w-full bg-black/5 rounded"></div>
            <div className="h-12 md:h-16 lg:h-20 w-3/4 bg-black/5 rounded"></div>
          </div>
        </div>

        {/* Products Grid - 1/4 left text, 3/4 right products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Left Column - Text Content (1/4 width) */}
          <div className="lg:col-span-1 flex flex-col gap-24 my-28">
            <div className="space-y-3">
              <div className="h-5 md:h-6 w-full bg-black/5 rounded"></div>
              <div className="h-5 md:h-6 w-full bg-black/5 rounded"></div>
              <div className="h-5 md:h-6 w-3/4 bg-black/5 rounded"></div>
            </div>
            <div className="h-12 w-48 bg-black/5 rounded-full"></div>
          </div>

          {/* Right Column - Swiper Products (3/4 width) */}
          <div className="lg:col-span-3 relative">
            <div className="flex gap-6 overflow-hidden">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex-shrink-0 w-[calc(40%-12px)]">
                  <div className="flex flex-col h-full">
                    {/* Image Section */}
                    <div className="relative overflow-hidden aspect-[3/4] mb-4">
                      <div className="w-full h-full bg-black/5 rounded"></div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col">
                      {/* Title */}
                      <div className="h-6 md:h-7 lg:h-8 w-3/4 bg-black/5 rounded mb-2"></div>

                      {/* Description */}
                      <div className="space-y-2 mb-4">
                        <div className="h-4 md:h-5 w-full bg-black/5 rounded"></div>
                        <div className="h-4 md:h-5 w-5/6 bg-black/5 rounded"></div>
                        <div className="h-4 md:h-5 w-4/6 bg-black/5 rounded"></div>
                      </div>

                      {/* Discover Link */}
                      <div className="h-4 w-24 bg-black/5 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
