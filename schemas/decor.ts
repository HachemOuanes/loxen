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
      name: 'collection_names',
      title: 'Collection Names',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'code',
              title: 'Collection Code',
              type: 'string',
              options: {
                list: [
                  { title: 'WHIMSY', value: 'c0A' },
                  { title: 'Decori minimi', value: 'c10' },
                  { title: 'Colours', value: 'c2' },
                  { title: 'Magnetico', value: 'c22' },
                  { title: 'Interni', value: 'c24' },
                  { title: 'Full colour', value: 'c25' },
                  { title: 'Labgrade', value: 'c27' },
                  { title: 'Metalli', value: 'c31' },
                  { title: 'MEG', value: 'c37' },
                  { title: 'Walkprint', value: 'c38' },
                  { title: 'Diafos', value: 'c42' },
                  { title: 'HR-LAQ', value: 'c49' },
                  { title: 'Labgrade Plus', value: 'c54' },
                  { title: 'Design Edition', value: 'c6' },
                  { title: 'PARADE', value: 'c71' },
                  { title: 'DIGITAL NATURE', value: 'c75' },
                  { title: 'Polaris', value: 'c78' },
                  { title: 'Polaris Contemporary', value: 'c7B' },
                  { title: 'Fluo', value: 'c81' },
                  { title: 'Externa', value: 'c84' },
                  { title: 'FEBO', value: 'c89' },
                  { title: 'Rocks', value: 'c9' },
                  { title: 'Metal effect', value: 'c93' },
                  { title: 'Fabriek', value: 'c94' },
                  { title: 'DIGITAL CIRCUS', value: 'c95' },
                  { title: 'MEG-H', value: 'c996' },
                  { title: 'Work In Progress', value: 'c997' },
                  { title: 'Naval Deck', value: 'c998' },
                  { title: 'Mare Nostrum', value: 'c999' },
                  { title: 'Legni light', value: 'c9A' },
                  { title: 'Legni dark', value: 'c9B' },
                  { title: 'Hachure', value: 'cHA' },
                ],
              },
            }),
            defineField({
              name: 'name',
              title: 'Collection Name',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'code',
            },
          },
        },
      ],
      description: 'Collection names with codes',
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Collection codes (e.g., ["c27", "c49"])',
    }),
    defineField({
      name: 'surfaces',
      title: 'Surfaces',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Available surfaces for this decor',
    }),
    defineField({
      name: 'finishes',
      title: 'Finishes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Available finishes for this decor',
    }),
    defineField({
      name: 'option_classes',
      title: 'Option Classes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Option classes for this decor',
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
      collections: 'collections',
      interior: 'interior',
      exterior: 'exterior',
      featured: 'featured',
    },
    prepare({ title, code, media, collections, interior, exterior, featured }) {
      const collectionsText = collections?.slice(0, 2).join(', ') || ''
      const appType = [interior && 'Interior', exterior && 'Exterior'].filter(Boolean).join(' & ') || ''
      
      return {
        title: `${code} - ${title}${featured ? ' ⭐' : ''}`,
        subtitle: `${appType}${collectionsText ? ` • ${collectionsText}` : ''}${collections?.length > 2 ? ` +${collections.length - 2}` : ''}`,
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
