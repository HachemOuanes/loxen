// Data for Secteurs pages (ready to migrate to Sanity)
// Focus: sectors like Education and Health using MEG / Easy MEG / HPL

export type SectorSummary = {
  slug: string
  title: string
  description: string
  heroImage: string
}

export const secteursIndex: SectorSummary[] = [
  {
    slug: 'education',
    title: 'Éducation',
    description:
      "Établissements scolaires et campus : décors MEG, Easy MEG et HPL pour des enveloppes durables, résistantes et faciles d’entretien.",
    heroImage: '/interior-ecoles-universites.jpg',
  },
  {
    slug: 'health',
    title: 'Santé',
    description:
      'Cliniques et pôles de santé : matériaux pérennes MEG, Easy MEG et HPL pour l’hygiène, la longévité et une identité apaisante.',
    heroImage: '/contemporary-cultural-center-glass-facade.png',
  },
]

export function getSectorBySlug(slug: string): SectorSummary | undefined {
  return secteursIndex.find((s) => s.slug === slug)
}

export const secteursData = {
  hero: {
    kicker: 'Secteurs',
    title: 'Solutions pour l’éducation, la santé et les espaces tertiaires',
    description:
      "Des systèmes MEG, Easy MEG et HPL adaptés aux exigences des établissements scolaires, de santé et des bureaux, alliant durabilité, sécurité et esthétique.",
    heroImage: '/contemporary-cultural-center-glass-facade-paris.png',
  },
  panels: [
    {
      kicker: 'Éducation',
      title: 'Façades et habillages durables',
      paragraphs: [
        'Résistance aux chocs, entretien facilité et teintes stables : des solutions pensées pour les écoles et campus.',
        'MEG et HPL assurent une longévité élevée tout en maintenant une lecture claire des volumes.',
      ],
      bullets: ['Résistance renforcée', 'Entretien simplifié', 'Palette pédagogique et sobre'],
      image: '/exterior-ecoles-universites.jpg',
    },
    {
      kicker: 'Santé',
      title: 'Hygiène et performance',
      paragraphs: [
        'Des revêtements adaptés aux environnements sensibles, résistants et faciles à nettoyer.',
        'Les systèmes ventilés et panneaux HPL contribuent à des espaces sains et pérennes.',
      ],
      bullets: ['Surfaces hygiéniques', 'Teintes apaisantes', 'Durabilité éprouvée'],
      image: '/contemporary-cultural-center-glass-facade.png',
    },
    {
      kicker: 'Bureaux',
      title: 'Confort et image de marque',
      paragraphs: [
        'Des façades et aménagements qui valorisent l’identité visuelle et améliorent le confort thermique.',
        'Easy MEG et MEG offrent des textures élégantes et une tenue dans le temps remarquable.',
      ],
      bullets: ['Confort thermique', 'Expression architecturale', 'Matériaux pérennes'],
      image: '/high-resolution-minimalist-modern-interior-office.png',
    },
  ],
  mosaic: [
    { src: '/exterior-facades-ventilees.jpg', label: 'Façades ventilées' },
    { src: '/exterior-brise-soleil.jpg', label: 'Brise-soleil' },
    { src: '/exterior-garde-corps-balustrades.jpg', label: 'Garde-corps' },
    { src: '/interior-agencements.jpg', label: 'Agencements intérieurs' },
  ],
  materials: {
    kicker: 'Matériaux',
    title: 'MEG, Easy MEG et HPL : textures pérennes',
    description:
      "Une palette de décors boisés, minéraux et unis pour répondre aux contraintes de l’éducation, de la santé et des bureaux.",
    features: ['HPL & Stratifiés techniques', 'Composites MEG & Easy MEG', 'Finitions UV-stables'],
    tiles: [
      { src: '/composite-panel-system.jpg', speed: 0.25, position: 'tl' as const },
      { src: '/copanel-composite.jpg', speed: 0.4, position: 'br' as const },
    ],
  },
  caseStudy: {
    kicker: 'Étude de cas',
    title: 'Centre de santé – Façade ventilée en HPL',
    items: [
      { label: 'Concept', text: 'Une enveloppe apaisante et durable, avec une trame maîtrisée et des raccords soignés.' },
      { label: 'Technique', text: 'Système ventilé sur ossature aluminium, calepinage précis et fixations dissimulées.' },
      { label: 'Résultat', text: 'Façade performante et hygiénique, favorisant le bien-être des usagers.' },
    ],
    image: '/contemporary-cultural-center-glass-facade.png',
  },
  cta: {
    title: 'Parlons de votre projet dans l’éducation, la santé ou les bureaux',
    description:
      'Nous accompagnons vos projets avec des matériaux MEG, Easy MEG et HPL adaptés aux usages intensifs et réglementations.',
    image: '/clean-minimalist-architecture-facade.jpg',
    button: { label: 'Nous contacter', href: '/contact' },
  },
} as const
