// Home Page Sections
import { homeHeroSection } from './home/homeHeroSection'
import { homeApplicationsSection } from './home/homeApplicationsSection'
import { homeVisionSection } from './home/homeVisionSection'
import { homeSolutionsSection } from './home/homeSolutionsSection'
import { homeProductsSection } from './home/homeProductsSection'
import { homeInspirationSection } from './home/homeInspirationSection'
import { contactInfo } from './home/contactInfo'

// Products
import { product } from './products/product'

// Applications
import { application } from './applications/application'

// SEO & Settings
import { seoSettings } from './seo/seoSettings'
import { pageSeo } from './seo/pageSeo'

// Inspirations
import { inspiration } from './inspirations/inspiration'
import { decorFinishes } from './inspirations/decorFinishes'
import { finitionTypes } from './inspirations/finitionTypes'

// Decors
import { decor } from './products/decor'

// Secteurs
import { secteur } from './secteurs/secteur'
import { secteursIndex } from './secteurs/secteursIndex'

// Catalogues
import { catalogue } from './catalogues/catalogue'

export const schemaTypes = [
  // 🏠 Home Page Sections
  homeHeroSection,
  homeApplicationsSection,
  homeVisionSection,
  homeSolutionsSection,
  homeProductsSection,
  homeInspirationSection,
  contactInfo,
  
  // 🛍️ Products
  product,
  
  // 📋 Applications
  application,
  
  // ⚙️ SEO & Settings
  seoSettings,
  pageSeo,
  
  // 🎨 Inspirations
  inspiration,
  decorFinishes,
  finitionTypes,
  
  // 🎨 Decors
  decor,
  
  // 🏢 Secteurs
  secteur,
  secteursIndex,
  
  // 📚 Catalogues
  catalogue,
]