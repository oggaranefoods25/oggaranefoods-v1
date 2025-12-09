import { useState, useEffect, useRef } from "react";
import { Menu, X, Bell, BellOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useNotifications } from "@/contexts/NotificationContext";
import { Link, useLocation } from "react-router-dom";
import logoImg from "@/assets/logo.png";
import "../i18n"; // Make sure i18n is initialized

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { 
    notificationsEnabled, 
    subscribeToNotifications, 
    unsubscribeFromNotifications,
    isConnected 
  } = useNotifications();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: t("Home"), href: "/" },
    { name: t("About Us"), href: "/about" },
    { name: t("Our Spices"), href: "/products" },
    { name: t("Traditional Recipes"), href: "/recipes" },
    { name: t("Customer Reviews"), href: "/reviews" },
    { name: t("Service Areas"), href: "/service-areas" },
    { name: t("Contact"), href: "/contact" },
  ];

  const toggleNotifications = () => {
    if (notificationsEnabled) {
      unsubscribeFromNotifications();
    } else {
      subscribeToNotifications();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/88 backdrop-blur-xl border-b border-white/10 shadow-[0_22px_55px_-32px_rgba(56,33,18,0.4)]"
          : "bg-background/70 backdrop-blur-lg"
      }`}
    >
      <div className="mx-auto flex h-16 items-center justify-between px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 3xl:px-16">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/85 shadow-[0_12px_30px_-20px_rgba(56,33,18,0.5)] backdrop-blur-md">
            <img
              src={logoImg}
              alt={t("Oggarane Foods")}
              className="tone-spice h-9 w-9 object-contain"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[0.5rem] font-semibold uppercase tracking-[0.36em] text-foreground/55">
              {t("Oggarane Foods")}
            </span>
            <span className="text-base font-semibold text-gilded">
              {t("Oggarane Foods")}
            </span>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-6">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.href}
              className={`relative px-1 py-1 text-[0.5rem] lg:text-[0.54rem] xl:text-[0.58rem] 2xl:text-[0.62rem] font-semibold uppercase tracking-[0.3em] transition-all duration-300 fade-in-up ${
                location.pathname === item.href
                  ? "text-primary"
                  : "text-foreground/75 hover:text-primary"
              } after:absolute after:left-1/2 after:-bottom-[6px] after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-gradient-to-r after:from-primary after:via-accent after:to-primary after:transition-all after:duration-300 ${
                location.pathname === item.href ? "after:w-6" : "hover:after:w-6"
              }`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-3 lg:space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-0.5 xs:space-x-1 rounded-full border border-white/35 bg-white/80 backdrop-blur-lg px-0.5 py-0.5 shadow-[0_14px_32px_-28px_rgba(200,90,22,0.35)]">
              <Button
                variant={i18n.language === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => i18n.changeLanguage("en")}
                className={`h-6 xs:h-7 sm:h-8 lg:h-9 px-2 sm:px-3 text-xs xs:text-sm sm:text-base font-semibold transition-all ${
                  i18n.language === "en"
                    ? "bg-gradient-primary text-primary-foreground shadow-[0_12px_24px_-12px_rgba(200,90,22,0.6)] hover:shadow-[0_18px_36px_-16px_rgba(200,90,22,0.65)]"
                    : "bg-transparent text-foreground/75 hover:text-primary"
                }`}
              >
                EN
              </Button>
              <Button
                variant={i18n.language === "kn" ? "default" : "ghost"}
                size="sm"
                onClick={() => i18n.changeLanguage("kn")}
                className={`h-6 xs:h-7 sm:h-8 lg:h-9 px-2 sm:px-3 text-xs xs:text-sm sm:text-base font-semibold transition-all ${
                  i18n.language === "kn"
                    ? "bg-gradient-primary text-primary-foreground shadow-[0_12px_24px_-12px_rgba(200,90,22,0.6)] hover:shadow-[0_18px_36px_-16px_rgba(200,90,22,0.65)]"
                    : "bg-transparent text-foreground/75 hover:text-primary"
                }`}
              >
                KN
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleNotifications}
              disabled={!isConnected}
              className={`hidden xs:flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2 h-6 xs:h-7 sm:h-8 lg:h-9 px-1.5 xs:px-2 sm:px-3 rounded-full border ${
                notificationsEnabled
                  ? "bg-primary/15 text-primary border-primary/25"
                  : "bg-white/70 text-foreground/60 border-white/40 hover:text-primary hover:border-primary/20"
              } ${!isConnected ? "opacity-60 cursor-not-allowed" : ""} shadow-[0_16px_36px_-26px_rgba(200,90,22,0.45)] backdrop-blur-xl transition-all duration-300`}
            >
              {notificationsEnabled ? (
                <Bell className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              ) : (
                <BellOff className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              )}
              <span className="text-xs xs:text-xs sm:text-sm lg:text-base hidden sm:inline">
                {!isConnected 
                  ? t("Connecting...") 
                  : notificationsEnabled 
                    ? t("Notifications On") 
                    : t("Get Notified")
                }
              </span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="xl:hidden h-8 xs:h-9 sm:h-10 px-2 xs:px-3 sm:px-4 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-xl transition-all duration-300 group shadow-[0_15px_35px_-20px_rgba(200,90,22,0.55)] backdrop-blur-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className={`w-5 h-0.5 bg-primary transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-5 h-0.5 bg-primary transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-5 h-0.5 bg-primary transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
              <span className="ml-2 text-xs xs:text-sm font-medium text-primary group-hover:text-primary/80">
                {isMenuOpen ? 'Close' : 'Menu'}
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Creative Slide Down Menu */}
        <div 
          ref={menuRef}
          className={`xl:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 mt-4' 
              : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <div className="bg-gradient-to-br from-background/95 via-secondary/80 to-primary/10 backdrop-blur-2xl rounded-3xl shadow-[0_30px_120px_-45px_rgba(56,33,18,0.65)] border border-white/25 p-4 xs:p-6 sm:p-8 premium-surface">
            {/* Menu Header */}
            <div className="flex items-center justify-between mb-6 xs:mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/15 rounded-2xl flex items-center justify-center shadow-[0_18px_40px_-20px_rgba(200,90,22,0.6)]">
                  <Menu className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-lg xs:text-xl font-semibold text-foreground tracking-tight">Navigation</h3>
              </div>
              <div className="text-xs xs:text-sm text-muted-foreground">
                {navItems.length} items
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-2 xs:space-y-3">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center justify-between p-3 xs:p-4 rounded-2xl bg-white/60 hover:bg-primary/15 border border-white/30 hover:border-primary/30 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_15px_45px_-25px_rgba(200,90,22,0.6)] ${
                    location.pathname === item.href ? "bg-primary/15 border-primary/30" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className={`group-hover:text-primary font-medium text-sm xs:text-base sm:text-lg transition-colors duration-200 ${
                    location.pathname === item.href ? "text-primary font-semibold" : "text-foreground/80"
                  }`}>
                    {item.name}
                  </span>
                  <div className="w-8 h-8 bg-primary/15 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-[0_10px_30px_-18px_rgba(200,90,22,0.7)]">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </div>
                </Link>
              ))}
            </nav>

            {/* Notification Toggle */}
            <div className="mt-6 xs:mt-8 pt-4 xs:pt-6 border-t border-white/20">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleNotifications}
                disabled={!isConnected}
                className={`w-full flex items-center justify-center space-x-3 h-10 xs:h-12 px-4 xs:px-6 rounded-2xl transition-all duration-300 ${
                  notificationsEnabled
                    ? "bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25"
                    : "bg-white/70 text-muted-foreground border border-white/30 hover:bg-white/80"
                } ${!isConnected ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {notificationsEnabled ? (
                  <Bell className="h-4 w-4 xs:h-5 xs:w-5" />
                ) : (
                  <BellOff className="h-4 w-4 xs:h-5 xs:w-5" />
                )}
                <span className="text-sm xs:text-base font-medium">
                  {!isConnected 
                    ? t("Connecting...") 
                    : notificationsEnabled 
                      ? t("Notifications On") 
                      : t("Get Notified")
                  }
                </span>
              </Button>
            </div>

            {/* Menu Footer */}
            <div className="mt-4 xs:mt-6 text-center">
              <p className="text-xs xs:text-sm text-muted-foreground">
                Tap outside to close menu
              </p>
            </div>
          </div>
        </div>
    </header>
  );
};

export default Header;