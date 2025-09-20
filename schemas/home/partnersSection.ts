import { defineType, defineField } from 'sanity'

export const partnersSection = defineType({
  name: 'partnersSection',
  title: 'Partners Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Partenaires de Confiance',
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
      name: 'partners',
      title: 'Partners List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Partner Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Partner Logo',
              type: 'image',
              options: {
                hotspot: true,
              },
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
              media: 'logo',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
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
      partnersCount: 'partners.length',
    },
    prepare({ title, subtitle, partnersCount }) {
      return {
        title,
        subtitle: `${partnersCount || 0} partners • ${subtitle || ''}`,
      }
    },
  },
})