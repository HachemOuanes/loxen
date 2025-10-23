const fs = require('fs')
const path = require('path')

function verifySchemaChanges() {
  console.log('🔍 Verifying schema changes...')
  
  const checks = []
  
  // Check 1: Decor schema exists
  const decorSchemaPath = path.join(__dirname, '../schemas/decor.ts')
  if (fs.existsSync(decorSchemaPath)) {
    console.log('✅ Decor schema file exists')
    checks.push({ name: 'Decor schema file', status: 'pass' })
  } else {
    console.log('❌ Decor schema file missing')
    checks.push({ name: 'Decor schema file', status: 'fail' })
  }
  
  // Check 2: Schema index includes decor
  const schemaIndexPath = path.join(__dirname, '../schemas/index.ts')
  if (fs.existsSync(schemaIndexPath)) {
    const content = fs.readFileSync(schemaIndexPath, 'utf8')
    if (content.includes("import { decor } from './decor'") && content.includes('decor,')) {
      console.log('✅ Decor schema included in index')
      checks.push({ name: 'Decor schema in index', status: 'pass' })
    } else {
      console.log('❌ Decor schema not properly included in index')
      checks.push({ name: 'Decor schema in index', status: 'fail' })
    }
  } else {
    console.log('❌ Schema index file missing')
    checks.push({ name: 'Schema index file', status: 'fail' })
  }
  
  // Check 3: Product schemas don't have decor fields
  const productSchemas = [
    '../schemas/products/productItem.ts',
    '../schemas/products/interiorProduct.ts',
    '../schemas/products/exteriorProduct.ts'
  ]
  
  productSchemas.forEach(schemaPath => {
    const fullPath = path.join(__dirname, schemaPath)
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8')
      const schemaName = path.basename(schemaPath, '.ts')
      
      if (!content.includes('availableFinishes') && !content.includes('totalFinishesCount')) {
        console.log(`✅ ${schemaName} - decor fields removed`)
        checks.push({ name: `${schemaName} decor fields removed`, status: 'pass' })
      } else {
        console.log(`❌ ${schemaName} - still contains decor fields`)
        checks.push({ name: `${schemaName} decor fields removed`, status: 'fail' })
      }
    } else {
      console.log(`❌ ${schemaName} file missing`)
      checks.push({ name: `${schemaName} file`, status: 'fail' })
    }
  })
  
  // Check 4: Decor queries exist
  const decorQueriesPath = path.join(__dirname, '../services/sanity/decors.ts')
  if (fs.existsSync(decorQueriesPath)) {
    console.log('✅ Decor queries file exists')
    checks.push({ name: 'Decor queries file', status: 'pass' })
  } else {
    console.log('❌ Decor queries file missing')
    checks.push({ name: 'Decor queries file', status: 'fail' })
  }
  
  // Check 5: Service index includes decor queries
  const serviceIndexPath = path.join(__dirname, '../services/sanity/index.ts')
  if (fs.existsSync(serviceIndexPath)) {
    const content = fs.readFileSync(serviceIndexPath, 'utf8')
    if (content.includes("export * from './decors'")) {
      console.log('✅ Decor queries included in service index')
      checks.push({ name: 'Decor queries in service index', status: 'pass' })
    } else {
      console.log('❌ Decor queries not included in service index')
      checks.push({ name: 'Decor queries in service index', status: 'fail' })
    }
  } else {
    console.log('❌ Service index file missing')
    checks.push({ name: 'Service index file', status: 'fail' })
  }
  
  // Check 6: Page updates
  const pageUpdates = [
    '../app/produits/interieur/[slug]/page.tsx',
    '../app/produits/exterieur/[slug]/page.tsx',
    '../app/inspirations/[slug]/page.tsx',
    '../app/decors/page.tsx'
  ]
  
  pageUpdates.forEach(pagePath => {
    const fullPath = path.join(__dirname, pagePath)
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8')
      const pageName = path.basename(path.dirname(pagePath))
      
      if (content.includes('getDecorsByProductType') || content.includes('getRandomDecors') || content.includes('getAllDecors')) {
        console.log(`✅ ${pageName} - updated to use decor queries`)
        checks.push({ name: `${pageName} page updated`, status: 'pass' })
      } else {
        console.log(`❌ ${pageName} - not updated to use decor queries`)
        checks.push({ name: `${pageName} page updated`, status: 'fail' })
      }
    } else {
      console.log(`❌ ${pageName} page missing`)
      checks.push({ name: `${pageName} page`, status: 'fail' })
    }
  })
  
  // Check 7: Component updates
  const componentPath = path.join(__dirname, '../components/inspirations/decors-dispo-grid.tsx')
  if (fs.existsSync(componentPath)) {
    const content = fs.readFileSync(componentPath, 'utf8')
    if (content.includes('slug === \'random\'') && content.includes('shared?.finitionsDisponibles?.decors')) {
      console.log('✅ DecorsDispoGrid component updated for random decors')
      checks.push({ name: 'DecorsDispoGrid component updated', status: 'pass' })
    } else {
      console.log('❌ DecorsDispoGrid component not updated')
      checks.push({ name: 'DecorsDispoGrid component updated', status: 'fail' })
    }
  } else {
    console.log('❌ DecorsDispoGrid component missing')
    checks.push({ name: 'DecorsDispoGrid component', status: 'fail' })
  }
  
  // Check 8: Migration scripts exist
  const migrationScripts = [
    'extract-decor-data.js',
    'seed-decor-data.js',
    'test-migration.js'
  ]
  
  migrationScripts.forEach(script => {
    const scriptPath = path.join(__dirname, script)
    if (fs.existsSync(scriptPath)) {
      console.log(`✅ ${script} exists`)
      checks.push({ name: `${script} exists`, status: 'pass' })
    } else {
      console.log(`❌ ${script} missing`)
      checks.push({ name: `${script} exists`, status: 'fail' })
    }
  })
  
  // Check 9: README exists
  const readmePath = path.join(__dirname, '../DECOR_MIGRATION_README.md')
  if (fs.existsSync(readmePath)) {
    console.log('✅ Migration README exists')
    checks.push({ name: 'Migration README', status: 'pass' })
  } else {
    console.log('❌ Migration README missing')
    checks.push({ name: 'Migration README', status: 'fail' })
  }
  
  // Summary
  console.log('\n📊 Verification Summary:')
  const passed = checks.filter(c => c.status === 'pass').length
  const failed = checks.filter(c => c.status === 'fail').length
  const total = checks.length
  
  console.log(`   ✅ Passed: ${passed}/${total}`)
  console.log(`   ❌ Failed: ${failed}/${total}`)
  
  if (failed === 0) {
    console.log('\n🎉 All schema changes verified successfully!')
    return { success: true, passed, failed, total }
  } else {
    console.log('\n⚠️  Some schema changes need attention!')
    console.log('\nFailed checks:')
    checks.filter(c => c.status === 'fail').forEach(check => {
      console.log(`   - ${check.name}`)
    })
    return { success: false, passed, failed, total }
  }
}

// Run verification
if (require.main === module) {
  const result = verifySchemaChanges()
  process.exit(result.success ? 0 : 1)
}

module.exports = { verifySchemaChanges }

