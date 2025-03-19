"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bell, Hash, Info, Plus, Search, Send, Smile, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { GuildSidebar } from "./guild-sidebar"
import { ChatMessage } from "./chat-message"
import { UserList } from "./user-list"
import { EmojiPicker } from "./emoji-picker"
import { SlashCommandMenu } from "./slash-command-menu"

// Types
export type MessageType = {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  senderRank: string
  content: string
  timestamp: Date
  reactions?: {
    emoji: string
    count: number
    userIds: string[]
  }[]
  mentions?: string[]
  attachments?: {
    type: "image" | "gif" | "voice" | "video"
    url: string
    thumbnail?: string
  }[]
  isReply?: boolean
  parentMessageId?: string
  readBy?: string[]
}

export type ChannelType = {
  id: string
  name: string
  type: "text" | "voice" | "announcement"
  unreadCount?: number
  isActive?: boolean
}

export type GuildMemberType = {
  id: string
  name: string
  avatar: string
  status: "online" | "away" | "offline" | "dnd"
  role: "leader" | "officer" | "member"
  rank: "S" | "A" | "B" | "C" | "D" | "E"
  level: number
  isTyping?: boolean
  lastActive?: Date
  inVoiceChannel?: boolean
  isMuted?: boolean
  isDeafened?: boolean
}

export function GuildChat() {
  // State
  const [activeChannel, setActiveChannel] = useState<ChannelType | null>(null)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [messageInput, setMessageInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [slashCommand, setSlashCommand] = useState("")
  const [showSlashCommands, setShowSlashCommands] = useState(false)
  const [replyingTo, setReplyingTo] = useState<MessageType | null>(null)
  const [theme, setTheme] = useState<"default" | "dark" | "cyberpunk" | "fantasy">("default")
  const [bubbleStyle, setBubbleStyle] = useState<"rounded" | "rectangular">("rounded")
  const [showUserList, setShowUserList] = useState(true)

  // Refs
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const messageInputRef = useRef<HTMLInputElement>(null)

  // Mock data for channels
  const channels: ChannelType[] = [
    { id: "1", name: "general", type: "text", unreadCount: 0, isActive: true },
    { id: "2", name: "strategy", type: "text", unreadCount: 3 },
    { id: "3", name: "memes", type: "text", unreadCount: 0 },
    { id: "4", name: "raid-planning", type: "text", unreadCount: 0 },
    { id: "5", name: "voice-general", type: "voice" },
    { id: "6", name: "announcements", type: "announcement" },
  ]

  // Mock data for guild members
  const guildMembers: GuildMemberType[] = [
    {
      id: "1",
      name: "ShadowMonarch",
      avatar: "/placeholder.svg?height=100&width=100",
      status: "online",
      role: "leader",
      rank: "S",
      level: 145,
      isTyping: false,
    },
    {
      id: "2",
      name: "BerserkHunter",
      avatar: "/placeholder.svg?height=100&width=100",
      status: "online",
      role: "officer",
      rank: "S",
      level: 132,
    },
    {
      id: "3",
      name: "IronWill",
      avatar: "/placeholder.svg?height=100&width=100",
      status: "away",
      role: "officer",
      rank: "A",
      level: 118,
    },
    {
      id: "4",
      name: "PhantomBlade",
      avatar: "/placeholder.svg?height=100&width=100",
      status: "online",
      role: "member",
      rank: "A",
      level: 105,
      inVoiceChannel: true,
    },
    {
      id: "5",
      name: "FrostQueen",
      avatar: "/placeholder.svg?height=100&width=100",
      status: "online",
      role: "member",
      rank: "A",
      level: 98,
      isTyping: true,
    },
    {
      id: "6",
      name: "ThunderFist",
      avatar: "/placeholder.svg?height=100&width=100",
      status: "offline",
      role: "member",
      rank: "B",
      level: 87,
    },
    {
      id: "7",
      name: "SteelHeart",
      avatar: "/placeholder.svg?height=100&width=100",
      status: "online",
      role: "member",
      rank: "B",
      level: 76,
      inVoiceChannel: true,
      isMuted: true,
    },
    {
      id: "8",
      name: "DragonSlayer",
      avatar: "/placeholder.svg?height=100&width=100",
      status: "dnd",
      role: "member",
      rank: "B",
      level: 72,
    },
    {
      id: "9",
      name: "EternalFlame",
      avatar: "/placeholder.svg?height=100&width=100",
      status: "online",
      role: "member",
      rank: "S",
      level: 140,
    },
    {
      id: "10",
      name: "SilentAssassin",
      avatar: "/placeholder.svg?height=100&width=100",
      status: "away",
      role: "member",
      rank: "S",
      level: 128,
    },
  ]

  // Mock data for messages
  const mockMessages: MessageType[] = [
    {
      id: "1",
      senderId: "1",
      senderName: "ShadowMonarch",
      senderAvatar: "/placeholder.svg?height=100&width=100",
      senderRank: "S",
      content: "Welcome to the Shadow Hunters guild! Let's work together to become the strongest hunters.",
      timestamp: new Date(Date.now() - 3600000 * 5),
      reactions: [
        { emoji: "👍", count: 5, userIds: ["2", "3", "4", "5", "7"] },
        { emoji: "🔥", count: 3, userIds: ["2", "9", "10"] },
      ],
      readBy: ["2", "3", "4", "5", "7", "9", "10"],
    },
    {
      id: "2",
      senderId: "2",
      senderName: "BerserkHunter",
      senderAvatar: "/placeholder.svg?height=100&width=100",
      senderRank: "S",
      content: "I just cleared a level 80 dungeon! Got some epic rewards. Anyone want to join for the next raid?",
      timestamp: new Date(Date.now() - 3600000 * 3),
      reactions: [
        { emoji: "🎉", count: 4, userIds: ["1", "3", "5", "9"] },
        { emoji: "💪", count: 2, userIds: ["1", "4"] },
      ],
      readBy: ["1", "3", "4", "5", "9"],
    },
    {
      id: "3",
      senderId: "5",
      senderName: "FrostQueen",
      senderAvatar: "/placeholder.svg?height=100&width=100",
      senderRank: "A",
      content: "I'll join! What time are you planning to start?",
      timestamp: new Date(Date.now() - 3600000 * 2.5),
      isReply: true,
      parentMessageId: "2",
      readBy: ["1", "2", "3", "4", "9"],
    },
    {
      id: "4",
      senderId: "9",
      senderName: "EternalFlame",
      senderAvatar: "/placeholder.svg?height=100&width=100",
      senderRank: "S",
      content: "Check out this new workout routine I created. It's perfect for improving agility stats!",
      timestamp: new Date(Date.now() - 3600000 * 2),
      attachments: [
        {
          type: "image",
          url: "/placeholder.svg?height=300&width=500",
          thumbnail: "/placeholder.svg?height=100&width=100",
        },
      ],
      readBy: ["1", "2", "3", "5"],
    },
    {
      id: "5",
      senderId: "3",
      senderName: "IronWill",
      senderAvatar: "/placeholder.svg?height=100&width=100",
      senderRank: "A",
      content:
        "Hey @ShadowMonarch, when is the next guild event? I've been training hard and want to show my progress.",
      timestamp: new Date(Date.now() - 3600000),
      mentions: ["1"],
      readBy: ["1", "2", "5", "9"],
    },
    {
      id: "6",
      senderId: "1",
      senderName: "ShadowMonarch",
      senderAvatar: "/placeholder.svg?height=100&width=100",
      senderRank: "S",
      content:
        "We're planning a big event this weekend. Everyone should prepare their best skills and be ready to level up!",
      timestamp: new Date(Date.now() - 1800000),
      readBy: ["2", "3", "5", "9"],
    },
    {
      id: "7",
      senderId: "4",
      senderName: "PhantomBlade",
      senderAvatar: "/placeholder.svg?height=100&width=100",
      senderRank: "A",
      content: "Just hit a new personal record on my strength training! 💪",
      timestamp: new Date(Date.now() - 900000),
      attachments: [
        {
          type: "gif",
          url: "/placeholder.svg?height=200&width=300",
          thumbnail: "/placeholder.svg?height=100&width=100",
        },
      ],
      readBy: ["1", "2", "5"],
    },
    {
      id: "8",
      senderId: "10",
      senderName: "SilentAssassin",
      senderAvatar: "/placeholder.svg?height=100&width=100",
      senderRank: "S",
      content: "I've been working on a new stealth technique. It's perfect for solo dungeons.",
      timestamp: new Date(Date.now() - 600000),
      readBy: ["1", "2"],
    },
    {
      id: "9",
      senderId: "5",
      senderName: "FrostQueen",
      senderAvatar: "/placeholder.svg?height=100&width=100",
      senderRank: "A",
      content: "Has anyone tried the new ice dungeon? I heard it has amazing rewards but it's extremely difficult.",
      timestamp: new Date(Date.now() - 300000),
      readBy: ["1"],
    },
  ]

  // Set initial data
  useEffect(() => {
    setActiveChannel(channels.find((channel) => channel.isActive) || channels[0])
    setMessages(mockMessages)

    // Scroll to bottom of chat
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [])

  // Handle message input changes
  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMessageInput(value)

    // Check for slash commands
    if (value.startsWith("/") && !value.includes(" ")) {
      setSlashCommand(value.substring(1))
      setShowSlashCommands(true)
    } else {
      setShowSlashCommands(false)
    }

    // Simulate typing indicator
    if (value && !isTyping) {
      setIsTyping(true)
      // In a real app, you would emit a typing event to the server here
    } else if (!value && isTyping) {
      setIsTyping(false)
      // In a real app, you would emit a stop typing event to the server here
    }
  }

  // Handle sending a message
  const handleSendMessage = () => {
    if (!messageInput.trim() && !replyingTo) return

    const newMessage: MessageType = {
      id: `new-${Date.now()}`,
      senderId: "1", // Current user ID
      senderName: "ShadowMonarch", // Current user name
      senderAvatar: "/placeholder.svg?height=100&width=100", // Current user avatar
      senderRank: "S", // Current user rank
      content: messageInput,
      timestamp: new Date(),
      readBy: ["1"], // Mark as read by the sender
      ...(replyingTo ? { isReply: true, parentMessageId: replyingTo.id } : {}),
    }

    setMessages([...messages, newMessage])
    setMessageInput("")
    setReplyingTo(null)

    // Scroll to bottom of chat
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }
    }, 100)
  }

  // Handle key press in message input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  // Handle adding emoji to message
  const handleEmojiSelect = (emoji: string) => {
    setMessageInput((prev) => prev + emoji)
    setShowEmojiPicker(false)
    messageInputRef.current?.focus()
  }

  // Handle executing a slash command
  const handleSlashCommand = (command: string) => {
    setShowSlashCommands(false)

    // Process different commands
    switch (command) {
      case "roll":
        const roll = Math.floor(Math.random() * 100) + 1
        const rollMessage: MessageType = {
          id: `new-${Date.now()}`,
          senderId: "1",
          senderName: "ShadowMonarch",
          senderAvatar: "/placeholder.svg?height=100&width=100",
          senderRank: "S",
          content: `🎲 Rolled ${roll} (1-100)`,
          timestamp: new Date(),
          readBy: ["1"],
        }
        setMessages([...messages, rollMessage])
        break
      case "shout":
        setMessageInput("/shout ")
        break
      default:
        // Handle other commands
        break
    }

    setMessageInput("")
  }

  // Handle replying to a message
  const handleReply = (message: MessageType) => {
    setReplyingTo(message)
    messageInputRef.current?.focus()
  }

  // Handle canceling a reply
  const handleCancelReply = () => {
    setReplyingTo(null)
  }

  // Handle adding a reaction to a message
  const handleReaction = (messageId: string, emoji: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.id === messageId) {
          const existingReactionIndex = msg.reactions?.findIndex((r) => r.emoji === emoji) ?? -1

          if (existingReactionIndex !== -1 && msg.reactions) {
            // Check if user already reacted
            const userReacted = msg.reactions[existingReactionIndex].userIds.includes("1")

            if (userReacted) {
              // Remove user's reaction
              const updatedUserIds = msg.reactions[existingReactionIndex].userIds.filter((id) => id !== "1")

              if (updatedUserIds.length === 0) {
                // Remove the reaction entirely if no users left
                const updatedReactions = msg.reactions.filter((_, index) => index !== existingReactionIndex)
                return { ...msg, reactions: updatedReactions.length > 0 ? updatedReactions : undefined }
              } else {
                // Update the reaction with remaining users
                const updatedReactions = [...msg.reactions]
                updatedReactions[existingReactionIndex] = {
                  ...updatedReactions[existingReactionIndex],
                  count: updatedUserIds.length,
                  userIds: updatedUserIds,
                }
                return { ...msg, reactions: updatedReactions }
              }
            } else {
              // Add user's reaction to existing emoji
              const updatedReactions = [...msg.reactions]
              updatedReactions[existingReactionIndex] = {
                ...updatedReactions[existingReactionIndex],
                count: updatedReactions[existingReactionIndex].count + 1,
                userIds: [...updatedReactions[existingReactionIndex].userIds, "1"],
              }
              return { ...msg, reactions: updatedReactions }
            }
          } else {
            // Add new reaction
            const newReaction = {
              emoji,
              count: 1,
              userIds: ["1"],
            }
            return {
              ...msg,
              reactions: msg.reactions ? [...msg.reactions, newReaction] : [newReaction],
            }
          }
        }
        return msg
      }),
    )
  }

  // Get theme class
  const getThemeClass = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-900"
      case "cyberpunk":
        return "bg-gradient-to-br from-purple-900 to-blue-900"
      case "fantasy":
        return "bg-gradient-to-br from-indigo-900 to-purple-900"
      default:
        return "bg-black"
    }
  }

  // Get bubble style class
  const getBubbleStyleClass = () => {
    return bubbleStyle === "rounded" ? "rounded-2xl" : "rounded-md"
  }

  return (
    <section className={`h-screen flex ${getThemeClass()} text-white overflow-hidden`}>
      {/* Left Sidebar - Guild Overview & Channels */}
      <GuildSidebar channels={channels} activeChannel={activeChannel} setActiveChannel={setActiveChannel} />

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col h-full border-l border-r border-purple-900/30">
        {/* Chat Header */}
        <div className="h-16 min-h-16 flex items-center justify-between px-4 border-b border-purple-900/30 bg-black/20">
          <div className="flex items-center">
            <Hash className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="font-bold text-lg">{activeChannel?.name}</h2>
          </div>

          <div className="flex items-center space-x-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Users className="h-5 w-5 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle Member List</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Bell className="h-5 w-5 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notification Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Search className="h-5 w-5 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search Messages</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Info className="h-5 w-5 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Channel Info</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-900/50 scrollbar-track-transparent"
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              bubbleStyle={getBubbleStyleClass()}
              onReply={handleReply}
              onReaction={handleReaction}
              parentMessage={message.isReply ? messages.find((m) => m.id === message.parentMessageId) : undefined}
            />
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-purple-900/30 bg-black/20">
          {/* Reply indicator */}
          {replyingTo && (
            <div className="flex items-center justify-between mb-2 p-2 rounded bg-purple-900/20 text-sm">
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Replying to</span>
                <span className="font-bold">{replyingTo.senderName}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={handleCancelReply}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="relative flex items-center">
            <div className="absolute left-3 flex space-x-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <Smile className="h-5 w-5 text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add Emoji</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Plus className="h-5 w-5 text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add Attachment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Input
              ref={messageInputRef}
              type="text"
              placeholder={`Message #${activeChannel?.name}`}
              className="pl-20 pr-12 py-6 bg-purple-900/20 border-purple-900/30 rounded-lg focus:ring-purple-500"
              value={messageInput}
              onChange={handleMessageInputChange}
              onKeyPress={handleKeyPress}
            />

            <div className="absolute right-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleSendMessage}
                disabled={!messageInput.trim() && !replyingTo}
              >
                <Send className="h-5 w-5 text-gray-400" />
              </Button>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-14 left-0">
                <EmojiPicker onSelect={handleEmojiSelect} />
              </div>
            )}

            {/* Slash Command Menu */}
            {showSlashCommands && (
              <div className="absolute bottom-14 left-0 w-64">
                <SlashCommandMenu command={slashCommand} onSelect={handleSlashCommand} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - User List & Activity Status */}
      {showUserList && <UserList members={guildMembers} onClose={() => setShowUserList(false)} />}
    </section>
  )
}

