"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState("")

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
    { label: "Secteurs", href: "/secteurs" },
    { label: "Produits", href: "/produits" },
    { label: "Inspirations", href: "/inspirations" },
    { label: "Catalogues", href: "/catalogues" },
    { label: "Conseils", href: "/conseils" },
    { label: "Contact", href: "/contact" },
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

  return (
    <>
      <header
        className={`fixed z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? `w-44 h-12 bg-white backdrop-blur-sm rounded-lg border-2 border-gray-200 shadow-sm ${
                isSidebarOpen ? "-translate-x-full" : "left-4"
              } top-4`
            : "w-[calc(100%-2rem)] sm:w-[calc(100%-2rem)] h-16 bg-black backdrop-blur-sm rounded-2xl left-4 top-4"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-full flex items-center px-4">
          <a
            href="/"
            className={`absolute transition-all duration-500 font-light tracking-[-0.02em] cursor-pointer hover:opacity-80 ${
              isScrolled
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
            className={`hidden md:flex items-center space-x-6 lg:space-x-12 transition-all duration-500 ml-auto ${
              isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-all duration-300 font-light text-xs lg:text-sm tracking-[0.1em] uppercase hover:opacity-60 text-white drop-shadow-md"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden hover:bg-transparent transition-all duration-500 text-white hover:text-white/60 drop-shadow-md ml-auto ${
              isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
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

      <div
        className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-white/95 backdrop-blur-xl border-r border-gray-200/30 z-40 transition-transform duration-500 ease-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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
                  className={`block text-black font-light text-base sm:text-lg tracking-[0.05em] uppercase hover:opacity-60 transition-all duration-300 transform ${
                    isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
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
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-lg" onClick={() => setIsMobileMenuOpen(false)} />

        <nav className="relative h-full flex flex-col justify-center items-center px-8">
          <div className="flex flex-col space-y-6 sm:space-y-8 text-center">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-white font-light text-xl sm:text-2xl tracking-[0.1em] uppercase hover:opacity-60 transition-all duration-300 transform ${
                  isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
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
