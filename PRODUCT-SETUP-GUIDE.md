# 🚀 Complete Product Population Guide

This guide provides everything you need to populate comprehensive product data in your Sanity CMS.

## Quick Start (3 Steps)

```bash
# 1. Setup environment
npm run setup:env

# 2. Create backup (optional but recommended)
npm run backup:create

# 3. Populate products
npm run populate:products
```

## What Gets Created

### 📁 **2 Product Categories**
- **Panneaux de Façade**: High-performance facade panels
- **Matériaux Composites**: Composite materials for architecture

### 📦 **4 Complete Products**

#### 1. MEG Standard ⭐ *Featured*
```
Category: Panneaux de Façade
Price: À partir de 180€/m²
Finishes: 106 available (Abet collection)
Features: Premium quality, UV resistance, 10-year warranty
Applications: Ventilated facades, architectural cladding
Formats: 3050x1300, 4200x1300, 2550x1300, 3050x1500, 4200x1500
Thickness: 6-8-10-12mm
```

#### 2. EASY MEG
```
Category: Panneaux de Façade  
Price: À partir de 120€/m²
Finishes: 24 available (EASY collection)
Features: Budget-friendly, easy installation, 5-year warranty
Applications: Economic facades, industrial buildings
Formats: 3050x1300, 2550x1300, 3050x1500
Thickness: 6-8mm
```

#### 3. COPANEL Premium ⭐ *Featured*
```
Category: Matériaux Composites
Price: Sur devis - À partir de 95€/m²
Finishes: 156 colors (COPANEL collection)
Features: Aluminum composite, 20-year warranty, marine grade
Applications: High-end facades, signage, interior design
Formats: 1500x4000, 1250x3200, 1500x3200, 1220x2440, 2000x5000
Thickness: 3-4-6mm
```

#### 4. Panneau Composite Standard
```
Category: Matériaux Composites
Price: À partir de 65€/m²  
Finishes: 12 standard colors
Features: Economical, versatile, immediate availability
Applications: Standard cladding, renovations, commercial spaces
Formats: 1220x2440, 1500x3000, 1250x2500
Thickness: 3-4mm
```

## Complete Data Structure

Each product includes:

### 🔧 **Technical Information**
- Characteristics (7+ features per product)
- Applications (6+ use cases per product)  
- Panel formats (3-5 sizes per product)
- Thickness options
- Technical specifications (5-6 specs per product)

### 📚 **Documentation System**
- Technical data sheets
- Installation guides
- Certification documents
- BIM file request capability

### 🎨 **Finish Management**
- Complete finish collections
- Finish codes and names
- Color preview values
- Finish image placeholders

### 💼 **Business Features**
- Pricing information
- Stock status
- Featured product flags
- SEO-friendly tags
- Display ordering

## Step-by-Step Instructions

### Step 1: Environment Setup

**Option A: Interactive Setup**
```bash
npm run setup:env
```
Follow the prompts to configure your Sanity connection.

**Option B: Manual Setup**
Create `.env.local` file:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-write-token
```

**Get Sanity API Token:**
1. Visit [Sanity Management Console](https://manage.sanity.io)
2. Select your project → API → Tokens
3. Create new token with **Editor** permissions
4. Copy the token to your environment file

### Step 2: Test Connection (Optional)

```bash
npm run test:sanity
```

Expected output:
```
🔍 Testing Sanity connection...
✅ Connection successful!
📊 Found X categories in dataset
```

### Step 3: Backup Existing Data (Recommended)

```bash
# Create backup before population
npm run backup:create

# List all backups
npm run backup:list

# Restore from backup if needed
npm run backup:restore backups/sanity-backup-2025-09-29.json
```

### Step 4: Populate Products

```bash
npm run populate:products
```

Expected output:
```
🚀 Starting Sanity data population...
📡 Connected to project: your-project-id
📊 Dataset: production

Creating product categories...
✅ Category created: Panneaux de Façade
✅ Category created: Matériaux Composites

Creating products...
✅ Product created: MEG Standard
✅ Product created: EASY MEG  
✅ Product created: COPANEL Premium
✅ Product created: Panneau Composite Standard

✨ Data population completed successfully!
```

## Post-Population Tasks

### 1. 🖼️ Add Product Images

In Sanity Studio:
1. Go to **Products** → Select each product
2. Upload **Main Product Image**
3. Add **Gallery Images** (3-5 per product recommended)
4. Ensure images have descriptive alt text

### 2. 📄 Upload Documents  

For each product:
1. Upload **Technical Data Sheets** (PDF format)
2. Add **Installation Guides** 
3. Include **Certification Documents**
4. Set appropriate download button text

### 3. 🎨 Add Finish Images

For each available finish:
1. Upload finish sample images (64x64px minimum)
2. Verify finish codes match your inventory
3. Update color hex values for accurate previews
4. Test finish selection functionality

### 4. ✅ Review and Verify

1. **Check Product Pages**: Visit `/produits/[slug]` for each product
2. **Test Functionality**: 
   - Image galleries
   - Finish selection
   - Document downloads
   - Related products
3. **SEO Verification**: Check meta titles and descriptions
4. **Mobile Testing**: Ensure responsive design works

## Customization Options

### Adding New Products

1. Edit `scripts/populate-products.js`
2. Add new product object to `products` array:

```javascript
{
  _id: 'product-new-item',
  _type: 'productItem',
  name: 'New Product Name',
  slug: { current: 'new-product-name', _type: 'slug' },
  // ... complete data structure
}
```

3. Run population script again

### Creating New Categories

1. Add to `categories` array in the script:

```javascript
{
  _id: 'category-new-category',
  _type: 'productCategory',
  name: 'New Category Name',
  slug: { current: 'new-category', _type: 'slug' },
  description: 'Category description'
}
```

2. Reference in product `category` field
3. Run population script

### Updating Existing Products

The script uses `createOrReplace`, so you can:
1. Modify existing product data in the script
2. Run the script again
3. Changes will be applied to existing products

## Troubleshooting

### Common Issues

**❌ Environment Variable Missing**
```bash
# Check your .env.local file exists and has correct values
cat .env.local

# Or run setup again
npm run setup:env
```

**❌ Permission Denied**
```bash
# Your API token needs Editor permissions
# Create new token at https://manage.sanity.io
```

**❌ Network Connection Issues**
```bash
# Test your connection
npm run test:sanity

# Check Sanity service status
```

**❌ Existing Data Conflicts**
```bash
# Create backup first
npm run backup:create

# Then run population (uses createOrReplace)
npm run populate:products
```

### Validation Checklist

- [ ] Environment variables configured
- [ ] Sanity connection successful  
- [ ] Categories created (2 total)
- [ ] Products created (4 total)
- [ ] Images uploaded for all products
- [ ] Technical documents added
- [ ] Finish images uploaded
- [ ] Product pages accessible via URL
- [ ] All functionality tested

## Advanced Usage

### Script Modification

The population script is fully customizable. Key areas:

**Product Data**: Modify the `products` array
**Categories**: Update the `categories` array  
**Fields**: Add new fields matching your schema
**Validation**: The script includes error handling

### Schema Extensions

If you extend the product schema:
1. Update the script to include new fields
2. Add validation for required fields
3. Test with a single product first

### Batch Operations

For large numbers of products:
1. Split into multiple script runs
2. Use backup/restore for testing
3. Monitor Sanity API rate limits

## Support Resources

- **Sanity Documentation**: [sanity.io/docs](https://sanity.io/docs)
- **API Reference**: [sanity.io/docs/api](https://sanity.io/docs/api)
- **Schema Guide**: [sanity.io/docs/schema-types](https://sanity.io/docs/schema-types)

## Success Metrics

After completion, you should have:
- ✅ 2 product categories in Sanity
- ✅ 4 complete products with full data
- ✅ All products accessible via frontend URLs
- ✅ Professional product detail pages
- ✅ Functional finish selection system  
- ✅ Document download capabilities
- ✅ Related products working
- ✅ SEO-optimized content structure

Your product catalog is now ready for production! 🎉