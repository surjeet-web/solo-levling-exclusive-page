"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  MessageSquare,
  Share,
  MoreHorizontal,
  Image,
  Send,
  Clock,
  Award,
  User,
  Users,
  UserPlus,
  Filter,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Types
type PostType = "workout" | "achievement" | "progress" | "general"
type CommentType = {
  id: string
  userId: string
  userName: string
  userAvatar: string
  userRank: string
  content: string
  timestamp: Date
  likes: number
  isLiked?: boolean
}

interface Post {
  id: string
  userId: string
  userName: string
  userAvatar: string
  userRank: string
  content: string
  type: PostType
  timestamp: Date
  likes: number
  comments: CommentType[]
  isLiked?: boolean
  images?: string[]
  workoutData?: {
    type: string
    duration: number
    calories: number
    exercises?: string[]
  }
  achievementData?: {
    title: string
    description: string
    icon: React.ReactNode
  }
  progressData?: {
    metric: string
    current: number
    previous: number
    unit: string
  }
}

interface Group {
  id: string
  name: string
  avatar: string
  memberCount: number
  description: string
  isJoined?: boolean
}

export function SocialFeed() {
  const [activeTab, setActiveTab] = useState<"feed" | "groups">("feed")
  const [posts, setPosts] = useState<Post[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [postContent, setPostContent] = useState("")
  const [commentContent, setCommentContent] = useState("")
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showComments, setShowComments] = useState(false)
  const [postFilter, setPostFilter] = useState<"all" | "following" | "trending">("all")

  // Generate mock posts
  useEffect(() => {
    const now = new Date()
    const mockPosts: Post[] = [
      {
        id: "p1",
        userId: "u1",
        userName: "ShadowMonarch",
        userAvatar: "/placeholder.svg?height=100&width=100",
        userRank: "S",
        content: "Just completed an intense strength training session. Feeling stronger every day! 💪",
        type: "workout",
        timestamp: new Date(now.getTime() - 1000 * 60 * 30), // 30 minutes ago
        likes: 24,
        comments: [
          {
            id: "c1",
            userId: "u2",
            userName: "BerserkHunter",
            userAvatar: "/placeholder.svg?height=100&width=100",
            userRank: "S",
            content: "Great work! What exercises did you focus on?",
            timestamp: new Date(now.getTime() - 1000 * 60 * 25), // 25 minutes ago
            likes: 3,
            isLiked: true,
          },
          {
            id: "c2",
            userId: "u1",
            userName: "ShadowMonarch",
            userAvatar: "/placeholder.svg?height=100&width=100",
            userRank: "S",
            content:
              "Mainly compound movements - squats, deadlifts, and bench press. Trying to increase my overall strength!",
            timestamp: new Date(now.getTime() - 1000 * 60 * 20), // 20 minutes ago
            likes: 2,
          },
        ],
        workoutData: {
          type: "Strength Training",
          duration: 45,
          calories: 320,
          exercises: ["Squats", "Deadlifts", "Bench Press", "Pull-ups", "Shoulder Press"],
        },
      },
      {
        id: "p2",
        userId: "u3",
        userName: "IronWill",
        userAvatar: "/placeholder.svg?height=100&width=100",
        userRank: "A",
        content:
          "Just unlocked the 'Marathon Runner' achievement! 🏃‍♂️ It took me 3 months of consistent training, but I finally did it!",
        type: "achievement",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
        likes: 42,
        comments: [
          {
            id: "c3",
            userId: "u5",
            userName: "FrostQueen",
            userAvatar: "/placeholder.svg?height=100&width=100",
            userRank: "A",
            content: "Congratulations! That's a huge accomplishment!",
            timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
            likes: 5,
          },
        ],
        achievementData: {
          title: "Marathon Runner",
          description: "Complete a full marathon (42.2km)",
          icon: <Award className="h-6 w-6 text-yellow-400" />,
        },
      },
      {
        id: "p3",
        userId: "u4",
        userName: "PhantomBlade",
        userAvatar: "/placeholder.svg?height=100&width=100",
        userRank: "A",
        content:
          "Check out my progress over the last 3 months of training! The consistency is finally paying off. #FitnessJourney #Gains",
        type: "progress",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 5), // 5 hours ago
        likes: 38,
        comments: [
          {
            id: "c4",
            userId: "u1",
            userName: "ShadowMonarch",
            userAvatar: "/placeholder.svg?height=100&width=100",
            userRank: "S",
            content: "Amazing progress! What's your secret?",
            timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 4.5), // 4.5 hours ago
            likes: 2,
          },
          {
            id: "c5",
            userId: "u4",
            userName: "PhantomBlade",
            userAvatar: "/placeholder.svg?height=100&width=100",
            userRank: "A",
            content: "No secret, just consistency and following the workout plans in the app!",
            timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 4), // 4 hours ago
            likes: 3,
          },
        ],
        images: ["/placeholder.svg?height=400&width=600"],
        progressData: {
          metric: "Bench Press",
          current: 100,
          previous: 70,
          unit: "kg",
        },
      },
      {
        id: "p4",
        userId: "u5",
        userName: "FrostQueen",
        userAvatar: "/placeholder.svg?height=100&width=100",
        userRank: "A",
        content:
          "Just joined the 'Winter Warriors' guild! Looking forward to training with like-minded hunters. Anyone else in this guild?",
        type: "general",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 8), // 8 hours ago
        likes: 15,
        comments: [],
      },
      {
        id: "p5",
        userId: "u2",
        userName: "BerserkHunter",
        userAvatar: "/placeholder.svg?height=100&width=100",
        userRank: "S",
        content:
          "Morning cardio session complete! Started the day with a 5K run and feeling energized for the day ahead. How do you all start your mornings?",
        type: "workout",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 12), // 12 hours ago
        likes: 28,
        comments: [
          {
            id: "c6",
            userId: "u3",
            userName: "IronWill",
            userAvatar: "/placeholder.svg?height=100&width=100",
            userRank: "A",
            content: "I prefer strength training in the morning, but cardio is a great way to start the day too!",
            timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 11), // 11 hours ago
            likes: 1,
          },
        ],
        workoutData: {
          type: "Running",
          duration: 25,
          calories: 250,
        },
      },
    ]

    setPosts(mockPosts)

    // Generate mock groups
    const mockGroups: Group[] = [
      {
        id: "g1",
        name: "Shadow Hunters Elite",
        avatar: "/placeholder.svg?height=100&width=100",
        memberCount: 128,
        description:
          "A guild for the top 1% of hunters. Share strategies, workout plans, and compete in exclusive events.",
        isJoined: true,
      },
      {
        id: "g2",
        name: "Strength Masters",
        avatar: "/placeholder.svg?height=100&width=100",
        memberCount: 256,
        description:
          "Focused on strength training and powerlifting. Perfect for those looking to increase their raw power.",
        isJoined: false,
      },
      {
        id: "g3",
        name: "Endurance Runners",
        avatar: "/placeholder.svg?height=100&width=100",
        memberCount: 189,
        description:
          "For hunters who love running, cycling, and all forms of cardio. Train together for virtual marathons.",
        isJoined: false,
      },
      {
        id: "g4",
        name: "Flexibility Ninjas",
        avatar: "/placeholder.svg?height=100&width=100",
        memberCount: 94,
        description:
          "Yoga, stretching, and mobility work. Improve your flexibility to prevent injuries and enhance performance.",
        isJoined: true,
      },
      {
        id: "g5",
        name: "Nutrition Experts",
        avatar: "/placeholder.svg?height=100&width=100",
        memberCount: 142,
        description: "Share meal plans, recipes, and nutrition tips to fuel your workouts and maximize recovery.",
        isJoined: false,
      },
    ]

    setGroups(mockGroups)
  }, [])

  // Format time
  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffSec < 60) return `${diffSec}s ago`
    if (diffMin < 60) return `${diffMin}m ago`
    if (diffHour < 24) return `${diffHour}h ago`
    if (diffDay < 7) return `${diffDay}d ago`

    return date.toLocaleDateString()
  }

  // Handle post like
  const handlePostLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
          }
        }
        return post
      }),
    )
  }

  // Handle comment like
  const handleCommentLike = (postId: string, commentId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const updatedComments = post.comments.map((comment) => {
            if (comment.id === commentId) {
              const isLiked = !comment.isLiked
              return {
                ...comment,
                isLiked,
                likes: isLiked ? comment.likes + 1 : comment.likes - 1,
              }
            }
            return comment
          })
          return { ...post, comments: updatedComments }
        }
        return post
      }),
    )
  }

  // Handle adding a comment
  const handleAddComment = (postId: string) => {
    if (!commentContent.trim()) return

    const newComment: CommentType = {
      id: `c${Date.now()}`,
      userId: "u1", // Current user ID
      userName: "ShadowMonarch", // Current user name
      userAvatar: "/placeholder.svg?height=100&width=100", // Current user avatar
      userRank: "S", // Current user rank
      content: commentContent,
      timestamp: new Date(),
      likes: 0,
    }

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment],
          }
        }
        return post
      }),
    )

    setCommentContent("")
  }

  // Handle creating a new post
  const handleCreatePost = () => {
    if (!postContent.trim()) return

    const newPost: Post = {
      id: `p${Date.now()}`,
      userId: "u1", // Current user ID
      userName: "ShadowMonarch", // Current user name
      userAvatar: "/placeholder.svg?height=100&width=100", // Current user avatar
      userRank: "S", // Current user rank
      content: postContent,
      type: "general",
      timestamp: new Date(),
      likes: 0,
      comments: [],
    }

    setPosts((prev) => [newPost, ...prev])
    setPostContent("")
  }

  // Handle joining a group
  const handleJoinGroup = (groupId: string) => {
    setGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          const isJoined = !group.isJoined
          return {
            ...group,
            isJoined,
            memberCount: isJoined ? group.memberCount + 1 : group.memberCount - 1,
          }
        }
        return group
      }),
    )
  }

  // Get post type icon
  const getPostTypeIcon = (type: PostType) => {
    switch (type) {
      case "workout":
        return <Zap className="h-4 w-4 text-green-400" />
      case "achievement":
        return <Award className="h-4 w-4 text-yellow-400" />
      case "progress":
        return <Chart className="h-4 w-4 text-blue-400" />
      case "general":
        return <MessageSquare className="h-4 w-4 text-purple-400" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Hunter Community
        </h2>
        <p className="text-gray-300">Connect with other hunters, share your progress, and join guilds</p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="feed">Activity Feed</TabsTrigger>
          <TabsTrigger value="groups">Guilds & Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="mt-0">
          {/* Create Post */}
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-4 mb-6">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=100&width=100" alt="ShadowMonarch" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Share your fitness journey with other hunters..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 resize-none mb-3"
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
                      <Image className="h-4 w-4 mr-1" />
                      Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
                      <Award className="h-4 w-4 mr-1" />
                      Achievement
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
                      <Zap className="h-4 w-4 mr-1" />
                      Workout
                    </Button>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600"
                    onClick={handleCreatePost}
                    disabled={!postContent.trim()}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Feed Filters */}
          <div className="flex justify-between mb-4">
            <div className="flex gap-2">
              <Button
                variant={postFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setPostFilter("all")}
                className={postFilter === "all" ? "bg-purple-700 hover:bg-purple-600" : "border-gray-700"}
              >
                All
              </Button>
              <Button
                variant={postFilter === "following" ? "default" : "outline"}
                size="sm"
                onClick={() => setPostFilter("following")}
                className={postFilter === "following" ? "bg-purple-700 hover:bg-purple-600" : "border-gray-700"}
              >
                Following
              </Button>
              <Button
                variant={postFilter === "trending" ? "default" : "outline"}
                size="sm"
                onClick={() => setPostFilter("trending")}
                className={postFilter === "trending" ? "bg-purple-700 hover:bg-purple-600" : "border-gray-700"}
              >
                Trending
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-gray-700">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Posts</DropdownMenuItem>
                <DropdownMenuItem>Workouts</DropdownMenuItem>
                <DropdownMenuItem>Achievements</DropdownMenuItem>
                <DropdownMenuItem>Progress Updates</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            <AnimatePresence>
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-4"
                >
                  {/* Post Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <Avatar className="mr-3">
                        <AvatarImage src={post.userAvatar} alt={post.userName} />
                        <AvatarFallback>{post.userName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <span className="font-bold">{post.userName}</span>
                          <span className="ml-1 text-xs px-1 rounded bg-purple-500 text-white">{post.userRank}</span>
                          <span className="ml-2 text-xs text-gray-400 flex items-center">
                            {getPostTypeIcon(post.type)}
                            <span className="ml-1 capitalize">{post.type}</span>
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">{formatTime(post.timestamp)}</div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Save Post</DropdownMenuItem>
                        <DropdownMenuItem>Follow {post.userName}</DropdownMenuItem>
                        <DropdownMenuItem>Report</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="whitespace-pre-line">{post.content}</p>

                    {/* Workout Data */}
                    {post.type === "workout" && post.workoutData && (
                      <div className="mt-3 bg-gray-800/50 rounded-lg p-3">
                        <div className="text-sm font-medium mb-2">{post.workoutData.type} Workout</div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-purple-400 mr-2" />
                            <span>{post.workoutData.duration} minutes</span>
                          </div>
                          <div className="flex items-center">
                            <Flame className="h-4 w-4 text-orange-400 mr-2" />
                            <span>{post.workoutData.calories} calories</span>
                          </div>
                          {post.workoutData.exercises && (
                            <div className="col-span-2 md:col-span-3 mt-1">
                              <div className="text-xs text-gray-400 mb-1">Exercises:</div>
                              <div className="flex flex-wrap gap-1">
                                {post.workoutData.exercises.map((exercise, index) => (
                                  <span key={index} className="text-xs bg-gray-700/50 rounded px-2 py-0.5">
                                    {exercise}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Achievement Data */}
                    {post.type === "achievement" && post.achievementData && (
                      <div className="mt-3 bg-gray-800/50 rounded-lg p-3 flex items-center">
                        <div className="mr-3 p-2 rounded-lg bg-yellow-900/20">{post.achievementData.icon}</div>
                        <div>
                          <div className="font-medium">{post.achievementData.title}</div>
                          <div className="text-sm text-gray-400">{post.achievementData.description}</div>
                        </div>
                      </div>
                    )}

                    {/* Progress Data */}
                    {post.type === "progress" && post.progressData && (
                      <div className="mt-3 bg-gray-800/50 rounded-lg p-3">
                        <div className="text-sm font-medium mb-2">{post.progressData.metric} Progress</div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-gray-400 mr-2">Previous:</span>
                            <span>
                              {post.progressData.previous} {post.progressData.unit}
                            </span>
                          </div>
                          <div className="text-xl font-bold">→</div>
                          <div className="flex items-center">
                            <span className="text-gray-400 mr-2">Current:</span>
                            <span className="text-green-400">
                              {post.progressData.current} {post.progressData.unit}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Images */}
                    {post.images && post.images.length > 0 && (
                      <div className="mt-3 grid grid-cols-1 gap-2">
                        {post.images.map((image, index) => (
                          <img
                            key={index}
                            src={image || "/placeholder.svg"}
                            alt={`Post image ${index + 1}`}
                            className="rounded-lg w-full"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="flex justify-between items-center border-t border-b border-gray-700/50 py-2 mb-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`text-sm ${post.isLiked ? "text-red-400" : "text-gray-400"} hover:text-red-400`}
                      onClick={() => handlePostLike(post.id)}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                      {post.likes > 0 && post.likes}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm text-gray-400 hover:text-blue-400"
                      onClick={() => {
                        setSelectedPost(post)
                        setShowComments(true)
                      }}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {post.comments.length > 0 && post.comments.length}
                    </Button>

                    <Button variant="ghost" size="sm" className="text-sm text-gray-400 hover:text-green-400">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>

                  {/* Comments Preview */}
                  {post.comments.length > 0 && (
                    <div className="space-y-3">
                      {post.comments.slice(0, 2).map((comment) => (
                        <div key={comment.id} className="flex items-start gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                            <AvatarFallback>{comment.userName.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 bg-gray-800/30 rounded-lg p-2">
                            <div className="flex items-center mb-1">
                              <span className="text-sm font-medium">{comment.userName}</span>
                              <span className="ml-1 text-xs px-1 rounded bg-purple-500 text-white">
                                {comment.userRank}
                              </span>
                              <span className="ml-2 text-xs text-gray-400">{formatTime(comment.timestamp)}</span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                      ))}

                      {post.comments.length > 2 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-sm text-purple-400 hover:text-purple-300 w-full"
                          onClick={() => {
                            setSelectedPost(post)
                            setShowComments(true)
                          }}
                        >
                          View all {post.comments.length} comments
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Add Comment */}
                  <div className="flex items-center gap-2 mt-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder.svg?height=100&width=100" alt="ShadowMonarch" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <Input
                      placeholder="Add a comment..."
                      className="bg-gray-800/30 border-gray-700"
                      value={post.id === selectedPost?.id ? commentContent : ""}
                      onChange={(e) => setCommentContent(e.target.value)}
                      onFocus={() => setSelectedPost(post)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddComment(post.id)
                        }
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-gray-400 hover:text-purple-400"
                      onClick={() => handleAddComment(post.id)}
                      disabled={!commentContent.trim() || post.id !== selectedPost?.id}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="groups" className="mt-0">
          {/* Groups Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Discover Guilds</h3>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600">
                  Create Guild
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-purple-500/30 text-white">
                <DialogHeader>
                  <DialogTitle>Create a New Guild</DialogTitle>
                  <DialogDescription>
                    Form a guild with other hunters to train together, share tips, and compete in events.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Guild Name</label>
                    <Input className="bg-gray-800/50 border-gray-700" placeholder="Enter guild name" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      className="bg-gray-800/50 border-gray-700 resize-none"
                      placeholder="Describe your guild's focus and goals"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Focus Areas</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="strength" className="rounded text-purple-600" />
                        <label htmlFor="strength">Strength</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="cardio" className="rounded text-purple-600" />
                        <label htmlFor="cardio">Cardio</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="flexibility" className="rounded text-purple-600" />
                        <label htmlFor="flexibility">Flexibility</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="nutrition" className="rounded text-purple-600" />
                        <label htmlFor="nutrition">Nutrition</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600">
                    Create Guild
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Groups List */}
          <div className="space-y-4">
            <AnimatePresence>
              {groups.map((group) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-4"
                >
                  <div className="flex items-start">
                    <Avatar className="w-16 h-16 mr-4">
                      <AvatarImage src={group.avatar} alt={group.name} />
                      <AvatarFallback>{group.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>

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
                              : "bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600"
                          }
                          onClick={() => handleJoinGroup(group.id)}
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>
      </Tabs>

      {/* Comments Dialog */}
      <Dialog open={showComments} onOpenChange={setShowComments}>
        <DialogContent className="bg-gray-900 border-purple-500/30 text-white max-w-2xl">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-purple-400" />
                  Comments
                </DialogTitle>
                <DialogDescription>
                  {selectedPost.comments.length} comments on {selectedPost.userName}'s post
                </DialogDescription>
              </DialogHeader>

              <div className="max-h-96 overflow-y-auto pr-2 space-y-4 py-4">
                {selectedPost.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                      <AvatarFallback>{comment.userName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-gray-800/30 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <span className="font-medium">{comment.userName}</span>
                        <span className="ml-1 text-xs px-1 rounded bg-purple-500 text-white">{comment.userRank}</span>
                        <span className="ml-2 text-xs text-gray-400">{formatTime(comment.timestamp)}</span>
                      </div>
                      <p className="mb-2">{comment.content}</p>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`text-xs ${comment.isLiked ? "text-red-400" : "text-gray-400"} hover:text-red-400`}
                          onClick={() => handleCommentLike(selectedPost.id, comment.id)}
                        >
                          <Heart className={`h-3 w-3 mr-1 ${comment.isLiked ? "fill-current" : ""}`} />
                          {comment.likes > 0 && comment.likes}
                        </Button>

                        <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-blue-400">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=100&width=100" alt="ShadowMonarch" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    placeholder="Add a comment..."
                    className="bg-gray-800/30 border-gray-700"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAddComment(selectedPost.id)
                      }
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-gray-400 hover:text-purple-400"
                    onClick={() => handleAddComment(selectedPost.id)}
                    disabled={!commentContent.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Chart component for progress posts
function Chart({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 3v18h18"\

