"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Plus, X } from "lucide-react"
import { BACKGROUND_OPTIONS } from "@/constants/settings"
import { useSettings } from "@/contexts/settings-context"
import { useRef } from "react"
import { useTranslations } from "next-intl"

interface BackgroundSelectorProps {
  selectedBackground: string
  onBackgroundChange: (backgroundId: string) => void
}

export function BackgroundSelector({ selectedBackground, onBackgroundChange }: BackgroundSelectorProps) {
  const { settings, addCustomBackground, removeCustomBackground } = useSettings()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const tTheme = useTranslations("Themes")
  const tBg = useTranslations("Backgrounds")

  const getBackgroundName = (bgId: string) => {
    if (bgId.startsWith("bg")) {
      try {
        return tBg(bgId) 
      } catch (e) {
        return bgId
      }
    }
    return bgId
  }

  const customBackgrounds = Array.isArray(settings.customBackgrounds) ? settings.customBackgrounds : []
  const allBackgrounds = [...BACKGROUND_OPTIONS, ...customBackgrounds]

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        
        const builtInCount = BACKGROUND_OPTIONS.length
        
        let nextIndex = builtInCount + customBackgrounds.length + 1
        let newId = `custom-${nextIndex}`

        while (customBackgrounds.some((bg) => bg.id === newId)) {
          nextIndex++
          newId = `custom-${nextIndex}`
        }

        const newBackground = {
          id: newId,
          name: newId,
          url: result,
          description: "Custom background",
          isCustom: true,
        }
        addCustomBackground(newBackground)
        onBackgroundChange(newBackground.id)
      }
      reader.readAsDataURL(file)
    }

    event.target.value = ""
  }

  const handleRemoveCustom = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    removeCustomBackground(id)
  }

  return (
    <Card className="border border-white/10 bg-white/5 backdrop-blur-sm text-white">
      <CardHeader>
        <CardTitle>{tTheme("title")}</CardTitle> 
        <CardDescription className="text-white/70">{tBg("background_desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {allBackgrounds.map((bg) => (
            <div key={bg.id} className="group relative">
              <div
                onClick={() => onBackgroundChange(bg.id)}
                className={`
                  relative aspect-video cursor-pointer rounded-lg overflow-hidden border-2 transition-all
                  ${selectedBackground === bg.id ? "border-blue-500 ring-2 ring-blue-500/50" : "border-transparent hover:border-white/50"}
                `}
              >
                <Image
                  src={bg.url || "/placeholder.svg"}
                  alt={bg.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className={`absolute inset-0 bg-black/40 transition-opacity ${selectedBackground === bg.id ? "opacity-0" : "opacity-0 group-hover:opacity-100"}`} />
                
                <div className="absolute top-2 right-2 flex flex-col items-end gap-2 z-10">
                   {selectedBackground === bg.id && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                  
                  {bg.isCustom && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-6 h-6 p-0 rounded-full shadow-lg border border-white/20"
                      onClick={(e) => handleRemoveCustom(bg.id, e)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="mt-2 text-sm font-medium text-center text-white/90 shadow-black drop-shadow-md">
                {bg.isCustom ? bg.name : getBackgroundName(bg.id)}
              </div>
            </div>
          ))}

          <div className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="relative rounded-lg overflow-hidden border-2 border-dashed border-white/30 hover:border-white/70 transition-all hover:scale-105 bg-white/5 hover:bg-white/10">
              <div className="relative w-full overflow-hidden aspect-video flex items-center justify-center">
                <Plus className="w-8 h-8 text-white/70" />
              </div>
            </div>
            <div className="mt-2 text-sm font-medium text-center text-white/70">{tTheme("upload")}</div>
          </div>
        </div>

        <input 
          ref={fileInputRef} 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange} 
        />
      </CardContent>
    </Card>
  )
}