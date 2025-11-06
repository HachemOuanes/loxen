import { defineType, defineField } from 'sanity'

// Banner section: single big image + two text blocks (left/right)
export const productBannerSection = defineType({
  name: 'productBannerSection',
  title: 'Product Banner Section',
  type: 'object',
  fields: [
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order for displaying sections (lower numbers appear first). Leave empty to use Sanity array order.',
    }),
    defineField({ name: 'image', title: 'Banner Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'bannerLeft',
      title: 'Banner Left Text',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
      ],
    }),
    defineField({
      name: 'bannerRight',
      title: 'Banner Right Text',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
      ],
    }),
  ],
})

// Feature/standard section: alternating image + text with optional features list
export const productImageSection = defineType({
  name: 'productImageSection',
  title: 'Product Feature Section',
  type: 'object',
  fields: [
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order for displaying sections (lower numbers appear first). Leave empty to use Sanity array order.',
    }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }),
  ],
})
