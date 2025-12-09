import { ArrowLeft, Shield, Eye, Lock, Database, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  const privacySections = [
    {
      icon: Eye,
      title: t("Information We Collect"),
      content: t("We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, phone number, shipping address, and payment information.")
    },
    {
      icon: Database,
      title: t("How We Use Your Information"),
      content: t("We use the information we collect to process your orders, communicate with you about your purchases, provide customer support, send you marketing communications (with your consent), and improve our products and services.")
    },
    {
      icon: Lock,
      title: t("Information Sharing"),
      content: t("We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to process your orders (such as with payment processors and shipping companies) or as required by law.")
    },
    {
      icon: Shield,
      title: t("Data Security"),
      content: t("We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.")
    },
    {
      icon: Users,
      title: t("Your Rights"),
      content: t("You have the right to access, update, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, please contact us using the information provided below.")
    },
    {
      icon: Mail,
      title: t("Contact Us"),
      content: t("If you have any questions about this Privacy Policy or our data practices, please contact us at oggaranefoods@gmail.com or write to us at Oggarane Foods, Koppesara, Mattigar, Sirsi, UttarKannada, Karnataka - 581450.")
    }
  ];

  return (
    <>
      <SEO
        title="Privacy Policy - Data Protection & Privacy | Oggarane Foods"
        description="Read Oggarane Foods Privacy Policy to understand how we collect, use, and protect your personal information. We are committed to ensuring your privacy and data security."
        keywords="privacy policy, data protection, privacy, personal information, data security"
        url="/privacy-policy"
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-glow text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-12 w-12 mr-4" />
              <h1 className="text-4xl sm:text-5xl font-bold">{t("Privacy Policy")}</h1>
            </div>
            <p className="text-xl text-white/90 mb-8">
              {t("Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.")}
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
                {t("At Oggarane Foods, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.")}
              </p>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
          <div className="grid gap-6">
            {privacySections.map((section, index) => (
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

          {/* Additional Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">{t("Additional Information")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t("Cookies")}</h4>
                <p className="text-muted-foreground">
                  {t("We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.")}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t("Third-Party Services")}</h4>
                <p className="text-muted-foreground">
                  {t("We may use third-party services for analytics, payment processing, and marketing. These services have their own privacy policies, and we encourage you to review them.")}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t("Policy Updates")}</h4>
                <p className="text-muted-foreground">
                  {t("We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date.")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-primary">{t("Contact Information")}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">oggaranefoods@gmail.com</span>
              </div>
              <div className="text-muted-foreground">
                <p>{t("Oggarane Foods")}</p>
                <p>{t("Koppesara, Mattigar, Sirsi")}</p>
                <p>{t("UttarKannada, Karnataka - 581450")}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};

export default PrivacyPolicy;
