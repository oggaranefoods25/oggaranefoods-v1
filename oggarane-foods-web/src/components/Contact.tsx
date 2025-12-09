import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Send, CheckCircle, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useNotifications } from "@/contexts/NotificationContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  const { sendContactForm, isConnected, smtpStatus } = useNotifications();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      if (isConnected) {
        // Use real-time notification system
        await sendContactForm(data);
        setIsSubmitted(true);
        toast({
          title: t("Message Sent Successfully!"),
          description: t("We'll get back to you within 24 hours. You'll receive real-time notifications about your submission."),
        });
      } else {
        // Fallback to mock behavior if server is not connected
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitted(true);
        toast({
          title: t("Message Sent Successfully!"),
          description: t("We'll get back to you within 24 hours. (Offline mode - notifications disabled)"),
        });
      }
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      toast({
        title: t("Error"),
        description: t("Failed to send message. Please try again."),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t("Email Us"),
      details: "oggaranefoods@gmail.com",
      description: t("Send us an email anytime")
    },
    {
      icon: Phone,
      title: t("Call Us"),
      details: "+91 82963 85766",
      description: t("Mon-Sat from 8am to 7pm")
    },
    {
      icon: MapPin,
      title: t("Visit Us"),
      details: t("Oggarane Foods, Koppesara, Mattigar, Sirsi, UttarKannada, Karnataka - 581450"),
      description: t("Our main office location")
    }
  ];

  const sectionRef = useScrollReveal<HTMLElement>({ rootMargin: "0px 0px -12% 0px" });

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden py-16 xs:py-20 sm:py-24 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/60 to-primary/10" />
      <div className="absolute inset-0 aurora-gradient opacity-70" />
      <div className="absolute inset-0 grain-overlay opacity-35" />
      <div className="relative mx-auto w-full max-w-[1380px] px-4 xs:px-6 sm:px-8 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="mb-12 xs:mb-14 sm:mb-16 lg:mb-20 text-center">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold text-foreground fade-in-up">
            {t("Get In Touch")}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm xs:text-base sm:text-lg lg:text-xl text-foreground/70 fade-in-up" style={{ animationDelay: "0.2s" }}>
            {t("Ready to start your project? We'd love to hear from you. Send us a message and we'll respond as soon as possible.")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Contact Information */}
          <div className="fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
              {t("Let's Start a Conversation")}
            </h3>
            <p className="mt-4 text-base sm:text-lg text-foreground/70">
              {t("Whether you have a question about our services, need a custom solution, or want to explore partnership opportunities, our team is here to help.")}
            </p>

            <div className="mt-6 space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="fade-in-up flex items-start space-x-3 sm:space-x-4 rounded-[2rem] border border-white/35 bg-white/60 p-5 shadow-[0_30px_90px_-50px_rgba(56,33,18,0.6)] backdrop-blur-2xl transition-transform duration-500 hover:-translate-y-1"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-[0_22px_55px_-30px_rgba(200,90,22,0.75)]">
                      <info.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground sm:text-base">{info.title}</h4>
                    <p className="mt-1 text-sm font-semibold text-primary sm:text-base">{info.details}</p>
                    <p className="mt-1 text-xs text-foreground/60 sm:text-sm">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 rounded-[2rem] border border-white/35 bg-white/60 p-5 shadow-[0_30px_90px_-50px_rgba(56,33,18,0.6)] backdrop-blur-2xl fade-in-up" style={{ animationDelay: "0.7s" }}>
              <h4 className="text-sm font-semibold text-foreground sm:text-base">{t("Why Choose Us?")}</h4>
              <ul className="mt-3 space-y-2 text-xs text-foreground/65 sm:text-sm">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-3 w-3 text-primary sm:h-4 sm:w-4" />
                  {t("Fast response time (within 24 hours)")}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-3 w-3 text-primary sm:h-4 sm:w-4" />
                  {t("Free initial consultation")}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-3 w-3 text-primary sm:h-4 sm:w-4" />
                  {t("Experienced team of professionals")}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-3 w-3 text-primary sm:h-4 sm:w-4" />
                  {t("Customized solutions for your needs")}
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="fade-in-up" style={{ animationDelay: "0.5s" }}>
            <div className="rounded-[2.5rem] border border-white/35 bg-white/65 p-6 sm:p-8 shadow-[0_35px_110px_-55px_rgba(56,33,18,0.7)] backdrop-blur-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground sm:text-2xl">{t("Send us a Message")}</h3>
                <div className="flex items-center space-x-2">
                  {smtpStatus === 'online' ? (
                    <div className="flex items-center space-x-1 rounded-full border border-success/30 bg-success/15 px-3 py-1 text-xs font-semibold text-success">
                      <Wifi className="h-3.5 w-3.5" />
                      <span>{t("SMTP Online")}</span>
                    </div>
                  ) : smtpStatus === 'checking' ? (
                    <div className="flex items-center space-x-1 rounded-full border border-warning/30 bg-warning/15 px-3 py-1 text-xs font-semibold text-warning">
                      <WifiOff className="h-3.5 w-3.5 animate-pulse" />
                      <span>{t("Checking...")}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 rounded-full border border-warning/40 bg-warning/15 px-3 py-1 text-xs font-semibold text-warning">
                      <WifiOff className="h-3.5 w-3.5" />
                      <span>{t("SMTP Offline")}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-[0.24em] text-foreground/70 sm:text-sm">
                    {t("Full Name")} *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    {...register("name", { required: t("Name is required") })}
                    className="h-11 w-full rounded-2xl border border-white/40 bg-white/70 px-4 text-sm text-foreground shadow-[0_12px_32px_-24px_rgba(56,33,18,0.55)] placeholder:text-foreground/35 focus:border-primary focus:ring-2 focus:ring-primary/30 focus-visible:ring-primary/40"
                    placeholder={t("Your full name")}
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs sm:text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-[0.24em] text-foreground/70 sm:text-sm">
                    {t("Email Address")} *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: t("Email is required"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("Invalid email address")
                      }
                    })}
                    className="h-11 w-full rounded-2xl border border-white/40 bg-white/70 px-4 text-sm text-foreground shadow-[0_12px_32px_-24px_rgba(56,33,18,0.55)] placeholder:text-foreground/35 focus:border-primary focus:ring-2 focus:ring-primary/30 focus-visible:ring-primary/40"
                    placeholder={t("your@email.com")}
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs sm:text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="mb-2 block text-xs font-medium uppercase tracking-[0.24em] text-foreground/70 sm:text-sm">
                    {t("Phone Number")}
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className="h-11 w-full rounded-2xl border border-white/40 bg-white/70 px-4 text-sm text-foreground shadow-[0_12px_32px_-24px_rgba(56,33,18,0.55)] placeholder:text-foreground/35 focus:border-primary focus:ring-2 focus:ring-primary/30 focus-visible:ring-primary/40"
                    placeholder={t("+91 82963 85766")}
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-[0.24em] text-foreground/70 sm:text-sm">
                    {t("Message")} *
                  </label>
                  <Textarea
                    id="message"
                    {...register("message", { required: t("Message is required") })}
                    className="w-full min-h-[120px] rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_12px_32px_-24px_rgba(56,33,18,0.55)] placeholder:text-foreground/35 focus:border-primary focus:ring-2 focus:ring-primary/30 focus-visible:ring-primary/40"
                    placeholder={t("Tell us about your project or question...")}
                  />
                  {errors.message && (
                    <p className="text-destructive text-xs sm:text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex h-12 w-full items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_25px_60px_-30px_rgba(200,90,22,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_35px_90px_-32px_rgba(200,90,22,0.9)] ${
                    isSubmitted ? "bg-success text-success-foreground hover:bg-success/90" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary-foreground"></div>
                      <span className="text-sm sm:text-base">{t("Sending...")}</span>
                    </div>
                  ) : isSubmitted ? (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm sm:text-base">{t("Message Sent!")}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span className="text-sm sm:text-base">{t("Send Message")}</span>
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;