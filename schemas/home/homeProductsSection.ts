import { defineType, defineField } from 'sanity'

export const homeProductsSection = defineType({
  name: 'homeProductsSection',
  title: 'Home Products Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Produits',
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'text',
      rows: 3,
      initialValue: 'High-performance hardscaping. Consciously crafted + fully customisable.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'text', rows: 2 }],
      description: 'Description paragraphs (2 paragraphs)',
      validation: (Rule) => Rule.length(2),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Découvrir nos produits',
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
            defineField({
              name: 'link',
              title: 'Product Link',
              type: 'string',
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
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'sectionLabel',
      productsCount: 'products.length',
    },
    prepare({ title, subtitle, productsCount }) {
      return {
        title,
        subtitle: `${subtitle} • ${productsCount || 0} products`,
      }
    },
  },
})

