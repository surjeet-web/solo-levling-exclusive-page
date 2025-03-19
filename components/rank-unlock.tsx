"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface RankUnlockProps {
  children: ReactNode
  index: number
}

export function RankUnlock({ children, index }: RankUnlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    // Initial state
    gsap.set(overlayRef.current, {
      opacity: 1,
    })

    gsap.set(textRef.current, {
      opacity: 1,
      scale: 1,
    })

    // Animation sequence
    tl.to(textRef.current, {
      opacity: 0,
      scale: 1.5,
      duration: 0.5,
      delay: 0.2 * index,
    }).to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.5,
      },
      "-=0.3",
    )

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill()
      }
      tl.kill()
    }
  }, [index])

  return (
    <div ref={containerRef} className="relative">
      {children}

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-sm rounded-xl z-10 pointer-events-none"
      ></div>

      <div ref={textRef} className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="text-center">
          <div className="text-5xl font-bold text-white mb-2">{["E", "D", "C", "B", "A", "S"][index]}</div>
          <div className="text-blue-300 text-lg">Tap to unlock</div>
        </div>
      </div>
    </div>
  )
}

