"use client"

import { VisionSkeleton } from "@/components/home/skeletons/vision-skeleton"
import type { HomeVisionSection } from "@/lib/types/home"

interface VisionSectionProps {
  data?: HomeVisionSection | null
}

export function VisionSection({ data }: VisionSectionProps) {
  // Don't display section if no data at all
  if (!data) {
    return null
  }

  const largeText = data.largeText
  const smallText = data.smallText

  // Don't render if neither text exists
  if (!largeText && !smallText) {
    return null
  }

  return (
    <section id="vision" className="w-full relative z-10 m-0 p-0 bg-gradient-to-b from-gray-100 to-white">
      <div className="w-[calc(100%-2rem)] ml-4 px-6 md:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-8 gap-4 items-end">
          {/* Large text on the left */}
          {largeText && (
            <div className="flex flex-col col-span-6">
              <h2 className="text-[140px] text-black tracking-[-0.02em] leading-tight">
                {largeText}
              </h2>
            </div>
          )}

          {/* Small text on the right, aligned with top */}
          {smallText && (
            <div className="flex flex-col col-span-2 pb-8">
              <p className="text-base md:text-xl text-black/70 leading-relaxed ">
                {smallText}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

