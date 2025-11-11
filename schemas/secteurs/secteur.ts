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
      title: 'Description (Legacy)',
      type: 'text',
      rows: 3,
      description: 'Deprecated - use heroTextSections instead',
    }),
    defineField({
      name: 'heroTextSections',
      title: 'Hero Text Sections',
      type: 'object',
      description: 'Three text sections for the hero area',
      fields: [
        defineField({
          name: 'section1',
          title: 'First Text Section',
          type: 'object',
          fields: [
            defineField({
              name: 'mainText',
              title: 'Main Text',
              type: 'string',
              description: 'Large text displayed prominently',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'Smaller italic text below main text',
            }),
          ],
        }),
        defineField({
          name: 'section2',
          title: 'Second Text Section',
          type: 'object',
          fields: [
            defineField({
              name: 'mainText',
              title: 'Main Text',
              type: 'string',
              description: 'Large text displayed prominently',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'Smaller italic text below main text',
            }),
          ],
        }),
        defineField({
          name: 'section3',
          title: 'Third Text Section',
          type: 'object',
          fields: [
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'Small italic text (no main text for this section)',
            }),
          ],
        }),
      ],
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
      name: 'featuresSection',
      title: 'Features Section',
      type: 'object',
      description: 'Features section displayed below the hero section',
      fields: [
        defineField({
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  description: 'Upload an icon image for this feature',
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  description: 'Feature label (e.g., "STONE AESTHETICS")',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'label',
                  media: 'icon',
                },
              },
            },
          ],
          validation: (Rule) => Rule.min(1).max(10),
        }),
      ],
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
                      name: 'textSection',
                      title: 'Text Section',
                      type: 'object',
                      description: 'Large main text with italic description',
                      fields: [
                        defineField({
                          name: 'mainText',
                          title: 'Main Text',
                          type: 'string',
                          description: 'Large text displayed prominently',
                        }),
                        defineField({
                          name: 'description',
                          title: 'Description',
                          type: 'text',
                          rows: 2,
                          description: 'Smaller italic text below main text',
                        }),
                      ],
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
