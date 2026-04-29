"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import Image from 'next/image'
import { urlFor } from "@/lib/sanity"
import { cn } from "@/lib/utils"

interface ImageAlbumProps {
  images: any[]
  alt: string
  className?: string
  imageClassName?: string
}

export function ImageAlbum({ images, alt, className, imageClassName }: ImageAlbumProps) {
  const list = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images])
  const [active, setActive] = useState(1) // Start at 1 (first real image in extended list)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const isTransitioningRef = useRef(false)

  // Create extended list with duplicates for infinite loop: [last, ...original, first]
  const extendedList = useMemo(() => {
    if (list.length <= 1) return list
    return [list[list.length - 1], ...list, list[0]]
  }, [list])

  // Auto-advance images every 5 seconds
  useEffect(() => {
    if (list.length <= 1) return
    
    const interval = setInterval(() => {
      setActive((prev) => {
        const next = prev + 1
        // If we've reached the duplicate at the end, reset to first real image
        if (next >= extendedList.length - 1) {
          return extendedList.length - 1 // Show duplicate first
        }
        return next
      })
    }, 5000)
    
    return () => clearInterval(interval)
  }, [list.length, extendedList.length])

  // Handle instant reset when reaching the duplicate at the end
  useEffect(() => {
    if (!trackRef.current || list.length <= 1) return
    if (active !== extendedList.length - 1) return // Only handle when at the duplicate

    const track = trackRef.current
    // After showing the duplicate, instantly reset to first real image
    const resetTimeout = setTimeout(() => {
      if (trackRef.current) {
        trackRef.current.style.transition = 'none'
        trackRef.current.style.transform = `translateX(-${(1 * 100) / extendedList.length}%)`
        requestAnimationFrame(() => {
          if (trackRef.current) {
            trackRef.current.style.transition = 'transform 700ms ease-in-out'
            setActive(1)
          }
        })
      }
    }, 700) // Wait for transition to complete

    return () => clearTimeout(resetTimeout)
  }, [active, list.length, extendedList.length])

  // Handle smooth transition
  useEffect(() => {
    if (!trackRef.current || list.length <= 1) return

    const track = trackRef.current
    const position = (active * 100) / extendedList.length
    
    // Always set transition for smooth animation
    track.style.transition = 'transform 700ms ease-in-out'
    track.style.transform = `translateX(-${position}%)`
  }, [active, list.length, extendedList.length])

  // Handle manual click navigation
  const handleIndicatorClick = (index: number) => {
    if (isTransitioningRef.current) return
    isTransitioningRef.current = true
    // Map indicator index (0-based) to extended list index (1-based, since index 0 is duplicate)
    setActive(index + 1)
    setTimeout(() => {
      isTransitioningRef.current = false
    }, 700)
  }

  if (!list.length) return null
  // Map active index back to original list index for indicator highlighting
  const safeActive = active === 0 ? list.length - 1 : active === extendedList.length - 1 ? 0 : active - 1

  return (
    <div className={cn("relative overflow-hidden group", className)}>
      <div
        ref={trackRef}
        className="flex h-full w-full"
        style={{
          width: `${extendedList.length * 100}%`,
        }}
      >
        {extendedList.map((img, idx) => (
          <div key={idx} className="relative shrink-0 h-full" style={{ width: `${100 / extendedList.length}%` }}>
            <Image
              src={img ? urlFor(img).quality(90).url() : "/placeholder.jpg"}
              alt={alt}
              fill
              sizes="100vw"
              className={cn("object-cover", imageClassName)}
            />
          </div>
        ))}
      </div>

      {list.length > 1 && (
        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5">
          {list.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Image ${idx + 1}`}
              onClick={() => handleIndicatorClick(idx)}
              className={cn(
                "h-2.5 w-2.5 border border-white/80 bg-white/10 backdrop-blur-sm transition-all",
                idx === safeActive ? "bg-white" : "hover:bg-white/40"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

