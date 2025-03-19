"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate content
    if (contentRef.current) {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-r from-purple-900 to-blue-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-white opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.3)",
              animation: `float ${3 + Math.random() * 7}s linear infinite`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10" ref={contentRef}>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Level Up Your Fitness?</h2>

        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Join thousands of hunters who are transforming their fitness journey into an epic adventure. Start your quest
          today and unlock your full potential.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-6 rounded-lg text-lg font-bold">
            Start Free Trial
          </Button>

          <Button
            variant="outline"
            className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-lg text-lg font-bold"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}

