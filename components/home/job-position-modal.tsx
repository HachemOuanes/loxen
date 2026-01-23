"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ArrowUpRight } from "lucide-react"

const JOB_POSITION_STORAGE_KEY = 'loxen_job_position'

export function JobPositionModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const applicationsSectionRef = useRef<HTMLElement | null>(null)
  const hasShownRef = useRef(false)
  const hasCheckedStorageRef = useRef(false)

  // Check localStorage on mount and set up scroll detection
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Check if position is already saved
    const savedPosition = localStorage.getItem(JOB_POSITION_STORAGE_KEY)
    if (savedPosition) {
      // Position already saved, don't show modal
      hasShownRef.current = true
      hasCheckedStorageRef.current = true
      return
    }
    hasCheckedStorageRef.current = true

    // Only set up scroll detection if no position is saved
    if (hasShownRef.current) return

    let cleanup: (() => void) | null = null
    let timeout: NodeJS.Timeout | null = null

    const setupScrollDetection = (section: HTMLElement) => {
      // Create a sentinel element at the end of the applications section
      const sentinel = document.createElement('div')
      sentinel.style.position = 'absolute'
      sentinel.style.bottom = '0'
      sentinel.style.height = '1px'
      sentinel.style.width = '1px'
      sentinel.style.pointerEvents = 'none'
      sentinel.style.visibility = 'hidden'
      
      // Insert sentinel at the end of the section
      if (getComputedStyle(section).position === 'static') {
        section.style.position = 'relative'
      }
      section.appendChild(sentinel)

      // Use IntersectionObserver for reliable detection
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // When sentinel enters viewport (section end is visible), show modal
            if (entry.isIntersecting && !hasShownRef.current) {
              hasShownRef.current = true
              setIsOpen(true)
              observer.disconnect()
            }
          })
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1
        }
      )

      observer.observe(sentinel)

      // Fallback: also check scroll position periodically
      const checkScrollPosition = () => {
        if (hasShownRef.current) return

        const sectionRect = section.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Show modal when section bottom is near or past viewport
        if (sectionRect.bottom <= windowHeight * 0.2) {
          hasShownRef.current = true
          setIsOpen(true)
        }
      }

      let rafId: number | null = null
      const checkScroll = () => {
        if (!hasShownRef.current) {
          checkScrollPosition()
          rafId = requestAnimationFrame(checkScroll)
        }
      }
      rafId = requestAnimationFrame(checkScroll)

      window.addEventListener('scroll', checkScrollPosition, { passive: true })

      cleanup = () => {
        observer.disconnect()
        window.removeEventListener('scroll', checkScrollPosition)
        if (rafId !== null) {
          cancelAnimationFrame(rafId)
        }
        if (sentinel.parentNode) {
          sentinel.parentNode.removeChild(sentinel)
        }
      }
    }

    // Find the applications section
    const applicationsSection = document.getElementById("applications")
    if (!applicationsSection) {
      // Retry after a short delay if section not found yet
      timeout = setTimeout(() => {
        const retrySection = document.getElementById("applications")
        if (retrySection && !hasShownRef.current) {
          applicationsSectionRef.current = retrySection
          setupScrollDetection(retrySection)
        }
      }, 500)
    } else {
      applicationsSectionRef.current = applicationsSection
      setupScrollDetection(applicationsSection)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
      if (cleanup) cleanup()
    }
  }, [])

  const continueButtonRef = useRef<HTMLButtonElement>(null)

  // Animate modal in
  useEffect(() => {
    if (!modalRef.current || !backdropRef.current || !dialogRef.current || !isOpen) return

    // Prevent body scroll
    document.body.style.overflow = 'hidden'

    // Animate backdrop
    gsap.fromTo(backdropRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    )

    // Animate dialog
    gsap.fromTo(dialogRef.current,
      { 
        opacity: 0,
        scale: 0.9,
        y: 20
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.1
      }
    )
  }, [isOpen])

  // Animate continue button when position is selected
  useEffect(() => {
    if (!continueButtonRef.current) return

    if (selectedPosition) {
      gsap.fromTo(continueButtonRef.current,
        {
          opacity: 0,
          y: 10
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        }
      )
    }
  }, [selectedPosition])

  const handleSelectPosition = (position: string) => {
    setSelectedPosition(position)
  }

  const handleContinue = () => {
    // Save selected position to localStorage
    if (selectedPosition && typeof window !== 'undefined') {
      localStorage.setItem(JOB_POSITION_STORAGE_KEY, selectedPosition)
    }

    // Animate out and close
    if (!backdropRef.current || !dialogRef.current) return

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    })

    gsap.to(dialogRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 10,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIsOpen(false)
        document.body.style.overflow = ''
      }
    })
  }

  if (!isOpen) return null

  const positions = [
    { id: 'architecte', label: 'Architecte' },
    { id: 'menuisier', label: 'Menuisier' },
    { id: 'particulier', label: 'Particulier' }
  ]

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      {/* Backdrop - blocks interaction but cannot be clicked to close */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative z-10 bg-white rounded-sm max-w-sm w-full mx-4 overflow-hidden border border-black/20"
      >
        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Section label style */}
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-4 font-light">
            <span className="h-[1px] w-8 bg-black/30" /> Profil
          </div>
          
          <h2 className="text-xl md:text-2xl font-medium italic text-black mb-2 tracking-[-0.02em] leading-tight">
            Qui êtes-vous ?
          </h2>
          <p className="text-sm text-black/70 mb-6 font-light leading-relaxed">
            Sélectionnez votre profil pour une expérience personnalisée
          </p>

          {/* Position options - vertical stack */}
          <div className="space-y-2 mb-4">
            {positions.map((position) => (
              <button
                key={position.id}
                onClick={() => handleSelectPosition(position.id)}
                className={`w-full text-center py-2 px-4 border transition-all duration-300 rounded-full ${
                  selectedPosition === position.id
                    ? 'border-black bg-black text-white'
                    : 'border-black/20 bg-white text-black hover:border-black/40 hover:bg-black/5'
                }`}
              >
                <span className="text-xs font-medium tracking-[0.1em] uppercase">
                  {position.label}
                </span>
              </button>
            ))}
          </div>

          {/* Continue button - appears after selection */}
          {selectedPosition && (
            <div className="flex justify-end">
              <button
                ref={continueButtonRef}
                onClick={handleContinue}
                className="group bg-white text-black hover:opacity-80 hover:underline transition-all duration-300 rounded-full p-3 text-xs font-light tracking-[0.1em] uppercase flex items-center justify-center gap-2"
              >
                Poursuivre
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
