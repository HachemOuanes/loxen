export function SolutionsSkeleton() {
  return (
    <section id="solutions" className="w-full relative z-10 m-0 p-0 bg-gradient-to-b from-white to-gray-100">
      <div className="w-[calc(100%-2rem)] ml-4 px-6 md:px-8 py-16 md:py-24 lg:py-32">
        {/* Visual Separator at Top */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4 w-full max-w-2xl">
            <div className="flex-1 h-px bg-black/10"></div>
            <div className="w-2 h-2 rounded-full bg-black/30"></div>
            <div className="flex-1 h-px bg-black/10"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Column - Slogan */}
          <div className="py-6 md:py-8 pr-6 md:pr-8 border-r border-black/10">
            {/* Section Header */}
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="h-[1px] w-8 bg-black/10"></div>
              <div className="h-3 w-24 bg-black/5 rounded"></div>
            </div>

            {/* Main Slogan */}
            <div className="space-y-3 mb-6">
              <div className="h-12 md:h-16 lg:h-20 w-full bg-black/5 rounded"></div>
              <div className="h-12 md:h-16 lg:h-20 w-5/6 bg-black/5 rounded"></div>
            </div>

            {/* Decorative Element */}
            <div className="mt-8 flex items-center gap-2">
              <div className="h-[1px] w-[60px] bg-black/10"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
              <div className="h-[1px] w-[60px] bg-black/10"></div>
            </div>

            {/* Solution Buttons */}
            <div className="mt-8 flex flex-col gap-3">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="h-12 w-full bg-black/5 rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Right Column - Solution Benefits */}
          <div className="py-6 md:py-8 pl-6 md:pl-8">
            {/* Section Header */}
            <div className="mb-5">
              <div className="h-8 md:h-10 lg:h-12 w-3/4 bg-black/5 rounded mb-2"></div>
            </div>

            {/* Benefits List */}
            <div className="space-y-0">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className={`py-4 md:py-5 px-4 flex flex-col gap-2 rounded-sm ${
                    index < 2 ? 'border-b border-black/5' : ''
                  }`}
                >
                  {/* Benefit Title */}
                  <div className="flex items-center gap-3">
                    <div className="h-6 md:h-8 w-8 bg-black/5 rounded"></div>
                    <div className="h-6 md:h-7 lg:h-8 w-3/4 bg-black/5 rounded"></div>
                  </div>

                  {/* Benefit Description */}
                  <div className="pl-8 md:pl-10 space-y-2">
                    <div className="h-4 md:h-5 w-full bg-black/5 rounded"></div>
                    <div className="h-4 md:h-5 w-5/6 bg-black/5 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Separator at Bottom */}
        <div className="flex items-center justify-center mt-12">
          <div className="flex items-center gap-4 w-full max-w-2xl">
            <div className="flex-1 h-px bg-black/10"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full border border-black/30"></div>
            </div>
            <div className="flex-1 h-px bg-black/10"></div>
          </div>
        </div>

        {/* Additional Visual Elements */}
        <div className="mt-12 flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-6 bg-black/10"></div>
            <div className="h-3 w-48 bg-black/5 rounded"></div>
            <div className="h-[1px] w-6 bg-black/10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

