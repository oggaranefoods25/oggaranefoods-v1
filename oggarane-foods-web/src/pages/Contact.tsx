import Contact from "@/components/Contact";
import SEO from "@/components/SEO";
import { getBreadcrumbStructuredData } from "@/utils/structuredData";

const ContactPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@graph": [
      getBreadcrumbStructuredData([
        { name: "Home", url: "/" },
        { name: "Contact", url: "/contact" }
      ])
    ]
  };

  return (
    <>
      <SEO
        title="Contact Us - Get in Touch | Oggarane Foods"
        description="Contact Oggarane Foods for orders, inquiries, or support. Located in Sirsi, Karnataka. Call us at +91-8296385766 or email oggaranefoods@gmail.com. We're here to help with your traditional spice needs."
        keywords="contact Oggarane Foods, spice order, customer support, Karnataka spice contact, Sirsi spices contact"
        url="/contact"
        structuredData={structuredData}
      />
      <Contact />
    </>
  );
};

export default ContactPage;

