import { client } from '@/lib/sanity'

// Get a specific secteur by slug
export async function getSecteurBySlug(slug: string) {
  const query = `*[_type == "secteur" && slug.current == $slug][0]{
    title,
    description,
    heroImage,
    heroTextSections{
      section1{
        mainText,
        description
      },
      section2{
        mainText,
        description
      },
      section3{
        description
      }
    },
    featuresSection{
      features[]{
        icon,
        label
      }
    },
    customizationSection{
      title,
      mainText,
      secondaryText,
      ctaText,
      ctaLink,
      image
    },
    productsSection{
      title,
      subtitle,
      description,
      products[]{
        productType,
        product->{
          _id,
          _type,
          name,
          slug,
          description,
          image,
          category->{
            name,
            slug,
            color
          }
        }
      }
    },
    sections[]{
      type,
      title,
      items[]{
        title,
        subtitle,
        description,
        textSection{
          mainText,
          description
        },
        features,
        image
      }
    },
    showcaseSection{
      heroImage,
      leftText{
        title,
        subtitle,
        description
      },
      rightText{
        title,
        subtitle,
        description
      },
      images[]{
        src,
        alt
      }
    },
    contactSection{
      title,
      description,
      ctaText,
      ctaLink
    }
  }`
  
  return await client.fetch(query, { slug })
}

// Get all secteurs slugs for static generation
export async function getSecteursSlugs() {
  const query = `*[_type == "secteur"].slug.current`
  return await client.fetch(query)
}

// Get all secteurs for mega menu
export async function getSecteursForMegaMenu() {
  const query = `*[_type == "secteur"] | order(title asc){
    slug,
    title,
    description,
    heroImage
  }`
  
  return await client.fetch(query)
}
