import { defineType, defineField } from 'sanity'

export const productsPage = defineType({
  name: 'productsPage',
  title: 'Products Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'text',
      rows: 3,
      description: 'Brief description shown below the title',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'filterTitle',
      title: 'Filter Section Title',
      type: 'string',
      initialValue: 'Filtrer par catégorie',
    }),
    defineField({
      name: 'allCategoriesText',
      title: 'All Categories Button Text',
      type: 'string',
      initialValue: 'Tous les produits',
    }),
    defineField({
      name: 'noResultsText',
      title: 'No Results Text',
      type: 'string',
      initialValue: 'Aucun produit trouvé dans cette catégorie.',
    }),
    defineField({
      name: 'featuredSectionTitle',
      title: 'Featured Section Title',
      type: 'string',
      initialValue: 'Produits Vedettes',
    }),
    defineField({
      name: 'showFeaturedSection',
      title: 'Show Featured Section',
      type: 'boolean',
      description: 'Display a separate section for featured products',
      initialValue: true,
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Call to Action Title',
      type: 'string',
      initialValue: 'Besoin d\'une solution sur mesure ?',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Call to Action Description',
      type: 'text',
      rows: 2,
      initialValue: 'Contactez nos experts pour discuter de votre projet architectural.',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Call to Action Button Text',
      type: 'string',
      initialValue: 'Nous Contacter',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'Call to Action Button Link',
      type: 'string',
      initialValue: '#contact',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'heroImage',
    },
  },
})
