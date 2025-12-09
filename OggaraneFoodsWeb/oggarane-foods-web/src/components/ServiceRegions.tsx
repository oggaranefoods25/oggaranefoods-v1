import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, CheckCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ServiceRegions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const regions = [
    {
      name: t("Sirsi"),
      status: "active",
      description: t("Full service coverage with immediate availability"),
      features: [t("24/7 Support"), t("Same-day Service"), t("Local Team")],
      color: "bg-green-500"
    },
    {
      name: t("Hubli-Dharwad"),
      status: "coming-soon",
      description: t("Service expansion planned for Q2 2024"),
      features: [t("Pre-registration Open"), t("Launch Updates"), t("Early Bird Offers")],
      color: "bg-orange-500"
    },
    {
      name: t("Belgaum"),
      status: "coming-soon",
      description: t("Service expansion planned for Q3 2024"),
      features: [t("Market Analysis"), t("Team Building"), t("Infrastructure Setup")],
      color: "bg-blue-500"
    },
    {
      name: t("Mangalore"),
      status: "coming-soon",
      description: t("Service expansion planned for Q4 2024"),
      features: [t("Feasibility Study"), t("Partnership Opportunities"), t("Stakeholder Meetings")],
      color: "bg-purple-500"
    },
    {
      name: t("Bangalore"),
      status: "coming-soon",
      description: t("Major expansion planned for 2025"),
      features: [t("Strategic Planning"), t("Resource Allocation"), t("Market Entry")],
      color: "bg-pink-500"
    },
    {
      name: t("Mysore"),
      status: "coming-soon",
      description: t("Service expansion under evaluation"),
      features: [t("Market Research"), t("Demand Assessment"), t("Pilot Programs")],
      color: "bg-indigo-500"
    }
  ];

  const sectionRef = useScrollReveal<HTMLElement>({ rootMargin: "0px 0px -10% 0px" });

  return (
    <section id="regions" ref={sectionRef} className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/60 to-primary/10" />
      <div className="absolute inset-0 grain-overlay opacity-30" />
      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 fade-in-up">
            {t("Service Regions")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up" style={{ animationDelay: "0.2s" }}>
            {t("We're expanding our reach to serve you better. Currently operational in Sirsi with exciting expansion plans across Karnataka.")}
          </p>
        </div>

        {/* Current Service Area */}
        <div className="mb-16 fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="glass-card p-8 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <h3 className="text-2xl font-bold text-green-800">{t("Currently Serving")}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-3xl font-bold text-green-700 mb-2">{t("Sirsi, Karnataka")}</h4>
                <p className="text-green-600 mb-4">
                  {t("Our flagship location with full service capabilities and dedicated local support team.")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[t("Full Coverage"), t("24/7 Support"), t("Local Team"), t("Same-day Service")].map((feature) => (
                    <span key={feature} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-4">
                  <MapPin className="h-12 w-12 text-white" />
                </div>
                <p className="text-green-600 font-medium">{t("Ready to Serve You")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expansion Plans */}
        <div className="mb-8 fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h3 className="text-3xl font-bold text-foreground text-center mb-2">{t("Expansion Timeline")}</h3>
          <p className="text-muted-foreground text-center mb-12">
            {t("Our strategic growth plan to bring premium services across Karnataka")}
          </p>
        </div>

        {/* Regions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regions.filter(region => region.status === 'coming-soon').map((region, index) => (
            <div
              key={region.name}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:shadow-premium transition-all duration-300 fade-in-up"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
                  <Clock className="h-3 w-3" />
                  <span>{t("Coming Soon")}</span>
                </div>
              </div>

              {/* Region Info */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className={`w-3 h-3 ${region.color} rounded-full mr-3`}></div>
                  <h4 className="text-2xl font-bold text-foreground">{region.name}</h4>
                </div>
                <p className="text-muted-foreground mb-4">{region.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h5 className="font-semibold text-foreground mb-3">{t("Planned Features:")}</h5>
                {region.features.map((feature) => (
                  <div key={feature} className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Pre-registration */}
              <div className="mt-6 pt-6 border-t border-border">
                <button
                  className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                  onClick={() => {
                    // TODO: Implement pre-registration functionality
                    console.log(`Pre-register for ${region.name}`);
                  }}
                >
                  {t("Get Notified")}
                </button>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in-up" style={{ animationDelay: "0.9s" }}>
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t("Want Service in Your Area?")}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t("Let us know your location and we'll consider it for our next expansion phase. Your interest helps us prioritize our growth.")}
            </p>
            <button
              className="btn-premium mr-4"
              onClick={() => navigate('/contact')}
            >
              {t("Request Your Area")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceRegions;