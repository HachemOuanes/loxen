import { defineType, defineField } from 'sanity'

export const homeInspirationSection = defineType({
  name: 'homeInspirationSection',
  title: 'Home Inspiration Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Inspirations',
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      initialValue: 'Architectural excellence. Realized through innovative design.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'text', rows: 2 }],
      description: 'Description paragraphs (optional)',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Voir toutes les inspirations',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/inspirations',
    }),
    defineField({
      name: 'projects',
      title: 'Inspiration Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'inspiration' }],
          options: {
            disableNew: true,
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(8),
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
      title: 'title',
      subtitle: 'sectionLabel',
      projectsCount: 'projects.length',
    },
    prepare({ title, subtitle, projectsCount }) {
      return {
        title,
        subtitle: `${subtitle} • ${projectsCount || 0} projects`,
      }
    },
  },
})

