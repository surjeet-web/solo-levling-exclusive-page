"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  Crown,
  Hash,
  Headphones,
  MessageSquarePlus,
  Pin,
  Plus,
  Settings,
  Volume2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { ChannelType } from "./guild-chat"

interface GuildSidebarProps {
  channels: ChannelType[]
  activeChannel: ChannelType | null
  setActiveChannel: (channel: ChannelType) => void
}

export function GuildSidebar({ channels, activeChannel, setActiveChannel }: GuildSidebarProps) {
  const [showChannels, setShowChannels] = useState(true)
  const [showVoice, setShowVoice] = useState(true)

  // Filter channels by type
  const textChannels = channels.filter((channel) => channel.type === "text" || channel.type === "announcement")
  const voiceChannels = channels.filter((channel) => channel.type === "voice")

  return (
    <div className="w-64 h-full bg-black/40 flex flex-col">
      {/* Guild Header */}
      <div className="h-16 min-h-16 flex items-center justify-between px-4 border-b border-purple-900/30">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mr-2">
            <Crown className="h-4 w-4 text-yellow-400" />
          </div>
          <h1 className="font-bold text-lg">Shadow Hunters</h1>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Settings className="h-5 w-5 text-gray-400" />
        </Button>
      </div>

      {/* Guild Content */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4 scrollbar-thin scrollbar-thumb-purple-900/50 scrollbar-track-transparent">
        {/* Pinned Messages */}
        <div className="p-2 rounded-lg bg-purple-900/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-sm font-medium text-gray-300">
              <Pin className="h-4 w-4 mr-1" />
              <span>Pinned Announcements</span>
            </div>
          </div>
          <div className="text-sm text-gray-400 pl-5">
            <p>• Guild raid this Saturday</p>
            <p>• New dungeon unlocked!</p>
          </div>
        </div>

        {/* Text Channels */}
        <Collapsible open={showChannels} onOpenChange={setShowChannels}>
          <div className="flex items-center justify-between px-1 mb-1">
            <CollapsibleTrigger asChild>
              <button className="flex items-center text-xs font-medium text-gray-400 hover:text-white">
                {showChannels ? <ChevronDown className="h-3 w-3 mr-1" /> : <ChevronRight className="h-3 w-3 mr-1" />}
                TEXT CHANNELS
              </button>
            </CollapsibleTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                    <Plus className="h-3 w-3 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create Channel</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <CollapsibleContent>
            <div className="space-y-1 pl-2">
              {textChannels.map((channel) => (
                <button
                  key={channel.id}
                  className={`w-full flex items-center justify-between px-2 py-1 rounded text-sm hover:bg-purple-900/30 ${
                    activeChannel?.id === channel.id ? "bg-purple-900/40 text-white" : "text-gray-400"
                  }`}
                  onClick={() => setActiveChannel(channel)}
                >
                  <div className="flex items-center">
                    {channel.type === "announcement" ? (
                      <MessageSquarePlus className="h-4 w-4 mr-1 text-yellow-500" />
                    ) : (
                      <Hash className="h-4 w-4 mr-1" />
                    )}
                    <span>{channel.name}</span>
                  </div>

                  {channel.unreadCount && channel.unreadCount > 0 && (
                    <div className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {channel.unreadCount}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Voice Channels */}
        <Collapsible open={showVoice} onOpenChange={setShowVoice}>
          <div className="flex items-center justify-between px-1 mb-1">
            <CollapsibleTrigger asChild>
              <button className="flex items-center text-xs font-medium text-gray-400 hover:text-white">
                {showVoice ? <ChevronDown className="h-3 w-3 mr-1" /> : <ChevronRight className="h-3 w-3 mr-1" />}
                VOICE CHANNELS
              </button>
            </CollapsibleTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                    <Plus className="h-3 w-3 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create Voice Channel</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <CollapsibleContent>
            <div className="space-y-1 pl-2">
              {voiceChannels.map((channel) => (
                <button
                  key={channel.id}
                  className={`w-full flex items-center justify-between px-2 py-1 rounded text-sm hover:bg-purple-900/30 ${
                    activeChannel?.id === channel.id ? "bg-purple-900/40 text-white" : "text-gray-400"
                  }`}
                  onClick={() => setActiveChannel(channel)}
                >
                  <div className="flex items-center">
                    <Volume2 className="h-4 w-4 mr-1" />
                    <span>{channel.name}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Headphones className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">2</span>
                  </div>
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* User Controls */}
      <div className="h-14 min-h-14 flex items-center justify-between px-3 bg-black/60">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 mr-2 overflow-hidden">
            <img src="/placeholder.svg?height=100&width=100" alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-sm font-medium flex items-center">
              ShadowMonarch
              <span className="ml-1 text-xs px-1 rounded bg-purple-500 text-white">S</span>
            </div>
            <div className="text-xs text-green-500">Online</div>
          </div>
        </div>

        <div className="flex space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                  <Settings className="h-4 w-4 text-gray-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>User Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}

