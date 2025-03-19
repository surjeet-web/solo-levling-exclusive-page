"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [isAnnual, setIsAnnual] = useState(true)

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

    // Animate pricing cards
    const cards = gsap.utils.toArray<HTMLElement>(".pricing-card")

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const plans = [
    {
      name: "Free",
      description: "Basic features to get you started",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        { text: "Basic workout tracking", included: true },
        { text: "5 workout plans", included: true },
        { text: "Achievement system", included: true },
        { text: "Community access", included: true },
        { text: "Advanced analytics", included: false },
        { text: "Custom workout plans", included: false },
        { text: "Priority support", included: false },
      ],
      color: "#3B82F6", // Blue
      popular: false,
    },
    {
      name: "Pro",
      description: "Everything you need for serious training",
      monthlyPrice: 9.99,
      annualPrice: 7.99,
      features: [
        { text: "Advanced workout tracking", included: true },
        { text: "Unlimited workout plans", included: true },
        { text: "Full achievement system", included: true },
        { text: "Community access", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Custom workout plans", included: true },
        { text: "Priority support", included: false },
      ],
      color: "#8B5CF6", // Purple
      popular: true,
    },
    {
      name: "Elite",
      description: "For those who want to maximize results",
      monthlyPrice: 19.99,
      annualPrice: 16.99,
      features: [
        { text: "Premium workout tracking", included: true },
        { text: "Unlimited workout plans", included: true },
        { text: "Full achievement system", included: true },
        { text: "VIP community access", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Personalized workout plans", included: true },
        { text: "24/7 priority support", included: true },
      ],
      color: "#EC4899", // Pink
      popular: false,
    },
  ]

  return (
    <section id="pricing" ref={sectionRef} className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
        >
          Choose Your Plan
        </h2>

        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
          Select the perfect plan for your fitness journey. Upgrade or downgrade anytime.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center mb-12">
          <span className={`mr-3 ${!isAnnual ? "text-white" : "text-gray-400"}`}>Monthly</span>
          <button
            className="relative w-14 h-7 bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none"
            onClick={() => setIsAnnual(!isAnnual)}
          >
            <div
              className={`absolute w-5 h-5 bg-white rounded-full transition-transform duration-300 transform ${
                isAnnual ? "translate-x-7" : "translate-x-0"
              }`}
            ></div>
          </button>
          <span className={`ml-3 ${isAnnual ? "text-white" : "text-gray-400"}`}>
            Annual <span className="text-green-400 text-sm">(Save 20%)</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`pricing-card relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border ${
                plan.popular ? "border-purple-500" : "border-gray-700"
              }`}
              style={{ boxShadow: plan.popular ? `0 0 30px ${plan.color}33` : "" }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">${isAnnual ? plan.annualPrice : plan.monthlyPrice}</span>
                  <span className="text-gray-400">/month</span>
                </div>

                <Button
                  className="w-full mb-6"
                  style={{
                    background: plan.color,
                    color: "#ffffff",
                  }}
                >
                  {plan.name === "Free" ? "Get Started" : "Subscribe Now"}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-400 mr-2" />
                      ) : (
                        <X className="h-5 w-5 text-gray-500 mr-2" />
                      )}
                      <span className={feature.included ? "text-gray-300" : "text-gray-500"}>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

