"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Command, Dice5, MessageSquare, Volume } from "lucide-react"

interface SlashCommandMenuProps {
  command: string
  onSelect: (command: string) => void
}

interface CommandOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

export function SlashCommandMenu({ command, onSelect }: SlashCommandMenuProps) {
  const [filteredCommands, setFilteredCommands] = useState<CommandOption[]>([])

  // Available commands
  const commands: CommandOption[] = [
    {
      id: "roll",
      name: "roll",
      description: "Roll a random number between 1-100",
      icon: <Dice5 className="h-4 w-4 text-purple-400" />,
    },
    {
      id: "shout",
      name: "shout",
      description: "Send a message with large text",
      icon: <Volume className="h-4 w-4 text-purple-400" />,
    },
    {
      id: "me",
      name: "me",
      description: "Send an action message",
      icon: <MessageSquare className="h-4 w-4 text-purple-400" />,
    },
    {
      id: "help",
      name: "help",
      description: "Show available commands",
      icon: <Command className="h-4 w-4 text-purple-400" />,
    },
  ]

  // Filter commands based on input
  useEffect(() => {
    if (!command) {
      setFilteredCommands(commands)
      return
    }

    const filtered = commands.filter((cmd) => cmd.name.toLowerCase().includes(command.toLowerCase()))
    setFilteredCommands(filtered)
  }, [command])

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg border border-purple-900/30 overflow-hidden">
      <div className="p-2 border-b border-purple-900/30 bg-gray-800">
        <div className="text-sm font-medium text-gray-300">Slash Commands</div>
      </div>

      <div className="max-h-60 overflow-y-auto">
        {filteredCommands.length > 0 ? (
          filteredCommands.map((cmd) => (
            <button
              key={cmd.id}
              className="w-full flex items-center p-2 hover:bg-purple-900/30 text-left"
              onClick={() => onSelect(cmd.id)}
            >
              <div className="mr-2">{cmd.icon}</div>
              <div>
                <div className="font-medium text-white">/{cmd.name}</div>
                <div className="text-xs text-gray-400">{cmd.description}</div>
              </div>
            </button>
          ))
        ) : (
          <div className="p-4 text-center text-gray-400 text-sm">No commands found</div>
        )}
      </div>
    </div>
  )
}

