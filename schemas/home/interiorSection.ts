import { defineType, defineField } from 'sanity'

export const interiorSection = defineType({
  name: 'interiorSection',
  title: 'Interior Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Intérieur',
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
      name: 'sectionImage',
      title: 'Section Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main background image for the interior section',
    }),
    defineField({
      name: 'categories',
      title: 'Interior Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Category Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.max(200),
            }),
            defineField({
              name: 'image',
              title: 'Category Image',
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
      validation: (Rule) => Rule.min(1).max(6),
      description: 'Maximum 6 categories for 2x3 grid display',
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
      categoriesCount: 'categories.length',
    },
    prepare({ title, subtitle, categoriesCount }) {
      return {
        title,
        subtitle: `${categoriesCount || 0} categories • ${subtitle || ''}`,
      }
    },
  },
})