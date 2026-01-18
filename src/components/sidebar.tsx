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
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ onPageChange, isOpen, onClose }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sidebarItems: SidebarItem[] = [
    {
      id: "devices",
      icon: <Smartphone size={20} />,
      label: "Devices",
      onClick: () => {
        onPageChange?.("home")
        onClose?.()
      },
    },
    {
      id: "ffmpeg",
      icon: <Youtube size={20} />,
      label: "Ffmpeg",
      onClick: () => {
        onPageChange?.("home")
        onClose?.()
      },
    },
  ]

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-white/5 z-40 md:hidden backdrop-blur-[2px]"
          onClick={onClose}
        />
      )}

      <div
        className={`
          h-full z-50 flex flex-col py-4
          bg-white/20 backdrop-blur-xl border-r border-white/20 shadow-2xl
          md:bg-white/5 md:backdrop-blur-none md:border md:border-white/10 md:rounded-md md:shadow-none
          transition-all duration-300 ease-in-out
          fixed inset-y-0 left-0 w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 
          ${isHovered ? "md:w-48" : "md:w-16"}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`
                flex items-center 
                text-white/80 hover:text-black hover:bg-white/30
                md:text-white/80 md:hover:text-white md:hover:bg-white/10 
                transition-all duration-200 mx-2 mb-2 rounded-md h-12 px-3 w-[calc(100%-16px)]
              `}
            >
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                {item.icon}
              </div>
              
              <span
                className={`
                  ml-3 whitespace-nowrap transition-all duration-300
                  opacity-100 translate-x-0
                  md:overflow-hidden
                  ${isHovered ? "md:opacity-100 md:translate-x-0" : "md:opacity-0 md:-translate-x-2 md:w-0"}
                `}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}