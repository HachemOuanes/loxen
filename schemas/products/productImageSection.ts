import { defineType, defineField } from 'sanity'

// Hero section: single big image + two text blocks (left/right)
export const productHeroSection = defineType({
  name: 'productHeroSection',
  title: 'Product Hero Section',
  type: 'object',
  fields: [
  defineField({ name: 'image', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'heroLeft',
      title: 'Hero Left Text',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
      ],
    }),
    defineField({
      name: 'heroRight',
      title: 'Hero Right Text',
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
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
  defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }),
  ],
})
