import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const TermsOfService = () => {
  const { t } = useTranslation();

  const termsSections = [
    {
      icon: CheckCircle,
      title: t("Acceptance of Terms"),
      content: t("By accessing and using our website or purchasing our products, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.")
    },
    {
      icon: Scale,
      title: t("Use License"),
      content: t("Permission is granted to temporarily download one copy of the materials on Oggarane Foods' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials.")
    },
    {
      icon: AlertTriangle,
      title: t("Disclaimer"),
      content: t("The materials on Oggarane Foods' website are provided on an 'as is' basis. Oggarane Foods makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.")
    },
    {
      icon: XCircle,
      title: t("Limitations"),
      content: t("In no event shall Oggarane Foods or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Oggarane Foods' website, even if Oggarane Foods or an authorized representative has been notified orally or in writing of the possibility of such damage.")
    },
    {
      icon: FileText,
      title: t("Product Information"),
      content: t("All product descriptions, images, and specifications are provided for informational purposes only. While we strive for accuracy, we cannot guarantee that all information is complete, reliable, current, or error-free. Product availability and pricing are subject to change without notice.")
    },
    {
      icon: Scale,
      title: t("Order Processing"),
      content: t("By placing an order, you agree to provide accurate and complete information. We reserve the right to refuse or cancel any order at any time. Orders are subject to availability and confirmation of the order price. We may require additional verification before processing certain orders.")
    }
  ];

  const additionalTerms = [
    {
      title: t("Payment Terms"),
      content: t("Payment is due at the time of order placement. We accept various payment methods as indicated on our website. All prices are in Indian Rupees unless otherwise specified.")
    },
    {
      title: t("Shipping and Delivery"),
      content: t("We will make every effort to deliver products within the estimated timeframe. However, delivery times may vary due to factors beyond our control. Risk of loss transfers to you upon delivery.")
    },
    {
      title: t("Returns and Refunds"),
      content: t("Returns are accepted within 7 days of delivery for unopened products in original packaging. Refunds will be processed within 5-7 business days after we receive the returned product.")
    },
    {
      title: t("Intellectual Property"),
      content: t("All content on this website, including text, graphics, logos, images, and software, is the property of Oggarane Foods and is protected by copyright and other intellectual property laws.")
    }
  ];

  return (
    <>
      <SEO
        title="Terms of Service - Usage Terms & Conditions | Oggarane Foods"
        description="Read Oggarane Foods Terms of Service to understand the terms and conditions for using our website and purchasing our products. Legal information and user agreement."
        keywords="terms of service, terms and conditions, user agreement, legal terms"
        url="/terms-of-service"
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-glow text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <FileText className="h-12 w-12 mr-4" />
              <h1 className="text-4xl sm:text-5xl font-bold">{t("Terms of Service")}</h1>
            </div>
            <p className="text-xl text-white/90 mb-8">
              {t("Please read these terms carefully before using our services or purchasing our products.")}
            </p>
            <div className="flex items-center justify-center">
              <Link to="/">
                <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t("Back to Home")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Last Updated */}
          <div className="text-center mb-12">
            <p className="text-muted-foreground">
              {t("Last updated:")} {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">{t("Introduction")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t("Welcome to Oggarane Foods. These Terms of Service ('Terms') govern your use of our website and the purchase of our products. By accessing our website or making a purchase, you agree to be bound by these Terms.")}
              </p>
            </CardContent>
          </Card>

          {/* Main Terms Sections */}
          <div className="grid gap-6">
            {termsSections.map((section, index) => (
              <Card key={index} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <section.icon className="h-6 w-6 mr-3 text-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Terms */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">{t("Additional Terms")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {additionalTerms.map((term, index) => (
                <div key={index} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <h4 className="font-semibold mb-2 text-lg">{term.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {term.content}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">{t("Governing Law")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-center">
                {t("These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in Karnataka, India.")}
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-primary">{t("Contact Information")}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-muted-foreground">
                <p>{t("If you have any questions about these Terms of Service, please contact us:")}</p>
                <p className="mt-4">
                  <strong>{t("Oggarane Foods")}</strong><br />
                  {t("Koppesara, Mattigar, Sirsi")}<br />
                  {t("UttarKannada, Karnataka - 581450")}<br />
                  {t("Email: oggaranefoods@gmail.com")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};

export default TermsOfService;
