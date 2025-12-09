import { useTranslation } from "react-i18next";
import { Target, Eye, Heart, Award, Users, Zap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Target,
      title: t("Quality"),
      description: t("Using only the finest ingredients sourced directly from trusted farmers, ensuring every blend meets our exacting standards.")
    },
    {
      icon: Eye,
      title: t("Tradition"),
      description: t("Preserving authentic recipes and traditional roasting techniques that have been perfected over generations.")
    },
    {
      icon: Heart,
      title: t("Purity"),
      description: t("100% natural spice blends with no artificial colors, preservatives, or additives - just pure, wholesome ingredients.")
    }
  ];

  const features = [
    {
      icon: Award,
      title: t("Authentic"),
      description: t("Traditional recipes passed down through generations")
    },
    {
      icon: Users,
      title: t("Family-Made"),
      description: t("Crafted with love in small batches for freshness")
    },
    {
      icon: Zap,
      title: t("Fresh"),
      description: t("Ground and packed fresh to preserve natural oils and aroma")
    }
  ];

  const sectionRef = useScrollReveal<HTMLElement>({ rootMargin: "0px 0px -12% 0px" });

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-28 2xl:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/55 to-primary/10" />
      <div className="absolute inset-0 grain-overlay opacity-30" />
      <div className="relative mx-auto w-full max-w-[1380px] px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24">
        {/* Section Header */}
        <div className="text-center mb-12 xs:mb-16 sm:mb-20 lg:mb-24">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold gradient-text mb-4 xs:mb-6 sm:mb-8 fade-in-up">
            {t("About Rajanna's Recipe")}
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground max-w-3xl mx-auto fade-in-up" style={{ animationDelay: "0.2s" }}>
            {t("A legacy of authentic flavors, preserving traditional spice blending techniques passed down through generations of culinary expertise.")}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 xs:gap-12 sm:gap-16 lg:gap-20 xl:gap-24 items-center mb-16 xs:mb-20 sm:mb-24 lg:mb-28">
          {/* Image/Visual */}
          <div className="fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <div className="glass-card p-4 xs:p-6 sm:p-8 lg:p-10 rounded-2xl">
                <div className="bg-gradient-primary rounded-xl p-4 xs:p-6 sm:p-8 lg:p-10 text-center">
                  <div className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-2 xs:mb-4">25+</div>
                  <div className="text-white/90 text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl mb-1 xs:mb-2">{t("Years of Tradition")}</div>
                  <div className="text-white/70 text-xs xs:text-sm sm:text-base lg:text-lg">{t("Authentic spice blends")}</div>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-glow/20 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }}></div>
            </div>
          </div>

          {/* Content */}
          <div className="fade-in-up" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 xs:mb-6 sm:mb-8">
              {t("Crafting Authentic Flavors Since 1998")}
            </h3>
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl text-muted-foreground mb-4 xs:mb-6 sm:mb-8">
              {t("Rajanna's Recipe began as a humble kitchen experiment in Karnataka, where our founder perfected traditional spice blends using ancestral recipes. What started as a family tradition has grown into a trusted brand known for authentic, preservative-free spice powders.")}
            </p>
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl text-muted-foreground mb-6 xs:mb-8 sm:mb-10">
              {t("Every blend we create honors the time-tested techniques of South Indian cooking, ensuring that each packet delivers the rich, complex flavors that define regional cuisine.")}
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div key={feature.title} className="text-center fade-in-up" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                  <div className="inline-flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-primary/10 rounded-lg mb-2 xs:mb-3">
                    <feature.icon className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base lg:text-lg">{feature.title}</h4>
                  <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={value.title} className="glass-card p-8 rounded-2xl text-center fade-in-up" style={{ animationDelay: `${0.6 + index * 0.2}s` }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6">
                <value.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;