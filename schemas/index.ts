// Home Page Sections
import { homeHeroSection } from './home/homeHeroSection'
import { homeApplicationsSection } from './home/homeApplicationsSection'
import { homeVisionSection } from './home/homeVisionSection'
import { homeSolutionsSection } from './home/homeSolutionsSection'
import { homeProductsSection } from './home/homeProductsSection'
import { homeInspirationSection } from './home/homeInspirationSection'
import { contactInfo } from './home/contactInfo'

// Products Page
import { interiorProduct } from './products/interiorProduct'
import { exteriorProduct } from './products/exteriorProduct'
import { productItem } from './products/productItem'
import { productImageSection, productBannerSection } from './products/productImageSection'
import { exteriorProductCategories } from './products/exteriorProductCategories'
import { interiorProductCategories } from './products/interiorProductCategories'

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
  
  // 🛍️ Products Page
  interiorProduct,
  exteriorProduct,
  productItem,
  productBannerSection,
  productImageSection,
  productCategory,
  exteriorProductCategories,
  interiorProductCategories,
  
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