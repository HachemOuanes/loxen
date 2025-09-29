# Product Data Population Script

This script populates comprehensive product data in your Sanity CMS based on the extended product schema.

## Features

The script creates complete product data including:

- ✅ **Basic Information**: Name, slug, descriptions, categories
- ✅ **Technical Specifications**: Characteristics, applications, formats, thickness
- ✅ **Document Management**: Technical documents, BIM requests
- ✅ **Finish System**: Available finishes with codes, names, and colors
- ✅ **Advanced Features**: Key features, specifications, pricing
- ✅ **SEO & Organization**: Tags, ordering, featured status

## Prerequisites

1. **Sanity API Token**: Create a token with write permissions
2. **Environment Variables**: Configure your Sanity project settings
3. **Dependencies**: Ensure `@sanity/client` is installed

## Setup Instructions

### 1. Get Your Sanity API Token

1. Go to [Sanity Management Console](https://manage.sanity.io)
2. Select your project
3. Go to **API** > **Tokens**
4. Click **Add API Token**
5. Name: `Product Population Script`
6. Permissions: **Editor** (read/write)
7. Copy the generated token

### 2. Configure Environment Variables

Create or update your `.env.local` file:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token-here
```

### 3. Install Dependencies

If not already installed:

```bash
npm install @sanity/client
```

## Usage

### Run the Population Script

```bash
# Using npm script (recommended)
npm run populate:products

# Or directly
node scripts/populate-products.js
```

### Expected Output

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
🔗 Next steps:
   1. Add product images in Sanity Studio
   2. Upload technical documents
   3. Add finish images for each product
   4. Verify data in your published dataset
```

## Products Created

The script creates 4 comprehensive products:

### 1. MEG Standard
- **Category**: Panneaux de Façade
- **Features**: 106 finishes, premium quality, 10-year warranty
- **Price**: À partir de 180€/m²
- **Status**: Featured product

### 2. EASY MEG
- **Category**: Panneaux de Façade  
- **Features**: 24 finishes, budget-friendly, easy installation
- **Price**: À partir de 120€/m²
- **Status**: Standard product

### 3. COPANEL Premium
- **Category**: Matériaux Composites
- **Features**: 156 colors, 20-year warranty, premium aluminum
- **Price**: Sur devis - À partir de 95€/m²
- **Status**: Featured product

### 4. Panneau Composite Standard
- **Category**: Matériaux Composites
- **Features**: 12 standard colors, economical, versatile
- **Price**: À partir de 65€/m²
- **Status**: Standard product

## Post-Population Tasks

After running the script, complete these tasks in Sanity Studio:

### 1. Add Product Images
- Upload main product images
- Add gallery images for each product
- Ensure images have proper alt text

### 2. Upload Technical Documents
- Add PDF technical sheets
- Upload installation guides
- Include certification documents

### 3. Add Finish Images
- Upload finish sample images
- Ensure finish codes match your inventory
- Add color values for accurate preview

### 4. Review and Customize
- Verify all product information
- Adjust pricing as needed
- Update availability status
- Modify descriptions for your brand voice

## Data Structure

Each product includes:

```typescript
{
  // Basic Info
  name: string
  slug: { current: string }
  description: string
  longDescription: string
  category: reference
  
  // Technical Details
  characteristics: string[]
  applications: string[]
  panelFormats: string[]
  thickness: string
  
  // Documents & BIM
  technicalDocuments: object[]
  bimRequest: boolean
  
  // Finishes
  availableFinishes: object[]
  totalFinishesCount: number
  collectionName: string
  
  // Features & Specs
  features: string[]
  specifications: object[]
  
  // Business Info
  price: string
  featured: boolean
  inStock: boolean
  order: number
  tags: string[]
}
```

## Customization

### Adding More Products
1. Edit `scripts/populate-products.js`
2. Add new product objects to the `products` array
3. Follow the existing data structure
4. Run the script again

### Modifying Existing Products
1. Update the product data in the script
2. Run the script (uses `createOrReplace` for updates)
3. Changes will be applied to existing products

### Adding New Categories
1. Add category objects to the `categories` array
2. Reference them in product `category` fields
3. Run the script to create new categories

## Troubleshooting

### Common Issues

**Missing Environment Variables**
```
❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable
```
→ Ensure `.env.local` is configured correctly

**Invalid API Token**
```
❌ Error creating product: Insufficient permissions
```
→ Check your API token has Editor permissions

**Network Issues**
```
❌ Error creating product: Network error
```
→ Check internet connection and Sanity service status

### Verification Steps

1. **Check Environment**:
   ```bash
   echo $NEXT_PUBLIC_SANITY_PROJECT_ID
   echo $SANITY_API_TOKEN
   ```

2. **Test Connection**:
   - Run script with verbose logging
   - Check Sanity Studio for created content

3. **Validate Data**:
   - Open Sanity Studio
   - Navigate to Products section
   - Verify all fields are populated

## Support

If you encounter issues:
1. Check the console output for specific error messages
2. Verify your Sanity project configuration
3. Ensure API token permissions are correct
4. Check network connectivity

The script is designed to be safe and idempotent - you can run it multiple times without creating duplicates.