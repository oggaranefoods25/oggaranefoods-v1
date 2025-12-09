import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Layout from "@/components/Layout";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Recipes = lazy(() => import("./pages/Recipes"));
const Reviews = lazy(() => import("./pages/Reviews"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));

const queryClient = new QueryClient();

// Loading fallback component
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotificationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Main Pages with Layout */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/products" element={<Layout><Products /></Layout>} />
              <Route path="/recipes" element={<Layout><Recipes /></Layout>} />
              <Route path="/reviews" element={<Layout><Reviews /></Layout>} />
              <Route path="/service-areas" element={<Layout><ServiceAreas /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              
              {/* Policy Pages with Layout */}
              <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
              <Route path="/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
              <Route path="/cookie-policy" element={<Layout><CookiePolicy /></Layout>} />
              
              {/* 404 Page */}
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </NotificationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
