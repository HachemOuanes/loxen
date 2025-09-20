import { defineType, defineField } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'interiorButtonText',
      title: 'Interior Button Text',
      type: 'string',
      initialValue: 'INTÉRIEUR',
    }),
    defineField({
      name: 'exteriorButtonText',
      title: 'Exterior Button Text',
      type: 'string',
      initialValue: 'EXTÉRIEUR',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'backgroundImage',
    },
  },
})
