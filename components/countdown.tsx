"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CountdownProps {
  targetDate: Date
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <div className="flex justify-center gap-4 md:gap-6">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex flex-col items-center">
          <motion.div
            key={`${unit.label}-${unit.value}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-b from-purple-900 to-blue-900 rounded-lg p-3 md:p-4 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center shadow-[0_0_10px_rgba(124,58,237,0.3)] border border-purple-700/30"
          >
            <span className="text-2xl md:text-4xl font-bold text-white">{unit.value.toString().padStart(2, "0")}</span>
          </motion.div>
          <span className="text-xs md:text-sm mt-2 text-gray-400">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}

