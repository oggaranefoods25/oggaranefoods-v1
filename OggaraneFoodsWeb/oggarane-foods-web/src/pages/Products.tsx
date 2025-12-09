import Services from "@/components/Services";
import SEO from "@/components/SEO";
import { getProductsStructuredData, getBreadcrumbStructuredData, getFAQStructuredData } from "@/utils/structuredData";

const Products = () => {
  const faqData = [
    {
      question: "What makes Oggarane Foods spices different from store-bought spices?",
      answer: "Our spices are hand-roasted in small batches using traditional recipes passed down through generations. They are 100% preservative-free, made with authentic ingredients, and crafted with care in Sirsi, Karnataka. Unlike mass-produced spices, we maintain traditional methods that preserve the authentic flavors and aromas."
    },
    {
      question: "Are your spices preservative-free?",
      answer: "Yes, all our spice blends are 100% preservative-free. We use only natural ingredients and traditional preparation methods to ensure the highest quality and authentic taste."
    },
    {
      question: "What quantities are available for each spice?",
      answer: "Each spice is available in two sizes: 100g and 50g. You can select your preferred quantity when viewing each product. Prices vary based on the quantity selected."
    },
    {
      question: "Do you deliver outside Karnataka?",
      answer: "Yes, we deliver across India. Please check our Service Areas page for more details on delivery locations and shipping information."
    },
    {
      question: "How long do the spices stay fresh?",
      answer: "Our spices maintain their freshness and flavor for up to 12 months when stored in a cool, dry place away from direct sunlight. We recommend using airtight containers for optimal preservation."
    },
    {
      question: "Can I order multiple products together?",
      answer: "Yes, you can order multiple spice products together. Simply add all desired products to your order through our contact form, and we'll prepare a combined order for you."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getProductsStructuredData(),
      getBreadcrumbStructuredData([
        { name: "Home", url: "/" },
        { name: "Our Spices", url: "/products" }
      ]),
      getFAQStructuredData(faqData)
    ]
  };

  return (
    <>
      <SEO
        title="Our Spices - Premium Traditional Spice Blends | Oggarane Foods"
        description="Discover our premium collection of authentic traditional spice blends. Sambar Powder, Rasam Powder, Pulao Powder, and Garam Masala - all made with traditional recipes, preservative-free, and packed with authentic flavors from Karnataka."
        keywords="buy spices online, sambar powder online, rasam powder online, pulao powder online, garam masala online, traditional spice blends, Karnataka spices, authentic Indian spices"
        url="/products"
        structuredData={structuredData}
      />
      <Services />
    </>
  );
};

export default Products;

