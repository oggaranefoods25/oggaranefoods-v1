import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  url?: string;
  structuredData?: object;
  canonical?: string;
}

const SEO = ({
  title = "Oggarane Foods - Authentic Traditional Spices from Karnataka",
  description = "Authentic traditional spice blends crafted with love and passed down through generations. Premium quality, preservative-free spices from Oggarane Foods. Order Sambar Powder, Rasam Powder, Pulao Powder, and Garam Masala online.",
  keywords = "traditional spices, Karnataka spices, sambar powder, rasam powder, pulao powder, garam masala, authentic spices, homemade spices, preservative-free spices, Oggarane Foods, Sirsi spices, traditional recipes, Indian spices, South Indian spices",
  image = "/logo.png",
  type = "website",
  url,
  structuredData,
  canonical,
}: SEOProps) => {
  const location = useLocation();
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const currentUrl = url || `${siteUrl}${location.pathname}`;
  const canonicalUrl = canonical || currentUrl;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement("meta");
        if (isProperty) {
          element.setAttribute("property", property);
        } else {
          element.setAttribute("name", property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", "Oggarane Foods");
    updateMetaTag("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    updateMetaTag("googlebot", "index, follow");
    updateMetaTag("language", "English, Kannada");
    updateMetaTag("revisit-after", "7 days");
    updateMetaTag("rating", "general");
    updateMetaTag("distribution", "global");

    // Open Graph meta tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:image", `${siteUrl}${image}`, true);
    updateMetaTag("og:url", currentUrl, true);
    updateMetaTag("og:site_name", "Oggarane Foods", true);
    updateMetaTag("og:locale", "en_US", true);
    updateMetaTag("og:locale:alternate", "kn_IN", true);

    // Twitter Card meta tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", `${siteUrl}${image}`);
    updateMetaTag("twitter:site", "@oggaranefoods");
    updateMetaTag("twitter:creator", "@oggaranefoods");

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // Structured Data (JSON-LD)
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (structuredData) {
      if (!structuredDataScript) {
        structuredDataScript = document.createElement("script");
        structuredDataScript.setAttribute("type", "application/ld+json");
        document.head.appendChild(structuredDataScript);
      }
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else if (structuredDataScript) {
      structuredDataScript.remove();
    }

    // Additional meta tags for better SEO
    updateMetaTag("theme-color", "#dc2626"); // Primary color
    updateMetaTag("apple-mobile-web-app-capable", "yes");
    updateMetaTag("apple-mobile-web-app-status-bar-style", "black-translucent");
    updateMetaTag("apple-mobile-web-app-title", "Oggarane Foods");
    updateMetaTag("mobile-web-app-capable", "yes");

    // Geo tags (if needed)
    updateMetaTag("geo.region", "IN-KA");
    updateMetaTag("geo.placename", "Sirsi, Uttar Kannada, Karnataka");
    updateMetaTag("geo.position", "14.6197;74.8475");
    updateMetaTag("ICBM", "14.6197, 74.8475");

    // Hreflang tags for multilingual support
    const updateLinkTag = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang 
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]`;
      let element = document.querySelector(selector) as HTMLLinkElement;
      
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        if (hreflang) {
          element.setAttribute("hreflang", hreflang);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Add hreflang tags for English and Kannada
    updateLinkTag("alternate", currentUrl, "en");
    updateLinkTag("alternate", currentUrl, "kn");
    updateLinkTag("alternate", currentUrl, "x-default");

  }, [title, description, keywords, image, type, currentUrl, canonicalUrl, structuredData, siteUrl]);

  return null;
};

export default SEO;




