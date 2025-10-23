import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function verifyDecorSchema() {
  console.log('🔍 Verifying decor schema configuration...')
  
  const checks = []
  
  // Check 1: Decor schema file exists and is valid
  const decorSchemaPath = path.join(__dirname, '../schemas/decor.ts')
  if (fs.existsSync(decorSchemaPath)) {
    const content = fs.readFileSync(decorSchemaPath, 'utf8')
    
    // Check for required decor schema elements
    const hasDefineType = content.includes('defineType')
    const hasName = content.includes("name: 'decor'")
    const hasTitle = content.includes("title: 'Decor'")
    const hasType = content.includes("type: 'document'")
    const hasFields = content.includes('fields: [')
    const hasCode = content.includes("name: 'code'")
    const hasNameField = content.includes("name: 'name'")
    const hasCategory = content.includes("name: 'category'")
    
    if (hasDefineType && hasName && hasTitle && hasType && hasFields && hasCode && hasNameField && hasCategory) {
      console.log('✅ Decor schema file is valid')
      checks.push({ name: 'Decor schema file', status: 'pass' })
    } else {
      console.log('❌ Decor schema file has issues')
      checks.push({ name: 'Decor schema file', status: 'fail' })
    }
  } else {
    console.log('❌ Decor schema file missing')
    checks.push({ name: 'Decor schema file', status: 'fail' })
  }
  
  // Check 2: Schema index includes decor
  const schemaIndexPath = path.join(__dirname, '../schemas/index.ts')
  if (fs.existsSync(schemaIndexPath)) {
    const content = fs.readFileSync(schemaIndexPath, 'utf8')
    
    const hasImport = content.includes("import { decor } from './decor'")
    const hasExport = content.includes('decor,')
    
    if (hasImport && hasExport) {
      console.log('✅ Decor schema included in index')
      checks.push({ name: 'Decor schema in index', status: 'pass' })
    } else {
      console.log('❌ Decor schema not properly included in index')
      console.log('   Has import:', hasImport)
      console.log('   Has export:', hasExport)
      checks.push({ name: 'Decor schema in index', status: 'fail' })
    }
  } else {
    console.log('❌ Schema index file missing')
    checks.push({ name: 'Schema index file', status: 'fail' })
  }
  
  // Check 3: Sanity config includes schema
  const sanityConfigPath = path.join(__dirname, '../sanity.config.ts')
  if (fs.existsSync(sanityConfigPath)) {
    const content = fs.readFileSync(sanityConfigPath, 'utf8')
    
    const hasSchemaTypes = content.includes('schemaTypes')
    const hasImport = content.includes("import { schemaTypes } from './schemas'")
    
    if (hasSchemaTypes && hasImport) {
      console.log('✅ Sanity config includes schema types')
      checks.push({ name: 'Sanity config', status: 'pass' })
    } else {
      console.log('❌ Sanity config missing schema types')
      checks.push({ name: 'Sanity config', status: 'fail' })
    }
  } else {
    console.log('❌ Sanity config file missing')
    checks.push({ name: 'Sanity config file', status: 'fail' })
  }
  
  // Check 4: Sanity structure includes decor
  const structurePath = path.join(__dirname, '../sanity/structure.ts')
  if (fs.existsSync(structurePath)) {
    const content = fs.readFileSync(structurePath, 'utf8')
    
    const hasDecorList = content.includes("title('Decors')")
    const hasDecorType = content.includes("schemaType('decor')")
    
    if (hasDecorList && hasDecorType) {
      console.log('✅ Sanity structure includes decor')
      checks.push({ name: 'Sanity structure', status: 'pass' })
    } else {
      console.log('❌ Sanity structure missing decor')
      checks.push({ name: 'Sanity structure', status: 'fail' })
    }
  } else {
    console.log('❌ Sanity structure file missing')
    checks.push({ name: 'Sanity structure file', status: 'fail' })
  }
  
  // Check 5: TypeScript compilation
  console.log('\n5️⃣ Testing TypeScript compilation...')
  try {
    // Try to import the schema types
    const { schemaTypes } = await import('../schemas/index.js')
    const decorSchema = schemaTypes.find(schema => schema.name === 'decor')
    
    if (decorSchema) {
      console.log('✅ Decor schema found in schema types')
      checks.push({ name: 'TypeScript compilation', status: 'pass' })
    } else {
      console.log('❌ Decor schema not found in schema types')
      console.log('   Available schemas:', schemaTypes.map(s => s.name))
      checks.push({ name: 'TypeScript compilation', status: 'fail' })
    }
  } catch (error) {
    console.log('❌ TypeScript compilation failed:', error.message)
    checks.push({ name: 'TypeScript compilation', status: 'fail' })
  }
  
  // Summary
  console.log('\n📊 Verification Summary:')
  const passed = checks.filter(c => c.status === 'pass').length
  const failed = checks.filter(c => c.status === 'fail').length
  const total = checks.length
  
  console.log(`   ✅ Passed: ${passed}/${total}`)
  console.log(`   ❌ Failed: ${failed}/${total}`)
  
  if (failed === 0) {
    console.log('\n🎉 All decor schema checks passed!')
    console.log('\n💡 If decors are still not visible in the CMS:')
    console.log('   1. Restart the Sanity Studio development server')
    console.log('   2. Clear browser cache and refresh')
    console.log('   3. Check browser console for any errors')
    return { success: true, passed, failed, total }
  } else {
    console.log('\n⚠️  Some decor schema checks failed!')
    console.log('\nFailed checks:')
    checks.filter(c => c.status === 'fail').forEach(check => {
      console.log(`   - ${check.name}`)
    })
    return { success: false, passed, failed, total }
  }
}

// Run verification
if (import.meta.url === `file://${process.argv[1]}`) {
  const result = await verifyDecorSchema()
  process.exit(result.success ? 0 : 1)
}

export { verifyDecorSchema }
