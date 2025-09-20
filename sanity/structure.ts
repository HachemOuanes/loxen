import { StructureResolver } from 'sanity/structure'
import {
  HomeIcon,
  DocumentIcon,
  TagIcon,
  ImageIcon,
  UsersIcon,
  CogIcon,
  SearchIcon,
  PackageIcon,
  ComponentIcon,
  StackIcon,
} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Home Page Content
      S.listItem()
        .title('🏠 Home Page')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Home Page Sections')
            .items([
              S.listItem()
                .title('Hero Section')
                .icon(ImageIcon)
                .child(S.document().schemaType('heroSection').documentId('heroSection')),
              
              S.listItem()
                .title('Products Section')
                .icon(PackageIcon)
                .child(S.document().schemaType('productsSection').documentId('productsSection')),
              
              S.listItem()
                .title('Inspiration Section')
                .icon(ImageIcon)
                .child(S.document().schemaType('inspirationSection').documentId('inspirationSection')),
              
              S.listItem()
                .title('Interior Section')
                .icon(HomeIcon)
                .child(S.document().schemaType('interiorSection').documentId('interiorSection')),
              
              S.listItem()
                .title('Exterior Section')
                .icon(StackIcon)
                .child(S.document().schemaType('exteriorSection').documentId('exteriorSection')),
              
              S.listItem()
                .title('Partners Section')
                .icon(UsersIcon)
                .child(S.document().schemaType('partnersSection').documentId('partnersSection')),
              
              S.listItem()
                .title('Contact Information')
                .icon(DocumentIcon)
                .child(S.document().schemaType('contactInfo').documentId('contactInfo')),
            ])
        ),

      // Products Page Content
      S.listItem()
        .title('🛍️ Products Page')
        .icon(PackageIcon)
        .child(
          S.list()
            .title('Products Page Content')
            .items([
              S.listItem()
                .title('Products Page Settings')
                .icon(CogIcon)
                .child(S.document().schemaType('productsPage').documentId('products-page')),
              
              S.listItem()
                .title('Product Categories')
                .icon(TagIcon)
                .child(S.documentTypeList('productCategory').title('Product Categories')),
              
              S.listItem()
                .title('All Products')
                .icon(ComponentIcon)
                .child(S.documentTypeList('productItem').title('All Products')),
              
              S.listItem()
                .title('Featured Products')
                .icon(PackageIcon)
                .child(
                  S.documentTypeList('productItem')
                    .title('Featured Products')
                    .filter('_type == "productItem" && featured == true')
                ),
            ])
        ),

      // SEO & Settings
      S.listItem()
        .title('⚙️ SEO & Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('SEO & Settings')
            .items([
              S.listItem()
                .title('Global SEO Settings')
                .icon(SearchIcon)
                .child(S.document().schemaType('seoSettings').documentId('seoSettings')),
              
              S.listItem()
                .title('Page SEO')
                .icon(SearchIcon)
                .child(S.documentTypeList('pageSeo').title('Page SEO')),
            ])
        ),

        // Divider
        S.divider(),

        // Quick Access - All Documents (fallback)
        S.listItem()
          .title('📋 All Documents')
          .icon(DocumentIcon)
          .child(
            S.list()
              .title('All Documents')
              .items([
                ...S.documentTypeListItems().filter(
                  (listItem) => !['seoSettings', 'heroSection', 'contactInfo', 'productsPage', 'productsSection', 'inspirationSection', 'interiorSection', 'exteriorSection', 'partnersSection'].includes(listItem.getId() || '')
                ),
              ])
          ),
      ])