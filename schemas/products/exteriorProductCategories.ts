import { defineType, defineField } from 'sanity'

export const exteriorProductCategories = defineType({
  name: 'exteriorProductCategories',
  title: 'Exterior Product Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Extérieur',
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
      name: 'categories',
      title: 'Exterior Categories',
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
            defineField({
              name: 'link',
              title: 'Category Link',
              type: 'string',
              description: 'Optional link to category page (e.g., /produits/exterieur/facades)',
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
      description: 'Maximum 6 categories',
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
