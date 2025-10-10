"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { client, urlFor } from "@/lib/sanity"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState("")
  // Mega menu state
  const [megaOpen, setMegaOpen] = useState(false)
  const [activeMega, setActiveMega] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const startScaleXRef = useRef<number>(0.1)
  const originRef = useRef<{x:number;y:number}>({x:0,y:0})
  const openTlRef = useRef<gsap.core.Timeline | null>(null)
  const isClosingRef = useRef<boolean>(false)

  // Minimal product type and state for Interieur products list (first 4)
  type MiniProduct = {
    _id: string
    name: string
    slug: { current: string }
    description?: string
    image?: any
    category?: { _id: string; name: string }
  }
  const [miniProducts, setMiniProducts] = useState<MiniProduct[]>([])
  useEffect(() => {
    // Prefetch a few products once for the mega menu
    const fetchMini = async () => {
      try {
        const data: MiniProduct[] = await client.fetch(
          `*[_type == "productItem"] | order(featured desc, order asc)[0...4]{
            _id,
            name,
            slug,
            description,
            image,
            category->{ _id, name }
          }`
        )
        setMiniProducts(data || [])
      } catch (e) {
        console.error('Mega menu products fetch failed', e)
      }
    }
    fetchMini()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)

      // Detect current section
      const sections = ["interieur", "exterieur", "produits", "inspirations", "contact", "footer"]
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setCurrentSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { key: "secteurs", label: "Secteurs", href: "/secteurs" },
    { key: "produits", label: "Produits", href: "/produits" },
    { key: "inspirations", label: "Inspirations", href: "/inspirations" },
    { key: "catalogues", label: "Catalogues", href: "/catalogues" },
    { key: "conseils", label: "Conseils", href: "/conseils" },
    { key: "contact", label: "Contact", href: "/contact" },
  ]

  const getSectionDisplayName = (sectionId: string) => {
    switch (sectionId) {
      case "interieur": return "INTÉRIEUR"
      case "exterieur": return "EXTÉRIEUR"
      case "produits": return "PRODUITS"
      case "inspirations": return "INSPIRATIONS"
      case "contact": return "CONTACT"
      case "footer": return "LOXEN"
      default: return ""
    }
  }

  const handleMouseEnter = () => {
    if (isScrolled) {
      setIsSidebarOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (isScrolled) {
      setIsSidebarOpen(false)
    }
  }

  // Mega menu open/close helpers
  const positionPanel = () => {
    const headerEl = headerRef.current
    const panel = panelRef.current
    if (!headerEl || !panel) return { headerRect: null, panelRect: null }
    const headerRect = headerEl.getBoundingClientRect()
    // Place panel flush just below navbar (no extra spacing)
    const top = Math.max(0, headerRect.bottom)
    panel.style.top = `${top}px`
    panel.style.left = `16px`
    panel.style.right = `16px`
    panel.style.height = `75vh`
    return { headerRect, panelRect: panel.getBoundingClientRect() }
  }

  const openMega = (key: string) => {
    if (isScrolled) return // Only show in full header mode
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
    gsap.to(panel, { scaleX: startScaleX, scaleY: 0.1, duration: 0.45, ease: "power3.out", onComplete: () => {
      gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" as any })
      setMegaOpen(false)
      setActiveMega(null)
      isClosingRef.current = false
    } })
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

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed z-50 transition-all duration-500 ease-out ${isScrolled
            ? `w-44 h-12 bg-white backdrop-blur-sm border-2 border-gray-200 shadow-sm ${isSidebarOpen ? "-translate-x-full" : "left-4"
            } top-4`
            : "w-[calc(100%-2rem)] sm:w-[calc(100%-2rem)] h-16 bg-black backdrop-blur-sm left-4 top-4"
          }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-full flex items-center px-4">
          <a
            href="/"
            className={`absolute transition-all duration-500 font-light tracking-[-0.02em] cursor-pointer hover:opacity-80 ${isScrolled
                ? "text-xl text-black flex items-center gap-2 "
                : "left-4 text-2xl sm:text-4xl text-white drop-shadow-lg"
              }`}
          >
            {isScrolled && (
              <div>
                <Menu size={16} className="text-black/60 sm:w-5 sm:h-5" />
              </div>
            )}
            <div>
              {isScrolled && currentSection ? (
                currentSection === "footer" ? (
                  <>
                    L<span className="font-extralight opacity-60">O</span>X
                    <span className="font-extralight opacity-60">E</span>N
                  </>
                ) : (
                  <span className="text-lg font-light uppercase">
                    {getSectionDisplayName(currentSection)}
                  </span>
                )
              ) : (
                <>
                  L<span className="font-extralight opacity-60">O</span>X
                  <span className="font-extralight opacity-60">E</span>N
                </>
              )}
            </div>
          </a>

          <nav
            className={`hidden md:flex items-center space-x-6 lg:space-x-12 transition-all duration-500 ml-auto ${isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-all duration-300 font-light text-xs lg:text-sm tracking-[0.1em] uppercase hover:opacity-60 text-white drop-shadow-md"
                onMouseEnter={() => openMega(item.key)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden hover:bg-transparent transition-all duration-500 text-white hover:text-white/60 drop-shadow-md ml-auto ${isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
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
            className="absolute left-4 right-4 bg-black rounded-sm overflow-hidden"
            style={{ top: 0, height: "75vh" }}
          >
            <div ref={contentRef} className="h-full text-white pt-6 md:pt-8 px-4 md:px-6 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {activeMega === "produits" && (
                  <>
                    {/* Left: Interieur & Exterieur headings and short copy */}
                    <div className="md:col-span-4 space-y-8">
                      <div>
                        <h3 className="text-2xl font-light">
                          <span className="italic font-extralight">Intérieur</span>
                        </h3>
                        <p className="text-white/70 mt-2">Matériaux et systèmes pour l’agencement, cloisons, plans et revêtements.</p>
                        <a href="/produits" className="inline-block mt-4 border border-white/20 px-4 py-2 text-xs tracking-[0.14em] uppercase hover:bg-white hover:text-black transition-colors">Voir tous</a>
                      </div>
                      <div>
                        <h3 className="text-2xl font-light">
                          <span className="italic font-extralight">Extérieur</span>
                        </h3>
                        <p className="text-white/70 mt-2">Façades ventilées, bardages et solutions enveloppe du bâtiment.</p>
                        <div className="mt-3 inline-flex border border-white/20 px-3 py-1 text-[10px] tracking-[0.18em] uppercase text-white/70">Coming Soon</div>
                      </div>
                    </div>

                    {/* Right: Interieur products (first four) */}
                    <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {miniProducts.length === 0 && (
                        <div className="col-span-2 lg:col-span-4 text-white/60 text-sm">Aucun produit à afficher pour le moment.</div>
                      )}
                      {miniProducts.map((p) => (
                        <a key={p._id} href={`/produits/${p.slug?.current ?? ''}`} className="group border border-white/10 bg-white/0 hover:bg-white/5 transition-colors p-3 flex flex-col">
                          <div className="aspect-[4/3] overflow-hidden border border-white/10">
                            {p.image ? (
                              <img
                                src={urlFor(p.image).width(480).height(360).quality(80).url()}
                                alt={p.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full bg-white/5" />
                            )}
                          </div>
                          <div className="mt-3">
                            <div className="text-sm text-white leading-tight">{p.name}</div>
                            {p.category?.name && (
                              <div className="text-[11px] text-white/60 mt-1">{p.category.name}</div>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  </>
                )}

                {activeMega === "secteurs" && (
                  <>
                    <div className="md:col-span-4">
                      <h3 className="text-2xl font-light">Secteurs</h3>
                      <p className="text-white/70 mt-2">Intérieur, extérieur et projets spécifiques.</p>
                      <a href="/secteurs" className="inline-block mt-4 border border-white/20 px-4 py-2 text-xs tracking-[0.14em] uppercase hover:bg-white hover:text-black transition-colors">Explorer</a>
                    </div>
                    <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                      {["Résidentiel", "Bureaux", "Hôtellerie", "Éducation", "Retail", "Santé"].map((c) => (
                        <a key={c} href="/secteurs" className="group border border-white/10 bg-white/0 hover:bg-white/5 transition-colors p-4">
                          <div className="text-sm text-white">{c}</div>
                          <div className="mt-1 text-xs text-white/60">En savoir plus</div>
                        </a>
                      ))}
                    </div>
                  </>
                )}

                {activeMega === "inspirations" && (
                  <>
                    <div className="md:col-span-4">
                      <h3 className="text-2xl font-light">Inspirations</h3>
                      <p className="text-white/70 mt-2">Projets, tendances et références.</p>
                      <a href="/inspirations" className="inline-block mt-4 border border-white/20 px-4 py-2 text-xs tracking-[0.14em] uppercase hover:bg-white hover:text-black transition-colors">Voir la galerie</a>
                    </div>
                    <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                      {["Salle de bain HPL", "Façades ventilées", "Espaces publics", "Espaces de travail", "Retail", "Habitat"].map((c) => (
                        <a key={c} href="/inspirations" className="group border border-white/10 bg-white/0 hover:bg-white/5 transition-colors p-4">
                          <div className="text-sm text-white">{c}</div>
                          <div className="mt-1 text-xs text-white/60">Découvrir</div>
                        </a>
                      ))}
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
                    <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                      {["Plaquettes", "Nuanciers", "Guides techniques", "Fiches produits", "BIM", "Certifications"].map((c) => (
                        <a key={c} href="/catalogues" className="group border border-white/10 bg-white/0 hover:bg-white/5 transition-colors p-4">
                          <div className="text-sm text-white">{c}</div>
                          <div className="mt-1 text-xs text-white/60">Télécharger</div>
                        </a>
                      ))}
                    </div>
                  </>
                )}

                {activeMega === "conseils" && (
                  <>
                    <div className="md:col-span-4">
                      <h3 className="text-2xl font-light">Conseils</h3>
                      <p className="text-white/70 mt-2">Mise en œuvre, entretien et recommandations.</p>
                      <a href="/conseils" className="inline-block mt-4 border border-white/20 px-4 py-2 text-xs tracking-[0.14em] uppercase hover:bg-white hover:text-black transition-colors">Lire les articles</a>
                    </div>
                    <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                      {["Pose & fixation", "Entretien", "Compatibilités", "FAQ", "Normes", "Contact expert"].map((c) => (
                        <a key={c} href="/conseils" className="group border border-white/10 bg-white/0 hover:bg-white/5 transition-colors p-4">
                          <div className="text-sm text-white">{c}</div>
                          <div className="mt-1 text-xs text-white/60">Découvrir</div>
                        </a>
                      ))}
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
        className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-white/95 backdrop-blur-xl border-r border-gray-200/30 z-40 transition-transform duration-500 ease-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-6 sm:p-8 h-full flex flex-col">
          <div className="mb-8 sm:mb-12">
            <div className="text-2xl sm:text-3xl font-light tracking-[-0.02em] text-black mb-2">
              L<span className="font-extralight opacity-60">O</span>X
              <span className="font-extralight opacity-60">E</span>N
            </div>
            <div className="w-12 h-px bg-black/20"></div>
          </div>

          <nav className="flex-1">
            <div className="space-y-4 sm:space-y-6">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`block text-black font-light text-base sm:text-lg tracking-[0.05em] uppercase hover:opacity-60 transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                    }`}
                  style={{
                    transitionDelay: isSidebarOpen ? `${index * 50}ms` : "0ms",
                  }}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="mt-auto">
            <div className="text-xs text-black/40 uppercase tracking-[0.1em] font-light">
              Solutions Architecturales Premium
            </div>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-2">
                <a
                  href="/cms"
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CMS Access
                </a>
              </div>
            )}
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
                onClick={() => setIsMobileMenuOpen(false)}
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
