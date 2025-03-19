"use client"

import { useEffect, useRef, useState } from "react"

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Use state to store particles to ensure consistent rendering
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || isInitialized) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number

      constructor(x: number, y: number, size: number, speedX: number, speedY: number, color: string, alpha: number) {
        this.x = x
        this.y = y
        this.size = size
        this.speedX = speedX
        this.speedY = speedY
        this.color = color
        this.alpha = alpha
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.alpha
        ctx.fill()
      }
    }

    // Create particles with deterministic positions for initial render
    const particles: Particle[] = []
    const particleCount = Math.min(100, window.innerWidth / 20)
    const colors = ["#8B5CF6", "#6366F1", "#3B82F6", "#7C3AED"]

    // Use a seeded approach for consistent particles
    for (let i = 0; i < particleCount; i++) {
      const index = i % colors.length
      const x = (canvas.width / particleCount) * i
      const y = (canvas.height / particleCount) * i
      const size = 2 + (i % 3)
      const speedX = 0.2 * (i % 3 === 0 ? 1 : -1)
      const speedY = 0.1 * (i % 2 === 0 ? 1 : -1)
      const alpha = 0.3 + (i % 10) / 20

      particles.push(new Particle(x, y, size, speedX, speedY, colors[index], alpha))
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }

      requestAnimationFrame(animate)
    }

    setIsInitialized(true)
    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [isInitialized])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}

