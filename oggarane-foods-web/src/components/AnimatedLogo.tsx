import { useEffect, useState } from "react";
import logoImg from "@/assets/logo.png";
import { useTranslation } from "react-i18next";

const AnimatedLogo = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[99] transition-all duration-1000 ${
        isAnimated ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-white/10 rounded-full blur-2xl animate-glow"></div>
      <div className="flex items-center justify-center min-h-screen">
        <img
          src={logoImg}
          alt={t("Rajanna's Traditional Spices, Now Reimagined as Oggarane's Recipe")}
          className="tone-spice w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 2xl:w-[20rem] 2xl:h-[20rem] 3xl:w-[24rem] 3xl:h-[24rem] 4xl:w-[28rem] 4xl:h-[28rem] object-contain drop-shadow-2xl transition-all duration-1000"
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;