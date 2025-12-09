import { Clock, Users, ChefHat, Star, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TraditionalRecipes = () => {
  const { t } = useTranslation();

  const recipes = [
    {
      id: 1,
      name: t("Traditional Sambar"),
      description: t("Authentic South Indian sambar made with our signature sambar powder. A perfect blend of lentils, vegetables, and aromatic spices."),
      image: "/src/assets/sambar-powder.jpeg",
      difficulty: t("Easy"),
      time: "30 min",
      servings: "4-6",
      rating: 4.8,
      spiceUsed: t("Sambar Powder"),
      ingredients: [
        t("Toor dal (pigeon peas)"),
        t("Mixed vegetables"),
        t("Tamarind pulp"),
        t("Oggarane Sambar Powder"),
        t("Curry leaves"),
        t("Mustard seeds")
      ],
      steps: [
        t("Cook toor dal until soft"),
        t("Add vegetables and cook"),
        t("Add tamarind and sambar powder"),
        t("Temper with mustard seeds and curry leaves")
      ],
      tips: t("For best results, use fresh vegetables and adjust spice level according to taste.")
    },
    {
      id: 2,
      name: t("Classic Rasam"),
      description: t("Traditional rasam recipe using our authentic rasam powder. Light, tangy, and perfect for digestion."),
      image: "/src/assets/rassam-powder.jpeg",
      difficulty: t("Easy"),
      time: "20 min",
      servings: "3-4",
      rating: 4.7,
      spiceUsed: t("Rasam Powder"),
      ingredients: [
        t("Tomatoes"),
        t("Tamarind pulp"),
        t("Oggarane Rasam Powder"),
        t("Cumin seeds"),
        t("Garlic cloves"),
        t("Coriander leaves")
      ],
      steps: [
        t("Boil tomatoes until soft"),
        t("Add tamarind and rasam powder"),
        t("Temper with cumin and garlic"),
        t("Garnish with coriander leaves")
      ],
      tips: t("Serve hot with rice or drink as a soup. Perfect for cold weather.")
    },
    {
      id: 3,
      name: t("Fragrant Pulao"),
      description: t("Aromatic pulao made with our special pulao powder. Rich in flavors and perfect for special occasions."),
      image: "/src/assets/pulao-powder.jpeg",
      difficulty: t("Medium"),
      time: "45 min",
      servings: "4-5",
      rating: 4.9,
      spiceUsed: t("Pulao Powder"),
      ingredients: [
        t("Basmati rice"),
        t("Mixed vegetables"),
        t("Oggarane Pulao Powder"),
        t("Ghee"),
        t("Bay leaves"),
        t("Cardamom pods")
      ],
      steps: [
        t("Wash and soak basmati rice"),
        t("Sauté vegetables in ghee"),
        t("Add rice and pulao powder"),
        t("Cook until rice is tender")
      ],
      tips: t("Use aged basmati rice for the best aroma and texture.")
    },
    {
      id: 4,
      name: t("Spiced Garam Masala Curry"),
      description: t("Rich and flavorful curry using our premium garam masala. Perfect for meat and vegetable dishes."),
      image: "/src/assets/garam-masala-powder.jpeg",
      difficulty: t("Medium"),
      time: "40 min",
      servings: "4-6",
      rating: 4.8,
      spiceUsed: t("Garam Masala"),
      ingredients: [
        t("Choice of meat/vegetables"),
        t("Onions"),
        t("Tomatoes"),
        t("Oggarane Garam Masala"),
        t("Ginger-garlic paste"),
        t("Yogurt")
      ],
      steps: [
        t("Sauté onions until golden"),
        t("Add ginger-garlic paste"),
        t("Add tomatoes and garam masala"),
        t("Cook until oil separates")
      ],
      tips: t("Add garam masala towards the end for maximum flavor retention.")
    },
    {
      id: 5,
      name: t("Traditional Sambar Rice"),
      description: t("Complete meal combining sambar with rice, a staple in South Indian households."),
      image: "/src/assets/sambar-powder-1.jpg",
      difficulty: t("Easy"),
      time: "35 min",
      servings: "4-6",
      rating: 4.6,
      spiceUsed: t("Sambar Powder"),
      ingredients: [
        t("Cooked rice"),
        t("Sambar (from recipe above)"),
        t("Papad"),
        t("Pickle"),
        t("Ghee"),
        t("Cashews")
      ],
      steps: [
        t("Prepare sambar using sambar powder"),
        t("Serve hot rice with sambar"),
        t("Add ghee and cashews"),
        t("Serve with papad and pickle")
      ],
      tips: t("Mix rice and sambar together for authentic South Indian experience.")
    },
    {
      id: 6,
      name: t("Rasam Rice"),
      description: t("Light and comforting rasam rice, perfect for lunch or when feeling under the weather."),
      image: "/src/assets/rassam-powder-1.jpg",
      difficulty: t("Easy"),
      time: "25 min",
      servings: "3-4",
      rating: 4.5,
      spiceUsed: t("Rasam Powder"),
      ingredients: [
        t("Cooked rice"),
        t("Rasam (from recipe above)"),
        t("Ghee"),
        t("Cumin powder"),
        t("Coriander leaves"),
        t("Fried papad")
      ],
      steps: [
        t("Prepare rasam using rasam powder"),
        t("Mix hot rice with rasam"),
        t("Add ghee and cumin powder"),
        t("Garnish with coriander leaves")
      ],
      tips: t("Rasam rice is excellent for digestion and can be eaten daily.")
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case t("Easy"): return "bg-success/15 text-success";
      case t("Medium"): return "bg-warning/20 text-warning";
      case t("Hard"): return "bg-destructive/15 text-destructive";
      default: return "bg-muted/30 text-foreground/70";
    }
  };

  const sectionRef = useScrollReveal<HTMLElement>({ rootMargin: "0px 0px -10% 0px" });

  return (
    <section id="recipes" ref={sectionRef} className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/60 to-primary/10" />
      <div className="absolute inset-0 aurora-gradient opacity-70" />
      <div className="absolute inset-0 grain-overlay opacity-30" />
      <div className="relative mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mx-auto inline-flex items-center space-x-2 rounded-full border border-primary/25 bg-primary/10 px-5 py-2 shadow-[0_18px_45px_-28px_rgba(200,90,22,0.6)] fade-in-up">
            <ChefHat className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
              {t("Authentic Recipes")}
            </span>
          </div>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground fade-in-up" style={{ animationDelay: "0.1s" }}>
            {t("Traditional Recipes")}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base sm:text-lg text-foreground/70 leading-relaxed fade-in-up" style={{ animationDelay: "0.2s" }}>
            {t("Discover authentic South Indian recipes using our traditional spice blends. Each recipe has been passed down through generations and perfected with our premium spices.")}
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, index) => (
            <Card
              key={recipe.id}
              className="group relative overflow-hidden rounded-[2.25rem] border border-white/35 bg-white/65 shadow-[0_35px_110px_-55px_rgba(56,33,18,0.7)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_45px_130px_-60px_rgba(56,33,18,0.75)] fade-in-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-[2.25rem] rounded-b-none">
                <img
                  src={recipe.image}
                  alt={`${recipe.name} - Traditional Recipe using Oggarane Foods Spices`}
                  loading="lazy"
                  className="tone-spice h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-56"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,11,6,0.7)] via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute left-5 top-5">
                  <Badge className={`${getDifficultyColor(recipe.difficulty)} border-0 px-3 py-1 text-xs font-semibold`}>
                    {recipe.difficulty}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-1 rounded-full border border-white/30 bg-white/70 px-3 py-1 text-xs font-semibold text-foreground/70 shadow-[0_12px_32px_-20px_rgba(56,33,18,0.6)]">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-5 left-5">
                  <Badge variant="secondary" className="rounded-full border-0 bg-primary/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground">
                    {recipe.spiceUsed}
                  </Badge>
                </div>
              </div>

              <CardHeader className="space-y-3 pb-3">
                <CardTitle className="text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {recipe.name}
                </CardTitle>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {recipe.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Recipe Info */}
                <div className="flex items-center justify-between rounded-2xl border border-white/30 bg-white/60 px-4 py-2 text-sm text-foreground/70 backdrop-blur-xl">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">{recipe.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-medium">{recipe.servings}</span>
                  </div>
                </div>

                {/* Ingredients Preview */}
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-foreground">{t("Key Ingredients:")}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                      <Badge key={idx} variant="outline" className="rounded-full border-white/40 bg-white/50 px-3 py-1 text-[11px] text-foreground/70">
                        {ingredient}
                      </Badge>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <Badge variant="outline" className="rounded-full border-white/40 bg-white/50 px-3 py-1 text-[11px] text-foreground/70">
                        +{recipe.ingredients.length - 3} {t("more")}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Recipe Steps Preview */}
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-foreground">{t("Quick Steps:")}</h4>
                  <ul className="space-y-1 text-xs text-foreground/70">
                    {recipe.steps.slice(0, 2).map((step, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-semibold text-primary">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                    {recipe.steps.length > 2 && (
                      <li className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                        +{recipe.steps.length - 2} {t("more steps")}
                      </li>
                    )}
                  </ul>
                </div>

                {/* Tips */}
                <div className="rounded-2xl border border-primary/25 bg-primary/10 p-4">
                  <h4 className="text-sm font-semibold text-primary">{t("Chef's Tip:")}</h4>
                  <p className="mt-2 text-xs text-foreground/70">{recipe.tips}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button className="flex-1 rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground shadow-[0_22px_55px_-30px_rgba(200,90,22,0.75)] hover:bg-gradient-primary/90">
                    <Play className="mr-2 h-4 w-4" />
                    {t("View Recipe")}
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full border border-primary/35 bg-white/60 px-4 text-primary hover:bg-primary/10">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center sm:mt-20">
          <Card className="mx-auto max-w-4xl rounded-[2.75rem] border border-white/40 bg-white/65 shadow-[0_35px_120px_-55px_rgba(56,33,18,0.75)] backdrop-blur-2xl">
            <CardContent className="py-10 sm:py-12">
              <div className="mb-5 flex items-center justify-center space-x-4 text-foreground">
                <ChefHat className="h-9 w-9 text-primary" />
                <h3 className="text-2xl sm:text-3xl font-semibold">
                  {t("Ready to Cook?")}
                </h3>
              </div>
              <p className="mx-auto mb-6 max-w-2xl text-base text-foreground/70">
                {t("Get our authentic spice blends and start cooking these traditional recipes today. Each spice blend is carefully crafted to bring out the authentic flavors of South Indian cuisine.")}
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="rounded-full bg-gradient-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_25px_60px_-30px_rgba(200,90,22,0.8)] hover:-translate-y-0.5 hover:shadow-[0_35px_90px_-32px_rgba(200,90,22,0.9)]">
                  {t("Shop Our Spices")}
                </Button>
                <Button variant="outline" size="lg" className="rounded-full border border-primary/40 bg-white/60 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary hover:bg-primary/10 hover:text-primary shadow-[0_18px_45px_-30px_rgba(56,33,18,0.5)]">
                  {t("Download Recipe Book")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TraditionalRecipes;
