# Secteurs Sanity Setup

This document explains how to set up the secteurs functionality with Sanity CMS.

## Schema Structure

### 1. Secteur Schema (`schemas/secteurs/secteur.ts`)
- **Type**: `secteur`
- **Fields**:
  - `slug`: URL-friendly identifier
  - `title`: Sector name (e.g., "Éducation", "Santé", "Tertiaire")
  - `description`: Brief description
  - `heroImage`: Main hero image
  - `sections`: Array of application sections
  - `showcaseSection`: Showcase content with hero image, text blocks, and images
  - `contactSection`: Contact information

### 2. Secteurs Index Schema (`schemas/secteurs/secteursIndex.ts`)
- **Type**: `secteursIndex`
- **Fields**:
  - `title`: Page title
  - `description`: Page description
  - `heroImage`: Main page hero image
  - `secteurs`: Array of references to secteur documents

## Data Seeding

### 1. Run the Seeding Script
```bash
# Set your Sanity API token
export SANITY_API_TOKEN="your-sanity-api-token"

# Run the seeding script
node scripts/seed-secteurs.js
```

### 2. What Gets Seeded
- **3 Secteurs**: Education, Health, Tertiaire
- **Images**: All images from `/public` folder are uploaded to Sanity
- **Complete Data**: All sections, showcase content, and contact information

## API Integration

### 1. Sanity Queries (`lib/sanity-queries/secteurs.ts`)
- `getSecteursIndex()`: Fetches the main secteurs page data
- `getSecteurBySlug(slug)`: Fetches specific secteur data
- `getSecteursSlugs()`: Gets all secteur slugs for static generation

### 2. Page Integration
- **Main Page**: `/app/secteurs/page.tsx` - Uses `getSecteursIndex()`
- **Dynamic Pages**: `/app/secteurs/[slug]/page.tsx` - Uses `getSecteurBySlug()`
- **Header**: Mega menu fetches secteurs from Sanity

## Component Updates

### 1. Updated Components
- `SecteursMainPageContent`: Now accepts Sanity data props
- `SecteursPageContent`: Handles Sanity image processing with `urlFor()`
- `Header`: Fetches secteurs for mega menu

### 2. Image Processing
All images are processed using Sanity's `urlFor()` function:
```typescript
urlFor(image).width(800).height(600).url()
```

## File Structure

```
schemas/
├── secteurs/
│   ├── secteur.ts          # Individual secteur schema
│   └── secteursIndex.ts    # Main secteurs page schema
├── index.ts                # Updated to include secteurs schemas

lib/
├── sanity-queries/
│   └── secteurs.ts         # Sanity queries for secteurs

scripts/
├── seed-secteurs.js        # Main seeding script
└── run-seed-secteurs.js    # Simple runner script
```

## Environment Variables

Make sure you have these environment variables set:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=uoshkmah
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-api-token
```

## Next Steps

1. **Run the seeding script** to populate Sanity with secteurs data
2. **Test the pages** to ensure images and content load correctly
3. **Customize content** in Sanity Studio at `/cms`
4. **Add more secteurs** as needed through the Sanity interface

## Troubleshooting

### Common Issues
1. **Images not loading**: Check that `urlFor()` is being used correctly
2. **Data not fetching**: Verify Sanity queries are correct
3. **Seeding fails**: Check SANITY_API_TOKEN is set correctly

### Debug Steps
1. Check browser console for Sanity errors
2. Verify data structure in Sanity Studio
3. Test queries in Sanity Vision tool
