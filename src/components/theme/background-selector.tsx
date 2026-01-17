"use client"

import type React from "react"
import type { Background } from "@/types/settings";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ImageIcon, Plus, X } from "lucide-react"
import { BACKGROUND_OPTIONS } from "@/constants/settings"
import { useSettings } from "@/contexts/settings-context"
import { useRef } from "react"

interface BackgroundSelectorProps {
  selectedBackground: string
  onBackgroundChange: (backgroundId: string) => void
}

export function BackgroundSelector({ selectedBackground, onBackgroundChange }: BackgroundSelectorProps) {
  const { settings, addCustomBackground, removeCustomBackground } = useSettings()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getBackgroundName = (bgId: string) => {
    const bgMap: Record<string, string> = {
      bg1: "Hanoi",
      bg2: "Hanoi 2",
      bg3: "Cyberpunk",
      bg4: "Sakura",
      bg5: "Mountain",
      bg6: "Lake",
    }
    return bgMap[bgId] || bgId
  }

  const customBackgrounds = Array.isArray(settings.customBackgrounds) ? settings.customBackgrounds : []
  const allBackgrounds = [...BACKGROUND_OPTIONS, ...customBackgrounds]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file!")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large! Please select an image under 5MB.")
      return
    }

    // Create FileReader to convert to base64
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64String = e.target?.result as string

      const totalExistingImages = BACKGROUND_OPTIONS.length + customBackgrounds.length
      const nextNumber = totalExistingImages + 1
      const customId = `custom-${nextNumber}`

      const customBackground: Background = {
        id: customId,
        name: file.name.split(".")[0] || "Custom Image",
        url: base64String,
        description: "Custom image",
        isCustom: true,
      }

      if (typeof addCustomBackground === "function") {
        addCustomBackground(customBackground)
        onBackgroundChange(customId)
      }
    }

    reader.onerror = () => {
      alert("Error reading file!")
    }

    reader.readAsDataURL(file)

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveCustom = (backgroundId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    if (typeof removeCustomBackground === "function") {
      removeCustomBackground(backgroundId)
    }
  }

  return (
    <Card className="bg-white/65 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Background
        </CardTitle>
        <CardDescription>Choose your wallpaper background</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {allBackgrounds.map((bg) => (
            <div key={bg.id} className="cursor-pointer" onClick={() => onBackgroundChange(bg.id)}>
              <div
                className={`relative rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                  selectedBackground === bg.id
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="relative w-full overflow-hidden h-[150px]">
                  <Image
                    src={bg.url || "/placeholder.svg"}
                    alt={getBackgroundName(bg.id)}
                    fill
                    className="w-full h-full object-cover"
                    priority={allBackgrounds.indexOf(bg) < 3}
                  />
                  {selectedBackground === bg.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                  {bg.isCustom && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 left-1 w-6 h-6 p-0 rounded-full"
                      onClick={(e) => handleRemoveCustom(bg.id, e)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="mt-2 text-sm font-medium text-center text-gray-700">{getBackgroundName(bg.id)}</div>
            </div>
          ))}

          <div className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="relative rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all hover:scale-105 bg-gray-50 hover:bg-blue-50">
              <div className="relative w-full overflow-hidden h-[150px] flex items-center justify-center">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <div className="mt-2 text-sm font-medium text-center text-gray-600">Upload Custom</div>
          </div>
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
      </CardContent>
    </Card>
  )
}
