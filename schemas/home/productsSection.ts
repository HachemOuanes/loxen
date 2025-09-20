import { defineType, defineField } from 'sanity'

export const productsSection = defineType({
  name: 'productsSection',
  title: 'Products Section (Home)',
  type: 'document',
  description: 'Products section displayed on the home page',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Produits',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 4,
      description: 'Description shown in the section',
    }),
    defineField({
      name: 'products',
      title: 'Featured Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Product Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Product Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Product Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              initialValue: 0,
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
      description: 'Maximum 6 products for home page display',
    }),
    defineField({
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'string',
      initialValue: 'Voir les catalogues produits',
    }),
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      description: 'Toggle to show/hide this section on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      productsCount: 'products.length',
    },
    prepare({ title, subtitle, productsCount }) {
      return {
        title,
        subtitle: `${productsCount || 0} products • ${subtitle || ''}`,
      }
    },
  },
})