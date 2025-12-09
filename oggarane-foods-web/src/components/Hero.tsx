import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import pulaoPowderImg from "@/assets/logo.png";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Hero = () => {
  const navigate = useNavigate();
  const sectionRef = useScrollReveal<HTMLElement>({ rootMargin: "0px 0px -15% 0px" });
  const badgeRef = useScrollReveal<HTMLDivElement>({ delay: 100 });
  const headingRef = useScrollReveal<HTMLHeadingElement>({ delay: 200 });
  const subheadingRef = useScrollReveal<HTMLParagraphElement>({ delay: 300 });
  const ctaRef = useScrollReveal<HTMLDivElement>({ delay: 400 });
  const statsRef = useScrollReveal<HTMLDivElement>({ delay: 500 });
  
  return (
    <section id="home" ref={sectionRef} className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Background Layers */}
      <div className="absolute inset-0 premium-backdrop opacity-80" />
      <div className="absolute inset-0 aurora-gradient opacity-90" />
      <div className="absolute inset-0 spice-particle opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_80%_20%,rgba(244,182,58,0.22),rgba(248,241,234,0))]" />
      <div className="absolute inset-0 grain-overlay opacity-50" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 xs:px-6 sm:px-8 lg:px-10 xl:px-14 py-24">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-center">
          {/* Logo on the far left, much bigger */}
          <div className="relative w-full max-w-[420px] lg:max-w-[460px] xl:max-w-[520px]">
            <div className="absolute -inset-12 hidden lg:block" aria-hidden="true">
              <div className="h-full w-full rounded-[3rem] bg-gradient-to-br from-primary/20 via-accent/25 to-transparent blur-3xl" />
            </div>
            <div className="premium-logo-surface rounded-[2.5rem] border border-white/35 p-6 shadow-[0_45px_120px_-60px_rgba(56,33,18,0.75)] backdrop-blur-3xl">
            <img
              src={pulaoPowderImg}
              alt="Pulao Powder - Oggarane Foods Traditional Spice Blend from Karnataka"
              loading="lazy"
              className="tone-spice mx-auto aspect-square w-full max-w-[360px] object-contain drop-shadow-[0_35px_75px_rgba(56,33,18,0.45)]"
            />
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/30 bg-white/40 px-5 py-3 text-xs uppercase tracking-[0.32em] text-foreground/70">
                <span>EST. 1998</span>
                <span>HANDCRAFTED</span>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1 max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            {/* Badge */}
            <div ref={badgeRef} className="inline-flex items-center space-x-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
              <Sparkles className="h-4 w-4" />
              <span>{`Spice Atelier`}</span>
            </div>

            {/* Main Heading */}
            <h1
              ref={headingRef}
              className="mt-6 text-center text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-semibold leading-tight tracking-tight text-foreground fade-in-up lg:text-left"
              style={{ animationDelay: "0.2s" }}
            >
              Rajanna&apos;s Recipe
              <span className="block text-gilded">Traditional Spice Atelier</span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subheadingRef}
              className="mx-auto mt-6 max-w-2xl text-center text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 lg:mx-0 lg:text-left fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              Authentic spice blends, stone-ground in Sirsi, infused with 25+ years of family craftsmanship. Every jar captures the aroma of heritage kitchens and the warmth of celebrations.
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="mt-8 flex flex-col items-center justify-center space-y-3 xs:flex-row xs:space-y-0 xs:space-x-3 sm:space-x-4 lg:justify-start lg:space-x-6 xl:space-x-8 fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <Button 
                size="lg" 
                className="w-full xs:w-auto rounded-full bg-gradient-primary px-6 sm:px-8 lg:px-10 py-3 text-sm xs:text-base sm:text-lg font-semibold text-primary-foreground shadow-[0_25px_60px_-30px_rgba(200,90,22,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_35px_90px_-32px_rgba(200,90,22,0.9)]"
                onClick={() => navigate('/contact')}
              >
                Get Started Today
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full xs:w-auto rounded-full border border-primary/35 bg-white/40 px-6 sm:px-8 lg:px-10 py-3 text-sm xs:text-base sm:text-lg font-semibold text-foreground/80 backdrop-blur-xl transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                onClick={() => navigate('/about')}
              >
                Learn More
              </Button>
            </div>

            {/* Featured Product */}
            <div
              ref={statsRef}
              className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-3 xs:grid-cols-3 xs:gap-4 sm:gap-6 lg:gap-8 fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="rounded-2xl border border-white/35 bg-white/50 p-4 xs:p-5 sm:p-6 lg:p-7 shadow-[0_25px_75px_-40px_rgba(56,33,18,0.65)] backdrop-blur-xl">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">25+</div>
                <div className="mt-1 text-xs xs:text-sm sm:text-base text-foreground/70">Years of Craftsmanship</div>
              </div>
              <div className="rounded-2xl border border-white/35 bg-white/50 p-4 xs:p-5 sm:p-6 lg:p-7 shadow-[0_25px_75px_-40px_rgba(56,33,18,0.65)] backdrop-blur-xl">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">100%</div>
                <div className="mt-1 text-xs xs:text-sm sm:text-base text-foreground/70">Stone-ground & Natural</div>
              </div>
              <div className="rounded-2xl border border-white/35 bg-white/50 p-4 xs:p-5 sm:p-6 lg:p-7 shadow-[0_25px_75px_-40px_rgba(56,33,18,0.65)] backdrop-blur-xl">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">0</div>
                <div className="mt-1 text-xs xs:text-sm sm:text-base text-foreground/70">Added Preservatives</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 xs:bottom-6 sm:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 fade-in-up" style={{ animationDelay: "1s" }}>
        <div 
          className="flex cursor-pointer flex-col items-center space-y-2 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.22em] text-foreground/70 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:text-primary"
          onClick={() => navigate('/about')}
        >
          <span className="text-[10px] xs:text-xs font-semibold">Scroll to explore</span>
          <ArrowDown className="h-4 w-4 xs:h-5 xs:w-5 text-current" />
        </div>
      </div>
    </section>
  );
};

export default Hero;