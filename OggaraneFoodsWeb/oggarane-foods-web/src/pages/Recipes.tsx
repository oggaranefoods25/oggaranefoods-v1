import TraditionalRecipes from "@/components/TraditionalRecipes";
import SEO from "@/components/SEO";
import { getBreadcrumbStructuredData } from "@/utils/structuredData";

const Recipes = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbStructuredData([
        { name: "Home", url: "/" },
        { name: "Traditional Recipes", url: "/recipes" }
      ])
    ]
  };

  return (
    <>
      <SEO
        title="Traditional Recipes - Authentic Karnataka Spice Recipes | Oggarane Foods"
        description="Learn to cook authentic Karnataka dishes with our traditional spice recipes. Step-by-step guides for Sambar, Rasam, Pulao, and more using our premium spice blends. Traditional cooking methods and chef's tips included."
        keywords="traditional recipes, Karnataka recipes, sambar recipe, rasam recipe, pulao recipe, Indian cooking recipes, traditional cooking methods, spice recipes"
        url="/recipes"
        structuredData={structuredData}
      />
      <TraditionalRecipes />
    </>
  );
};

export default Recipes;

