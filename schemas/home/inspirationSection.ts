import { defineType, defineField } from 'sanity'

export const inspirationSection = defineType({
  name: 'inspirationSection',
  title: 'Inspiration Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Inspiration',
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
      name: 'projects',
      title: 'Inspiration Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Project Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Project Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Project Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'location',
              title: 'Project Location',
              type: 'string',
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
              title: 'title',
              subtitle: 'location',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
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
      projectsCount: 'projects.length',
    },
    prepare({ title, subtitle, projectsCount }) {
      return {
        title,
        subtitle: `${projectsCount || 0} projects • ${subtitle || ''}`,
      }
    },
  },
})