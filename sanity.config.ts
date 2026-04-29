import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'loxen-cms',
  title: 'Loxen CMS',
  projectId: 'uoshkmah',
  dataset: 'production',
  basePath: '/cms',
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})