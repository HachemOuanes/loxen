import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read the HTML file
const htmlContent = fs.readFileSync(path.join(__dirname, '../decors.html'), 'utf8')

// Extract decor data using regex
function extractDecorData(html) {
  const decorItems = []
  
  // Regex to match each <li> element with decor data
  const liRegex = /<li[^>]*data-code="([^"]*)"[^>]*data-title="([^"]*)"[^>]*data-name="([^"]*)"[^>]*data-collection="([^"]*)"[^>]*data-cover="([^"]*)"[^>]*>[\s\S]*?data-default="([^"]*)"[\s\S]*?<span class="wk_campione__code">([^<]*)<\/span>[\s\S]*?<span class="wk_campione__name">([^<]*)<\/span>[\s\S]*?<\/li>/g
  
  let match
  while ((match = liRegex.exec(html)) !== null) {
    const [
      fullMatch,
      dataCode,
      dataTitle,
      dataName,
      dataCollection,
      dataCover,
      dataDefault,
      code,
      name
    ] = match
    
    // Clean up the data
    const cleanCode = code.trim()
    const cleanName = name.trim().replace(/\s+/g, ' ').replace(/\r\n/g, ' ').replace(/\n/g, ' ')
    const cleanTitle = dataTitle.trim()
    const cleanCollection = dataCollection.trim() || 'Abet'
    const cleanCover = dataCover.trim()
    const cleanDefault = dataDefault.trim()
    
    // Determine category based on class names
    let category = 'interior' // default
    if (fullMatch.includes('exterior')) {
      category = 'exterior'
    }
    
    decorItems.push({
      id: cleanCode,
      code: cleanCode,
      name: cleanName,
      title: cleanTitle,
      image: cleanDefault,
      cover: cleanCover,
      collection: cleanCollection || 'Abet',
      category: category,
      available: true
    })
  }
  
  return decorItems
}

// Extract the data
console.log('🔍 Extracting decor data from HTML...')
const decorData = extractDecorData(htmlContent)

console.log(`✅ Extracted ${decorData.length} decor items`)

// Save to JSON file
const outputPath = path.join(__dirname, '../extracted-decor-data-from-html.json')
fs.writeFileSync(outputPath, JSON.stringify(decorData, null, 2))

console.log(`💾 Saved decor data to: ${outputPath}`)

// Display first few items as preview
console.log('\n📋 Preview of extracted data:')
console.log(JSON.stringify(decorData.slice(0, 5), null, 2))

// Display statistics
const interiorCount = decorData.filter(item => item.category === 'interior').length
const exteriorCount = decorData.filter(item => item.category === 'exterior').length
const collections = [...new Set(decorData.map(item => item.collection))]

console.log('\n📊 Statistics:')
console.log(`   Total items: ${decorData.length}`)
console.log(`   Interior: ${interiorCount}`)
console.log(`   Exterior: ${exteriorCount}`)
console.log(`   Collections: ${collections.join(', ')}`)

export { extractDecorData }
