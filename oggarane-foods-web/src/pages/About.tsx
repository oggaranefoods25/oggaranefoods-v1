import About from "@/components/About";
import SEO from "@/components/SEO";
import { getOrganizationStructuredData, getBreadcrumbStructuredData } from "@/utils/structuredData";

const AboutPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationStructuredData(),
      getBreadcrumbStructuredData([
        { name: "Home", url: "/" },
        { name: "About Us", url: "/about" }
      ])
    ]
  };

  return (
    <>
      <SEO
        title="About Us - Our Story & Heritage | Oggarane Foods"
        description="Learn about Oggarane Foods - a family tradition of crafting authentic traditional spices in Karnataka for generations. Discover our heritage, values, and commitment to quality. Made in Sirsi with love and traditional recipes."
        keywords="about Oggarane Foods, traditional spice company, Karnataka spice heritage, family tradition, authentic spices history, Sirsi spices"
        url="/about"
        structuredData={structuredData}
      />
      <About />
    </>
  );
};

export default AboutPage;

