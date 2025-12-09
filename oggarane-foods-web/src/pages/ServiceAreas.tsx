import ServiceRegions from "@/components/ServiceRegions";
import SEO from "@/components/SEO";
import { getBreadcrumbStructuredData } from "@/utils/structuredData";

const ServiceAreas = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbStructuredData([
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" }
      ])
    ]
  };

  return (
    <>
      <SEO
        title="Service Areas - Delivery Locations | Oggarane Foods"
        description="Find out where we deliver our authentic traditional spices. Currently serving Sirsi and surrounding areas in Karnataka. Request service in your area and join our expanding network of satisfied customers."
        keywords="spice delivery, service areas, Karnataka spice delivery, Sirsi delivery, spice shipping"
        url="/service-areas"
        structuredData={structuredData}
      />
      <ServiceRegions />
    </>
  );
};

export default ServiceAreas;

