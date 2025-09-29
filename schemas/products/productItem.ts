import { defineType, defineField } from 'sanity'

export const productItem = defineType({
  name: 'productItem',
  title: 'Product Item',
  type: 'document',
  description: 'Products for the dedicated products page with full details and filtering',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
      description: 'Brief description for product cards',
    }),
    defineField({
      name: 'longDescription',
      title: 'Detailed Description',
      type: 'text',
      rows: 6,
      description: 'Detailed product description for featured products and detail views',
    }),
    defineField({
      name: 'image',
      title: 'Main Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Product Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      description: 'Additional product images for galleries',
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    // Product Details Section
    defineField({
      name: 'characteristics',
      title: 'Caractéristiques',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Product characteristics (e.g., "Haute résistance à la lumière du soleil")',
    }),
    defineField({
      name: 'applications',
      title: 'Applications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Common use cases (e.g., "Façades ventilées", "Balcons")',
    }),
    defineField({
      name: 'panelFormats',
      title: 'Format des panneaux (mm)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Available panel sizes (e.g., "3050 x 1300", "4200 x 1300")',
    }),
    defineField({
      name: 'thickness',
      title: 'Épaisseur (mm)',
      type: 'string',
      description: 'Available thickness options (e.g., "6 - 8 - 10 - 12")',
    }),
    defineField({
      name: 'technicalDocuments',
      title: 'Documents techniques',
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
              title: 'Document File',
              type: 'file',
              options: {
                accept: '.pdf,.doc,.docx',
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
              subtitle: 'downloadText',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'bimRequest',
      title: 'BIM Request Available',
      type: 'boolean',
      description: 'Show "Demande de fichier BIM" option',
      initialValue: false,
    }),
    defineField({
      name: 'availableFinishes',
      title: 'Décors disponibles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'code',
              title: 'Finish Code',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Finish Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Finish Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'color',
              title: 'Primary Color',
              type: 'string',
              description: 'Hex color code for preview',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'code',
              media: 'image',
            },
          },
        },
      ],
      description: 'Available finishes/colors for this product',
    }),
    defineField({
      name: 'totalFinishesCount',
      title: 'Total Finishes Available',
      type: 'number',
      description: 'Total number of finishes in collection (e.g., 106 for MEG)',
    }),
    defineField({
      name: 'collectionName',
      title: 'Collection Name',
      type: 'string',
      description: 'Collection this product belongs to (e.g., "Abet")',
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key product features and benefits',
    }),
    defineField({
      name: 'specifications',
      title: 'Technical Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Specification Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Specification Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price Information',
      type: 'string',
      description: 'Price display (e.g., "Sur devis", "À partir de 150€/m²", "Contact pour tarif")',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Display this product in the featured products section',
      initialValue: false,
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      description: 'Product availability status',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order for sorting products (lower numbers appear first)',
      initialValue: 0,
    }),
    defineField({
      name: 'tags',
      title: 'Product Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Tags for additional filtering and search',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'image',
      category: 'category.name',
      featured: 'featured',
    },
    prepare({ title, subtitle, media, category, featured }) {
      return {
        title: `${title}${featured ? ' ⭐' : ''}`,
        subtitle: `${category ? `${category} • ` : ''}${subtitle}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Name Z-A',
      name: 'nameDesc',
      by: [{ field: 'name', direction: 'desc' }],
    },
  ],
})
