import { defineType, defineField } from 'sanity'

export const seoSettings = defineType({
  name: 'seoSettings',
  title: 'SEO Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'The main title of your website',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of your website (150-160 characters)',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'SEO keywords for your website',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630px recommended)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Website icon (32x32px recommended)',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: 'Your website URL (e.g., https://loxen.com)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      description: 'Your company name for structured data',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyDescription',
      title: 'Company Description',
      type: 'text',
      rows: 4,
      description: 'Description of your company for structured data',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'ogImage',
    },
  },
})
