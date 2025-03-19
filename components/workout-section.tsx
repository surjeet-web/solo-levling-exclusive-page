"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Dumbbell, Clock, Flame, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WorkoutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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

    // Animate workout cards
    if (cardsRef.current) {
      const cards = gsap.utils.toArray<HTMLElement>(".workout-card")

      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out",
        })
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const workouts = [
    {
      title: "Strength Training",
      description: "Build muscle and increase strength with our comprehensive strength training program.",
      duration: 45,
      calories: 350,
      level: "Intermediate",
      color: "#8B5CF6", // Purple
      icon: <Dumbbell className="h-6 w-6" />,
    },
    {
      title: "HIIT Cardio",
      description: "Burn fat and improve endurance with high-intensity interval training sessions.",
      duration: 30,
      calories: 400,
      level: "Advanced",
      color: "#EC4899", // Pink
      icon: <Flame className="h-6 w-6" />,
    },
    {
      title: "Flexibility & Mobility",
      description: "Enhance your range of motion and prevent injuries with targeted flexibility exercises.",
      duration: 40,
      calories: 200,
      level: "Beginner",
      color: "#3B82F6", // Blue
      icon: <Clock className="h-6 w-6" />,
    },
  ]

  return (
    <section id="workouts" ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-black to-purple-950/20">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
        >
          Personalized Workout Plans
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workouts.map((workout, index) => (
            <div
              key={index}
              className="workout-card bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 transition-transform hover:scale-105 duration-300"
              style={{ boxShadow: `0 0 20px ${workout.color}22` }}
            >
              <div
                className="h-2"
                style={{ background: `linear-gradient(to right, ${workout.color}, ${workout.color}66)` }}
              ></div>

              <div className="p-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${workout.color}33`, color: workout.color }}
                >
                  {workout.icon}
                </div>

                <h3 className="text-xl font-bold mb-2">{workout.title}</h3>
                <p className="text-gray-400 mb-4">{workout.description}</p>

                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="bg-gray-800/50 rounded-full px-3 py-1 text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{workout.duration} min</span>
                  </div>

                  <div className="bg-gray-800/50 rounded-full px-3 py-1 text-sm flex items-center">
                    <Flame className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{workout.calories} cal</span>
                  </div>

                  <div className="bg-gray-800/50 rounded-full px-3 py-1 text-sm">{workout.level}</div>
                </div>

                <Button
                  variant="ghost"
                  className="w-full justify-between border border-gray-700/50 hover:bg-gray-800/50"
                >
                  View Workout
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3">
            Browse All Workouts
          </Button>
        </div>
      </div>
    </section>
  )
}

