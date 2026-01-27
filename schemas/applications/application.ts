import { defineType, defineField } from 'sanity'

export const application = defineType({
  name: 'application',
  title: 'Application',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Application Type',
      type: 'string',
      options: {
        list: [
          { title: 'Intérieur', value: 'interieur' },
          { title: 'Extérieur', value: 'exterieur' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'interieur',
    }),
    defineField({
      name: 'name',
      title: 'Application Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Application Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'image',
      title: 'Application Image',
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
      title: 'Application Link',
      type: 'string',
      description: 'Optional link to application page',
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
        },
      ],
      description: 'Products associated with this application',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      type: 'type',
      media: 'image',
    },
    prepare({ title, subtitle, type, media }) {
      const typeLabel = type === 'interieur' ? 'Intérieur' : 'Extérieur'
      return {
        title: `${title} (${typeLabel})`,
        subtitle: subtitle,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Type',
      name: 'typeAsc',
      by: [{ field: 'type', direction: 'asc' }],
    },
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
