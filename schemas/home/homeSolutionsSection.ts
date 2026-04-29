import { defineType, defineField } from 'sanity'

export const homeSolutionsSection = defineType({
  name: 'homeSolutionsSection',
  title: 'Home Solutions Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Solutions',
    }),
    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'text',
      rows: 3,
      initialValue: 'Where <em>artistry</em> meets <em>precision</em>, creating spaces that <em>inspire</em>.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'solutions',
      title: 'Solutions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Solution Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'benefits',
              title: 'Benefits',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Benefit Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'description',
                      title: 'Benefit Description',
                      type: 'text',
                      rows: 3,
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'description',
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.min(1).max(3),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              benefitsCount: 'benefits.length',
            },
            prepare({ title, benefitsCount }) {
              return {
                title,
                subtitle: `${benefitsCount || 0} benefits`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(5),
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
      title: 'sectionLabel',
      subtitle: 'slogan',
    },
  },
})

