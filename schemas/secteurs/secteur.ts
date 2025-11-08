import { defineType, defineField } from 'sanity'

export const secteur = defineType({
  name: 'secteur',
  title: 'Secteur',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'applicationsSection',
          title: 'Applications Section',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              initialValue: 'applications',
              readOnly: true,
            }),
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'items',
              title: 'Application Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Item Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'subtitle',
                      title: 'Subtitle',
                      type: 'string',
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                      rows: 3,
                    }),
                    defineField({
                      name: 'features',
                      title: 'Features',
                      type: 'array',
                      of: [{ type: 'string' }],
                    }),
                    defineField({
                      name: 'image',
                      title: 'Image',
                      type: 'image',
                      options: {
                        hotspot: true,
                      },
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'subtitle',
                      media: 'image',
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare({ title }) {
              return {
                title: `Applications: ${title}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'showcaseSection',
      title: 'Showcase Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heroImage',
          title: 'Showcase Hero Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'leftText',
          title: 'Left Text Block',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
          ],
        }),
        defineField({
          name: 'rightText',
          title: 'Right Text Block',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
          ],
        }),
        defineField({
          name: 'images',
          title: 'Showcase Images',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'src',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'contactSection',
      title: 'Contact Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Contact Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Contact Description',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'heroImage',
    },
  },
})
