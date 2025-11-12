import { defineType, defineField } from 'sanity'

export const inspiration = defineType({
  name: 'inspiration',
  title: 'Inspiration',
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
      name: 'applicationsSection',
      title: 'Applications Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Optional title displayed above the section',
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
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          description: 'Toggle to display/hide this section on the inspiration page',
          initialValue: true,
        }),
      ],
      preview: {
        select: {
          title: 'title',
        },
        prepare({ title }) {
          return {
            title: `Applications: ${title || 'Untitled'}`,
          }
        },
      },
    }),
    defineField({
      name: 'collageSection',
      title: 'Collage Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Optional title displayed above the section',
        }),
        defineField({
          name: 'images',
          title: 'Collage Images',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        }),
        defineField({
          name: 'tiles',
          title: 'Text Tiles',
          type: 'array',
          of: [
            {
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
            },
          ],
        }),
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          description: 'Toggle to display/hide this section on the inspiration page',
          initialValue: true,
        }),
      ],
      preview: {
        prepare() {
          return {
            title: 'Collage Section',
          }
        },
      },
    }),
    defineField({
      name: 'bigImages',
      title: 'Big Images (Below Collage)',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Optional title displayed above the section',
        }),
        defineField({
          name: 'images',
          title: 'Big Images',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'leftText',
                  title: 'Left Text (Optional)',
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
                  title: 'Right Text (Optional)',
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
              ],
              preview: {
                select: {
                  media: 'image',
                },
                prepare({ media }) {
                  return {
                    title: 'Big Image',
                    media: media,
                  }
                },
              },
            },
          ],
        }),
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          description: 'Toggle to display/hide this section on the inspiration page',
          initialValue: true,
        }),
      ],
      description: 'List of large images displayed below the collage section. Each image can have optional left and right text.',
    }),
    defineField({
      name: 'splitSection',
      title: 'Split Section (Below Big Image)',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Optional title displayed above the section',
        }),
        defineField({
          name: 'topImage',
          title: 'Top Left Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'topText',
          title: 'Top Right Text',
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
          name: 'bottomImage',
          title: 'Bottom Full Width Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          description: 'Toggle to display/hide this section on the inspiration page',
          initialValue: true,
        }),
      ],
      preview: {
        prepare() {
          return {
            title: 'Split Section',
          }
        },
      },
    }),
    defineField({
      name: 'gridSection',
      title: 'Grid Section (4 Boxes)',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Optional title displayed above the section',
        }),
        defineField({
          name: 'text',
          title: 'Top Left Text',
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
          title: 'Images (3 images for other boxes)',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
          validation: (Rule) => Rule.min(3).max(3),
        }),
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          description: 'Toggle to display/hide this section on the inspiration page',
          initialValue: true,
        }),
      ],
      preview: {
        prepare() {
          return {
            title: 'Grid Section',
          }
        },
      },
    }),
    defineField({
      name: 'showFinitions',
      title: 'Show Finitions Section',
      type: 'boolean',
      description: 'Toggle to display/hide the Finitions section on this inspiration page',
      initialValue: true,
    }),
    defineField({
      name: 'showDecors',
      title: 'Show Decors Section',
      type: 'boolean',
      description: 'Toggle to display/hide the Decors section on this inspiration page',
      initialValue: true,
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
        defineField({
          name: 'contactLink',
          title: 'Contact Link',
          type: 'string',
          initialValue: '/contact',
        }),
        defineField({
          name: 'contactCta',
          title: 'Contact CTA Text',
          type: 'string',
          initialValue: 'Nous contacter',
        }),
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          description: 'Toggle to display/hide this section on the inspiration page',
          initialValue: true,
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

