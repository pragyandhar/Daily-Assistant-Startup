"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Star, Zap, Shield, Users, Crown, Eye, Briefcase, Image } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";

export default function PricingPage() {
  const { purchaseBundle } = useStore();

  const bundles = [
    {
      name: "Starter Pack",
      price: "₹300",
      description: "Perfect for getting started with GPT-5",
      icon: Zap,
      features: [
        "100 GPT-5 prompts",
        "Latest AI technology",
        "Fast response times",
        "24/7 availability"
      ],
      cta: "Get Starter Pack",
      popular: false,
      bundleType: "starter" as const,
      prompts: 100,
      images: 0,
      color: "blue"
    },
    {
      name: "Creative Pack",
      price: "₹400",
      description: "GPT-5 conversations plus image generation",
      icon: Star,
      features: [
        "100 GPT-5 prompts",
        "5 Std quality images",
        "Creative AI assistance",
        "Multi-modal capabilities"
      ],
      cta: "Get Creative Pack",
      popular: true,
      bundleType: "creative" as const,
      prompts: 100,
      images: 5,
      color: "purple"
    },
    {
      name: "Pro Pack",
      price: "₹999",
      description: "Maximum value for power users",
      icon: Crown,
      features: [
        "300 GPT-5 prompts",
        "15 Std quality images",
        "Priority support",
        "Extended conversations"
      ],
      cta: "Get Pro Pack",
      popular: false,
      bundleType: "pro" as const,
      prompts: 300,
      images: 15,
      color: "green"
    },
    {
      name: "Vision Pack (HD)",
      price: "₹800",
      description: "High-quality image generation focused",
      icon: Eye,
      features: [
        "100 GPT-5 prompts",
        "10 HD quality images",
        "Superior image quality",
        "Creative projects ready"
      ],
      cta: "Get Vision Pack",
      popular: false,
      bundleType: "vision" as const,
      prompts: 100,
      images: 10,
      color: "indigo"
    },
    {
      name: "Business Pack",
      price: "₹2,499",
      description: "Everything you need for business",
      icon: Briefcase,
      features: [
        "1000 GPT-5 prompts",
        "30 Std quality images",
        "Business-grade support",
        "Team collaboration ready"
      ],
      cta: "Get Business Pack",
      popular: false,
      bundleType: "business" as const,
      prompts: 1000,
      images: 30,
      color: "orange"
    }
  ];

  const handlePurchase = (bundleType: "starter" | "creative" | "pro" | "vision" | "business") => {
    // In the future, this will integrate with Razorpay
    // For now, we'll just add the bundle to the user's account
    purchaseBundle(bundleType);
    alert(`${bundleType.charAt(0).toUpperCase() + bundleType.slice(1)} Pack purchased successfully! Your prompts and images have been added to your account.`);
  };

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground hover:text-foreground transition-colors">Back to home</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/refund" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Refund
              </Link>
              <Link 
                href="/app"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Start chatting
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Your Bundles vs ChatGPT Plus
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get more value with our flexible bundle system. Pay only for what you use.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testing Mode */}
      <section className="pb-12 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <Zap className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold">Testing Mode</h3>
              <p className="text-muted-foreground mt-2">Perfect for trying out the platform</p>
            </div>
            <div className="text-4xl font-bold text-orange-500 mb-4">Limited Access</div>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <Check className="w-4 h-4 text-orange-500" />
                <span>30 GPT-5 Nano prompts</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="w-4 h-4 text-orange-500" />
                <span>2 image generations</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="w-4 h-4 text-orange-500" />
                <span>Cost-efficient testing</span>
              </div>
            </div>
            <Link
              href="/app"
              className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
            >
              Try Testing Mode
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bundle Cards */}
      <section className="pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {bundles.map((bundle, index) => (
              <motion.div
                key={bundle.name}
                className={`relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                  bundle.popular
                    ? "border-primary bg-card shadow-lg shadow-primary/10 scale-105"
                    : "border-border bg-card hover:border-primary/20 hover:shadow-primary/5"
                }`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {bundle.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <bundle.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{bundle.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{bundle.description}</p>
                  <div className="text-3xl font-bold text-primary mb-1">{bundle.price}</div>
                </div>

                <div className="space-y-3 mb-6">
                  {bundle.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-mint mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handlePurchase(bundle.bundleType)}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                    bundle.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105"
                      : "bg-card border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  }`}
                >
                  {bundle.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-center mb-8">Bundle vs Subscription Comparison</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-mint">Our Bundle System</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-mint" />
                    <span className="text-sm">Pay only for what you use</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-mint" />
                    <span className="text-sm">No monthly commitments</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-mint" />
                    <span className="text-sm">Credits never expire</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-mint" />
                    <span className="text-sm">Best value: ₹300-₹2,499</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-muted-foreground">ChatGPT Plus</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-muted-foreground rounded-sm"></div>
                    <span className="text-sm text-muted-foreground">Monthly subscription only</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-muted-foreground rounded-sm"></div>
                    <span className="text-sm text-muted-foreground">Pay even if you don't use</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-muted-foreground rounded-sm"></div>
                    <span className="text-sm text-muted-foreground">Limited usage per month</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-muted-foreground rounded-sm"></div>
                    <span className="text-sm text-muted-foreground">₹1,750+ per month</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Frequently asked questions
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Do my prompts and images expire?",
                answer: "No! Once you purchase a bundle, your prompts and images never expire. Use them at your own pace."
              },
              {
                question: "Can I mix different bundles?",
                answer: "Yes! You can purchase multiple bundles and they will stack together in your account."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major payment methods through Razorpay and Paypal"
              },
              {
                question: "How is this better than ChatGPT Plus?",
                answer: "Unlike ChatGPT Plus at ₹1,750/month, you only pay for what you use. Our bundles typically last 2-3 months for most users, saving you 60-70%."
              },
              {
                question: "What's the difference between Std and HD images?",
                answer: "Standard images are perfect for most use cases, while HD images offer superior quality for professional projects and detailed artwork."
              },
              {
                question: "Can I upgrade my bundle anytime?",
                answer: "Yes! You can purchase additional bundles anytime. Your existing credits remain intact and new ones are added to your account."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="space-y-3"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who trust Daily Assistant for their AI conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/app"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                Get started now
              </Link>
              <Link 
                href="/app"
                className="inline-flex items-center justify-center bg-muted text-foreground px-8 py-4 rounded-lg font-medium text-lg hover:bg-muted/80 border border-border hover:border-primary/20 transition-all duration-300"
              >
                Sign in
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-lg font-semibold">Daily Assistant</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/refund" className="hover:text-foreground transition-colors">Refund</Link>
              <span>© 2024 Daily Assistant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
