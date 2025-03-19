"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, MapPin, Users, Trophy, Medal, Star, ArrowRight, Filter, Search, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Types
type EventCategory = "all" | "running" | "strength" | "yoga" | "challenge"
type EventStatus = "upcoming" | "active" | "completed"
type EventDifficulty = "beginner" | "intermediate" | "advanced" | "all-levels"

interface EventParticipant {
  id: string
  name: string
  avatar: string
  rank: string
  progress?: number
}

interface FitnessEvent {
  id: string
  title: string
  description: string
  category: EventCategory
  status: EventStatus
  difficulty: EventDifficulty
  startDate: Date
  endDate: Date
  location?: string
  isVirtual: boolean
  maxParticipants?: number
  currentParticipants: number
  xpReward: number
  image: string
  isRegistered?: boolean
  progress?: number
  maxProgress?: number
  leaderboard?: EventParticipant[]
}

export function FitnessEvents() {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "popularity" | "difficulty">("date")
  const [events, setEvents] = useState<FitnessEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<FitnessEvent | null>(null)
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  // Generate mock events
  useEffect(() => {
    const now = new Date()
    const mockEvents: FitnessEvent[] = [
      {
        id: "e1",
        title: "Virtual 5K Challenge",
        description:
          "Complete a 5K run anywhere, anytime during the event period. Track your run using the app and submit your results.",
        category: "running",
        status: "active",
        difficulty: "beginner",
        startDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        endDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
        isVirtual: true,
        currentParticipants: 245,
        xpReward: 500,
        image: "/placeholder.svg?height=300&width=600",
        isRegistered: true,
        progress: 3.2,
        maxProgress: 5,
        leaderboard: [
          { id: "p1", name: "ShadowMonarch", avatar: "/placeholder.svg?height=100&width=100", rank: "S", progress: 5 },
          {
            id: "p2",
            name: "BerserkHunter",
            avatar: "/placeholder.svg?height=100&width=100",
            rank: "S",
            progress: 4.8,
          },
          { id: "p3", name: "IronWill", avatar: "/placeholder.svg?height=100&width=100", rank: "A", progress: 4.5 },
          { id: "p4", name: "PhantomBlade", avatar: "/placeholder.svg?height=100&width=100", rank: "A", progress: 4.2 },
          { id: "p5", name: "FrostQueen", avatar: "/placeholder.svg?height=100&width=100", rank: "A", progress: 4.0 },
        ],
      },
      {
        id: "e2",
        title: "30-Day Strength Challenge",
        description:
          "Build strength and muscle with this 30-day progressive challenge. Daily workouts designed to push your limits.",
        category: "strength",
        status: "upcoming",
        difficulty: "intermediate",
        startDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
        endDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 33), // 33 days from now
        isVirtual: true,
        currentParticipants: 178,
        xpReward: 1000,
        image: "/placeholder.svg?height=300&width=600",
      },
      {
        id: "e3",
        title: "Yoga for Hunters",
        description:
          "Improve flexibility and recovery with this 14-day yoga program designed specifically for strength athletes.",
        category: "yoga",
        status: "upcoming",
        difficulty: "all-levels",
        startDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
        endDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 21), // 21 days from now
        isVirtual: true,
        currentParticipants: 92,
        xpReward: 750,
        image: "/placeholder.svg?height=300&width=600",
      },
      {
        id: "e4",
        title: "City Marathon",
        description:
          "Join us for the annual city marathon! Run through scenic routes and compete with hunters from around the world.",
        category: "running",
        status: "upcoming",
        difficulty: "advanced",
        startDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 14), // 14 days from now
        endDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 14), // Same day
        location: "Central Park, New York",
        isVirtual: false,
        maxParticipants: 500,
        currentParticipants: 342,
        xpReward: 1500,
        image: "/placeholder.svg?height=300&width=600",
      },
      {
        id: "e5",
        title: "100 Push-up Challenge",
        description: "Can you do 100 push-ups in a single day? Join this challenge and push your limits!",
        category: "challenge",
        status: "active",
        difficulty: "intermediate",
        startDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
        endDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 6), // 6 days from now
        isVirtual: true,
        currentParticipants: 412,
        xpReward: 300,
        image: "/placeholder.svg?height=300&width=600",
        isRegistered: true,
        progress: 65,
        maxProgress: 100,
        leaderboard: [
          {
            id: "p1",
            name: "ShadowMonarch",
            avatar: "/placeholder.svg?height=100&width=100",
            rank: "S",
            progress: 100,
          },
          { id: "p2", name: "BerserkHunter", avatar: "/placeholder.svg?height=100&width=100", rank: "S", progress: 95 },
          { id: "p3", name: "IronWill", avatar: "/placeholder.svg?height=100&width=100", rank: "A", progress: 90 },
          { id: "p4", name: "PhantomBlade", avatar: "/placeholder.svg?height=100&width=100", rank: "A", progress: 85 },
          { id: "p5", name: "FrostQueen", avatar: "/placeholder.svg?height=100&width=100", rank: "A", progress: 80 },
        ],
      },
      {
        id: "e6",
        title: "Winter Warrior Challenge",
        description:
          "Brave the cold and complete outdoor workouts during the winter months. Extra XP for workouts in snow!",
        category: "challenge",
        status: "completed",
        difficulty: "advanced",
        startDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 60), // 60 days ago
        endDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
        isVirtual: true,
        currentParticipants: 156,
        xpReward: 1200,
        image: "/placeholder.svg?height=300&width=600",
        isRegistered: true,
        progress: 12,
        maxProgress: 15,
        leaderboard: [
          { id: "p1", name: "ShadowMonarch", avatar: "/placeholder.svg?height=100&width=100", rank: "S", progress: 15 },
          { id: "p2", name: "FrostQueen", avatar: "/placeholder.svg?height=100&width=100", rank: "A", progress: 15 },
          { id: "p3", name: "BerserkHunter", avatar: "/placeholder.svg?height=100&width=100", rank: "S", progress: 14 },
          { id: "p4", name: "IronWill", avatar: "/placeholder.svg?height=100&width=100", rank: "A", progress: 13 },
          { id: "p5", name: "PhantomBlade", avatar: "/placeholder.svg?height=100&width=100", rank: "A", progress: 12 },
        ],
      },
    ]

    setEvents(mockEvents)
  }, [])

  // Filter events based on active category and search query
  const filteredEvents = events.filter((event) => {
    const matchesCategory = activeCategory === "all" || event.category === activeCategory
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "date") {
      return a.startDate.getTime() - b.startDate.getTime()
    }

    if (sortBy === "popularity") {
      return b.currentParticipants - a.currentParticipants
    }

    if (sortBy === "difficulty") {
      const difficultyOrder = { beginner: 0, "all-levels": 1, intermediate: 2, advanced: 3 }
      return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]
    }

    return 0
  })

  // Get difficulty color
  const getDifficultyColor = (difficulty: EventDifficulty) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500"
      case "intermediate":
        return "bg-yellow-500"
      case "advanced":
        return "bg-red-500"
      case "all-levels":
        return "bg-blue-500"
    }
  }

  // Get status color
  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case "upcoming":
        return "text-blue-400"
      case "active":
        return "text-green-400"
      case "completed":
        return "text-gray-400"
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

  // Calculate days remaining
  const getDaysRemaining = (endDate: Date) => {
    const now = new Date()
    const diffTime = endDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Handle event registration
  const registerForEvent = (event: FitnessEvent) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === event.id ? { ...e, isRegistered: true, currentParticipants: e.currentParticipants + 1 } : e,
      ),
    )
    setShowEventDialog(false)
  }

  // Handle updating progress
  const updateProgress = (event: FitnessEvent, progress: number) => {
    setEvents((prev) => prev.map((e) => (e.id === event.id ? { ...e, progress } : e)))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Fitness Events & Tournaments
        </h2>
        <p className="text-gray-300">Join events, compete with other hunters, and earn exclusive rewards</p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search events..."
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
                {sortBy === "date" && "Date"}
                {sortBy === "popularity" && "Popularity"}
                {sortBy === "difficulty" && "Difficulty"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy("date")}>Date</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("popularity")}>Popularity</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("difficulty")}>Difficulty</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Event Categories */}
      <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as EventCategory)}>
        <TabsList className="w-full grid grid-cols-5 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="running">Running</TabsTrigger>
          <TabsTrigger value="strength">Strength</TabsTrigger>
          <TabsTrigger value="yoga">Yoga</TabsTrigger>
          <TabsTrigger value="challenge">Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="mt-0">
          <div className="space-y-6">
            <AnimatePresence>
              {sortedEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden"
                  onClick={() => {
                    setSelectedEvent(event)
                    setShowEventDialog(true)
                    setShowLeaderboard(false)
                  }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium text-white capitalize bg-gray-900/80">
                        {event.category}
                      </div>
                      <div
                        className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(event.status)} bg-gray-900/80`}
                      >
                        {event.status}
                      </div>
                    </div>

                    <div className="p-4 md:p-6 flex-1">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                        </div>

                        {event.isRegistered && event.status !== "completed" && (
                          <div className="mt-2 md:mt-0 md:ml-4 flex-shrink-0">
                            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                              Registered
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                          <span>{formatDate(event.startDate)}</span>
                        </div>

                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-purple-400" />
                          <span>
                            {event.status === "upcoming" && `Starts in ${getDaysRemaining(event.startDate)} days`}
                            {event.status === "active" && `Ends in ${getDaysRemaining(event.endDate)} days`}
                            {event.status === "completed" && "Completed"}
                          </span>
                        </div>

                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-purple-400" />
                          <span>{event.currentParticipants} participants</span>
                        </div>

                        <div className="flex items-center text-sm">
                          <div className={`w-3 h-3 rounded-full ${getDifficultyColor(event.difficulty)} mr-2`}></div>
                          <span className="capitalize">{event.difficulty}</span>
                        </div>
                      </div>

                      {event.isRegistered && event.progress !== undefined && event.maxProgress !== undefined && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Your Progress</span>
                            <span>
                              {event.progress} / {event.maxProgress}
                            </span>
                          </div>
                          <Progress value={(event.progress / event.maxProgress) * 100} className="h-2 bg-gray-700" />
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
                          <span className="text-yellow-400">{event.xpReward} XP</span>
                        </div>

                        <Button
                          variant="ghost"
                          className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                        >
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {sortedEvents.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>No events found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Event Detail Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="bg-gray-900 border-purple-500/30 text-white max-w-3xl">
          {selectedEvent && !showLeaderboard && (
            <>
              <div className="relative h-48 -mx-6 -mt-6 overflow-hidden">
                <img
                  src={selectedEvent.image || "/placeholder.svg"}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center justify-between">
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium text-white capitalize ${getStatusColor(selectedEvent.status)} bg-gray-900/80`}
                    >
                      {selectedEvent.status}
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium text-white capitalize bg-gray-900/80`}>
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${getDifficultyColor(selectedEvent.difficulty)} mr-1`}
                        ></div>
                        <span>{selectedEvent.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DialogHeader className="mt-2">
                <DialogTitle className="text-2xl font-bold">{selectedEvent.title}</DialogTitle>
                <DialogDescription className="text-gray-300">{selectedEvent.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-sm text-gray-400 mb-1">Start Date</div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{formatDate(selectedEvent.startDate)}</span>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-sm text-gray-400 mb-1">End Date</div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{formatDate(selectedEvent.endDate)}</span>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-sm text-gray-400 mb-1">Participants</div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-purple-400" />
                      <span>
                        {selectedEvent.currentParticipants}
                        {selectedEvent.maxParticipants && ` / ${selectedEvent.maxParticipants}`}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-sm text-gray-400 mb-1">Location</div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{selectedEvent.location || (selectedEvent.isVirtual ? "Virtual Event" : "TBA")}</span>
                    </div>
                  </div>
                </div>

                {selectedEvent.isRegistered &&
                  selectedEvent.progress !== undefined &&
                  selectedEvent.maxProgress !== undefined && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Your Progress</span>
                        <span>
                          {selectedEvent.progress} / {selectedEvent.maxProgress}
                        </span>
                      </div>
                      <Progress
                        value={(selectedEvent.progress / selectedEvent.maxProgress) * 100}
                        className="h-3 bg-gray-700"
                      />
                    </div>
                  )}

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Rewards</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Trophy className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="text-yellow-400">{selectedEvent.xpReward} XP</span>
                    </div>

                    <div className="flex items-center">
                      <Medal className="h-5 w-5 text-purple-400 mr-1" />
                      <span className="text-purple-400">Event Badge</span>
                    </div>

                    {selectedEvent.category === "challenge" && (
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-orange-400 mr-1" />
                        <span className="text-orange-400">Special Title</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedEvent.leaderboard && selectedEvent.leaderboard.length > 0 && (
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold">Leaderboard</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                        onClick={() => setShowLeaderboard(true)}
                      >
                        View Full Leaderboard
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {selectedEvent.leaderboard.slice(0, 3).map((participant, index) => (
                        <div key={participant.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-6 h-6 flex items-center justify-center font-bold mr-2">{index + 1}</div>
                            <img
                              src={participant.avatar || "/placeholder.svg"}
                              alt={participant.name}
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <div>
                              <div className="flex items-center">
                                <span className="font-medium">{participant.name}</span>
                                <span className="ml-1 text-xs px-1 rounded bg-purple-500 text-white">
                                  {participant.rank}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="font-medium">
                            {participant.progress} {selectedEvent.maxProgress ? `/ ${selectedEvent.maxProgress}` : ""}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                {!selectedEvent.isRegistered && selectedEvent.status !== "completed" && (
                  <Button
                    className="bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600"
                    onClick={() => registerForEvent(selectedEvent)}
                  >
                    Register Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}

                {selectedEvent.isRegistered && selectedEvent.status === "active" && (
                  <Button
                    className="bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-600 hover:to-emerald-600"
                    onClick={() => {
                      if (selectedEvent.progress !== undefined && selectedEvent.maxProgress !== undefined) {
                        updateProgress(selectedEvent, Math.min(selectedEvent.progress + 1, selectedEvent.maxProgress))
                      }
                    }}
                  >
                    Update Progress <Flame className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </>
          )}

          {selectedEvent && showLeaderboard && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center">
                  <Trophy className="h-6 w-6 text-yellow-400 mr-2" />
                  Leaderboard
                </DialogTitle>
                <DialogDescription className="text-gray-300">{selectedEvent.title}</DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {selectedEvent.leaderboard?.map((participant, index) => (
                    <div
                      key={participant.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        index < 3 ? "bg-purple-900/20 border border-purple-500/30" : "bg-gray-800/30"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 flex items-center justify-center font-bold mr-3 rounded-full ${
                            index === 0
                              ? "bg-yellow-500/20 text-yellow-400"
                              : index === 1
                                ? "bg-gray-400/20 text-gray-300"
                                : index === 2
                                  ? "bg-orange-500/20 text-orange-400"
                                  : "bg-gray-700/50 text-gray-400"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <img
                          src={participant.avatar || "/placeholder.svg"}
                          alt={participant.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium">{participant.name}</span>
                            <span className="ml-1 text-xs px-1 rounded bg-purple-500 text-white">
                              {participant.rank}
                            </span>
                          </div>
                          {index < 3 && (
                            <div className="text-xs text-gray-400">
                              {index === 0 ? "Gold Trophy" : index === 1 ? "Silver Trophy" : "Bronze Trophy"}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="font-medium text-lg">
                        {participant.progress} {selectedEvent.maxProgress ? `/ ${selectedEvent.maxProgress}` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  onClick={() => setShowLeaderboard(false)}
                >
                  Back to Event Details
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

