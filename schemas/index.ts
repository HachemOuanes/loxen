// Home Page Sections
import { heroSection } from './home/heroSection'
import { productsSection } from './home/productsSection'
import { inspirationSection } from './home/inspirationSection'
import { interiorSection } from './home/interiorSection'
import { exteriorSection } from './home/exteriorSection'
import { partnersSection } from './home/partnersSection'
import { contactInfo } from './home/contactInfo'

// Products Page
import { productItem } from './products/productItem'
import { productCategory } from './products/productCategory'
import { productsPage } from './products/productsPage'

// SEO & Settings
import { seoSettings } from './seo/seoSettings'
import { pageSeo } from './seo/pageSeo'

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
  productItem,
  productCategory,
  productsPage,
  
  // ⚙️ SEO & Settings
  seoSettings,
  pageSeo,
]