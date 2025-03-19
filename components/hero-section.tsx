"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/particle-background"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !subtitleRef.current || !scrollIndicatorRef.current) return

    const tl = gsap.timeline()

    // Initial animation
    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .from(
        buttonRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.7",
      )
      .from(
        scrollIndicatorRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3",
      )

    // Parallax effect on scroll
    gsap.to(containerRef.current, {
      backgroundPosition: "50% 30%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })

    return () => {
      tl.kill()
    }
  }, [])

  const handleScrollDown = () => {
    const featuresSection = document.getElementById("features")
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #000000, #0f0f1a)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ParticleBackground />

      <div className="text-center z-10 max-w-4xl">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
        >
          Level Up Your Fitness Journey
        </h1>

        <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-300 mb-8">
          Transform your workouts into epic quests with our gamified fitness experience
        </p>

        <div ref={buttonRef} className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={handleScrollDown}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-lg text-lg font-bold shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_rgba(124,58,237,0.8)] transition-all duration-300"
          >
            Start Your Journey
          </Button>

          <Button
            variant="outline"
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-8 py-6 rounded-lg text-lg font-bold"
          >
            Watch Demo
          </Button>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 flex flex-col items-center cursor-pointer"
        onClick={handleScrollDown}
      >
        <p className="text-blue-400 mb-2">Scroll to explore</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <ArrowDown className="text-blue-400 h-6 w-6" />
        </motion.div>
      </div>
    </section>
  )
}

