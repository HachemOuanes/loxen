import React from 'react'

interface SecteursHeroSectionProps {
  title: string
  description: string
  heroImage: string
  contactLink: string
  contactCta: string
}

export function SecteursHeroSection({ title, description, heroImage, contactLink, contactCta }: SecteursHeroSectionProps) {
  return (
    <section className="relative h-screen bg-white">
      {/* Full-screen background image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage || '/contemporary-cultural-center-glass-facade-paris.png'} 
          alt={`Secteur ${title}`} 
          className="h-full w-full object-cover" 
          loading="eager" 
          decoding="async" 
          fetchPriority="high" 
        />
      </div>

      {/* Text overlay */}
      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 py-16 flex flex-col justify-center">
        <div className='bg-white/20 backdrop-blur-sm w-fit py-6 px-6'>
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-3">
            <span className="h-[1px] w-8 bg-black/30" /> Secteurs
          </div>
          <h1 className="text-3xl md:text-6xl font-light tracking-tight text-black mb-4">{title}</h1>
          <p className="text-base md:text-lg text-black/70 leading-relaxed max-w-2xl mb-7">{description}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#examples" className="border border-black/20 px-5 py-2.5 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors">Voir les exemples</a>
            <a href={contactLink} className="border border-black/20 px-5 py-2.5 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors">{contactCta}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
