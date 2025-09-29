#!/usr/bin/env node

/**
 * Environment Setup Helper
 * Helps configure environment variables for Sanity product population
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

async function setupEnvironment() {
  console.log('🔧 Sanity Environment Setup')
  console.log('============================')
  console.log('')
  
  // Check if .env.local exists
  const envPath = path.join(process.cwd(), '.env.local')
  const envExists = fs.existsSync(envPath)
  
  if (envExists) {
    console.log('📁 Found existing .env.local file')
    const update = await question('Do you want to update it? (y/n): ')
    if (update.toLowerCase() !== 'y') {
      console.log('✅ Setup cancelled')
      rl.close()
      return
    }
  }
  
  console.log('')
  console.log('Please provide your Sanity project details:')
  console.log('(You can find these in your Sanity management console)')
  console.log('')
  
  // Get project details
  const projectId = await question('🔑 Project ID: ')
  const dataset = await question('📊 Dataset (production/development) [production]: ') || 'production'
  
  console.log('')
  console.log('🎫 For the API token:')
  console.log('   1. Go to https://manage.sanity.io')
  console.log('   2. Select your project')
  console.log('   3. Go to API > Tokens')
  console.log('   4. Create a new token with Editor permissions')
  console.log('')
  
  const apiToken = await question('🔐 API Token: ')
  
  // Validate inputs
  if (!projectId || !apiToken) {
    console.log('❌ Project ID and API Token are required')
    rl.close()
    return
  }
  
  // Create environment file content
  const envContent = `# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=${projectId}
NEXT_PUBLIC_SANITY_DATASET=${dataset}
SANITY_API_TOKEN=${apiToken}

# Generated on ${new Date().toISOString()}
`
  
  try {
    fs.writeFileSync(envPath, envContent)
    console.log('')
    console.log('✅ Environment file created successfully!')
    console.log(`📄 File location: ${envPath}`)
    console.log('')
    console.log('🚀 Next steps:')
    console.log('   1. Run: npm run populate:products')
    console.log('   2. Check your Sanity Studio for the new products')
    console.log('   3. Add images and documents in Sanity Studio')
    
  } catch (error) {
    console.error('❌ Error creating environment file:', error.message)
  }
  
  rl.close()
}

// Test connection function
async function testConnection() {
  const { createClient } = require('@sanity/client')
  
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false
  })
  
  try {
    console.log('🔍 Testing Sanity connection...')
    const result = await client.fetch('*[_type == "productCategory"][0...1] { _id, name }')
    console.log('✅ Connection successful!')
    console.log(`📊 Found ${result.length} categories in dataset`)
    return true
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    return false
  }
}

// CLI handling
async function main() {
  const args = process.argv.slice(2)
  
  if (args.includes('--test')) {
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
    
    await testConnection()
  } else {
    await setupEnvironment()
  }
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { setupEnvironment, testConnection }