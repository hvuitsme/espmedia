"use client"

import { BackgroundSelector } from "@/components/theme/background-selector"
import { BlurControl } from "@/components/theme/blur-control"
import { BrightnessControl } from "@/components/theme/brightness-control"
import { useSettings } from "@/contexts/settings-context"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

export function ThemesPage() {
  const { settings, updateSettings, resetSettings } = useSettings()

  const handleBackgroundChange = (backgroundId: string) => {
    updateSettings({ selectedBackground: backgroundId })
  }

  const handleBlurChange = (blur: number[]) => {
    updateSettings({ blurAmount: blur[0] })
  }

  const handleBrightnessChange = (brightness: number[]) => {
    updateSettings({ bgBrightness: brightness[0] })
  }

  return (
    <div className="p-6 pb-12 bg-white/2 border border-white/10 rounded-md">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">Themes & Backgrounds</h1>
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            onClick={resetSettings}
            className="self-start flex items-center gap-2 bg-white/90 hover:bg-white"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Blur Control */}
          <BlurControl blurAmount={settings.blurAmount} onBlurChange={handleBlurChange} />

          {/* Brightness Control */}
          <BrightnessControl bgBrightness={settings.bgBrightness} onBgBrightnessChange={handleBrightnessChange} />
        </div>

        {/* Background Selection */}
        <BackgroundSelector
          selectedBackground={settings.selectedBackground}
          onBackgroundChange={handleBackgroundChange}
        />
      </div>
    </div>
  )
}
