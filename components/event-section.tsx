"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, Clock, MapPin, Users, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EventSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const eventsRef = useRef<HTMLDivElement>(null)

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

    // Animate events
    if (eventsRef.current) {
      const events = gsap.utils.toArray<HTMLElement>(".event-card")

      events.forEach((event, index) => {
        gsap.from(event, {
          scrollTrigger: {
            trigger: event,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          x: index % 2 === 0 ? -50 : 50,
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

  // Get current date for event dates
  const now = new Date()
  const futureDate1 = new Date(now)
  futureDate1.setDate(now.getDate() + 7)

  const futureDate2 = new Date(now)
  futureDate2.setDate(now.getDate() + 14)

  const futureDate3 = new Date(now)
  futureDate3.setDate(now.getDate() + 21)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const events = [
    {
      title: "Virtual 5K Challenge",
      description:
        "Complete a 5K run anywhere, anytime during the event period. Track your run using the app and submit your results.",
      date: formatDate(futureDate1),
      time: "All Day",
      location: "Virtual",
      participants: 245,
      image: "/placeholder.svg?height=300&width=600",
    },
    {
      title: "30-Day Strength Challenge",
      description:
        "Build strength and muscle with this 30-day progressive challenge. Daily workouts designed to push your limits.",
      date: formatDate(futureDate2),
      time: "Starts at 6:00 AM",
      location: "Virtual",
      participants: 178,
      image: "/placeholder.svg?height=300&width=600",
    },
    {
      title: "City Marathon",
      description:
        "Join us for the annual city marathon! Run through scenic routes and compete with hunters from around the world.",
      date: formatDate(futureDate3),
      time: "8:00 AM - 2:00 PM",
      location: "Central Park, New York",
      participants: 342,
      image: "/placeholder.svg?height=300&width=600",
    },
  ]

  return (
    <section id="events" ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-black to-purple-950/20">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
        >
          Upcoming Events
        </h2>

        <div ref={eventsRef} className="space-y-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="event-card bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium text-white bg-purple-600">
                    Featured
                  </div>
                </div>

                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{event.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{event.date}</span>
                    </div>

                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{event.location}</span>
                    </div>

                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{event.participants} participants</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
                      <span className="text-yellow-400">500 XP</span>
                    </div>

                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Register Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  )
}

