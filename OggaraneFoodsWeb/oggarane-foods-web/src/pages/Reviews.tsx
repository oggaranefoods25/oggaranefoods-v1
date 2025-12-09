import CustomerReviews from "@/components/CustomerReviews";
import SEO from "@/components/SEO";
import { getReviewStructuredData, getBreadcrumbStructuredData } from "@/utils/structuredData";

const Reviews = () => {
  // Sample reviews for structured data (you can fetch from API)
  const sampleReviews = [
    {
      author: "Rajesh Kumar",
      rating: 5,
      reviewBody: "Excellent quality spices! The sambar powder is authentic and flavorful.",
      datePublished: "2024-12-01"
    },
    {
      author: "Priya S",
      rating: 5,
      reviewBody: "Best traditional spices I've ever used. Highly recommended!",
      datePublished: "2024-12-05"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getReviewStructuredData(sampleReviews),
      getBreadcrumbStructuredData([
        { name: "Home", url: "/" },
        { name: "Customer Reviews", url: "/reviews" }
      ])
    ]
  };

  return (
    <>
      <SEO
        title="Customer Reviews - What Our Customers Say | Oggarane Foods"
        description="Read authentic customer reviews and testimonials for Oggarane Foods traditional spices. See why thousands of families trust our premium spice blends. Real customer experiences with our Sambar Powder, Rasam Powder, Pulao Powder, and Garam Masala."
        keywords="customer reviews, spice reviews, Oggarane Foods reviews, traditional spice testimonials, spice product reviews, customer feedback"
        url="/reviews"
        structuredData={structuredData}
      />
      <CustomerReviews />
    </>
  );
};

export default Reviews;

