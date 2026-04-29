import { defineType, defineField } from 'sanity'
import { ProductSpecCheckboxInput } from '../../sanity/components/ProductSpecCheckboxInput'

export const decor = defineType({
  name: 'decor',
  title: 'Decor',
  type: 'document',
  description: 'Standalone decor entities with their own content and categorization',
  fields: [
    defineField({
      name: 'external_order',
      title: 'External Order',
      type: 'number',
      description: 'Order number from external system',
    }),
    defineField({
      name: 'external_code',
      title: 'External Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Unique external identifier for the decor (e.g., "410", "405")',
    }),
    defineField({
      name: 'loxen_code',
      title: 'Loxen Code',
      type: 'string',
      description: 'Public display code used in the UI (visible to users)',
    }),
    defineField({
      name: 'name',
      title: 'Decor Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Display name for the decor (e.g., "bianco ghiaccio")',
    }),
    defineField({
      name: 'image',
      title: 'Decor Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main image showing the decor pattern/texture',
    }),
    defineField({
      name: 'image_url',
      title: 'Image URL',
      type: 'url',
      description: 'External image URL (e.g., "https://abetlaminati.com/CAMPIONI/405.jpg")',
    }),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Beige', value: 'beige' },
              { title: 'Bianco', value: 'bianco' },
              { title: 'Blu', value: 'blu' },
              { title: 'Giallo', value: 'giallo' },
              { title: 'Grigio', value: 'grigio' },
              { title: 'Marron', value: 'marron' },
              { title: 'Nero', value: 'nero' },
              { title: 'Rosa', value: 'rosa' },
              { title: 'Rosso', value: 'rosso' },
              { title: 'Verde', value: 'verde' },
              { title: 'Viola', value: 'viola' },
            ],
          },
        },
      ],
      description: 'Color tags for this decor',
    }),
    defineField({
      name: 'products',
      title: 'Associated Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{ type: 'product' }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'formats',
              title: 'Formats disponibles',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Cochez les formats du produit disponibles pour ce décor',
              components: { input: ProductSpecCheckboxInput },
              options: { productSpecField: 'format.items' } as any,
            }),
            defineField({
              name: 'epaisseurs',
              title: 'Épaisseurs disponibles',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Cochez les épaisseurs du produit disponibles pour ce décor',
              components: { input: ProductSpecCheckboxInput },
              options: { productSpecField: 'epaisseur' } as any,
            }),
            defineField({
              name: 'finishes',
              title: 'Finitions disponibles',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Cochez les finitions du produit disponibles pour ce décor',
              components: { input: ProductSpecCheckboxInput },
              options: { productSpecField: 'finishes' } as any,
            }),
          ],
          preview: {
            select: {
              title: 'product.title',
            },
          },
        },
      ],
      description: 'Products associated with this decor with their selected specifications',
    }),
    defineField({
      name: 'interior',
      title: 'Interior',
      type: 'boolean',
      description: 'Available for interior use',
      initialValue: false,
    }),
    defineField({
      name: 'exterior',
      title: 'Exterior',
      type: 'boolean',
      description: 'Available for exterior use',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      loxenCode: 'loxen_code',
      externalCode: 'external_code',
      media: 'image',
      interior: 'interior',
      exterior: 'exterior',
    },
    prepare({ title, loxenCode, externalCode, media, interior, exterior }) {
      const appType = [interior && 'Interior', exterior && 'Exterior'].filter(Boolean).join(' & ') || ''
      const displayCode = loxenCode || externalCode

      return {
        title: `${displayCode} - ${title}`,
        subtitle: appType || 'No type specified',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'External Order',
      name: 'externalOrderAsc',
      by: [
        { field: 'external_order', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Code A-Z',
      name: 'codeAsc',
      by: [{ field: 'external_code', direction: 'asc' }],
    },
  ],
})
