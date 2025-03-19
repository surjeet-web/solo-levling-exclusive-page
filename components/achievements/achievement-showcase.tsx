"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Award, Trophy, Medal, Star, Zap, Calendar, Clock, CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Types
type AchievementCategory = "all" | "workout" | "streak" | "milestone" | "special"
type AchievementRarity = "common" | "uncommon" | "rare" | "epic" | "legendary"
type AchievementStatus = "locked" | "in-progress" | "completed"

interface Achievement {
  id: string
  title: string
  description: string
  category: AchievementCategory
  rarity: AchievementRarity
  status: AchievementStatus
  xpReward: number
  icon: React.ReactNode
  progress?: number
  maxProgress?: number
  dateEarned?: Date
  requirements?: string[]
}

export function AchievementShowcase() {
  const [activeCategory, setActiveCategory] = useState<AchievementCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"newest" | "rarity" | "progress">("newest")
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [showAchievementDialog, setShowAchievementDialog] = useState(false)

  // Generate mock achievements
  useEffect(() => {
    const mockAchievements: Achievement[] = [
      {
        id: "a1",
        title: "First Steps",
        description: "Complete your first workout",
        category: "milestone",
        rarity: "common",
        status: "completed",
        xpReward: 100,
        icon: <CheckCircle className="h-6 w-6 text-green-400" />,
        dateEarned: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
      },
      {
        id: "a2",
        title: "Consistency is Key",
        description: "Complete workouts for 7 consecutive days",
        category: "streak",
        rarity: "uncommon",
        status: "completed",
        xpReward: 250,
        icon: <Calendar className="h-6 w-6 text-blue-400" />,
        dateEarned: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      },
      {
        id: "a3",
        title: "Marathon Runner",
        description: "Run a total of 42.2km",
        category: "milestone",
        rarity: "rare",
        status: "in-progress",
        progress: 28.5,
        maxProgress: 42.2,
        xpReward: 500,
        icon: <Trophy className="h-6 w-6 text-yellow-400" />,
        requirements: ["Track your runs using the app", "Outdoor and treadmill runs count"],
      },
      {
        id: "a4",
        title: "Strength Master",
        description: "Lift a total of 10,000kg in a single week",
        category: "workout",
        rarity: "epic",
        status: "locked",
        xpReward: 750,
        icon: <Award className="h-6 w-6 text-purple-400" />,
        requirements: ["Track your strength workouts", "Only counts weight lifted with proper form"],
      },
      {
        id: "a5",
        title: "Early Bird",
        description: "Complete 10 workouts before 7 AM",
        category: "special",
        rarity: "uncommon",
        status: "in-progress",
        progress: 6,
        maxProgress: 10,
        xpReward: 300,
        icon: <Clock className="h-6 w-6 text-orange-400" />,
      },
      {
        id: "a6",
        title: "Century Club",
        description: "Complete 100 workouts",
        category: "milestone",
        rarity: "rare",
        status: "in-progress",
        progress: 42,
        maxProgress: 100,
        xpReward: 500,
        icon: <Medal className="h-6 w-6 text-yellow-400" />,
      },
      {
        id: "a7",
        title: "Legendary Streak",
        description: "Complete workouts for 30 consecutive days",
        category: "streak",
        rarity: "legendary",
        status: "locked",
        xpReward: 1000,
        icon: <Star className="h-6 w-6 text-yellow-400" />,
        requirements: ["No missed days", "At least 15 minutes per workout"],
      },
      {
        id: "a8",
        title: "Night Owl",
        description: "Complete 10 workouts after 10 PM",
        category: "special",
        rarity: "uncommon",
        status: "in-progress",
        progress: 3,
        maxProgress: 10,
        xpReward: 300,
        icon: <Clock className="h-6 w-6 text-blue-400" />,
      },
      {
        id: "a9",
        title: "Balanced Athlete",
        description: "Complete at least 5 workouts in each category",
        category: "workout",
        rarity: "rare",
        status: "in-progress",
        progress: 3,
        maxProgress: 5,
        xpReward: 400,
        icon: <Zap className="h-6 w-6 text-purple-400" />,
      },
      {
        id: "a10",
        title: "Fitness Explorer",
        description: "Try 10 different workout types",
        category: "workout",
        rarity: "uncommon",
        status: "completed",
        xpReward: 250,
        icon: <Award className="h-6 w-6 text-green-400" />,
        dateEarned: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      },
    ]

    setAchievements(mockAchievements)
  }, [])

  // Filter achievements based on active category and search query
  const filteredAchievements = achievements.filter((achievement) => {
    const matchesCategory = activeCategory === "all" || achievement.category === activeCategory
    const matchesSearch =
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort achievements
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    if (sortBy === "newest") {
      if (a.dateEarned && b.dateEarned) return b.dateEarned.getTime() - a.dateEarned.getTime()
      if (a.dateEarned) return -1
      if (b.dateEarned) return 1
      return 0
    }

    if (sortBy === "rarity") {
      const rarityOrder = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 }
      return rarityOrder[b.rarity] - rarityOrder[a.rarity]
    }

    if (sortBy === "progress") {
      if (a.status === "completed" && b.status !== "completed") return -1
      if (a.status !== "completed" && b.status === "completed") return 1
      if (a.status === "in-progress" && b.status === "locked") return -1
      if (a.status === "locked" && b.status === "in-progress") return 1
      return 0
    }

    return 0
  })

  // Get rarity color
  const getRarityColor = (rarity: AchievementRarity) => {
    switch (rarity) {
      case "common":
        return "from-green-500 to-green-700"
      case "uncommon":
        return "from-blue-500 to-blue-700"
      case "rare":
        return "from-purple-500 to-purple-700"
      case "epic":
        return "from-orange-500 to-orange-700"
      case "legendary":
        return "from-yellow-500 to-yellow-700"
    }
  }

  // Get status color
  const getStatusColor = (status: AchievementStatus) => {
    switch (status) {
      case "locked":
        return "text-gray-400"
      case "in-progress":
        return "text-yellow-400"
      case "completed":
        return "text-green-400"
    }
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Calculate completion percentage
  const getCompletionPercentage = () => {
    const completed = achievements.filter((a) => a.status === "completed").length
    return Math.round((completed / achievements.length) * 100)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Achievements & Badges
        </h2>
        <p className="text-gray-300">Track your progress and earn badges to showcase your fitness journey</p>
      </div>

      {/* Achievement Stats */}
      <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Achievement Progress</h3>
            <div className="flex items-center">
              <span className="text-2xl font-bold mr-2">
                {achievements.filter((a) => a.status === "completed").length}/{achievements.length}
              </span>
              <span className="text-gray-400">achievements unlocked</span>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="flex justify-between text-sm mb-1">
              <span>Completion</span>
              <span>{getCompletionPercentage()}%</span>
            </div>
            <Progress value={getCompletionPercentage()} className="h-3 bg-gray-700" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-green-400 font-bold text-xl">
              {achievements.filter((a) => a.status === "completed").length}
            </div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-yellow-400 font-bold text-xl">
              {achievements.filter((a) => a.status === "in-progress").length}
            </div>
            <div className="text-sm text-gray-400">In Progress</div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-gray-400 font-bold text-xl">
              {achievements.filter((a) => a.status === "locked").length}
            </div>
            <div className="text-sm text-gray-400">Locked</div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-yellow-400 font-bold text-xl">
              {achievements.reduce((total, a) => total + (a.status === "completed" ? a.xpReward : 0), 0)}
            </div>
            <div className="text-sm text-gray-400">XP Earned</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search achievements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800/50 border-gray-700"
            prefix={<Search className="h-4 w-4 text-gray-400" />}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                {sortBy === "newest" && "Newest"}
                {sortBy === "rarity" && "Rarity"}
                {sortBy === "progress" && "Progress"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("rarity")}>Rarity</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("progress")}>Progress</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Achievement Categories */}
      <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as AchievementCategory)}>
        <TabsList className="w-full grid grid-cols-5 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="workout">Workout</TabsTrigger>
          <TabsTrigger value="streak">Streak</TabsTrigger>
          <TabsTrigger value="milestone">Milestone</TabsTrigger>
          <TabsTrigger value="special">Special</TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {sortedAchievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-gray-800/50 rounded-xl border overflow-hidden cursor-pointer transform transition-transform hover:scale-105 ${
                    achievement.status === "completed"
                      ? "border-green-500/30"
                      : achievement.status === "in-progress"
                        ? "border-yellow-500/30"
                        : "border-gray-700/30"
                  }`}
                  onClick={() => {
                    setSelectedAchievement(achievement)
                    setShowAchievementDialog(true)
                  }}
                >
                  <div className={`h-2 bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}></div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-gray-700/50">
                        {achievement.status === "locked" ? (
                          <Lock className="h-6 w-6 text-gray-400" />
                        ) : (
                          achievement.icon
                        )}
                      </div>

                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${getStatusColor(achievement.status)}`}>
                          {achievement.status === "locked" && "Locked"}
                          {achievement.status === "in-progress" && "In Progress"}
                          {achievement.status === "completed" && "Completed"}
                        </span>
                      </div>
                    </div>

                    <h4
                      className={`font-bold text-lg mb-1 ${achievement.status === "locked" ? "text-gray-400" : "text-white"}`}
                    >
                      {achievement.title}
                    </h4>

                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{achievement.description}</p>

                    {achievement.progress !== undefined && achievement.maxProgress !== undefined && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>
                            {achievement.progress} / {achievement.maxProgress}
                          </span>
                        </div>
                        <Progress
                          value={(achievement.progress / achievement.maxProgress) * 100}
                          className="h-1.5 bg-gray-700"
                        />
                      </div>
                    )}

                    {achievement.dateEarned && (
                      <div className="mt-3 flex items-center text-xs text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Earned on {formatDate(achievement.dateEarned)}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {sortedAchievements.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>No achievements found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Achievement Detail Dialog */}
      <Dialog open={showAchievementDialog} onOpenChange={setShowAchievementDialog}>
        <DialogContent className="bg-gray-900 border-purple-500/30 text-white">
          {selectedAchievement && (
            <>
              <div className={`h-2 bg-gradient-to-r ${getRarityColor(selectedAchievement.rarity)} -mx-6 -mt-6`}></div>

              <DialogHeader className="mt-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-gray-800 mr-3">
                    {selectedAchievement.status === "locked" ? (
                      <Lock className="h-8 w-8 text-gray-400" />
                    ) : (
                      React.cloneElement(selectedAchievement.icon as React.ReactElement, { className: "h-8 w-8" })
                    )}
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold">{selectedAchievement.title}</DialogTitle>
                    <div className="flex items-center mt-1">
                      <span className={`text-sm font-medium ${getStatusColor(selectedAchievement.status)} mr-2`}>
                        {selectedAchievement.status === "locked" && "Locked"}
                        {selectedAchievement.status === "in-progress" && "In Progress"}
                        {selectedAchievement.status === "completed" && "Completed"}
                      </span>
                      <span className="text-sm text-gray-400 capitalize">{selectedAchievement.rarity} Rarity</span>
                    </div>
                  </div>
                </div>
                <DialogDescription className="text-gray-300 mt-4">{selectedAchievement.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {selectedAchievement.progress !== undefined && selectedAchievement.maxProgress !== undefined && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>
                        {selectedAchievement.progress} / {selectedAchievement.maxProgress}
                      </span>
                    </div>
                    <Progress
                      value={(selectedAchievement.progress / selectedAchievement.maxProgress) * 100}
                      className="h-3 bg-gray-700"
                    />
                  </div>
                )}

                {selectedAchievement.dateEarned && (
                  <div className="flex items-center text-sm text-gray-300">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Earned on {formatDate(selectedAchievement.dateEarned)}</span>
                  </div>
                )}

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Rewards</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="text-yellow-400">{selectedAchievement.xpReward} XP</span>
                    </div>

                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-purple-400 mr-1" />
                      <span className="text-purple-400">{selectedAchievement.title} Badge</span>
                    </div>
                  </div>
                </div>

                {selectedAchievement.requirements && selectedAchievement.requirements.length > 0 && (
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-bold mb-2">Requirements</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {selectedAchievement.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

