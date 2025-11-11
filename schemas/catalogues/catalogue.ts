import { defineType, defineField } from 'sanity'

export const catalogue = defineType({
  name: 'catalogue',
  title: 'Catalogue',
  type: 'document',
  description: 'Catalogue items for documentation and downloads',
  fields: [
    defineField({
      name: 'id',
      title: 'Catalogue ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Unique identifier for deep linking (e.g., "plaquettes-produits", "nuanciers-decors")',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Catalogue title (e.g., "Plaquettes produits")',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short description shown in the accordion header',
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      description: 'Longer overview text shown in the expanded content section',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main image for the catalogue (optional)',
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
      description: 'Alt text for the image',
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
              name: 'fileUrl',
              title: 'File URL',
              type: 'url',
              description: 'URL to download the document',
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
              initialValue: 'Download',
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
      description: 'List of downloadable documents for this catalogue',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order for the catalogue (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'id',
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})

