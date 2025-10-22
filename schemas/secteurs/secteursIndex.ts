import { defineType, defineField } from 'sanity'

export const secteursIndex = defineType({
  name: 'secteursIndex',
  title: 'Secteurs Index',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Solutions pour l\'éducation, la santé et les espaces tertiaires',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      initialValue: 'Des systèmes MEG, Easy MEG et HPL adaptés aux exigences des établissements scolaires, de santé et des bureaux, alliant durabilité, sécurité et esthétique.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secteurs',
      title: 'Secteurs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'secteur' }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
    },
  },
})
