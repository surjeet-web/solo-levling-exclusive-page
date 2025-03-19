"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Award, ArrowRight, CheckCircle, RefreshCw, Zap, Flame, Calendar, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Types
type QuestType = "daily" | "weekly" | "challenge"
type QuestDifficulty = "easy" | "medium" | "hard" | "epic"
type QuestStatus = "available" | "in-progress" | "completed" | "failed"

interface Quest {
  id: string
  title: string
  description: string
  type: QuestType
  difficulty: QuestDifficulty
  status: QuestStatus
  xpReward: number
  progress?: number
  maxProgress?: number
  timeRemaining?: number // in hours
  icon: React.ReactNode
}

export function DailyQuests() {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "challenges">("daily")
  const [quests, setQuests] = useState<Quest[]>([])
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)
  const [showQuestDialog, setShowQuestDialog] = useState(false)

  // Generate mock quests
  useEffect(() => {
    const mockQuests: Quest[] = [
      {
        id: "d1",
        title: "Morning Warrior",
        description: "Complete a workout before 9 AM",
        type: "daily",
        difficulty: "medium",
        status: "available",
        xpReward: 150,
        icon: <Flame className="h-5 w-5 text-orange-400" />,
      },
      {
        id: "d2",
        title: "Step Master",
        description: "Reach 10,000 steps today",
        type: "daily",
        difficulty: "easy",
        status: "in-progress",
        progress: 6540,
        maxProgress: 10000,
        xpReward: 100,
        icon: <Zap className="h-5 w-5 text-yellow-400" />,
      },
      {
        id: "d3",
        title: "Hydration Hero",
        description: "Drink 8 glasses of water",
        type: "daily",
        difficulty: "easy",
        status: "in-progress",
        progress: 5,
        maxProgress: 8,
        xpReward: 80,
        icon: <Zap className="h-5 w-5 text-blue-400" />,
      },
      {
        id: "d4",
        title: "Strength Circuit",
        description: "Complete 3 sets of push-ups, squats, and planks",
        type: "daily",
        difficulty: "medium",
        status: "completed",
        xpReward: 150,
        icon: <Flame className="h-5 w-5 text-orange-400" />,
      },
      {
        id: "w1",
        title: "Consistency King",
        description: "Complete all daily quests for 5 days in a row",
        type: "weekly",
        difficulty: "hard",
        status: "in-progress",
        progress: 3,
        maxProgress: 5,
        xpReward: 500,
        timeRemaining: 96, // 4 days
        icon: <Trophy className="h-5 w-5 text-purple-400" />,
      },
      {
        id: "w2",
        title: "Distance Destroyer",
        description: "Run a total of 20km this week",
        type: "weekly",
        difficulty: "hard",
        status: "in-progress",
        progress: 12.5,
        maxProgress: 20,
        xpReward: 450,
        timeRemaining: 72, // 3 days
        icon: <Trophy className="h-5 w-5 text-purple-400" />,
      },
      {
        id: "c1",
        title: "Marathon Madness",
        description: "Complete a virtual marathon (42.2km) within 30 days",
        type: "challenge",
        difficulty: "epic",
        status: "in-progress",
        progress: 18.5,
        maxProgress: 42.2,
        xpReward: 2000,
        timeRemaining: 504, // 21 days
        icon: <Award className="h-5 w-5 text-yellow-400" />,
      },
      {
        id: "c2",
        title: "100 Push-up Challenge",
        description: "Work your way up to 100 consecutive push-ups",
        type: "challenge",
        difficulty: "epic",
        status: "available",
        xpReward: 1500,
        icon: <Award className="h-5 w-5 text-yellow-400" />,
      },
    ]

    setQuests(mockQuests)
  }, [])

  // Filter quests based on active tab
  const filteredQuests = quests.filter((quest) => {
    if (activeTab === "daily") return quest.type === "daily"
    if (activeTab === "weekly") return quest.type === "weekly"
    return quest.type === "challenge"
  })

  // Get difficulty color
  const getDifficultyColor = (difficulty: QuestDifficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-blue-500"
      case "hard":
        return "bg-purple-500"
      case "epic":
        return "bg-orange-500"
    }
  }

  // Get status color
  const getStatusColor = (status: QuestStatus) => {
    switch (status) {
      case "available":
        return "text-blue-400"
      case "in-progress":
        return "text-yellow-400"
      case "completed":
        return "text-green-400"
      case "failed":
        return "text-red-400"
    }
  }

  // Format time remaining
  const formatTimeRemaining = (hours: number) => {
    if (hours < 24) return `${hours} hours`
    const days = Math.floor(hours / 24)
    return `${days} day${days > 1 ? "s" : ""}`
  }

  // Handle quest acceptance
  const acceptQuest = (quest: Quest) => {
    setQuests((prev) =>
      prev.map((q) =>
        q.id === quest.id ? { ...q, status: "in-progress" as QuestStatus, progress: 0, maxProgress: 1 } : q,
      ),
    )
    setShowQuestDialog(false)
  }

  // Handle quest completion
  const completeQuest = (quest: Quest) => {
    setQuests((prev) => prev.map((q) => (q.id === quest.id ? { ...q, status: "completed" as QuestStatus } : q)))
  }

  // Handle quest abandonment
  const abandonQuest = (quest: Quest) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === quest.id ? { ...q, status: "available" as QuestStatus, progress: undefined } : q)),
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Daily Quests & Challenges
        </h2>
        <p className="text-gray-300">Complete quests to earn XP and unlock special rewards</p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="daily" className="relative">
            Daily
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full text-xs flex items-center justify-center">
              {quests.filter((q) => q.type === "daily" && q.status !== "completed").length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="weekly" className="relative">
            Weekly
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full text-xs flex items-center justify-center">
              {quests.filter((q) => q.type === "weekly" && q.status !== "completed").length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="relative">
            Challenges
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full text-xs flex items-center justify-center">
              {quests.filter((q) => q.type === "challenge" && q.status !== "completed").length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-0">
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Daily Quests</h3>
              <div className="text-sm text-gray-400 flex items-center">
                <RefreshCw className="h-4 w-4 mr-1" />
                <span>Resets in 8h 24m</span>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {filteredQuests.map((quest) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-lg border ${
                      quest.status === "completed"
                        ? "bg-green-900/10 border-green-500/30"
                        : quest.status === "in-progress"
                          ? "bg-yellow-900/10 border-yellow-500/30"
                          : "bg-gray-800/30 border-gray-700/30"
                    }`}
                    onClick={() => {
                      setSelectedQuest(quest)
                      setShowQuestDialog(true)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3 p-2 rounded-lg bg-gray-800">{quest.icon}</div>
                        <div>
                          <h4 className="font-bold">{quest.title}</h4>
                          <p className="text-sm text-gray-400">{quest.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="flex items-center">
                          <span className={`text-sm ${getStatusColor(quest.status)}`}>
                            {quest.status === "available" && "Available"}
                            {quest.status === "in-progress" && "In Progress"}
                            {quest.status === "completed" && "Completed"}
                            {quest.status === "failed" && "Failed"}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Zap className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-yellow-400">{quest.xpReward} XP</span>
                        </div>
                      </div>
                    </div>

                    {quest.progress !== undefined && quest.maxProgress !== undefined && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>
                            {quest.progress} / {quest.maxProgress}
                          </span>
                        </div>
                        <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2 bg-gray-700" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="mt-0">
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Weekly Quests</h3>
              <div className="text-sm text-gray-400 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Resets in 3 days</span>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {filteredQuests.map((quest) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-lg border ${
                      quest.status === "completed"
                        ? "bg-green-900/10 border-green-500/30"
                        : quest.status === "in-progress"
                          ? "bg-yellow-900/10 border-yellow-500/30"
                          : "bg-gray-800/30 border-gray-700/30"
                    }`}
                    onClick={() => {
                      setSelectedQuest(quest)
                      setShowQuestDialog(true)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3 p-2 rounded-lg bg-gray-800">{quest.icon}</div>
                        <div>
                          <h4 className="font-bold">{quest.title}</h4>
                          <p className="text-sm text-gray-400">{quest.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="flex items-center">
                          <span className={`text-sm ${getStatusColor(quest.status)}`}>
                            {quest.status === "available" && "Available"}
                            {quest.status === "in-progress" && "In Progress"}
                            {quest.status === "completed" && "Completed"}
                            {quest.status === "failed" && "Failed"}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Zap className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-yellow-400">{quest.xpReward} XP</span>
                        </div>
                      </div>
                    </div>

                    {quest.progress !== undefined && quest.maxProgress !== undefined && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>
                            {quest.progress} / {quest.maxProgress}
                          </span>
                        </div>
                        <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2 bg-gray-700" />
                      </div>
                    )}

                    {quest.timeRemaining && (
                      <div className="mt-3 flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatTimeRemaining(quest.timeRemaining)} remaining</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="mt-0">
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Epic Challenges</h3>
              <div className="text-sm text-gray-400 flex items-center">
                <Trophy className="h-4 w-4 mr-1" />
                <span>High XP Rewards</span>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {filteredQuests.map((quest) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-lg border ${
                      quest.status === "completed"
                        ? "bg-green-900/10 border-green-500/30"
                        : quest.status === "in-progress"
                          ? "bg-yellow-900/10 border-yellow-500/30"
                          : "bg-gray-800/30 border-gray-700/30"
                    }`}
                    onClick={() => {
                      setSelectedQuest(quest)
                      setShowQuestDialog(true)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3 p-2 rounded-lg bg-gray-800">{quest.icon}</div>
                        <div>
                          <h4 className="font-bold">{quest.title}</h4>
                          <p className="text-sm text-gray-400">{quest.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="flex items-center">
                          <span className={`text-sm ${getStatusColor(quest.status)}`}>
                            {quest.status === "available" && "Available"}
                            {quest.status === "in-progress" && "In Progress"}
                            {quest.status === "completed" && "Completed"}
                            {quest.status === "failed" && "Failed"}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Zap className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-yellow-400">{quest.xpReward} XP</span>
                        </div>
                      </div>
                    </div>

                    {quest.progress !== undefined && quest.maxProgress !== undefined && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>
                            {quest.progress} / {quest.maxProgress}
                          </span>
                        </div>
                        <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2 bg-gray-700" />
                      </div>
                    )}

                    {quest.timeRemaining && (
                      <div className="mt-3 flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatTimeRemaining(quest.timeRemaining)} remaining</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quest Detail Dialog */}
      <Dialog open={showQuestDialog} onOpenChange={setShowQuestDialog}>
        <DialogContent className="bg-gray-900 border-purple-500/30 text-white">
          {selectedQuest && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center">
                  <div className="mr-3 p-2 rounded-lg bg-gray-800">{selectedQuest.icon}</div>
                  {selectedQuest.title}
                </DialogTitle>
                <DialogDescription className="text-gray-300">{selectedQuest.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${getDifficultyColor(selectedQuest.difficulty)} mr-2`}></div>
                    <span className="text-sm capitalize">{selectedQuest.difficulty} Difficulty</span>
                  </div>

                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-yellow-400">{selectedQuest.xpReward} XP</span>
                  </div>
                </div>

                {selectedQuest.progress !== undefined && selectedQuest.maxProgress !== undefined && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>
                        {selectedQuest.progress} / {selectedQuest.maxProgress}
                      </span>
                    </div>
                    <Progress
                      value={(selectedQuest.progress / selectedQuest.maxProgress) * 100}
                      className="h-3 bg-gray-700"
                    />
                  </div>
                )}

                {selectedQuest.timeRemaining && (
                  <div className="flex items-center text-sm text-gray-300">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{formatTimeRemaining(selectedQuest.timeRemaining)} remaining</span>
                  </div>
                )}

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Rewards</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="text-yellow-400">{selectedQuest.xpReward} XP</span>
                    </div>

                    {selectedQuest.difficulty === "epic" && (
                      <div className="flex items-center">
                        <Trophy className="h-5 w-5 text-purple-400 mr-1" />
                        <span className="text-purple-400">Epic Badge</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                {selectedQuest.status === "available" && (
                  <Button
                    className="bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600"
                    onClick={() => acceptQuest(selectedQuest)}
                  >
                    Accept Quest <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}

                {selectedQuest.status === "in-progress" && (
                  <>
                    <Button
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      onClick={() => abandonQuest(selectedQuest)}
                    >
                      Abandon
                    </Button>

                    {selectedQuest.progress === selectedQuest.maxProgress && (
                      <Button
                        className="bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-600 hover:to-emerald-600"
                        onClick={() => completeQuest(selectedQuest)}
                      >
                        Complete <CheckCircle className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </>
                )}

                {selectedQuest.status === "completed" && (
                  <Button
                    variant="outline"
                    className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                    onClick={() => setShowQuestDialog(false)}
                  >
                    Completed <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

