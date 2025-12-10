import { useState, useEffect } from "react";
import { Star, Send, MessageSquare, ThumbsUp, ThumbsDown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface FeedbackFormData {
  name: string;
  email: string;
  phone?: string;
  rating: number;
  review: string;
  product: string;
}

const FeedbackForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: "",
    email: "",
    phone: "",
    rating: 0,
    review: "",
    product: ""
  });
  
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContactFields, setShowContactFields] = useState(false);

  const products = [
    t("Sambar Powder"),
    t("Rasam Powder"), 
    t("Pulao Powder"),
    t("Garam Masala")
  ];

  const ratingLabels = [
    t("Poor"),
    t("Fair"), 
    t("Good"),
    t("Very Good"),
    t("Excellent")
  ];

  // Show contact fields for ratings below 3.5
  useEffect(() => {
    setShowContactFields(formData.rating > 0 && formData.rating < 3.5);
  }, [formData.rating]);

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleInputChange = (field: keyof FeedbackFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.review || !formData.product || formData.rating === 0) {
      toast({
        title: t("Please fill all required fields"),
        description: t("Name, rating, product, and review are required"),
        variant: "destructive"
      });
      return;
    }

    if (showContactFields && (!formData.email || !formData.phone)) {
      toast({
        title: t("Contact information required"),
        description: t("Email and phone number are required for ratings below 3.5"),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send feedback data
      const feedbackData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        message: `Product: ${formData.product}\nRating: ${formData.rating}/5 (${ratingLabels[formData.rating - 1]})\nReview: ${formData.review}`,
        rating: formData.rating,
        product: formData.product,
        review: formData.review
      };

      // Call Azure Static Web Apps API function
      const response = await fetch('/api/sendContactEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to submit feedback');
      }

      toast({
        title: t("Feedback Submitted Successfully!"),
        description: t("Thank you for your valuable feedback. A confirmation email has been sent to your inbox."),
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        rating: 0,
        review: "",
        product: ""
      });
      setHoveredRating(0);

    } catch (error) {
      toast({
        title: t("Submission Failed"),
        description: t("Please try again later"),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

const getRatingColor = (rating: number) => {
  if (rating <= 2) return "text-destructive";
  if (rating <= 3) return "text-warning";
  if (rating <= 4) return "text-accent";
  return "text-success";
  };

  const getRatingIcon = (rating: number) => {
    if (rating <= 2) return <ThumbsDown className="h-4 w-4" />;
    if (rating <= 3) return <AlertCircle className="h-4 w-4" />;
    if (rating <= 4) return <ThumbsUp className="h-4 w-4" />;
    return <ThumbsUp className="h-4 w-4" />;
  };

  return (
    <Card className="mx-auto w-full max-w-2xl rounded-[2.5rem] border border-white/35 bg-white/65 shadow-[0_35px_110px_-55px_rgba(56,33,18,0.7)] backdrop-blur-2xl">
      <CardHeader className="text-center">
        <div className="mb-4 flex items-center justify-center space-x-3">
          <MessageSquare className="h-9 w-9 text-primary" />
          <CardTitle className="text-2xl font-semibold text-foreground">{t("Share Your Experience")}</CardTitle>
        </div>
        <p className="text-sm text-foreground/70 sm:text-base">
          {t("Help us improve by sharing your feedback about our products")}
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Selection */}
          <div className="space-y-2">
            <Label htmlFor="product" className="text-xs font-medium uppercase tracking-[0.24em] text-foreground/70 sm:text-sm">
              {t("Product")} <span className="text-red-500">*</span>
            </Label>
            <select
              id="product"
              value={formData.product}
              onChange={(e) => handleInputChange("product", e.target.value)}
              className="w-full rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_12px_32px_-24px_rgba(56,33,18,0.55)] focus:outline-none focus:ring-2 focus:ring-primary/30"
              required
            >
              <option value="">{t("Select a product")}</option>
              {products.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-medium uppercase tracking-[0.24em] text-foreground/70 sm:text-sm">
              {t("Your Name")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder={t("Enter your name")}
              className="rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_12px_32px_-24px_rgba(56,33,18,0.55)] placeholder:text-foreground/35 focus:border-primary focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <Label className="text-xs font-medium uppercase tracking-[0.24em] text-foreground/70 sm:text-sm">
              {t("Rating")} <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoveredRating || formData.rating)
                        ? "fill-accent text-accent drop-shadow-[0_6px_12px_rgba(244,182,58,0.35)]"
                        : "text-foreground/20"
                    }`}
                  />
                </button>
              ))}
              {formData.rating > 0 && (
                <div className="ml-4 flex items-center space-x-3 rounded-full border border-white/40 bg-white/70 px-4 py-2 shadow-[0_12px_32px_-24px_rgba(56,33,18,0.55)]">
                  <span className={`text-sm font-semibold ${getRatingColor(formData.rating)}`}>
                    {formData.rating}/5
                  </span>
                  <Badge variant="outline" className={`rounded-full border border-current bg-transparent text-xs font-semibold ${getRatingColor(formData.rating)}`}>
                    {getRatingIcon(formData.rating)}
                    <span className="ml-1">{ratingLabels[formData.rating - 1]}</span>
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Contact Fields for Low Ratings */}
          {showContactFields && (
            <div className="space-y-4 rounded-[1.75rem] border border-warning/30 bg-warning/10 p-5">
              <div className="flex items-center space-x-2 text-warning">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-semibold">
                  {t("We'd love to improve! Please share your contact details so we can follow up.")}
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-medium uppercase tracking-[0.24em] text-foreground/70 sm:text-sm">
                    {t("Email")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder={t("your.email@example.com")}
                    className="rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_12px_32px_-24px_rgba(56,33,18,0.55)] placeholder:text-foreground/35 focus:border-primary focus:ring-2 focus:ring-primary/30"
                    required={showContactFields}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-medium uppercase tracking-[0.24em] text-foreground/70 sm:text-sm">
                    {t("Phone Number")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder={t("+91 98765 43210")}
                    className="rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_12px_32px_-24px_rgba(56,33,18,0.55)] placeholder:text-foreground/35 focus:border-primary focus:ring-2 focus:ring-primary/30"
                    required={showContactFields}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Review */}
          <div className="space-y-2">
            <Label htmlFor="review" className="text-xs font-medium uppercase tracking-[0.24em] text-foreground/70 sm:text-sm">
              {t("Your Review")} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="review"
              value={formData.review}
              onChange={(e) => handleInputChange("review", e.target.value)}
              placeholder={t("Tell us about your experience with this product...")}
              rows={4}
              className="rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_12px_32px_-24px_rgba(56,33,18,0.55)] placeholder:text-foreground/35 focus:border-primary focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>

          {/* Connection Status */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-success' : 'bg-destructive'}`} />
              <span className="text-foreground/60">
                {isConnected ? t("Real-time feedback enabled") : t("Offline mode")}
              </span>
            </div>
            <span className="text-foreground/60">
              {t("Your feedback will appear in customer reviews")}
            </span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="flex h-12 w-full items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_25px_60px_-30px_rgba(200,90,22,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_35px_90px_-32px_rgba(200,90,22,0.9)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting || !isConnected}
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-primary-foreground" />
                {t("Submitting...")}
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {t("Submit Feedback")}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;



