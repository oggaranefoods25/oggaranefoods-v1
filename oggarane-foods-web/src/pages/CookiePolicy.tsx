import { ArrowLeft, Cookie, Settings, BarChart3, Target, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const CookiePolicy = () => {
  const { t } = useTranslation();

  const cookieTypes = [
    {
      icon: Settings,
      title: t("Essential Cookies"),
      description: t("These cookies are necessary for the website to function properly and cannot be disabled."),
      examples: [
        t("Session management"),
        t("Shopping cart functionality"),
        t("User authentication"),
        t("Security features")
      ],
      necessary: true
    },
    {
      icon: BarChart3,
      title: t("Analytics Cookies"),
      description: t("These cookies help us understand how visitors interact with our website."),
      examples: [
        t("Page views and traffic sources"),
        t("User behavior patterns"),
        t("Website performance metrics"),
        t("Popular content identification")
      ],
      necessary: false
    },
    {
      icon: Target,
      title: t("Marketing Cookies"),
      description: t("These cookies are used to deliver relevant advertisements and track marketing campaigns."),
      examples: [
        t("Ad personalization"),
        t("Campaign effectiveness"),
        t("Social media integration"),
        t("Retargeting")
      ],
      necessary: false
    },
    {
      icon: Shield,
      title: t("Preference Cookies"),
      description: t("These cookies remember your preferences and settings for a better user experience."),
      examples: [
        t("Language preferences"),
        t("Theme settings"),
        t("Location preferences"),
        t("Customized content")
      ],
      necessary: false
    }
  ];

  const cookieManagement = [
    {
      title: t("Browser Settings"),
      content: t("You can control cookies through your browser settings. Most browsers allow you to refuse cookies or delete them. However, disabling cookies may affect website functionality.")
    },
    {
      title: t("Cookie Consent"),
      content: t("When you first visit our website, you'll see a cookie consent banner. You can choose which types of cookies to accept or reject.")
    },
    {
      title: t("Third-Party Cookies"),
      content: t("Some cookies are set by third-party services we use (like Google Analytics). You can manage these through their respective privacy settings.")
    }
  ];

  return (
    <>
      <SEO
        title="Cookie Policy - Cookie Usage & Management | Oggarane Foods"
        description="Learn about how Oggarane Foods uses cookies on our website. Understand cookie types, purposes, and how to manage your cookie preferences."
        keywords="cookie policy, cookies, cookie usage, cookie management, privacy cookies"
        url="/cookie-policy"
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-glow text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Cookie className="h-12 w-12 mr-4" />
              <h1 className="text-4xl sm:text-5xl font-bold">{t("Cookie Policy")}</h1>
            </div>
            <p className="text-xl text-white/90 mb-8">
              {t("Learn about how we use cookies to enhance your browsing experience and improve our services.")}
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
              <CardTitle className="text-2xl font-bold text-center">{t("What Are Cookies?")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t("Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better browsing experience by remembering your preferences, analyzing website traffic, and personalizing content.")}
              </p>
            </CardContent>
          </Card>

          {/* Cookie Types */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-8">{t("Types of Cookies We Use")}</h2>
            <div className="grid gap-6">
              {cookieTypes.map((cookie, index) => (
                <Card key={index} className={`fade-in-up ${cookie.necessary ? 'border-primary/20 bg-primary/5' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <cookie.icon className="h-6 w-6 mr-3 text-primary" />
                      {cookie.title}
                      {cookie.necessary && (
                        <span className="ml-2 px-2 py-1 bg-primary text-white text-xs rounded-full">
                          {t("Necessary")}
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {cookie.description}
                    </p>
                    <div>
                      <h4 className="font-semibold mb-2">{t("Examples:")}</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {cookie.examples.map((example, idx) => (
                          <li key={idx}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cookie Management */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">{t("Managing Your Cookie Preferences")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {cookieManagement.map((item, index) => (
                <div key={index} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <h4 className="font-semibold mb-2 text-lg">{item.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Browser Instructions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">{t("Browser-Specific Instructions")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">{t("Google Chrome")}</h4>
                  <p className="text-muted-foreground text-sm">
                    {t("Settings > Privacy and Security > Cookies and other site data")}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t("Mozilla Firefox")}</h4>
                  <p className="text-muted-foreground text-sm">
                    {t("Options > Privacy & Security > Cookies and Site Data")}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t("Safari")}</h4>
                  <p className="text-muted-foreground text-sm">
                    {t("Preferences > Privacy > Manage Website Data")}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t("Microsoft Edge")}</h4>
                  <p className="text-muted-foreground text-sm">
                    {t("Settings > Cookies and site permissions > Cookies and site data")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">{t("Third-Party Services")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("We use third-party services that may set their own cookies:")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Google Analytics:</strong> {t("Website traffic analysis and user behavior insights")}</li>
                <li><strong>Social Media Platforms:</strong> {t("Integration with Facebook, Instagram, YouTube for sharing and engagement")}</li>
                <li><strong>Payment Processors:</strong> {t("Secure payment processing and transaction management")}</li>
                <li><strong>Email Services:</strong> {t("Newsletter delivery and communication management")}</li>
              </ul>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">{t("Policy Updates")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-center">
                {t("We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.")}
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-primary">{t("Contact Us")}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                {t("If you have any questions about our use of cookies or this Cookie Policy, please contact us:")}
              </p>
              <div className="text-muted-foreground">
                <p><strong>{t("Oggarane Foods")}</strong></p>
                <p>{t("Koppesara, Mattigar, Sirsi")}</p>
                <p>{t("UttarKannada, Karnataka - 581450")}</p>
                <p>{t("Email: oggaranefoods@gmail.com")}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};

export default CookiePolicy;
