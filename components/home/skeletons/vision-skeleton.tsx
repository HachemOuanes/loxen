export function VisionSkeleton() {
  return (
    <section id="vision" className="w-full relative z-10 m-0 p-0 bg-gradient-to-b from-gray-100 to-white">
      <div className="w-[calc(100%-2rem)] ml-4 px-6 md:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-8 gap-4 items-end">
          {/* Large text on the left */}
          <div className="flex flex-col col-span-6">
            <div className="h-32 md:h-40 lg:h-48 w-full bg-black/5 rounded"></div>
          </div>  

          {/* Small text on the right, aligned with top */}
          <div className="flex flex-col col-span-2 pb-8">
            <div className="space-y-2">
              <div className="h-5 md:h-6 w-full bg-black/5 rounded"></div>
              <div className="h-5 md:h-6 w-5/6 bg-black/5 rounded"></div>
              <div className="h-5 md:h-6 w-4/6 bg-black/5 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

