import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const quickLinks = [
    { name: t("Home"), to: "/" },
    { name: t("About Us"), to: "/about" },
    { name: t("Our Spices"), to: "/products" },
    { name: t("Contact"), to: "/contact" },
  ];

  const services = [
    { name: t("Sambar Powder"), to: "/products" },
    { name: t("Rasam Powder"), to: "/products" },
    { name: t("Pulao Powder"), to: "/products" },
    { name: t("Garam Masala"), to: "/products" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/1Ca347CEbX/?mibextid=wwXIfr", label: t("Facebook") },
    { icon: Youtube, href: "https://www.youtube.com/@OggaraneFoodsYT", label: t("Youtube") },
    { icon: Instagram, href: "https://www.instagram.com/oggarane_foods_?igsh=MWhsdWRzY2tiaWR0eQ==", label: t("Instagram") },
    { icon: Linkedin, href: "#", label: t("LinkedIn") },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden bg-gradient-to-br from-background via-secondary/70 to-primary/15 text-foreground">
      <div className="absolute inset-0 premium-backdrop opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-primary/25 via-primary/10 to-transparent pointer-events-none" />
      <div className="relative mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-10 xl:px-12 py-16 sm:py-20 lg:py-24 premium-surface">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
          {/* Company Info */}
          <div className="fade-in-up">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4">
              {t("Crafting heritage flavors")}
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground tracking-tight mb-4 sm:mb-6">
              {t("Oggarane Foods")}
            </h3>
            <p className="text-foreground/70 mb-4 xs:mb-6 sm:mb-8 leading-relaxed text-sm xs:text-base sm:text-lg">
              {t("Authentic traditional spices crafted with love and passed down through generations. Experience the rich flavors of Karnataka's culinary heritage.")}
            </p>
            <div className="space-y-3 text-xs xs:text-sm sm:text-base">
              <div className="flex items-start text-foreground/70">
                <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>{t("Oggarane Foods, Koppesara, Mattigar, Sirsi, UttarKannada, Karnataka - 581450")}</span>
              </div>
              <div className="flex items-center text-foreground/70">
                <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Phone className="h-4 w-4" />
                </div>
                <span>{t("+91 82963 85766")}</span>
              </div>
              <div className="flex items-center text-foreground/70">
                <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Mail className="h-4 w-4" />
                </div>
                <span>{t("oggaranefoods@gmail.com")}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h4 className="text-lg font-semibold text-foreground mb-4">{t("Quick Links")}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="group flex items-center text-sm text-foreground/70 transition-all duration-300 hover:text-primary"
                  >
                    <span className="mr-2 h-1 w-4 rounded-full bg-primary/30 transition-all duration-300 group-hover:w-6 group-hover:bg-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h4 className="text-lg font-semibold text-foreground mb-4">{t("Our Spices")}</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.to}
                    className="group flex items-center text-sm text-foreground/70 transition-all duration-300 hover:text-primary"
                  >
                    <span className="mr-2 h-1 w-4 rounded-full bg-primary/30 transition-all duration-300 group-hover:w-6 group-hover:bg-primary" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h4 className="text-lg font-semibold text-foreground mb-4">{t("Stay Connected")}</h4>
            <p className="text-foreground/70 text-sm mb-4">
              {t("Follow us on social media for updates and industry insights.")}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-11 h-11 rounded-full flex items-center justify-center bg-white/70 text-foreground/60 shadow-[0_20px_45px_-30px_rgba(56,33,18,0.6)] transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-sm text-foreground/70">{t("Subscribe to our newsletter")}</p>
              <div className="flex rounded-full border border-white/40 bg-white/50 backdrop-blur-xl p-1 shadow-[0_22px_65px_-35px_rgba(56,33,18,0.55)]">
                <input
                  type="email"
                  placeholder={t("Your email")}
                  className="flex-1 rounded-full bg-transparent px-4 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
                />
                <button className="ml-2 flex items-center justify-center rounded-full bg-gradient-primary px-4 py-2 text-primary-foreground transition-all duration-300 hover:shadow-[0_18px_40px_-22px_rgba(200,90,22,0.7)]">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/30 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-foreground/70 text-sm fade-in-up" style={{ animationDelay: "0.4s" }}>
              © {currentYear} {t("Oggarane Foods")}. {t("All rights reserved.")} 
            </div>
            <div className="flex space-x-6 text-sm fade-in-up" style={{ animationDelay: "0.5s" }}>
              <Link to="/privacy-policy" className="text-foreground/70 hover:text-primary transition-colors duration-200">
                {t("Privacy Policy")}
              </Link>
              <Link to="/terms-of-service" className="text-foreground/70 hover:text-primary transition-colors duration-200">
                {t("Terms of Service")}
              </Link>
              <Link to="/cookie-policy" className="text-foreground/70 hover:text-primary transition-colors duration-200">
                {t("Cookie Policy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;