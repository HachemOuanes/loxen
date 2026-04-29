import { defineType, defineField } from 'sanity'

export const pageSeo = defineType({
  name: 'pageSeo',
  title: 'Page SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'pageId',
      title: 'Page Identifier',
      type: 'string',
      description: 'Unique identifier for the page (e.g., "home", "about")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'SEO title for this page (50-60 characters)',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Page description for search engines (150-160 characters)',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'keywords',
      title: 'Page Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Specific keywords for this page',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Custom image for social sharing (optional)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Prevent search engines from indexing this page',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Canonical URL for this page (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'pageId',
      description: 'description',
    },
    prepare({ title, subtitle, description }) {
      return {
        title: title || 'Untitled',
        subtitle: `Page: ${subtitle}`,
        description,
      }
    },
  },
})
