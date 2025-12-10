import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Heart, Award, Users, MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/contexts/NotificationContext";
import FeedbackForm from "./FeedbackForm";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  date: string;
  avatar: string;
  verified: boolean;
  product: string;
}


const CustomerReviews = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isConnected } = useNotifications();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);

  const staticReviews: Review[] = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Bangalore, Karnataka",
      rating: 5,
      review: "Absolutely amazing spices! The sambar powder has transformed my cooking. The authentic taste reminds me of my grandmother's recipes. Highly recommended for anyone who loves traditional South Indian cuisine.",
      date: "2 days ago",
      avatar: "PS",
      verified: true,
      product: "Sambar Powder"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Mumbai, Maharashtra",
      rating: 5,
      review: "Best spice blends I've ever used! The rasam powder is perfect - not too spicy, just the right balance of flavors. My family loves the authentic taste. Will definitely order again!",
      date: "1 week ago",
      avatar: "RK",
      verified: true,
      product: "Rasam Powder"
    },
    {
      id: 3,
      name: "Anita Reddy",
      location: "Hyderabad, Telangana",
      rating: 5,
      review: "Exceptional quality spices! The pulao powder makes my biryani taste like it's from a royal kitchen. The packaging is beautiful and the spices are so fresh. Thank you for preserving our culinary heritage!",
      date: "3 days ago",
      avatar: "AR",
      verified: true,
      product: "Pulao Powder"
    },
    {
      id: 4,
      name: "Suresh Patel",
      location: "Ahmedabad, Gujarat",
      rating: 5,
      review: "Outstanding spices! The garam masala is aromatic and adds incredible depth to my dishes. The quality is restaurant-grade and the prices are very reasonable. Highly satisfied customer!",
      date: "5 days ago",
      avatar: "SP",
      verified: true,
      product: "Garam Masala"
    },
    {
      id: 5,
      name: "Meera Singh",
      location: "Delhi, NCR",
      rating: 5,
      review: "Fantastic spice blends! The sambar powder is exactly what I was looking for - authentic, flavorful, and consistent quality. My children love the taste. This is now our go-to brand for spices.",
      date: "1 week ago",
      avatar: "MS",
      verified: true,
      product: "Sambar Powder"
    },
    {
      id: 6,
      name: "Vikram Joshi",
      location: "Pune, Maharashtra",
      rating: 5,
      review: "Premium quality spices! The rasam powder is perfect for my daily cooking. The blend is well-balanced and the aroma is incredible. Great customer service and fast delivery. Highly recommended!",
      date: "4 days ago",
      avatar: "VJ",
      verified: true,
      product: "Rasam Powder"
    }
  ];

  // Combine static reviews with recent reviews
  const allReviews = [...recentReviews, ...staticReviews];

  // Real-time review updates removed - using static reviews for now
  // Can be enhanced later with API polling if needed
  // useEffect removed since we're not using Socket.IO anymore

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % allReviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + allReviews.length) % allReviews.length);
  };

  const renderStars = (rating: number) => {
    const rounded = Math.round(rating);
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rounded
            ? "fill-accent text-accent"
            : "text-foreground/20"
        }`}
      />
    ));
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-purple-600",
      "bg-gradient-to-br from-green-500 to-teal-600",
      "bg-gradient-to-br from-orange-500 to-red-600",
      "bg-gradient-to-br from-pink-500 to-rose-600",
      "bg-gradient-to-br from-indigo-500 to-blue-600",
      "bg-gradient-to-br from-emerald-500 to-green-600"
    ];
    return colors[name.length % colors.length];
  };

  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Customers" },
    { icon: Star, value: "4.9/5", label: "Average Rating" },
    { icon: Award, value: "25+", label: "Years Experience" },
    { icon: Heart, value: "98%", label: "Customer Satisfaction" }
  ];

  const sectionRef = useScrollReveal<HTMLElement>({ rootMargin: "0px 0px -10% 0px" });

  return (
    <section id="reviews" ref={sectionRef} className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/60 to-primary/10" />
      <div className="absolute inset-0 aurora-gradient opacity-70" />
      <div className="absolute inset-0 grain-overlay opacity-35" />

      <div className="relative mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <div className="mx-auto inline-flex items-center space-x-2 rounded-full border border-primary/25 bg-primary/10 px-5 py-2 shadow-[0_18px_45px_-28px_rgba(200,90,22,0.6)] fade-in-up">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">{t("Customer Reviews")}</span>
          </div>
          
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground fade-in-up" style={{ animationDelay: "0.2s" }}>
            {t("What Our Customers Say")}
          </h2>
          
          <p className="mx-auto mt-4 max-w-3xl text-base sm:text-lg text-foreground/70 fade-in-up" style={{ animationDelay: "0.4s" }}>
            {t("Discover why thousands of families trust Oggarane Foods for their authentic spice needs. Read genuine reviews from our satisfied customers.")}
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="fade-in-up group rounded-[2rem] border border-white/35 bg-white/60 p-5 text-center shadow-[0_30px_90px_-50px_rgba(56,33,18,0.6)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_120px_-55px_rgba(56,33,18,0.72)]"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-[0_22px_55px_-30px_rgba(200,90,22,0.75)] transition-transform duration-300 group-hover:scale-110">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-semibold text-foreground">{stat.value}</div>
              <div className="mt-2 text-sm sm:text-base text-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feedback Form Toggle */}
        <div className="mb-10 text-center">
          <Button
            onClick={() => setShowFeedbackForm(!showFeedbackForm)}
            variant="outline"
            className="rounded-full border border-primary/35 bg-white/60 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-xl transition-all duration-300 hover:bg-primary/15 hover:text-primary shadow-[0_22px_55px_-30px_rgba(56,33,18,0.55)]"
            disabled={!isConnected}
          >
            <Plus className="mr-2 h-4 w-4" />
            {showFeedbackForm ? t("Hide Feedback Form") : t("Share Your Experience")}
          </Button>
          {!isConnected && (
            <p className="mt-2 text-sm text-foreground/60">
              {t("Connect to share your feedback in real-time")}
            </p>
          )}
        </div>

        {/* Feedback Form */}
        {showFeedbackForm && (
          <div className="mb-12 fade-in-up">
            <FeedbackForm />
          </div>
        )}

        {/* Reviews Grid */}
        <div className="mb-14 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allReviews.map((review, index) => (
            <Card
              key={review.id}
              className="group relative overflow-hidden rounded-[2.25rem] border border-white/35 bg-white/65 shadow-[0_35px_110px_-55px_rgba(56,33,18,0.7)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_45px_130px_-60px_rgba(56,33,18,0.75)] fade-in-up"
              style={{ animationDelay: `${0.8 + index * 0.1}s` }}
            >
              <CardContent className="p-6 sm:p-8">
                {/* Quote Icon */}
                <div className="mb-4 flex items-start justify-between">
                  <Quote className="h-8 w-8 text-primary/30 transition-colors duration-300 group-hover:text-primary/50" />
                  <Badge variant="secondary" className="border-0 bg-success/15 px-3 py-1 text-xs font-semibold text-success">
                    {t("Verified")}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-sm text-foreground/60">({review.rating.toFixed(1)})</span>
                </div>

                {/* Review Text */}
                <p className="mb-6 text-sm sm:text-base leading-relaxed text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
                  "{review.review}"
                </p>

                {/* Product Badge */}
                <div className="mb-4">
                  <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {review.product}
                  </Badge>
                </div>

                {/* Customer Info */}
                <div className="flex items-center space-x-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-primary-foreground sm:h-12 sm:w-12 sm:text-base ${getAvatarColor(review.name)}`}>
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-foreground sm:text-base">{review.name}</div>
                    <div className="text-xs text-foreground/60 sm:text-sm">{review.location}</div>
                    <div className="text-xs text-foreground/50">{review.date}</div>
                  </div>
                </div>
              </CardContent>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Card>
          ))}
        </div>

        {/* Featured Review Carousel */}
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-[3rem] border border-white/40 bg-white/65 p-10 sm:p-12 shadow-[0_40px_130px_-60px_rgba(56,33,18,0.75)] backdrop-blur-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-15">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-transparent" />
            </div>
            
            <div className="relative z-10">
              <div className="mb-8 text-center">
                <Quote className="mx-auto mb-4 h-12 w-12 text-primary/30" />
                <div className="mb-4 flex items-center justify-center space-x-1">
                  {renderStars(allReviews[currentIndex].rating)}
                </div>
              </div>

              <blockquote className="mx-auto mb-8 max-w-3xl text-center text-lg sm:text-xl lg:text-2xl leading-relaxed text-foreground/70">
                "{allReviews[currentIndex].review}"
              </blockquote>

              <div className="text-center">
                <div className="mb-4 flex items-center justify-center space-x-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-primary-foreground ${getAvatarColor(allReviews[currentIndex].name)}`}>
                    {allReviews[currentIndex].avatar}
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-semibold text-foreground">{allReviews[currentIndex].name}</div>
                    <div className="text-sm text-foreground/60">{allReviews[currentIndex].location}</div>
                    <Badge variant="secondary" className="mt-1 border-0 bg-success/15 px-3 py-1 text-xs font-semibold text-success">
                      {allReviews[currentIndex].product}
                    </Badge>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center space-x-4 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevReview}
                    className="h-10 w-10 rounded-full border border-primary/35 bg-white/60 text-primary shadow-[0_18px_45px_-30px_rgba(56,33,18,0.5)] transition-all duration-300 hover:bg-primary/15"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex space-x-2">
                    {allReviews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? "w-8 bg-primary"
                            : "w-2 bg-primary/30 hover:bg-primary/50"
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextReview}
                    className="h-10 w-10 rounded-full border border-primary/35 bg-white/60 text-primary shadow-[0_18px_45px_-30px_rgba(56,33,18,0.5)] transition-all duration-300 hover:bg-primary/15"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center sm:mt-20">
          <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-white/35 bg-white/60 p-8 sm:p-10 shadow-[0_30px_100px_-55px_rgba(56,33,18,0.7)] backdrop-blur-2xl">
            <h3 className="text-2xl font-semibold text-foreground">
              {t("Join Our Happy Customers")}
            </h3>
            <p className="mt-4 text-base text-foreground/70">
              {t("Experience the authentic taste of traditional spices. Order now and taste the difference!")}
            </p>
            <Button
              size="lg"
              className="mt-6 rounded-full bg-gradient-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_25px_60px_-30px_rgba(200,90,22,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_35px_90px_-32px_rgba(200,90,22,0.9)]"
              onClick={() => navigate('/contact')}
            >
              {t("Order Now")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
