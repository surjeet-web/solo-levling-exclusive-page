"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FeatureCard } from "@/components/feature-card"
import { featureData } from "@/data/feature-data"

export function FeatureSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // Animate section title
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
    }

    // Animate cards on scroll
    if (!cardsRef.current) return

    const cards = gsap.utils.toArray<HTMLElement>(".feature-card")

    cards.forEach((card, index) => {
      gsap.set(card, {
        opacity: 0,
        rotationX: 15,
        rotationY: -25,
        rotationZ: 5,
        y: 100,
        scale: 0.8,
        transformOrigin: "center center",
        transformPerspective: 1000,
      })

      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
        opacity: 1,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
      })
    })

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="features" ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
        >
          Discover Key Features
        </h2>

        <div ref={cardsRef} className="space-y-40 md:space-y-60 py-10">
          {featureData.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              image={feature.image}
              color={feature.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

