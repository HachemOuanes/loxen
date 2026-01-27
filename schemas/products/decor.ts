import { defineType, defineField } from 'sanity'

export const decor = defineType({
  name: 'decor',
  title: 'Decor',
  type: 'document',
  description: 'Standalone decor entities with their own content and categorization',
  fields: [
    defineField({
      name: 'abet_order',
      title: 'Abet Order',
      type: 'number',
      description: 'Order number from Abet system',
    }),
    defineField({
      name: 'code',
      title: 'Decor Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Unique identifier for the decor (e.g., "410", "405")',
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
      description: 'External image URL from Abet (e.g., "https://au.abetlaminati.com/CAMPIONI/410.jpg")',
    }),
    defineField({
      name: 'products',
      title: 'Associated Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'product' },
          ],
        },
      ],
      description: 'Products associated with this decor',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for searching',
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
              { title: 'Blanc', value: 'blanc' },
              { title: 'Bleu', value: 'bleu' },
              { title: 'Gris', value: 'gris' },
              { title: 'Jaune', value: 'jaune' },
              { title: 'Noir', value: 'noir' },
              { title: 'Orange', value: 'orange' },
              { title: 'Rose', value: 'rose' },
              { title: 'Rouge', value: 'rouge' },
              { title: 'Vert', value: 'vert' },
              { title: 'Violet', value: 'violet' },
        ],
      },
        },
      ],
      description: 'Color tags for this decor',
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
    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      description: 'Is this decor currently available?',
      initialValue: true,
    }),
    defineField({
      name: 'is_new',
      title: 'Is New',
      type: 'boolean',
      description: 'Is this a new decor?',
      initialValue: false,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Decor',
      type: 'boolean',
      description: 'Display this decor in featured sections',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      code: 'code',
      media: 'image',
      interior: 'interior',
      exterior: 'exterior',
      featured: 'featured',
    },
    prepare({ title, code, media, interior, exterior, featured }) {
      const appType = [interior && 'Interior', exterior && 'Exterior'].filter(Boolean).join(' & ') || ''
      
      return {
        title: `${code} - ${title}${featured ? ' ⭐' : ''}`,
        subtitle: appType || 'No type specified',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'abet_order', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Abet Order',
      name: 'abetOrderAsc',
      by: [
        { field: 'abet_order', direction: 'asc' },
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
      by: [{ field: 'code', direction: 'asc' }],
    },
  ],
})
