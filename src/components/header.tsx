"use client"

import { Button } from "@/components/ui/button"
import { Settings, Shirt, Languages } from "lucide-react"

interface HeaderProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/2 border border-white/10 rounded-b-md">
      <div className="w-full px-3.5 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Logo */}
          <div
            onClick={() => onPageChange("home")}
            className="w-8 h-8 bg-gradient-to-br bg-white rounded-lg flex items-center justify-center">
            <img src="/icon/unique_shapes.png" alt="Home Logo" className="w-6 h-6" />
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center gap-1">
            <Button
              variant={currentPage === "themes" ? "default" : "ghost"}
              size="sm"
              onClick={() => onPageChange("themes")}
              className={`w-9 h-9 p-0 ${
                currentPage === "themes" 
                ? "bg-transparent text-white hover:!bg-white/20 hover:!text-white" 
                : "text-white/95 hover:text-white hover:bg-white/20"
              }`}
            >
              <Shirt className="w-4 h-4" />
            </Button>

            <Button
              variant={"ghost"}
              className={`w-9 h-9 p-0 ${
                currentPage === "settings"
                  ? "bg-transparent text-white hover:!bg-white/20 hover:!text-white"
                  : "text-white/95 hover:text-white hover:bg-white/20"
              }`}
            >
              <Languages className="w-4 h-4" />
            </Button>

            <Button
              variant={currentPage === "settings" ? "default" : "ghost"}
              size="sm"
              onClick={() => onPageChange("settings")}
              className={`w-9 h-9 p-0 ${
                currentPage === "settings"
                  ? "bg-transparent text-white hover:!bg-white/20 hover:!text-white"
                  : "text-white/95 hover:text-white hover:bg-white/20"
              }`}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
