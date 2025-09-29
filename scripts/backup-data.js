/**
 * Backup existing product data from Sanity
 * Run before population to preserve existing data
 */

const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', 
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
})

async function backupData() {
  try {
    console.log('🔄 Creating backup of existing Sanity data...')
    
    // Fetch all product categories
    const categories = await client.fetch('*[_type == "productCategory"]')
    console.log(`📁 Found ${categories.length} product categories`)
    
    // Fetch all products
    const products = await client.fetch('*[_type == "productItem"]')
    console.log(`📦 Found ${products.length} products`)
    
    // Create backup data structure
    const backupData = {
      timestamp: new Date().toISOString(),
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      categories,
      products,
      stats: {
        categoriesCount: categories.length,
        productsCount: products.length
      }
    }
    
    // Create backup directory if it doesn't exist
    const backupDir = path.join(process.cwd(), 'backups')
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true })
    }
    
    // Generate backup filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
    const backupFile = path.join(backupDir, `sanity-backup-${timestamp}.json`)
    
    // Write backup file
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2))
    
    console.log(`✅ Backup created successfully!`)
    console.log(`📄 File: ${backupFile}`)
    console.log(`📊 Backed up: ${categories.length} categories, ${products.length} products`)
    
    return backupFile
    
  } catch (error) {
    console.error('❌ Backup failed:', error.message)
    throw error
  }
}

async function restoreData(backupFile) {
  try {
    console.log(`🔄 Restoring data from ${backupFile}...`)
    
    // Read backup file
    const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf8'))
    
    console.log(`📊 Backup contains: ${backupData.stats.categoriesCount} categories, ${backupData.stats.productsCount} products`)
    console.log(`📅 Backup created: ${backupData.timestamp}`)
    
    // Restore categories first
    for (const category of backupData.categories) {
      await client.createOrReplace(category)
      console.log(`✅ Restored category: ${category.name}`)
    }
    
    // Restore products
    for (const product of backupData.products) {
      await client.createOrReplace(product)
      console.log(`✅ Restored product: ${product.name}`)
    }
    
    console.log('✅ Restore completed successfully!')
    
  } catch (error) {
    console.error('❌ Restore failed:', error.message)
    throw error
  }
}

async function listBackups() {
  const backupDir = path.join(process.cwd(), 'backups')
  
  if (!fs.existsSync(backupDir)) {
    console.log('📁 No backup directory found')
    return []
  }
  
  const files = fs.readdirSync(backupDir)
    .filter(file => file.startsWith('sanity-backup-') && file.endsWith('.json'))
    .map(file => {
      const filePath = path.join(backupDir, file)
      const stats = fs.statSync(filePath)
      return {
        filename: file,
        path: filePath,
        size: stats.size,
        created: stats.birthtime
      }
    })
    .sort((a, b) => b.created - a.created)
  
  console.log(`📁 Found ${files.length} backup files:`)
  files.forEach((file, index) => {
    const sizeKB = (file.size / 1024).toFixed(1)
    console.log(`   ${index + 1}. ${file.filename} (${sizeKB}KB) - ${file.created.toLocaleDateString()}`)
  })
  
  return files
}

// CLI handling
async function main() {
  const args = process.argv.slice(2)
  const command = args[0]
  
  // Load environment variables
  const envPath = path.join(process.cwd(), '.env.local')
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    const lines = envContent.split('\n')
    lines.forEach(line => {
      const [key, value] = line.split('=')
      if (key && value) {
        process.env[key.trim()] = value.trim()
      }
    })
  }
  
  // Check required environment variables
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error('❌ Missing required environment variables')
    console.log('💡 Run: npm run setup:env')
    process.exit(1)
  }
  
  try {
    switch (command) {
      case 'backup':
        await backupData()
        break
        
      case 'restore':
        const backupFile = args[1]
        if (!backupFile) {
          console.log('📁 Available backups:')
          await listBackups()
          console.log('Usage: npm run backup:restore <backup-file>')
          process.exit(1)
        }
        await restoreData(backupFile)
        break
        
      case 'list':
        await listBackups()
        break
        
      default:
        console.log('Sanity Backup Tool')
        console.log('==================')
        console.log('')
        console.log('Commands:')
        console.log('  backup  - Create backup of current data')
        console.log('  restore - Restore from backup file') 
        console.log('  list    - List available backups')
        console.log('')
        console.log('Usage:')
        console.log('  npm run backup:create')
        console.log('  npm run backup:restore backups/sanity-backup-2025-09-29.json')
        console.log('  npm run backup:list')
    }
  } catch (error) {
    console.error('❌ Operation failed:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = { backupData, restoreData, listBackups }