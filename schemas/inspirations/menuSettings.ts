import { defineType, defineField } from 'sanity'

export const menuSettings = defineType({
  name: 'menuSettings',
  title: 'Mega Menu Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Menu Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'inspirations',
      title: 'Inspirations to Display',
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'inspiration' }] }
      ],
      validation: Rule => Rule.required().min(1),
    }),
  ],
})
