import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Zap,
  Palette,
  BarChart3,
  Shield,
  Smartphone,
  Users,
  Star,
  CheckCircle,
  Play,
  Sparkles,
  MousePointer,
  Eye,
  TrendingUp,
  Globe,
  Lock,
  Rocket,
  Brain,
  Heart,
  Award,
  Target,
  Layers,
  Code,
  Database,
  Wifi,
  Webhook,
  FileSpreadsheet,
  MessageSquare,
  Mail,
  Send,
  Link,
} from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const LandingPage = () => {
  const features = [
    {
      icon: Webhook,
      title: "Powerful Webhooks",
      description:
        "Connect with any web application and service. Create custom workflows that trigger instantly when forms are submitted.",
      gradient: "from-purple-500 via-pink-500 to-red-500",
    },
    {
      icon: FileSpreadsheet,
      title: "Google Sheets Export",
      description:
        "Export form submissions directly to Google Sheets. Create organized spreadsheets of your data automatically.",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
    },
    {
      icon: MessageSquare,
      title: "Slack & Discord Alerts",
      description:
        "Get instant notifications in your team channels. Never miss a form submission with real-time alerts.",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
    },
    {
      icon: Mail,
      title: "Email Notifications",
      description:
        "Send custom email notifications via SMTP or API. Thank users instantly or notify your team of new submissions.",
      gradient: "from-orange-500 via-red-500 to-pink-500",
    },
  ];

  const testimonials = [
    {
      rating: 5,
      text: "FormWave's webhook integration saved us hours of manual work. Our entire workflow is now automated!",
      author: "Sarah Chen",
      role: "Operations Manager",
      avatar: "💼",
    },
    {
      rating: 5,
      text: "The Google Sheets export is a game-changer. All our form data flows directly into our reporting dashboards.",
      author: "Marcus Johnson",
      role: "Data Analyst",
      avatar: "📊",
    },
    {
      rating: 5,
      text: "Instant Slack notifications keep our support team responsive. We reply to inquiries within minutes now.",
      author: "Elena Rodriguez",
      role: "Customer Success",
      avatar: "⚡",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Mouse Follower */}
      <div className="fixed w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 opacity-30 mix-blend-screen transition-all duration-100 ease-out" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-700 rounded-xl blur-lg opacity-50"></div>
              </div>
              <span className="text-xl sm:text-2xl font-black text-foreground">
                FormWave
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                About
              </a>
              <SignedOut>
                <SignInButton>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground border border-border hover:border-primary/50 transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Started Free
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 px-4 sm:px-6 relative">
        <div className="container mx-auto text-center relative z-10 max-w-6xl">
          <Badge
            variant="secondary"
            className="mb-6 sm:mb-8 bg-primary/10 text-primary border border-primary/20 backdrop-blur-xl hover:scale-105 transition-all duration-300 text-sm sm:text-base"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            🚀 Simple Forms, Powerful Integrations
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 leading-tight">
            <span className="block text-foreground animate-fade-in">
              Forms That Actually
            </span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-fade-in delay-300">
              Work For You
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-500">
            Create beautiful forms in minutes and connect them to your favorite
            tools.
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold">
              {" "}
              Webhooks, Google Sheets, team notifications
            </span>{" "}
            - all built-in and ready to use.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 lg:mb-20 animate-fade-in delay-700">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Rocket className="mr-3 w-5 h-5 sm:w-6 sm:h-6" />
              Start Building Forms
              <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 border-2 border-border hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 backdrop-blur-xl"
            >
              <Play className="mr-3 w-5 h-5 sm:w-6 sm:h-6" />
              See How It Works
            </Button>
          </div>

          {/* Interactive Demo Preview */}
          <div className="relative max-w-6xl mx-auto animate-fade-in delay-1000">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl sm:rounded-3xl blur-3xl"></div>
            <div className="relative bg-card/60 backdrop-blur-2xl border border-border/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 hover:border-primary/30 transition-all duration-500 group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-muted-foreground ml-4">
                      FormWave Builder
                    </span>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="h-4 sm:h-6 bg-gradient-to-r from-purple-400/60 to-pink-400/60 rounded-full w-2/3 animate-pulse"></div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-foreground">
                        Contact Form
                      </label>
                      <div className="h-10 sm:h-12 bg-input/80 border border-border rounded-xl flex items-center px-3 group-hover:border-primary/50 transition-all duration-300">
                        <span className="text-muted-foreground text-sm">
                          Enter your name...
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-foreground">
                        Email
                      </label>
                      <div className="h-10 sm:h-12 bg-input/80 border border-border rounded-xl flex items-center px-3 group-hover:border-primary/50 transition-all duration-300">
                        <span className="text-muted-foreground text-sm">
                          your@email.com
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-foreground">
                        Message
                      </label>
                      <div className="h-20 sm:h-24 bg-input/80 border border-border rounded-xl p-3 group-hover:border-primary/50 transition-all duration-300">
                        <span className="text-muted-foreground text-sm">
                          Tell us about your project...
                        </span>
                      </div>
                    </div>

                    <div className="h-10 sm:h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 cursor-pointer">
                      <span className="text-white font-semibold text-sm sm:text-base">
                        Submit Form
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <Webhook className="w-6 h-6 text-green-400" />
                      <span className="text-sm text-green-300">
                        Webhook sent to Zapier
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                      <FileSpreadsheet className="w-6 h-6 text-blue-400" />
                      <span className="text-sm text-blue-300">
                        Data saved to Google Sheets
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                      <MessageSquare className="w-6 h-6 text-purple-400" />
                      <span className="text-sm text-purple-300">
                        Team notified on Slack
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                      <Mail className="w-6 h-6 text-orange-400" />
                      <span className="text-sm text-orange-300">
                        Thank you email sent
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
      >
        <div className="container mx-auto relative z-10 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
              <span className="text-foreground">Powerful Integrations</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect your forms to the tools you already use. No complex setup,
              no coding required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative bg-card/60 backdrop-blur-xl border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-all duration-500`}
                ></div>
                <CardContent className="p-6 sm:p-8 relative z-10">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-all duration-500 shadow-xl`}
                  >
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-all duration-300 text-sm sm:text-base">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: "50K+", label: "Forms Created", icon: Layers },
              {
                value: "2M+",
                label: "Submissions Processed",
                icon: TrendingUp,
              },
              { value: "99.9%", label: "Uptime", icon: Wifi },
              { value: "24/7", label: "Support", icon: Heart },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="relative bg-card/60 backdrop-blur-xl border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-primary/30 transition-all duration-500 hover:scale-105">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mx-auto mb-3 sm:mb-4 group-hover:text-pink-400 transition-all duration-300" />
                  <div className="text-3xl sm:text-4xl font-black text-foreground mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground group-hover:text-foreground/90 transition-all duration-300 text-sm sm:text-base">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
              <span className="text-foreground">Trusted by Teams</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Everywhere
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="group bg-card/60 backdrop-blur-xl border border-border hover:border-primary/30 transition-all duration-500 hover:scale-105"
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex justify-center mb-4 sm:mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 sm:mb-6 text-base sm:text-lg italic group-hover:text-foreground/90 transition-all duration-300">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl sm:text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm sm:text-base">
                        {testimonial.author}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl sm:rounded-3xl blur-3xl"></div>
            <div className="relative bg-card/80 backdrop-blur-2xl border border-border/50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8">
                <span className="text-foreground">Ready to Connect</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Your Forms?
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
                Join thousands of teams who've streamlined their workflows with
                FormWave's powerful integrations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Rocket className="mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                  Start Building Now
                  <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 border-2 border-border hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
                >
                  <Users className="mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                  View Examples
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-6 sm:mt-8">
                ✨ Free forever plan • 🚀 No setup fees • 💎 Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 sm:py-16 px-4 sm:px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-12">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-600 rounded-xl blur-lg opacity-50"></div>
              </div>
              <span className="text-xl sm:text-2xl font-black text-foreground">
                FormWave
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-muted-foreground">
              <a
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                Support
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                API
              </a>
            </div>
          </div>
          <div className="border-t border-border/50 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
            <p>&copy; 2024 FormWave. Simple forms, powerful connections.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
