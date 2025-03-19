"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface GateAnimationProps {
  onComplete?: () => void
}

export function GateAnimation({ onComplete }: GateAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftGateRef = useRef<HTMLDivElement>(null)
  const rightGateRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) {
          onComplete()
        }
      },
    })

    // Initial state
    gsap.set([leftGateRef.current, rightGateRef.current], {
      scaleY: 1,
      opacity: 0,
    })

    gsap.set(textRef.current, {
      opacity: 0,
      scale: 0.8,
    })

    // Animation sequence
    tl.to([leftGateRef.current, rightGateRef.current], {
      opacity: 1,
      duration: 0.5,
    })
      .to(textRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
      .to(textRef.current, {
        opacity: 0,
        scale: 1.2,
        duration: 0.5,
        delay: 0.5,
      })
      .to([leftGateRef.current, rightGateRef.current], {
        scaleX: 0,
        transformOrigin: (i) => (i === 0 ? "left center" : "right center"),
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.1,
      })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div
        ref={leftGateRef}
        className="absolute left-0 w-1/2 h-full bg-gradient-to-r from-black to-purple-950 z-20"
      ></div>
      <div
        ref={rightGateRef}
        className="absolute right-0 w-1/2 h-full bg-gradient-to-l from-black to-purple-950 z-20"
      ></div>

      <div ref={textRef} className="relative z-30 text-center">
        <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
          SOLO FITNESS
        </div>
        <div className="text-xl md:text-2xl text-blue-300">A gate has appeared...</div>
      </div>

      {/* Particles in background */}
      <div className="absolute inset-0 z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-blue-500 opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: "0 0 10px 2px rgba(59, 130, 246, 0.7)",
              animation: `float ${3 + Math.random() * 7}s linear infinite`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

