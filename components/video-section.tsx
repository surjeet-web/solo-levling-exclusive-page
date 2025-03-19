"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const videoPlayerRef = useRef<HTMLVideoElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  useEffect(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger)

    // Stats animation
    const statElements = statsRef.current?.querySelectorAll(".stat-item")

    if (statElements) {
      gsap.from(statElements, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      })
    }

    // Video container animation
    if (videoRef.current) {
      gsap.from(videoRef.current, {
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power2.out",
      })
    }

    // Handle video playback with proper promise handling
    let playPromise: Promise<void> | undefined
    let isVideoPlaying = false

    const handleVideoVisibility = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVideoPlaying && videoPlayerRef.current) {
          isVideoPlaying = true

          // Store the play promise
          playPromise = videoPlayerRef.current
            .play()
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              // Handle play errors (like autoplay policy restrictions)
              console.log("Video play error:", error)
              isVideoPlaying = false
            })
        } else if (!entry.isIntersecting && isVideoPlaying && videoPlayerRef.current) {
          // Only pause if the play promise has resolved
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                if (videoPlayerRef.current) {
                  videoPlayerRef.current.pause()
                  setIsPlaying(false)
                  isVideoPlaying = false
                }
              })
              .catch((error) => {
                console.log("Error handling play/pause:", error)
              })
          }
        }
      })
    }

    // Set up the intersection observer
    if (videoPlayerRef.current) {
      const videoObserver = new IntersectionObserver(handleVideoVisibility, { threshold: 0.5 })

      videoObserver.observe(videoPlayerRef.current)

      return () => {
        if (videoPlayerRef.current) {
          videoObserver.unobserve(videoPlayerRef.current)
        }
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Handle video playback
  const togglePlay = () => {
    if (videoPlayerRef.current) {
      if (isPlaying) {
        videoPlayerRef.current.pause()
        setIsPlaying(false)
      } else {
        videoPlayerRef.current
          .play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.log("Error playing video:", error)
          })
      }
    }
  }

  // Handle video mute
  const toggleMute = () => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Update progress bar
  const updateProgress = () => {
    if (videoPlayerRef.current) {
      const progress = (videoPlayerRef.current.currentTime / videoPlayerRef.current.duration) * 100
      setProgress(progress)

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress}%`
      }
    }
  }

  // Seek video
  const seekVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoPlayerRef.current && progressBarRef.current) {
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width

      videoPlayerRef.current.currentTime = pos * videoPlayerRef.current.duration
      updateProgress()
    }
  }

  return (
    <section ref={sectionRef} className="py-20 px-4 md:px-8 bg-black relative overflow-hidden lazy-section">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Experience The Hunt
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Watch how our app transforms your fitness journey into an epic adventure with immersive visuals and gamified
            workouts
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            ref={videoRef}
            style={{ y }}
            className="relative rounded-xl overflow-hidden shadow-[0_0_30px_rgba(124,58,237,0.3)] will-change-transform"
          >
            <div className="aspect-video bg-gradient-to-br from-purple-900 to-blue-900 relative">
              <video
                ref={videoPlayerRef}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                onTimeUpdate={updateProgress}
                poster="/placeholder.svg?height=720&width=1280"
              >
                <source src="/placeholder-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Custom video controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                {/* Progress bar */}
                <div className="h-1 bg-gray-700 rounded-full mb-3 cursor-pointer" onClick={seekVideo}>
                  <div
                    ref={progressBarRef}
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8 rounded-full text-white hover:bg-white/20"
                      onClick={togglePlay}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8 rounded-full text-white hover:bg-white/20"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="text-xs text-white/80">Level 23 Workout</div>
                </div>
              </div>

              {/* Video overlay elements */}
              <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-medium text-white border border-white/10">
                Level 23 Workout
              </div>

              <div className="absolute bottom-16 right-4 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-medium text-white border border-white/10">
                05:32 remaining
              </div>
            </div>
          </motion.div>

          <div ref={statsRef} className="space-y-6">
            <div className="stat-item p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-purple-500/20 transform transition-transform hover:scale-105 duration-300 will-change-transform">
              <h3 className="text-xl font-bold mb-2 text-white">Real-time Stat Tracking</h3>
              <p className="text-gray-300">
                Monitor your strength, endurance, and agility stats as they evolve with each workout
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-sm text-gray-400">Strength</div>
                  <div className="h-2 bg-gray-800 rounded-full mt-1 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-red-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Endurance</div>
                  <div className="h-2 bg-gray-800 rounded-full mt-1 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "50%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="h-full bg-green-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Agility</div>
                  <div className="h-2 bg-gray-800 rounded-full mt-1 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "66%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-full bg-blue-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>

            <div className="stat-item p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-purple-500/20 transform transition-transform hover:scale-105 duration-300 will-change-transform">
              <h3 className="text-xl font-bold mb-2 text-white">XP & Level System</h3>
              <p className="text-gray-300">
                Earn XP for completed workouts and challenges to level up and unlock new abilities
              </p>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-400">Level 23</span>
                  <span className="text-blue-400">7,450 / 10,000 XP</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  ></motion.div>
                </div>
              </div>
            </div>

            <div className="stat-item p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-purple-500/20 transform transition-transform hover:scale-105 duration-300 will-change-transform">
              <h3 className="text-xl font-bold mb-2 text-white">Daily Quests</h3>
              <p className="text-gray-300">Complete daily challenges to earn bonus rewards and special items</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Complete 3 workouts</span>
                  <span className="text-sm text-blue-400">2/3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Burn 300 calories</span>
                  <span className="text-sm text-green-400">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-6 rounded-lg text-lg font-bold shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_rgba(124,58,237,0.8)] transition-all duration-300"
          >
            Join the Hunt
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

