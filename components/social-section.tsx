"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Heart, MessageSquare, Share, User, Users, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SocialSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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

    // Animate content
    if (contentRef.current) {
      const elements = gsap.utils.toArray<HTMLElement>(contentRef.current.children)

      elements.forEach((element, index) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 30,
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

  const posts = [
    {
      id: 1,
      user: {
        name: "ShadowMonarch",
        avatar: "/placeholder.svg?height=100&width=100",
        rank: "S",
      },
      content: "Just completed an intense strength training session. Feeling stronger every day! 💪",
      likes: 24,
      comments: 5,
      time: "30 minutes ago",
    },
    {
      id: 2,
      user: {
        name: "IronWill",
        avatar: "/placeholder.svg?height=100&width=100",
        rank: "A",
      },
      content:
        "Just unlocked the 'Marathon Runner' achievement! 🏃‍♂️ It took me 3 months of consistent training, but I finally did it!",
      likes: 42,
      comments: 8,
      time: "2 hours ago",
    },
  ]

  const groups = [
    {
      id: 1,
      name: "Shadow Hunters Elite",
      avatar: "/placeholder.svg?height=100&width=100",
      memberCount: 128,
      description:
        "A guild for the top 1% of hunters. Share strategies, workout plans, and compete in exclusive events.",
      isJoined: true,
    },
    {
      id: 2,
      name: "Strength Masters",
      avatar: "/placeholder.svg?height=100&width=100",
      memberCount: 256,
      description:
        "Focused on strength training and powerlifting. Perfect for those looking to increase their raw power.",
      isJoined: false,
    },
  ]

  return (
    <section id="community" ref={sectionRef} className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
        >
          Join Our Community
        </h2>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activity Feed */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Activity Feed</h3>

            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-4"
              >
                {/* Post Header */}
                <div className="flex items-center mb-3">
                  <img
                    src={post.user.avatar || "/placeholder.svg"}
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="flex items-center">
                      <span className="font-bold">{post.user.name}</span>
                      <span className="ml-1 text-xs px-1 rounded bg-purple-500 text-white">{post.user.rank}</span>
                    </div>
                    <div className="text-xs text-gray-400">{post.time}</div>
                  </div>
                </div>

                {/* Post Content */}
                <p className="mb-4">{post.content}</p>

                {/* Post Actions */}
                <div className="flex justify-between items-center border-t border-gray-700/50 pt-3">
                  <button className="text-sm text-gray-400 hover:text-red-400 flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    {post.likes}
                  </button>

                  <button className="text-sm text-gray-400 hover:text-blue-400 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {post.comments}
                  </button>

                  <button className="text-sm text-gray-400 hover:text-green-400 flex items-center">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </button>
                </div>
              </div>
            ))}

            <div className="text-center">
              <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                View More Posts
              </Button>
            </div>
          </div>

          {/* Guilds & Groups */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Guilds & Groups</h3>

            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-4"
              >
                <div className="flex items-start">
                  <img
                    src={group.avatar || "/placeholder.svg"}
                    alt={group.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold">{group.name}</h4>
                        <div className="flex items-center text-sm text-gray-400 mb-2">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{group.memberCount} members</span>
                        </div>
                      </div>

                      <Button
                        className={
                          group.isJoined
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        }
                      >
                        {group.isJoined ? (
                          <>
                            <User className="h-4 w-4 mr-1" />
                            Joined
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4 mr-1" />
                            Join
                          </>
                        )}
                      </Button>
                    </div>

                    <p className="text-gray-300">{group.description}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Discover More Guilds
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

