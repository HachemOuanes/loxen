"use client"

import React from 'react'

interface CtaSectionProps {
  title: string
  description: string
  contactLink: string
  contactCta: string
}

export function CtaSection({ title, description, contactLink, contactCta }: CtaSectionProps) {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
        <h3 className="js-reveal text-2xl md:text-3xl font-light tracking-tight text-black">Parlons de votre {title.toLowerCase()}</h3>
        <p className="js-reveal mt-4 text-black/70 leading-relaxed">
          {description}
        </p>
        <a href={contactLink} className="js-reveal mt-8 inline-block border border-black/20 px-6 py-3 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors">{contactCta}</a>
      </div>
    </section>
  )
}
