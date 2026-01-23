"use client"

import { useState } from 'react'

export function HeaderCompact() {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/secteurs', label: 'Secteurs' },
    { href: '/produits', label: 'Produits' },
    { href: '/#contact', label: 'Contact' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto h-14 px-4 flex items-center justify-between">
        <a href="/" className="text-lg tracking-[-0.02em] font-light text-black hover:opacity-80">
          L<span className="font-extralight opacity-60">O</span>X
          <span className="font-extralight opacity-60">E</span>N
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-black/80 hover:text-black transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          aria-label="Menu"
          className="md:hidden text-black/80 hover:text-black transition-colors"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <span className="text-base">✕</span>
          ) : (
            <span className="text-base">☰</span>
          )}
        </button>
      </div>
      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white/90 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-black/90 hover:text-black py-1"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
