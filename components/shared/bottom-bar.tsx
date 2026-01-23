"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ArrowUpRight } from "lucide-react"
import { scrollToContact } from "@/lib/scroll-to-contact"

export function BottomBar() {
  const bottomBarRef = useRef<HTMLElement | null>(null)
  const lastScrollY = useRef(0)
  const scrollDirection = useRef<'up' | 'down'>('up')

  // Scroll-based hide/show animation (opposite of header: show on scroll down, hide on scroll up)
  useEffect(() => {
    const bottomBar = bottomBarRef.current
    if (!bottomBar) return

    // Get scroll position - Lenis updates document.documentElement.scrollTop
    const getScrollY = () => {
      return document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || 0
    }

    let rafId: number | null = null
    let lastKnownScrollY = getScrollY()

    const handleScroll = () => {
      const currentScrollY = getScrollY()
      
      // Only process if scroll position actually changed
      if (Math.abs(currentScrollY - lastKnownScrollY) < 1) {
        return
      }
      
      // Determine scroll direction - OPPOSITE of header behavior
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down and past 100px - SHOW bottom bar
        if (scrollDirection.current !== 'down') {
          scrollDirection.current = 'down'
          gsap.to(bottomBar, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          })
        }
      } else if (currentScrollY < lastScrollY.current || currentScrollY <= 50) {
        // Scrolling up or near top - HIDE bottom bar
        if (scrollDirection.current !== 'up') {
          scrollDirection.current = 'up'
          gsap.to(bottomBar, {
            y: 40,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
          })
        }
      }

      lastScrollY.current = currentScrollY
      lastKnownScrollY = currentScrollY
    }

    // Set initial state (hidden)
    lastScrollY.current = getScrollY()
    gsap.set(bottomBar, { y: 40, opacity: 0 })

    // Use requestAnimationFrame to continuously check scroll position (works with Lenis)
    const checkScroll = () => {
      handleScroll()
      rafId = requestAnimationFrame(checkScroll)
    }
    rafId = requestAnimationFrame(checkScroll)
    
    // Also listen to native scroll events as additional trigger
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  // WhatsApp link - you can update this with your actual WhatsApp number
  const whatsappNumber = "+33612345678" // Replace with your actual WhatsApp number
  const whatsappMessage = encodeURIComponent("Bonjour, j'aimerais obtenir de l'aide.")
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`

  return (
    <footer
      ref={bottomBarRef}
      className="fixed bottom-0 left-0 right-0 z-50 w-full h-10"
    >
      <div className="h-full flex items-center w-full">
        {/* Left section - White background with backdrop (2/3 width) */}
        <div className="flex-1 md:flex-[2] h-full bg-white/70 backdrop-blur-md flex items-center justify-center md:justify-start px-4 md:px-6 gap-4 md:gap-6">
          <a
            href="/#contact"
            onClick={scrollToContact}
            className="group flex items-center gap-1.5 text-black/70 hover:text-black transition-all duration-300 text-[10px] md:text-xs font-light tracking-[0.1em] uppercase"
          >
            REQUEST SAMPLES
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" strokeWidth={1.5} />
          </a>
          <a
            href="/#contact"
            onClick={scrollToContact}
            className="group flex items-center gap-1.5 text-black/70 hover:text-black transition-all duration-300 text-[10px] md:text-xs font-light tracking-[0.1em] uppercase"
          >
            CONTACT US
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" strokeWidth={1.5} />
          </a>
        </div>

        {/* Right section - Same as navbar (1/3 width) */}
        <div className="flex-1 md:flex-[1] h-full bg-black/70 backdrop-blur-md flex items-center justify-center md:justify-end px-4 md:px-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-white/90 hover:text-white hover:opacity-100 transition-all duration-300 text-[10px] md:text-xs font-light tracking-[0.1em] uppercase drop-shadow-md"
          >
            NEED HELP? <span className="font-medium">CHAT</span> ON WHATSAPP
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  )
}
