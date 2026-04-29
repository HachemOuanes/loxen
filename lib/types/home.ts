// Type definitions for home page sections

export interface HomeHeroSection {
  _id: string
  title: string
  subtitle: string
  ctaText: string
  showSection?: boolean
}

export interface HomeApplicationsSection {
  _id: string
  sectionLabel: string
  title: string
  description: string[]
  ctaTitle: string
  ctaText: string
  interiorCard: {
    title: string
    image: any
    link: string
  }
  exteriorCard: {
    title: string
    image: any
    link: string
  }
  showSection?: boolean
}

export interface HomeVisionSection {
  _id: string
  largeText: string
  smallText: string
  showSection?: boolean
}

export interface SolutionBenefit {
  title: string
  description: string
}

export interface Solution {
  name: string
  benefits: SolutionBenefit[]
}

export interface HomeSolutionsSection {
  _id: string
  sectionLabel: string
  slogan: string
  solutions: Solution[]
  showSection?: boolean
}

export interface HomeProduct {
  _key?: string
  name: string
  description: string
  image: any
  order?: number
  link?: string
}

export interface HomeProductsSection {
  _id: string
  sectionLabel: string
  title: string
  description: string[]
  ctaText: string
  products: HomeProduct[]
  showSection?: boolean
}

export interface HomeInspirationProject {
  _key?: string
  title: string
  image?: any
  location?: string
  category?: string
  link: string
  order?: number
}

export interface HomeInspirationSection {
  _id: string
  sectionLabel: string
  title: string
  description?: string[]
  ctaText?: string
  ctaLink?: string
  projects: HomeInspirationProject[]
  showSection?: boolean
}

export interface ContactInfo {
  _id: string
  email: string
  phone: string
  address: string
  responseTime: string
}

