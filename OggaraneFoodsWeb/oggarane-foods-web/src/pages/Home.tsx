import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import SEO from "@/components/SEO";
import { getHomeStructuredData, getOrganizationStructuredData } from "@/utils/structuredData";

const Home = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getHomeStructuredData(),
      getOrganizationStructuredData()
    ]
  };

  return (
    <>
      <SEO
        title="Oggarane Foods - Authentic Traditional Spices from Karnataka | Premium Spice Blends"
        description="Authentic traditional spice blends crafted with love and passed down through generations. Premium quality, preservative-free spices from Oggarane Foods. Order Sambar Powder, Rasam Powder, Pulao Powder, and Garam Masala online. Made in Sirsi, Karnataka, India."
        keywords="traditional spices, Karnataka spices, sambar powder, rasam powder, pulao powder, garam masala, authentic spices, homemade spices, preservative-free spices, Oggarane Foods, Sirsi spices, traditional recipes, Indian spices, South Indian spices, buy spices online, Karnataka traditional food"
        structuredData={structuredData}
      />
      <Hero />
      <About />
      <Services />
      <Contact />
    </>
  );
};

export default Home;

