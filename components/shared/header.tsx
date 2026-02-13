"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { urlFor } from "@/lib/sanity"
import { Menu, X } from "lucide-react"
import { getSecteursForMegaMenu, getExteriorProductsForMegaMenu, getInteriorProductsForMegaMenu, getInspirationsForMegaMenu, getCataloguesForMegaMenu, getHomeApplicationsSection } from '@/services/sanity'
import { scrollToContact } from "@/lib/scroll-to-contact"
import { MegaMenuCard } from "./mega-menu-card"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Mega menu state
  const [megaOpen, setMegaOpen] = useState(false)
  const [activeMega, setActiveMega] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)
  const lastScrollY = useRef(0)
  const scrollDirection = useRef<'up' | 'down'>('up')
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const startScaleXRef = useRef<number>(0.1)
  const originRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const openTlRef = useRef<gsap.core.Timeline | null>(null)
  const isClosingRef = useRef<boolean>(false)

  // Minimal product type and state for products list (first 4)
  type MiniProduct = {
    _id: string
    title: string
    slug: { current: string }
    description?: string
    image?: any
    category?: string
    type: 'exterior' | 'interior'
  }
  const [miniProducts, setMiniProducts] = useState<MiniProduct[]>([])
  const [interiorProducts, setInteriorProducts] = useState<MiniProduct[]>([])
  const [secteurs, setSecteurs] = useState<any[]>([])
  const [inspirations, setInspirations] = useState<any[]>([])
  const [catalogues, setCatalogues] = useState<any[]>([])
  const [homeApplications, setHomeApplications] = useState<any>(null)

  useEffect(() => {
    // Prefetch products for the mega menu
    const fetchMini = async () => {
      try {
        // Fetch exterior products (current/available)
        const exteriorData: any[] = await getExteriorProductsForMegaMenu()

        // Fetch interior products
        const interiorData: any[] = await getInteriorProductsForMegaMenu()

        // Map to MiniProduct format
        const exteriorWithType = exteriorData.map(p => ({ 
          _id: p._id,
          title: p.title || '',
          slug: p.slug || { current: '' },
          description: p.heroSection?.overviewRightText || '',
          image: p.showcaseSection?.image || p.characteristicsSection?.defaultImage,
          type: 'exterior' as const, 
          category: 'Extérieur' 
        }))
        const interiorWithType = interiorData.map(p => ({ 
          _id: p._id,
          title: p.title || '',
          slug: p.slug || { current: '' },
          description: p.heroSection?.overviewRightText || '',
          image: p.showcaseSection?.image || p.characteristicsSection?.defaultImage,
          type: 'interior' as const, 
          category: 'Intérieur' 
        }))

        setMiniProducts(exteriorWithType || [])
        setInteriorProducts(interiorWithType || [])
      } catch (e) {
        console.error('Mega menu products fetch failed', e)
      }
    }

    // Fetch secteurs for the mega menu
    const fetchSecteurs = async () => {
      try {
        const secteursData = await getSecteursForMegaMenu()
        setSecteurs(secteursData || [])
      } catch (error) {
        console.error('Error fetching secteurs:', error)
      }
    }

    // Fetch inspirations for the mega menu
    const fetchInspirations = async () => {
      try {
        const inspirationsData = await getInspirationsForMegaMenu()
        setInspirations(inspirationsData || [])
      } catch (error) {
        console.error('Error fetching inspirations:', error)
      }
    }

    // Fetch catalogues for the mega menu
    const fetchCatalogues = async () => {
      try {
        const cataloguesData = await getCataloguesForMegaMenu()
        setCatalogues(cataloguesData || [])
      } catch (error) {
        console.error('Error fetching catalogues:', error)
      }
    }

    // Fetch home applications for mega menu cards
    const fetchHomeApplications = async () => {
      try {
        const applicationsData = await getHomeApplicationsSection()
        setHomeApplications(applicationsData)
      } catch (error) {
        console.error('Error fetching home applications:', error)
      }
    }

    fetchMini()
    fetchSecteurs()
    fetchInspirations()
    fetchCatalogues()
    fetchHomeApplications()
  }, [])


  const navItems = [
    { key: "secteurs", label: "Secteurs", href: "/secteurs" },
    { key: "produits", label: "Produits", href: "/" },
    { key: "inspirations", label: "Inspirations", href: "/" },
    { key: "catalogues", label: "Catalogues", href: "/catalogues" },
    { key: "contact", label: "Contact", href: "/#contact" },
  ]



  // Mega menu open/close helpers
  const positionPanel = () => {
    const headerEl = headerRef.current
    const panel = panelRef.current
    if (!headerEl || !panel) return { headerRect: null, panelRect: null }
    const headerRect = headerEl.getBoundingClientRect()
    // Place panel flush just below navbar (no extra spacing)
    const top = Math.max(0, headerRect.bottom)
    panel.style.top = `${top}px`
    panel.style.left = `0px`
    panel.style.right = `0px`
    panel.style.height = `80vh`
    return { headerRect, panelRect: panel.getBoundingClientRect() }
  }

  const openMega = (key: string) => {
    setActiveMega(key)
    if (!megaOpen) {
      setMegaOpen(true)
      requestAnimationFrame(() => {
        const overlay = overlayRef.current
        const panel = panelRef.current
        if (!overlay || !panel) return
        const { headerRect, panelRect } = positionPanel()
        if (!headerRect || !panelRect) return
        gsap.set(overlay, { autoAlpha: 1, pointerEvents: "auto" as any })
        // Hide content until fully opened
        if (contentRef.current) {
          const kids = Array.from(contentRef.current.children) as HTMLElement[]
          gsap.set(kids, { autoAlpha: 0 })
        }
        const headerCenterX = headerRect.left + headerRect.width / 2
        const originXInPanel = headerCenterX - panelRect.left
        const originYInPanel = 0
        const targetWidth = panelRect.width
        const startScaleX = Math.max(0.05, Math.min(1, headerRect.width / targetWidth))
        startScaleXRef.current = startScaleX
        originRef.current = { x: originXInPanel, y: originYInPanel }
        gsap.killTweensOf(panel)
        gsap.set(panel, { scaleX: startScaleX, scaleY: 0.1, transformOrigin: `${originXInPanel}px ${originYInPanel}px`, willChange: "transform" })
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
        tl.to(panel, { scaleX: 1, scaleY: 1, duration: 0.5 })
        tl.eventCallback("onComplete", () => {
          isClosingRef.current = false
          if (contentRef.current) {
            const kids = Array.from(contentRef.current.children) as HTMLElement[]
            gsap.fromTo(kids, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.04, ease: "power3.out" })
          }
        })
        tl.eventCallback("onReverseComplete", () => {
          if (!overlayRef.current) return
          gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" as any })
          setMegaOpen(false)
          setActiveMega(null)
        })
        openTlRef.current = tl
        tl.play(0)
      })
    } else {
      // Switch content smoothly
      if (contentRef.current) {
        const kids = Array.from(contentRef.current.children) as HTMLElement[]
        gsap.fromTo(kids, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.25, stagger: 0.04, ease: "power2.out" })
      }
    }
  }

  const closeMega = () => {
    if (!megaOpen) return
    if (isClosingRef.current) return
    isClosingRef.current = true
    const tl = openTlRef.current
    if (tl) {
      // Fade out inner content first, then reverse the panel timeline
      if (contentRef.current) {
        const kids = Array.from(contentRef.current.children) as HTMLElement[]
        gsap.killTweensOf(kids)
        gsap.to(kids, {
          autoAlpha: 0,
          y: 8,
          duration: 0.18,
          stagger: 0.025,
          ease: "power2.out",
          onComplete: () => {
            tl.timeScale(1)
            tl.reverse()
          },
        })
      } else {
        tl.timeScale(1)
        tl.reverse()
      }
      return
    }
    // Fallback (should rarely happen)
    const overlay = overlayRef.current
    const panel = panelRef.current
    if (!overlay || !panel) {
      setMegaOpen(false)
      setActiveMega(null)
      return
    }
    const { x, y } = originRef.current
    const startScaleX = startScaleXRef.current || 0.1
    gsap.set(panel, { transformOrigin: `${x}px ${y}px` })
    gsap.to(panel, {
      scaleX: startScaleX, scaleY: 0.1, duration: 0.45, ease: "power3.out", onComplete: () => {
        gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" as any })
        setMegaOpen(false)
        setActiveMega(null)
        isClosingRef.current = false
      }
    })
  }

  // Close when hovering outside the panel area: if mouse is on the overlay itself (not the panel)
  const handleOverlayPointer = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!megaOpen || !overlayRef.current) return
    if (e.target === overlayRef.current) closeMega()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMega()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Scroll-based hide/show animation (works with Lenis smooth scroll)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const header = headerRef.current
    if (!header) return

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
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down and past 100px - hide header and close mega menu
        if (scrollDirection.current !== 'down') {
          scrollDirection.current = 'down'
          // Close mega menu if open
          if (megaOpen) {
            closeMega()
          }
          gsap.to(header, {
            y: -100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
          })
        }
      } else if (currentScrollY < lastScrollY.current || currentScrollY <= 50) {
        // Scrolling up or near top - show header
        if (scrollDirection.current !== 'up') {
          scrollDirection.current = 'up'
          gsap.to(header, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          })
        }
      }

      lastScrollY.current = currentScrollY
      lastKnownScrollY = currentScrollY
    }

    // Set initial state
    lastScrollY.current = getScrollY()
    gsap.set(header, { y: 0, opacity: 1 })

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
  }, [megaOpen, closeMega])


  return (
    <>
      <header
        ref={headerRef}
          className={`fixed top-0 left-0 right-0 z-50 w-full h-16 bg-black/70 backdrop-blur-md ${
            megaOpen 
              ? 'rounded-b-none' 
              : ''
          }`}
      >
        <div className="h-full flex items-center px-6 md:px-8">
          <a
            href="/"
            className="absolute left-6 md:left-8 text-2xl sm:text-4xl text-white drop-shadow-lg font-light tracking-[-0.02em] cursor-pointer hover:opacity-80"
          >
                  L<span className="font-extralight opacity-60">O</span>X
                  <span className="font-extralight opacity-60">E</span>N
          </a>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-12 ml-auto">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="transition-all duration-300 font-light text-xs lg:text-sm tracking-[0.1em] uppercase hover:opacity-60 text-white drop-shadow-md cursor-pointer"
                onMouseEnter={() => openMega(item.key)}
                onClick={() => {
                  if (item.key === 'contact') {
                    closeMega()
                    scrollToContact()
                  }
                }}
              >
                {item.label}
              </div>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-transparent text-white hover:text-white/60 drop-shadow-md ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={20} className="sm:w-6 sm:h-6" />
            ) : (
              <Menu size={20} className="sm:w-6 sm:h-6" />
            )}
          </Button>
        </div>
      </header>

      {/* Mega menu overlay (desktop) */}
      <div
        ref={overlayRef}
        className={`hidden md:block fixed inset-0 z-40`} // visibility controlled by gsap
        onMouseLeave={closeMega}
        onMouseMove={handleOverlayPointer}
        style={{ pointerEvents: megaOpen ? "auto" : "none", opacity: 0 as any }}
      >
        <div
          ref={panelRef}
          className="absolute left-0 right-0 bg-black/70 backdrop-blur-md overflow-hidden rounded-tl-none rounded-tr-none"
          style={{ top: 0, height: "80vh" }}
        >
          <div ref={contentRef} className="h-full text-white pt-6 md:pt-8 px-4 md:px-6 max-w-7xl mx-auto overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {activeMega === "produits" && (
                <>
                  {/* Left half: Intérieur */}
                  <div className="md:col-span-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-light">
                        <span className="italic font-extralight">Intérieur</span>
                      </h3>
                      <p className="text-white/70 mt-2">Matériaux et systèmes pour l'agencement, cloisons, plans et revêtements.</p>
                    </div>

                    {/* Intérieur big card */}
                    {homeApplications?.interiorCard?.image && (
                      <a 
                        href={homeApplications.interiorCard.link || "/produits/interieur"} 
                        className="block mb-4 group border border-white/10 bg-white/0 hover:bg-white/5 transition-colors p-3"
                      >
                        <div className="relative aspect-[6/1] overflow-hidden border border-white/10">
                          <img
                            src={urlFor(homeApplications.interiorCard.image).width(600).height(100).quality(90).url()}
                            alt={homeApplications.interiorCard.title || "Intérieur"}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-700"></div>
                          <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none z-20"></div>
                          {homeApplications.interiorCard.title && (
                            <div className="absolute inset-0 flex flex-col justify-center items-center p-3 z-30">
                              <h3 className="text-xl md:text-2xl font-medium text-white mb-1 tracking-[-0.02em] text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                                {homeApplications.interiorCard.title}
                              </h3>
                            </div>
                          )}
                        </div>
                      </a>
                    )}

                    {/* Intérieur products grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {interiorProducts.length === 0 ? (
                        <div className="col-span-2 text-white/60 text-sm">Aucun produit à afficher pour le moment.</div>
                      ) : (
                        interiorProducts.map((p) => (
                          <MegaMenuCard
                            key={`int-${p._id}`}
                            image={p.image}
                            title={p.title}
                            description={p.category}
                            link={`/produits/${p.slug?.current ?? ''}`}
                            aspectRatio="4/3"
                          />
                        ))
                      )}
                    </div>
                  </div>

                  {/* Right half: Extérieur (Current Products) */}
                  <div className="md:col-span-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-light">
                        <span className="italic font-extralight">Extérieur</span>
                      </h3>
                      <p className="text-white/70 mt-2">Façades ventilées, bardages et solutions enveloppe du bâtiment.</p>
                    </div>

                    {/* Extérieur big card */}
                    {homeApplications?.exteriorCard?.image && (
                      <a 
                        href={homeApplications.exteriorCard.link || "/produits/exterieur"} 
                        className="block mb-4 group border border-white/10 bg-white/0 hover:bg-white/5 transition-colors p-3"
                      >
                        <div className="relative aspect-[6/1] overflow-hidden border border-white/10">
                          <img
                            src={urlFor(homeApplications.exteriorCard.image).width(600).height(100).quality(90).url()}
                            alt={homeApplications.exteriorCard.title || "Extérieur"}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-700"></div>
                          <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none z-20"></div>
                          {homeApplications.exteriorCard.title && (
                            <div className="absolute inset-0 flex flex-col justify-center items-center p-3 z-30">
                              <h3 className="text-xl md:text-2xl font-medium text-white mb-1 tracking-[-0.02em] text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                                {homeApplications.exteriorCard.title}
                              </h3>
                            </div>
                          )}
                        </div>
                      </a>
                    )}

                    {/* Extérieur products grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {miniProducts.length === 0 ? (
                        <div className="col-span-2 text-white/60 text-sm">Aucun produit à afficher pour le moment.</div>
                      ) : (
                        miniProducts.map((p) => (
                          <MegaMenuCard
                            key={p._id}
                            image={p.image}
                            title={p.title}
                            description={p.category}
                            link={`/produits/${p.slug?.current ?? ''}`}
                            aspectRatio="4/3"
                          />
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}

              {activeMega === "secteurs" && (
                <>
                  {/* Left half: Métier */}
                  <div className="md:col-span-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-light">
                        <span className="italic font-extralight">Métier</span>
                      </h3>
                      <p className="text-white/70 mt-2">Solutions spécialisées pour les professionnels et leurs projets spécifiques.</p>
                    </div>

                    {/* Métier items grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {(() => {
                        const metierItems = secteurs.filter((s) => s.type === 'metier')
                        if (metierItems.length === 0) {
                          return <div className="col-span-2 text-white/60 text-sm">Aucun métier à afficher pour le moment.</div>
                        }
                        return metierItems.map((s) => (
                          <MegaMenuCard
                            key={s.slug?.current || s.slug}
                            image={s.heroImage}
                            title={s.title}
                            description={s.description}
                            link={`/secteurs/${s.slug?.current || s.slug}`}
                            aspectRatio="4/3"
                          />
                        ))
                      })()}
                    </div>
                  </div>

                  {/* Right half: Branche */}
                  <div className="md:col-span-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-light">
                        <span className="italic font-extralight">Branche</span>
                      </h3>
                      <p className="text-white/70 mt-2">Secteurs d'activité et domaines d'application de nos solutions.</p>
                    </div>

                    {/* Branche items grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {(() => {
                        const brancheItems = secteurs.filter((s) => s.type === 'branche' || !s.type)
                        if (brancheItems.length === 0) {
                          return <div className="col-span-2 text-white/60 text-sm">Aucune branche à afficher pour le moment.</div>
                        }
                        return brancheItems.map((s) => (
                          <MegaMenuCard
                            key={s.slug?.current || s.slug}
                            image={s.heroImage}
                            title={s.title}
                            description={s.description}
                            link={`/secteurs/${s.slug?.current || s.slug}`}
                            aspectRatio="4/3"
                          />
                        ))
                      })()}
                    </div>
                  </div>
                </>
              )}

              {activeMega === "inspirations" && (
                <>
                  <div className="md:col-span-4">
                    <h3 className="text-2xl font-light">Inspirations</h3>
                    <p className="text-white/70 mt-2">Découvrez nos réalisations HPL dans différents espaces.</p>
                    <a href="/inspirations" className="inline-block mt-4 border border-white/20 px-4 py-2 text-xs tracking-[0.14em] uppercase hover:bg-white hover:text-black transition-colors">Explorer</a>
                  </div>
                  <div className="md:col-span-8 grid grid-cols-2 gap-3">
                    {inspirations.length === 0 ? (
                      <div className="col-span-2 text-white/60 text-sm">Inspirations en cours de chargement...</div>
                    ) : (
                      inspirations.map((inspiration) => (
                        <MegaMenuCard
                          key={inspiration._id}
                          image={inspiration.heroImage}
                          title={inspiration.title}
                          description={inspiration.description}
                          link={`/inspirations/${inspiration.slug?.current || inspiration.slug}`}
                          aspectRatio="4/3"
                        />
                      ))
                    )}
                  </div>
                </>
              )}

              {activeMega === "catalogues" && (
                <>
                  <div className="md:col-span-4">
                    <h3 className="text-2xl font-light">Catalogues</h3>
                    <p className="text-white/70 mt-2">Téléchargez nos documents et fiches techniques.</p>
                    <a href="/catalogues" className="inline-block mt-4 border border-white/20 px-4 py-2 text-xs tracking-[0.14em] uppercase hover:bg-white hover:text-black transition-colors">Accéder</a>
                  </div>
                  <div className="md:col-span-8 grid grid-cols-2 gap-3">
                    {catalogues && catalogues.length > 0 ? (
                      catalogues.map((catalogue) => (
                        <MegaMenuCard
                          key={catalogue.id || catalogue._id}
                          image={catalogue.megamenuImage}
                          title={catalogue.title}
                          description={catalogue.description}
                          link={`/catalogues#${catalogue.id}`}
                          aspectRatio="4/3"
                        />
                      ))
                    ) : (
                      <div className="col-span-2 text-white/60 text-sm">Chargement...</div>
                    )}
                  </div>
                </>
              )}

              {activeMega === "contact" && (
                <>
                  <div className="md:col-span-12 md:max-w-3xl">
                    <h3 className="text-2xl font-light">Contact</h3>
                    <p className="text-white/70 mt-2">Parlez-nous de votre projet, nous revenons vers vous rapidement.</p>
                    <form className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-light text-white/70 tracking-widest uppercase">Nom</label>
                          <Input placeholder="Votre nom" className="bg-transparent border-0 border-b border-white/20 text-white placeholder:text-white/40 focus:border-white/60 h-14 rounded-none px-0 text-lg font-light focus-visible:ring-0" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-light text-white/70 tracking-widest uppercase">Email</label>
                          <Input type="email" placeholder="vous@email.com" className="bg-transparent border-0 border-b border-white/20 text-white placeholder:text-white/40 focus:border-white/60 h-14 rounded-none px-0 text-lg font-light focus-visible:ring-0" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-light text-white/70 tracking-widest uppercase">Message</label>
                        <Textarea rows={6} placeholder="Parlez-nous de votre projet..." className="bg-transparent border-0 border-b border-white/20 text-white placeholder:text-white/40 focus:border-white/60 resize-none rounded-none px-0 text-lg font-light focus-visible:ring-0" />
                      </div>
                      <Button type="submit" className="bg-white text-black hover:bg-white/90 rounded-none tracking-[0.18em] uppercase text-xs h-12 px-8">Envoyer</Button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-lg" onClick={() => setIsMobileMenuOpen(false)} />

        <nav className="relative h-full flex flex-col justify-center items-center px-8">
          <div className="flex flex-col space-y-6 sm:space-y-8 text-center">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-white font-light text-xl sm:text-2xl tracking-[0.1em] uppercase hover:opacity-60 transition-all duration-300 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : "0ms",
                }}
                onClick={(e) => {
                  setIsMobileMenuOpen(false)
                  if (item.key === 'contact') {
                    e.preventDefault()
                    scrollToContact()
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="w-px h-16 bg-white/20" />
            <div className="w-2 h-2 bg-white/40 rounded-full mx-auto mt-2" />
          </div>
        </nav>
      </div>
    </>
  )
}
