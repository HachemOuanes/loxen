import { createClient } from '@sanity/client'
import XLSX from 'xlsx'
import path from 'path'
import https from 'https'
import http from 'http'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const API_TOKEN = process.env.SANITY_SEED_TOKEN || 'skjC3Z4UrQOBt4Ge2YnPHNSAw25tmt67P0lViyBLgwJnabOO3RYoblFQkZZ49fkXIKEL7vPKSYC3OP0TrB2eCBErBzTrmQIFkw2ixlDWZ9qxh454fPYAnvVgH9R94axUFNmCsS1UurEyC51mELfavVVwGVaBQ6rXyXRKKIEHUH1fOMf0YHoq'

const client = createClient({
  projectId: 'uoshkmah',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: API_TOKEN,
  useCdn: false,
})

const VALID_COLORS = ['beige', 'bianco', 'blu', 'giallo', 'grigio', 'marron', 'nero', 'rosa', 'rosso', 'verde', 'viola']

const VALID_COLLECTIONS = [
  'Colours', 'Full colour', 'HR-LAQ', 'Labgrade', 'Legni dark', 'Legni light',
  'MEG', 'MEG-H', 'Magnetico', 'Metal effect', 'Polaris Contemporary', 'Rocks', 'Walkprint',
]

const VALID_FINISHES = [
  '66', 'aquarama', 'bark', 'climb', 'cross', 'dharma', 'geo', 'grainwood', 'grana 2',
  'holz', 'longline', 'luc-2', 'lucida', 'mandarin', 'microline', 'millerighe',
  'millerighe 2', 'morbida', 'nutshell', 'ostuni', 'papier', 'polaris',
  'polaris contemporary', 'root', 'satin', 'sei', 'soft', 'velwood', 'zodia', 'zodia 3',
]

function parseList(value) {
  if (!value) return []
  return value.split(',').map(s => s.trim()).filter(Boolean)
}

function normalizeColors(raw) {
  return parseList(raw)
    .map(c => c.toLowerCase())
    .filter(c => VALID_COLORS.includes(c))
}

function normalizeCollections(raw) {
  const items = parseList(raw)
  return items.filter(item => {
    return VALID_COLLECTIONS.find(vc => vc.toLowerCase() === item.toLowerCase())
  }).map(item => {
    return VALID_COLLECTIONS.find(vc => vc.toLowerCase() === item.toLowerCase()) || item
  })
}

function normalizeFinishes(raw) {
  const items = parseList(raw)
  return items.map(i => i.toLowerCase().trim()).filter(f => VALID_FINISHES.includes(f))
}

function fetchImageBuffer(url) {
  return new Promise((resolve, reject) => {
    const httpClient = url.startsWith('https') ? https : http
    httpClient.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchImageBuffer(res.headers.location).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`))
      }
      const chunks = []
      res.on('data', chunk => chunks.push(chunk))
      res.on('end', () => resolve(Buffer.concat(chunks)))
      res.on('error', reject)
    }).on('error', reject)
  })
}

async function uploadImage(imageUrl, filename) {
  try {
    console.log(`  Fetching image: ${imageUrl}`)
    const buffer = await fetchImageBuffer(imageUrl)
    const asset = await client.assets.upload('image', buffer, {
      filename: filename || 'decor.jpg',
      contentType: 'image/jpeg',
    })
    console.log(`  Uploaded image: ${asset._id}`)
    return asset._id
  } catch (err) {
    console.error(`  Failed to upload image from ${imageUrl}: ${err.message}`)
    return null
  }
}

async function deleteAllDecors() {
  console.log('Fetching existing decors to delete...')
  const existing = await client.fetch('*[_type == "decor"]._id')
  if (existing.length === 0) {
    console.log('No existing decors found.')
    return
  }
  console.log(`Found ${existing.length} existing decors. Deleting in batches...`)

  const batchSize = 50
  for (let i = 0; i < existing.length; i += batchSize) {
    const batch = existing.slice(i, i + batchSize)
    let tx = client.transaction()
    for (const id of batch) {
      tx = tx.delete(id)
    }
    await tx.commit()
    console.log(`  Deleted batch ${Math.floor(i / batchSize) + 1} (${batch.length} docs)`)
  }
  console.log('All existing decors deleted.')
}

async function main() {
  const xlsxPath = path.resolve(__dirname, '..', 'data', 'decors_clean.xlsx')
  console.log(`Reading data from: ${xlsxPath}`)

  const wb = XLSX.readFile(xlsxPath)
  const ws = wb.Sheets[wb.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(ws)

  console.log(`Found ${rows.length} rows in spreadsheet.\n`)

  // Delete existing decors first
  await deleteAllDecors()
  console.log('')

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const externalCode = String(row.external_code || '')
    const name = row.name || ''
    console.log(`[${i + 1}/${rows.length}] Processing: ${externalCode} - ${name}`)

    try {
      const collections = normalizeCollections(row.collections)
      const finishes = normalizeFinishes(row.finishes)
      const colors = normalizeColors(row.colors)
      const interior = String(row.interior || '').toLowerCase() === 'yes'
      const exterior = String(row.exterior || '').toLowerCase() === 'yes'
      const imageUrl = row.image_url || ''

      // Build the document
      const doc = {
        _type: 'decor',
        external_order: row.external_order || 0,
        external_code: externalCode,
        name,
        collections,
        finishes,
        colors,
        interior,
        exterior,
        image_url: imageUrl || undefined,
      }

      // Upload image and store both the asset and the URL
      if (imageUrl) {
        const assetId = await uploadImage(imageUrl, `${externalCode}.jpg`)
        if (assetId) {
          doc.image = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId,
            },
          }
        }
      }

      await client.create(doc)
      console.log(`  Created decor: ${externalCode} - ${name}`)
      successCount++
    } catch (err) {
      console.error(`  ERROR creating ${externalCode}: ${err.message}`)
      errorCount++
    }
  }

  console.log(`\n=== SEED COMPLETE ===`)
  console.log(`Success: ${successCount}`)
  console.log(`Errors: ${errorCount}`)
  console.log(`Total: ${rows.length}`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
