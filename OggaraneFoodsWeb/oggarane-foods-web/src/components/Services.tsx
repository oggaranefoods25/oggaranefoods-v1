import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import rassamPowderImg from "@/assets/rassam-powder.jpeg";
import sambarPowderImg from "@/assets/sambar-powder.jpeg";
import pulaoPowderImg from "@/assets/pulao-powder.jpeg";
import oggarneSambarImg from "@/assets/garam-masala-powder.jpeg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface QuantityOption {
  label: string;
  price: string;
}

interface SpiceCard {
  image: string;
  title: string;
  description: string;
  quantities: QuantityOption[];
}

const Services = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const spices: SpiceCard[] = [
    {
      image: rassamPowderImg,
      title: t("Rassam Powder"),
      description: t("Traditional South Indian spice blend perfect for authentic tangy rassam preparation."),
      quantities: [
        { label: "100g", price: "₹70" },
        { label: "50g", price: "₹40" },
      ],
    },
    {
      image: sambarPowderImg,
      title: t("Sambar Powder"),
      description: t("Aromatic blend of roasted spices for the perfect homestyle sambar every time."),
      quantities: [
        { label: "100g", price: "₹80" },
        { label: "50g", price: "₹45" },
      ],
    },
    {
      image: pulaoPowderImg,
      title: t("Pulao Powder"),
      description: t("Fragrant spice mix that transforms plain rice into restaurant-quality pulao."),
      quantities: [
        { label: "100g", price: "₹80" },
        { label: "50g", price: "₹45" },
      ],
    },
    {
      image: oggarneSambarImg,
      title: t("Garam Masala Powder"),
      description: t("Premium ready-to-cook sambar mix with traditional Kannada flavors."),
      quantities: [
        { label: "100g", price: "₹70" },
        { label: "50g", price: "₹40" },
      ],
    },
  ];

  const [selectedQuantities, setSelectedQuantities] = useState<string[]>(
    () => spices.map((spice) => spice.quantities[0]?.label ?? "100g")
  );

  const handleQuantitySelect = (index: number, label: string) => {
    setSelectedQuantities((prev) => {
      if (prev[index] === label) return prev;
      const updated = [...prev];
      updated[index] = label;
      return updated;
    });
  };

  const sectionRef = useScrollReveal<HTMLElement>({ rootMargin: "0px 0px -10% 0px" });

  return (
    <section id="products" ref={sectionRef} className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/60 to-primary/10" />
      <div className="absolute inset-0 aurora-gradient opacity-70" />
      <div className="absolute inset-0 grain-overlay opacity-40" />
      <div className="relative mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <div className="mb-16 text-center">
          <div className="mx-auto inline-flex items-center space-x-2 rounded-full border border-primary/25 bg-primary/10 px-5 py-2 shadow-[0_18px_45px_-28px_rgba(200,90,22,0.6)]">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">{t("Our Spices")}</span>
          </div>
          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground fade-in-up">
            {t("Premium")} <span className="text-gilded">{t("Spice Collection")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-foreground/70 fade-in-up" style={{ animationDelay: "0.2s" }}>
            {t("Authentic traditional spice blends crafted with time-honored recipes, bringing authentic flavors to your kitchen.")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {spices.map((spice, index) => {
            const quantityOptions = spice.quantities;
            const activeLabel = selectedQuantities[index] ?? quantityOptions[0]?.label ?? "100g";
            const activeOption =
              quantityOptions.find((option) => option.label === activeLabel) ?? quantityOptions[0];

            return (
              <div key={spice.title} className="relative flex">
              <Card 
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/35 bg-white/60 shadow-[0_30px_90px_-45px_rgba(56,33,18,0.6)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_45px_120px_-55px_rgba(56,33,18,0.75)] fade-in-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="relative aspect-square overflow-hidden rounded-b-[2.5rem]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,11,6,0.55)] via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                  <img 
                    src={spice.image} 
                    alt={`${spice.title} - Oggarane Foods Traditional Spice Blend from Karnataka`}
                    loading="lazy"
                    width="400"
                    height="400"
                    className="tone-spice h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader className="space-y-3 pb-0">
                  <CardTitle className="text-xl font-semibold text-foreground">{spice.title}</CardTitle>
                  <div className="flex items-center justify-between rounded-2xl border border-white/35 bg-white/60 px-4 py-2 text-sm text-foreground/70 backdrop-blur-lg">
                    <span>{t("Hand-roasted in small batches")}</span>
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-sm font-semibold text-primary">
                      <span
                        key={activeOption?.label}
                        className="inline-block animate-[fadeIn_0.3s_ease]"
                      >
                        {activeOption?.price}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/35 bg-white/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/70 backdrop-blur-lg">
                    {quantityOptions.map((option) => {
                      const isActive = option.label === activeLabel;
                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => handleQuantitySelect(index, option.label)}
                          className={`rounded-full px-3 py-1 transition-all duration-200 ${
                            isActive
                              ? "bg-gradient-primary text-primary-foreground shadow-[0_12px_28px_-16px_rgba(200,90,22,0.55)]"
                              : "bg-transparent text-foreground/65 hover:bg-white/80 hover:text-primary"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-sm leading-relaxed text-foreground/65">
                    {spice.description}
                  </CardDescription>
                </CardContent>
                <div className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Card>
            </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center fade-in-up" style={{ animationDelay: "0.9s" }}>
          <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-white/40 bg-white/65 p-10 shadow-[0_35px_120px_-55px_rgba(56,33,18,0.75)] backdrop-blur-2xl">
            <h3 className="text-3xl font-semibold text-foreground">
              {t("Taste the Tradition")}
            </h3>
            <p className="mt-4 text-base text-foreground/70">
              {t("Experience authentic flavors passed down through generations. Order now and bring traditional taste to your kitchen.")}
            </p>
            <button
              className="mt-6 inline-flex items-center rounded-full bg-gradient-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_25px_60px_-30px_rgba(200,90,22,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_35px_90px_-32px_rgba(200,90,22,0.9)]"
              onClick={() => navigate('/contact')}
            >
              {t("Order Now")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;