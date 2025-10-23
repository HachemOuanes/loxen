# Decor Seeding Guide

## 📋 **Complete Guide to Seeding Decors to Sanity**

### **Prerequisites:**

1. **Environment Variables** - Ensure these are set in your `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=uoshkmah
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token_here
```

2. **Write Token** - Get a write token from:
   - Go to Sanity Studio → API → Tokens
   - Create new token with "Editor" or "Administrator" permissions
   - Add to `.env.local` as `SANITY_API_TOKEN`

3. **Updated Schema** - The decor schema has been updated with:
   - ✅ Collections array (36 collection options)
   - ✅ Application type array (interior/exterior)
   - ✅ Color dropdown (14 color options)
   - ✅ Availability boolean
   - ✅ Featured boolean
   - ✅ Display order number

### **Schema Structure:**

```typescript
{
  code: string                    // Required - "410", "405", etc.
  name: string                    // Required - "bianco ghiaccio"
  title: string                   // Optional - "410 - Bianco Ghiaccio"
  image: image                    // Required - Uploaded to Sanity
  collections: string[]           // Required - ["Colours", "MEG", "MEG-H"]
  applicationType: string[]       // Required - ["interior"] or ["exterior"] or both
  color: string                   // Optional - "bianco", "nero", etc.
  collectionName: string          // Optional - "Abet"
  description: text               // Optional
  available: boolean              // Default: true
  featured: boolean               // Default: false
  order: number                   // Default: 0
}
```

### **Seeding Process:**

#### **Step 1: Prepare Data**
The extraction script has already created:
- ✅ `decor-data-with-collections.json` - 285 decor items with full metadata

#### **Step 2: Run Seeding Script**
```bash
# Make sure environment variables are loaded
node scripts/seed-decors-with-images.js
```

#### **What the Script Does:**
1. **Loads** all 285 decor items from JSON
2. **For each decor:**
   - ✅ Checks if it already exists in Sanity (skip if exists)
   - ✅ **Downloads** image from URL (e.g., `https://abetlaminati.com/CAMPIONI/410.jpg`)
   - ✅ **Uploads** image to Sanity assets
   - ✅ **Creates** decor document with image reference
   - ✅ Adds small delay to avoid rate limiting

3. **Handles errors gracefully:**
   - Continues with next item if one fails
   - Reports success/error/skipped counts
   - Exits with appropriate status code

### **Seeding Script Features:**

#### **1. Image Download & Upload**
```javascript
// Downloads from external URL
const imageBuffer = await downloadImage(decorItem.image)

// Uploads to Sanity
const imageAssetId = await uploadImageToSanity(imageBuffer, decorItem.cover)

// Creates document with image reference
{
  image: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: imageAssetId
    }
  }
}
```

#### **2. Skip Existing Decors**
```javascript
// Checks if decor with same code already exists
const existing = await client.fetch(
  `*[_type == "decor" && code == $code][0]`,
  { code: decorItem.code }
)

if (existing) {
  // Skip to next item
}
```

#### **3. Collection Mapping**
```javascript
// Extracts collection names from the collections array
collections: decorItem.collections.map(col => col.name)
// Result: ["Colours", "MEG", "MEG-H"]
```

#### **4. Progress Reporting**
```
[1/285] Processing: 410 - bianco ghiaccio
  📥 Downloading image from: https://abetlaminati.com/CAMPIONI/410.jpg
  ✓ Downloaded 12.45 KB
  📤 Uploading image to Sanity...
  ✓ Image uploaded: image-abc123...
  💾 Creating decor document...
  ✅ Created: decor-xyz789...

[2/285] Processing: 405 - bianco porcellana
  ...
```

### **Expected Results:**

#### **First Run:**
```
🎉 Decor seeding completed!
============================================================
   ✅ Created: 285 decors
   ⏭️  Skipped: 0 decors (already exist)
   ❌ Errors: 0 decors
   📊 Total processed: 285/285
============================================================
```

#### **Subsequent Runs:**
```
🎉 Decor seeding completed!
============================================================
   ✅ Created: 0 decors
   ⏭️  Skipped: 285 decors (already exist)
   ❌ Errors: 0 decors
   📊 Total processed: 285/285
============================================================
```

### **Data Quality Assurances:**

1. **✅ No Hardcoded Image URLs**
   - All images are **downloaded** from source
   - All images are **uploaded** to Sanity assets
   - Documents contain **references** to Sanity assets, not external URLs

2. **✅ Complete Collection Mapping**
   - All 36 collection options available in schema
   - Each decor mapped to all its collections
   - Multi-collection support enabled

3. **✅ Reusable Fields**
   - **Collections**: Dropdown with 33 predefined options
   - **Application Type**: Grid selection (Interior/Exterior)
   - **Color**: Dropdown with 14 color options
   - **Availability**: Boolean toggle

4. **✅ Flexible Application Types**
   - Products can be interior-only, exterior-only, or both
   - Stored as array: `["interior"]` or `["exterior"]` or `["interior", "exterior"]`

### **Sanity Studio Preview:**

After seeding, each decor in Sanity Studio will show:
```
Title: "410 - bianco ghiaccio ⭐"
Subtitle: "interior • Colours, Full colour +2"
Image: [Uploaded decor texture image]
```

### **Example Seeded Documents:**

#### **Multi-Collection Decor:**
```json
{
  "_type": "decor",
  "code": "406",
  "name": "bianco primavera",
  "title": "406 - BIANCO PRIMAVERA",
  "image": {
    "_type": "image",
    "asset": {
      "_type": "reference",
      "_ref": "image-abc123..."
    }
  },
  "collections": [
    "Colours",
    "HR-LAQ",
    "Labgrade",
    "MEG",
    "MEG-H",
    "Magnetico"
  ],
  "applicationType": ["interior", "exterior"],
  "color": "bianco",
  "collectionName": "Abet",
  "available": true,
  "featured": false,
  "order": 0
}
```

#### **Specialty Collection Decor:**
```json
{
  "_type": "decor",
  "code": "5821",
  "name": "shell spirula",
  "title": "5821 - Shell Spirula",
  "image": {
    "_type": "image",
    "asset": {
      "_type": "reference",
      "_ref": "image-xyz789..."
    }
  },
  "collections": [
    "DIGITAL NATURE",
    "Design Edition"
  ],
  "applicationType": ["interior"],
  "color": "nero",
  "collectionName": "Abet",
  "available": true,
  "featured": false,
  "order": 0
}
```

### **Querying Decors:**

#### **By Collection:**
```groq
*[_type == "decor" && "MEG" in collections] | order(code asc)
```

#### **By Application Type:**
```groq
*[_type == "decor" && "interior" in applicationType] | order(code asc)
```

#### **By Color:**
```groq
*[_type == "decor" && color == "bianco"] | order(code asc)
```

#### **Multi-Filter:**
```groq
*[_type == "decor" && "MEG" in collections && "interior" in applicationType && color == "bianco"] | order(code asc)
```

### **Troubleshooting:**

#### **Error: Configuration must contain projectId**
```bash
# Make sure environment variables are set
echo $env:NEXT_PUBLIC_SANITY_PROJECT_ID  # Should show: uoshkmah
```

#### **Error: Insufficient permissions**
```bash
# Make sure SANITY_API_TOKEN has write permissions
# Create new token with "Editor" or "Administrator" role
```

#### **Error: ECONNRESET / Network issues**
```bash
# Try with smaller batch or add longer delays
# Modify the delay in the script: setTimeout(resolve, 500) // Increase to 500ms
```

#### **Error: Image upload failed**
```bash
# The script will continue and create document without image
# You can manually upload images later in Sanity Studio
```

### **Files:**
1. **`decor-data-with-collections.json`** - Source data (285 items)
2. **`scripts/seed-decors-with-images.js`** - Seeding script with image upload
3. **`schemas/decor.ts`** - Updated schema with collections, applicationType, color
4. **`DECOR_SEEDING_GUIDE.md`** - This guide

### **Next Steps After Seeding:**

1. **Verify in Sanity Studio:**
   - Go to Sanity Studio → Decors
   - Check that all 285 decors are created
   - Verify images are uploaded correctly

2. **Update Queries:**
   - Update `services/sanity/decors.ts` to include new fields
   - Add filtering by collections, applicationType, color

3. **Update Frontend:**
   - Add collection filters to decor pages
   - Display application type badges
   - Show color swatches

## 🚀 **Ready to Seed!**
Run: `node scripts/seed-decors-with-images.js`


