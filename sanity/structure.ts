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
  SparklesIcon,
  CircleIcon,
} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Home Page Content
      S.listItem()
        .title('🏠 Home')
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
        .title('🛍️ Products')
        .icon(PackageIcon)
        .child(
          S.list()
            .title('Products Content')
            .items([
              S.listItem()
                .title('Interior Products')
                .icon(HomeIcon)
                .child(S.documentTypeList('interiorProduct').title('Interior Products')),

              S.listItem()
                .title('Exterior Products')
                .icon(StackIcon)
                .child(S.documentTypeList('exteriorProduct').title('Exterior Products')),
            ])
        ),

      // Inspirations Page Content
      S.listItem()
        .title('🎨 Inspirations')
        .icon(SparklesIcon)
        .child(
          S.list()
            .title('Inspirations Content')
            .items([
              S.listItem()
                .title('All Inspirations')
                .icon(ImageIcon)
                .child(S.documentTypeList('inspiration').title('All Inspirations')),

              S.listItem()
                .title('Finition Types')
                .icon(CircleIcon)
                .child(S.document().schemaType('finitionTypes').documentId('finition-types')),

              S.listItem()
                .title('Decor Finishes')
                .icon(TagIcon)
                .child(S.document().schemaType('decorFinishes').documentId('decor-finishes')),
            ])
        ),

      // Decors - Standalone Section
      S.listItem()
        .title('🎨 Decors')
        .icon(TagIcon)
        .child(S.documentTypeList('decor').title('All Decors')),

      // Secteurs Page Content
      S.listItem()
        .title('🏢 Secteurs')
        .icon(ComponentIcon)
        .child(S.documentTypeList('secteur').title('All Secteurs')),

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
                (listItem) => !['seoSettings', 'heroSection', 'contactInfo', 'productsSection', 'inspirationSection', 'interiorSection', 'exteriorSection', 'partnersSection', 'finitionTypes', 'decorFinishes', 'decor', 'secteursIndex'].includes(listItem.getId() || '')
              ),
            ])
        ),
    ])