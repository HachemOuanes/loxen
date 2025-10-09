"use client"

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type BathroomHPLSectionsProps = {
  title?: string
  description?: string
}

export function BathroomHPLSections({
  title = 'Salle de bain',
  description =
  "Pratique et fonctionnel. Grâce à sa résistance à l’humidité et à l’usure, le HPL permet d’imaginer des salles de bains comme de véritables espaces de détente, sans renoncer à la performance au quotidien.",
}: BathroomHPLSectionsProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const stickyHeroRef = useRef<HTMLDivElement | null>(null)


  // Sticky hero: image scales down and moves right, text reveals on the left
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const hero = stickyHeroRef.current
    if (!hero) return
    const figure = hero.querySelector('.js-hero-figure') as HTMLElement | null
    const text = hero.querySelector('.js-hero-text') as HTMLElement | null
    if (!figure) return

    // Performance hints
    gsap.set([figure], { willChange: 'transform', force3D: true })
    gsap.set(figure, { xPercent: 0, scale: 1, transformOrigin: '50% 50%' })

    const mm = gsap.matchMedia()
    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const { isDesktop, reduce } = ctx.conditions as any
        const pinning = false // rely on CSS sticky to avoid jump
        const scrub = reduce ? false : 1.5

        const containerHeight = hero.offsetHeight;
        const figureHeight = figure.offsetHeight;
        const yDistance = containerHeight - figureHeight;
        const maxYPercent = ((yDistance) / figureHeight) * 100;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: () => "bottom bottom", // dynamic end
            scrub: 0,
            pin: pinning,
            anticipatePin: 0,
            invalidateOnRefresh: true,
          },
        });

        const width = text ? text.offsetWidth : 0;
        const innerWidth = window.innerWidth;
        const xPixels = (innerWidth - width);
        const figureWidth = figure.offsetWidth;
        console.log(figureWidth);

        console.log(width, innerWidth);

        gsap.set(figure, { transformOrigin: `${innerWidth - xPixels - 140}px center` });
        // Move image to the right while scaling down
        tl.fromTo(
          figure,
          { scaleY: 1.0, scaleX: 1.0, x: 0, xPercent: 0, yPercent: 0, immediateRender: false },
          { scaleY: 0.6, scaleX: 0.6, x: 0, xPercent: 0.2, yPercent: maxYPercent, ease: 'none' }
        )
        // Reveal left text
        // tl.fromTo(
        //   texts,
        //   { autoAlpha: 0, y: 40 },
        //   { autoAlpha: 1, y: 0, stagger: 0.12, duration: 1, ease: 'none' },
        //   0.4
        // )

        // // Hold state at the end so the section "sticks" briefly after everything is in place
        // tl.to(figure, { scale: 0.74, xPercent: 36, yPercent: 14, duration: 1, ease: 'none' })

        return () => tl.scrollTrigger?.kill()
      }
    )
  }, [])

  // (Removed sticky split pinning in favor of simpler alternating sections)

  // Reveal & parallax utilities
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const root = rootRef.current
    if (!root) return
    const ctx = gsap.context(() => {
      const revealEls = gsap.utils.toArray<HTMLElement>('.js-reveal')
      revealEls.forEach((el, i) => {
        const tl = gsap.timeline({
          delay: Math.min(0.15, i * 0.04),
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
        tl.fromTo(el, { autoAlpha: 0, y: 36, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' })
      })

      const parallaxEls = gsap.utils.toArray<HTMLElement>('.js-parallax')
      parallaxEls.forEach((el) => {
        const raw = Number(el.getAttribute('data-speed') || '0.25')
        const strength = gsap.utils.clamp(0.02, 0.1, raw * 0.25) // map old speed to subtle scale
        const img = (el.querySelector('img') as HTMLElement) || el
        gsap.set(img, { willChange: 'transform', force3D: true, transformOrigin: '50% 50%' })
        gsap.fromTo(
          img,
          { scale: 1 },
          {
            scale: () => 1.4 + strength,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.4,
            },
          }
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef}>
      {/* Sticky hero (image scales down, text reveals) */}
      <section className="relative bg-white">
        {/* Full-viewport overlay image that animates to the right */}
        <div ref={stickyHeroRef} className='h-[200vh]'>
          <img src="/salle-de-bain/solid-top-piano-hpl-bagni-02.jpg" alt="Plan vasque HPL effet bois" className="js-hero-figure h-screen w-full object-cover" loading="eager" decoding="async" fetchPriority="high" />

          <div className="relative h-screen max-w-7xl mx-auto px-4 md:px-6 py-16 gap-6 js-hero-text flex flex-col justify-center">
            <div className='bg-white/50 backdrop-blur-sm w-fit p-4'>
              <div className=''>
                <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-3">
                  <span className="h-[1px] w-8 bg-black/30" /> Inspirations
                </div>
                <h1 className="text-3xl md:text-6xl font-light tracking-tight text-black mb-4 ">{title}</h1>
              </div>
              <div className="">
                <p className="text-base md:text-lg text-black/70 leading-relaxed max-w-2xl">{description}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#examples" className="border border-black/20 px-5 py-2.5 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors">Voir les exemples</a>
                  <a href="/contact" className="border border-black/20 px-5 py-2.5 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors">Nous contacter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications en salle de bain — 3 sections alternées */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-6">
            <span className="h-[1px] w-8 bg-black/20" /> Applications en salle de bain
          </div>

          {/* 1. Baignoires encastrées (image gauche) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-12">
            <div className="md:col-span-6">
              <div className="js-reveal relative h-[50vh] md:h-[60vh] overflow-hidden border border-black/10">
                <img src="/salle-de-bain/solid-top-piano-hpl-bagni-vasche-integrate-01.png" alt="Baignoires encastrées HPL" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="md:col-span-6">
              <p className="js-reveal mb-2 text-xs uppercase tracking-[0.18em] text-black/60">Baignoires encastrées</p>
              <h3 className="js-reveal text-2xl md:text-3xl font-light tracking-tight text-black">HB460 / HB680</h3>
              <p className="js-reveal mt-4 text-black/70 leading-relaxed">Baignoires intégrées avec fond incliné et bac d’évacuation continu, conçues pour optimiser le confort et l’hygiène dans les salles de bains.</p>
              <ul className="js-reveal mt-5 space-y-2 text-black/75">
                {['Fond incliné', 'Bac d’évacuation continu', 'Conception pour milieux humides'].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm"><span className="h-1.5 w-1.5 rounded-full bg-black/60" />{t}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 2. Meubles & rangements (texte gauche, image droite) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-12">
            <div className="md:col-span-6 order-2 md:order-1">
              <p className="js-reveal mb-2 text-xs uppercase tracking-[0.18em] text-black/60">Meubles & rangements</p>
              <h3 className="js-reveal text-2xl md:text-3xl font-light tracking-tight text-black">Modules coordonnés</h3>
              <p className="js-reveal mt-4 text-black/70 leading-relaxed">Façades, étagères et rangements aux finitions coordonnées au plan vasque. Chants soignés, stabilité dimensionnelle et entretien facilité.</p>
              <ul className="js-reveal mt-5 space-y-2 text-black/75">
                {['Façades assorties', 'Étagères et modules', 'Chants et raccords précis'].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm"><span className="h-1.5 w-1.5 rounded-full bg-black/60" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-6 order-1 md:order-2">
              <div className="js-reveal relative h-[50vh] md:h-[60vh] overflow-hidden border border-black/10">
                <img src="/salle-de-bain/solid-top-piano-hpl-bagni-02.jpg" alt="Meubles et rangements HPL" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>

          {/* 3. Murs & parois de douche (image gauche) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6">
              <div className="js-reveal relative h-[50vh] md:h-[60vh] overflow-hidden border border-black/10">
                <img src="/salle-de-bain/solid-top-piano-hpl-bagni-03.png" alt="Murs et parois de douche HPL" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="md:col-span-6">
              <p className="js-reveal mb-2 text-xs uppercase tracking-[0.18em] text-black/60">Murs & parois de douche</p>
              <h3 className="js-reveal text-2xl md:text-3xl font-light tracking-tight text-black">Revêtements résistants</h3>
              <p className="js-reveal mt-4 text-black/70 leading-relaxed">Revêtements HPL non poreux, résistants à l’humidité et aux taches. Grands formats pour réduire les joints, nettoyage rapide au quotidien.</p>
              <ul className="js-reveal mt-5 space-y-2 text-black/75">
                {['Grands formats', 'Surface non poreuse', 'Entretien simplifié'].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm"><span className="h-1.5 w-1.5 rounded-full bg-black/60" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>



      {/* Collage showcase with parallax on images */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Top row: two parallax images */}
            <div className="js-parallax relative overflow-hidden rounded-sm border border-black/10" data-speed="0.35">
              <img src="/salle-de-bain/solid-top-piano-hpl-bagni-vasche-integrate-02.jpg" alt="Détail vasque marbre" className="h-full w-full object-cover" />
            </div>
            <div className="js-parallax relative overflow-hidden rounded-sm border border-black/10" data-speed="0.2">
              <img src="/salle-de-bain/solid-top-piano-hpl-bagni-02.jpg" alt="Rangement coordonné bois" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 py-12">
            {/* Bottom row: two text tiles with contrasting styles */}
            <div className="js-reveal px-4 md:px-6 text-left max-w-[50ch]">
              <p className="uppercase tracking-[0.18em] text-[11px] md:text-xs text-black/60">Matières & volumes</p>
              <h4 className="mt-2 text-2xl md:text-3xl font-light tracking-tight text-black leading-tight">Lignes nettes</h4>
              <p className="mt-2 text-base md:text-lg text-black/75 italic leading-snug">Chaleur du bois, précision du HPL. Surfaces stables et durables, pensées pour des agencements sur‑mesure et un entretien simplifié.</p>
            </div>
            <div className="relative overflow-hidden flex items-center justify-end bg-white">
              <div className="js-reveal px-4 md:px-6 text-right max-w-[50ch] ml-auto">
                <p className="uppercase tracking-[0.18em] text-[11px] md:text-xs text-black/60">Usage quotidien</p>
                <h4 className="mt-2 text-2xl md:text-3xl font-light tracking-tight text-black leading-tight">Fluidité & confort</h4>
                <p className="mt-2 text-base md:text-lg text-black/75 italic leading-snug">Résistant, durable, élégant. Surfaces non poreuses, faciles à nettoyer, pensées pour un usage intensif sans compromis esthétique.</p>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Finitions: TOP A / D / S */}
      < section className="relative bg-white py-16 md:py-24" >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-6">
            <span className="h-[1px] w-8 bg-black/20" /> Les types de finitions
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* TOP A */}
            <article className="js-reveal border border-black/10 bg-white overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="/finitions/solid-top-HPL-TOP-A.jpg" alt="TOP A — Corsé et épais" className="h-full w-full object-cover" />
              </div>
              <div className="p-5 md:p-6">
                <h4 className="text-lg md:text-xl font-medium tracking-tight text-black">TOP A</h4>
                <p className="text-sm uppercase tracking-[0.14em] text-black/60">Corsé et épais</p>
                <p className="mt-3 text-black/70 leading-relaxed">Entièrement fabriqué en stratifié HPL renforcé de contreplaqué de peuplier, il permet la réalisation de plateaux très épais (de 20 mm à 160 mm).</p>
              </div>
            </article>

            {/* TOP D */}
            <article className="js-reveal border border-black/10 bg-white overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="/finitions/solid-top-HPL-TOP-D.jpg" alt="TOP D — Minimaliste et élégant" className="h-full w-full object-cover" />
              </div>
              <div className="p-5 md:p-6">
                <h4 className="text-lg md:text-xl font-medium tracking-tight text-black">TOP D</h4>
                <p className="text-sm uppercase tracking-[0.14em] text-black/60">Minimaliste et élégant</p>
                <p className="mt-3 text-black/70 leading-relaxed">Entièrement fabriqué en HPL laminé, il présente un style minimaliste et essentiel. Il permet également de créer des formes courbes et à motifs et est idéal pour les plans de travail de cuisine, de salle de bain, de bureau et de table pour les espaces commerciaux et publics (12 mm d'épaisseur).</p>
              </div>
            </article>

            {/* TOP S */}
            <article className="js-reveal border border-black/10 bg-white overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="/finitions/solid-top-HPL-TOP-S.jpg" alt="TOP S — Doux et essentiel" className="h-full w-full object-cover" />
              </div>
              <div className="p-5 md:p-6">
                <h4 className="text-lg md:text-xl font-medium tracking-tight text-black">TOP S</h4>
                <p className="text-sm uppercase tracking-[0.14em] text-black/60">Doux et essentiel</p>
                <p className="mt-3 text-black/70 leading-relaxed">Le dernier-né de la gamme de plateaux disponibles. Il offre le même potentiel et les mêmes caractéristiques techniques que le Top D, mais présente une découpe terminale chanfreinée qui souligne son élégance (12 mm d'épaisseur).</p>
              </div>
            </article>
          </div>

          {/* Schémas techniques (optionnel) */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="js-reveal border border-black/10 p-4 bg-white">
              <img src="/finitions/solid-top-HPL-TOP-A-schema.jpg" alt="Schéma TOP A" className="mx-auto h-auto w-full object-contain" />
            </div>
            <div className="js-reveal border border-black/10 p-4 bg-white">
              <img src="/finitions/solid-top-HPL-TOP-D-schema.jpg" alt="Schéma TOP D" className="mx-auto h-auto w-full object-contain" />
            </div>
            <div className="js-reveal border border-black/10 p-4 bg-white">
              <img src="/finitions/solid-top-HPL-TOP-S-schema.jpg" alt="Schéma TOP S" className="mx-auto h-auto w-full object-contain" />
            </div>
          </div>
        </div>
      </section >

      {/* Monolithes, plans et épaules */}
      < section className="relative bg-white py-16 md:py-24" >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-6">
            <span className="h-[1px] w-8 bg-black/20" /> Monolithes, plans & épaules
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="js-reveal md:col-span-6">
              <h4 className="text-2xl md:text-3xl font-light tracking-tight text-black">Joint à 45°</h4>
              <p className="mt-4 text-black/70 leading-relaxed">Avec les modèles TOP D et TOP S, il est possible de réaliser des joints à 45° entre le dessus, les côtés et le dos (ancrés par des tirants spéciaux haute résistance), créant ainsi des monolithes uniques aux finitions pierre, métal ou béton. Disponible dans toutes les variantes de couleurs dans le nuancier.</p>
            </div>
            <div className="md:col-span-6 grid grid-cols-2 gap-4">
              <div className="js-reveal border border-black/10 overflow-hidden">
                <img src="/finitions/solid-top-HPL-monolite.jpg" alt="Monolithe HPL" className="h-full w-full object-cover" />
              </div>
              <div className="js-reveal border border-black/10 overflow-hidden">
                <img src="/finitions/profili-top-monolite.jpg" alt="Profilé monolithe" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Materials grid & CTA */}
      < section id="examples" className="relative bg-white py-20 md:py-28" >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-4">
            <span className="h-[1px] w-8 bg-black/20" /> Exemples de rendus
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { src: '/salle-de-bain/solid-top-piano-hpl-bagni-01.jpg', label: 'Plan vasque — marbre' },
              { src: '/salle-de-bain/solid-top-piano-hpl-bagni-02.jpg', label: 'Plan vasque — bois' },
              { src: '/salle-de-bain/solid-top-piano-hpl-bagni-03.png', label: 'Large format — continuité' },
              { src: '/salle-de-bain/solid-top-piano-hpl-bagni-vasche-integrate-01.png', label: 'Vasques intégrées — marbre' },
              { src: '/salle-de-bain/solid-top-piano-hpl-bagni-vasche-integrate-02.jpg', label: 'Vasques intégrées — bois' },
            ].map(({ src, label }) => (
              <article key={label} className="js-reveal group relative h-64 md:h-72 overflow-hidden border border-black/10">
                <img src={src} alt={label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <p className="text-white/90 text-sm uppercase tracking-[0.14em]">{label}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section >

      <section className="relative bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <h3 className="js-reveal text-2xl md:text-3xl font-light tracking-tight text-black">Parlons de votre salle de bain</h3>
          <p className="js-reveal mt-4 text-black/70 leading-relaxed">
            Besoin d’un rendu marbre ou bois, de coupes spéciales ou d’un format sur-mesure ? Nos équipes vous
            accompagnent dans le choix des finitions et la mise en œuvre HPL.
          </p>
          <a href="/contact" className="js-reveal mt-8 inline-block border border-black/20 px-6 py-3 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors">Nous contacter</a>
        </div>
      </section>
    </div >
  )
}
