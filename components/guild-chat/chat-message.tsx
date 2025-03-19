"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MoreHorizontal, Reply, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EmojiPicker } from "./emoji-picker"
import type { MessageType } from "./guild-chat"

interface ChatMessageProps {
  message: MessageType
  bubbleStyle: string
  parentMessage?: MessageType
  onReply: (message: MessageType) => void
  onReaction: (messageId: string, emoji: string) => void
}

export function ChatMessage({ message, bubbleStyle, parentMessage, onReply, onReaction }: ChatMessageProps) {
  const [showActions, setShowActions] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  // Format timestamp
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Check if message is from current user
  const isCurrentUser = message.senderId === "1" // Assuming current user ID is "1"

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

  // Handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    onReaction(message.id, emoji)
    setShowEmojiPicker(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Parent message reference (if reply) */}
      {message.isReply && parentMessage && (
        <div className="flex items-center ml-12 mb-1">
          <div className="w-0.5 h-5 bg-purple-500/30 mr-2"></div>
          <div className="flex items-center">
            <img
              src={parentMessage.senderAvatar || "/placeholder.svg"}
              alt={parentMessage.senderName}
              className="w-4 h-4 rounded-full mr-1"
            />
            <span className="text-xs font-medium text-purple-400">{parentMessage.senderName}</span>
            <span className="text-xs text-gray-500 ml-1 line-clamp-1">
              {parentMessage.content.length > 40
                ? `${parentMessage.content.substring(0, 40)}...`
                : parentMessage.content}
            </span>
          </div>
        </div>
      )}

      <div className="flex group">
        {/* Avatar */}
        <div className="mr-3 flex-shrink-0">
          <img
            src={message.senderAvatar || "/placeholder.svg"}
            alt={message.senderName}
            className="w-10 h-10 rounded-full"
          />
        </div>

        <div className="flex-1">
          {/* Message Header */}
          <div className="flex items-center mb-1">
            <span className="font-bold mr-1">{message.senderName}</span>
            <span className={`text-xs px-1 rounded text-white ${getRankColor(message.senderRank)}`}>
              {message.senderRank}
            </span>
            <span className="text-xs text-gray-400 ml-2">
              {formatTime(message.timestamp)} • {formatDate(message.timestamp)}
            </span>
          </div>

          {/* Message Content */}
          <div
            className={`p-3 ${bubbleStyle} ${
              isCurrentUser ? "bg-purple-900/30 text-white" : "bg-gray-800/50 text-white"
            }`}
          >
            {/* Handle mentions */}
            {message.mentions && message.mentions.length > 0
              ? message.content.split(" ").map((word, index) => {
                  if (word.startsWith("@") && message.mentions?.includes(word.substring(1))) {
                    return (
                      <span key={index} className="text-purple-400 font-medium">
                        {word}{" "}
                      </span>
                    )
                  }
                  return <span key={index}>{word} </span>
                })
              : message.content}

            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2">
                {message.attachments.map((attachment, index) => (
                  <div key={index} className="mt-1">
                    {attachment.type === "image" && (
                      <img
                        src={attachment.url || "/placeholder.svg"}
                        alt="Attachment"
                        className="max-w-full max-h-60 rounded-lg"
                      />
                    )}
                    {attachment.type === "gif" && (
                      <img
                        src={attachment.url || "/placeholder.svg"}
                        alt="GIF"
                        className="max-w-full max-h-40 rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reactions */}
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {message.reactions.map((reaction, index) => (
                <button
                  key={index}
                  className={`flex items-center px-1.5 py-0.5 rounded-full text-xs ${
                    reaction.userIds.includes("1")
                      ? "bg-purple-500/30 text-purple-200"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                  }`}
                  onClick={() => onReaction(message.id, reaction.emoji)}
                >
                  <span className="mr-1">{reaction.emoji}</span>
                  <span>{reaction.count}</span>
                </button>
              ))}
            </div>
          )}

          {/* Read receipts */}
          {message.readBy && message.readBy.length > 1 && (
            <div className="flex -space-x-1 mt-1">
              {message.readBy.slice(0, 3).map((userId) => (
                <div key={userId} className="w-4 h-4 rounded-full bg-gray-800 border border-black">
                  <img src="/placeholder.svg?height=50&width=50" alt="Read by" className="w-full h-full rounded-full" />
                </div>
              ))}
              {message.readBy.length > 3 && (
                <div className="w-4 h-4 rounded-full bg-gray-800 border border-black flex items-center justify-center text-[8px]">
                  +{message.readBy.length - 3}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Message Actions */}
        {showActions && (
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => onReply(message)}>
                    <Reply className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reply</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Smile className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add Reaction</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Copy Text</DropdownMenuItem>
                <DropdownMenuItem>Pin Message</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Emoji Picker for Reactions */}
            {showEmojiPicker && (
              <div className="absolute right-12 z-10">
                <EmojiPicker onSelect={handleEmojiSelect} />
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

