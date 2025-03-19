"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EmojiPickerProps {
  onSelect: (emoji: string) => void
}

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const [activeTab, setActiveTab] = useState("recent")

  // Common emoji categories
  const recentEmojis = ["👍", "❤️", "🔥", "👏", "🎉", "🙏", "💯", "😂", "😊", "🤔"]
  const reactionsEmojis = [
    "👍",
    "❤️",
    "🔥",
    "👏",
    "🎉",
    "🙏",
    "💯",
    "😂",
    "😊",
    "🤔",
    "😍",
    "🥰",
    "😘",
    "😭",
    "😅",
    "😁",
    "🤣",
    "😎",
    "🙄",
    "😬",
    "😴",
    "🤩",
    "😇",
    "🥳",
    "🤯",
    "🧠",
  ]
  const gamingEmojis = [
    "🎮",
    "🎯",
    "🎲",
    "🎪",
    "🎭",
    "🎨",
    "🧩",
    "🎪",
    "🎯",
    "🎲",
    "🎮",
    "🎭",
    "🎨",
    "🧩",
    "🏆",
    "🥇",
    "🥈",
    "🥉",
    "🏅",
    "🎖️",
    "🎗️",
    "🎟️",
  ]
  const fitnessEmojis = [
    "💪",
    "🏋️‍♀️",
    "🏋️‍♂️",
    "🏃‍♀️",
    "🏃‍♂️",
    "🧘‍♀️",
    "🧘‍♂️",
    "🏄‍♀️",
    "🏄‍♂️",
    "🚴‍♀️",
    "🚴‍♂️",
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🥎",
    "🎾",
    "🏐",
    "🏉",
    "🥏",
  ]

  return (
    <div className="w-64 bg-gray-900 rounded-lg shadow-lg border border-purple-900/30 overflow-hidden">
      <Tabs defaultValue="recent" onValueChange={setActiveTab}>
        <TabsList className="w-full bg-gray-800 grid grid-cols-4">
          <TabsTrigger value="recent" className="text-xs py-1">
            Recent
          </TabsTrigger>
          <TabsTrigger value="reactions" className="text-xs py-1">
            Reactions
          </TabsTrigger>
          <TabsTrigger value="gaming" className="text-xs py-1">
            Gaming
          </TabsTrigger>
          <TabsTrigger value="fitness" className="text-xs py-1">
            Fitness
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="p-2">
          <div className="grid grid-cols-5 gap-2">
            {recentEmojis.map((emoji, index) => (
              <button
                key={index}
                className="w-10 h-10 flex items-center justify-center text-xl hover:bg-purple-900/30 rounded"
                onClick={() => onSelect(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reactions" className="p-2">
          <div className="grid grid-cols-5 gap-2">
            {reactionsEmojis.map((emoji, index) => (
              <button
                key={index}
                className="w-10 h-10 flex items-center justify-center text-xl hover:bg-purple-900/30 rounded"
                onClick={() => onSelect(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gaming" className="p-2">
          <div className="grid grid-cols-5 gap-2">
            {gamingEmojis.map((emoji, index) => (
              <button
                key={index}
                className="w-10 h-10 flex items-center justify-center text-xl hover:bg-purple-900/30 rounded"
                onClick={() => onSelect(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fitness" className="p-2">
          <div className="grid grid-cols-5 gap-2">
            {fitnessEmojis.map((emoji, index) => (
              <button
                key={index}
                className="w-10 h-10 flex items-center justify-center text-xl hover:bg-purple-900/30 rounded"
                onClick={() => onSelect(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

