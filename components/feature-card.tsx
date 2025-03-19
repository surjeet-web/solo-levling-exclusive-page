"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  image: string
  color: string
  index: number
}

export function FeatureCard({ title, description, icon, image, color, index }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Handle mouse movement for 3D effect
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
        transformOrigin: "center center",
      })

      // Parallax effect for content
      if (contentRef.current && imageRef.current) {
        gsap.to(contentRef.current, {
          x: -rotateY * 0.5,
          y: -rotateX * 0.5,
          duration: 0.5,
          ease: "power2.out",
        })

        gsap.to(imageRef.current, {
          x: rotateY * 1.5,
          y: rotateX * 1.5,
          duration: 0.5,
          ease: "power2.out",
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "power2.out",
      })

      if (contentRef.current && imageRef.current) {
        gsap.to([contentRef.current, imageRef.current], {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        })
      }
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`feature-card relative overflow-hidden rounded-2xl p-1 will-change-transform`}
      style={{
        background: `linear-gradient(to bottom right, ${color}33, ${color}11)`,
        boxShadow: `0 0 30px ${color}22`,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl z-0"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center p-6 md:p-10 gap-8 md:gap-12">
        <div ref={contentRef} className="md:w-1/2 space-y-6">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${color}33`, color: color }}
          >
            {icon}
          </div>

          <h3 className="text-3xl md:text-4xl font-bold">{title}</h3>

          <p className="text-gray-300 text-lg leading-relaxed">{description}</p>

          <Button
            className="px-6 py-3 rounded-lg font-medium mt-4 overflow-hidden relative"
            style={{
              background: color,
              color: "#000000",
            }}
          >
            Explore Feature
            <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </Button>
        </div>

        <div ref={imageRef} className="md:w-1/2 relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden">
          <Image src={image || "/placeholder.svg?height=600&width=800"} alt={title} fill className="object-cover" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: `inset 0 0 30px ${color}55` }}
          ></div>
        </div>
      </div>

      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${color}33 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      ></div>
    </div>
  )
}

