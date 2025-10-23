# Decor Data Extraction with Collections

## ✅ **Successfully Extracted Complete Decor Data**

### **Extraction Results:**
- **Total Decor Items:** 285
- **Interior Only:** 216 items
- **Exterior Only:** 3 items  
- **Both Interior & Exterior:** 66 items

### **Complete Data Structure:**
```json
{
  "id": "405",
  "code": "405",
  "name": "bianco porcellana",
  "title": "405 - BIANCO PORCELLANA",
  "image": "https://abetlaminati.com/CAMPIONI/405.jpg",
  "cover": "405.jpg",
  "collection": "Abet",
  "collections": [
    {
      "code": "c2",
      "name": "Colours"
    },
    {
      "code": "c25",
      "name": "Full colour"
    },
    {
      "code": "c49",
      "name": "HR-LAQ"
    },
    {
      "code": "c37",
      "name": "MEG"
    },
    {
      "code": "c996",
      "name": "MEG-H"
    }
  ],
  "applicationType": [
    "interior",
    "exterior"
  ],
  "color": "bianco",
  "available": true
}
```

### **Field Descriptions:**

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique identifier (same as code) | `"405"` |
| `code` | string | Product code | `"405"` |
| `name` | string | Clean product name | `"bianco porcellana"` |
| `title` | string | Full title with code | `"405 - BIANCO PORCELLANA"` |
| `image` | string | Full URL to decor image | `"https://abetlaminati.com/CAMPIONI/405.jpg"` |
| `cover` | string | Filename for cover image | `"405.jpg"` |
| `collection` | string | Primary collection name | `"Abet"` |
| `collections` | array | **All collections/categories** | See below |
| `applicationType` | array | Interior/Exterior application | `["interior", "exterior"]` |
| `color` | string | Primary color | `"bianco"` |
| `available` | boolean | Availability status | `true` |

### **Collections Array Structure:**
Each product can belong to **multiple collections**:
```json
"collections": [
  {
    "code": "c2",
    "name": "Colours"
  },
  {
    "code": "c37",
    "name": "MEG"
  }
]
```

### **Available Collections (36 total):**

| Code | Collection Name | Product Count |
|------|----------------|---------------|
| `c2` | **Colours** | 83 |
| `c37` | **MEG** | 66 |
| `c996` | **MEG-H** | 50 |
| `c6` | **Design Edition** | 46 |
| `c9A` | **Legni light** | 32 |
| `c9B` | **Legni dark** | 24 |
| `cHA` | **Hachure** | 18 |
| `c49` | **HR-LAQ** | 17 |
| `c94` | **Fabriek** | 12 |
| `c999` | **Mare Nostrum** | 12 |
| `c75` | **DIGITAL NATURE** | 11 |
| `c9` | **Rocks** | 9 |
| `c0A` | **WHIMSY** | 9 |
| `c78` | **Polaris** | 8 |
| `c25` | **Full colour** | 7 |
| `c7B` | **Polaris Contemporary** | 7 |
| `c31` | **Metalli** | 6 |
| `c71` | **PARADE** | 6 |
| `c93` | **Metal effect** | 5 |
| `c42` | **Diafos** | 5 |
| `c27` | **Labgrade** | 4 |
| `c95` | **DIGITAL CIRCUS** | 4 |
| `c22` | **Magnetico** | 3 |
| `c24` | **Interni** | 3 |
| `c89` | **FEBO** | 3 |
| `c998` | **Naval Deck** | 3 |
| `c38` | **Walkprint** | 2 |
| `c10` | **Decori minimi** | 2 |
| `c81` | **Fluo** | 1 |
| `c84` | **Externa** | 1 |
| `c997` | **Work In Progress** | 1 |
| `c54` | **Labgrade Plus** | 0 |
| `c51` | **Polaris Foldline** | 0 |

### **How the Filter System Works:**

#### **1. CSS Class-Based Filtering:**
Each product has CSS classes that correspond to collections:
```html
<li class="grid-item wk_campione c2 c37 c996 interior">
  <!-- This product belongs to: Colours, MEG, MEG-H, and is for Interior use -->
</li>
```

#### **2. Filter Dropdown:**
```html
<li data-filter=".c2">Colours</li>
<!-- When clicked, shows all products with class "c2" -->

<li data-filter=".c37">MEG</li>
<!-- When clicked, shows all products with class "c37" -->
```

#### **3. JavaScript Filter Logic:**
```javascript
// Filter by collection
$('.filter_item_list_dropdown li').click(function() {
    const filterClass = $(this).data('filter');
    
    if (filterClass === '*') {
        $('.grid-item').show(); // Show all
    } else {
        $('.grid-item').hide(); // Hide all
        $('.grid-item' + filterClass).show(); // Show matching items
    }
});
```

### **Example Multi-Collection Products:**

#### **Product 405 - Bianco Porcellana:**
- Belongs to 5 collections: Colours, Full colour, HR-LAQ, MEG, MEG-H
- Available for both interior AND exterior use
- Color: bianco (white)

#### **Product 410 - Bianco Ghiaccio:**
- Belongs to 4 collections: Colours, Full colour, HR-LAQ, Labgrade
- Interior use only
- Color: bianco (white)

#### **Product 5821 - Shell Spirula:**
- Belongs to 2 collections: DIGITAL NATURE, Design Edition
- Interior use only
- Color: nero (black)

### **Data Quality Features:**
- ✅ **285 total products** extracted (more than the initial 217)
- ✅ **Clean names** - No designer names or extra HTML
- ✅ **Multiple collections** - Each product mapped to all its collections
- ✅ **Application types** - Interior, Exterior, or Both
- ✅ **Color extraction** - Automatic color detection from class names
- ✅ **Complete URLs** - Full image URLs for all items
- ✅ **Structured data** - Ready for Sanity import

### **Files Created:**
1. **`decor-data-with-collections.json`** - Complete extraction (285 items)
2. **`scripts/extract-decor-with-collections.js`** - Enhanced extraction script
3. **`DECOR_COLLECTIONS_EXTRACTION.md`** - This documentation

### **Usage Examples:**

#### **Filter by Collection:**
```javascript
const data = require('./decor-data-with-collections.json')

// Get all MEG products
const megProducts = data.filter(item => 
  item.collections.some(col => col.code === 'c37')
)

// Get all Design Edition products
const designEdition = data.filter(item => 
  item.collections.some(col => col.code === 'c6')
)
```

#### **Filter by Application Type:**
```javascript
// Get interior-only products
const interiorOnly = data.filter(item => 
  item.applicationType.includes('interior') && 
  !item.applicationType.includes('exterior')
)

// Get dual-purpose products
const dualPurpose = data.filter(item => 
  item.applicationType.includes('interior') && 
  item.applicationType.includes('exterior')
)
```

#### **Filter by Color:**
```javascript
// Get all white (bianco) products
const whiteProducts = data.filter(item => item.color === 'bianco')

// Get all black (nero) products
const blackProducts = data.filter(item => item.color === 'nero')
```

### **Next Steps:**
This complete data set can now be used to:
1. **Seed Sanity** - Import all 285 decors with their collection associations
2. **Create collection tags** - Use the collections array for filtering
3. **Build filter UI** - Implement multi-collection filtering on the frontend
4. **Categorize products** - Organize decors by their collections

## 🎉 **Complete Decor Extraction with Collections Successful!**
All 285 decor items extracted with full collection mapping and ready for import!

