"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

export function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Fitness Enthusiast",
      content:
        "Solo Leveling Fitness has completely transformed my workout routine. The gamification aspect keeps me motivated, and I've seen incredible results in just 3 months!",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Marathon Runner",
      content:
        "I love how the app tracks my progress and rewards me with achievements. The community features have connected me with like-minded fitness enthusiasts who push me to be better.",
      rating: 5,
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Strength Trainer",
      content:
        "The workout plans are incredibly well-designed and adapt to my progress. I've gained more muscle in 6 months than I did in 2 years of traditional training.",
      rating: 4,
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-black to-purple-950/20">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
        >
          What Our Users Say
        </h2>

        <div className="relative">
          {/* Testimonial Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-8 md:p-10"
                  >
                    <div className="flex flex-col md:flex-row md:items-center mb-6">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mb-4 md:mb-0 md:mr-4"
                      />

                      <div>
                        <h3 className="text-xl font-bold">{testimonial.name}</h3>
                        <p className="text-gray-400">{testimonial.role}</p>

                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <blockquote className="text-lg text-gray-300 italic">"{testimonial.content}"</blockquote>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transform -translate-x-1/2 md:translate-x-0"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transform translate-x-1/2 md:translate-x-0"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-purple-500" : "bg-gray-600"}`}
                onClick={() => setActiveIndex(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

