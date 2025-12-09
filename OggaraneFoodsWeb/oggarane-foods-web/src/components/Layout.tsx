import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AnimatedLogo from "./AnimatedLogo";
import { getOrganizationStructuredData } from "@/utils/structuredData";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // Add organization structured data to all pages
  const organizationData = getOrganizationStructuredData();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <div className="relative min-h-screen bg-background text-foreground overflow-hidden grain-overlay">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,182,58,0.24)_0%,rgba(244,182,58,0)_55%)] mix-blend-soft-light" />
        <div className="pointer-events-none absolute inset-x-0 top-[-40%] h-[120vh] bg-[radial-gradient(45%_35%_at_50%_20%,rgba(200,90,22,0.35),rgba(18,10,6,0))]" />
        <div className="relative z-10 flex min-h-screen flex-col">
          <AnimatedLogo />
          <Header />
          <main className="flex-1">
            <div className="relative">
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
              <div className="relative">{children}</div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;

