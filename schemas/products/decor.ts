import { defineType, defineField } from 'sanity'

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
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Colours', value: 'Colours' },
          { title: 'Full colour', value: 'Full colour' },
          { title: 'HR-LAQ', value: 'HR-LAQ' },
          { title: 'Labgrade', value: 'Labgrade' },
          { title: 'Legni dark', value: 'Legni dark' },
          { title: 'Legni light', value: 'Legni light' },
          { title: 'MEG', value: 'MEG' },
          { title: 'MEG-H', value: 'MEG-H' },
          { title: 'Magnetico', value: 'Magnetico' },
          { title: 'Metal effect', value: 'Metal effect' },
          { title: 'Polaris Contemporary', value: 'Polaris Contemporary' },
          { title: 'Rocks', value: 'Rocks' },
          { title: 'Walkprint', value: 'Walkprint' },
        ],
      },
      description: 'Collections this decor belongs to',
    }),
    defineField({
      name: 'finishes',
      title: 'Finishes',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '66', value: '66' },
          { title: 'Aquarama', value: 'aquarama' },
          { title: 'Bark', value: 'bark' },
          { title: 'Climb', value: 'climb' },
          { title: 'Cross', value: 'cross' },
          { title: 'Dharma', value: 'dharma' },
          { title: 'Geo', value: 'geo' },
          { title: 'Grainwood', value: 'grainwood' },
          { title: 'Grana 2', value: 'grana 2' },
          { title: 'Holz', value: 'holz' },
          { title: 'Longline', value: 'longline' },
          { title: 'Luc-2', value: 'luc-2' },
          { title: 'Lucida', value: 'lucida' },
          { title: 'Mandarin', value: 'mandarin' },
          { title: 'Microline', value: 'microline' },
          { title: 'Millerighe', value: 'millerighe' },
          { title: 'Millerighe 2', value: 'millerighe 2' },
          { title: 'Morbida', value: 'morbida' },
          { title: 'Nutshell', value: 'nutshell' },
          { title: 'Ostuni', value: 'ostuni' },
          { title: 'Papier', value: 'papier' },
          { title: 'Polaris', value: 'polaris' },
          { title: 'Polaris Contemporary', value: 'polaris contemporary' },
          { title: 'Root', value: 'root' },
          { title: 'Satin', value: 'satin' },
          { title: 'Sei', value: 'sei' },
          { title: 'Soft', value: 'soft' },
          { title: 'Velwood', value: 'velwood' },
          { title: 'Zodia', value: 'zodia' },
          { title: 'Zodia 3', value: 'zodia 3' },
        ],
      },
      description: 'Available finishes for this decor',
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
          type: 'reference',
          to: [{ type: 'product' }],
        },
      ],
      description: 'Products associated with this decor',
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
