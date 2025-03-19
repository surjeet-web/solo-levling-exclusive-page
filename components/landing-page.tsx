"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "@studio-freight/lenis"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { WorkoutSection } from "@/components/workout-section"
import { AchievementSection } from "@/components/achievement-section"
import { EventSection } from "@/components/event-section"
import { SocialSection } from "@/components/social-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { PricingSection } from "@/components/pricing-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

// Register GSAP plugins on the client side only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Connect GSAP ScrollTrigger to Lenis for synchronized animations
    lenis.on("scroll", ScrollTrigger.update)

    // Set up the scroll container for ScrollTrigger
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value)
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    })

    // Update ScrollTrigger on window resize
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Clean up
    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <WorkoutSection />
      <AchievementSection />
      <EventSection />
      <SocialSection />
      <TestimonialSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  )
}

