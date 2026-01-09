export function ContactSkeleton() {
  return (
    <section id="contact" className="py-32 bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="w-[calc(100%-2rem)] ml-4 px-6 md:px-8 relative z-10">
        <div className="text-center mb-20 relative">
          <div className="flex items-center justify-center mb-12">
            <div className="h-[1px] w-[120px] bg-background/20"></div>
            <div className="mx-8">
              <div className="w-6 h-6 rounded-full border border-background/30"></div>
            </div>
            <div className="h-[1px] w-[120px] bg-background/20"></div>
          </div>

          <div className="h-12 md:h-16 lg:h-20 w-3/4 mx-auto bg-background/10 rounded mb-8"></div>
          <div className="h-5 md:h-6 w-2/3 mx-auto bg-background/10 rounded"></div>
        </div>

        <div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-3 lg:ml-24">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="h-4 w-16 bg-background/10 rounded"></div>
                    <div className="h-14 w-full bg-background/10 rounded"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-16 bg-background/10 rounded"></div>
                    <div className="h-14 w-full bg-background/10 rounded"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-20 bg-background/10 rounded"></div>
                  <div className="h-32 w-full bg-background/10 rounded"></div>
                </div>
                <div className="pt-8">
                  <div className="h-12 w-48 bg-background/10 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 lg:mr-24 space-y-12">
              <div className="space-y-10">
                {/* Email skeleton */}
                <div className="flex items-center space-x-6">
                  <div className="w-5 h-5 bg-background/10 rounded"></div>
                  <div className="flex items-center justify-between w-full">
                    <div className="h-4 w-16 bg-background/10 rounded"></div>
                    <div className="h-5 w-48 bg-background/10 rounded"></div>
                  </div>
                </div>

                {/* Phone skeleton */}
                <div className="flex items-center space-x-6">
                  <div className="w-5 h-5 bg-background/10 rounded"></div>
                  <div className="flex items-center justify-between w-full">
                    <div className="h-4 w-24 bg-background/10 rounded"></div>
                    <div className="h-5 w-40 bg-background/10 rounded"></div>
                  </div>
                </div>

                {/* Studio skeleton */}
                <div className="flex items-start space-x-6">
                  <div className="w-5 h-5 bg-background/10 rounded mt-0.5"></div>
                  <div className="flex items-start justify-between w-full">
                    <div className="h-4 w-16 bg-background/10 rounded"></div>
                    <div className="text-right space-y-1">
                      <div className="h-5 w-40 bg-background/10 rounded"></div>
                      <div className="h-5 w-36 bg-background/10 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div className="flex items-center justify-center">
                  <div className="h-[1px] w-20 bg-background/20"></div>
                  <div className="mx-6">
                    <div className="w-2 h-2 rounded-full bg-background/30"></div>
                  </div>
                  <div className="h-[1px] w-20 bg-background/20"></div>
                </div>
                <div className="h-4 w-48 mx-auto mt-6 bg-background/10 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
