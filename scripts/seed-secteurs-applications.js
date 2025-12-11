// Seed script to migrate legacy sections (applications) into applicationsPrimary/applicationsSecondary
// Usage:
//   SANITY_API_TOKEN="xxxxx" node scripts/seed-secteurs-applications.js

import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uoshkmah',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function migrateApplications() {
  const secteurs = await client.fetch(`
    *[_type == "secteur"]{
      _id,
      sections[]{
        type,
        items[]{
          title,
          subtitle,
          description,
          textSection,
          features,
          image
        }
      },
      applicationsPrimary,
      applicationsSecondary
    }
  `)

  for (const secteur of secteurs) {
    const legacyItems =
      secteur.sections
        ?.filter((s) => s?.type === 'applications')
        ?.flatMap((s) => s.items || []) || []

    const hasNewPrimary = secteur.applicationsPrimary?.items?.length
    const hasNewSecondary = secteur.applicationsSecondary?.items?.length

    // If already migrated, skip
    if (hasNewPrimary || hasNewSecondary) {
      continue
    }

    const primaryItems = legacyItems.slice(0, 4)
    const secondaryItems = legacyItems.slice(4, 7)

    // Nothing to migrate
    if (!primaryItems.length && !secondaryItems.length) {
      continue
    }

    await client
      .patch(secteur._id)
      .set({
        applicationsPrimary: { items: primaryItems },
        applicationsSecondary: { items: secondaryItems }
      })
      .unset(['sections'])
      .commit()

    console.log(`Migrated secteur ${secteur._id}: ${primaryItems.length} -> primary, ${secondaryItems.length} -> secondary`)
  }

  console.log('Migration complete.')
}

migrateApplications().catch((err) => {
  console.error(err)
  process.exit(1)
})

