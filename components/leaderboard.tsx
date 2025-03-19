"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Crown, Star, Shield, Zap, Award, Medal } from "lucide-react"

// Types for our leaderboard data
type LeaderboardPeriod = "weekly" | "monthly" | "allTime"

interface LeaderboardUser {
  id: string
  name: string
  rank: string
  level: number
  xp: number
  title: string
  avatar: string
  change?: number // Position change since last period
  achievements: string[]
}

export function Leaderboard() {
  const [period, setPeriod] = useState<LeaderboardPeriod>("weekly")
  const [users, setUsers] = useState<LeaderboardUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const leaderboardRef = useRef<HTMLDivElement>(null)

  // Mock data for demonstration
  const mockWeeklyData: LeaderboardUser[] = [
    {
      id: "1",
      name: "ShadowMonarch",
      rank: "S",
      level: 145,
      xp: 145750,
      title: "Sovereign",
      avatar: "/placeholder.svg?height=100&width=100",
      change: 0,
      achievements: ["Gate Clearer", "Boss Hunter", "Shadow Army"],
    },
    {
      id: "2",
      name: "BerserkHunter",
      rank: "S",
      level: 132,
      xp: 132480,
      title: "National Hunter",
      avatar: "/placeholder.svg?height=100&width=100",
      change: 2,
      achievements: ["Gate Clearer", "Dungeon Master"],
    },
    {
      id: "3",
      name: "IronWill",
      rank: "A",
      level: 118,
      xp: 118320,
      title: "Elite Hunter",
      avatar: "/placeholder.svg?height=100&width=100",
      change: -1,
      achievements: ["Endurance King", "Daily Streak"],
    },
    {
      id: "4",
      name: "PhantomBlade",
      rank: "A",
      level: 105,
      xp: 105600,
      title: "Blade Master",
      avatar: "/placeholder.svg?height=100&width=100",
      change: -1,
      achievements: ["Weapon Master", "Speed Demon"],
    },
    {
      id: "5",
      name: "FrostQueen",
      rank: "A",
      level: 98,
      xp: 98450,
      title: "Ice Hunter",
      avatar: "/placeholder.svg?height=100&width=100",
      change: 3,
      achievements: ["Cold Resistance", "Elemental Master"],
    },
    {
      id: "6",
      name: "ThunderFist",
      rank: "B",
      level: 87,
      xp: 87200,
      title: "Storm Bringer",
      avatar: "/placeholder.svg?height=100&width=100",
      change: 0,
      achievements: ["Lightning Fast", "Power Surge"],
    },
    {
      id: "7",
      name: "SteelHeart",
      rank: "B",
      level: 76,
      xp: 76800,
      title: "Tank",
      avatar: "/placeholder.svg?height=100&width=100",
      change: 5,
      achievements: ["Unbreakable", "Strength Master"],
    },
  ]

  const mockMonthlyData: LeaderboardUser[] = [
    {
      id: "1",
      name: "ShadowMonarch",
      rank: "S",
      level: 145,
      xp: 545750,
      title: "Sovereign",
      avatar: "/placeholder.svg?height=100&width=100",
      change: 0,
      achievements: ["Gate Clearer", "Boss Hunter", "Shadow Army"],
    },
    {
      id: "3",
      name: "IronWill",
      rank: "A",
      level: 118,
      xp: 498320,
      title: "Elite Hunter",
      avatar: "/placeholder.svg?height=100&width=100",
      change: 1,
      achievements: ["Endurance King", "Daily Streak"],
    },
    {
      id: "2",
      name: "BerserkHunter",
      rank: "S",
      level: 132,
      xp: 482480,
      title: "National Hunter",
      avatar: "/placeholder.svg?height=100&width=100",
      change: -1,
      achievements: ["Gate Clearer", "Dungeon Master"],
    },
    {
      id: "5",
      name: "FrostQueen",
      rank: "A",
      level: 98,
      xp: 398450,
      title: "Ice Hunter",
      avatar: "/placeholder.svg?height=100&width=100",
      change: 1,
      achievements: ["Cold Resistance", "Elemental Master"],
    },
    {
      id: "4",
      name: "PhantomBlade",
      rank: "A",
      level: 105,
      xp: 375600,
      title: "Blade Master",
      avatar: "/placeholder.svg?height=100&width=100",
      change: -1,
      achievements: ["Weapon Master", "Speed Demon"],
    },
    {
      id: "8",
      name: "DragonSlayer",
      rank: "B",
      level: 72,
      xp: 322100,
      title: "Beast Hunter",
      avatar: "/placeholder.svg?height=100&width=100",
      change: 3,
      achievements: ["Monster Killer", "Raid Leader"],
    },
    {
      id: "6",
      name: "ThunderFist",
      rank: "B",
      level: 87,
      xp: 287200,
      title: "Storm Bringer",
      avatar: "/placeholder.svg?height=100&width=100",
      change: -1,
      achievements: ["Lightning Fast", "Power Surge"],
    },
  ]

  const mockAllTimeData: LeaderboardUser[] = [
    {
      id: "1",
      name: "ShadowMonarch",
      rank: "S",
      level: 145,
      xp: 2145750,
      title: "Sovereign",
      avatar: "/placeholder.svg?height=100&width=100",
      achievements: ["Gate Clearer", "Boss Hunter", "Shadow Army"],
    },
    {
      id: "9",
      name: "EternalFlame",
      rank: "S",
      level: 140,
      xp: 1987650,
      title: "Fire Lord",
      avatar: "/placeholder.svg?height=100&width=100",
      achievements: ["Burn It All", "Phoenix Rising", "Heat Resistant"],
    },
    {
      id: "2",
      name: "BerserkHunter",
      rank: "S",
      level: 132,
      xp: 1832480,
      title: "National Hunter",
      avatar: "/placeholder.svg?height=100&width=100",
      achievements: ["Gate Clearer", "Dungeon Master"],
    },
    {
      id: "3",
      name: "IronWill",
      rank: "A",
      level: 118,
      xp: 1618320,
      title: "Elite Hunter",
      avatar: "/placeholder.svg?height=100&width=100",
      achievements: ["Endurance King", "Daily Streak"],
    },
    {
      id: "10",
      name: "SilentAssassin",
      rank: "S",
      level: 128,
      xp: 1528900,
      title: "Shadow Walker",
      avatar: "/placeholder.svg?height=100&width=100",
      achievements: ["Stealth Master", "Perfect Strike", "Unseen"],
    },
    {
      id: "4",
      name: "PhantomBlade",
      rank: "A",
      level: 105,
      xp: 1405600,
      title: "Blade Master",
      avatar: "/placeholder.svg?height=100&width=100",
      achievements: ["Weapon Master", "Speed Demon"],
    },
    {
      id: "5",
      name: "FrostQueen",
      rank: "A",
      level: 98,
      xp: 1298450,
      title: "Ice Hunter",
      avatar: "/placeholder.svg?height=100&width=100",
      achievements: ["Cold Resistance", "Elemental Master"],
    },
  ]

  // Load data based on selected period
  useEffect(() => {
    setIsLoading(true)

    // Simulate API call with timeout
    const timer = setTimeout(() => {
      switch (period) {
        case "weekly":
          setUsers(mockWeeklyData)
          break
        case "monthly":
          setUsers(mockMonthlyData)
          break
        case "allTime":
          setUsers(mockAllTimeData)
          break
      }
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [period])

  // Animation for rank changes
  useEffect(() => {
    if (!isLoading && leaderboardRef.current) {
      // Highlight rows with position changes
      const rows = leaderboardRef.current.querySelectorAll(".leaderboard-row")

      rows.forEach((row, index) => {
        const user = users[index]
        if (user.change && user.change !== 0) {
          gsap.fromTo(
            row,
            {
              backgroundColor: user.change > 0 ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)",
            },
            {
              backgroundColor: "transparent",
              duration: 1.5,
              delay: index * 0.1,
            },
          )
        }
      })

      // Animate XP bars
      const xpBars = leaderboardRef.current.querySelectorAll(".xp-bar-fill")
      gsap.fromTo(
        xpBars,
        { width: 0 },
        {
          width: "100%",
          duration: 1.2,
          stagger: 0.1,
          ease: "power2.out",
        },
      )
    }
  }, [users, isLoading])

  // Format XP with commas
  const formatXP = (xp: number) => {
    return xp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  // Get rank color
  const getRankColor = (rank: string) => {
    switch (rank) {
      case "S":
        return "from-purple-500 to-blue-500"
      case "A":
        return "from-red-500 to-orange-500"
      case "B":
        return "from-blue-500 to-cyan-500"
      case "C":
        return "from-green-500 to-emerald-500"
      case "D":
        return "from-yellow-500 to-amber-500"
      case "E":
        return "from-gray-500 to-slate-500"
      default:
        return "from-gray-500 to-slate-500"
    }
  }

  // Get rank icon
  const getRankIcon = (rank: string) => {
    switch (rank) {
      case "S":
        return <Crown className="h-5 w-5 text-yellow-400" />
      case "A":
        return <Trophy className="h-5 w-5 text-orange-400" />
      case "B":
        return <Star className="h-5 w-5 text-blue-400" />
      case "C":
        return <Shield className="h-5 w-5 text-green-400" />
      case "D":
        return <Zap className="h-5 w-5 text-yellow-400" />
      case "E":
        return <Medal className="h-5 w-5 text-gray-400" />
      default:
        return <Award className="h-5 w-5 text-gray-400" />
    }
  }

  // Get change indicator
  const getChangeIndicator = (change?: number) => {
    if (!change || change === 0) return null

    return (
      <span className={`text-xs font-medium flex items-center ${change > 0 ? "text-green-500" : "text-red-500"}`}>
        {change > 0 ? "↑" : "↓"} {Math.abs(change)}
      </span>
    )
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-purple-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Hunter Rankings
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            The strongest hunters rise to the top. Earn XP through workouts and challenges to climb the ranks.
          </p>
        </motion.div>

        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 shadow-[0_0_30px_rgba(124,58,237,0.2)] p-6">
          <Tabs
            defaultValue="weekly"
            className="w-full"
            onValueChange={(value) => setPeriod(value as LeaderboardPeriod)}
          >
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-black/50">
                <TabsTrigger value="weekly" className="data-[state=active]:bg-purple-900/50">
                  Weekly
                </TabsTrigger>
                <TabsTrigger value="monthly" className="data-[state=active]:bg-purple-900/50">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="allTime" className="data-[state=active]:bg-purple-900/50">
                  All Time
                </TabsTrigger>
              </TabsList>

              <div className="hidden md:flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-400">Rank Up</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-gray-400">Rank Down</span>
                </div>
              </div>
            </div>

            <TabsContent value="weekly" className="mt-0">
              <LeaderboardContent
                users={users}
                isLoading={isLoading}
                leaderboardRef={leaderboardRef}
                getRankColor={getRankColor}
                getRankIcon={getRankIcon}
                getChangeIndicator={getChangeIndicator}
                formatXP={formatXP}
                period="weekly"
              />
            </TabsContent>

            <TabsContent value="monthly" className="mt-0">
              <LeaderboardContent
                users={users}
                isLoading={isLoading}
                leaderboardRef={leaderboardRef}
                getRankColor={getRankColor}
                getRankIcon={getRankIcon}
                getChangeIndicator={getChangeIndicator}
                formatXP={formatXP}
                period="monthly"
              />
            </TabsContent>

            <TabsContent value="allTime" className="mt-0">
              <LeaderboardContent
                users={users}
                isLoading={isLoading}
                leaderboardRef={leaderboardRef}
                getRankColor={getRankColor}
                getRankIcon={getRankIcon}
                getChangeIndicator={getChangeIndicator}
                formatXP={formatXP}
                period="allTime"
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-8 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-6 rounded-lg text-lg font-bold shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_rgba(124,58,237,0.8)] transition-all duration-300"
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  )
}

interface LeaderboardContentProps {
  users: LeaderboardUser[]
  isLoading: boolean
  leaderboardRef: React.RefObject<HTMLDivElement>
  getRankColor: (rank: string) => string
  getRankIcon: (rank: string) => JSX.Element
  getChangeIndicator: (change?: number) => JSX.Element | null
  formatXP: (xp: number) => string
  period: LeaderboardPeriod
}

function LeaderboardContent({
  users,
  isLoading,
  leaderboardRef,
  getRankColor,
  getRankIcon,
  getChangeIndicator,
  formatXP,
  period,
}: LeaderboardContentProps) {
  // Find max XP for percentage calculation
  const maxXP = users.length > 0 ? Math.max(...users.map((user) => user.xp)) : 0

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-10 bg-purple-700/50 rounded-full mb-4"></div>
          <div className="h-4 w-40 bg-purple-700/50 rounded mb-2"></div>
          <div className="h-3 w-24 bg-purple-700/30 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div ref={leaderboardRef} className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-purple-500/20">
            <th className="pb-4 text-gray-400 font-medium">Rank</th>
            <th className="pb-4 text-gray-400 font-medium">Hunter</th>
            <th className="pb-4 text-gray-400 font-medium hidden md:table-cell">Title</th>
            <th className="pb-4 text-gray-400 font-medium text-right">Level</th>
            <th className="pb-4 text-gray-400 font-medium text-right">XP</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="leaderboard-row border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors"
              >
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-8 text-center font-bold text-gray-300 mr-2">
                      {index + 1}
                      {getChangeIndicator(user.change)}
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${getRankColor(user.rank)} flex items-center justify-center`}
                    >
                      {getRankIcon(user.rank)}
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-purple-500/30">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-white">{user.name}</div>
                      <div className="text-xs text-gray-400 md:hidden">{user.title}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 hidden md:table-cell">
                  <span className="px-2 py-1 rounded-md bg-purple-900/30 text-sm font-medium text-purple-300">
                    {user.title}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <div className="font-bold text-white">Lv. {user.level}</div>
                  <div className="text-xs text-gray-400">{user.rank}-Rank</div>
                </td>
                <td className="py-4 text-right">
                  <div className="font-bold text-white">{formatXP(user.xp)}</div>
                  <div className="w-24 h-1.5 bg-gray-800 rounded-full ml-auto mt-1 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getRankColor(user.rank)} rounded-full xp-bar-fill`}
                      style={{ width: `${(user.xp / maxXP) * 100}%` }}
                    ></div>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>

      {users.length === 0 && <div className="py-10 text-center text-gray-400">No hunters found for this period.</div>}

      <div className="mt-6 text-center text-sm text-gray-400">
        {period === "weekly" && "Rankings reset every Monday at 00:00 UTC"}
        {period === "monthly" && "Rankings reset on the 1st of each month at 00:00 UTC"}
        {period === "allTime" && "All-time rankings since the gates first appeared"}
      </div>
    </div>
  )
}

