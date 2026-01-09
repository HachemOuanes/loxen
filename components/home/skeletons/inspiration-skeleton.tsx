export function InspirationSkeleton() {
  return (
    <section id="inspirations" className="w-full relative z-10 m-0 p-0 bg-gradient-to-b from-gray-100 to-white">
      <div className="w-[calc(100%-2rem)] ml-4 px-6 md:px-8 py-16 md:py-24 lg:py-32">
        {/* Header Section */}
        <div className="mb-12">
          {/* Section Indicator */}
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-[1px] w-8 bg-black/10"></div>
            <div className="h-3 w-32 bg-black/5 rounded"></div>
          </div>

          {/* Main Headline */}
          <div className="space-y-3 mb-3">
            <div className="h-12 md:h-16 lg:h-20 w-full bg-black/5 rounded"></div>
            <div className="h-12 md:h-16 lg:h-20 w-4/5 bg-black/5 rounded"></div>
          </div>
        </div>

        {/* Inspiration Items Grid - 4 columns with varying heights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => {
            // Alternating heights: even indices (0, 2) are tall, odd indices (1, 3) are short
            const isTall = index % 2 === 0
            const imageHeight = isTall ? 'h-[400px] md:h-[500px] lg:h-[600px]' : 'h-[260px] md:h-[360px] lg:h-[460px]'

            return (
              <div key={index} className="group bg-white">
                {/* Image Section - Top with varying heights */}
                <div className={`relative overflow-hidden ${imageHeight} mb-4 bg-black/5 rounded`}></div>

                {/* Content Section - Below image */}
                <div className="flex flex-col">
                  {/* Category and Read Time */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-3 w-24 bg-black/5 rounded"></div>
                    <div className="h-3 w-24 bg-black/5 rounded"></div>
                  </div>

                  {/* Title */}
                  <div className="h-6 md:h-7 lg:h-8 w-full bg-black/5 rounded"></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
