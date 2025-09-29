import { defineType, defineField } from 'sanity'

export const productsPage = defineType({
  name: 'productsPage',
  title: 'Products Page',
  type: 'document',
  fields: [
    // Header Section
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Produits',
      validation: (Rule) => Rule.required(),
      description: 'Main title displayed in the header section',
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'text',
      rows: 3,
      description: 'Brief description shown below the title in the header',
    }),
    defineField({
      name: 'heroImage',
      title: 'Header Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Background image for the page header (optional - will use gradient if not set)',
    }),

    // Products Section
    defineField({
      name: 'allCategoriesText',
      title: 'All Categories Button Text',
      type: 'string',
      initialValue: 'Tous',
      description: 'Text for the "show all categories" filter button',
    }),
    defineField({
      name: 'noResultsText',
      title: 'No Results Text',
      type: 'string',
      initialValue: 'Aucun produit trouvé.',
      description: 'Message shown when no products match the search/filter',
    }),

    // Call to Action Section
    defineField({
      name: 'ctaTitle',
      title: 'CTA Section Title',
      type: 'string',
      initialValue: 'Besoin d\'accompagnement pour votre projet ?',
      description: 'Title for the call-to-action section',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Section Description',
      type: 'text',
      rows: 4,
      initialValue: 'Notre équipe d\'experts vous accompagne dans le choix des solutions les plus adaptées à vos besoins. Conseil technique, devis personnalisé et support projet : nous sommes là pour concrétiser vos idées architecturales.',
      description: 'Description text for the call-to-action section',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Nous Contacter',
      description: 'Text for the call-to-action button',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '#contact',
      description: 'Where the CTA button should link to (use # for scroll to section)',
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
