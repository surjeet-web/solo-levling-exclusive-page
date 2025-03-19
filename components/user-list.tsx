"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Crown, Headphones, Mic, MicOff, Shield, User, Volume2, VolumeX, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { GuildMemberType } from "./guild-chat"

interface UserListProps {
  members: GuildMemberType[]
  onClose: () => void
}

export function UserList({ members, onClose }: UserListProps) {
  const [showOnline, setShowOnline] = useState(true)
  const [showOffline, setShowOffline] = useState(false)

  // Filter members by status
  const onlineMembers = members.filter(
    (member) => member.status === "online" || member.status === "away" || member.status === "dnd",
  )
  const offlineMembers = members.filter((member) => member.status === "offline")

  // Sort members by role and then by name
  const sortedOnlineMembers = [...onlineMembers].sort((a, b) => {
    if (a.role === "leader" && b.role !== "leader") return -1
    if (a.role !== "leader" && b.role === "leader") return 1
    if (a.role === "officer" && b.role === "member") return -1
    if (a.role === "member" && b.role === "officer") return 1
    return a.name.localeCompare(b.name)
  })

  const sortedOfflineMembers = [...offlineMembers].sort((a, b) => {
    if (a.role === "leader" && b.role !== "leader") return -1
    if (a.role !== "leader" && b.role === "leader") return 1
    if (a.role === "officer" && b.role === "member") return -1
    if (a.role === "member" && b.role === "officer") return 1
    return a.name.localeCompare(b.name)
  })

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "dnd":
        return "bg-red-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get role icon
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "leader":
        return <Crown className="h-3 w-3 text-yellow-400" />
      case "officer":
        return <Shield className="h-3 w-3 text-blue-400" />
      case "member":
        return <User className="h-3 w-3 text-gray-400" />
      default:
        return <User className="h-3 w-3 text-gray-400" />
    }
  }

  // Get rank color
  const getRankColor = (rank: string) => {
    switch (rank) {
      case "S":
        return "bg-purple-500"
      case "A":
        return "bg-red-500"
      case "B":
        return "bg-blue-500"
      case "C":
        return "bg-green-500"
      case "D":
        return "bg-yellow-500"
      case "E":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="w-64 h-full bg-black/40 flex flex-col">
      {/* Header */}
      <div className="h-16 min-h-16 flex items-center justify-between px-4 border-b border-purple-900/30">
        <h2 className="font-bold">Members — {members.length}</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full md:hidden" onClick={onClose}>
          <X className="h-5 w-5 text-gray-400" />
        </Button>
      </div>

      {/* Member List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4 scrollbar-thin scrollbar-thumb-purple-900/50 scrollbar-track-transparent">
        {/* Online Members */}
        <Collapsible open={showOnline} onOpenChange={setShowOnline}>
          <div className="flex items-center justify-between px-1 mb-1">
            <CollapsibleTrigger asChild>
              <button className="flex items-center text-xs font-medium text-gray-400 hover:text-white">
                {showOnline ? (
                  <ChevronRight className="h-3 w-3 mr-1 transform rotate-90" />
                ) : (
                  <ChevronRight className="h-3 w-3 mr-1" />
                )}
                ONLINE — {onlineMembers.length}
              </button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <div className="space-y-1">
              {sortedOnlineMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-purple-900/30 group"
                >
                  <div className="flex items-center">
                    <div className="relative mr-2">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black ${getStatusColor(member.status)}`}
                      ></div>
                    </div>

                    <div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{member.name}</span>
                        <span className={`ml-1 text-xs px-1 rounded text-white ${getRankColor(member.rank)}`}>
                          {member.rank}
                        </span>
                      </div>

                      <div className="flex items-center text-xs text-gray-400">
                        {getRoleIcon(member.role)}
                        <span className="ml-1">Lv. {member.level}</span>
                        {member.isTyping && (
                          <span className="ml-2 text-green-400 flex items-center">
                            typing
                            <span className="ml-1 flex space-x-0.5">
                              <motion.div
                                className="w-1 h-1 bg-green-400 rounded-full"
                                animate={{ y: [0, -2, 0] }}
                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0 }}
                              />
                              <motion.div
                                className="w-1 h-1 bg-green-400 rounded-full"
                                animate={{ y: [0, -2, 0] }}
                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.2 }}
                              />
                              <motion.div
                                className="w-1 h-1 bg-green-400 rounded-full"
                                animate={{ y: [0, -2, 0] }}
                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.4 }}
                              />
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Voice indicators */}
                  {member.inVoiceChannel && (
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {member.isMuted ? (
                        <MicOff className="h-3 w-3 text-red-500" />
                      ) : (
                        <Mic className="h-3 w-3 text-green-500" />
                      )}

                      {member.isDeafened ? (
                        <VolumeX className="h-3 w-3 text-red-500" />
                      ) : (
                        <Volume2 className="h-3 w-3 text-green-500" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Offline Members */}
        <Collapsible open={showOffline} onOpenChange={setShowOffline}>
          <div className="flex items-center justify-between px-1 mb-1">
            <CollapsibleTrigger asChild>
              <button className="flex items-center text-xs font-medium text-gray-400 hover:text-white">
                {showOffline ? (
                  <ChevronRight className="h-3 w-3 mr-1 transform rotate-90" />
                ) : (
                  <ChevronRight className="h-3 w-3 mr-1" />
                )}
                OFFLINE — {offlineMembers.length}
              </button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <div className="space-y-1">
              {sortedOfflineMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center px-2 py-1.5 rounded hover:bg-purple-900/30 opacity-70"
                >
                  <div className="flex items-center">
                    <div className="relative mr-2">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="w-8 h-8 rounded-full grayscale"
                      />
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black ${getStatusColor(member.status)}`}
                      ></div>
                    </div>

                    <div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{member.name}</span>
                        <span className={`ml-1 text-xs px-1 rounded text-white ${getRankColor(member.rank)}`}>
                          {member.rank}
                        </span>
                      </div>

                      <div className="flex items-center text-xs text-gray-400">
                        {getRoleIcon(member.role)}
                        <span className="ml-1">Lv. {member.level}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Voice Channel Info */}
      <div className="p-3 bg-purple-900/20 m-2 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-sm font-medium">
            <Volume2 className="h-4 w-4 mr-1 text-green-500" />
            <span>voice-general</span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
            <Headphones className="h-3 w-3 text-gray-400" />
          </Button>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="PhantomBlade"
                className="w-6 h-6 rounded-full mr-1"
              />
              <span>PhantomBlade</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mic className="h-3 w-3 text-green-500" />
              <Volume2 className="h-3 w-3 text-green-500" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <img src="/placeholder.svg?height=100&width=100" alt="SteelHeart" className="w-6 h-6 rounded-full mr-1" />
              <span>SteelHeart</span>
            </div>
            <div className="flex items-center space-x-1">
              <MicOff className="h-3 w-3 text-red-500" />
              <Volume2 className="h-3 w-3 text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

