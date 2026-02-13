import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    // Basic Info
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main product title displayed in the hero section',
    }),
    defineField({
      name: 'type',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'Intérieur', value: 'interieur' },
          { title: 'Extérieur', value: 'exterieur' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'interieur',
      description: 'Whether this product is for interior or exterior applications',
    }),

    // Hero Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'overviewLeftText',
          title: 'Overview Left Text',
          type: 'text',
          rows: 3,
          description: 'Large text displayed in the left column of overview',
        }),
        defineField({
          name: 'overviewRightText',
          title: 'Overview Right Text',
          type: 'text',
          rows: 4,
          description: 'Smaller text displayed in the right column of overview',
        }),
        defineField({
          name: 'contactCta',
          title: 'Contact CTA Button Text',
          type: 'string',
          initialValue: 'Explorer les décors',
        }),
      ],
    }),

    // Decors Section
    defineField({
      name: 'showDecors',
      title: 'Show Decors Section',
      type: 'boolean',
      description: 'Toggle to display/hide the Decors section below hero',
      initialValue: true,
    }),

    // Specification Section
    defineField({
      name: 'specificationSection',
      title: 'Specification Section',
      type: 'object',
      fields: [
        defineField({
          name: 'caracteristiques',
          title: 'Caractéristiques',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Caractéristiques',
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
        }),
        defineField({
          name: 'applications',
          title: 'Applications',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Applications',
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
        }),
        defineField({
          name: 'format',
          title: 'Format (mm)',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Format',
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Format dimensions (e.g., "3050 × 1300")',
            }),
          ],
        }),
        defineField({
          name: 'epaisseur',
          title: 'Épaisseur (mm)',
          type: 'string',
          description: 'Thickness values in one line (e.g., "6 - 8 - 10 - 12")',
        }),
      ],
    }),

    // Showcase Section
    defineField({
      name: 'showcaseSection',
      title: 'Showcase Section',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          initialValue: true,
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
          name: 'leftText',
          title: 'Left Text',
          type: 'object',
          fields: [
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
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
          ],
        }),
        defineField({
          name: 'rightText',
          title: 'Right Text',
          type: 'object',
          fields: [
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
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
          ],
        }),
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
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Characteristics Section
    defineField({
      name: 'characteristicsSection',
      title: 'Characteristics Section',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'accordionItems',
          title: 'Accordion Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 2,
                }),
                defineField({
                  name: 'content',
                  title: 'Content',
                  type: 'text',
                  rows: 4,
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  description: 'Image that displays when this accordion item is open',
                }),
                defineField({
                  name: 'imageAlt',
                  title: 'Image Alt Text',
                  type: 'string',
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  media: 'image',
                },
              },
            },
          ],
        }),
      ],
    }),

    // Split Images Section
    defineField({
      name: 'splitImagesSection',
      title: 'Split Images Section',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Applications',
        }),
        defineField({
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'leftImage',
                  title: 'Left Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
                defineField({
                  name: 'leftImageAlt',
                  title: 'Left Image Alt Text',
                  type: 'string',
                }),
                defineField({
                  name: 'rightImage',
                  title: 'Right Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
                defineField({
                  name: 'rightImageAlt',
                  title: 'Right Image Alt Text',
                  type: 'string',
                }),
                defineField({
                  name: 'leftText',
                  title: 'Left Text',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'subtitle',
                      title: 'Subtitle',
                      type: 'string',
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
                  ],
                }),
                defineField({
                  name: 'rightText',
                  title: 'Right Text',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'subtitle',
                      title: 'Subtitle',
                      type: 'string',
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
                  ],
                }),
              ],
              preview: {
                select: {
                  title: 'leftText.title',
                  subtitle: 'rightText.title',
                  media: 'leftImage',
                },
              },
            },
          ],
        }),
      ],
    }),

    // Technical Documents Section
    defineField({
      name: 'technicalDocumentsSection',
      title: 'Technical Documents Section',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Technical Document',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'documents',
          title: 'Documents',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Document Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'file',
                  title: 'Upload File',
                  type: 'file',
                  description: 'Upload a PDF or other document file',
                  options: {
                    accept: '.pdf,.doc,.docx,.zip,.rfa,.rvt',
                  },
                }),
                defineField({
                  name: 'fileUrl',
                  title: 'File URL (Alternative)',
                  type: 'url',
                  description: 'Or provide a URL to download the document (if not uploading a file)',
                }),
                defineField({
                  name: 'fileType',
                  title: 'File Type',
                  type: 'string',
                  description: 'File type (e.g., "PDF", "DOCX", "RFA")',
                  options: {
                    list: [
                      { title: 'PDF', value: 'PDF' },
                      { title: 'DOCX', value: 'DOCX' },
                      { title: 'DOC', value: 'DOC' },
                      { title: 'RFA', value: 'RFA' },
                      { title: 'RVT', value: 'RVT' },
                      { title: 'ZIP', value: 'ZIP' },
                    ],
                  },
                }),
                defineField({
                  name: 'downloadText',
                  title: 'Download Button Text',
                  type: 'string',
                  initialValue: 'Télécharger',
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'fileType',
                },
              },
            },
          ],
        }),
      ],
    }),

    // Contact CTA Section
    defineField({
      name: 'contactSection',
      title: 'Contact CTA Section',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'Optional custom title. If not provided, the product title will be used.',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue: "Besoin d'un conseil personnalisé pour votre projet ? Nos équipes vous accompagnent dans le choix des matériaux et la mise en œuvre.",
        }),
        defineField({
          name: 'contactCta',
          title: 'Contact CTA Button Text',
          type: 'string',
          initialValue: 'Nous contacter',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      media: 'characteristicsSection.defaultImage',
    },
    prepare({ title, type, media }) {
      const typeLabel = type === 'interieur' ? 'Intérieur' : 'Extérieur'
      return {
        title: `${typeLabel} - ${title}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Type',
      name: 'typeAsc',
      by: [{ field: 'type', direction: 'asc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
