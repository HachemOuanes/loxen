import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Collection mapping based on filter dropdown
const COLLECTION_MAP = {
  'c2': 'Colours',
  'c95': 'DIGITAL CIRCUS',
  'c75': 'DIGITAL NATURE',
  'c10': 'Decori minimi',
  'c6': 'Design Edition',
  'c42': 'Diafos',
  'c84': 'Externa',
  'c89': 'FEBO',
  'c94': 'Fabriek',
  'c81': 'Fluo',
  'c85': 'Foldline',
  'c25': 'Full colour',
  'c49': 'HR-LAQ',
  'cHA': 'Hachure',
  'c24': 'Interni',
  'c27': 'Labgrade',
  'c54': 'Labgrade Plus',
  'c9B': 'Legni dark',
  'c9A': 'Legni light',
  'c37': 'MEG',
  'c996': 'MEG-H',
  'c22': 'Magnetico',
  'c999': 'Mare Nostrum',
  'c93': 'Metal effect',
  'c31': 'Metalli',
  'c998': 'Naval Deck',
  'c71': 'PARADE',
  'c78': 'Polaris',
  'c7B': 'Polaris Contemporary',
  'c51': 'Polaris Foldline',
  'c9': 'Rocks',
  'c0A': 'WHIMSY',
  'c38': 'Walkprint',
  'c997': 'Work In Progress'
}

// Read the HTML file (try both decors.html and whole.html)
let htmlContent
const decorPath = path.join(__dirname, '../decors.html')
const wholePath = path.join(__dirname, '../whole.html')

if (fs.existsSync(decorPath)) {
  htmlContent = fs.readFileSync(decorPath, 'utf8')
  console.log('📖 Reading from decors.html...')
} else if (fs.existsSync(wholePath)) {
  htmlContent = fs.readFileSync(wholePath, 'utf8')
  console.log('📖 Reading from whole.html...')
} else {
  console.error('❌ No HTML file found!')
  process.exit(1)
}

// Extract collection classes from a class string
function extractCollections(classString) {
  const collections = []
  const collectionCodes = Object.keys(COLLECTION_MAP)
  
  collectionCodes.forEach(code => {
    // Match the exact class code (e.g., "c2", "c37", "c996")
    const regex = new RegExp(`\\b${code}\\b`)
    if (regex.test(classString)) {
      collections.push({
        code: code,
        name: COLLECTION_MAP[code]
      })
    }
  })
  
  return collections
}

// Extract color from class names
function extractColor(classString) {
  const colorMatches = classString.match(/\b(bianco|nero|grigio|beige|rosa|rosso|verde|giallo|arancione|marrone|azzurro|blu|viola|oro)\b/)
  return colorMatches ? colorMatches[0] : null
}

// Extract decor data using regex
function extractDecorData(html) {
  const decorItems = []
  
  // Regex to match each <li> element with decor data - improved to capture class attribute
  const liRegex = /<li[^>]*data-code="([^"]*)"[^>]*data-title="([^"]*)"[^>]*data-name="([^"]*)"[^>]*data-collection="([^"]*)"[^>]*data-cover="([^"]*)"[^>]*class="([^"]*)"[^>]*>[\s\S]*?data-default="([^"]*)"[\s\S]*?<span class="wk_campione__code">([^<]*)<\/span>[\s\S]*?<span class="wk_campione__name">([^<]*?(?:<br>.*?)?)<\/span>[\s\S]*?<\/li>/g
  
  let match
  let count = 0
  while ((match = liRegex.exec(html)) !== null) {
    const [
      fullMatch,
      dataCode,
      dataTitle,
      dataName,
      dataCollection,
      dataCover,
      classNames,
      dataDefault,
      code,
      name
    ] = match
    
    // Clean up the data
    const cleanCode = code.trim()
    const cleanName = name
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\r\n/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/<br>.*$/g, '') // Remove discontinued/designer notes
      .replace(/<span[^>]*>.*?<\/span>/g, '') // Remove span tags and content
      .replace(/<[^>]*>/g, '') // Remove any remaining HTML tags
      .trim()
    const cleanTitle = dataTitle.trim()
    const cleanCollection = dataCollection.trim() || 'Abet'
    const cleanCover = dataCover.trim()
    const cleanDefault = dataDefault.trim()
    
    // Extract collections from class names
    const collections = extractCollections(classNames)
    
    // Determine primary category (interior/exterior)
    let applicationType = []
    if (classNames.includes('interior')) {
      applicationType.push('interior')
    }
    if (classNames.includes('exterior')) {
      applicationType.push('exterior')
    }
    if (applicationType.length === 0) {
      applicationType.push('interior') // default
    }
    
    // Extract color
    const color = extractColor(classNames)
    
    decorItems.push({
      id: cleanCode,
      code: cleanCode,
      name: cleanName,
      title: cleanTitle,
      image: cleanDefault,
      cover: cleanCover,
      collection: cleanCollection || 'Abet',
      collections: collections, // Array of all collections this decor belongs to
      applicationType: applicationType, // ['interior'] or ['exterior'] or both
      color: color,
      available: true
    })
    
    count++
  }
  
  return decorItems
}

// Extract the data
console.log('🔍 Extracting decor data with collections from HTML...')
const decorData = extractDecorData(htmlContent)

console.log(`✅ Extracted ${decorData.length} decor items`)

// Save to JSON file
const outputPath = path.join(__dirname, '../decor-data-with-collections.json')
fs.writeFileSync(outputPath, JSON.stringify(decorData, null, 2))

console.log(`💾 Saved decor data to: ${outputPath}`)

// Display first few items as preview
console.log('\n📋 Preview of extracted data:')
console.log(JSON.stringify(decorData.slice(0, 3), null, 2))

// Display statistics
const interiorCount = decorData.filter(item => item.applicationType.includes('interior')).length
const exteriorCount = decorData.filter(item => item.applicationType.includes('exterior')).length
const bothCount = decorData.filter(item => item.applicationType.includes('interior') && item.applicationType.includes('exterior')).length

// Count products per collection
const collectionStats = {}
decorData.forEach(item => {
  item.collections.forEach(col => {
    if (!collectionStats[col.name]) {
      collectionStats[col.name] = 0
    }
    collectionStats[col.name]++
  })
})

console.log('\n📊 Statistics:')
console.log(`   Total items: ${decorData.length}`)
console.log(`   Interior only: ${interiorCount - bothCount}`)
console.log(`   Exterior only: ${exteriorCount - bothCount}`)
console.log(`   Both interior & exterior: ${bothCount}`)

console.log('\n📦 Products per Collection:')
Object.entries(collectionStats)
  .sort((a, b) => b[1] - a[1]) // Sort by count descending
  .forEach(([name, count]) => {
    console.log(`   ${name}: ${count}`)
  })

export { extractDecorData }

