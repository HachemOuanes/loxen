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
        }),
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          description: 'Toggle to display/hide this section on the secteur page',
          initialValue: true,
        }),
      ],
    }),
    // Showcase Section (placed before applications to match CMS order)
    // Applications – Primary (image right / text left)
    defineField({
      name: 'applicationsPrimary',
      title: 'Applications – Primary',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          description: 'Toggle to display/hide this section on the secteur page',
          initialValue: true,
        }),
        defineField({
          name: 'items',
          title: 'Application Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Item Title', type: 'string' }),
                defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
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
                  fields: [
                    defineField({ name: 'mainText', title: 'Main Text', type: 'string' }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                      rows: 2,
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
                  options: { hotspot: true },
                }),
              ],
              preview: {
                select: { title: 'title', subtitle: 'subtitle', media: 'image' },
              },
            },
          ],
        }),
      ],
    }),
    // Applications – Secondary (image left / text right)
    defineField({
      name: 'applicationsSecondary',
      title: 'Applications – Secondary',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          description: 'Toggle to display/hide this section on the secteur page',
          initialValue: true,
        }),
        defineField({
          name: 'items',
          title: 'Application Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Item Title', type: 'string' }),
                defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
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
                  fields: [
                    defineField({ name: 'mainText', title: 'Main Text', type: 'string' }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                      rows: 2,
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
                  options: { hotspot: true },
                }),
              ],
              preview: {
                select: { title: 'title', subtitle: 'subtitle', media: 'image' },
              },
            },
          ],
        }),
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
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          description: 'Toggle to display/hide this section on the secteur page',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'customizationSection',
      title: 'Customization Section',
      type: 'object',
      description: 'Customization section with Abet Digital information',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'Main title (e.g., "Conceptions personnalisées avec Abet Digital")',
        }),
        defineField({
          name: 'mainText',
          title: 'Main Text',
          type: 'text',
          rows: 3,
          description: 'Primary description text',
        }),
        defineField({
          name: 'secondaryText',
          title: 'Secondary Text',
          type: 'text',
          rows: 3,
          description: 'Secondary description text',
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          description: 'Call to action button text',
        }),
        defineField({
          name: 'ctaLink',
          title: 'CTA Link',
          type: 'string',
          description: 'Call to action button link',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Right side image for the customization section',
        }),
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          description: 'Toggle to display/hide this section on the secteur page',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'productsSection',
      title: 'Products Section',
      type: 'object',
      description: 'Products section displayed at the end of the page',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Produits',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          description: 'Small uppercase text above the title',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          description: 'Description text displayed on the right side',
        }),
        defineField({
          name: 'products',
          title: 'Selected Products',
          type: 'array',
          description: 'Select specific products to display (max 6)',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'productType',
                  title: 'Product Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Interior', value: 'interior' },
                      { title: 'Exterior', value: 'exterior' },
                    ],
                  },
                }),
                defineField({
                  name: 'product',
                  title: 'Product',
                  type: 'reference',
                  to: [
                    { type: 'interiorProduct' },
                    { type: 'exteriorProduct' },
                  ],
                }),
              ],
              preview: {
                select: {
                  productType: 'productType',
                  productName: 'product.name',
                },
                prepare({ productType, productName }) {
                  return {
                    title: productName || 'Product',
                    subtitle: productType === 'interior' ? 'Interior' : 'Exterior',
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
          description: 'Toggle to display/hide this section on the secteur page',
          initialValue: true,
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
          description: 'Title text (e.g., "projet", "vision")',
        }),
        defineField({
          name: 'description',
          title: 'Contact Description',
          type: 'text',
          rows: 3,
          description: 'Description text for the CTA section',
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          description: 'Text displayed on the call-to-action button',
          initialValue: 'Nous contacter',
        }),
        defineField({
          name: 'ctaLink',
          title: 'CTA Link',
          type: 'string',
          description: 'URL for the call-to-action button',
          initialValue: '/contact',
        }),
        defineField({
          name: 'enabled',
          title: 'Show Section',
          type: 'boolean',
          description: 'Toggle to display/hide this section on the secteur page',
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
