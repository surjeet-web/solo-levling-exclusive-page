"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Award, Trophy, Medal, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AchievementSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)

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

    // Animate achievements
    if (achievementsRef.current) {
      const achievements = gsap.utils.toArray<HTMLElement>(".achievement-item")

      achievements.forEach((achievement, index) => {
        gsap.from(achievement, {
          scrollTrigger: {
            trigger: achievement,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.15,
          ease: "back.out(1.7)",
        })
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const achievements = [
    {
      title: "First Steps",
      description: "Complete your first workout",
      icon: <Medal className="h-6 w-6" />,
      color: "#3B82F6", // Blue
      rarity: "Common",
      xp: 100,
    },
    {
      title: "Consistency King",
      description: "Complete workouts for 7 consecutive days",
      icon: <Zap className="h-6 w-6" />,
      color: "#8B5CF6", // Purple
      rarity: "Uncommon",
      xp: 250,
    },
    {
      title: "Strength Master",
      description: "Lift a total of 10,000kg in a single week",
      icon: <Trophy className="h-6 w-6" />,
      color: "#EC4899", // Pink
      rarity: "Rare",
      xp: 500,
    },
    {
      title: "Marathon Runner",
      description: "Run a total of 42.2km",
      icon: <Award className="h-6 w-6" />,
      color: "#F59E0B", // Amber
      rarity: "Epic",
      xp: 750,
    },
    {
      title: "Legendary Streak",
      description: "Complete workouts for 30 consecutive days",
      icon: <Star className="h-6 w-6" />,
      color: "#EF4444", // Red
      rarity: "Legendary",
      xp: 1000,
    },
  ]

  return (
    <section id="achievements" ref={sectionRef} className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
        >
          Achievement System
        </h2>

        <div className="text-center mb-12">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track your progress and earn badges as you advance in your fitness journey. Unlock achievements, gain XP,
            and level up your character.
          </p>
        </div>

        <div ref={achievementsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="achievement-item bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 transition-all duration-300"
              style={{ boxShadow: `0 0 20px ${achievement.color}22` }}
            >
              <div className="h-2" style={{ background: achievement.color }}></div>

              <div className="p-6 flex flex-col items-center text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: `${achievement.color}33`, color: achievement.color }}
                >
                  {achievement.icon}
                </div>

                <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>

                <div className="mt-auto space-y-2 w-full">
                  <div
                    className="text-xs font-medium py-1 px-2 rounded-full mx-auto w-fit"
                    style={{ background: `${achievement.color}33`, color: achievement.color }}
                  >
                    {achievement.rarity}
                  </div>

                  <div className="flex items-center justify-center text-yellow-400">
                    <Zap className="h-4 w-4 mr-1" />
                    <span>{achievement.xp} XP</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3">
            View All Achievements
          </Button>
        </div>
      </div>
    </section>
  )
}

