"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Zap, Shield, ArrowRight, Check, Play, X, User, LogOut } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "@/lib/auth-context";
import AuthModal from "@/components/AuthModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const demoRef = useRef<HTMLElement>(null);
  const [showRobotMessage, setShowRobotMessage] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') return;

    console.log('useEffect running, window width:', window.innerWidth);

    // Ensure elements are visible first
    gsap.set(".hero-content > *", { opacity: 1, y: 0 });

    // Then animate them in with a slight delay
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(".hero-content > *", 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      }
    );

    // Flying robot animation - complete setup
    const robotElement = document.querySelector(".flying-robot");
    if (robotElement) {
      console.log('Robot element found, setting up animation...');
      
      // Set initial position (off-screen to the right)
      gsap.set(".flying-robot", {
        x: window.innerWidth + 100,
        y: 50,
        rotate: -10,
        opacity: 0,
        scale: 1
      });

      // Create robot animation timeline
      const robotTimeline = gsap.timeline({ delay: 2 });
      
      robotTimeline.to(".flying-robot", {
        x: window.innerWidth - 400,
        y: 100,
        rotate: 5,
        opacity: 1,
        duration: 2.5,
        ease: "power2.out",
        onStart: () => console.log('Robot flying in...'),
        onComplete: () => {
          console.log('Robot landed, showing message...');
          setShowRobotMessage(true);
          
          // Add gentle floating animation
          gsap.to(".flying-robot", {
            y: "+=15",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        }
      });
    } else {
      console.log('Robot element not found!');
    }

    // Improved demo scroll animation with proper spacing
    if (demoRef.current) {
      const demoAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: demoRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.5,
          pin: false,
        },
      });

      demoAnimation.to(".demo-chat", {
        scale: 1.05,
        y: -20,
        duration: 1,
        ease: "power1.inOut",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" as const },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Flying Robot - Moved to top level */}
      <div className="flying-robot fixed top-20 right-4 z-[9999]">
        <div className="relative">
          {/* Actual robot image */}
          <img 
            src="/robot.png" 
            alt="AI Robot" 
            className="w-32 h-32 object-contain drop-shadow-2xl"
            onLoad={() => console.log('Robot image loaded successfully')}
            onError={(e) => {
              console.log('Robot image failed to load, showing fallback');
              e.currentTarget.style.display = 'none';
              if (e.currentTarget.nextElementSibling) {
                (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
              }
            }}
          />
          {/* Fallback if image doesn't load */}
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white shadow-2xl" style={{display: 'none'}}>
            🤖
          </div>
          {showRobotMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              className="absolute -left-80 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-xl max-w-xs"
            >
              <button
                onClick={() => setShowRobotMessage(false)}
                className="absolute -top-2 -right-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="text-sm text-gray-800 space-y-2">
                <div className="font-semibold text-primary">💰 Smart Choice for India</div>
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>₹300/month vs ₹1,750+ elsewhere</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>GPT-5 & DALL-E 3 included</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>Bring your own API key option</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>Privacy-focused design</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  Save ₹15,900 annually with smart pricing!
                </div>
              </div>
              <div className="absolute top-1/2 -right-2 w-0 h-0 border-l-8 border-l-white/95 border-t-4 border-t-transparent border-b-4 border-b-transparent -translate-y-1/2"></div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              <span className="text-lg font-semibold">Daily Assistant</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/refund" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Refund
              </Link>
              
              {loading ? (
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : user ? (
                <div className="flex items-center space-x-3">
                  <Link 
                    href="/app"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <button
                      onClick={signOut}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      title="Sign out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setAuthMode('signin');
                      setShowAuthModal(true);
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthModal(true);
                    }}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Get started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-6 lg:px-8">
        <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mint/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </motion.div>
        
        <div className="max-w-4xl mx-auto text-center hero-content">
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Chat that feels instant.
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the future of AI conversations with lightning-fast responses, beautiful design, and complete privacy.
          </p>

          {/* Subtle Value Proposition */}
          <div className="mb-8 p-4 bg-card/30 backdrop-blur-sm border border-border rounded-lg">
            <p className="text-muted-foreground font-medium text-sm">
              💡 Smart pay-per-use pricing: Premium AI features starting at ₹300/month
            </p>
          </div>

          {/* Clean Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
              <div className="text-2xl font-light text-mint mb-1">₹300</div>
              <div className="text-xs text-muted-foreground">Starting price</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
              <div className="text-2xl font-light text-blue-accent mb-1">GPT-5</div>
              <div className="text-xs text-muted-foreground">Latest AI models</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
              <div className="text-2xl font-light text-foreground mb-1">Private</div>
              <div className="text-xs text-muted-foreground">Your data stays yours</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Link
                href="/app"
                className="group bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary/90 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
              >
                <span>Open Daily Assistant</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setShowAuthModal(true);
                  }}
                  className="group bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary/90 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
                >
                  <span>Get started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signin');
                    setShowAuthModal(true);
                  }}
                  className="group border border-border text-foreground px-8 py-4 rounded-lg font-medium text-lg hover:bg-accent transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Sign in</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </>
            )}
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            ⚡ Start free • No credit card • Cancel anytime
          </div>
        </div>
      </section>

      {/* Value Cards */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Usage Insight - Minimal and Dark */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Pay only for what you use</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Simple, transparent pricing. Choose your usage level and only pay for the AI conversations you need.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border">
                <div className="text-center">
                  <div className="text-3xl font-light text-mint mb-2">₹300</div>
                  <div className="text-sm text-muted-foreground mb-4">Light usage • ~100 prompts/month</div>
                  <div className="text-xs text-muted-foreground">Perfect for most users</div>
                </div>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border">
                <div className="text-center">
                  <div className="text-3xl font-light text-blue-accent mb-2">₹999</div>
                  <div className="text-sm text-muted-foreground mb-4">Medium usage • ~300 prompts/month</div>
                  <div className="text-xs text-muted-foreground">Great for professionals</div>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Same premium AI models • Bring your own API key option
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Instant feel",
                description: "No page reloads, instant responses, seamless navigation between conversations.",
              },
              {
                icon: MessageSquare,
                title: "Beautiful by default",
                description: "Linear-inspired design with carefully crafted animations and typography.",
              },
              {
                icon: Shield,
                title: "Private by design",
                description: "Your conversations stay on your device. No training, no tracking, no compromise.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <feature.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section ref={demoRef} className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold mb-16"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            See it in action
          </motion.h2>
          
          <motion.div 
            className="demo-chat bg-card rounded-2xl border border-border p-8 mx-auto max-w-2xl shadow-xl"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3 max-w-xs">
                  <p className="text-sm">How can I improve my morning routine?</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 max-w-sm">
                  <p className="text-sm">Here are some science-backed tips to optimize your morning routine...</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            How it works
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Ask", description: "Type your question or start a conversation naturally." },
              { step: "02", title: "Stream", description: "Watch responses appear in real-time with smooth animations." },
              { step: "03", title: "Save", description: "Your conversations are automatically saved locally for privacy." },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="text-6xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Privacy & Security</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your conversations stay on your device. We proxy API calls server-side to keep your keys secure, 
              but we never store or train on your data.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                "Client-side storage",
                "No data training",
                "Secure API proxy",
                "Zero tracking",
              ].map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-mint" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Coming Soon
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Multi-LLM switcher",
              "Voice conversations",
              "File uploads",
              "Team spaces",
              "Shareable links",
              "Custom prompts",
            ].map((feature, index) => (
              <motion.div
                key={feature}
                className="p-4 rounded-lg bg-card border border-border opacity-60"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 0.6 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="font-medium">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to start?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience instant AI conversations with beautiful design and complete privacy.
            </p>
            {user ? (
              <Link 
                href="/app"
                className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                <span>Open Daily Assistant</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setShowAuthModal(true);
                }}
                className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                <span>Get started now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <MessageSquare className="w-6 h-6 text-primary" />
              <span className="text-lg font-semibold">Daily Assistant</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/refund" className="hover:text-foreground transition-colors">Refund</Link>
              <span>© 2024 Daily Assistant</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
}
