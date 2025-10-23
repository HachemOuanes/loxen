// Home Page Sections
import { heroSection } from './home/heroSection'
import { productsSection } from './home/productsSection'
import { inspirationSection } from './home/inspirationSection'
import { interiorSection } from './home/interiorSection'
import { exteriorSection } from './home/exteriorSection'
import { partnersSection } from './home/partnersSection'
import { contactInfo } from './home/contactInfo'

// Products Page
import { interiorProduct } from './products/interiorProduct'
import { exteriorProduct } from './products/exteriorProduct'
import { productItem } from './products/productItem'
import { productImageSection, productHeroSection } from './products/productImageSection'

// SEO & Settings
import { seoSettings } from './seo/seoSettings'
import { pageSeo } from './seo/pageSeo'

// Inspirations
import { inspiration } from './inspirations/inspiration'
import { decorFinishes } from './inspirations/decorFinishes'
import { finitionTypes } from './inspirations/finitionTypes'
import { productCategory } from './products/productCategory'

// Decors
import { decor } from './decor'

// Secteurs
import { secteur } from './secteurs/secteur'
import { secteursIndex } from './secteurs/secteursIndex'

export const schemaTypes = [
  // 🏠 Home Page Sections
  heroSection,
  productsSection,
  inspirationSection,
  interiorSection,
  exteriorSection,
  partnersSection,
  contactInfo,
  
  // 🛍️ Products Page
  interiorProduct,
  exteriorProduct,
  productItem,
  productHeroSection,
  productImageSection,
  productCategory,
  
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
]