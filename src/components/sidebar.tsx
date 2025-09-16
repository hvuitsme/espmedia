"use client"

import type React from "react"

import { useState } from "react"
import { Youtube, Smartphone } from "lucide-react"

interface SidebarItem {
  id: string
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

interface SidebarProps {
  onPageChange?: (page: string) => void
}

export function Sidebar({ onPageChange }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const sidebarItems: SidebarItem[] = [
    {
      id:"devices",
      icon: <Smartphone size={20} />,
      label: "Devices",
      onClick: () => onPageChange?.("home"),
    },
    {
      id:"ffmpeg",
      icon: <Youtube size={20} />,
      label: "Ffmpeg",
      onClick: () => onPageChange?.("home"),
    },
  ]

  return (
    <div
      className="h-full z-40"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={`h-full bg-white/2 border border-white/10 rounded-md transition-all duration-300 ease-in-out ${
          isExpanded ? "w-48" : "w-16"
        } flex flex-col py-4`}
      >
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className="flex items-center text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 mx-2 mb-2 rounded-md h-12 px-3"
          >
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">{item.icon}</div>
            <span
              className={`ml-3 whitespace-nowrap transition-all duration-300 ${
                isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
