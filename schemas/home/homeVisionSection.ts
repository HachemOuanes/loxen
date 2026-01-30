import { defineType, defineField } from 'sanity'

export const homeVisionSection = defineType({
  name: 'homeVisionSection',
  title: 'Home Vision Section',
  type: 'document',
  fields: [
    defineField({
      name: 'largeText',
      title: 'Large Text (Left)',
      type: 'text',
      rows: 3,
      initialValue: 'Made to matter',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'smallText',
      title: 'Small Text (Right)',
      type: 'text',
      rows: 3,
      initialValue: 'Transformez vos visions en réalité avec nos systèmes d\'aluminium et façades de haute qualité premium.',
      validation: (Rule) => Rule.required(),
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
      title: 'largeText',
      subtitle: 'smallText',
    },
  },
})

