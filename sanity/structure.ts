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
                .child(S.document().schemaType('homeHeroSection').documentId('homeHeroSection')),

              S.listItem()
                .title('Applications Section')
                .icon(ComponentIcon)
                .child(S.document().schemaType('homeApplicationsSection').documentId('homeApplicationsSection')),

              S.listItem()
                .title('Vision Section')
                .icon(SparklesIcon)
                .child(S.document().schemaType('homeVisionSection').documentId('homeVisionSection')),

              S.listItem()
                .title('Solutions Section')
                .icon(CircleIcon)
                .child(S.document().schemaType('homeSolutionsSection').documentId('homeSolutionsSection')),

              S.listItem()
                .title('Products Section')
                .icon(PackageIcon)
                .child(S.document().schemaType('homeProductsSection').documentId('homeProductsSection')),

              S.listItem()
                .title('Inspiration Section')
                .icon(ImageIcon)
                .child(S.document().schemaType('homeInspirationSection').documentId('homeInspirationSection')),

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
                .title('All Products')
                .icon(PackageIcon)
                .child(S.documentTypeList('product').title('All Products')),

              S.listItem()
                .title('Interior Products')
                .icon(HomeIcon)
                .child(
                  S.documentTypeList('product')
                    .title('Interior Products')
                    .filter('_type == "product" && type == "interieur"')
                ),

              S.listItem()
                .title('Exterior Products')
                .icon(StackIcon)
                .child(
                  S.documentTypeList('product')
                    .title('Exterior Products')
                    .filter('_type == "product" && type == "exterieur"')
                ),
            ])
        ),

      // Applications - List of application documents
      S.listItem()
        .title('📋 Applications')
        .icon(ComponentIcon)
        .child(
          S.list()
            .title('Applications')
            .items([
              S.listItem()
                .title('Interior Applications')
                .icon(HomeIcon)
                .child(
                  S.documentTypeList('application')
                    .title('Interior Applications')
                    .filter('_type == "application" && type == "interieur"')
                ),

              S.listItem()
                .title('Exterior Applications')
                .icon(StackIcon)
                .child(
                  S.documentTypeList('application')
                    .title('Exterior Applications')
                    .filter('_type == "application" && type == "exterieur"')
                ),

              S.listItem()
                .title('All Applications')
                .icon(ComponentIcon)
                .child(S.documentTypeList('application').title('All Applications')),
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
        .child(
          S.list()
            .title('Secteurs Content')
            .items([
              S.listItem()
                .title('All Secteurs')
                .icon(ComponentIcon)
                .child(S.documentTypeList('secteur').title('All Secteurs')),

              S.listItem()
                .title('Métiers')
                .icon(UsersIcon)
                .child(
                  S.documentTypeList('secteur')
                    .title('Métiers')
                    .filter('_type == "secteur" && type == "metier"')
                ),

              S.listItem()
                .title('Branches')
                .icon(StackIcon)
                .child(
                  S.documentTypeList('secteur')
                    .title('Branches')
                    .filter('_type == "secteur" && type == "branche"')
                ),
            ])
        ),

      // Catalogues Page Content
      S.listItem()
        .title('📚 Catalogues')
        .icon(DocumentIcon)
        .child(S.documentTypeList('catalogue').title('All Catalogues')),

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

              S.listItem()
                .title('Settings')
                .icon(CogIcon)
                .child(S.document().schemaType('settings').documentId('settings')),
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
              ...S.documentTypeListItems(),
            ])
        ),
    ])