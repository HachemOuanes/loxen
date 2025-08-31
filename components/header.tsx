"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = ["Accueil", "Philosophie", "Expertise", "Marques", "Inspirations", "Contact"]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/95 backdrop-blur-md border-b border-black/10" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div
              className={`text-4xl font-light tracking-[-0.02em] transition-colors duration-300 ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              L<span className="font-extralight opacity-60">O</span>X
              <span className="font-extralight opacity-60">E</span>N
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`transition-all duration-300 font-light text-sm tracking-[0.1em] uppercase hover:opacity-60 ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden hover:bg-transparent z-60 ${
                isScrolled ? "text-black hover:text-black/60" : "text-white hover:text-white/60"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/95 backdrop-blur-lg" onClick={() => setIsMobileMenuOpen(false)} />

        {/* Menu content */}
        <nav className="relative h-full flex flex-col justify-center items-center px-8">
          <div className="flex flex-col space-y-8 text-center">
            {navItems.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-white font-light text-2xl tracking-[0.1em] uppercase hover:opacity-60 transition-all duration-300 transform ${
                  isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : "0ms",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Decorative element */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="w-px h-16 bg-white/20" />
            <div className="w-2 h-2 bg-white/40 rounded-full mx-auto mt-2" />
          </div>
        </nav>
      </div>
    </>
  )
}
