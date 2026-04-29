import { defineType, defineField } from 'sanity'

export const decorFinishes = defineType({
  name: 'decorFinishes',
  title: 'Decor Finishes',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Finitions disponibles',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      initialValue: { current: 'decor-finishes' },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'productSlug',
      title: 'Product Slug (for fetching finishes)',
      type: 'string',
      description: 'The slug of the product to fetch finishes from (e.g., "meg-standard")',
      initialValue: 'meg-standard',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})

