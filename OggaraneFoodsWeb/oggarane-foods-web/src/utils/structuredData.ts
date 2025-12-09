export const getHomeStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "name": "Oggarane Foods",
  "description": "Authentic traditional spice blends crafted with love and passed down through generations. Premium quality, preservative-free spices from Karnataka, India.",
  "url": typeof window !== "undefined" ? window.location.origin : "",
  "logo": typeof window !== "undefined" ? `${window.location.origin}/logo.png` : "",
  "image": typeof window !== "undefined" ? `${window.location.origin}/logo.png` : "",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Koppesara, Mattigar",
    "addressLocality": "Sirsi",
    "addressRegion": "Uttar Kannada",
    "postalCode": "581450",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "14.6197",
    "longitude": "74.8475"
  },
  "telephone": "+91-8296385766",
  "email": "oggaranefoods@gmail.com",
  "openingHours": "Mo-Su 08:00-20:00",
  "priceRange": "₹₹",
  "servesCuisine": "Indian",
  "sameAs": [
    "https://www.facebook.com/share/1Ca347CEbX/?mibextid=wwXIfr",
    "https://www.youtube.com/@OggaraneFoodsYT",
    "https://www.instagram.com/oggarane_foods_?igsh=MWhsdWRzY2tiaWR0eQ=="
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "125"
  }
});

export const getOrganizationStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Oggarane Foods",
  "alternateName": "Rajanna's Traditional Spices",
  "url": typeof window !== "undefined" ? window.location.origin : "",
  "logo": typeof window !== "undefined" ? `${window.location.origin}/logo.png` : "",
  "description": "Authentic traditional spice blends crafted with love and passed down through generations.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Koppesara, Mattigar",
    "addressLocality": "Sirsi",
    "addressRegion": "Uttar Kannada",
    "postalCode": "581450",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-8296385766",
    "contactType": "Customer Service",
    "email": "oggaranefoods@gmail.com",
    "availableLanguage": ["en", "kn"]
  },
  "sameAs": [
    "https://www.facebook.com/share/1Ca347CEbX/?mibextid=wwXIfr",
    "https://www.youtube.com/@OggaraneFoodsYT",
    "https://www.instagram.com/oggarane_foods_?igsh=MWhsdWRzY2tiaWR0eQ=="
  ]
});

export const getProductsStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "Product",
      "position": 1,
      "name": "Sambar Powder",
      "description": "Authentic traditional sambar powder made with 15+ handpicked spices. Perfect for making delicious South Indian sambar.",
      "image": typeof window !== "undefined" ? `${window.location.origin}/assets/sambar-powder.jpeg` : "",
      "brand": {
        "@type": "Brand",
        "name": "Oggarane Foods"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "45",
        "highPrice": "80",
        "offerCount": "2",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        "url": typeof window !== "undefined" ? `${window.location.origin}/products` : ""
      },
      "sku": "SP-100G",
      "gtin": "SP-100G"
    },
    {
      "@type": "Product",
      "position": 2,
      "name": "Rasam Powder",
      "description": "Traditional rasam powder with authentic blend of spices. Adds perfect tangy flavor to your rasam.",
      "image": typeof window !== "undefined" ? `${window.location.origin}/assets/rassam-powder.jpeg` : "",
      "brand": {
        "@type": "Brand",
        "name": "Oggarane Foods"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "40",
        "highPrice": "70",
        "offerCount": "2",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        "url": typeof window !== "undefined" ? `${window.location.origin}/products` : ""
      },
      "sku": "RP-100G",
      "gtin": "RP-100G"
    },
    {
      "@type": "Product",
      "position": 3,
      "name": "Pulao Powder",
      "description": "Fragrant pulao powder blend for aromatic and flavorful pulao rice dishes.",
      "image": typeof window !== "undefined" ? `${window.location.origin}/assets/pulao-powder.jpeg` : "",
      "brand": {
        "@type": "Brand",
        "name": "Oggarane Foods"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "45",
        "highPrice": "80",
        "offerCount": "2",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        "url": typeof window !== "undefined" ? `${window.location.origin}/products` : ""
      },
      "sku": "PP-100G",
      "gtin": "PP-100G"
    },
    {
      "@type": "Product",
      "position": 4,
      "name": "Garam Masala Powder",
      "description": "Premium garam masala powder with traditional spice blend for rich, aromatic curries.",
      "image": typeof window !== "undefined" ? `${window.location.origin}/assets/garam-masala-powder.jpeg` : "",
      "brand": {
        "@type": "Brand",
        "name": "Oggarane Foods"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "40",
        "highPrice": "70",
        "offerCount": "2",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        "url": typeof window !== "undefined" ? `${window.location.origin}/products` : ""
      },
      "sku": "GM-100G",
      "gtin": "GM-100G"
    }
  ]
});

export const getBreadcrumbStructuredData = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": typeof window !== "undefined" ? `${window.location.origin}${item.url}` : item.url
  }))
});

export const getRecipeStructuredData = (recipe: {
  name: string;
  description: string;
  image?: string;
  prepTime?: string;
  cookTime?: string;
  recipeIngredient: string[];
  recipeInstructions: Array<{ text: string }>;
}) => ({
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": recipe.name,
  "description": recipe.description,
  "image": recipe.image || (typeof window !== "undefined" ? `${window.location.origin}/logo.png` : ""),
  "author": {
    "@type": "Organization",
    "name": "Oggarane Foods"
  },
  "prepTime": recipe.prepTime || "PT15M",
  "cookTime": recipe.cookTime || "PT30M",
  "totalTime": recipe.prepTime && recipe.cookTime ? 
    `PT${parseInt(recipe.prepTime) + parseInt(recipe.cookTime)}M` : "PT45M",
  "recipeIngredient": recipe.recipeIngredient,
  "recipeInstructions": recipe.recipeInstructions.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "text": step.text
  })),
  "recipeCuisine": "Indian",
  "recipeCategory": "Main Course",
  "nutrition": {
    "@type": "NutritionInformation",
    "calories": "250 calories"
  }
});

export const getReviewStructuredData = (reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}>) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Oggarane Foods Traditional Spices",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    "reviewCount": reviews.length,
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": reviews.map(review => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "datePublished": review.datePublished || new Date().toISOString(),
    "reviewBody": review.reviewBody,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating.toString(),
      "bestRating": "5",
      "worstRating": "1"
    }
  }))
});

export const getFAQStructuredData = (faqs: Array<{
  question: string;
  answer: string;
}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});




