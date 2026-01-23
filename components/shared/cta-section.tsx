"use client"

import { scrollToContact } from '@/lib/scroll-to-contact'

interface CtaSectionProps {
  title: string
  description: string
  contactLink: string
  contactCta: string
}

export function CtaSection({ title, description, contactLink, contactCta }: CtaSectionProps) {
  const normalizedLink = contactLink || '/#contact'
  const handleClick = contactLink === '/#contact' || !contactLink ? scrollToContact : undefined

  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
        <h3 className="js-reveal text-2xl md:text-3xl lg:text-4xl text-black tracking-tight">Parlons de votre {title.toLowerCase()}</h3>
        <p className="js-reveal mt-4 text-lg md:text-xl text-black/70 leading-relaxed">
          {description}
        </p>
        <a href={normalizedLink} onClick={handleClick} className="js-reveal mt-8 inline-block border border-black/20 px-6 py-3 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors">{contactCta}</a>
      </div>
    </section>
  )
}
